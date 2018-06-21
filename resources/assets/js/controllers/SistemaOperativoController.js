
import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

Vue.component('download-excel', require('../components/DownloadExcel.vue'));
Vue.component('paginators', require('../components/Paginators.vue'));

const SistemaOperativoController = new Vue({
   el: '#SistemaOperativoController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_sistema_operativo',
         'nombre_tabla':'sistemas_operativos', //nombre tabla o de ruta
         'nombre_ruta':'sistemas_operativos', //nombre tabla o de ruta
         'nombre_model':'sistema_operativo',
         'nombre_model_limpio': 'sistema_operativo_limpio',
         'nombre_detalle':'Sistemas Operativos',
         'nombre_controller':'SistemaOperativoController',

         'filtro_head':null,
         'sistema_operativo':{
            'id_sistema_operativo':null,
            'arquitectura':null,
            'nom_sistema_operativo':null,
            'det_sistema_operativo':null,
            'vers_sistema_operativo':null,
            'lic_sistema_operativo':null,
            'det_licencia_sistema_operativo':null,
            'id_idioma':null,
            'nom_idioma':null,
            'id_tipo_sistema_operativo':null,
            'nom_tipo_sistema_operativo':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'permitido_guardar':[
            'arquitectura',
            'nom_sistema_operativo',
            'det_sistema_operativo',
            'vers_sistema_operativo',
            'lic_sistema_operativo',
            'det_licencia_sistema_operativo',
            'id_idioma',
            'id_tipo_sistema_operativo',
         ],
         'relaciones_clase':[
            {'idioma':['id_idioma','nom_idioma']},
            {'tipo_sistema_operativo':['id_tipo_sistema_operativo','nom_tipo_sistema_operativo']}
         ],
         'lom':{},
         'lista_objs_model':[],
         'sistemas_operativos':[],
         'idiomas':[],

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
            'id_sistema_operativo':false,
            'arquitectura':true,
            'nom_sistema_operativo':true,
            'det_sistema_operativo':true,
            'vers_sistema_operativo':true,
            'lic_sistema_operativo':false,
            'det_licencia_sistema_operativo':false,
            //'id_idioma':false,
            'nom_idioma':false,
            //'id_tipo_sistema_operativo':false,
            'nom_tipo_sistema_operativo':false,
            //'id_usuario_registra':false,
            //'id_usuario_modifica':false,
            'created_at':false,
            'updated_at':false,
            'deleted_at':false,
         },

         /* Etiquetas */
         'tabla_labels': {
            'id_sistema_operativo':'Id sistema operativo',
            'arquitectura':'Arquitectura',
            'nom_sistema_operativo':'Nombre SO',
            'det_sistema_operativo':'Detalle SO',
            'vers_sistema_operativo':'Version SO',
            'lic_sistema_operativo':'Licencia SO',
            'det_licencia_sistema_operativo':'Detalle licencia SO',
            'id_idioma':'Id Idioma',
            'nom_idioma':'Nombre Idioma',
            'id_tipo_sistema_operativo':'Id Tipo Sistema Operativo',
            'nom_tipo_sistema_operativo':'Nombre Tipo Sistema Operativo',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en'
         },

         /* Campos del modelo en el excel */
         'excel_json_campos': {
            'id_sistema_operativo': 'String',
            'arquitectura': 'String',
            'nom_sistema_operativo': 'String',
            'det_sistema_operativo': 'String',
            'vers_sistema_operativo': 'String',
            'lic_sistema_operativo': 'String',
            'det_licencia_sistema_operativo': 'String',
            'id_idioma': 'String',
            'nom_idioma': 'String',
            'id_tipo_sistema_operativo': 'String',
            'nom_tipo_sistema_operativo': 'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el sistema_operativo
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase_config_relaciones(id_en_edicion, this.relaciones_clase); }
      },
      //sistemas_operativos se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      sistemas_operativos: function (sistemas_operativos) {
         var self = this;
         this.excel_json_datos = [];
         return sistemas_operativos.map(function (sistema_operativo, index) {
            return self.excel_json_datos.push({
               'id_sistema_operativo': sistema_operativo.id_sistema_operativo || '-',
               'arquitectura': sistema_operativo.arquitectura || '-',
               'nom_sistema_operativo': sistema_operativo.nom_sistema_operativo || '-',
               'det_sistema_operativo': sistema_operativo.det_sistema_operativo || '-',
               'vers_sistema_operativo': sistema_operativo.vers_sistema_operativo || '-',
               'lic_sistema_operativo': sistema_operativo.lic_sistema_operativo || '-',
               'det_licencia_sistema_operativo': sistema_operativo.det_licencia_sistema_operativo || '-',
               'id_idioma': sistema_operativo.id_idioma || '-',
               'nom_idioma': sistema_operativo.nom_idioma || '-',
               'id_tipo_sistema_operativo': sistema_operativo.id_tipo_sistema_operativo || '-',
               'nom_tipo_sistema_operativo': sistema_operativo.nom_tipo_sistema_operativo || '-',
               'created_at': sistema_operativo.created_at || '-',
               'updated_at': sistema_operativo.updated_at || '-',
               'deleted_at': sistema_operativo.deleted_at || '-'
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
         this.lista_objs_model = response.body.sistemas_operativos.data || null;
         this.sistemas_operativos = response.body.sistemas_operativos.data || null;
         this.datos_excel = response.body.sistemas_operativos.data || null;

         /* Datos de la entidad hacia el paginador */
         this.pagination = response.body.sistemas_operativos || null;

         /* Relaciones con la entidad */
         this.idiomas = response.body.idiomas || null;
         this.tipos_sistemas_operativos = response.body.tipos_sistemas_operativos || null;

         /* Datos de la sesion actual del usuario */
         this.usuario_auth = response.body.usuario_auth || null;

      },
   }
});