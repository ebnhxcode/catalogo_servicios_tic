//require('../bootstrap');

//window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//Vue.component('front-component', require('../components/FrontComponent.vue'));

import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

const HomeController = new Vue({
   el: '#HomeController',
   data(){
      return {
         '$':window.jQuery,
         'nombre_tabla':'home', //nombre tabla o de ruta
         'nombre_ruta':'home', //nombre tabla o de ruta
         'nombre_model':'home',
         'nombre_detalle':'Home',
         'nombre_controller':'HomeController',

         'filtro_head':null,

         'home_items':[
            {
               'title':'Dashboard',
               'detail':'Menú para acceder a los servicios del catálogo',
               'url':'/dashboard',
               'route':'home',
               'class_obj':'home',
               'image':'/img/logo.png',
            },
            {
               'title':'Servicios',
               'detail':'Módulo de servicios, permite conocer servidores y aplicaciones.',
               'url':'/servicios',
               'route':'servicios',
               'class_obj':'servicio',
               'image':'/img/servicio.jpg',
            },
            {
               'title':'Servidores',
               'detail':'Módulo de servidores, permite conocer información respecto al servidor y aplicaciones desplegadas.',
               'url':'/servidores',
               'route':'servidores',
               'class_obj':'servidor',
               'image':'/img/source.gif',
            },
            {
               'title':'Aplicaciones',
               'detail':'Módulo de aplicaciones, permite conocer detalles de la aplicación y su ubicación.',
               'url':'/aplicaciones',
               'route':'aplicaciones',
               'class_obj':'aplicacion',
               'image':'/img/aplicación-web-y-de-escritorio-01.jpg',
            },
            {
               'title':'Actividades',
               'detail':'Módulo de actividades, permite conocer la amplia variedad de servicios y trabajos otorgados por tic.',
               'url':'/actividades',
               'route':'actividades',
               'class_obj':'actividad',
               'image':'/img/shutterstock.jpg',
            },
            {
               'title':'Catálogos',
               'detail':'Módulo de catálogos, permite conocer a nivel macro de origen a fin el desarrollo de un proyecto y sus contenidos.',
               'url':'/catalogos',
               'route':'catalogos',
               'class_obj':'catalogo',
            },
            {
               'title':'Bitácoras',
               'detail':'Módulo de bitácoras, permite al usuario generar bitacoras sobre los servicios trabajados.',
               'url':'/usuarios_bitacora_servicios',
               'route':'usuarios_bitacora_servicios',
               'class_obj':'usuario_bitacora_servicio',
               'image':'/img/bitacora.png',
            },
         ],

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


         'excel_json_datos': [],
         'excel_data_contador': 0,

         'append_to_json_excel': {},

      }
   },
   computed: {},
   watch: {

   },
   components: {
      //'download-excel': DownloadExcel,
   },
   created(){
      //this.inicializar();

      $(document).ready(function(){
         $('[data-toggle="tooltip"]').tooltip();
      });

   },
   ready: {},
   filters: {},
   mixins: [ inyeccion_funciones_compartidas ],
   methods: {



      inicializar: function () {
         this.$http.get('/').then(response => { // success callback

            this.usuario_auth = response.body.usuario_auth || null;
            //this.limpiar_objeto_clase_local();
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },


      ordenar_lista: function (columna) { this.home_items = _.orderBy(this.home_items, columna, this.orden_lista); },

   }
});