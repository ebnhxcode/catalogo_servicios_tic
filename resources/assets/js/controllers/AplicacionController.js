
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

const AplicacionController = new Vue({
   el: '#AplicacionController',
   data(){
      return {
         'nombre_tabla':'aplicaciones', //nombre tabla o de ruta
         'nombre_ruta':'aplicaciones', //nombre tabla o de ruta
         'nombre_model':'aplicacion',
         'nombre_detalle':'Aplicaciones',
         'nombre_controller':'AplicacionController',

         'filtro_head':null,
         'aplicacion':{
            'nom_aplicacion':null,
            'det_aplicacion':null,
            'id_actividad':null,
            'id_usuario':null,
         },
         'aplicacion_limpio':{
            'nom_aplicacion':null,
            'det_aplicacion':null,
            'id_actividad':null,
            'id_usuario':null,
         },
         'actividades':[],
         'aplicaciones':[],
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
            'id_aplicacion':false,
            'nom_aplicacion':true,
            'det_aplicacion':true,
            'id_actividad':false,
            'id_usuario':false,
            'id_usuario_registra':false,
            'id_usuario_modifica':false,
            'created_at':true,
            'updated_at':false,
            'deleted_at':false,
         },

         'tabla_labels': {
            'id_aplicacion':'Id aplicacion',
            'nom_aplicacion':'Nombre aplicacion',
            'det_aplicacion':'Detalle aplicacion',
            'id_actividad':'Id Actividad',
            'id_usuario':'Id Usuario',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en',
         },

         'excel_json_campos': {
            'id_aplicacion':'String',
            'nom_aplicacion':'String',
            'det_aplicacion':'String',
            'id_actividad':'String',
            'id_usuario':'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el aplicacion
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) {
            this.limpiar_objeto_clase_local();

         } else {
            this.aplicacion = this.buscar_en_array_por_modelo_e_id(id_en_edicion,this.aplicaciones,this.nombre_model);
         }
      },
      //aplicaciones se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      aplicaciones: function (aplicaciones) {
         var self = this;
         this.excel_json_datos = [];
         return aplicaciones.map(function (aplicacion, index) {
            return self.excel_json_datos.push({
               'id_aplicacion': aplicacion.id_aplicacion || '-',
               'nom_aplicacion': aplicacion.nom_aplicacion || '-',
               'det_aplicacion': aplicacion.det_aplicacion || '-',
               'id_actividad': aplicacion.id_actividad || '-',
               'id_usuario': aplicacion.id_usuario || '-',
               'id_usuario_registra': aplicacion.id_usuario_registra || '-',
               'id_usuario_modifica': aplicacion.id_usuario_modifica || '-',
               'created_at': aplicacion.created_at || '-',
               'updated_at': aplicacion.updated_at || '-',
               'deleted_at': aplicacion.deleted_at || '-',
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
         this.aplicacion = {
            'nom_aplicacion':null,
            'det_aplicacion':null,
            'id_actividad':null,
            'id_usuario':null,
         };
      },

      inicializar: function () {
         this.$http.get('/aplicaciones').then(response => { // success callback
            this.actividades = response.body.actividades || null;
            this.aplicaciones = response.body.aplicaciones || null;
            this.datos_excel = response.body.aplicaciones || null;
            this.usuario_auth = response.body.usuario_auth || null;
            this.limpiar_objeto_clase_local();
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },


      editar: function (id_aplicacion) {
         this.lista_actualizar_activo = true;
         this.id_en_edicion = id_aplicacion;

         //id_objeto + array de objetos + nombre del model en lower case
         this.aplicacion = null;
         this.aplicacion = this.buscar_en_array_por_modelo_e_id(id_aplicacion,this.aplicaciones,this.nombre_model);

      },

      guardar_editado: function () {

         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

         this.$http.put(`/${this.nombre_ruta}/${this.aplicacion.id_aplicacion}`, this.aplicacion).then(response => { // success callback

            if (response.status == 200) {
               if ( !this.es_null(response.body.aplicacion) ) {
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



      eliminar: function (id_aplicacion) {
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

               this.$http.delete(`/${this.nombre_ruta}/${id_aplicacion}`).then(response => {
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
         formData.append('nom_aplicacion', this.aplicacion.nom_aplicacion || null );
         formData.append('det_aplicacion', this.aplicacion.det_aplicacion || null );
         formData.append('id_actividad', this.aplicacion.id_actividad || null );

         this.$http.post(`/${this.nombre_ruta}`, formData).then(response => { // success callback

            if ( response.status == 200) {
               if ( !this.es_null(response.body.aplicacion) ) {
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

      ordenar_lista: function (columna) { this.aplicaciones = _.orderBy(this.aplicaciones, columna, this.orden_lista); },

   }
});