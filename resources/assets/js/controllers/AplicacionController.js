
import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

Vue.component('download-excel', require('../components/DownloadExcel.vue'));
Vue.component('paginators', require('../components/Paginators.vue'));

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
            'nom_dominio':null,
            'id_tipo_aplicacion':null,
            'nom_tipo_aplicacion':null,
            'id_servidor':null,
            'nom_servidor':null,
            'id_servicio':null,
            'nom_servicio':null,
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
            {'dominio':['id_dominio','nom_dominio']},
            {'tipo_aplicacion':['id_tipo_aplicacion','nom_tipo_aplicacion']},
            {'servicio':['id_servicio','nom_servicio']},
            {'servidor':['id_servidor','nom_servidor']},
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
            'id_aplicacion':false,
            'nom_aplicacion':true,
            'det_aplicacion':true,
            'alias':false,
            'url_web':false,
            'ip':false,
            'subdominio':false,
            'ssl_tls':false,
            //'id_dominio':false,
            'nom_dominio':false,
            //'id_tipo_aplicacion':false,
            'nom_tipo_aplicacion':false,
            //'id_servidor':false,
            'nom_servidor':false,
            //'id_servicio':false,
            'nom_servicio':false,

            //'id_usuario_registra':false,
            //'id_usuario_modifica':false,
            'created_at':false,
            'updated_at':false,
            'deleted_at':false,
         },

         /* Etiquetas */
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
            'nom_dominio':'Nombre Dominio',
            'id_tipo_aplicacion':'Id Tipo App',
            'nom_tipo_aplicacion':'Nombre Tipo App',
            'id_servidor':'Id Servidor',
            'nom_servidor':'Nombre servidor',
            'id_servicio':'Id Servicio',
            'nom_servicio':'Nombre servicio',

            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en',
         },

         /* Campos del modelo en el excel */
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
            'nom_dominio':'String',
            'id_tipo_aplicacion':'String',
            'nom_tipo_aplicacion':'String',
            'id_servidor':'String',
            'nom_servidor':'String',
            'id_servicio':'String',
            'nom_servicio':'String',

            //'id_usuario_registra':'String',
            //'id_usuario_modifica':'String',
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
               'nom_dominio': aplicacion.nom_dominio || '-',
               'id_tipo_aplicacion': aplicacion.id_tipo_aplicacion || '-',
               'nom_tipo_aplicacion': aplicacion.nom_tipo_aplicacion || '-',
               'id_servidor': aplicacion.id_servidor || '-',
               'nom_servidor': aplicacion.nom_servidor || '-',
               'id_servicio': aplicacion.id_servicio || '-',
               'nom_servicio': aplicacion.nom_servicio || '-',

               //'id_usuario_registra': aplicacion.id_usuario_registra || '-',
               //'id_usuario_modifica': aplicacion.id_usuario_modifica || '-',
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
   },
   ready: {},
   filters: {},
   mixins: [ inyeccion_funciones_compartidas ],
   methods: {


      asignar_recursos: function (response) {
         /* Datos intrinsecos de la entidad */
         this.lista_objs_model = response.body.aplicaciones.data || null;
         this.aplicaciones = response.body.aplicaciones.data || null;
         this.datos_excel = response.body.aplicaciones.data || null;

         /* Datos de la entidad hacia el paginador */
         this.pagination = response.body.aplicaciones || null;

         /* Datos de las relaciones con la entidad */
         this.actividades = response.body.actividades || null;
         this.tipos_aplicaciones = response.body.tipos_aplicaciones || null;
         this.servidores = response.body.servidores || null;
         this.servicios = response.body.servicios || null;
         this.dominios = response.body.dominios || null;

         /* Datos de la sesion actual del usuario */
         this.usuario_auth = response.body.usuario_auth || null;
      },



   }
});