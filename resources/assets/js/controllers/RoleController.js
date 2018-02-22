import swal from 'sweetalert2'

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal'
Vue.use(VModal, {dialog: true});

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
         'role_limpio':{
            'nom_role':null,
            'det_role':null,
            'id_permiso':null,
         },
         'roles':[],
         'permisos':[],
         'campos_formularios':[],
         'errores_campos':[],

         //Variables para validar si se está creando o editando
         'modal_crear_activo': false,
         'modal_actualizar_activo': false,
         'lista_actualizar_activo':false,


         'id_en_edicion': null,
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
         this.$http.get('/roles').then(response => { // success callback
            this.roles = response.body.roles || null;
            this.permisos = response.body.permisos || null;
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },


      editar: function (id_role) {
         this.lista_actualizar_activo = true;
         this.id_en_edicion = id_role;

         //id_objeto + array de objetos + nombre del model en lower case
         this.role = null;
         this.role = this.buscar_en_array_por_modelo_e_id(id_role,this.roles,'role');

      },


      notificar: function (tipo, titulo, mensajes) {
         for (let m in mensajes) {
            let mensaje = mensajes[m][0];
            this.$notify({
               group: 'global',
               type: tipo,
               title: titulo,
               text: mensaje
            });
         }
      },



      checkear_notificaciones: function (respuesta_http) {

         var status = respuesta_http.status || null;
         var tipo = respuesta_http.data.tipo || null;
         var mensajes = respuesta_http.data.mensajes || null;

         switch (status) {

            case 200:
               switch (tipo) {
                  case 'errores_campos_requeridos':
                     // Tipo de notificacion , Titulo de los mensajes , Mensajes
                     this.notificar('warn', 'Advertencia campo requerido', mensajes);
                     break;
               }
               break;


            default:
               break;
         }
         return true;

      },



      //checkear_respuesta_servidor: function (respuesta_http) {},



      guardar_editado: function () {
         var self = this;
         //this.$validator.validateAll().then(resultado => {

         //if (resultado === true) {
         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();


         this.$http.put(`/roles/${self.role.id_role}`, self.role).then(response => { // success callback
            //console.log(response);
            if (response.status == 200) {

               self.role = this.buscar_en_array_por_modelo_e_id(self.role.id_role,self.roles,'role');
               self.role = null;
               self.role = response.data.role;

               this.lista_actualizar_activo = false;
               this.id_en_edicion = null;

            } else {
               self.checkear_estado_respuesta_http(response.status);
            }

         }, response => { // error callback
            self.checkear_estado_respuesta_http(response.status);
         });

            //}
         //});
         return;
      },

      guardar: function () {
         //Sub instancia de contexto
         var self = this;
         //Ejecuta validacion sobre los campos con validaciones
         this.$validator.validateAll().then(resultado => {
            //Usa variable que recibe como parametro con el estado en boolean
            if (resultado === true) {
               //Se adjunta el token
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               //Instancia nuevo form data
               var formData = new  FormData();
               //Conforma objeto paramétrico para solicitud http
               formData.append('nom_role', (self.role.nom_role != null) ? self.role.nom_role:'' );
               formData.append('det_role', (self.role.det_role != null) ? self.role.det_role:'' );
               formData.append('id_permiso', (self.role.id_permiso != null) ? self.role.id_permiso:'' );

               this.$http.post('/roles', formData).then(response => { // success callback

                  self.checkear_notificaciones(response);



                  return console.log(response);

                  return 0;


                  if (response.status == 200) {



                     self.role = response.data.role;
                     self.roles.push(self.role);
                     self.role = null;
                     self.role = self.role_limpio;

                     self.ocultar_modal('crear');
                  } else {
                     self.checkear_estado_respuesta_http(response.status);
                  }

               }, response => { // error callback
                  self.checkear_estado_respuesta_http(response.status);
               });

            }
         });
         return;
      },



   }
});


/*
 this.$notify({
 group: 'foo',
 type: 'warn',
 title: 'Important message',
 text: 'Hello user! This is a warning notification!'
 });

 this.$notify({
 group: 'foo',
 type: 'primary', // En blanco tambien lo toma como primary
 title: 'Important message',
 text: 'Hello user! This is a primary notification!'
 });

 this.$notify({
 group: 'foo',
 type: 'success',
 title: 'Important message',
 text: 'Hello user! This is a success notification!'
 });

 this.$notify({
 group: 'foo',
 type: 'info', // Falta instalar en el js
 title: 'Important message',
 text: 'Hello user! This is a info notification!'
 });

 this.$notify({
 group: 'foo',
 type: 'error',
 title: 'Important message',
 text: 'Hello user! This is a default notification!'
 });

 this.$notify({
 group: 'foo',
 type: 'default', // Falta instalar en el js
 title: 'Important message',
 text: 'Hello user! This is a default notification!'
 });

*/