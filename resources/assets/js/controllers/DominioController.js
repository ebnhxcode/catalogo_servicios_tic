
import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

Vue.component('download-excel', require('../components/DownloadExcel.vue'));
Vue.component('paginators', require('../components/Paginators.vue'));

const DominioController = new Vue({
   el: '#DominioController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_dominio',
         'nombre_tabla':'dominios', //nombre tabla o de ruta
         'nombre_ruta':'dominios', //nombre tabla o de ruta
         'nombre_model':'dominio',
         'nombre_model_limpio': 'dominio_limpio',
         'nombre_detalle':'Dominios',
         'nombre_controller':'DominioController',

         'filtro_head':null,
         'dominio':{
            'nom_dominio':null,
            'det_dominio':null,
            'ip_publica':null,
            'ip_balanceador':null,
            'dns_asoc_dominio':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'permitido_guardar':[
            'nom_dominio',
            'det_dominio',
            'ip_publica',
            'ip_balanceador',
            'dns_asoc_dominio',
         ],
         'relaciones_clase':[],
         'lom':{},
         'lista_objs_model':[],
         'dominios':[],
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
            'id_dominio':false,
            'nom_dominio':true,
            'det_dominio':true,
            'ip_publica':true,
            'ip_balanceador':false,
            'dns_asoc_dominio':false,
            //'id_usuario_registra':false,
            //'id_usuario_modifica':false,
            'created_at':false,
            'updated_at':false,
            'deleted_at':false,
         },

         /* Etiquetas */
         'tabla_labels': {
            'id_dominio':'Id dominio',
            'nom_dominio':'Nombre dominio',
            'det_dominio':'Detalle dominio',
            'ip_publica':'Ip Publica',
            'ip_balanceador':'Ip Balanceador',
            'dns_asoc_dominio':'DNS asociado dominio',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en'
         },

         /* Campos del modelo en el excel */
         'excel_json_campos': {
            'id_dominio': 'String',
            'nom_dominio': 'String',
            'det_dominio': 'String',
            'ip_publica': 'String',
            'ip_balanceador': 'String',
            'dns_asoc_dominio': 'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el dominio
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase(id_en_edicion); }
      },
      //dominios se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      dominios: function (dominios) {
         var self = this;
         this.excel_json_datos = [];
         return dominios.map(function (dominio, index) {
            return self.excel_json_datos.push({
               'id_dominio': dominio.id_dominio || '-',
               'nom_dominio': dominio.nom_dominio || '-',
               'det_dominio': dominio.det_dominio || '-',
               'ip_publica': dominio.ip_publica || '-',
               'ip_balanceador': dominio.ip_balanceador || '-',
               'dns_asoc_dominio': dominio.dns_asoc_dominio || '-',
               //'id_usuario_registra': dominio.id_usuario_registra || '-',
               //'id_usuario_modifica': dominio.id_usuario_modifica || '-',
               'created_at': dominio.created_at || '-',
               'updated_at': dominio.updated_at || '-',
               'deleted_at': dominio.deleted_at || '-'
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
         this.lista_objs_model = response.body.dominios.data || null;
         this.dominios = response.body.dominios.data || null;
         this.datos_excel = response.body.dominios.data || null;

         /* Datos de la entidad hacia el paginador */
         this.pagination = response.body.dominios || null;

         /* Datos de la sesion actual del usuario */
         this.usuario_auth = response.body.usuario_auth || null;

      },
   }
});