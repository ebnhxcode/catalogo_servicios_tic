
import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

Vue.component('download-excel', require('../components/DownloadExcel.vue'));
Vue.component('paginators', require('../components/Paginators.vue'));

const ServicioController = new Vue({
   el: '#ServicioController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_servicio',
         'nombre_tabla':'servicios', //nombre tabla o de ruta
         'nombre_ruta':'servicios', //nombre tabla o de ruta
         'nombre_model':'servicio',
         'nombre_model_limpio': 'servicio_limpio',
         'nombre_detalle':'Servicios',
         'nombre_controller':'ServicioController',

         'filtro_head':null,
         'filtro_componente':null,
         'filtro_estado':'Activo',
         'servicio':{
            'nom_servicio':null,
            'det_servicio':null,
            //'id_actividad':null,
            'nom_actividad':null,
            //'id_usuario':null,
            'nom_usuario':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         //en la asociacion de un usuario nuevo a un servicio
         'servicio_usuario':{
            'id_usuario':null,
         },
         'servicio_nueva_bitacora':{
            'asunto':null,
            'det_bitacora':null,
         },
         'permitido_guardar':[
            'nom_servicio',
            'det_servicio',
            'id_actividad',
            'id_usuario',
         ],
         'relaciones_clase':[
            {'actividad':['id_actividad','nom_actividad']},
            //{'usuario':['id_usuario','nom_usuario']},
         ],



         'lom':{},
         'lista_objs_model':[],
         'actividades':[],
         'servicios':[],
         'estados':[],
         'usuarios':[],
         'usuarios_bitacora_servicios':[],
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
            //'id_servicio':false,
            'nom_servicio':true,
            'det_servicio':false,
            'n_aplicaciones':true,
            'n_servidores':true,
            //'id_actividad':false,
            'nom_actividad':false,
            //'id_usuario':false,
            //'nom_usuario':false,
            //'id_usuario_registra':false,
            //'id_usuario_modifica':false,
            'created_at':false,
            'updated_at':false,
            //'deleted_at':false,
         },

         /* Etiquetas */
         'tabla_labels': {
            'id_servicio':'Id Servicio',
            'nom_servicio':'Nombre servicio',
            'det_servicio':'Detalle servicio',
            'id_actividad':'Id Actividad',
            'nom_actividad':'Nombre actividad',
            'n_aplicaciones':'# Apps',
            'n_servidores':'# Servidores',
            'id_usuario':'Id Usuario',
            'nom_usuario':'Nombre usuario asoc.',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en',
         },

         /* Campos del modelo en el excel */
         'excel_json_campos': {
            'id_servicio':'String',
            'nom_servicio':'String',
            'det_servicio':'String',
            'id_actividad':'String',
            'nom_actividad':'String',
            'n_aplicaciones':'String',
            'n_servidores':'String',
            //'id_usuario':'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el servicio
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase_config_relaciones(id_en_edicion, this.relaciones_clase); }
      },
      //servicios se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      servicios: function (servicios) {
         var self = this;
         this.excel_json_datos = [];
         return servicios.map(function (servicio, index) {
            return self.excel_json_datos.push({
               'id_servicio': servicio.id_servicio || '-',
               'nom_servicio': servicio.nom_servicio || '-',
               'det_servicio': servicio.det_servicio || '-',
               'id_actividad': servicio.id_actividad || '-',
               'nom_actividad': servicio.nom_actividad || '-',
               'n_aplicaciones': servicio.aplicaciones.length || '-',
               'n_servidores': servicio.servidores.length || '-',
               //'id_usuario': servicio.id_usuario || '-',
               //'id_usuario_registra': servicio.id_usuario_registra || '-',
               //'id_usuario_modifica': servicio.id_usuario_modifica || '-',
               'created_at': servicio.created_at || '-',
               'updated_at': servicio.updated_at || '-',
               'deleted_at': servicio.deleted_at || '-',
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
         this.lista_objs_model = response.body.servicios.data || null;
         this.servicios = response.body.servicios.data || null;
         this.datos_excel = response.body.servicios.data || null;

         /* Datos de la entidad hacia el paginador */
         this.pagination = response.body.servicios || null;

         /* Relaciones con la entidad */
         this.permisos = response.body.permisos || null;
         this.actividades = response.body.actividades || null;
         this.usuarios_bitacora_servicios = response.body.usuarios_bitacora_servicios || null;
         this.estados = response.body.estados || null;
         this.usuarios = response.body.usuarios || null;

         /* Datos de la sesion actual del usuario */
         this.usuario_auth = response.body.usuario_auth || null;

         this.lista_objs_model.map((lom) => {
            lom.n_aplicaciones = lom.aplicaciones.length || 0;
            lom.n_servidores = lom.servidores.length || 0;
         });

      },

      eliminar_usuario_servicio: function (id) {

         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

         this.$http.delete(`/servicios_usuarios/${id}`).then(response => {
            if (response.status == 200) {
               this.eliminar_de_array_por_modelo_e_id(id, this.servicio.servicios_usuarios, 'servicio_usuario');
               //this.auto_alerta_corta("Eliminado!", "Registro eliminado correctamente", "success", 800);
            } else {
               this.checkear_estado_respuesta_http(response.status);
               return false;
            }

            if (this.mostrar_notificaciones(response) == true) {
               //Recargar la lista
               //this.inicializar();
            }
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });

      },

      eliminar_bitacora_usuario: function (id) {

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
            cancelButtonText: 'No, mantener.'
         }).then((result) => {
            if (result.value) {
               //Se adjunta el token
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

               this.$http.delete(`/usuarios_bitacora_servicios/${id}`).then(response => {
                  if (response.status == 200) {
                     this.eliminar_de_array_por_modelo_e_id(id, this.servicio.usuarios_bitacora_servicios, 'usuario_bitacora_servicio');
                     //this.auto_alerta_corta("Eliminado!", "Registro eliminado correctamente", "success", 800);
                  } else {
                     this.checkear_estado_respuesta_http(response.status);
                     return false;
                  }

                  if (this.mostrar_notificaciones(response) == true) {
                     //Recargar la lista
                     //this.inicializar();
                  }
               }, response => { // error callback
                  this.checkear_estado_respuesta_http(response.status);
               })
            }
         });

      },

      guardar_nuevo_usuario_servicio: function () {
         //Ejecuta validacion sobre los campos con validaciones
         this.$validator.validateAll({
            id_usuario:this.servicio_usuario.id_usuario
         }).then( res => {
            if (res == true) {
               //Se adjunta el token
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               //Instancia nuevo form data
               var formData = new FormData();
               //Conforma objeto paramétrico para solicitud http
               formData.append(`id_usuario`, this.servicio_usuario.id_usuario);
               formData.append(`id_servicio`, this.servicio.id_servicio);

               this.$http.post(`/servicios_usuarios`, formData).then(response => { // success callback

                  //console.log(response.body);

                  if (response.status == 200) {

                     this.servicio.servicios_usuarios.push(response.body.servicio_usuario);

                  } else {
                     this.checkear_estado_respuesta_http(response.status);
                     return false;
                  }
                  if (this.mostrar_notificaciones(response) == true) {
                     return;
                  }
               }, response => { // error callback
                  this.checkear_estado_respuesta_http(response.status);
               });
            }
         });
         return;
      },

      guardar_nueva_bitacora: function () {
         //Ejecuta validacion sobre los campos con validaciones
         this.$validator.validateAll({
            asunto:this.servicio_nueva_bitacora.asunto,
            det_bitacora:this.servicio_nueva_bitacora.det_bitacora
         }).then( res => {
            if (res == true) {
               //Se adjunta el token
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               //Instancia nuevo form data
               var formData = new FormData();
               //Conforma objeto paramétrico para solicitud http
               formData.append(`asunto`, this.servicio_nueva_bitacora.asunto);
               formData.append(`det_bitacora`, this.servicio_nueva_bitacora.det_bitacora);
               formData.append(`id_servicio`, this.servicio.id_servicio);
               formData.append(`id_actividad`, this.servicio.id_actividad);

               this.$http.post(`/usuarios_bitacora_servicios`, formData).then(response => { // success callback

                  //console.log(response.body);

                  if (response.status == 200) {
                     console.log(response.body.usuario_bitacora_servicio);

                     this.servicio_nueva_bitacora.asunto = null;
                     this.servicio_nueva_bitacora.det_bitacora = null;
                     this.servicio.usuarios_bitacora_servicios.push(response.body.usuario_bitacora_servicio);
                     /*
                     this.inicializar();
                     */
                  } else {
                     this.checkear_estado_respuesta_http(response.status);
                     return false;
                  }
                  if (this.mostrar_notificaciones(response) == true) {
                     return;
                  }
               }, response => { // error callback
                  this.checkear_estado_respuesta_http(response.status);
               });
            }
         });
         return;
      },

      bytesToSize: function (bytes) {
         bytes*=1050000;
         const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
         if (bytes === 0) return 'n/a'
         const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
         if (i === 0) return `${bytes} ${sizes[i]})`
         return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
      }

   }
});