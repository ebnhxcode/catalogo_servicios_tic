
import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

Vue.component('download-excel', require('../components/DownloadExcel.vue'));
Vue.component('paginators', require('../components/Paginators.vue'));

const TagController = new Vue({
   el: '#TagController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_tag',
         'nombre_tabla':'tags', //nombre tabla o de ruta
         'nombre_ruta':'tags', //nombre tabla o de ruta
         'nombre_model':'tag',
         'nombre_model_limpio': 'tag_limpio',
         'nombre_detalle':'Tags',
         'nombre_controller':'TagController',

         'filtro_head':null,
         'tag':{
            'nom_tag':null,
            'det_tag':null,
            'meta_tag':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'permitido_guardar':[
            'nom_tag',
            'det_tag',
            'meta_tag',
         ],
         'relaciones_clase':[],
         'lom':{},
         'lista_objs_model':[],
         'tags':[],
         'datos_excel':[],
         'usuario_auth':{},

         'permisos':[],
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
            'id_tag':false,
            'nom_tag':true,
            'det_tag':true,
            'meta_tag':true,
            //'id_usuario_registra':false,
            //'id_usuario_modifica':false,
            'created_at':false,
            'updated_at':false,
            'deleted_at':false,
         },

         /* Etiquetas */
         'tabla_labels': {
            'id_tag':'Id tag',
            'nom_tag':'Nombre tag',
            'det_tag':'Detalle tag',
            'meta_tag':'Meta tag',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en',
         },

         /* Campos del modelo en el excel */
         'excel_json_campos': {
            'id_tag': 'String',
            'nom_tag': 'String',
            'det_tag': 'String',
            'meta_tag': 'String',
            //'id_usuario_registra': 'String',
            //'id_usuario_modifica': 'String',
            'created_at': 'String',
            'updated_at': 'String',
            'deleted_at': 'String',
         },

         'excel_json_datos': [],
         'excel_data_contador': 0,

         'append_to_json_excel': {},

      }
   },
   computed: {},
   watch: {
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el tag
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase(id_en_edicion); }
      },
      //tags se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      tags: function (tags) {
         var self = this;
         this.excel_json_datos = [];
         return tags.map(function (tag, index) {
            return self.excel_json_datos.push({
               'id_tag': tag.id_tag || '-',
               'nom_tag': tag.nom_tag || '-',
               'det_tag': tag.det_tag || '-',
               'meta_tag': tag.meta_tag || '-',
               //'id_usuario_registra': tag.id_usuario_registra || '-',
               //'id_usuario_modifica': tag.id_usuario_modifica || '-',
               'created_at': tag.created_at || '-',
               'updated_at': tag.updated_at || '-',
               'deleted_at': tag.deleted_at || '-',
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
         this.lista_objs_model = response.body.tags.data || null;
         this.tags = response.body.tags.data || null;
         this.datos_excel = response.body.tags.data || null;

         /* Datos de la entidad hacia el paginador */
         this.pagination = response.body.tags || null;

         /* Relaciones con la entidad */
         this.permisos = response.body.permisos || null;

         /* Datos de la sesion actual del usuario */
         this.usuario_auth = response.body.usuario_auth || null;

      },
   }
});