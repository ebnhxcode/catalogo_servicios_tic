
import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

Vue.component('download-excel', require('../components/DownloadExcel.vue'));
Vue.component('paginators', require('../components/Paginators.vue'));
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
            'id_servidor_lvm':null,
            'lvm_raiz':null,
            'lvm_usr':null,
            'lvm_tmp':null,
            'lvm_var':null,
            'lvm_home':null,
            'agente_instana_instalado':null,
            'id_servicio':null,
            'nom_servicio':null,
            'id_datacentro':null,
            'nom_datacentro':null,
            'id_sistema_operativo':null,
            'nom_sistema_operativo':null,
            'id_tipo_sistema_operativo':null, // no lleva relacion, solo se usa para filtrar un combobox
            'id_estado':null,
            'nom_estado':null,
            'id_ambiente':null,
            'nom_ambiente':null,
            'id_cluster':null,
            'id_vlan':null,
            'id_tipo_servidor':null,
            'nom_cluster':null,
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
            'id_servicio',
            'id_sistema_operativo',
            'id_estado',
            'id_ambiente',
            'id_cluster',
            'id_vlan',
            'id_tipo_servidor',
            'id_tipo_respaldo_disco',
         ],
         'relaciones_clase':[

            {'datacentro':['id_datacentro','nom_datacentro']},
            {'servicio':['id_servicio','nom_servicio']},
            {'sistema_operativo':['id_sistema_operativo','nom_sistema_operativo']},
            //{'aplicaciones':['id_aplicacion','nom_aplicacion']},
            {'servidor_estado.estado':['id_estado','nom_estado']},
            {'ambiente':['id_ambiente','nom_ambiente']},
            {'cluster':['id_cluster','nom_cluster']},
            {'servidor_lvm':['id_servidor_lvm','lvm_raiz','lvm_usr','lvm_tmp','lvm_var','lvm_home']},
            {'vlan':['id_vlan','nom_vlan']},
            {'tipo_servidor':['id_tipo_servidor','nom_tipo_servidor']},
            {'tipo_respaldo_disco':['id_tipo_respaldo_disco','nom_tipo_respaldo_disco']},

         ],

         'lom':{},
         'lista_objs_model':[],
         'clusters':[],
         'vlans':[],
         'tipos_servidores':[],
         'tipos_respaldos_discos':[],
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
            'nom_servidor':true,
            'det_servidor':false,
            'ip_servidor':true,
            'ram':true,
            'memoria_dd':true,
            //'swap':false,
            //'procesador':false,
            //'modelo_procesador':false,
            //'frec_procesador':false,
            'nucleos':false,
            //'usuarios_pactados':false,
            //'mac':false,
            //'nodo':false,
            //'interface':false,
            'lvm_raiz':false,
            'lvm_usr':false,
            'lvm_tmp':false,
            'lvm_var':false,
            'lvm_home':false,
            'agente_instana_instalado':false,
            //'id_datacentro':false,
            'nom_datacentro':false,
            //'id_servicio':false,
            'nom_servicio':false,
            //'id_sistema_operativo':false,
            'nom_sistema_operativo':false,
            //'id_estado':false,
            'nom_estado':false,
            //'id_ambiente':false,
            'nom_ambiente':false,
            //'id_cluster':false,
            'nom_cluster':false,
            'nom_vlan':false,
            'nom_tipo_servidor':false,
            'nom_tipo_respaldo_disco':false,

            //'id_usuario_registra':false,
            //'id_usuario_modifica':false,
            'created_at':false,
            'updated_at':false,
            'deleted_at':false,
         },

         /* Etiquetas */
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

            'id_servicio':'Id Servicio',
            'nom_servicio':'Nombre servicio',
            'id_datacentro':'Id Datacrentro',
            'nom_datacentro':'Nombre datacrentro',
            'id_sistema_operativo':'Id Sistema Operativo',
            'nom_sistema_operativo':'Nombre SO',
            'id_estado':'Id Estado',
            'nom_estado':'Nombre estado',
            'id_ambiente':'Id Ambiente',
            'nom_ambiente':'Nombre ambiente',
            'id_cluster':'Id Cluster',
            'nom_cluster':'Nombre cluster',
            'id_vlan':'Id vlan',
            'nom_vlan':'Nombre vlan',
            'id_tipo_servidor':'Id tipo servidor',
            'nom_tipo_servidor':'Nombre tipo servidor',
            'id_tipo_respaldo_disco':'Id respaldo disco',
            'nom_tipo_respaldo_disco':'Nombre respaldo disco',

            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en',
            'deleted_at':'Eliminado en',
         },

         /* Campos del modelo en el excel */
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
            'id_servicio':'String',
            'nom_servicio':'String',
            'id_datacentro':'String',
            'nom_datacentro':'String',
            'id_sistema_operativo':'String',
            'nom_sistema_operativo':'String',
            'id_estado':'String',
            'nom_estado':'String',
            'id_ambiente':'String',
            'nom_ambiente':'String',
            'id_cluster':'String',
            'nom_cluster':'String',
            'id_vlan':'String',
            'nom_vlan':'String',
            'id_tipo_servidor':'String',
            'nom_tipo_servidor':'String',
            'id_tipo_respaldo_disco':'String',
            'nom_tipo_respaldo_disco':'String',

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

               'id_servicio': servidor.id_servicio || '-',
               'nom_servicio': servidor.nom_servicio || '-',
               'id_datacentro': servidor.id_datacentro || '-',
               'nom_datacentro': servidor.nom_datacentro || '-',
               'id_sistema_operativo': servidor.id_sistema_operativo || '-',
               'nom_sistema_operativo': servidor.nom_sistema_operativo || '-',
               'id_estado': servidor.id_estado || '-',
               'nom_estado': servidor.nom_estado || '-',
               'id_ambiente': servidor.id_ambiente || '-',
               'nom_ambiente': servidor.nom_ambiente || '-',
               'id_cluster': servidor.id_cluster || '-',
               'nom_cluster': servidor.nom_cluster || '-',
               'id_vlan': servidor.id_vlan || '-',
               'nom_vlan': servidor.nom_vlan || '-',
               'id_tipo_servidor': servidor.id_tipo_servidor || '-',
               'nom_tipo_servidor': servidor.nom_tipo_servidor || '-',
               'id_tipo_respaldo_disco': servidor.id_tipo_respaldo_disco || '-',
               'nom_tipo_respaldo_disco': servidor.nom_tipo_respaldo_disco || '-',

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
   },
   ready: {},
   filters: {},
   mixins: [ inyeccion_funciones_compartidas ],
   methods: {
      asignar_recursos: function (response) {

         /* Datos intrinsecos de la entidad */
         this.lista_objs_model = response.body.servidores.data || null;
         this.servidores = response.body.servidores.data || null;
         this.datos_excel = response.body.servidores.data || null;

         /* Datos de la entidad hacia el paginador */
         this.pagination = response.body.servidores || null;

         /* Relaciones con la entidad */
         this.datacentros = response.body.datacentros || null;
         this.servicios = response.body.servicios || null;
         this.sistemas_operativos = response.body.sistemas_operativos || null;
         this.tipos_sistemas_operativos = response.body.tipos_sistemas_operativos || null;
         this.estados = response.body.estados || null;
         this.ambientes = response.body.ambientes || null;
         this.clusters = response.body.clusters || null;
         this.vlans = response.body.vlans || null;
         this.tipos_servidores = response.body.tipos_servidores || null;
         this.tipos_respaldos_discos = response.body.tipos_respaldos_discos || null;

         /* Datos de la sesion actual del usuario */
         this.usuario_auth = response.body.usuario_auth || null;

      },
   }
});