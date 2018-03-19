
import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

//import { DownloadExcel } from '../components/DownloadExcel.vue';
//Vue.component('download-excel', DownloadExcel);
Vue.component('download-excel', require('../components/DownloadExcel.vue'));

const SistemaOperativoController = new Vue({
   el: '#SistemaOperativoController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_sistema_operativo',
         'nombre_tabla':'sistemas_operativos', //nombre tabla o de ruta
         'nombre_ruta':'sistemas_operativos', //nombre tabla o de ruta
         'nombre_model':'sistema_operativo',
         'nombre_model_limpio': 'sistema_operativo_limpio',
         'nombre_detalle':'Sistemas Operativos',
         'nombre_controller':'SistemaOperativoController',

         'filtro_head':null,
         'sistema_operativo':{
            'id_sistema_operativo':null,
            'arquitectura':null,
            'nom_sistema_operativo':null,
            'det_sistema_operativo':null,
            'vers_sistema_operativo':null,
            'lic_sistema_operativo':null,
            'det_licencia_sistema_operativo':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'sistema_operativo_limpio':{
            'id_sistema_operativo':null,
            'arquitectura':null,
            'nom_sistema_operativo':null,
            'det_sistema_operativo':null,
            'vers_sistema_operativo':null,
            'lic_sistema_operativo':null,
            'det_licencia_sistema_operativo':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'lom':{},
         'lista_objs_model':[],
         'sistemas_operativos':[],
         'datos_excel':[],
         'usuario_auth':{},

         'campos_formularios':[],
         'errores_campos':[],

         //Variables para validar si se está creando o editando
         'modal_crear_activo': false,
         'modal_actualizar_activo': false,

         //Estas var se deben conservar para todos los controllers por que se ejecutan para el modal crear (blanquea)
         'lista_actualizar_activo':false,

         'id_en_edicion': null,

         'orden_lista':'asc',

         'tabla_campos': {
            'id_sistema_operativo':false,
            'arquitectura':true,
            'nom_sistema_operativo':true,
            'det_sistema_operativo':true,
            'vers_sistema_operativo':true,
            'lic_sistema_operativo':false,
            'det_licencia_sistema_operativo':false,
            'id_usuario_registra':false,
            'id_usuario_modifica':false,
            'created_at':false,
            'updated_at':false,
            'deleted_at':false,
         },

         'tabla_labels': {
            'id_sistema_operativo':'Id tipo aplicacion',
            'arquitectura':'Arquitectura',
            'nom_sistema_operativo':'Nombre SO',
            'det_sistema_operativo':'Detalle SO',
            'vers_sistema_operativo':'Version SO',
            'lic_sistema_operativo':'Licencia SO',
            'det_licencia_sistema_operativo':'Detalle licencia SO',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en'
         },

         'excel_json_campos': {
            'id_sistema_operativo': 'String',
            'arquitectura': 'String',
            'nom_sistema_operativo': 'String',
            'det_sistema_operativo': 'String',
            'vers_sistema_operativo': 'String',
            'lic_sistema_operativo': 'String',
            'det_licencia_sistema_operativo': 'String',
            'id_usuario_registra': 'String',
            'id_usuario_modifica': 'String',
            'created_at': 'String',
            'updated_at': 'String',
            'deleted_at': 'String'
         },

         'excel_json_datos': [],
         'excel_data_contador': 0,

         'append_to_json_excel': {},

      }
   },
   computed: {},
   watch: {
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el sistema_operativo
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) {
            this.limpiar_objeto_clase_local();
         } else {
            this.sistema_operativo = this.buscar_en_array_por_modelo_e_id(id_en_edicion,this.sistemas_operativos,this.nombre_model);
         }
      },
      //sistemas_operativos se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      sistemas_operativos: function (sistemas_operativos) {
         var self = this;
         this.excel_json_datos = [];
         return sistemas_operativos.map(function (sistema_operativo, index) {
            return self.excel_json_datos.push({
               'id_sistema_operativo': sistema_operativo.id_sistema_operativo || '-',
               'arquitectura': sistema_operativo.arquitectura || '-',
               'nom_sistema_operativo': sistema_operativo.nom_sistema_operativo || '-',
               'det_sistema_operativo': sistema_operativo.det_sistema_operativo || '-',
               'vers_sistema_operativo': sistema_operativo.vers_sistema_operativo || '-',
               'lic_sistema_operativo': sistema_operativo.lic_sistema_operativo || '-',
               'det_licencia_sistema_operativo': sistema_operativo.det_licencia_sistema_operativo || '-',
               'id_usuario_registra': sistema_operativo.id_usuario_registra || '-',
               'id_usuario_modifica': sistema_operativo.id_usuario_modifica || '-',
               'created_at': sistema_operativo.created_at || '-',
               'updated_at': sistema_operativo.updated_at || '-',
               'deleted_at': sistema_operativo.deleted_at || '-'
            });
         });
      },
   },
   components: {
      //'download-excel': DownloadExcel,
   },
   created(){
      this.inicializar();

      $(document).ready(function(){
         $('[data-toggle="tooltip"]').tooltip();
      });

      /*
       $(document).ready(function () {
       //Handle al recargar pagina
       window.onbeforeunload = function(e){
       return "Estás seguro que deseas cerrar la ventana?";
       };
       window.onunload = function(e){
       return "Cierre de la ventana";
       };

       });
       */

   },
   ready: {},
   filters: {},
   mixins: [ inyeccion_funciones_compartidas ],
   methods: {


      inicializar: function () {
         this.$http.get(`/${this.nombre_ruta}`).then(response => { // success callback
            this.lista_objs_model = response.body.sistemas_operativos || null;
            this.sistemas_operativos = response.body.sistemas_operativos || null;
            this.datos_excel = response.body.sistemas_operativos || null;
            this.usuario_auth = response.body.usuario_auth || null;
            //this.limpiar_objeto_clase_local();
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },


      editar: function (id_sistema_operativo) {
         this.lista_actualizar_activo = true;
         this.id_en_edicion = id_sistema_operativo;

         //id_objeto + array de objetos + nombre del model en lower case
         this.sistema_operativo = null;
         this.sistema_operativo = this.buscar_en_array_por_modelo_e_id(id_sistema_operativo,this.sistemas_operativos,this.nombre_model);

      },

      guardar_editado: function () {

         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

         this.$http.put(`/${this.nombre_ruta}/${this.sistema_operativo.id_sistema_operativo}`, this.sistema_operativo).then(response => { // success callback

            if (response.status == 200) {
               /*
               if ( !this.es_null(response.body.sistema_operativo) ) {
                  this.lista_actualizar_activo = false;
                  this.id_en_edicion = null;
               }
               */
            } else {
               this.checkear_estado_respuesta_http(response.status);
               return false;
            }

            if ( this.mostrar_notificaciones(response) == true ) {

               /*
                //Aqui que pregunte si el modal está activo para que lo cierre
                if (this.modal_actualizar_activo == true) {
                this.ocultar_modal('actualizar');
                this.modal_actualizar_activo = false;
                }

                this.lista_actualizar_activo = false;
                this.id_en_edicion = null;
               */

               //Recargar la lista
               this.inicializar();

            }

         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });

         return;
      },



      eliminar: function (id_sistema_operativo) {
         swal({
            title: "¿Estás seguro/a?",
            text: "¿Deseas confirmar la eliminación de este registro?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            closeOnCancel: false,
            confirmButtonColor: '#DD6B55',
            confirmButtonClass: "btn-danger",
            confirmButtonText: 'Si, eliminar!',
            confirmButtonClass: "btn-warning",
            cancelButtonText: 'No, mantener.'
         }).then((result) => {
            if (result.value) {
               //Se adjunta el token
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

               this.$http.delete(`/${this.nombre_ruta}/${id_sistema_operativo}`).then(response => {
                  if ( response.status == 200) {
                     this.auto_alerta_corta("Eliminado!","Registro eliminado correctamente","success");
                  }else {
                     this.checkear_estado_respuesta_http(response.status);
                     return false;
                  }

                  if ( this.mostrar_notificaciones(response) == true ) {
                     //Aqui que pregunte si el modal está activo para que lo cierre
                     if (this.modal_actualizar_activo == true) {
                        this.ocultar_modal('actualizar');
                        this.modal_actualizar_activo = false;
                     }
                     this.lista_actualizar_activo = false;
                     this.id_en_edicion = null;

                     //Recargar la lista
                     this.inicializar();
                  }
               }, response => { // error callback
                  this.checkear_estado_respuesta_http(response.status);
               });
            } else if (result.dismiss === swal.DismissReason.cancel) {
               this.auto_alerta_corta("Cancelado","Se ha cancelado la eliminación","success");
            }
         });

      },

      guardar: function () {
         //Ejecuta validacion sobre los campos con validaciones
         if (this.validar_campos() == false) {
            return;
         }
         //Se adjunta el token
         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
         //Instancia nuevo form data
         var formData = new  FormData();
         //Conforma objeto paramétrico para solicitud http
         formData.append('arquitectura', this.sistema_operativo.arquitectura || null );
         formData.append('nom_sistema_operativo', this.sistema_operativo.nom_sistema_operativo || null );
         formData.append('det_sistema_operativo', this.sistema_operativo.det_sistema_operativo || null );
         formData.append('vers_sistema_operativo', this.sistema_operativo.vers_sistema_operativo || null );
         formData.append('lic_sistema_operativo', this.sistema_operativo.lic_sistema_operativo || null );
         formData.append('det_licencia_sistema_operativo', this.sistema_operativo.det_licencia_sistema_operativo || null );

         this.$http.post(`/${this.nombre_ruta}`, formData).then(response => { // success callback

            if ( response.status == 200) {
               if ( !this.es_null(response.body.servicio) ) {
                  this.id_en_edicion = null;
               }
               //this.inicializar();
            } else {
               this.checkear_estado_respuesta_http(response.status);
               return false;
            }

            if ( this.mostrar_notificaciones(response) == true ) {
               this.limpiar_objeto_clase_local();
               this.inicializar();
               this.ocultar_modal('crear');
               return ;
            }

         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });

         return;
      },

   }
});