
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
//import { Aplicacion } from '../components/models/Aplicacion.vue';

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
         //'aplicacion':Aplicacion, //objeto importado para ser usado por sus propiedades

         'aplicacion':{
            'nom_aplicacion':null,
            'det_aplicacion':null,
            'alias':null,
            'url_web':null,
            'ip':null,
            'subdominio':null,
            'ssl_tls':null,

            'id_dominio':null,
            'id_servidor':null,
            'id_servicio':null,
            'id_tipo_aplicacion':null,
         },

         'aplicacion_acceso':{
            'usuario':null,
            'clave':null,
            'email':null,
            'tipo_acceso':null,
            'id_aplicacion':null,
            'id_servidor':null,
         },

         'servidor_acceso':{
            'usuario':null,
            'clave':null,
            'tipo_acceso':null,
            'puerto':null,
            'id_servidor':null,
         },

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
         'tipos_aplicaciones':[],
         'tipos_respaldos_discos':[],
         'ambientes':[],
         'datacentros':[],
         'sistemas_operativos':[],
         'tipos_sistemas_operativos':[],
         'estados':[],
         'dominios':[],
         'aplicaciones':[],
         'servidores':[],
         'servicios':[],

         'spinner_table':true,

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
            'nom_servidor':{'visibility':true,'value':null},
            'det_servidor':{'visibility':false,'value':null},
            'ip_servidor':{'visibility':false,'value':null},
            'ram':{'visibility':false,'value':null},
            'memoria_dd':{'visibility':false,'value':null},
            //'swap':{'visibility':false,'value':null},
            //'procesador':{'visibility':false,'value':null},
            //'modelo_procesador':{'visibility':false,'value':null},
            //'frec_procesador':{'visibility':false,'value':null},
            'nucleos':{'visibility':false,'value':null},
            //'usuarios_pactados':{'visibility':false,'value':null},
            //'mac':{'visibility':false,'value':null},
            //'nodo':{'visibility':false,'value':null},
            //'interface':{'visibility':false,'value':null},
            'lvm_raiz':{'visibility':false,'value':null},
            'lvm_usr':{'visibility':false,'value':null},
            'lvm_tmp':{'visibility':false,'value':null},
            'lvm_var':{'visibility':false,'value':null},
            'lvm_home':{'visibility':false,'value':null},
            'agente_instana_instalado':{'visibility':false,'value':null},
            //'id_datacentro':{'visibility':false,'value':null},
            'nom_datacentro':{'visibility':true,'value':null},
            //'id_servicio':{'visibility':false,'value':null},
            'nom_servicio':{'visibility':false,'value':null},
            //'id_sistema_operativo':{'visibility':false,'value':null},
            'nom_sistema_operativo':{'visibility':false,'value':null},
            //'id_estado':{'visibility':false,'value':null},
            'nom_estado':{'visibility':false,'value':null},
            //'id_ambiente':{'visibility':false,'value':null},
            'nom_ambiente':{'visibility':false,'value':null},
            //'id_cluster':{'visibility':false,'value':null},
            'nom_cluster':{'visibility':false,'value':null},
            'nom_vlan':{'visibility':false,'value':null},
            'nom_tipo_servidor':{'visibility':false,'value':null},
            'nom_tipo_respaldo_disco':{'visibility':false,'value':null},

            //'id_usuario_registra':{'visibility':false,'value':null},
            //'id_usuario_modifica':{'visibility':false,'value':null},
            'created_at':{'visibility':false,'value':null},
            'updated_at':{'visibility':false,'value':null},
            'deleted_at':{'visibility':false,'value':null},
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
         // lista_objs_model
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
         this.aplicaciones = response.body.aplicaciones || null;
         this.sistemas_operativos = response.body.sistemas_operativos || null;
         this.tipos_sistemas_operativos = response.body.tipos_sistemas_operativos || null;
         this.estados = response.body.estados || null;
         this.ambientes = response.body.ambientes || null;
         this.clusters = response.body.clusters || null;
         this.dominios = response.body.dominios || null;
         this.vlans = response.body.vlans || null;
         this.tipos_servidores = response.body.tipos_servidores || null;
         this.tipos_aplicaciones = response.body.tipos_aplicaciones || null;
         this.tipos_respaldos_discos = response.body.tipos_respaldos_discos || null;

         /* Datos de la sesion actual del usuario */
         this.usuario_auth = response.body.usuario_auth || null;

      },

      guardar_aplicacion: function () {
         //Ejecuta validacion sobre los campos con validaciones
         this.$validator.validateAll({
            nom_aplicacion:this.aplicacion.nom_aplicacion,
            url_web:this.aplicacion.url_web,
            id_dominio:this.aplicacion.id_dominio,
            ip:this.aplicacion.ip,
            ssl_tls:this.aplicacion.ssl_tls,
            id_servicio:this.aplicacion.id_servicio,
            id_tipo_aplicacion:this.aplicacion.id_tipo_aplicacion,
            id_servidor:this.aplicacion.id_servidor,
         }).then( res => {
            if (res == true) {
               //Se adjunta el token
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               //Instancia nuevo form data
               var formData = new FormData();
               //Conforma objeto paramétrico para solicitud http
               formData.append(`nom_aplicacion`, this.aplicacion.nom_aplicacion);
               formData.append(`det_aplicacion`, this.aplicacion.det_aplicacion || 'Sin detalles');
               formData.append(`alias`, this.aplicacion.alias || '');
               formData.append(`url_web`, this.aplicacion.url_web);
               formData.append(`id_dominio`, this.aplicacion.id_dominio);
               formData.append(`subdominio`, this.aplicacion.subdominio || '');
               formData.append(`ip`, this.aplicacion.ip);
               formData.append(`ssl_tls`, this.aplicacion.ssl_tls);
               formData.append(`id_servicio`, this.aplicacion.id_servicio);
               formData.append(`id_tipo_aplicacion`, this.aplicacion.id_tipo_aplicacion);
               formData.append(`id_servidor`, this.aplicacion.id_servidor);

               this.$http.post(`/aplicaciones`, formData).then(response => { // success callback

                  //console.log(response.body);

                  if (response.status == 200) {
                     //this.inicializar();
                     this.aplicacion = {
                        'nom_aplicacion':null,
                        'det_aplicacion':null,
                        'alias':null,
                        'url_web':null,
                        'ip':null,
                        'subdominio':null,
                        'ssl_tls':null,

                        'id_dominio':null,
                        'id_servidor':null,
                        'id_servicio':null,
                        'id_tipo_aplicacion':null,
                     };

                     this.servidor.aplicaciones.push(response.body.aplicacion);
                     //this.$validator.clean();
                     //this.errors.clear();

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
         //return;
      },

      guardar_aplicacion_acceso: function () {
         //Ejecuta validacion sobre los campos con validaciones
         this.$validator.validateAll({
            usuario:this.aplicacion_acceso.usuario,
            clave:this.aplicacion_acceso.clave,
            email:this.aplicacion_acceso.email,
            tipo_acceso:this.aplicacion_acceso.tipo_acceso,
            id_aplicacion:this.aplicacion_acceso.id_aplicacion,
            id_servidor:this.aplicacion_acceso.id_servidor,
         }).then( res => {
            if (res == true) {
               //Se adjunta el token
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               //Instancia nuevo form data
               var formData = new FormData();
               //Conforma objeto paramétrico para solicitud http
               formData.append(`usuario`, this.aplicacion_acceso.usuario);
               formData.append(`clave`, this.aplicacion_acceso.clave);
               formData.append(`email`, this.aplicacion_acceso.email);
               formData.append(`tipo_acceso`, this.aplicacion_acceso.tipo_acceso);
               formData.append(`id_aplicacion`, this.aplicacion_acceso.id_aplicacion);
               formData.append(`id_servidor`, this.aplicacion_acceso.id_servidor);

               this.$http.post(`/aplicaciones_accesos`, formData).then(response => { // success callback

                  //console.log(response.body);

                  if (response.status == 200) {
                     //this.inicializar();
                     this.aplicacion_acceso = {
                        'usuario':null,
                        'clave':null,
                        'email':null,
                        'tipo_acceso':null,
                        'id_aplicacion':null,
                        'id_servidor':null,
                     };

                     //this.servidor.aplicaciones.push(response.body.aplicacion);
                     //this.$validator.clean();
                     //this.errors.clear();

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
         //return;
      },

      guardar_servidor_acceso: function () {
         //Ejecuta validacion sobre los campos con validaciones
         this.$validator.validateAll({
            usuario:this.servidor_acceso.usuario,
            clave:this.servidor_acceso.clave,
            tipo_acceso:this.servidor_acceso.tipo_acceso,
            puerto:this.servidor_acceso.puerto,
            id_servidor:this.servidor_acceso.id_servidor,
         }).then( res => {
            if (res == true) {
               //Se adjunta el token
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               //Instancia nuevo form data
               var formData = new FormData();
               //Conforma objeto paramétrico para solicitud http
               formData.append(`usuario`, this.servidor_acceso.usuario);
               formData.append(`clave`, this.servidor_acceso.clave);
               formData.append(`tipo_acceso`, this.servidor_acceso.tipo_acceso);
               formData.append(`puerto`, this.servidor_acceso.puerto);
               formData.append(`id_servidor`, this.servidor_acceso.id_servidor);

               this.$http.post(`/servidores_accesos`, formData).then(response => { // success callback

                  //console.log(response.body);

                  if (response.status == 200) {
                     //this.inicializar();
                     this.servidor_acceso = {
                        'usuario':null,
                        'clave':null,
                        'tipo_acceso':null,
                        'puerto':null,
                        'id_servidor':null,
                     };

                     //this.servidor.aplicaciones.push(response.body.aplicacion);
                     //this.$validator.clean();
                     //this.errors.clear();

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
         //return;
      },

   }
});