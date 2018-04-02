
import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

Vue.component('download-excel', require('../components/DownloadExcel.vue'));
Vue.component('vista-principal-servidor', require('../components/views/servidores/VistaPrincipalServidor.vue'));
Vue.component('tabla-listar-aplicacion', require('../components/views/aplicaciones/TablaListarAplicacion.vue'));
Vue.component('formulario-campos-aplicacion', require('../components/views/aplicaciones/FormularioCamposAplicacion.vue'));
import { Aplicacion } from '../components/models/Aplicacion.vue';

const ServidorController = new Vue({
   el: '#ServidorController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_servidor',
         'nombre_tabla':'servidores', //nombre tabla o de ruta
         'nombre_ruta':'servidores', //nombre tabla o de ruta
         'nombre_model':'servidor',
         'nombre_model_limpio': 'servidor_limpio',
         'nombre_detalle':'Servidores',
         'nombre_controller':'ServidorController',

         'filtro_head':null,

         'servidor': {
            'nom_servidor':null,
            'det_servidor':null,
            'ip_servidor':null,
            'ram':null,
            'memoria_dd':null,
            'swap':null,
            'procesador':null,
            'modelo_procesador':null,
            'frec_procesador':null,
            'nucleos':null,
            'usuarios_pactados':null,
            'mac':null,
            'nodo':null,
            'interface':null,
            'lvm_raiz':null,
            'lvm_usr':null,
            'lvm_tmp':null,
            'lvm_var':null,
            'lvm_home':null,
            'agente_instana_instalado':null,
            'id_datacentro':null,
            'id_sistema_operativo':null,
            'id_tipo_sistema_operativo':null, // no lleva relacion, solo se usa para filtrar un combobox
            'id_estado':null,
            'id_ambiente':null,
            'id_cluster':null,
            'id_usuario_registra':null,
            'id_usuario_modifica':null,
            'created_at':null,
            'updated_at':null,
            'deleted_at':null,
         },
         'aplicacion':Aplicacion, //objeto importado para ser usado por sus propiedades

         'permitido_guardar':[
            'nom_servidor',
            'det_servidor',
            'ip_servidor',
            'ram',
            'memoria_dd',
            'swap',
            'procesador',
            'modelo_procesador',
            'frec_procesador',
            'nucleos',
            'usuarios_pactados',
            'mac',
            'nodo',
            'interface',

            'lvm_raiz',
            'lvm_usr',
            'lvm_tmp',
            'lvm_var',
            'lvm_home',
            'agente_instana_instalado',

            'id_datacentro',
            'id_sistema_operativo',
            'id_estado',
            'id_ambiente',
            'id_cluster',
         ],
         'relaciones_clase':[
            {'datacentro':'id_datacentro'},
            {'sistema_operativo':'id_sistema_operativo'},
            {'aplicaciones':'id_aplicacion'},
            {'servidor_estado':'id_estado'},
            {'ambiente':'id_ambiente'},
            {'cluster':'id_cluster'},
            {'servidor_lvm':'id_servidor_lvm'},
            {'servidor_lvm':'lvm_raiz'},
            {'servidor_lvm':'lvm_usr'},
            {'servidor_lvm':'lvm_tmp'},
            {'servidor_lvm':'lvm_var'},
            {'servidor_lvm':'lvm_home'},
         ],

         'lom':{},
         'lista_objs_model':[],
         'clusters':[],
         'ambientes':[],
         'datacentros':[],
         'sistemas_operativos':[],
         'tipos_sistemas_operativos':[],
         'estados':[],
         'dominios':[],
         'servidores':[],
         'datos_excel':[],
         'usuario_auth':{},

         'campos_formularios':[],
         'errores_campos':[],

         //Variables para validar si se está creando o editando, variables del modal
         'modal_crear_activo': false,
         'modal_actualizar_activo': false,
         'modal_width': 90,

         //Estas var se deben conservar para todos los controllers por que se ejecutan para el modal crear (blanquea)
         'lista_actualizar_activo':false,

         'id_en_edicion': null,

         'orden_lista':'asc',

         'tabla_campos': {
            'nom_servidor':true,
            'det_servidor':true,
            'ip_servidor':true,
            'ram':true,
            'memoria_dd':true,
            'swap':false,
            'procesador':false,
            'modelo_procesador':false,
            'frec_procesador':false,
            'nucleos':false,
            'usuarios_pactados':false,
            'mac':false,
            'nodo':false,
            'interface':false,
            /*
            'lvm_raiz':false,
            'lvm_usr':false,
            'lvm_tmp':false,
            'lvm_var':false,
            'lvm_home':false,
            */
            'agente_instana_instalado':false,
            'id_datacentro':false,
            'id_sistema_operativo':false,
            'id_estado':false,
            'id_ambiente':false,
            'id_cluster':false,

            'id_usuario_registra':false,
            'id_usuario_modifica':false,
            'created_at':false,
            'updated_at':false,
            'deleted_at':false,
         },

         'tabla_labels': {
            'id_servidor':'Id servidor',

            'nom_servidor':'Nombre servidor',
            'det_servidor':'Detalle servidor',
            'ip_servidor':'Ip servidor',
            'ram':'Ram',
            'memoria_dd':'Memoria Disco',
            'swap':'Swap',
            'procesador':'Procesador',
            'modelo_procesador':'Modelo Procesador',
            'frec_procesador':'Frec. Procesador',
            'nucleos':'Nucleos',
            'usuarios_pactados':'Usuarios pactados',
            'mac':'Mac',
            'nodo':'Nodo',
            'interface':'Interface',
            'lvm_raiz':'/~Raiz',
            'lvm_usr':'usr',
            'lvm_tmp':'tmp',
            'lvm_var':'var',
            'lvm_home':'home',
            'agente_instana_instalado':'Agente Instana',

            'id_datacentro':'Id Datacrentro',
            'id_sistema_operativo':'Id Sistema Operativo',
            'id_estado':'Id Estado',
            'id_ambiente':'Id Ambiente',
            'id_cluster':'Id Cluster',

            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en',
         },

         //Este campo se debe generar cuando se va a descargar el excel, recorriendo el objeto de la clase
         'excel_json_campos': {
            'id_servidor':'String',

            'nom_servidor':'String',
            'det_servidor':'String',
            'ip_servidor':'String',
            'ram':'String',
            'memoria_dd':'String',
            'swap':'String',
            'procesador':'String',
            'modelo_procesador':'String',
            'frec_procesador':'String',
            'nucleos':'String',
            'usuarios_pactados':'String',
            'mac':'String',
            'nodo':'String',
            'interface':'String',
            'lvm_raiz':'String',
            'lvm_usr':'String',
            'lvm_tmp':'String',
            'lvm_var':'String',
            'lvm_home':'String',
            'agente_instana_instalado':'String',
            'id_datacentro':'String',
            'id_sistema_operativo':'String',
            'id_estado':'String',
            'id_ambiente':'String',
            'id_cluster':'String',

            'id_usuario_registra':'String',
            'id_usuario_modifica':'String',
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
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el servidor
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) { this.limpiar_objeto_clase_local(); }
         else { this.buscar_objeto_clase_config_relaciones(id_en_edicion, this.relaciones_clase); }
lista_objs_model
      },
      //servidores se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      servidores: function (servidores) {
         var self = this;
         this.excel_json_datos = [];
         return servidores.map(function (servidor, index) {
            return self.excel_json_datos.push({
               'id_servidor': servidor.id_servidor || '-',

               'nom_servidor': servidor.nom_servidor || '-',
               'det_servidor': servidor.det_servidor || '-',
               'ip_servidor': servidor.ip_servidor || '-',
               'ram': servidor.ram || '-',
               'memoria_dd': servidor.memoria_dd || '-',
               'swap': servidor.swap || '-',
               'procesador': servidor.procesador || '-',
               'modelo_procesador': servidor.modelo_procesador || '-',
               'frec_procesador': servidor.frec_procesador || '-',
               'nucleos': servidor.nucleos || '-',
               'usuarios_pactados': servidor.usuarios_pactados || '-',

               'mac': servidor.mac || '-',
               'nodo': servidor.nodo || '-',
               'interface': servidor.interface || '-',
               'lvm_raiz': servidor.lvm_raiz || '-',
               'lvm_usr': servidor.lvm_usr || '-',
               'lvm_tmp': servidor.lvm_tmp || '-',
               'lvm_var': servidor.lvm_var || '-',
               'lvm_home': servidor.lvm_home || '-',
               'agente_instana_instalado': servidor.agente_instana_instalado || '-',

               'id_datacentro': servidor.id_datacentro || '-',
               'id_sistema_operativo': servidor.id_sistema_operativo || '-',
               'id_estado': servidor.id_sistema_operativo || '-',
               'id_ambiente': servidor.id_ambiente || '-',
               'id_cluster': servidor.id_cluster || '-',

               'id_usuario_registra': servidor.id_usuario_registra || '-',
               'id_usuario_modifica': servidor.id_usuario_modifica || '-',
               'created_at': servidor.created_at || '-',
               'updated_at': servidor.updated_at || '-',
               'deleted_at': servidor.deleted_at || '-',
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

   },
   ready: {},
   filters: {},
   mixins: [ inyeccion_funciones_compartidas ],
   methods: {
      inicializar: function () {
         this.$http.get(`/${this.nombre_ruta}`).then(response => { // success callback
            this.configurar_relaciones(response.body.servidores, this.relaciones_clase);

            this.lista_objs_model = response.body.servidores || null;
            this.servidores = response.body.servidores || null;
            this.datos_excel = response.body.servidores || null;

            this.datacentros = response.body.datacentros || null;
            this.sistemas_operativos = response.body.sistemas_operativos || null;
            this.tipos_sistemas_operativos = response.body.tipos_sistemas_operativos || null;
            this.estados = response.body.estados || null;
            this.ambientes = response.body.ambientes || null;
            this.clusters = response.body.clusters || null;

            this.usuario_auth = response.body.usuario_auth || null;
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },

   }
});