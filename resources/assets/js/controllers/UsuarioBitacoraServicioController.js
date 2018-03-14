
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

const UsuarioBitacoraServicioController = new Vue({
   el: '#UsuarioBitacoraServicioController',
   data(){
      return {
         '$':window.jQuery,
         'nombre_tabla':'usuarios_bitacora_servicios', //nombre tabla o de ruta
         'nombre_ruta':'usuarios_bitacora_servicios', //nombre tabla o de ruta
         'nombre_model':'usuario_bitacora_servicio',
         'nombre_detalle':'Usuarios Bitacora Servicios',
         'nombre_controller':'UsuarioBitacoraServicioController',

         'filtro_head':null,
         'usuario_bitacora_servicio':{
            'asunto':null,
            'det_bitacora':null,
            'id_actividad':null,
            'id_servicio':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'usuario_bitacora_servicio_limpio':{
            'asunto':null,
            'det_bitacora':null,
            'id_actividad':null,
            'id_servicio':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },

         'usuarios_bitacora_servicios':[],
         'actividades':[],
         'servicios':[],
         'datos_excel':[],

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
            'id_usuario_bitacora_servicio':false,
            'asunto':true,
            'det_bitacora':true,
            'id_actividad':false,
            'id_servicio':false,
            'id_usuario_registra':false,
            'id_usuario_modifica':false,
            'created_at':true,
            'updated_at':false,
            'deleted_at':false,
         },

         'tabla_labels': {
            'id_usuario_bitacora_servicio':'Id actividad',
            'asunto':'Asunto',
            'det_bitacora':'Detalle bitácora',
            'id_actividad':'Id Actividad',
            'id_servicio':'Id Servicio',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en'
         },

         'excel_json_campos': {
            'id_usuario_bitacora_servicio': 'String',
            'asunto':'String',
            'det_bitacora':'String',
            'id_actividad':'String',
            'id_servicio':'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el usuario_bitacora_servicio
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) {
            this.limpiar_objeto_clase_local();
         } else {
            //this.usuario_bitacora_servicio = this.buscar_en_array_por_modelo_e_id(id_en_edicion,this.usuarios_bitacora_servicios,this.nombre_model);
            this.$http.get(`/${this.nombre_tabla}/${id_en_edicion}`).then(response => { // success callback
               this.usuario_bitacora_servicio = response.body[`${this.nombre_model}`];
            }, response => { // error callback
               this.checkear_estado_respuesta_http(response.status);
            });
         }
      },
      //usuarios_bitacora_servicios se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      usuarios_bitacora_servicios: function (usuarios_bitacora_servicios) {
         var self = this;
         this.excel_json_datos = [];
         return usuarios_bitacora_servicios.map(function (usuario_bitacora_servicio, index) {
            return self.excel_json_datos.push({
               'id_usuario_bitacora_servicio': usuario_bitacora_servicio.id_usuario_bitacora_servicio || '-',
               'asunto': usuario_bitacora_servicio.asunto || '-',
               'det_bitacora': usuario_bitacora_servicio.det_bitacora || '-',
               'id_servicio': usuario_bitacora_servicio.id_servicio || '-',
               'id_actividad': usuario_bitacora_servicio.id_actividad || '-',
               'id_usuario_registra': usuario_bitacora_servicio.id_usuario_registra || '-',
               'id_usuario_modifica': usuario_bitacora_servicio.id_usuario_modifica || '-',
               'created_at': usuario_bitacora_servicio.created_at || '-',
               'updated_at': usuario_bitacora_servicio.updated_at || '-',
               'deleted_at': usuario_bitacora_servicio.deleted_at || '-'
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
         this.usuario_bitacora_servicio = null; this.usuario_bitacora_servicio = this.usuario_bitacora_servicio_limpio;
      },


      inicializar: function () {
         this.$http.get(`/${this.nombre_ruta}`).then(response => { // success callback
            this.usuarios_bitacora_servicios = response.body.usuarios_bitacora_servicios || null;
            this.actividades = response.body.actividades || null;
            this.servicios = response.body.servicios || null;
            this.datos_excel = response.body.usuarios_bitacora_servicios || null;
            //this.limpiar_objeto_clase_local();
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },


      editar: function (id_usuario_bitacora_servicio) {
         this.lista_actualizar_activo = true;
         this.id_en_edicion = id_usuario_bitacora_servicio;

         //id_objeto + array de objetos + nombre del model en lower case
         this.usuario_bitacora_servicio = null;
         this.usuario_bitacora_servicio =
            this.buscar_en_array_por_modelo_e_id(id_usuario_bitacora_servicio,this.usuarios_bitacora_servicios,this.nombre_model);

      },

      guardar_editado: function () {

         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

         this.$http.put(`/${this.nombre_ruta}/${this.usuario_bitacora_servicio.id_usuario_bitacora_servicio}`,
            this.usuario_bitacora_servicio).then(response => { // success callback

            if (response.status == 200) {
               /*
               if ( !this.es_null(response.body.usuario_bitacora_servicio) ) {
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



      eliminar: function (id_usuario_bitacora_servicio) {
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

               this.$http.delete(`/${this.nombre_ruta}/${id_usuario_bitacora_servicio}`).then(response => {
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
         formData.append('asunto', this.usuario_bitacora_servicio.asunto || null );
         formData.append('det_bitacora', this.usuario_bitacora_servicio.det_bitacora || null );
         formData.append('id_actividad', this.usuario_bitacora_servicio.id_actividad || null );
         formData.append('id_servicio', this.usuario_bitacora_servicio.id_servicio || null );

         this.$http.post(`/${this.nombre_ruta}`, formData).then(response => { // success callback

            if ( response.status == 200) {
               if ( !this.es_null(response.body[this.nombre_model]) ) {
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

         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });

         return;
      },

      ordenar_lista: function (columna) { this.usuarios_bitacora_servicios = _.orderBy(this.usuarios_bitacora_servicios, columna, this.orden_lista); },

   }
});