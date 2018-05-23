
import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

Vue.component('download-excel', require('../components/DownloadExcel.vue'));
Vue.component('paginators', require('../components/Paginators.vue'));

const ActividadController = new Vue({
   el: '#ActividadController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_actividad',
         'nombre_tabla':'actividades', //nombre tabla o de ruta
         'nombre_ruta':'actividades', //nombre tabla o de ruta
         'nombre_model':'actividad',
         'nombre_model_limpio': 'actividad_limpio',
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
         'permitido_guardar':[
            'nom_actividad',
            'det_actividad',
         ],
         'relaciones_clase':[],
         'lom':{},
         'lista_objs_model':[],
         'tipos_actividades':[],
         'actividades':[],
         'datos_excel':[],
         'usuario_auth':{},

         'campos_formularios':[],
         'errores_campos':[],

         'pagination': {
            'per_page':null,
         },

         //Variables para validar si se está creando o editando
         'modal_crear_activo': false,
         'modal_actualizar_activo': false,

         //Estas var se deben conservar para todos los controllers por que se ejecutan para el modal crear (blanquea)
         'lista_actualizar_activo':false,

         'id_en_edicion': null,

         'orden_lista':'asc',

         /* Campos que se ven en el tablero */
         'tabla_campos': {
            'id_actividad':false,
            'nom_actividad':true,
            'det_actividad':false,
            //'id_usuario_registra':false,
            //'id_usuario_modifica':false,
            'created_at':true,
            'updated_at':false,
            'deleted_at':false,
         },

         /* Etiquetas */
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

         /* Campos del modelo en el excel */
         'excel_json_campos': {
            'id_actividad': 'String',
            'nom_actividad': 'String',
            'det_actividad': 'String',
            //'id_usuario_registra': 'String',
            //'id_usuario_modifica': 'String',
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
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase(id_en_edicion); }
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
               //'id_usuario_registra': actividad.id_usuario_registra|| '-',
               //'id_usuario_modifica': actividad.id_usuario_modifica|| '-',
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
   },
   ready: {},
   filters: {},
   mixins: [ inyeccion_funciones_compartidas ],
   methods: {

      asignar_recursos: function (response) {

         /* Datos intrinsecos de la entidad */
         this.lista_objs_model = response.body.actividades.data || null;
         this.actividades = response.body.actividades.data || null;
         this.datos_excel = response.body.actividades.data || null;

         /* Datos de la entidad hacia el paginador */
         this.pagination = response.body.actividades || null;

         /* Datos de la sesion actual del usuario */
         this.usuario_auth = response.body.usuario_auth || null;

      },

   }
});