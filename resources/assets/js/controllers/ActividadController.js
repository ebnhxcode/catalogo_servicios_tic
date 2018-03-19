
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

const ActividadController = new Vue({
   el: '#ActividadController',
   data(){
      return {
         '$':window.jQuery,
         'nombre_tabla':'actividades', //nombre tabla o de ruta
         'nombre_ruta':'actividades', //nombre tabla o de ruta
         'nombre_model':'actividad',
         'nombre_detalle':'Actividades',
         'nombre_controller':'ActividadController',

         'filtro_head':null,
         'actividad':{
            'nom_actividad':null,
            'det_actividad':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'actividad_limpio':{
            'nom_actividad':null,
            'det_actividad':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'lom':{},
         'lista_objs_model':[],
         'tipos_actividades':[],
         'actividades':[],
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
            'id_actividad':false,
            'nom_actividad':true,
            'det_actividad':false,
            'id_usuario_registra':false,
            'id_usuario_modifica':false,
            'created_at':true,
            'updated_at':false,
            'deleted_at':false,
         },

         'tabla_labels': {
            'id_actividad':'Id actividad',
            'nom_actividad':'Nombre',
            'det_actividad':'Detalle',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en'
         },

         'excel_json_campos': {
            'id_actividad': 'String',
            'nom_actividad': 'String',
            'det_actividad': 'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el actividad
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) {
            this.limpiar_objeto_clase_local();
         } else {
            //this.actividad = this.buscar_en_array_por_modelo_e_id(id_en_edicion,this.actividades,this.nombre_model);
            this.$http.get(`/${this.nombre_tabla}/${id_en_edicion}`).then(response => { // success callback
               this.actividad = response.body[`${this.nombre_model}`];
            }, response => { // error callback
               this.checkear_estado_respuesta_http(response.status);
            });
         }
      },
      //actividades se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      actividades: function (actividades) {
         var self = this;
         this.excel_json_datos = [];
         return actividades.map(function (actividad, index) {
            return self.excel_json_datos.push({
               'id_actividad': actividad.id_actividad|| '-',
               'nom_actividad': actividad.nom_actividad|| '-',
               'det_actividad': actividad.det_actividad|| '-',
               'id_actividad_registra': actividad.id_actividad_registra|| '-',
               'id_actividad_modifica': actividad.id_actividad_modifica|| '-',
               'created_at': actividad.created_at|| '-',
               'updated_at': actividad.updated_at|| '-',
               'deleted_at': actividad.deleted_at|| '-'
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
         this.actividad = null; this.actividad = this.actividad_limpio;
      },


      inicializar: function () {
         this.$http.get(`/${this.nombre_ruta}`).then(response => { // success callback
            this.lista_objs_model = response.body.actividades || null;
            this.actividades = response.body.actividades || null;
            this.tipos_actividades = response.body.tipos_actividades || null;
            this.datos_excel = response.body.actividades || null;
            //this.limpiar_objeto_clase_local();
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },


      editar: function (id_actividad) {
         this.lista_actualizar_activo = true;
         this.id_en_edicion = id_actividad;

         //id_objeto + array de objetos + nombre del model en lower case
         this.actividad = null;
         this.actividad = this.buscar_en_array_por_modelo_e_id(id_actividad,this.actividades,this.nombre_model);

      },

      guardar_editado: function () {

         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

         this.$http.put(`/${this.nombre_ruta}/${this.actividad.id_actividad}`, this.actividad).then(response => { // success callback

            if (response.status == 200) {
               /*
               if ( !this.es_null(response.body.actividad) ) {
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



      eliminar: function (id_actividad) {
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

               this.$http.delete(`/${this.nombre_ruta}/${id_actividad}`).then(response => {
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
         formData.append('nom_actividad', this.actividad.nom_actividad || null );
         formData.append('det_actividad', this.actividad.det_actividad || null );

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