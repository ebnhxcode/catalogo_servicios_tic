
import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

Vue.component('download-excel', require('../components/DownloadExcel.vue'));
Vue.component('paginators', require('../components/Paginators.vue'));

const EstadoController = new Vue({
   el: '#EstadoController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_estado',
         'nombre_tabla':'estados', //nombre tabla o de ruta
         'nombre_ruta':'estados', //nombre tabla o de ruta
         'nombre_model':'estado',
         'nombre_model_limpio': 'estado_limpio',
         'nombre_detalle':'Estados',
         'nombre_controller':'EstadoController',

         'filtro_head':null,
         'estado':{
            'nom_estado':null,
            'det_estado':null,
            'cod_estado':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'permitido_guardar':[
            'nom_estado',
            'det_estado',
            'cod_estado',
         ],
         'relaciones_clase':[],
         'lom':{},
         'lista_objs_model':[],
         'estados':[],
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
            'id_estado':false,
            'nom_estado':true,
            'det_estado':true,
            'cod_estado':true,
            //'id_usuario_registra':false,
            //'id_usuario_modifica':false,
            'created_at':false,
            'updated_at':false,
            'deleted_at':false,
         },

         /* Etiquetas */
         'tabla_labels': {
            'id_estado':'Id estado',
            'nom_estado':'Nombre estado',
            'det_estado':'Detalle estado',
            'cod_estado':'Codigo estado',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en'
         },

         /* Campos del modelo en el excel */
         'excel_json_campos': {
            'id_estado': 'String',
            'nom_estado': 'String',
            'det_estado': 'String',
            'cod_estado': 'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el estado
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase(id_en_edicion); }
      },
      //estados se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      estados: function (estados) {
         var self = this;
         this.excel_json_datos = [];
         return estados.map(function (estado, index) {
            return self.excel_json_datos.push({
               'id_estado': estado.id_estado || '-',
               'nom_estado': estado.nom_estado || '-',
               'det_estado': estado.det_estado || '-',
               'cod_estado': estado.cod_estado || '-',
               //'id_usuario_registra': estado.id_usuario_registra || '-',
               //'id_usuario_modifica': estado.id_usuario_modifica || '-',
               'created_at': estado.created_at || '-',
               'updated_at': estado.updated_at || '-',
               'deleted_at': estado.deleted_at || '-'
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
         this.lista_objs_model = response.body.estados.data || null;
         this.estados = response.body.estados.data || null;
         this.datos_excel = response.body.estados.data || null;

         /* Datos de la entidad hacia el paginador */
         this.pagination = response.body.estados || null;

         /* Datos de la sesion actual del usuario */
         this.usuario_auth = response.body.usuario_auth || null;

      },
   }
});