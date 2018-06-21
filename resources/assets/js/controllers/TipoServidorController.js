import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

Vue.component('download-excel', require('../components/DownloadExcel.vue'));
Vue.component('paginators', require('../components/Paginators.vue'));

const TipoServidorController = new Vue({
   el: '#TipoServidorController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_tipo_servidor',
         'nombre_tabla': 'tipos_servidores', //nombre tabla o de ruta
         'nombre_ruta': 'tipos_servidores', //nombre tabla o de ruta
         'nombre_model': 'tipo_servidor',
         'nombre_model_limpio': 'tipo_servidor_limpio',
         'nombre_detalle': 'Tipos Servidores',
         'nombre_controller': 'TipoServidorController',


         'filtro_head': null,
         'tipo_servidor': {
            'nom_tipo_servidor': null,
            'det_tipo_servidor': null,
            'cod_tipo_servidor': null,
            'id_usuario_registra': null,
            'id_usuario_modifica': null,
            'created_at': null,
            'updated_at': null,
            'deleted_at': null,
         },
         'permitido_guardar':[
            'nom_tipo_servidor',
            'det_tipo_servidor',
            'cod_tipo_servidor',
         ],
         'relaciones_clase':[],
         'lom':{},
         'lista_objs_model':[],
         'tipos_servidores': [],

         'spinner_table':true,

         'datos_excel': [],
         'usuario_auth': {},

         'campos_formularios': [],
         'errores_campos': [],

         'pagination': {
            'per_page':null,
         },

         //Variables para validar si se está creando o editando
         'modal_crear_activo': false,
         'modal_actualizar_activo': false,

         //Estas var se deben conservar para todos los controllers por que se ejecutan para el modal crear (blanquea)
         'lista_actualizar_activo': false,

         'id_en_edicion': null,

         'orden_lista': 'asc',

         /* Campos que se ven en el tablero */
         'tabla_campos': {
            'id_tipo_servidor': false,
            'nom_tipo_servidor': true,
            'det_tipo_servidor': true,
            'cod_tipo_servidor': false,
            //'id_usuario_registra': false,
            //'id_usuario_modifica': false,
            'created_at': false,
            'updated_at': false,
            'deleted_at': false,
         },

         /* Etiquetas */
         'tabla_labels': {
            'id_tipo_servidor': 'Id tipo servidor',
            'nom_tipo_servidor': 'Nombre tipo servidor',
            'det_tipo_servidor': 'Detalle tipo servidor',
            'cod_tipo_servidor': 'Codigo tipo servidor',
            //'id_usuario_registra': 'Usuario registra',
            //'id_usuario_modifica': 'Usuario modifica',
            'created_at': 'Creado en',
            'updated_at': 'Actualizado en',
            'deleted_at': 'Eliminado en'
         },

         /* Campos del modelo en el excel */
         'excel_json_campos': {
            'id_tipo_servidor': 'String',
            'nom_tipo_servidor': 'String',
            'det_tipo_servidor': 'String',
            'cod_tipo_servidor': 'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el tipo_servidor
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase(id_en_edicion); }
      },
      //tipos_servidores se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      tipos_servidores: function (tipos_servidores) {
         var self = this;
         this.excel_json_datos = [];
         return tipos_servidores.map(function (tipo_servidor, index) {
            return self.excel_json_datos.push({
               'id_tipo_servidor': tipo_servidor.id_tipo_servidor || '-',
               'nom_tipo_servidor': tipo_servidor.nom_tipo_servidor || '-',
               'det_tipo_servidor': tipo_servidor.det_tipo_servidor || '-',
               'cod_tipo_servidor': tipo_servidor.cod_tipo_servidor || '-',
               //'id_usuario_registra': tipo_servidor.id_usuario_registra || '-',
               //'id_usuario_modifica': tipo_servidor.id_usuario_modifica || '-',
               'created_at': tipo_servidor.created_at || '-',
               'updated_at': tipo_servidor.updated_at || '-',
               'deleted_at': tipo_servidor.deleted_at || '-'
            });
         });
      },
   },
   components: {
      //'download-excel': DownloadExcel,
   },
   created(){
      this.inicializar();
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
      asignar_recursos: function (response) {

         /* Datos intrinsecos de la entidad */
         this.lista_objs_model = response.body.tipos_servidores.data || null;
         this.tipos_servidores = response.body.tipos_servidores.data || null;
         this.datos_excel = response.body.tipos_servidores.data || null;

         /* Datos de la entidad hacia el paginador */
         this.pagination = response.body.tipos_servidores || null;

         /* Datos de la sesion actual del usuario */
         this.usuario_auth = response.body.usuario_auth || null;

      },
   }
});