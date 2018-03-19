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

const UsuarioController = new Vue({
   el: '#UsuarioController',
   data(){
      return {
         '$':window.jQuery,
         'nombre_tabla': 'usuarios', //nombre tabla o de ruta
         'nombre_ruta': 'usuarios', //nombre tabla o de ruta
         'nombre_model': 'usuario',
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
            'id_estado': null,
            'id_cargo': null,
            'created_at': null,
            'updated_at': null,
            'deleted_at': null,
         },
         'usuario_limpio': {
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
            'id_estado': null,
            'id_cargo': null,
            'created_at': null,
            'updated_at': null,
            'deleted_at': null,
         },
         'lom':{},
         'lista_objs_model':[],
         'usuarios': [],
         'roles': [],
         'estados': [],
         'cargos': [],
         'datos_excel': [],
         'usuario_auth': {},

         'campos_formularios': [],
         'errores_campos': [],

         //Variables para validar si se está creando o editando
         'modal_crear_activo': false,
         'modal_actualizar_activo': false,

         //Estas var se deben conservar para todos los controllers por que se ejecutan para el modal crear (blanquea)
         'lista_actualizar_activo': false,

         'id_en_edicion': null,

         'orden_lista': 'asc',

         'tabla_campos': {
            'id_usuario': false,
            'nom_usuario': true,
            'nom_completo': false,
            'ape_paterno': true,
            'ape_materno': false,
            'username': true,
            'email': true,
            'password': false,
            'remember_token': false,
            'id_usuario_registra': false,
            'id_usuario_modifica': false,
            'id_role': false,
            'id_estado': false,
            'id_cargo': false,
            'created_at': false,
            'updated_at': false,
            'deleted_at': false,
         },

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
            'id_estado': 'Id estado',
            'id_cargo': 'Id cargo',
            'created_at': 'Creado en',
            'updated_at': 'Actualizado en',
            'deleted_at': 'Eliminado en'
         },

         'excel_json_campos': {
            'id_usuario': 'String',
            'nom_usuario': 'String',
            'nom_completo': 'String',
            'ape_paterno': 'String',
            'ape_materno': 'String',
            'username': 'String',
            'email': 'String',
            'password': 'String',
            'remember_token': 'String',
            'id_usuario_registra': 'String',
            'id_usuario_modifica': 'String',
            'id_role': 'String',
            'id_estado': 'String',
            'id_cargo': 'String',
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
         if (id_en_edicion == null) {
            this.limpiar_objeto_clase_local();
         } else {
            //this.usuario = this.buscar_en_array_por_modelo_e_id(id_en_edicion, this.usuarios, this.nombre_model);
            this.$http.get(`/${this.nombre_tabla}/${id_en_edicion}`).then(response => { // success callback
               this.usuario = response.body[`${this.nombre_model}`];
               this.usuario.id_role = this.usuario.usuario_role.id_role || null;
               this.usuario.id_estado = this.usuario.usuario_estado.id_estado || null;
               this.usuario.id_cargo = this.usuario.usuario_cargo.id_cargo || null;
            }, response => { // error callback
               this.checkear_estado_respuesta_http(response.status);
            });
         }
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
               'password': usuario.password || '-',
               'remember_token': usuario.remember_token || '-',
               'id_usuario_registra': usuario.id_usuario_registra || '-',
               'id_usuario_modifica': usuario.id_usuario_modifica || '-',
               'id_role': usuario.id_role || '-',
               'id_estado': usuario.id_estado || '-',
               'id_cargo': usuario.id_cargo || '-',
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

      $(document).ready(function () {
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
   mixins: [inyeccion_funciones_compartidas],
   methods: {

       limpiar_objeto_clase_local: function () {
          this.usuario = null; this.usuario = this.usuario_limpio;
      },


      inicializar: function () {
         this.$http.get(`/${this.nombre_ruta}`).then(response => { // success callback
            this.lista_objs_model = response.body.usuarios || null;
            this.usuarios = response.body.usuarios || null;
            this.roles = response.body.roles || null;
            this.estados = response.body.estados || null;
            this.cargos = response.body.cargos || null;
            this.datos_excel = response.body.usuarios || null;
            this.usuario_auth = response.body.usuario_auth || null;
            //this.limpiar_objeto_clase_local();
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },


      editar: function (id_usuario) {
         this.lista_actualizar_activo = true;
         this.id_en_edicion = id_usuario;

         //id_objeto + array de objetos + nombre del model en lower case
         this.usuario = null;
         this.usuario = this.buscar_en_array_por_modelo_e_id(id_usuario, this.usuarios, this.nombre_model);

      },

      guardar_editado: function () {

         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

         this.$http.put(`/${this.nombre_ruta}/${this.usuario.id_usuario}`, this.usuario).then(response => { // success callback

            if (response.status == 200) {

               /*
               if (!this.es_null(response.body.usuario)) {
                  this.lista_actualizar_activo = false;
                  this.id_en_edicion = null;
               }
               */
            } else {
               this.checkear_estado_respuesta_http(response.status);
               return false;
            }

            if (this.mostrar_notificaciones(response) == true) {

               /*
               //Aqui que pregunte si el modal está activo para que lo cierre
               if (this.modal_actualizar_activo == true) {
                  this.ocultar_modal('actualizar');
                  this.modal_actualizar_activo = false;
               }

               this.lista_actualizar_activo = false;
               this.id_en_edicion = null;
               */

               //Recargar la lista
               this.inicializar();

            }

         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });

         return;
      },


      eliminar: function (id_usuario) {
         swal({
            title: "¿Estás seguro/a?",
            text: "¿Deseas confirmar la eliminación de este registro?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            closeOnCancel: false,
            confirmButtonColor: '#DD6B55',
            confirmButtonClass: "btn-danger",
            confirmButtonText: 'Si, eliminar!',
            confirmButtonClass: "btn-warning",
            cancelButtonText: 'No, mantener.'
         }).then((result) => {
            if (result.value) {
               //Se adjunta el token
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

               this.$http.delete(`/${this.nombre_ruta}/${id_usuario}`).then(response => {
                  if (response.status == 200) {
                     this.auto_alerta_corta("Eliminado!", "Registro eliminado correctamente", "success");
                  } else {
                     this.checkear_estado_respuesta_http(response.status);
                     return false;
                  }

                  if (this.mostrar_notificaciones(response) == true) {
                     //Aqui que pregunte si el modal está activo para que lo cierre
                     if (this.modal_actualizar_activo == true) {
                        this.ocultar_modal('actualizar');
                        this.modal_actualizar_activo = false;
                     }
                     this.lista_actualizar_activo = false;
                     this.id_en_edicion = null;

                     //Recargar la lista
                     this.inicializar();
                  }
               }, response => { // error callback
                  this.checkear_estado_respuesta_http(response.status);
               });
            } else if (result.dismiss === swal.DismissReason.cancel) {
               this.auto_alerta_corta("Cancelado", "Se ha cancelado la eliminación", "success");
            }
         });

      },

      guardar: function () {
         //Ejecuta validacion sobre los campos con validaciones
         if (this.validar_campos() == false) {
            return;
         }
         //Se adjunta el token
         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
         //Instancia nuevo form data
         var formData = new FormData();
         //Conforma objeto paramétrico para solicitud http
         formData.append('nom_usuario', this.usuario.nom_usuario || null);
         formData.append('nom_completo', this.usuario.nom_completo || null);
         formData.append('ape_paterno', this.usuario.ape_paterno || null);
         formData.append('ape_materno', this.usuario.ape_materno || null);
         formData.append('username', this.usuario.username || null);
         formData.append('email', this.usuario.email || null);
         formData.append('password', this.usuario.password || null);
         formData.append('id_role', this.usuario.id_role || null);
         formData.append('id_estado', this.usuario.id_estado || null);
         formData.append('id_cargo', this.usuario.id_cargo || null);

         this.$http.post(`/${this.nombre_ruta}`, formData).then(response => { // success callback

            if (response.status == 200) {
               if (!this.es_null(response.body.usuario)) {
                  this.id_en_edicion = null;
               }
               //this.inicializar();
            } else {
               this.checkear_estado_respuesta_http(response.status);
               return false;
            }

            if (this.mostrar_notificaciones(response) == true) {
               this.limpiar_objeto_clase_local();
               this.inicializar();
               this.ocultar_modal('crear');
               return;
            }

         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });

         return;
      },

   }
});