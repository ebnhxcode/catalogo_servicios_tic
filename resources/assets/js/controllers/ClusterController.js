
import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

Vue.component('download-excel', require('../components/DownloadExcel.vue'));

const ClusterController = new Vue({
   el: '#ClusterController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_cluster',
         'nombre_tabla':'clusters', //nombre tabla o de ruta
         'nombre_ruta':'clusters', //nombre tabla o de ruta
         'nombre_model':'cluster',
         'nombre_model_limpio': 'cluster_limpio',
         'nombre_detalle':'Clusters',
         'nombre_controller':'ClusterController',

         'filtro_head':null,
         'cluster':{
            'nom_cluster':null,
            'det_cluster':null,
            'cod_cluster':null,
            'id_tipo_cluster':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'permitido_guardar':[
            'nom_cluster',
            'det_cluster',
            'cod_cluster',
            'id_tipo_cluster',
         ],
         'relaciones_clase':[
            {'tipo_cluster':'id_tipo_cluster'}
         ],
         'lom':{},
         'lista_objs_model':[],
         'clusters':[],
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
            'id_cluster':false,
            'nom_cluster':true,
            'det_cluster':true,
            'cod_cluster':true,
            'id_tipo_cluster':false,
            'id_usuario_registra':false,
            'id_usuario_modifica':false,
            'created_at':false,
            'updated_at':false,
            'deleted_at':false,
         },

         'tabla_labels': {
            'id_cluster':'Id cluster',
            'nom_cluster':'Nombre cluster',
            'det_cluster':'Detalle cluster',
            'cod_cluster':'Codigo cluster',
            'id_tipo_cluster':'Tipo cluster',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en'
         },

         'excel_json_campos': {
            'id_cluster': 'String',
            'nom_cluster': 'String',
            'det_cluster': 'String',
            'cod_cluster': 'String',
            'id_tipo_cluster': 'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el cluster
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase_config_relaciones(id_en_edicion, this.relaciones_clase); }
      },
      //clusters se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      clusters: function (clusters) {
         var self = this;
         this.excel_json_datos = [];
         return clusters.map(function (cluster, index) {
            return self.excel_json_datos.push({
               'id_cluster': cluster.id_cluster || '-',
               'nom_cluster': cluster.nom_cluster || '-',
               'det_cluster': cluster.det_cluster || '-',
               'cod_cluster': cluster.cod_cluster || '-',
               'id_tipo_cluster': cluster.id_tipo_cluster || '-',
               'id_usuario_registra': cluster.id_usuario_registra || '-',
               'id_usuario_modifica': cluster.id_usuario_modifica || '-',
               'created_at': cluster.created_at || '-',
               'updated_at': cluster.updated_at || '-',
               'deleted_at': cluster.deleted_at || '-'
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
            this.configurar_relaciones(response.body.clusters, this.relaciones_clase);

            this.lista_objs_model = response.body.clusters || null;
            this.clusters = response.body.clusters || null;
            this.datos_excel = response.body.clusters || null;

            this.tipos_clusters = response.body.tipos_clusters || null;
            this.usuario_auth = response.body.usuario_auth || null;
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },
   }
});