
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

         //Estas var se deben conservar para todos los controllers por que se ejecutan para el modal crear (blanquea)
         'lista_actualizar_activo':false,
         'id_en_edicion': null,

      }
   },
   computed: {},
   watch: {
      //Lo que hace este watcher o funcion de seguimiento es que cuando id en edicion es null se blanquea el role
      // o el objeto al que se le está haciendo seguimiento y permite que no choque con el que se está creando
      id_en_edicion: function (id_en_edicion) {
         if (id_en_edicion == null) {
            this.role = {
               'nom_role':null,
               'det_role':null,
               'id_permiso':null,
            };
         }
      }
   },
   components: {},
   created(){
      this.inicializar();

      /*
      $(document).ready(function () {
         //Handle al recargar pagina
         window.onbeforeunload = function(e){
            return "Estás seguro que deseas cerrar la ventana?";
         };
         window.onunload = function(e){
            return "Cierre de la ventana";
         };

      });
      */

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


      guardar_editado: function () {

         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

         this.$http.put(`/roles/${this.role.id_role}`, this.role).then(response => { // success callback

            if (response.status == 200) {
               if ( !this.es_null(response.data.role) ) {
                  this.lista_actualizar_activo = false;
                  this.id_en_edicion = null;
               }
            } else {
               this.checkear_estado_respuesta_http(response.status);
               return false;
            }

            if ( this.mostrar_notificaciones(response) == true ) {
               //Aqui que pregunte si el modal está activo para que lo cierre
               //this.ocultar_modal('actualizar');
               
               this.role = {
                  'nom_role':null,
                  'det_role':null,
                  'id_permiso':null,
               };
            }

         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });

         return;
      },

      guardar: function () {

         //Ejecuta validacion sobre los campos con validaciones
         if (this.validar_campos() == false) {
            return;
         }

         //Se adjunta el token
         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
         //Instancia nuevo form data
         var formData = new  FormData();
         //Conforma objeto paramétrico para solicitud http
         formData.append('nom_role', this.role.nom_role || null );
         formData.append('det_role', this.role.det_role || null );
         formData.append('id_permiso',this.role.id_permiso || null );


         this.$http.post('/roles', formData).then(response => { // success callback

            if ( response.status == 200) {
               if ( !this.es_null(response.data.role) ) {
                  this.role = response.data.role;
                  this.roles.push(this.role);
               }
            } else {
               this.checkear_estado_respuesta_http(response.status);
               return false;
            }

            if ( this.mostrar_notificaciones(response) == true ) {
               this.ocultar_modal('crear');
               this.role = {
                  'nom_role':null,
                  'det_role':null,
                  'id_permiso':null,
               };
            }

         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
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