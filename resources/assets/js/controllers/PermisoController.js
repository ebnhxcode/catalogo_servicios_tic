
import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

Vue.component('download-excel', require('../components/DownloadExcel.vue'));
Vue.component('paginators', require('../components/Paginators.vue'));

const PermisoController = new Vue({
   el: '#PermisoController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_permiso',
         'nombre_tabla':'permisos', //nombre tabla o de ruta
         'nombre_ruta':'permisos', //nombre tabla o de ruta
         'nombre_model':'permiso',
         'nombre_model_limpio': 'permiso_limpio',
         'nombre_detalle':'Permisos',
         'nombre_controller':'PermisoController',

         'filtro_head':null,
         'permiso':{
            'nom_permiso':null,
            'det_permiso':null,
            'cod_permiso':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'permitido_guardar':[
            'nom_permiso',
            'det_permiso',
            'cod_permiso',
         ],
         'relaciones_clase':[],
         'lom':{},
         'lista_objs_model':[],
         'permisos':[],

         'spinner_table':true,

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
            'id_permiso':{'visibility':false,'value':null},
            'nom_permiso':{'visibility':true,'value':null},
            'det_permiso':{'visibility':false,'value':null},
            'cod_permiso':{'visibility':false,'value':null},
            //'id_usuario_registra':{'visibility':false,'value':null},
            //'id_usuario_modifica':{'visibility':false,'value':null},
            'created_at':{'visibility':false,'value':null},
            'updated_at':{'visibility':false,'value':null},
            'deleted_at':{'visibility':false,'value':null},
         },

         /* Etiquetas */
         'tabla_labels': {
            'id_permiso':'Id permiso',
            'nom_permiso':'Nombre permiso',
            'det_permiso':'Detalle permiso',
            'cod_permiso':'Código permiso',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en'
         },

         /* Campos del modelo en el excel */
         'excel_json_campos': {
            'id_permiso': 'String',
            'nom_permiso': 'String',
            'det_permiso': 'String',
            'cod_permiso': 'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el permiso
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase_config_relaciones(id_en_edicion, this.relaciones_clase); }
      },
      //permisos se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      permisos: function (permisos) {
         var self = this;
         this.excel_json_datos = [];
         return permisos.map(function (permiso, index) {
            return self.excel_json_datos.push({
               'id_permiso': permiso.id_permiso || '-',
               'nom_permiso': permiso.nom_permiso || '-',
               'det_permiso': permiso.det_permiso || '-',
               'cod_permiso': permiso.cod_permiso || '-',
               //'id_usuario_registra': permiso.id_usuario_registra || '-',
               //'id_usuario_modifica': permiso.id_usuario_modifica || '-',
               'created_at': permiso.created_at || '-',
               'updated_at': permiso.updated_at || '-',
               'deleted_at': permiso.deleted_at || '-'
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
         this.lista_objs_model = response.body.permisos.data || null;
         this.permisos = response.body.permisos.data || null;
         this.datos_excel = response.body.permisos.data || null;

         /* Datos de la entidad hacia el paginador */
         this.pagination = response.body.permisos || null;

         /* Datos de la sesion actual del usuario */
         this.usuario_auth = response.body.usuario_auth || null;

      },
   }
});