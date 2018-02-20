
import VModal from 'vue-js-modal'
Vue.use(VModal);
import swal from 'sweetalert2'

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

const PermisoController = new Vue({
   el: '#PermisoController',
   data(){
      return {
         'filtro_head':null,
         'table':[
            {
               'value1':'valuea1',
               'value2':'valuea2',
               'value3':'valuea3',
               'value4':'valuea4',
               'value5':'valuea5',
            },
            {
               'value1':'valueb1',
               'value2':'valueb2',
               'value3':'valueb3',
               'value4':'valueb4',
               'value5':'valueb5',
            },
            {
               'value1':'valuec1',
               'value2':'valuec2',
               'value3':'valuec3',
               'value4':'valuec4',
               'value5':'valuec5',
            },
            {
               'value1':'valued1',
               'value2':'valued2',
               'value3':'valued3',
               'value4':'valued4',
               'value5':'valued5',
            },
            {
               'value1':'valuee1',
               'value2':'valuee2',
               'value3':'valuee3',
               'value4':'valuee4',
               'value5':'valuee5',
            },
            {
               'value1':'valuef1',
               'value2':'valuef2',
               'value3':'valuef3',
               'value4':'valuef4',
               'value5':'valuef5',
            },
         ],
         'permiso':{
            'nom_permiso':null,
            'det_permiso':null,
            'cod_permiso':null,
         },
         'permiso_limpio':{
            'nom_permiso':null,
            'det_permiso':null,
            'cod_permiso':null,
         },
         'permisos':[],
      }
   },
   computed: {},
   watch: {},
   components: {},
   created(){
      this.inicializar();
   },
   ready: {},
   filters: {},
   mixins: [ inyeccion_funciones_compartidas ],
   methods: {
      inicializar: function () {
         this.$http.get('/permisos').then(response => { // success callback
            this.permisos = response.body.permisos || null;
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },



      guardar: function () {
         var self = this;
         this.$validator.validateAll().then(resultado => {

            if (resultado === true) {
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               var formData = new  FormData();
               formData.append('nom_permiso', self.permiso.nom_permiso);
               formData.append('det_permiso', self.permiso.det_permiso);
               formData.append('cod_permiso', self.permiso.cod_permiso);

               this.$http.post('/permisos', formData).then(response => { // success callback

                  if (response.status == 200) {
                     self.permiso = response.data.permiso;
                     self.permisos.push(self.permiso);
                     self.permiso = null;
                     self.permiso = self.permiso_limpio;;

                     self.ocultar_modal('crear');
                  } else {
                     self.checkear_estado_respuesta_http(response.status);
                  }

               }, response => { // error callback
                  self.checkear_estado_respuesta_http(response.status);
               });

            }


         });
      }


   }
});
