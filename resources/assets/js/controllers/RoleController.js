
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
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },

         'role_limpio':{
            'nom_role':null,
            'det_role':null,
            'id_permiso':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'lom':{},
         'lista_objs_model':[],
         'roles':[],
         'datos_excel':[],
         'usuario_auth':{},

         'permisos':[],
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
            'id_role':false,
            'nom_role':true,
            'det_role':true,
            //'id_permiso':false,
            'id_usuario_registra':false,
            'id_usuario_modifica':false,
            'created_at':false,
            'updated_at':false,
            'deleted_at':false,
         },

         'tabla_labels': {
            'id_role':'Id role',
            'nom_role':'Nombre role',
            'det_role':'Detalle role',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en',
            //'id_permiso':'Permiso role',
         },

         'excel_json_campos': {
            'id_role': 'String',
            'nom_role': 'String',
            'det_role': 'String',
            'id_usuario_registra': 'String',
            'id_usuario_modifica': 'String',
            'created_at': 'String',
            'updated_at': 'String',
            'deleted_at': 'String',
            'id_permiso': 'String',
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
         if (id_en_edicion == null) {
            this.limpiar_objeto_clase_local();
         } else {
            //this.role = this.buscar_en_array_por_modelo_e_id(id_en_edicion,this.roles,this.nombre_model);
            this.$http.get(`/${this.nombre_tabla}/${id_en_edicion}`).then(response => { // success callback
               this.role = response.body[`${this.nombre_model}`];
               this.role.id_permiso = this.role.role_permiso.id_permiso || null;
            }, response => { // error callback
               this.checkear_estado_respuesta_http(response.status);
            });
         }
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
               'id_usuario_registra': role.id_usuario_registra || '-',
               'id_usuario_modifica': role.id_usuario_modifica || '-',
               'created_at': role.created_at || '-',
               'updated_at': role.updated_at || '-',
               'deleted_at': role.deleted_at || '-',
               'id_permiso': (role.permiso) ? role.permiso.id_permiso : '-',
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
            this.lista_objs_model = response.body.roles || null;
            this.roles = response.body.roles || null;
            this.permisos = response.body.permisos || null;
            this.datos_excel = response.body.roles || null;
            this.usuario_auth = response.body.usuario_auth || null;
            //this.limpiar_objeto_clase_local();
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },


      editar: function (id_role) {
         this.lista_actualizar_activo = true;
         this.id_en_edicion = id_role;

         //id_objeto + array de objetos + nombre del model en lower case
         this.role = null;
         this.role = this.buscar_en_array_por_modelo_e_id(id_role,this.roles,this.nombre_model);

      },

      guardar_editado: function () {

         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

         this.$http.put(`/${this.nombre_ruta}/${this.role.id_role}`, this.role).then(response => { // success callback

            if (response.status == 200) {
               /*
               if ( !this.es_null(response.body.role) ) {
                  this.lista_actualizar_activo = false;
                  this.id_en_edicion = null;
               }
               */
            } else {
               this.checkear_estado_respuesta_http(response.status);
               return false;
            }

            if ( this.mostrar_notificaciones(response) == true ) {

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



      eliminar: function (id_role) {
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

               this.$http.delete(`/${this.nombre_ruta}/${id_role}`).then(response => {
                  if ( response.status == 200) {
                     this.auto_alerta_corta("Eliminado!","Registro eliminado correctamente","success");
                  }else {
                     this.checkear_estado_respuesta_http(response.status);
                     return false;
                  }

                  if ( this.mostrar_notificaciones(response) == true ) {
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
               this.auto_alerta_corta("Cancelado","Se ha cancelado la eliminación","success");
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
         var formData = new  FormData();
         //Conforma objeto paramétrico para solicitud http
         formData.append('nom_role', this.role.nom_role || null );
         formData.append('det_role', this.role.det_role || null );
         formData.append('id_permiso',this.role.id_permiso || null );

         this.$http.post(`/${this.nombre_ruta}`, formData).then(response => { // success callback

            if ( response.status == 200) {
               if ( !this.es_null(response.body.servicio) ) {
                  this.id_en_edicion = null;
               }
               //this.inicializar();
            } else {
               this.checkear_estado_respuesta_http(response.status);
               return false;
            }

            if ( this.mostrar_notificaciones(response) == true ) {
               this.limpiar_objeto_clase_local();
               this.inicializar();
               this.ocultar_modal('crear');
               return ;
            }

         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });

         return;
      },

   }
});