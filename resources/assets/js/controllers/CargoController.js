
import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

Vue.component('download-excel', require('../components/DownloadExcel.vue'));

const CargoController = new Vue({
   el: '#CargoController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_cargo',
         'nombre_tabla':'cargos', //nombre tabla o de ruta
         'nombre_ruta':'cargos', //nombre tabla o de ruta
         'nombre_model':'cargo',
         'nombre_model_limpio': 'cargo_limpio',
         'nombre_detalle':'Cargos',
         'nombre_controller':'CargoController',

         'filtro_head':null,
         'cargo':{
            'nom_cargo':null,
            'det_cargo':null,
            'cod_cargo':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'permitido_guardar':[
            'nom_cargo',
            'det_cargo',
            'cod_cargo',
         ],
         'relaciones_clase':[],
         'lom':{},
         'lista_objs_model':[],
         'cargos':[],
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
            'id_cargo':false,
            'nom_cargo':true,
            'det_cargo':true,
            'cod_cargo':true,
            'id_usuario_registra':false,
            'id_usuario_modifica':false,
            'created_at':false,
            'updated_at':false,
            'deleted_at':false,
         },

         'tabla_labels': {
            'id_cargo':'Id cargo',
            'nom_cargo':'Nombre cargo',
            'det_cargo':'Detalle cargo',
            'cod_cargo':'Codigo cargo',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en'
         },

         'excel_json_campos': {
            'id_cargo': 'String',
            'nom_cargo': 'String',
            'det_cargo': 'String',
            'cod_cargo': 'String',
            'id_usuario_registra': 'String',
            'id_usuario_modifica': 'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el cargo
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase(id_en_edicion); }
      },
      //cargos se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      cargos: function (cargos) {
         var self = this;
         this.excel_json_datos = [];
         return cargos.map(function (cargo, index) {
            return self.excel_json_datos.push({
               'id_cargo': cargo.id_cargo || '-',
               'nom_cargo': cargo.nom_cargo || '-',
               'det_cargo': cargo.det_cargo || '-',
               'cod_cargo': cargo.cod_cargo || '-',
               'id_usuario_registra': cargo.id_usuario_registra || '-',
               'id_usuario_modifica': cargo.id_usuario_modifica || '-',
               'created_at': cargo.created_at || '-',
               'updated_at': cargo.updated_at || '-',
               'deleted_at': cargo.deleted_at || '-'
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
   mixins: [ inyeccion_funciones_compartidas ],
   methods: {
      inicializar: function () {
         this.$http.get(`/${this.nombre_ruta}`).then(response => { // success callback
            this.lista_objs_model = response.body.cargos || null;
            this.cargos = response.body.cargos || null;
            this.datos_excel = response.body.cargos || null;
            this.usuario_auth = response.body.usuario_auth || null;
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },
   }
});