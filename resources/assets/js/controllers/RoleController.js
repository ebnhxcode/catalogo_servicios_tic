
import swal from 'sweetalert2';

//Se importan todas las librerias compartidas y se cargan en el objeto instanciado como alias -> hp
import { inyeccion_funciones_compartidas } from './libs/HelperPackage';

import VModal from 'vue-js-modal';
Vue.use(VModal, {dialog: true});

import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

//Se importa plugin de filtros _ lodash
//import { _ , range } from 'lodash';

//import Popover  from 'vue-js-popover';
//Vue.use(Popover);

//import VPopover from 'vue-js-popover';
//Vue.use(VPopover, { tooltip: true });

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
         'dejar_de_editar_contador': 0,

         'orden_lista':'asc',

         'tabla_roles_campos': {
            'id_role':false,
            'nom_role':true,
            'det_role':false,
            'id_permiso':false,
            'id_usuario_registra':false,
            'id_usuario_modifica':false,
            'created_at':true,
            'updated_at':false
         },

         'tabla_roles_labels': {
            'id_role':'Id role',
            'nom_role':'Nombre del role',
            'det_role':'Detalle del role',
            'id_permiso':'Permiso del role',
            'id_usuario_registra':'Usuario registra',
            'id_usuario_modifica':'Usuario Modifica',
            'created_at':'Creado en',
            'updated_at':'Actualizado en'
         },

         'excel_json_campos': {
            'id_role': 'String',
            'nom_role': 'String',
            'det_role': 'String',
            'id_permiso': 'String',
            'id_usuario_registra': 'String',
            'id_usuario_modifica': 'String',
            'created_at': 'String',
            'updated_at': 'String'
         },

         'excel_json_datos': [],
         'excel_data_contador': 0,

         'append_to_json_excel': {},

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
         } else {
            this.role = this.buscar_en_array_por_modelo_e_id(id_en_edicion,this.roles,'role');
         }
      },
      //Roles se mantiene en el watcher para actualizar la lista de lo que se esta trabajando y/o filtrando en grid
      roles: function (roles) {
         var self = this;
         this.excel_json_datos = [];
         return roles.map(function (role, index) {
            return self.excel_json_datos.push({
               'id_role': role.id_role || '-',
               'nom_role': role.nom_role || '-',
               'det_role': role.det_role || '-',
               'id_permiso': role.id_permiso || '-',
               'id_usuario_registra': role.id_usuario_registra || '-',
               'id_usuario_modifica': role.id_usuario_modifica || '-',
               'created_at': role.created_at || '-',
               'updated_at': role.updated_at || '-'
            });
         });
      },
   },
   components: {
      'download-excel': {
         props: {
            'data': {
               type: Array,
               required: true
            },
            'fields': {
               type: Object,
               required: true
            },
            'name': {
               type: String,
               default: "data.xls"
            },
         },
         template: `
            <a
               href="#"
               :id="id_name"
               @click="generate_excel">
               <slot>
                  Download Excel
               </slot>
            </a>
         `,
         name: 'download-excel',
         data: function () {
            return {
               animate: true,
               animation: '',
            }
         },
         created: function () {
         },
         computed: {
            id_name: function () {
               var now = new Date().getTime();
               return 'export_' + now;
            }
         },
         methods: {
            emitXmlHeader: function () {
               var headerRow = '<ss:Row>\n';
               for (var colName in this.fields) {
                  headerRow += '  <ss:Cell>\n';
                  headerRow += '    <ss:Data ss:Type="String">';
                  headerRow += colName + '</ss:Data>\n';
                  headerRow += '  </ss:Cell>\n';
               }
               headerRow += '</ss:Row>\n';
               return '<?xml version="1.0"?>\n' +
                  '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n' +
                  '<ss:Worksheet ss:Name="Sheet1">\n' +
                  '<ss:Table>\n\n' + headerRow;
            },

            emitXmlFooter: function () {
               return '\n</ss:Table>\n' +
                  '</ss:Worksheet>\n' +
                  '</ss:Workbook>\n';
            },

            jsonToSsXml: function (jsonObject) {
               var row;
               var col;
               var xml;
               //console.log(jsonObject);
               var data = typeof jsonObject != "object"
                  ? JSON.parse(jsonObject)
                  : jsonObject;

               xml = this.emitXmlHeader();

               for (row = 0; row < data.length; row++) {
                  xml += '<ss:Row>\n';

                  for (col in data[row]) {
                     xml += '  <ss:Cell>\n';
                     xml += '    <ss:Data ss:Type="' + this.fields[col] + '">';
                     xml += String(data[row][col]).replace(/[^a-zA-Z0-9\s\-ñíéáóú\#\,\.\;\:ÑÍÉÓÁÚ@_]/g, '') + '</ss:Data>\n';
                     xml += '  </ss:Cell>\n';
                  }

                  xml += '</ss:Row>\n';
               }

               xml += this.emitXmlFooter();
               return xml;
            },
            generate_excel: function (content, filename, contentType) {
               var blob = new Blob([this.jsonToSsXml(this.data)], {
                  'type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
               });

               var a = document.getElementById(this.id_name);
               a.href = window.URL.createObjectURL(blob);
               a.download = this.name;
            }
         }
      },
   },
   created(){
      this.inicializar();

      $(document).ready(function(){
         $('[data-toggle="tooltip"]').tooltip();
      });

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

      cambiar_visibilidad: function (campo) {
         return this.tabla_roles_campos[campo] = !this.tabla_roles_campos[campo];
      },

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

      // change order variable direction
      cambiar_orden_lista: function (columna) {
         this.orden_lista == 'asc' ? this.orden_lista = 'desc' : this.orden_lista = 'asc';
         this.ordenar_lista(columna);
      },

      // function to order lists
      ordenar_lista: function (columna) { this.roles = _.orderBy(this.roles, columna, this.orden_lista); },


      guardar_editado: function () {

         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

         this.$http.put(`/roles/${this.role.id_role}`, this.role).then(response => { // success callback

            if (response.status == 200) {
               if ( !this.es_null(response.body.role) ) {
                  this.lista_actualizar_activo = false;
                  this.id_en_edicion = null;
               }
            } else {
               this.checkear_estado_respuesta_http(response.status);
               return false;
            }

            if ( this.mostrar_notificaciones(response) == true ) {

               //Aqui que pregunte si el modal está activo para que lo cierre
               if (this.modal_actualizar_activo == true) {
                  this.ocultar_modal('actualizar');
                  this.modal_actualizar_activo = false;
               }

               this.lista_actualizar_activo = false;
               this.id_en_edicion = null;

               this.role = {
                  'nom_role':null,
                  'det_role':null,
                  'id_permiso':null,
               };

               //Recargar la lista
               this.inicializar();

            } else {
               this.dejar_de_editar_contador ++;
            }

         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });

         return;
      },

      dejar_de_editar: function () {
         this.lista_actualizar_activo = false;
         this.id_en_edicion = null;
         this.dejar_de_editar_contador = 0;
      },

      eliminar: function () {
         //Agregar el confirm



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
               this.inicializar();
            } else {
               this.checkear_estado_respuesta_http(response.status);
               return false;
            }

            if ( this.mostrar_notificaciones(response) == true ) {
               this.ocultar_modal('crear');
               this.role = null;
               this.role = {
                  'nom_role':null,
                  'det_role':null,
                  'id_permiso':null
               };
               return ;
            }

         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });

         return;
      },



   }
});