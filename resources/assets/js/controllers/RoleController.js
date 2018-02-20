
import VModal from 'vue-js-modal'
Vue.use(VModal);

const RoleController = new Vue({
   el: '#RoleController',
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
         'role':{
            'nom_role':null,
            'det_role':null,
            'id_permiso':null,
         },
      }
   },

   computed: {},
   watch: {},
   components: {

   },
   created(){
      //console.log("RoleController mounted");
      //this.show();
      //Cuando se monta, es decir cuando se crea o se inicializa el componente se debe hacer la consulta
      //para traer todos los roles



   },
   ready: {},
   filters: {},
   methods: {

      mostrar_modal_actualizar_role: function () {
         this.$modal.show('actualizar_role',{
            title: 'Alert!',
            text: 'You are too awesome',
            buttons: [
               {
                  title: 'Deal with it',
                  handler: () => { alert('Woot!') }
               },
               {
                  title: '',       // Button title
                  default: true,    // Will be triggered by default if 'Enter' pressed.
                  handler: () => {} // Button click handler
               },
               {
                  title: 'Close'
               }
            ]
         });
      },

      mostrar_modal_crear_role: function () {
         this.$modal.show('crear_role',{
            title: 'Alert!',
            text: 'You are too awesome',
            buttons: [
               {
                  title: 'Deal with it',
                  handler: () => { alert('Woot!') }
               },
               {
                  title: '',       // Button title
                  default: true,    // Will be triggered by default if 'Enter' pressed.
                  handler: () => {} // Button click handler
               },
               {
                  title: 'Close'
               }
            ]
         });
      },


      hide () {
         this.$modal.hide('hello-world');
      }

   }
});
