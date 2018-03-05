
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

const ServidorController = new Vue({
   el: '#ServidorController',
   data(){
      return {
         'nombre_tabla':'servidores', //nombre tabla o de ruta
         'nombre_ruta':'servidores', //nombre tabla o de ruta
         'nombre_model':'servidor',
         'nombre_detalle':'Servidores',
         'nombre_controller':'ServidorController',

         'filtro_head':null,
         'servidor':{
            'nom_servidor':null,
            'det_servidor':null,
            'ip_servidor':null,
            'url_servidor':null,
            'id_datacentro':null,
            'id_sistema_operativo':null,
            'id_dominio':null,
         },
         'servidor_limpio':{
            'nom_servidor':true,
            'det_servidor':null,
            'ip_servidor':null,
            'url_servidor':null,
            'id_datacentro':null,
            'id_sistema_operativo':null,
            'id_dominio':null,
         },
         'actividades':[],
         'tipos_servidores':[],
         'servicios':[],
         'dominios':[],
         'servidores':[],
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
         'dejar_de_editar_contador': 0,

         'orden_lista':'asc',

         'tabla_campos': {
            'nom_servidor':false,
            'det_servidor':true,
            'ip_servidor':true,
            'url_servidor':false,
            'id_datacentro':false,
            'id_sistema_operativo':false,
            'id_dominio':false,

            'id_usuario_registra':false,
            'id_usuario_modifica':false,
            'created_at':true,
            'updated_at':false,
            'deleted_at':false,
         },

         'tabla_labels': {
            'id_servidor':'Id servidor',

            'nom_servidor':'Nombre servidor',
            'det_servidor':'Detalle servidor',
            'ip_servidor':'Ip servidor',
            'url_servidor':'Url servidor',
            'id_datacentro':'Id Datacrentro',
            'id_sistema_operativo':'Id Sistema Operativo',
            'id_dominio':'Id Dominio',

            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en',
         },

         'excel_json_campos': {
            'id_servidor':'String',

            'nom_servidor':'String',
            'det_servidor':'String',
            'ip_servidor':'String',
            'url_servidor':'String',
            'id_datacentro':'String',
            'id_sistema_operativo':'String',
            'id_dominio':'String',

            'id_usuario_registra':'String',
            'id_usuario_modifica':'String',
            'created_at':'String',
            'updated_at':'String',
            'deleted_at':'String',
         },

         'excel_json_datos': [],
         'excel_data_contador': 0,

         'append_to_json_excel': {},

      }
   },
   computed: {},
   watch: {
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el servidor
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) {
            this.limpiar_objeto_clase_local();

         } else {
            this.servidor = this.buscar_en_array_por_modelo_e_id(id_en_edicion,this.servidores,this.nombre_model);
         }
      },
      //servidores se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      servidores: function (servidores) {
         var self = this;
         this.excel_json_datos = [];
         return servidores.map(function (servidor, index) {
            return self.excel_json_datos.push({
               'id_servidor': servidor.id_servidor || '-',

               'nom_servidor': servidor.nom_servidor || '-',
               'det_servidor': servidor.det_servidor || '-',
               'ip_servidor': servidor.ip_servidor || '-',
               'url_servidor': servidor.url_servidor || '-',

               'id_datacentro': servidor.id_datacentro || '-',
               'id_sistema_operativo': servidor.id_sistema_operativo || '-',
               'id_dominio': servidor.id_dominio || '-',

               'id_usuario_registra': servidor.id_usuario_registra || '-',
               'id_usuario_modifica': servidor.id_usuario_modifica || '-',
               'created_at': servidor.created_at || '-',
               'updated_at': servidor.updated_at || '-',
               'deleted_at': servidor.deleted_at || '-',
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

      limpiar_objeto_clase_local: function () {
         this.servidor = {
            'nom_servidor':null,
            'det_servidor':null,
            'ip_servidor':null,
            'url_servidor':null,
            'id_datacentro':null,
            'id_sistema_operativo':null,
            'id_dominio':null,
         };
      },

      inicializar: function () {
         this.$http.get('/servidores').then(response => { // success callback
            this.servidores = response.body.servidores || null;
            this.datos_excel = response.body.servidores || null;
            this.dominios = response.body.dominios || null;
            this.datacentros = response.body.datacentros || null;
            this.sistemas_operativos = response.body.sistemas_operativos || null;

            this.usuario_auth = response.body.usuario_auth || null;
            this.limpiar_objeto_clase_local();
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },


      editar: function (id_servidor) {
         this.lista_actualizar_activo = true;
         this.id_en_edicion = id_servidor;

         //id_objeto + array de objetos + nombre del model en lower case
         this.servidor = null;
         this.servidor = this.buscar_en_array_por_modelo_e_id(id_servidor,this.servidores,this.nombre_model);

      },

      guardar_editado: function () {

         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

         this.$http.put(`/${this.nombre_ruta}/${this.servidor.id_servidor}`, this.servidor).then(response => { // success callback

            if (response.status == 200) {
               if ( !this.es_null(response.body.servidor) ) {
                  this.lista_actualizar_activo = false;
                  this.id_en_edicion = null;
               }
            } else {
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

            } else {
               this.dejar_de_editar_contador ++;
            }

         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });

         return;
      },



      eliminar: function (id_servidor) {
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

               this.$http.delete(`/${this.nombre_ruta}/${id_servidor}`).then(response => {
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

         formData.append('nom_servidor', this.servidor.nom_servidor || null );
         formData.append('det_servidor', this.servidor.det_servidor || null );
         formData.append('url_servidor', this.servidor.url_servidor || null );
         formData.append('ip_servidor', this.servidor.ip_servidor || null );

         formData.append('id_dominio', this.servidor.id_dominio || null );
         formData.append('id_servicio', this.servidor.id_servicio || null );
         formData.append('id_tipo_servidor', this.servidor.id_tipo_servidor || null );

         this.$http.post(`/${this.nombre_ruta}`, formData).then(response => { // success callback

            if ( response.status == 200) {
               if ( !this.es_null(response.body.servidor) ) {
                  this.id_en_edicion = null;
               }
               //this.inicializar();
            } else {
               this.checkear_estado_respuesta_http(response.status);
               return false;
            }

            if ( this.mostrar_notificaciones(response) == true ) {
               this.ocultar_modal('crear');
               this.inicializar();

               return ;
            }

         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });

         return;
      },

      ordenar_lista: function (columna) { this.servidores = _.orderBy(this.servidores, columna, this.orden_lista); },

   }
});