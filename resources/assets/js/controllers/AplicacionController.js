
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

const AplicacionController = new Vue({
   el: '#AplicacionController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_aplicacion',
         'nombre_tabla':'aplicaciones', //nombre tabla o de ruta
         'nombre_ruta':'aplicaciones', //nombre tabla o de ruta
         'nombre_model':'aplicacion',
         'nombre_model_limpio': 'aplicacion_limpio',
         'nombre_detalle':'Aplicaciones',
         'nombre_controller':'AplicacionController',

         'filtro_head':null,
         'aplicacion':{
            'nom_aplicacion':null,
            'det_aplicacion':null,
            'alias':null,
            'url_web':null,
            'ip':null,
            'subdominio':null,
            'ssl_tls':false,
            'id_dominio':null,
            'id_tipo_aplicacion':null,
            'id_servidor':null,
            'id_servicio':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'permitido_guardar':[
            'nom_aplicacion',
            'det_aplicacion',
            'alias',
            'url_web',
            'ip',
            'subdominio',
            'ssl_tls',
            'id_dominio',
            'id_tipo_aplicacion',
            'id_servidor',
            'id_servicio',
         ],
         'relaciones_clase':[
            {'dominio':'id_dominio'},
            {'tipo_aplicacion':'id_tipo_aplicacion'},
            {'servicio':'id_servicio'},
            {'servidor':'id_servidor'},
         ],
         'lom':{},
         'lista_objs_model':[],
         'actividades':[],
         'tipos_aplicaciones':[],
         'servidores':[],
         'servicios':[],
         'dominios':[],
         'aplicaciones':[],
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
            'id_aplicacion':false,
            'nom_aplicacion':true,
            'det_aplicacion':false,
            'alias':true,
            'url_web':true,
            'ip':true,
            'subdominio':false,
            'ssl_tls':true,
            'id_dominio':false,
            'id_tipo_aplicacion':false,
            'id_servidor':false,
            'id_servicio':false,

            'id_usuario_registra':false,
            'id_usuario_modifica':false,
            'created_at':false,
            'updated_at':false,
            'deleted_at':false,
         },

         'tabla_labels': {
            'id_aplicacion':'Id aplicacion',

            'nom_aplicacion':'Nombre aplicacion',
            'det_aplicacion':'Detalle aplicacion',
            'alias':'Alias',
            'url_web':'Url',
            'ip':'Ip',
            'subdominio':'Subdominio',
            'ssl_tls':'SSL/TLS',
            'id_dominio':'Id Dominio',
            'id_tipo_aplicacion':'Id Tipo App',
            'id_servidor':'Id Servidor',
            'id_servicio':'Id Servicio',

            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en',
         },

         'excel_json_campos': {
            'id_aplicacion':'String',

            'nom_aplicacion':'String',
            'det_aplicacion':'String',
            'alias':'String',
            'url_web':'String',
            'ip':'String',
            'subdominio':'String',
            'ssl_tls':'String',
            'id_dominio':'String',
            'id_tipo_aplicacion':'String',
            'id_servidor':'String',
            'id_servicio':'String',

            'id_usuario_registra':'String',
            'id_usuario_modifica':'String',
            'created_at':'String',
            'updated_at':'String',
            'deleted_at':'String',
         },

         'excel_json_datos': [],
         'excel_data_contador': 0,

         'append_to_json_excel': {},

      }
   },
   computed: {},
   watch: {
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el aplicacion
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase_config_relaciones(id_en_edicion, this.relaciones_clase); }
      },
      //aplicaciones se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      aplicaciones: function (aplicaciones) {
         var self = this;
         this.excel_json_datos = [];
         return aplicaciones.map(function (aplicacion, index) {
            return self.excel_json_datos.push({
               'id_aplicacion': aplicacion.id_aplicacion || '-',

               'nom_aplicacion': aplicacion.nom_aplicacion || '-',
               'det_aplicacion': aplicacion.det_aplicacion || '-',
               'alias': aplicacion.alias || '-',
               'url_web': aplicacion.url_web || '-',
               'ip': aplicacion.ip || '-',
               'subdominio': aplicacion.subdominio || '-',
               'ssl_tls': aplicacion.ssl_tls || '-',
               'id_dominio': aplicacion.id_dominio || '-',
               'id_tipo_aplicacion': aplicacion.id_tipo_aplicacion || '-',
               'id_servidor': aplicacion.id_servidor || '-',
               'id_servicio': aplicacion.id_servicio || '-',

               'id_usuario_registra': aplicacion.id_usuario_registra || '-',
               'id_usuario_modifica': aplicacion.id_usuario_modifica || '-',
               'created_at': aplicacion.created_at || '-',
               'updated_at': aplicacion.updated_at || '-',
               'deleted_at': aplicacion.deleted_at || '-',
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
            this.configurar_relaciones(response.body.aplicaciones, this.relaciones_clase);
            this.lista_objs_model = response.body.aplicaciones || null;
            this.aplicaciones = response.body.aplicaciones || null;
            this.datos_excel = response.body.aplicaciones || null;

            this.actividades = response.body.actividades || null;

            this.tipos_aplicaciones = response.body.tipos_aplicaciones || null;
            this.servidores = response.body.servidores || null;
            this.servicios = response.body.servicios || null;
            this.dominios = response.body.dominios || null;

            this.usuario_auth = response.body.usuario_auth || null;
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },
   }
});