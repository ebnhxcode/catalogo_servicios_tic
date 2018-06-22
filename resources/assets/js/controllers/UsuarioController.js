import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

Vue.component('download-excel', require('../components/DownloadExcel.vue'));
Vue.component('paginators', require('../components/Paginators.vue'));

const UsuarioController = new Vue({
   el: '#UsuarioController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_usuario',
         'nombre_tabla': 'usuarios', //nombre tabla o de ruta
         'nombre_ruta': 'usuarios', //nombre tabla o de ruta
         'nombre_model': 'usuario',
         'nombre_model_limpio': 'usuario_limpio',
         'nombre_detalle': 'Usuarios',
         'nombre_controller': 'UsuarioController',

         'filtro_head': null,
         'usuario': {
            'nom_usuario': null,
            'nom_completo': null,
            'ape_paterno': null,
            'ape_materno': null,
            'username': null,
            'email': null,
            'password': null,
            'remember_token': null,
            'id_usuario_registra': null,
            'id_usuario_modifica': null,
            'id_role': null,
            'nom_role': null,
            'id_estado': null,
            'nom_estado': null,
            'id_cargo': null,
            'nom_cargo': null,
            'created_at': null,
            'updated_at': null,
            'deleted_at': null,
         },
         'permitido_guardar': [
            'nom_usuario',
            'nom_completo',
            'ape_paterno',
            'ape_materno',
            'username',
            'email',
            'password',
            'id_role',
            'id_estado',
            'id_cargo',
         ],
         'relaciones_clase':[
            {'usuario_estado.estado':['id_estado','nom_estado']},
            {'usuario_role.role':['id_role','nom_role']},
            {'usuario_cargo.cargo':['id_cargo','nom_cargo']},
         ],
         'lom':{},
         'lista_objs_model':[],
         'usuarios': [],
         'roles': [],
         'estados': [],
         'cargos': [],

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
            //'id_usuario': {'visibility':false,'value':null},
            'nom_usuario': {'visibility':true,'value':null},
            'nom_completo': {'visibility':false,'value':null},
            'ape_paterno': {'visibility':false,'value':null},
            'ape_materno': {'visibility':false,'value':null},
            'username': {'visibility':false,'value':null},
            'email': {'visibility':false,'value':null},
            //'password': {'visibility':false,'value':null},
            //'remember_token': {'visibility':false,'value':null},
            //'id_usuario_registra': {'visibility':false,'value':null},
            //'id_usuario_modifica': {'visibility':false,'value':null},
            //'id_role': {'visibility':false,'value':null},
            'nom_role': {'visibility':false,'value':null},
            //'id_estado': {'visibility':false,'value':null},
            'nom_estado': {'visibility':false,'value':null},
            //'id_cargo': {'visibility':false,'value':null},
            'nom_cargo': {'visibility':false,'value':null},
            'created_at': {'visibility':false,'value':null},
            'updated_at': {'visibility':false,'value':null},
            //'deleted_at': {'visibility':false,'value':null},
         },

         /* Etiquetas */
         'tabla_labels': {
            'id_usuario': 'Id usuario',
            'nom_usuario': 'Nombre',
            'nom_completo': 'Nombre completo',
            'ape_paterno': 'Apellido paterno',
            'ape_materno': 'Apellido materno',
            'username': 'Nombre usuario',
            'email': 'Email',
            'password': 'Password',
            'remember_token': 'Remember token',
            'id_usuario_registra': 'Usuario registra',
            'id_usuario_modifica': 'Usuario modifica',
            'id_role': 'Id role',
            'nom_role': 'Nombre role',
            'id_estado': 'Id estado',
            'nom_estado': 'Nombre estado',
            'id_cargo': 'Id cargo',
            'nom_cargo': 'Nombre cargo',
            'created_at': 'Creado en',
            'updated_at': 'Actualizado en',
            'deleted_at': 'Eliminado en'
         },

         /* Campos del modelo en el excel */
         'excel_json_campos': {
            'id_usuario': 'String',
            'nom_usuario': 'String',
            'nom_completo': 'String',
            'ape_paterno': 'String',
            'ape_materno': 'String',
            'username': 'String',
            'email': 'String',
            //'password': 'String',
            //'remember_token': 'String',
            //'id_usuario_registra': 'String',
            //'id_usuario_modifica': 'String',
            'id_role': 'String',
            'nom_role': 'String',
            'id_estado': 'String',
            'nom_estado': 'String',
            'id_cargo': 'String',
            'nom_cargo': 'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el usuario
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase_config_relaciones(id_en_edicion, this.relaciones_clase); }
      },
      //usuarios se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      usuarios: function (usuarios) {
         var self = this;
         this.excel_json_datos = [];
         return usuarios.map(function (usuario, index) {
            return self.excel_json_datos.push({
               'id_usuario': usuario.id_usuario || '-',
               'nom_usuario': usuario.nom_usuario || '-',
               'nom_completo': usuario.nom_completo || '-',
               'ape_paterno': usuario.ape_paterno || '-',
               'ape_materno': usuario.ape_materno || '-',
               'username': usuario.username || '-',
               'email': usuario.email || '-',
               //'password': usuario.password || '-',
               //'remember_token': usuario.remember_token || '-',
               //'id_usuario_registra': usuario.id_usuario_registra || '-',
               //'id_usuario_modifica': usuario.id_usuario_modifica || '-',
               'id_role': usuario.id_role || '-',
               'nom_role': usuario.nom_role || '-',
               'id_estado': usuario.id_estado || '-',
               'nom_estado': usuario.nom_estado || '-',
               'id_cargo': usuario.id_cargo || '-',
               'nom_cargo': usuario.nom_cargo || '-',
               'created_at': usuario.created_at || '-',
               'updated_at': usuario.updated_at || '-',
               'deleted_at': usuario.deleted_at || '-'
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
   mixins: [inyeccion_funciones_compartidas],
   methods: {

      asignar_recursos: function (response) {

         /* Datos intrinsecos de la entidad */
         this.lista_objs_model = response.body.usuarios.data || null;
         this.usuarios = response.body.usuarios.data || null;
         this.datos_excel = response.body.usuarios.data || null;

         /* Datos de la entidad hacia el paginador */
         this.pagination = response.body.usuarios || null;

         /* Relaciones con la entidad */
         this.roles = response.body.roles || null;
         this.estados = response.body.estados || null;
         this.cargos = response.body.cargos || null;

         /* Datos de la sesion actual del usuario */
         this.usuario_auth = response.body.usuario_auth || null;

      },
   }
});