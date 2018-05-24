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
         'pk_tabla': 'id_home',
         'nombre_tabla':'home', //nombre tabla o de ruta
         'nombre_ruta':'home', //nombre tabla o de ruta
         'nombre_model':'home',
         'nombre_model_limpio': 'home_limpio',
         'nombre_detalle':'Home',
         'nombre_controller':'HomeController',

         'filtro_head':null,

         'home_items':[],
         'mantenedores':[],

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
      this.inicializar();
   },
   ready: {},
   filters: {},
   mixins: [ inyeccion_funciones_compartidas ],
   methods: {
      inicializar: function () {
         this.$http.get('/ajax/menus').then(response => { // success callback

            this.lista_objs_model = response.body.menus.data || null;
            this.home_items = response.body.menus.data || null;
            this.mantenedores = response.body.mantenedores || null;

            this.usuario_auth = response.body.usuario_auth || null;
            //this.limpiar_objeto_clase_local();
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },
      cambiar_orden_lista: function (columna, nom_lista_objetos) {
         this.$data[`orden_lista_${nom_lista_objetos}`] == 'asc' ?
            this.$data[`orden_lista_${nom_lista_objetos}`] = 'desc' :
            this.$data[`orden_lista_${nom_lista_objetos}`] = 'asc';

         this.$data[`${nom_lista_objetos}`] = _.orderBy(this.$data[`${nom_lista_objetos}`], columna, this.$data[`orden_lista_${nom_lista_objetos}`]);
      },

   }
});