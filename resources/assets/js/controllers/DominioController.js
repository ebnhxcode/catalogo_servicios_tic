
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

const DominioController = new Vue({
   el: '#DominioController',
   data(){
      return {
         'nombre_tabla':'dominios', //nombre tabla o de ruta
         'nombre_ruta':'dominios', //nombre tabla o de ruta
         'nombre_model':'dominio',
         'nombre_detalle':'Dominios',
         'nombre_controller':'DominioController',

         'filtro_head':null,
         'dominio':{
            'nom_dominio':null,
            'det_dominio':null,
            'ip_publica':null,
            'ip_balanceador':null,
            'dns_asoc_dominio':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'dominio_limpio':{
            'nom_dominio':null,
            'det_dominio':null,
            'ip_publica':null,
            'ip_balanceador':null,
            'dns_asoc_dominio':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'dominios':[],
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
            'id_dominio':false,
            'nom_dominio':true,
            'det_dominio':false,
            'ip_publica':false,
            'ip_balanceador':false,
            'dns_asoc_dominio':false,
            'id_usuario_registra':false,
            'id_usuario_modifica':false,
            'created_at':true,
            'updated_at':false,
            'deleted_at':false,
         },

         'tabla_labels': {
            'id_dominio':'Id dominio',
            'nom_dominio':'Nombre dominio',
            'det_dominio':'Detalle dominio',
            'ip_publica':'Ip Publica',
            'ip_balanceador':'Ip Balanceador',
            'dns_asoc_dominio':'DNS asociado dominio',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en'
         },

         'excel_json_campos': {
            'id_dominio': 'String',
            'nom_dominio': 'String',
            'det_dominio': 'String',
            'ip_publica': 'String',
            'ip_balanceador': 'String',
            'dns_asoc_dominio': 'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el dominio
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) {
            this.limpiar_objeto_clase_local();
         } else {
            this.dominio = this.buscar_en_array_por_modelo_e_id(id_en_edicion,this.dominios,this.nombre_model);
         }
      },
      //dominios se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      dominios: function (dominios) {
         var self = this;
         this.excel_json_datos = [];
         return dominios.map(function (dominio, index) {
            return self.excel_json_datos.push({
               'id_dominio': dominio.id_dominio || '-',
               'nom_dominio': dominio.nom_dominio || '-',
               'det_dominio': dominio.det_dominio || '-',
               'ip_publica': dominio.ip_publica || '-',
               'ip_balanceador': dominio.ip_balanceador || '-',
               'dns_asoc_dominio': dominio.dns_asoc_dominio || '-',
               'id_usuario_registra': dominio.id_usuario_registra || '-',
               'id_usuario_modifica': dominio.id_usuario_modifica || '-',
               'created_at': dominio.created_at || '-',
               'updated_at': dominio.updated_at || '-',
               'deleted_at': dominio.deleted_at || '-'
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
         this.dominio = {
            'nom_dominio':null,
            'det_dominio':null,
            'ip_publica':null,
            'ip_balanceador':null,
            'dns_asoc_dominio':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         };
      },

      inicializar: function () {
         this.$http.get('/dominios').then(response => { // success callback
            this.dominios = response.body.dominios || null;
            this.datos_excel = response.body.dominios || null;
            this.usuario_auth = response.body.usuario_auth || null;
            this.limpiar_objeto_clase_local();
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },


      editar: function (id_dominio) {
         this.lista_actualizar_activo = true;
         this.id_en_edicion = id_dominio;

         //id_objeto + array de objetos + nombre del model en lower case
         this.dominio = null;
         this.dominio = this.buscar_en_array_por_modelo_e_id(id_dominio,this.dominios,this.nombre_model);

      },

      guardar_editado: function () {

         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

         this.$http.put(`/${this.nombre_ruta}/${this.dominio.id_dominio}`, this.dominio).then(response => { // success callback

            if (response.status == 200) {
               if ( !this.es_null(response.body.dominio) ) {
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



      eliminar: function (id_dominio) {
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

               this.$http.delete(`/${this.nombre_ruta}/${id_dominio}`).then(response => {
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
         formData.append('nom_dominio', this.dominio.nom_dominio || null );
         formData.append('det_dominio', this.dominio.det_dominio || null );
         formData.append('ip_publica',this.dominio.ip_publica || null );
         formData.append('ip_balanceador',this.dominio.ip_balanceador || null );
         formData.append('dns_asoc_dominio',this.dominio.dns_asoc_dominio || null );

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
               this.ocultar_modal('crear');
               this.inicializar();

               return ;
            }

         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });

         return;
      },

      ordenar_lista: function (columna) { this.dominios = _.orderBy(this.dominios, columna, this.orden_lista); },

   }
});