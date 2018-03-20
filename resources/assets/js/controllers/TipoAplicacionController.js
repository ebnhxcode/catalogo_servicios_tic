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

const TipoAplicacionController = new Vue({
   el: '#TipoAplicacionController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_tipo_aplicacion',
         'nombre_tabla': 'tipos_aplicaciones', //nombre tabla o de ruta
         'nombre_ruta': 'tipos_aplicaciones', //nombre tabla o de ruta
         'nombre_model': 'tipo_aplicacion',
         'nombre_model_limpio': 'tipo_aplicacion_limpio',
         'nombre_detalle': 'Tipos Aplicaciones',
         'nombre_controller': 'TipoAplicacionController',


         'filtro_head': null,
         'tipo_aplicacion': {
            'nom_tipo_aplicacion': null,
            'det_tipo_aplicacion': null,
            'cod_tipo_aplicacion': null,
            'id_usuario_registra': null,
            'id_usuario_modifica': null,
            'created_at': null,
            'updated_at': null,
            'deleted_at': null,
         },
         'permitido_guardar':[
            'nom_tipo_aplicacion',
            'det_tipo_aplicacion',
            'cod_tipo_aplicacion',
         ],
         'lom':{},
         'lista_objs_model':[],
         'tipos_aplicaciones': [],
         'datos_excel': [],
         'usuario_auth': {},

         'campos_formularios': [],
         'errores_campos': [],

         //Variables para validar si se está creando o editando
         'modal_crear_activo': false,
         'modal_actualizar_activo': false,

         //Estas var se deben conservar para todos los controllers por que se ejecutan para el modal crear (blanquea)
         'lista_actualizar_activo': false,

         'id_en_edicion': null,

         'orden_lista': 'asc',

         'tabla_campos': {
            'id_tipo_aplicacion': false,
            'nom_tipo_aplicacion': true,
            'det_tipo_aplicacion': true,
            'cod_tipo_aplicacion': false,
            'id_usuario_registra': false,
            'id_usuario_modifica': false,
            'created_at': false,
            'updated_at': false,
            'deleted_at': false,
         },

         'tabla_labels': {
            'id_tipo_aplicacion': 'Id tipo aplicacion',
            'nom_tipo_aplicacion': 'Nombre tipo aplicacion',
            'det_tipo_aplicacion': 'Detalle tipo aplicacion',
            'cod_tipo_aplicacion': 'Codigo tipo aplicacion',
            'id_usuario_registra': 'Usuario registra',
            'id_usuario_modifica': 'Usuario modifica',
            'created_at': 'Creado en',
            'updated_at': 'Actualizado en',
            'deleted_at': 'Eliminado en'
         },

         'excel_json_campos': {
            'id_tipo_aplicacion': 'String',
            'nom_tipo_aplicacion': 'String',
            'det_tipo_aplicacion': 'String',
            'cod_tipo_aplicacion': 'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el tipo_aplicacion
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) {
            this.limpiar_objeto_clase_local();
         } else {
            this.$http.get(`/${this.nombre_tabla}/${id_en_edicion}`).then(response => { // success callback
               this.$data[`${this.nombre_model}`] = response.body[`${this.nombre_model}`];
            }, response => { // error callback
               this.checkear_estado_respuesta_http(response.status);
            });
         }
      },
      //tipos_aplicaciones se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      tipos_aplicaciones: function (tipos_aplicaciones) {
         var self = this;
         this.excel_json_datos = [];
         return tipos_aplicaciones.map(function (tipo_aplicacion, index) {
            return self.excel_json_datos.push({
               'id_tipo_aplicacion': tipo_aplicacion.id_tipo_aplicacion || '-',
               'nom_tipo_aplicacion': tipo_aplicacion.nom_tipo_aplicacion || '-',
               'det_tipo_aplicacion': tipo_aplicacion.det_tipo_aplicacion || '-',
               'cod_tipo_aplicacion': tipo_aplicacion.cod_tipo_aplicacion || '-',
               'id_usuario_registra': tipo_aplicacion.id_usuario_registra || '-',
               'id_usuario_modifica': tipo_aplicacion.id_usuario_modifica || '-',
               'created_at': tipo_aplicacion.created_at || '-',
               'updated_at': tipo_aplicacion.updated_at || '-',
               'deleted_at': tipo_aplicacion.deleted_at || '-'
            });
         });
      },
   },
   components: {
      //'download-excel': DownloadExcel,
   },
   created(){
      this.inicializar();

      $(document).ready(function () {
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
   mixins: [inyeccion_funciones_compartidas],
   methods: {


      inicializar: function () {
         this.$http.get(`/${this.nombre_ruta}`).then(response => { // success callback
            this.lista_objs_model = response.body.tipos_aplicaciones || null;
            this.tipos_aplicaciones = response.body.tipos_aplicaciones || null;
            this.datos_excel = response.body.tipos_aplicaciones || null;
            this.usuario_auth = response.body.usuario_auth || null;
            //this.limpiar_objeto_clase_local();
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },


      editar: function (id_tipo_aplicacion) {

         this.id_en_edicion = id_tipo_aplicacion;

         this.lista_actualizar_activo = true;

         //id_objeto + array de objetos + nombre del model en lower case
         this.$data[`${this.nombre_model}`] = null;
         this.$data[`${this.nombre_model}`] = this.buscar_en_array_por_modelo_e_id(this.$data[`${this.nombre_model}`][`${this.pk_tabla}`], this.$data[`${this.nombre_ruta}`], this.nombre_model);
      },

      guardar_editado: function () {

         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

         this.$http.put(`/${this.nombre_ruta}/${this.tipo_aplicacion.id_tipo_aplicacion}`, this.tipo_aplicacion).then(response => { // success callback

            if (response.status == 200) {
               /*
               if (!this.es_null(response.body.tipo_aplicacion)) {
                  this.lista_actualizar_activo = false;
                  this.id_en_edicion = null;
               }
               */
            } else {
               this.checkear_estado_respuesta_http(response.status);
               return false;
            }

            if (this.mostrar_notificaciones(response) == true) {


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


      eliminar: function (id_tipo_aplicacion) {
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

               this.$http.delete(`/${this.nombre_ruta}/${id_tipo_aplicacion}`).then(response => {
                  if (response.status == 200) {
                     this.auto_alerta_corta("Eliminado!", "Registro eliminado correctamente", "success");
                  } else {
                     this.checkear_estado_respuesta_http(response.status);
                     return false;
                  }

                  if (this.mostrar_notificaciones(response) == true) {
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
               this.auto_alerta_corta("Cancelado", "Se ha cancelado la eliminación", "success");
            }
         });

      },


   }
});