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

/*
 //Se habilitara cuando se implemente el vuerouter
import VueProgressBar from 'vue-progressbar';

const options = {
   color: '#bffaf3',
   failedColor: '#874b4b',
   thickness: '5px',
   transition: {
      speed: '0.2s',
      opacity: '0.6s',
      termination: 300
   },
   autoRevert: true,
   location: 'left',
   inverse: false
}

Vue.use(VueProgressBar, options);
*/

import es from 'vee-validate/dist/locale/es';
import VeeValidate, { Validator } from 'vee-validate';

Validator.localize('es', es);
Vue.use(VeeValidate, {locale: 'es'});

//Se extiende el componente para validar un password
Validator.extend('verify_password', {
   getMessage: field => `
   La contraseña debe contener al menos:
   1 letra mayúscula,
   1 letra minúscula,
   1 número
   1 carácter especial (Ej: , . _ & ? etc)
   y que sea mínimo de 8 caracteres
   `,
   validate: value => {
      var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!/@#\$%\^&\*])(?=.{8,100})");
      return strongRegex.test(value);
   }
});

//Se extiende el componente para validar una mac
Validator.extend('mac', {
   getMessage: field => `
      Formato mac incorrecto
   `,
   validate: value => {
      var regexp = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/i;
      return regexp.test(value)
   }
});

//Se importa plugin de Request y Response Http
import VueResource from 'vue-resource';
Vue.use(VueResource);

//Se importa plugin de filtros _ lodash
import { _ , range } from 'lodash';

//Se importa plugin de filtros
import Vue2Filters from 'vue2-filters';
Vue.use(Vue2Filters);

//Se importa plugin de toggle-button
import ToggleButton from 'vue-js-toggle-button';
Vue.use(ToggleButton);

/*
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
Vue.directive('tinymce', {
   bind(el) {
      tinymce.init({
         target: el,
         theme: 'modern'
      })
   }
});
*/
/*
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'

Vue.directive('tinymce', {
   bind(el) {
      tinymce.init({
         target: el, // The element the directive is bound to. See here https://vuejs.org/v2/guide/custom-directive.html#Directive-Hook-Arguments
         theme: 'modern',//../tinymce/skins/lightgray
         //skin_url: '' // point your tinymce skin directory here
         //skin_url: '/css/tinymce/skins/lightgray' // point your tinymce skin directory here
      })
   }
})
*/

/*
import VueTinymce from 'vue-tinymce'
Vue.use(VueTinymce)
*/

//import tinymce from 'vue-tinymce-editor'
//Vue.component('tinymce', tinymce)

//Instancia controller de side menu en main app template
const SideMenuController = new Vue({
   el: '#SideMenuController',
   data(){
      return {
         '$':window.jQuery,
         'pk_tabla': 'id_menu',
         'nombre_tabla':'menus', //nombre tabla o de ruta
         'nombre_ruta':'menus', //nombre tabla o de ruta
         'nombre_model':'menu',
         'nombre_model_limpio': 'menu_limpio',
         'nombre_detalle':'Menu',
         'nombre_controller':'MenuController',
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
               'title':'Servidores',
               'url':'/servidores',
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
            {
               'title':'Bitácoras',
               'url':'/usuarios_bitacora_servicios',
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
               'title':'Clusters',
               'url':'/clusters',
            },
            {
               'title':'Estados',
               'url':'/estados',
            },
            {
               'title':'Actividades',
               'url':'/actividades',
            },
            {
               'title':'Servicios',
               'url':'/servicios',
            },
            {
               'title':'Menus',
               'url':'/menus',
            },
            {
               'title':'Mantenedores',
               'url':'/mantenedores',
            },
            {
               'title':'Tipos Aplicaciones',
               'url':'/tipos_aplicaciones',
            },
            {
               'title':'Aplicaciones',
               'url':'/aplicaciones',
            },
            {
               'title':'Accesos Aplicaciones',
               'url':'/aplicaciones_accesos',
            },
            {
               'title':'Dominios',
               'url':'/dominios',
            },
            {
               'title':'Servidores',
               'url':'/servidores',
            },
            {
               'title':'Accesos Servidores',
               'url':'/servidores_accesos',
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
               'title':'Sistemas Operativos',
               'url':'/sistemas_operativos',
            },
            /*
            {
               'title':'Credenciales',
               'url':'/credenciales',
            },
            */
         ],
      }
   },

   computed: {},
   watch: {},
   components: {},
   created(){
      //this.inicializar();
   },
   ready: {},
   filters: {},
   methods: {
      /*
      inicializar: function () {

         this.$http.get(`/${this.nombre_ruta}`).then(response => { // success callback
            this.configurar_relaciones(response.body.sistemas_operativos, this.relaciones_clase);

            this.usuario_auth = response.body.usuario_auth || null;
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });

      },
      */
   }
});

//Vue.component('front-component', require('../components/FrontComponent.vue'));