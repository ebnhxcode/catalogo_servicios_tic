
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

const AplicacionAccesoController = new Vue({
   el: '#AplicacionAccesoController',
   data(){
      return {
         '$':window.jQuery,
         'nombre_tabla':'aplicaciones_accesos', //nombre tabla o de ruta
         'nombre_ruta':'aplicaciones_accesos', //nombre tabla o de ruta
         'nombre_model':'aplicacion_acceso',
         'nombre_detalle':'Aplicaciones Accesos',
         'nombre_controller':'AplicacionAccesoController',

         'filtro_head':null,
         'aplicacion_acceso':{
            'usuario':null,
            'clave':null,
            'decrypted_clave':null,
            'tipo_acceso':null,
            'email':null,
            'id_aplicacion':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'aplicacion_acceso_limpio':{
            'usuario':null,
            'clave':null,
            'decrypted_clave':null,
            'tipo_acceso':null,
            'email':null,
            'id_aplicacion':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'lom':{},
         'lista_objs_model':[],
         'aplicaciones':[],
         'aplicaciones_accesos':[],
         'datos_excel':[],
         'usuario_auth':{},

         'campos_formularios':[],
         'errores_campos':[],

         //Variables para validar si se está creando o editando, variables del modal
         'modal_crear_activo': false,
         'modal_actualizar_activo': false,
         'modal_width': 90,

         //Estas var se deben conservar para todos los controllers por que se ejecutan para el modal crear (blanquea)
         'lista_actualizar_activo':false,

         'id_en_edicion': null,

         'orden_lista':'asc',

         'tabla_campos': {
            'usuario':true,
            //'clave':false,
            'tipo_acceso':true,
            'email':true,
            'id_aplicacion':false,
            'id_usuario_registra':false,
            'id_usuario_modifica':false,
            'created_at':true,
            'updated_at':false,
            'deleted_at':false,
         },

         'tabla_labels': {
            'usuario':'Usuario',
            'clave':'Clave',
            'tipo_acceso':'Tipo Acceso',
            'email':'email',
            'id_aplicacion':'Id Aplicacion',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en',
         },

         'excel_json_campos': {
            'usuario':'String',
            'clave':'String',
            'tipo_acceso':'String',
            'email':'String',
            'id_aplicacion':'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el aplicacion_acceso
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) {
            this.limpiar_objeto_clase_local();
         } else {
            this.$http.get(`/${this.nombre_tabla}/${id_en_edicion}`).then(response => { // success callback
               this.aplicacion_acceso = response.body[`${this.nombre_model}`];
            }, response => { // error callback
               this.checkear_estado_respuesta_http(response.status);
            });
         }
      },
      //aplicaciones_accesos se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      aplicaciones_accesos: function (aplicaciones_accesos) {
         var self = this;
         this.excel_json_datos = [];
         return aplicaciones_accesos.map(function (aplicacion_acceso, index) {
            return self.excel_json_datos.push({
               'usuario': aplicacion_acceso.usuario || '-',
               'clave': aplicacion_acceso.clave || '-',
               'tipo_acceso': aplicacion_acceso.tipo_acceso || '-',
               'email': aplicacion_acceso.email || '-',
               'id_aplicacion': aplicacion_acceso.id_aplicacion || '-',
               'id_usuario_registra': aplicacion_acceso.id_usuario_registra || '-',
               'id_usuario_modifica': aplicacion_acceso.id_usuario_modifica || '-',
               'created_at': aplicacion_acceso.created_at || '-',
               'updated_at': aplicacion_acceso.updated_at || '-',
               'deleted_at': aplicacion_acceso.deleted_at || '-',
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

   },
   ready: {},
   filters: {},
   mixins: [ inyeccion_funciones_compartidas ],
   methods: {


      limpiar_objeto_clase_local: function () {
         this.aplicacion_acceso = null; this.aplicacion_acceso = this.aplicacion_acceso_limpio;
      },

      inicializar: function () {
         this.$http.get(`/${this.nombre_ruta}`).then(response => { // success callback
            this.lista_objs_model = response.body.aplicaciones_accesos || null;
            this.aplicaciones_accesos = response.body.aplicaciones_accesos || null;
            this.aplicaciones = response.body.aplicaciones || null;
            this.datos_excel = response.body.aplicaciones_accesos || null;

            this.usuario_auth = response.body.usuario_auth || null;
            //this.limpiar_objeto_clase_local();
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },


      editar: function (id_aplicacion_acceso) {
         this.lista_actualizar_activo = true;
         this.id_en_edicion = id_aplicacion_acceso;

         //id_objeto + array de objetos + nombre del model en lower case
         this.aplicacion_acceso = null;
         this.aplicacion_acceso = this.buscar_en_array_por_modelo_e_id(id_aplicacion_acceso,this.aplicaciones_accesos,this.nombre_model);

      },

      guardar_editado: function () {

         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

         this.$http.put(`/${this.nombre_ruta}/${this.aplicacion_acceso.id_aplicacion_acceso}`, this.aplicacion_acceso).then(response => { // success callback

            if (response.status == 200) {
               /*
               if ( !this.es_null(response.body.aplicacion_acceso) ) {
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



      eliminar: function (id_aplicacion_acceso) {
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

               this.$http.delete(`/${this.nombre_ruta}/${id_aplicacion_acceso}`).then(response => {
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

         formData.append('usuario', this.aplicacion_acceso.usuario || null );
         formData.append('clave', this.aplicacion_acceso.clave || null );
         formData.append('tipo_acceso', this.aplicacion_acceso.tipo_acceso || null );
         formData.append('email', this.aplicacion_acceso.email || null );
         formData.append('id_aplicacion', this.aplicacion_acceso.id_aplicacion || null );

         this.$http.post(`/${this.nombre_ruta}`, formData).then(response => { // success callback

            if ( response.status == 200) {
               if ( !this.es_null(response.body.aplicacion_acceso) ) {
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
               this.limpiar_objeto_clase_local();
               return ;
            }
s
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });

         return;
      },

   }
});