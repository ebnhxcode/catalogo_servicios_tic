
import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

Vue.component('download-excel', require('../components/DownloadExcel.vue'));
Vue.component('paginators', require('../components/Paginators.vue'));

const DatacentroController = new Vue({
   el: '#DatacentroController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_datacentro',
         'nombre_tabla':'datacentros', //nombre tabla o de ruta
         'nombre_ruta':'datacentros', //nombre tabla o de ruta
         'nombre_model':'datacentro',
         'nombre_model_limpio': 'datacentro_limpio',
         'nombre_detalle':'Datacentros',
         'nombre_controller':'DatacentroController',

         'filtro_head':null,
         'datacentro':{
            'nom_datacentro':null,
            'det_datacentro':null,
            'cod_datacentro':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'permitido_guardar':[
            'nom_datacentro',
            'det_datacentro',
            'cod_datacentro',
         ],
         'relaciones_clase':[],
         'lom':{},
         'lista_objs_model':[],
         'datacentros':[],
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
            'id_datacentro':false,
            'nom_datacentro':true,
            'det_datacentro':true,
            'cod_datacentro':true,
            //'id_usuario_registra':false,
            //'id_usuario_modifica':false,
            'created_at':false,
            'updated_at':false,
            'deleted_at':false,
         },

         /* Etiquetas */
         'tabla_labels': {
            'id_datacentro':'Id datacentro',
            'nom_datacentro':'Nombre datacentro',
            'det_datacentro':'Detalle datacentro',
            'cod_datacentro':'Codigo datacentro',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en'
         },

         /* Campos del modelo en el excel */
         'excel_json_campos': {
            'id_datacentro': 'String',
            'nom_datacentro': 'String',
            'det_datacentro': 'String',
            'cod_datacentro': 'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el datacentro
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase(id_en_edicion); }
      },
      //datacentros se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      datacentros: function (datacentros) {
         var self = this;
         this.excel_json_datos = [];
         return datacentros.map(function (datacentro, index) {
            return self.excel_json_datos.push({
               'id_datacentro': datacentro.id_datacentro || '-',
               'nom_datacentro': datacentro.nom_datacentro || '-',
               'det_datacentro': datacentro.det_datacentro || '-',
               'cod_datacentro': datacentro.cod_datacentro || '-',
               //'id_usuario_registra': datacentro.id_usuario_registra || '-',
               //'id_usuario_modifica': datacentro.id_usuario_modifica || '-',
               'created_at': datacentro.created_at || '-',
               'updated_at': datacentro.updated_at || '-',
               'deleted_at': datacentro.deleted_at || '-'
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
         this.lista_objs_model = response.body.datacentros.data || null;
         this.datacentros = response.body.datacentros.data || null;
         this.datos_excel = response.body.datacentros.data || null;

         /* Datos de la entidad hacia el paginador */
         this.pagination = response.body.datacentros || null;

         /* Datos de la sesion actual del usuario */
         this.usuario_auth = response.body.usuario_auth || null;

      },

   }
});