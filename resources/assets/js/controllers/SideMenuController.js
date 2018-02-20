require('../bootstrap');
window.Vue = require('vue');

import VueResource from 'vue-resource';
Vue.use(VueResource);

import { _ , range } from 'lodash';

import Vue2Filters from 'vue2-filters';
Vue.use(Vue2Filters);

//import es from 'vee-validate/dist/locale/es';
//import VeeValidate, { Validator } from 'vee-validate';

// Add locale helper.
//Validator.addLocale(es);

// Install the Plugin and set the locale.
//Vue.use(VeeValidate, {locale: 'es'});

import VModal from 'vue-js-modal'
Vue.use(VModal, {dialog: true});

const SideMenuController = new Vue({
   el: '#SideMenuController',
   data(){
      return {
         'filtro_menu':null,

         'menus':[
            {
               'title':'Dashboard',
               'url':'/dashboard',
            },
            {
               'title':'Servicios',
               'url':'/servicios',
            },
            {
               'title':'Aplicaciones',
               'url':'/aplicaciones',
            },
            {
               'title':'Actividades',
               'url':'/actividades',
            },
            {
               'title':'Catálogos',
               'url':'/catalogos',
            },
         ],

         'mantenedores':[
            {
               'title':'Roles',
               'url':'/roles',
            },
            {
               'title':'Permisos',
               'url':'/permisos',
            },
            {
               'title':'Usuarios',
               'url':'/usuarios',
            },
            {
               'title':'Cargos',
               'url':'/cargos',
            },
            {
               'title':'Servicios',
               'url':'/servicios',
            },
            {
               'title':'Aplicaciones',
               'url':'/aplicaciones',
            },
            {
               'title':'Servidores',
               'url':'/servidores',
            },
            {
               'title':'Tags',
               'url':'/tags',
            },
            {
               'title':'Datacentros',
               'url':'/datacentros',
            },
            {
               'title':'Credenciales',
               'url':'/credenciales',
            },
         ],
      }
   },

   computed: {},
   watch: {},
   components: {
   },
   created(){

   },
   ready: {},
   filters: {},
   methods: {}
});

//Vue.component('front-component', require('../components/FrontComponent.vue'));