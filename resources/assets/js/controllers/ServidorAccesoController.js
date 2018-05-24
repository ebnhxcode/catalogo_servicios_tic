
import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

Vue.component('download-excel', require('../components/DownloadExcel.vue'));
Vue.component('paginators', require('../components/Paginators.vue'));

const ServidorAccesoController = new Vue({
   el: '#ServidorAccesoController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_servidor_acceso',
         'nombre_tabla':'servidores_accesos', //nombre tabla o de ruta
         'nombre_ruta':'servidores_accesos', //nombre tabla o de ruta
         'nombre_model':'servidor_acceso',
         'nombre_model_limpio': 'servidor_acceso_limpio',
         'nombre_detalle':'Servidores Accesos',
         'nombre_controller':'ServidorAccesoController',

         'filtro_head':null,
         'servidor_acceso':{
            'usuario':null,
            'clave':null,
            'decrypted_clave':null,
            'tipo_acceso':null,
            'puerto':null,
            'id_servidor':null,
            'nom_servidor':null,
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
            'puerto',
            'id_servidor',
         ],
         'relaciones_clase':[
            {'servidor':['id_servidor','nom_servidor']},
         ],
         'lom':{},
         'lista_objs_model':[],
         'servidores':[],
         'servidores_accesos':[],
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
            'puerto':true,
            //'id_servidor':false,
            'nom_servidor':false,
            //'id_usuario_registra':false,
            //'id_usuario_modifica':false,
            'created_at':false,
            'updated_at':false,
            'deleted_at':false,
         },

         /* Etiquetas */
         'tabla_labels': {
            'usuario':'Usuario',
            'clave':'Clave',
            'tipo_acceso':'Tipo Acceso',
            'puerto':'Puerto',
            'id_servidor':'Id Servidor',
            'nom_servidor':'Nombre Servidor',
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
            'puerto':'String',
            'id_servidor':'String',
            'nom_servidor':'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el servidor_acceso
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase_config_relaciones(id_en_edicion, this.relaciones_clase); }
      },
      //servidores_accesos se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      servidores_accesos: function (servidores_accesos) {
         var self = this;
         this.excel_json_datos = [];
         return servidores_accesos.map(function (servidor_acceso, index) {
            return self.excel_json_datos.push({
               'usuario': servidor_acceso.usuario || '-',
               'clave': servidor_acceso.clave || '-',
               'tipo_acceso': servidor_acceso.tipo_acceso || '-',
               'puerto': servidor_acceso.puerto || '-',
               'id_servidor': servidor_acceso.id_servidor || '-',
               'nom_servidor': servidor_acceso.nom_servidor || '-',
               //'id_usuario_registra': servidor_acceso.id_usuario_registra || '-',
               //'id_usuario_modifica': servidor_acceso.id_usuario_modifica || '-',
               'created_at': servidor_acceso.created_at || '-',
               'updated_at': servidor_acceso.updated_at || '-',
               'deleted_at': servidor_acceso.deleted_at || '-',
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
         this.lista_objs_model = response.body.servidores_accesos.data || null;
         this.servidores_accesos = response.body.servidores_accesos.data || null;
         this.datos_excel = response.body.servidores_accesos.data || null;

         /* Datos de la entidad hacia el paginador */
         this.pagination = response.body.servidores_accesos || null;

         /* Relaciones con la entidad */
         this.servidores = response.body.servidores || null;

         /* Datos de la sesion actual del usuario */
         this.usuario_auth = response.body.usuario_auth || null;

      },

   }
});