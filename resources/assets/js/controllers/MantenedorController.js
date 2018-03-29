import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

//import { DownloadExcel } from '../components/DownloadExcel.vue';
//Vue.component('download-excel', DownloadExcel);
Vue.component('download-excel', require('../components/DownloadExcel.vue'));

const MantenedorController = new Vue({
   el: '#MantenedorController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_mantenedor',
         'nombre_tabla':'mantenedores', //nombre tabla o de ruta
         'nombre_ruta':'mantenedores', //nombre tabla o de ruta
         'nombre_model':'mantenedor',
         'nombre_model_limpio': 'mantenedor_limpio',
         'nombre_detalle':'Mantenedores',
         'nombre_controller':'MantenedorController',

         'filtro_head':null,
         'mantenedor':{
            'url_mantenedor':null,
            'nom_mantenedor':null,
            'det_mantenedor':null,
            'cod_mantenedor':null,
            'imagen_mantenedor':null,
            'font_icon_mantenedor':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'permitido_guardar':[
            'url_mantenedor',
            'nom_mantenedor',
            'det_mantenedor',
            'cod_mantenedor',
            'imagen_mantenedor',
            'font_icon_mantenedor',
         ],
         'relaciones_clase':[],
         'lom':{},
         'lista_objs_model':[],
         'mantenedores':[],
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
            'id_mantenedor':false,
            'url_mantenedor':true,
            'nom_mantenedor':true,
            'det_mantenedor':true,
            'cod_mantenedor':true,
            'imagen_mantenedor':false,
            'font_icon_mantenedor':false,
            'id_usuario_registra':false,
            'id_usuario_modifica':false,
            'created_at':false,
            'updated_at':false,
            'deleted_at':false,
         },

         'tabla_labels': {
            'id_mantenedor':'Id mantenedor',
            'url_mantenedor':'Ruta mantenedor',
            'nom_mantenedor':'Nombre mantenedor',
            'det_mantenedor':'Detalle mantenedor',
            'cod_mantenedor':'Codigo mantenedor',
            'imagen_mantenedor':'Imagen mantenedor',
            'font_icon_mantenedor':'Font icon mantenedor',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en'
         },

         'excel_json_campos': {
            'id_mantenedor': 'String',
            'url_mantenedor': 'String',
            'nom_mantenedor': 'String',
            'det_mantenedor': 'String',
            'cod_mantenedor': 'String',
            'imagen_mantenedor': 'String',
            'font_icon_mantenedor': 'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el mantenedor
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase(id_en_edicion); }
      },
      //mantenedores se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      mantenedores: function (mantenedores) {
         var self = this;
         this.excel_json_datos = [];
         return mantenedores.map(function (mantenedor, index) {
            return self.excel_json_datos.push({
               'id_mantenedor': mantenedor.id_mantenedor || '-',
               'url_mantenedor': mantenedor.nom_mantenedor || '-',
               'nom_mantenedor': mantenedor.nom_mantenedor || '-',
               'det_mantenedor': mantenedor.det_mantenedor || '-',
               'cod_mantenedor': mantenedor.cod_mantenedor || '-',
               'imagen_mantenedor': mantenedor.imagen_mantenedor || '-',
               'font_icon_mantenedor': mantenedor.font_icon_mantenedor || '-',
               'id_usuario_registra': mantenedor.id_usuario_registra || '-',
               'id_usuario_modifica': mantenedor.id_usuario_modifica || '-',
               'created_at': mantenedor.created_at || '-',
               'updated_at': mantenedor.updated_at || '-',
               'deleted_at': mantenedor.deleted_at || '-'
            });
         });
      },
   },
   components: {
      //'download-excel': DownloadExcel,
   },
   created(){
      this.inicializar();

      $(document).ready(function(){
         $('[data-toggle="tooltip"]').tooltip();
      });

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
            this.lista_objs_model = response.body.mantenedores || null;
            this.mantenedores = response.body.mantenedores || null;
            this.datos_excel = response.body.mantenedores || null;
            this.usuario_auth = response.body.usuario_auth || null;
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },
   }
});