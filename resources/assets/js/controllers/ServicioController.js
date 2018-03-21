
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

const ServicioController = new Vue({
   el: '#ServicioController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_servicio',
         'nombre_tabla':'servicios', //nombre tabla o de ruta
         'nombre_ruta':'servicios', //nombre tabla o de ruta
         'nombre_model':'servicio',
         'nombre_model_limpio': 'servicio_limpio',
         'nombre_detalle':'Servicios',
         'nombre_controller':'ServicioController',

         'filtro_head':null,
         'servicio':{
            'nom_servicio':null,
            'det_servicio':null,
            'id_actividad':null,
            'id_usuario':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'permitido_guardar':[
            'nom_servicio',
            'det_servicio',
            'id_actividad',
            'id_usuario',
         ],
         'relaciones_clase':[
            {'actividad':'id_actividad'},
            {'usuario':'id_usuario'},
         ],
         'lom':{},
         'lista_objs_model':[],
         'actividades':[],
         'servicios':[],
         'usuarios_bitacora_servicios':[],
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
            'id_servicio':false,
            'nom_servicio':true,
            'det_servicio':true,
            'id_actividad':false,
            'id_usuario':false,
            'id_usuario_registra':false,
            'id_usuario_modifica':false,
            'created_at':false,
            'updated_at':false,
            'deleted_at':false,
         },

         'tabla_labels': {
            'id_servicio':'Id Servicio',
            'nom_servicio':'Nombre servicio',
            'det_servicio':'Detalle servicio',
            'id_actividad':'Id Actividad',
            'id_usuario':'Id Usuario',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en',
         },

         'excel_json_campos': {
            'id_servicio':'String',
            'nom_servicio':'String',
            'det_servicio':'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el servicio
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase_config_relaciones(id_en_edicion, this.relaciones_clase); }
      },
      //servicios se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      servicios: function (servicios) {
         var self = this;
         this.excel_json_datos = [];
         return servicios.map(function (servicio, index) {
            return self.excel_json_datos.push({
               'id_servicio': servicio.id_servicio || '-',
               'nom_servicio': servicio.nom_servicio || '-',
               'det_servicio': servicio.det_servicio || '-',
               'id_actividad': servicio.id_actividad || '-',
               'id_usuario': servicio.id_usuario || '-',
               'id_usuario_registra': servicio.id_usuario_registra || '-',
               'id_usuario_modifica': servicio.id_usuario_modifica || '-',
               'created_at': servicio.created_at || '-',
               'updated_at': servicio.updated_at || '-',
               'deleted_at': servicio.deleted_at || '-',
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
            this.lista_objs_model = response.body.servicios || null;
            this.actividades = response.body.actividades || null;
            this.usuarios_bitacora_servicios = response.body.usuarios_bitacora_servicios || null;
            this.datos_excel = response.body.servicios || null;
            this.usuario_auth = response.body.usuario_auth || null;
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },
   }
});