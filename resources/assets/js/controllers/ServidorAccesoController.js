
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

const ServidorAccesoController = new Vue({
   el: '#ServidorAccesoController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_servidor_acceso',
         'nombre_tabla':'servidores_accesos', //nombre tabla o de ruta
         'nombre_ruta':'servidores_accesos', //nombre tabla o de ruta
         'nombre_model':'servidor_acceso',
         'nombre_model_limpio': 'servidor_acceso_limpio',
         'nombre_detalle':'Servidores Accesos',
         'nombre_controller':'ServidorAccesoController',

         'filtro_head':null,
         'servidor_acceso':{
            'usuario':null,
            'clave':null,
            'decrypted_clave':null,
            'tipo_acceso':null,
            'puerto':null,
            'id_servidor':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'servidor_acceso_limpio':{
            'usuario':null,
            'clave':null,
            'decrypted_clave':null,
            'tipo_acceso':null,
            'puerto':null,
            'id_servidor':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'lom':{},
         'lista_objs_model':[],
         'servidores':[],
         'servidores_accesos':[],
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
            'puerto':true,
            'id_servidor':false,
            'id_usuario_registra':false,
            'id_usuario_modifica':false,
            'created_at':false,
            'updated_at':false,
            'deleted_at':false,
         },

         'tabla_labels': {
            'usuario':'Usuario',
            'clave':'Clave',
            'tipo_acceso':'Tipo Acceso',
            'puerto':'Puerto',
            'id_servidor':'Id Servidor',
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
            'puerto':'String',
            'id_servidor':'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el servidor_acceso
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) {
            this.limpiar_objeto_clase_local();
         } else {
            this.$http.get(`/${this.nombre_tabla}/${id_en_edicion}`).then(response => { // success callback
               this.servidor_acceso = response.body[`${this.nombre_model}`];
            }, response => { // error callback
               this.checkear_estado_respuesta_http(response.status);
            });
         }
      },
      //servidores_accesos se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      servidores_accesos: function (servidores_accesos) {
         var self = this;
         this.excel_json_datos = [];
         return servidores_accesos.map(function (servidor_acceso, index) {
            return self.excel_json_datos.push({
               'usuario': servidor_acceso.usuario || '-',
               'clave': servidor_acceso.clave || '-',
               'tipo_acceso': servidor_acceso.tipo_acceso || '-',
               'puerto': servidor_acceso.puerto || '-',
               'id_servidor': servidor_acceso.id_servidor || '-',
               'id_usuario_registra': servidor_acceso.id_usuario_registra || '-',
               'id_usuario_modifica': servidor_acceso.id_usuario_modifica || '-',
               'created_at': servidor_acceso.created_at || '-',
               'updated_at': servidor_acceso.updated_at || '-',
               'deleted_at': servidor_acceso.deleted_at || '-',
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


      inicializar: function () {
         this.$http.get(`/${this.nombre_ruta}`).then(response => { // success callback
            this.lista_objs_model = response.body.servidores_accesos || null;
            this.servidores_accesos = response.body.servidores_accesos || null;
            this.servidores = response.body.servidores || null;
            this.datos_excel = response.body.servidores_accesos || null;

            this.usuario_auth = response.body.usuario_auth || null;
            //this.limpiar_objeto_clase_local();
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },


      editar: function (id_servidor_acceso) {
         this.lista_actualizar_activo = true;
         this.id_en_edicion = id_servidor_acceso;

         //id_objeto + array de objetos + nombre del model en lower case
         this.servidor_acceso = null;
         this.servidor_acceso = this.buscar_en_array_por_modelo_e_id(id_servidor_acceso,this.servidores_accesos,this.nombre_model);

      },

      guardar_editado: function () {

         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

         this.$http.put(`/${this.nombre_ruta}/${this.servidor_acceso.id_servidor_acceso}`, this.servidor_acceso).then(response => { // success callback

            if (response.status == 200) {
               /*
               if ( !this.es_null(response.body.servidor_acceso) ) {
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



      eliminar: function (id_servidor_acceso) {
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

               this.$http.delete(`/${this.nombre_ruta}/${id_servidor_acceso}`).then(response => {
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

         formData.append('usuario', this.servidor_acceso.usuario || null );
         formData.append('clave', this.servidor_acceso.clave || null );
         formData.append('tipo_acceso', this.servidor_acceso.tipo_acceso || null );
         formData.append('puerto', this.servidor_acceso.puerto || null );
         formData.append('id_servidor', this.servidor_acceso.id_servidor || null );

         this.$http.post(`/${this.nombre_ruta}`, formData).then(response => { // success callback

            if ( response.status == 200) {
               if ( !this.es_null(response.body.servidor_acceso) ) {
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