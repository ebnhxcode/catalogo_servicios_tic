import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

Vue.component('download-excel', require('../components/DownloadExcel.vue'));
Vue.component('paginators', require('../components/Paginators.vue'));

const MenuController = new Vue({
   el: '#MenuController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_menu',
         'nombre_tabla':'menus', //nombre tabla o de ruta
         'nombre_ruta':'menus', //nombre tabla o de ruta
         'nombre_model':'menu',
         'nombre_model_limpio': 'menu_limpio',
         'nombre_detalle':'Menus',
         'nombre_controller':'MenuController',

         'filtro_head':null,
         'menu':{
            'url_menu':null,
            'nom_menu':null,
            'det_menu':null,
            'cod_menu':null,
            'imagen_menu':null,
            'font_icon_menu':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'permitido_guardar':[
            'url_menu',
            'nom_menu',
            'det_menu',
            'cod_menu',
            'imagen_menu',
            'font_icon_menu',
         ],
         'relaciones_clase':[],
         'lom':{},
         'lista_objs_model':[],
         'menus':[],
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
            'id_menu':false,
            'url_menu':true,
            'nom_menu':true,
            'det_menu':true,
            'cod_menu':true,
            'imagen_menu':false,
            'font_icon_menu':false,
            //'id_usuario_registra':false,
            //'id_usuario_modifica':false,
            'created_at':false,
            'updated_at':false,
            'deleted_at':false,
         },

         /* Etiquetas */
         'tabla_labels': {
            'id_menu':'Id menu',
            'url_menu':'Ruta menu',
            'nom_menu':'Nombre menu',
            'det_menu':'Detalle menu',
            'cod_menu':'Codigo menu',
            'imagen_menu':'Imagen menu',
            'font_icon_menu':'Font icon menu',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en'
         },

         /* Campos del modelo en el excel */
         'excel_json_campos': {
            'id_menu': 'String',
            'url_menu': 'String',
            'nom_menu': 'String',
            'det_menu': 'String',
            'cod_menu': 'String',
            'imagen_menu': 'String',
            'font_icon_menu': 'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el menu
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase(id_en_edicion); }
      },
      //menus se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      menus: function (menus) {
         var self = this;
         this.excel_json_datos = [];
         return menus.map(function (menu, index) {
            return self.excel_json_datos.push({
               'id_menu': menu.id_menu || '-',
               'url_menu': menu.nom_menu || '-',
               'nom_menu': menu.nom_menu || '-',
               'det_menu': menu.det_menu || '-',
               'cod_menu': menu.cod_menu || '-',
               'imagen_menu': menu.imagen_menu || '-',
               'font_icon_menu': menu.font_icon_menu || '-',
               //'id_usuario_registra': menu.id_usuario_registra || '-',
               //'id_usuario_modifica': menu.id_usuario_modifica || '-',
               'created_at': menu.created_at || '-',
               'updated_at': menu.updated_at || '-',
               'deleted_at': menu.deleted_at || '-'
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
         this.lista_objs_model = response.body.menus.data || null;
         this.menus = response.body.menus.data || null;
         this.datos_excel = response.body.menus.data || null;

         /* Datos de la entidad hacia el paginador */
         this.pagination = response.body.menus || null;

         /* Datos de la sesion actual del usuario */
         this.usuario_auth = response.body.usuario_auth || null;

      },
   }
});