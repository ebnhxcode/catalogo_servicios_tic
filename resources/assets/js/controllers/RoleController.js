
import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

Vue.component('download-excel', require('../components/DownloadExcel.vue'));
Vue.component('paginators', require('../components/Paginators.vue'));

const RoleController = new Vue({
   el: '#RoleController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_role',
         'nombre_tabla':'roles', //nombre tabla o de ruta
         'nombre_ruta':'roles', //nombre tabla o de ruta
         'nombre_model':'role',
         'nombre_model_limpio': 'role_limpio',
         'nombre_detalle':'Roles',
         'nombre_controller':'RoleController',

         'filtro_head':null,
         'role':{
            'nom_role':null,
            'det_role':null,
            'id_permiso':null,
            'nom_permiso':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'permitido_guardar':[
            'nom_role',
            'det_role',
            'id_permiso',
         ],
         'relaciones_clase':[
            {'role_permiso.permiso':['id_permiso','nom_permiso']},
         ],
         'lom':{},
         'lista_objs_model':[],
         'roles':[],
         'datos_excel':[],
         'usuario_auth':{},

         'permisos':[],
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
            'id_role':false,
            'nom_role':true,
            'det_role':true,
            //'id_permiso':false,
            'nom_permiso':false,
            //'id_usuario_registra':false,
            //'id_usuario_modifica':false,
            'created_at':false,
            'updated_at':false,
            'deleted_at':false,
         },

         /* Etiquetas */
         'tabla_labels': {
            'id_role':'Id role',
            'nom_role':'Nombre role',
            'det_role':'Detalle role',
            'id_permiso':'Permiso role',
            'nom_permiso':'Permiso role',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en',
         },

         /* Campos del modelo en el excel */
         'excel_json_campos': {
            'id_role': 'String',
            'nom_role': 'String',
            'det_role': 'String',
            'id_permiso': 'String',
            'nom_permiso': 'String',
            //'id_usuario_registra': 'String',
            //'id_usuario_modifica': 'String',
            'created_at': 'String',
            'updated_at': 'String',
            'deleted_at': 'String',
         },

         'excel_json_datos': [],
         'excel_data_contador': 0,

         'append_to_json_excel': {},

      }
   },
   computed: {},
   watch: {
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el role
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase_config_relaciones(id_en_edicion, this.relaciones_clase); }
      },
      //Roles se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      roles: function (roles) {
         var self = this;
         this.excel_json_datos = [];
         return roles.map(function (role, index) {
            return self.excel_json_datos.push({
               'id_role': role.id_role || '-',
               'nom_role': role.nom_role || '-',
               'det_role': role.det_role || '-',
               'id_permiso': role.id_permiso || '-',
               'nom_permiso': role.nom_permiso || '-',
               //'id_usuario_registra': role.id_usuario_registra || '-',
               //'id_usuario_modifica': role.id_usuario_modifica || '-',
               'created_at': role.created_at || '-',
               'updated_at': role.updated_at || '-',
               'deleted_at': role.deleted_at || '-',
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
         this.lista_objs_model = response.body.roles.data || null;
         this.roles = response.body.roles.data || null;
         this.datos_excel = response.body.roles.data || null;

         /* Datos de la entidad hacia el paginador */
         this.pagination = response.body.roles || null;

         /* Datos roles las relaciones con la entidad */
         this.permisos = response.body.permisos || null;

         /* Datos de la sesion actual del usuario */
         this.usuario_auth = response.body.usuario_auth || null;

      },
   }
});