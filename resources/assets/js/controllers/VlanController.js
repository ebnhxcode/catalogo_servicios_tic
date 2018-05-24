
import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

Vue.component('download-excel', require('../components/DownloadExcel.vue'));
Vue.component('paginators', require('../components/Paginators.vue'));

const VlanController = new Vue({
   el: '#VlanController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_vlan',
         'nombre_tabla':'vlans', //nombre tabla o de ruta
         'nombre_ruta':'vlans', //nombre tabla o de ruta
         'nombre_model':'vlan',
         'nombre_model_limpio': 'vlan_limpio',
         'nombre_detalle':'Vlans',
         'nombre_controller':'VlanController',

         'filtro_head':null,
         'vlan':{
            'id_vlan':null,
            'nom_vlan':null,
            'det_vlan':null,
            'cod_vlan':null,
            'id_usuario_registra': null,
            'id_usuario_modifica': null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'permitido_guardar':[
            'nom_vlan',
            'det_vlan',
            'cod_vlan',
         ],

         'relaciones_clase':[],
         'lom':{},
         'lista_objs_model':[],
         'vlans':[],
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
            'id_vlan':false,
            'nom_vlan':true,
            'det_vlan':true,
            'cod_vlan':true,
            'created_at':false,
            'updated_at':false,
            //'deleted_at':false,
         },

          /* Etiquetas */
         'tabla_labels': {
            'id_vlan':'Id vlan',
            'nom_vlan':'Nombre vlan',
            'det_vlan':'Detalle vlan',
            'cod_vlan':'Codigo vlan',
            'id_usuario_registra': 'Usuario registra',
            'id_usuario_modifica': 'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en'
         },

          /* Campos del modelo en el excel */
         'excel_json_campos': {
            'id_vlan': 'String',
            'nom_vlan': 'String',
            'det_vlan': 'String',
            'cod_vlan': 'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el vlan
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase_config_relaciones(id_en_edicion, this.relaciones_clase); }
      },
      //vlans se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      vlans: function (vlans) {
         var self = this;
         this.excel_json_datos = [];
         return vlans.map(function (vlan, index) {
            return self.excel_json_datos.push({
               'id_vlan': vlan.id_vlan || '-',
               'nom_vlan': vlan.nom_vlan || '-',
               'det_vlan': vlan.det_vlan || '-',
               'cod_vlan': vlan.cod_vlan || '-',
               'created_at': vlan.created_at || '-',
               'updated_at': vlan.updated_at || '-',
               'deleted_at': vlan.deleted_at || '-'
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
         this.lista_objs_model = response.body.vlans.data || null;
         this.vlans = response.body.vlans.data || null;
         this.datos_excel = response.body.vlans.data || null;

         /* Datos de la entidad hacia el paginador */
         this.pagination = response.body.vlans || null;

         /* Datos de la sesion actual del usuario */
         this.usuario_auth = response.body.usuario_auth || null;

      },
   }
});