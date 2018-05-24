
import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

Vue.component('download-excel', require('../components/DownloadExcel.vue'));
Vue.component('paginators', require('../components/Paginators.vue'));

const UsuarioBitacoraServicioController = new Vue({
   el: '#UsuarioBitacoraServicioController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_usuario_bitacora_servicio',
         'nombre_tabla':'usuarios_bitacora_servicios', //nombre tabla o de ruta
         'nombre_ruta':'usuarios_bitacora_servicios', //nombre tabla o de ruta
         'nombre_model':'usuario_bitacora_servicio',
         'nombre_model_limpio': 'usuario_bitacora_servicio_limpio',
         'nombre_detalle':'Usuarios Bitacora Servicios',
         'nombre_controller':'UsuarioBitacoraServicioController',

         'filtro_head':null,
         'usuario_bitacora_servicio':{
            'asunto':null,
            'det_bitacora':null,
            'id_actividad':null,
            'nom_actividad':null,
            'id_servicio':null,
            'nom_servicio':null,
            'id_usuario':null,
            'nom _usuario':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'permitido_guardar':[
            'asunto',
            'det_bitacora',
            'id_actividad',
            'id_servicio',
         ],
         'relaciones_clase':[
            {'usuario':['id_usuario','nom_usuario']},
            {'servicio':['id_servicio','nom_servicio']},
            {'actividad':['id_actividad','nom_actividad']},
         ],
         'lom':{},
         'lista_objs_model':[],
         'usuarios_bitacora_servicios':[],
         'actividades':[],
         'servicios':[],
         'datos_excel':[],
         'usuario_auth':[],

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

         'tabla_campos': {
            'id_usuario_bitacora_servicio':false,
            'asunto':true,
            'det_bitacora':true,
            //'id_actividad':false,
            'nom_actividad':false,
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
            'id_usuario_bitacora_servicio':'Id actividad',
            'asunto':'Asunto',
            'det_bitacora':'Detalle bitácora',
            'id_actividad':'Id Actividad',
            'nom_actividad':'nombre Actividad',
            'id_servicio':'Id Servicio',
            'nom_servicio':'Nombre Servicio',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en'
         },

         /* Campos del modelo en el excel */
         'excel_json_campos': {
            'id_usuario_bitacora_servicio': 'String',
            'asunto':'String',
            'det_bitacora':'String',
            'id_actividad':'String',
            'nom_actividad':'String',
            'id_servicio':'String',
            'nom_servicio':'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el usuario_bitacora_servicio
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase_config_relaciones(id_en_edicion, this.relaciones_clase); }
      },
      //usuarios_bitacora_servicios se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      usuarios_bitacora_servicios: function (usuarios_bitacora_servicios) {
         var self = this;
         this.excel_json_datos = [];
         return usuarios_bitacora_servicios.map(function (usuario_bitacora_servicio, index) {
            return self.excel_json_datos.push({
               'id_usuario_bitacora_servicio': usuario_bitacora_servicio.id_usuario_bitacora_servicio || '-',
               'asunto': usuario_bitacora_servicio.asunto || '-',
               'det_bitacora': usuario_bitacora_servicio.det_bitacora || '-',
               'id_servicio': usuario_bitacora_servicio.id_servicio || '-',
               'nom_servicio': usuario_bitacora_servicio.nom_servicio || '-',
               'id_actividad': usuario_bitacora_servicio.id_actividad || '-',
               'nom_actividad': usuario_bitacora_servicio.nom_actividad || '-',
               //'id_usuario_registra': usuario_bitacora_servicio.id_usuario_registra || '-',
               //'id_usuario_modifica': usuario_bitacora_servicio.id_usuario_modifica || '-',
               'created_at': usuario_bitacora_servicio.created_at || '-',
               'updated_at': usuario_bitacora_servicio.updated_at || '-',
               'deleted_at': usuario_bitacora_servicio.deleted_at || '-'
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
         this.lista_objs_model = response.body.usuarios_bitacora_servicios.data || null;
         this.usuarios_bitacora_servicios = response.body.usuarios_bitacora_servicios.data || null;
         this.datos_excel = response.body.usuarios_bitacora_servicios.data || null;

         /* Datos de la entidad hacia el paginador */
         this.pagination = response.body.usuarios_bitacora_servicios || null;

         /* Relaciones con la entidad */
         this.actividades = response.body.actividades || null;
         this.servicios = response.body.servicios || null;

         /* Datos de la sesion actual del usuario */
         this.usuario_auth = response.body.usuario_auth || null;

      },

   }
});