
import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

Vue.component('download-excel', require('../components/DownloadExcel.vue'));
Vue.component('paginators', require('../components/Paginators.vue'));

const AplicacionAccesoController = new Vue({
   el: '#AplicacionAccesoController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_aplicacion_acceso',
         'nombre_tabla':'aplicaciones_accesos', //nombre tabla o de ruta
         'nombre_ruta':'aplicaciones_accesos', //nombre tabla o de ruta
         'nombre_model':'aplicacion_acceso',
         'nombre_model_limpio': 'aplicacion_acceso_limpio',
         'nombre_detalle':'Aplicaciones Accesos',
         'nombre_controller':'AplicacionAccesoController',

         'filtro_head':null,
         'aplicacion_acceso':{
            'usuario':null,
            'clave':null,
            'decrypted_clave':null,
            'tipo_acceso':null,
            'email':null,
            'id_aplicacion':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'permitido_guardar':[
            'usuario',
            'clave',
            //'decrypted_clave',
            'tipo_acceso',
            'email',
            'id_aplicacion',
         ],
         'relaciones_clase':[
            {'aplicacion':['id_aplicacion','nom_aplicacion']}
         ],
         'lom':{},
         'lista_objs_model':[],
         'aplicaciones':[],
         'aplicaciones_accesos':[],
         'datos_excel':[],
         'usuario_auth':{},

         'campos_formularios':[],
         'errores_campos':[],

         'pagination': {
            'per_page':null,
         },

         //Variables para validar si se está creando o editando, variables del modal
         'modal_crear_activo': false,
         'modal_actualizar_activo': false,
         'modal_width': 90,

         //Estas var se deben conservar para todos los controllers por que se ejecutan para el modal crear (blanquea)
         'lista_actualizar_activo':false,

         'id_en_edicion': null,

         'orden_lista':'asc',

         /* Campos que se ven en el tablero */
         'tabla_campos': {
            'usuario':true,
            //'clave':false,
            'tipo_acceso':true,
            'email':true,
            //'id_aplicacion':false,
            'nom_aplicacion':false,
            //'id_usuario_registra':false,
            //'id_usuario_modifica':false,
            'created_at':true,
            'updated_at':false,
            'deleted_at':false,
         },

         /* Etiquetas */
         'tabla_labels': {
            'usuario':'Usuario',
            'clave':'Clave',
            'tipo_acceso':'Tipo Acceso',
            'email':'email',
            'id_aplicacion':'Id Aplicacion',
            'nom_aplicacion':'Nombre Aplicacion',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en',
         },

         /* Campos del modelo en el excel */
         'excel_json_campos': {
            'usuario':'String',
            'clave':'String',
            'tipo_acceso':'String',
            'email':'String',
            'id_aplicacion':'String',
            'nom_aplicacion':'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el aplicacion_acceso
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase_config_relaciones(id_en_edicion, this.relaciones_clase); }
      },
      //aplicaciones_accesos se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      aplicaciones_accesos: function (aplicaciones_accesos) {
         var self = this;
         this.excel_json_datos = [];
         return aplicaciones_accesos.map(function (aplicacion_acceso, index) {
            return self.excel_json_datos.push({
               'usuario': aplicacion_acceso.usuario || '-',
               'clave': aplicacion_acceso.clave || '-',
               'tipo_acceso': aplicacion_acceso.tipo_acceso || '-',
               'email': aplicacion_acceso.email || '-',
               'id_aplicacion': aplicacion_acceso.id_aplicacion || '-',
               'nom_aplicacion': aplicacion_acceso.nom_aplicacion || '-',
               //'id_usuario_registra': aplicacion_acceso.id_usuario_registra || '-',
               //'id_usuario_modifica': aplicacion_acceso.id_usuario_modifica || '-',
               'created_at': aplicacion_acceso.created_at || '-',
               'updated_at': aplicacion_acceso.updated_at || '-',
               'deleted_at': aplicacion_acceso.deleted_at || '-',
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
         this.lista_objs_model = response.body.aplicaciones_accesos.data || null;
         this.aplicaciones_accesos = response.body.aplicaciones_accesos.data || null;
         this.datos_excel = response.body.aplicaciones_accesos.data || null;

         /* Datos de la entidad hacia el paginador */
         this.pagination = response.body.aplicaciones_accesos || null;

         /* Datos de las relaciones con la entidad */
         this.aplicaciones = response.body.aplicaciones || null;
         this.usuario_auth = response.body.usuario_auth || null;

         /* Datos de la sesion actual del usuario */
         this.usuario_auth = response.body.usuario_auth || null;
      },


   }
});