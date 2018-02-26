require('../bootstrap');
window.Vue = require('vue');

// Se configura la localizacion de la traduccion de los errores
//Validator.localize('es', es);
// Se instala el plugin importado
//Vue.use(VeeValidate, {locale: 'es'});

// Se importa la libreria de notificaciones
//import Notifications from 'vue-notification';
// Se instala el plugin importado
//Vue.use(Notifications);

//Libreria para validacion de rut
// import { validate, clean, format } from 'rut.js';

//Libreria para trabajo con fechas
// import moment from 'moment-es6';

//Se importa plugin de filtros _ lodash
//import { _ , range } from 'lodash';

//import Popover  from 'vue-js-popover';
//Vue.use(Popover);

//import VPopover from 'vue-js-popover';
//Vue.use(VPopover, { tooltip: true });

// Se importa la libreria de notificaciones
import Notifications from 'vue-notification';
// Se instala el plugin importado
Vue.use(Notifications);


import es from 'vee-validate/dist/locale/es';
import VeeValidate, { Validator } from 'vee-validate';

Validator.localize('es', es);
Vue.use(VeeValidate, {locale: 'es'});

//Se importa plugin de Request y Response Http
import VueResource from 'vue-resource';
Vue.use(VueResource);

//Se importa plugin de filtros _ lodash
import { _ , range } from 'lodash';

//Se importa plugin de filtros
import Vue2Filters from 'vue2-filters';
Vue.use(Vue2Filters);


//Instancia controller de side menu en main app template
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