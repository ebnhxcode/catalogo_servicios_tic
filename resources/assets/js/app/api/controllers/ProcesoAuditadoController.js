import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
import { _ , range } from 'lodash';
import Vue2Filters from 'vue2-filters';
Vue.use(Vue2Filters);

import es from 'vee-validate/dist/locale/es';
import VeeValidate, { Validator } from 'vee-validate';

// Add locale helper.
Validator.addLocale(es);

// Install the Plugin and set the locale.
Vue.use(VeeValidate, {
   locale: 'es'
});


// Global Controllers Functions = cfg
const gcf = {
   refetchControllersData: (fieldsData, controllersToFetch, controllerNameThatCall) => {
      //1: campos a actualizar
      //2: controladores a actualizar
      //3: controlador que realiza el llamado
      //Por cada campo actualizo el del controller correspondiente

      for (let field in fieldsData) {
         for (let controller in controllersToFetch) {

            switch (controller) {
               case 'HallazgoController':

                  if (field == 'proceso_auditado') HallazgoController.proceso_auditado = fieldsData[field];
                  if (field == 'area_proceso_auditado') HallazgoController.area_proceso_auditado = fieldsData[field];

                  if (field == 'hallazgos') HallazgoController.hallazgos = fieldsData[field];
                  if (field == 'hallazgosTmp') HallazgoController.hallazgosTmp = fieldsData[field];

                  if (field == 'compromisos') HallazgoController.compromisos = fieldsData[field];
                  if (field == 'compromisosTmp') HallazgoController.compromisosTmp = fieldsData[field];

                  if (field == 'compromisos_responsables') HallazgoController.compromisos_responsables = fieldsData[field];
                  if (field == 'compromisos_responsablesTmp') HallazgoController.compromisos_responsablesTmp = fieldsData[field];

                  if (field == 'seguimientos') HallazgoController.seguimientos = fieldsData[field];
                  if (field == 'seguimientosTmp') HallazgoController.seguimientosTmp = fieldsData[field];

                  if (field == 'archivos') HallazgoController.archivos = fieldsData[field];
                  if (field == 'archivosTmp') HallazgoController.archivosTmp = fieldsData[field];

                  if (field == 'usuarios') HallazgoController.usuarios = fieldsData[field];
                  if (field == 'config') HallazgoController.config = fieldsData[field];
                  if (field == 'auth') HallazgoController.auth = fieldsData[field];
                  if (field == 'role') HallazgoController.role = fieldsData[field];
                  if (field == 'auditor') HallazgoController.auditor = fieldsData[field];

                  break;
               case 'CompromisoController':

                  if (field == 'proceso_auditado') CompromisoController.proceso_auditado = fieldsData[field];
                  if (field == 'area_proceso_auditado') CompromisoController.area_proceso_auditado = fieldsData[field];

                  if (field == 'hallazgos') CompromisoController.hallazgos = fieldsData[field];
                  if (field == 'hallazgosTmp') CompromisoController.hallazgosTmp = fieldsData[field];

                  if (field == 'compromisos') CompromisoController.compromisos = fieldsData[field];
                  if (field == 'compromisosTmp') CompromisoController.compromisosTmp = fieldsData[field];

                  if (field == 'compromisos_responsables') CompromisoController.compromisos_responsables = fieldsData[field];
                  if (field == 'compromisos_responsablesTmp') CompromisoController.compromisos_responsablesTmp = fieldsData[field];

                  if (field == 'seguimientos') CompromisoController.seguimientos = fieldsData[field];
                  if (field == 'seguimientosTmp') CompromisoController.seguimientosTmp = fieldsData[field];

                  if (field == 'archivos') CompromisoController.archivos = fieldsData[field];
                  if (field == 'archivosTmp') CompromisoController.archivosTmp = fieldsData[field];

                  if (field == 'usuarios') CompromisoController.usuarios = fieldsData[field];
                  if (field == 'config') CompromisoController.config = fieldsData[field];
                  if (field == 'auth') CompromisoController.auth = fieldsData[field];
                  if (field == 'role') CompromisoController.role = fieldsData[field];
                  if (field == 'auditor') CompromisoController.auditor = fieldsData[field];

                  break;
               case 'SeguimientoController':

                  if (field == 'proceso_auditado') SeguimientoController.proceso_auditado = fieldsData[field];
                  if (field == 'area_proceso_auditado') SeguimientoController.area_proceso_auditado = fieldsData[field];

                  if (field == 'hallazgos') SeguimientoController.hallazgos = fieldsData[field];
                  if (field == 'hallazgosTmp') SeguimientoController.hallazgosTmp = fieldsData[field];

                  if (field == 'compromisos') SeguimientoController.compromisos = fieldsData[field];
                  if (field == 'compromisosTmp') SeguimientoController.compromisosTmp = fieldsData[field];

                  if (field == 'compromisos_responsables') SeguimientoController.compromisos_responsables = fieldsData[field];
                  if (field == 'compromisos_responsablesTmp') SeguimientoController.compromisos_responsablesTmp = fieldsData[field];

                  if (field == 'seguimientos') SeguimientoController.seguimientos = fieldsData[field];
                  if (field == 'seguimientosTmp') SeguimientoController.seguimientosTmp = fieldsData[field];

                  if (field == 'archivos') SeguimientoController.archivos = fieldsData[field];
                  if (field == 'archivosTmp') SeguimientoController.archivosTmp = fieldsData[field];

                  if (field == 'usuarios') SeguimientoController.usuarios = fieldsData[field];
                  if (field == 'config') SeguimientoController.config = fieldsData[field];
                  if (field == 'auth') SeguimientoController.auth = fieldsData[field];
                  if (field == 'role') SeguimientoController.role = fieldsData[field];
                  if (field == 'auditor') SeguimientoController.auditor = fieldsData[field];

                  break;
               case 'ArchivoController':

                  if (field == 'proceso_auditado') ArchivoController.proceso_auditado = fieldsData[field];
                  if (field == 'area_proceso_auditado') ArchivoController.area_proceso_auditado = fieldsData[field];

                  if (field == 'hallazgos') ArchivoController.hallazgos = fieldsData[field];
                  if (field == 'hallazgosTmp') ArchivoController.hallazgosTmp = fieldsData[field];

                  if (field == 'compromisos') ArchivoController.compromisos = fieldsData[field];
                  if (field == 'compromisosTmp') ArchivoController.compromisosTmp = fieldsData[field];

                  if (field == 'compromisos_responsables') ArchivoController.compromisos_responsables = fieldsData[field];
                  if (field == 'compromisos_responsablesTmp') ArchivoController.compromisos_responsablesTmp = fieldsData[field];

                  if (field == 'seguimientos') ArchivoController.seguimientos = fieldsData[field];
                  if (field == 'seguimientosTmp') ArchivoController.seguimientosTmp = fieldsData[field];

                  if (field == 'archivos') ArchivoController.archivos = fieldsData[field];
                  if (field == 'archivosTmp') ArchivoController.archivosTmp = fieldsData[field];

                  if (field == 'usuarios') ArchivoController.usuarios = fieldsData[field];
                  if (field == 'config') ArchivoController.config = fieldsData[field];
                  if (field == 'auth') ArchivoController.auth = fieldsData[field];
                  if (field == 'role') ArchivoController.role = fieldsData[field];
                  if (field == 'auditor') ArchivoController.auditor = fieldsData[field];
                  break;
               case 'ResponsableController':

                  if (field == 'proceso_auditado') ResponsableController.proceso_auditado = fieldsData[field];
                  if (field == 'area_proceso_auditado') ResponsableController.area_proceso_auditado = fieldsData[field];

                  if (field == 'hallazgos') ResponsableController.hallazgos = fieldsData[field];
                  if (field == 'hallazgosTmp') ResponsableController.hallazgosTmp = fieldsData[field];

                  if (field == 'compromisos') ResponsableController.compromisos = fieldsData[field];
                  if (field == 'compromisosTmp') ResponsableController.compromisosTmp = fieldsData[field];

                  if (field == 'compromisos_responsables') ResponsableController.compromisos_responsables = fieldsData[field];
                  if (field == 'compromisos_responsablesTmp') ResponsableController.compromisos_responsablesTmp = fieldsData[field];

                  if (field == 'seguimientos') ResponsableController.seguimientos = fieldsData[field];
                  if (field == 'seguimientosTmp') ResponsableController.seguimientosTmp = fieldsData[field];

                  if (field == 'archivos') ResponsableController.archivos = fieldsData[field];
                  if (field == 'archivosTmp') ResponsableController.archivosTmp = fieldsData[field];

                  if (field == 'usuarios') ResponsableController.usuarios = fieldsData[field];
                  if (field == 'config') ResponsableController.config = fieldsData[field];
                  if (field == 'auth') ResponsableController.auth = fieldsData[field];
                  if (field == 'role') ResponsableController.role = fieldsData[field];
                  if (field == 'auditor') ResponsableController.auditor = fieldsData[field];

                  break;

            }

         }//end for
         //eval(controllerName+'.'+field) = fields[field]; //console.log(eval(controllerName+'.'+field));//fields[field]
      }//end for

      return true;
   },

   findById: (items, id) => {
      for (var i in items) {
         if (items[i].id == id) {
            return items[i];
         }
      }
      return null;
   },
   findHallazgoById: (items, id) => {
      for (var i in items) {
         if (items[i].id_hallazgo == id) {
            return items[i];
         }
      }
      return null;
   },
   findCompromisoById: (items, id) => {
      for (var i in items) {
         if (items[i].id_compromiso == id) {
            return items[i];
         }
      }
      return null;
   },
   getIndexCompromisoById: (items, id) => {
      for (var i in items) {
         if (items[i].id_compromiso == id) {
            return i;
         }
      }
      return null;
   },
   findSeguimientoById: (items, id) => {
      for (var i in items) {
         if (items[i].id_seguimiento == id) {
            return items[i];
         }
      }
      return null;
   },
   findTipoProcesoDisciplinarioById: (items, id) => {
      if (items[id] != 'undefined') {
         return items[id];
      }
      return 'Sin tipo disciplinario';
   },
   findEstadoProcesoDisciplinarioById: (items, id) => {
      if (typeof items[id] != 'undefined') {
         return items[id];
      }
      return 'Sin estado disciplinario';
   },
   findResponsableById: (items, id) => {
      for (var i in items) {
         if (items[i].id_compromiso_responsable == id) {
            return items[i];
         }
      }
      return null;
   },
   findArchivoById: (items, id) => {
      for (var i in items) {
         if (items[i].id_medio_verificacion == id) {
            return items[i];
         }
      }
      return null;
   },
   findUsuarioById: (items, id) => {
      for (var i in items) {
         if (items[i].id == id) {
            return items[i];
         }
      }
      return null;
   },
}


const HallazgoController = new Vue({
   el: '#HallazgoController',
   data()   {
      return {
         'area_proceso_auditado': [],
         'proceso_auditado': {},

         'hallazgos': {},
         'hallazgosTmp': {},
         'hallazgo': [],

         'compromisos': {},
         'compromisosTmp': [],
         'compromiso': [],

         'compromisos_responsables': [],
         'compromisos_responsablesTmp': [],

         'porcentajes_cumplimiento': {0: 0, 1: 10, 2: 20, 3: 30, 4: 40, 5: 50, 6: 60, 7: 70, 8: 80, 9: 90, 10: 100},

         'seguimientos': {},
         'seguimientosTmp': {},
         'seguimiento': {},

         'usuarios': [],
         'config': [],
         'auth': [],
         'role': [],
         'auditor': [],

         'nuevo_hallazgo': {
            'id_proceso_auditado': '',
            'nombre_hallazgo': '',
            'recomendacion': '',
            'criticidad': 'Alta',
            'cantidad_hallazgo': 0,
         },

         'nuevo_compromiso': {
            'id_hallazgo': '',
            'nomenclatura': '',
            'plazo_estimado': '',
            'plazo_comprometido': '',
            'nombre_compromiso': '',
            'responsable': '',
            'email_responsable': '',
            'fono_responsable': '',
         },

         'index': 0,
         'ctd_hallazgos': 0,
         'ctd_compromisos': 0,
         'ctd_seguimientos': 0,
         'ctd_req_hallazgos': 0,

         'filterTerm': '',
         'filterIdHallazgo': '',

         'form_hallazgo_editable': 0,
         'form_compromiso_creable': 0,
         'gridOrder': 'asc',

         'mensajeResultadoConFiltros': false,
         'filtroCriticidad': false,
         'filtroEstado': false,
         'showModal': false,
         'showModalNuevoCompromiso': false,
         'showModalNuevoHallazgo': false,
         'permiteGuardarNuevoHallazgo': true,
         'permiteGuardarNuevoCompromiso': true,

         'hallazgosFiltroCriticidad': {},
         'hallazgosFiltroEstado': {},
         'hallazgosFiltroIdHallazgo': {},

         'excel_json_fields': {
            'id': 'String',
            'hallazgo': 'String',
            'recomendacion': 'String',
            'criticidad': 'String',
            'compromisos': 'String',
            'porcentaje_avance': 'String',
            'estado': 'String',
         },
         excel_json_data: [],
         excel_data_count: '',
         append_to_json_excel: {},

         _gcf: gcf,
      }
   },
   computed: {},
   watch: {
      hallazgos: function (hallazgos) {
         var self = this;
         this.excel_json_data = [];
         return hallazgos.map(function (h, index) {

            if (h.compromiso.length > 0) {
               h.porcentaje_avance = h.compromiso[0].seguimiento[h.compromiso[0].seguimiento.length - 1].porcentaje_avance || 0;
               h.estado = h.compromiso[0].seguimiento[h.compromiso[0].seguimiento.length - 1].estado;
            } else {
               h.porcentaje_avance = 0;
               h.estado = 'Suscripcion';
            }


            return self.excel_json_data.push({
               'id': h.id_hallazgo,
               'hallazgo': h.nombre_hallazgo,
               'recomendacion': h.recomendacion,
               'criticidad': h.criticidad,
               'compromisos': h.compromiso.length,
               'porcentaje_avance': h.porcentaje_avance,
               'estado': h.estado,
            });
         });
      },
      showModalNuevoHallazgo: function (showModalNuevoHallazgo) {
         if (showModalNuevoHallazgo == true) {
            this.permiteGuardarNuevoHallazgo = true;
         }
      },
   },
   components: {
      'download-excel': {
         props: {
            'data': {
               type: Array,
               required: true
            },
            'excel_json_fields': {
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
               for (var colName in this.excel_json_fields) {
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
                     xml += '    <ss:Data ss:Type="' + this.excel_json_fields[col] + '">';
                     xml += String(data[row][col]).replace(/[^a-zA-Z0-9\s\-ñíéáóú\#\,\.\;\:ÑÍÉÓÁÚ]/g, '') + '</ss:Data>\n';
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
      'mini-spinner': {
         props: [''],
         'name': 'mini-spinner',
         'template': `
         <div class="loader-mini text-center">Cargando tabla, espere por favor...</div>
      `,
         data () {
            return {
               visible: false,
            }
         },
         ready () {
         },
         created(){
         },
         filters: {},
         methods: {},
      },
      'modal': {
         props: ['hallazgo'],
         template: `
			   <!-- template for the modal component -->
			   <transition name="modal">
				   <div class="modal-mask">
					   <div class="modal-wrapper">
   					   <div class="modal-container">

						      <div class="modal-header">
							      <slot name="header"></slot>
						      </div>

						      <div class="modal-body">
							      <slot name="body">
                              <dl class="dl-vertical">
                                 <div class="row">
                                    <div style="overflow-y: scroll;max-height: 400px;">
                                       <div class="col-md-6">
                                          <dt>Id del Hallazgo</dt>
                                          <dd class="well well-sm">{{hallazgo.id_hallazgo || '0'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Porcentaje de Avance</dt>
                                          <dd class="well well-sm">{{calcularAvanceHallazgo(hallazgo) || '0'}}%</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Nombre</dt>
                                          <dd class="well well-sm">{{hallazgo.nombre_hallazgo || 'Sin datos'}}</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Recomendacion</dt>
                                          <dd class="well well-sm">{{hallazgo.recomendacion || 'Sin datos'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Criticidad</dt>
                                          <dd class="well well-sm">{{hallazgo.criticidad || 'Sin datos'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Estado</dt>
                                          <dd class="well well-sm">{{calcularEstadoHallazgo(hallazgo) || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Compromisos</dt>
                                          <dd class="well well-sm">{{hallazgo.ctd_compromiso || '0'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Seguimientos</dt>
                                          <dd class="well well-sm">{{hallazgo.ctd_seguimiento || '0'}}</dd>
                                       </div>
                                    </div><!-- styled -->
                                 </div><!-- .row -->
                              </dl>
							      </slot>
						      </div>

						      <!--
						      <div class="modal-footer">
							      <slot name="footer">
							         <button class="btn btn-sm btn-success" @click="$emit('close')">
								         Aceptar
							         </button>
							      </slot>
						      </div>
						      -->
					      </div>
					   </div>
				   </div>
			   </transition>
			`,
         name: 'modal',
         data () {
            return {}
         },
         ready () {
         },
         created () {
         },
         methods: {
            calcularEstadoHallazgo: function (hallazgo) {
               var cantidad_compromisos_1_y_99 = 0; //para contar cantidad de compromisos con % avance entre 1 y 99
               var promedio_avance_compromisos_1_y_99 = 0; //para sumar % avance entre 1 y 99
               var cantidad_compromisos_finalizados_100 = 0; //para contar cantidad de compromisos con % avance igual a 100
               var cantidad_total = 0;
               var estado_return = '';

               hallazgo.compromiso.map(function (c, i) { //c:compromiso, i:index
                  if (c.porcentaje_avance > 0 && c.porcentaje_avance < 99 && c.estado != 'Finalizado') {
                     cantidad_compromisos_1_y_99 += 1;
                     promedio_avance_compromisos_1_y_99 += c.porcentaje_avance;
                  } else if (c.porcentaje_avance == 100 && c.estado == 'Finalizado') {
                     cantidad_compromisos_finalizados_100 += 1;
                  }
                  cantidad_total += 1;
               });

               if (cantidad_compromisos_1_y_99 > 0) {
                  estado_return = 'Abierto';
               } else if (cantidad_compromisos_finalizados_100 > 0 && cantidad_compromisos_finalizados_100 == cantidad_total) {
                  estado_return = 'Finalizado';
               } else if ((promedio_avance_compromisos_1_y_99 / cantidad_compromisos_1_y_99) > 0) {
                  estado_return = 'Abierto';
               } else {
                  estado_return = 'Seguimientos sin avances';
               }
               return estado_return;
            },
            calcularAvanceHallazgo: function (hallazgo) {
               var cantidad_compromisos_1_y_99 = 0; //para contar cantidad de compromisos con % avance entre 1 y 99
               var promedio_avance_compromisos_1_y_99 = 0; //para sumar % avance entre 1 y 99
               var cantidad_compromisos_finalizados_100 = 0; //para contar cantidad de compromisos con % avance igual a 100
               var cantidad_total = 0;
               var promedio_return = '';

               hallazgo.compromiso.map(function (c, i) { //c:compromiso, i:index
                  if (c.porcentaje_avance > 0 && c.porcentaje_avance < 99 && c.estado != 'Finalizado') {
                     cantidad_compromisos_1_y_99 += 1;
                     promedio_avance_compromisos_1_y_99 += c.porcentaje_avance;
                  } else if (c.porcentaje_avance == 100 && c.estado == 'Finalizado') {
                     cantidad_compromisos_finalizados_100 += 1;
                  }
                  cantidad_total += 1;
               });

               if (cantidad_compromisos_1_y_99 > 0) {
                  promedio_return = (promedio_avance_compromisos_1_y_99 / cantidad_compromisos_1_y_99) || 0;
               } else if (cantidad_compromisos_finalizados_100 > 0 && cantidad_compromisos_finalizados_100 == cantidad_total) {
                  promedio_return = 100;
               } else if ((promedio_avance_compromisos_1_y_99 / cantidad_compromisos_1_y_99) > 0) {
                  promedio_return = (promedio_avance_compromisos_1_y_99 / cantidad_compromisos_1_y_99) || 0;
               } else {
                  promedio_return = 0;
               }
               return promedio_return;

            },
         },
         watch: {},
      },
      'modal-nuevocompromiso': {
         props: ['nuevo_compromiso'],
         template: `
			<!-- template for the modal component -->
			  <transition name="modal">
				 <div class="modal-mask">
					<div class="modal-wrapper">
					  <div class="modal-container">

						 <div class="modal-header">
							<slot name="header">

							</slot>
						 </div>

						 <div class="modal-body">
							<slot name="body">
                        <dl class="dl-vertical" style="margin: 20px;">
                           <div class="row">
									   <div style="overflow-y: scroll;max-height: 400px;">
                                 <div class="col-md-12">
                                    <dt>Nomenclatura (*):</dt>
                                    <dd>
                                       <p class="control has-icon has-icon-right">
                                          <select name="nomenclatura" v-model="nuevo_compromiso.nomenclatura"
                                             v-validate="'required'" data-vv-delay="500"
                                             :class="{'input': true, 'text-danger': errors.has('nomenclatura'), 'form-control':true}">
                                             <option value="PMG">PMG</option>
                                             <option value="NO PMG">NO PMG</option>
                                             <option value="REPROG.">REPROG.</option>
                                             <option value="Contraloría General de la República">
                                                Contraloría General de la República
                                             </option>
                                          </select>
                                          <transition name="bounce">
                                          <i v-show="errors.has('nomenclatura')" class="fa fa-warning"></i>
                                          </transition>
                                          <transition name="bounce">
                                          <span v-show="errors.has('nomenclatura')" class="text-danger">
                                             {{ errors.first('nomenclatura') }}
                                          </span>
                                          </transition>
                                       </p>
                                    </dd>
                                 </div>
                                 <div class="col-md-12">
                                    <dt>Nombre Compromiso (*):</dt>
                                    <dd>
                                       <p class="control has-icon has-icon-right">
                                          <textarea name="nombre_compromiso" rows="7"
                                                   :class="{'input': true, 'text-danger': errors.has('nombre_compromiso'),
                                                    'scroll_textarea_original':true}"
                                                    v-validate="'required'" data-vv-delay="500"
                                                    v-model="nuevo_compromiso.nombre_compromiso"
                                                    :value="nuevo_compromiso.nombre_compromiso">
                                          </textarea>
                                          <transition name="bounce">
                                          <i v-show="errors.has('nombre_compromiso')" class="fa fa-warning"></i>
                                          </transition>
                                          <transition name="bounce">
                                          <span v-show="errors.has('nombre_compromiso')" class="text-danger">
                                             {{ errors.first('nombre_compromiso') | replaceNombreCompromiso }}
                                          </span>
                                          </transition>
                                       </p>
                                    </dd>
                                 </div>
                                 <div class="col-md-6">
                                    <dt>Plazo Estimado (*):</dt>
                                    <dd>
													<input required name="plazo_estimado" id="ncpe" type="text"
															class="form-control" v-validate="'required'" data-vv-delay="500" />

													<p class="control has-icon has-icon-right">
                                          <transition name="bounce">
                                          <i v-show="errors.has('plazo_estimado')" class="fa fa-warning"></i>
                                          </transition>
                                          <transition name="bounce">
                                          <span v-show="errors.has('plazo_estimado')" class="text-danger">
                                             {{ errors.first('plazo_estimado') | replacePlazoEstimado }}
                                          </span>
                                          </transition>
                                       </p>
                                    </dd>
                                 </div>
                                 <div class="col-md-6">
                                    <dt>Plazo Comprometido (*):</dt>
                                    <dd>
													<input required name="plazo_comprometido" id="ncpc" type="text"
															class="form-control" v-validate="'required'" data-vv-delay="500" />

													<p class="control has-icon has-icon-right">
                                          <transition name="bounce">
                                          <i v-show="errors.has('plazo_comprometido')" class="fa fa-warning"></i>
                                          </transition>
                                          <transition name="bounce">
                                          <span v-show="errors.has('plazo_comprometido')" class="text-danger">
                                             {{ errors.first('plazo_comprometido') | replacePlazoComprometido }}
                                          </span>
                                          </transition>
                                       </p>
                                    </dd>
                                 </div>
                              </div><!-- styled -->
                           </div><!-- .row -->
                        </dl>
							</slot>
						 </div>

						 <div class="modal-footer">
							<slot name="footer">
								<!--
							  	<button class="btn btn-sm btn-success" @click="$emit('close')">
									Aceptar
							  	</button>
							  	-->
							  	Los campos con <b>*</b> son obligatorios
							</slot>
						 </div>
					  </div>
					</div>
				 </div>
			  </transition>
			`,
         name: 'modal-nuevocompromiso',
         data () {
            return {
               'min_date': '',
            }
         },
         components: {
            'datepicker': {
               props: {
                  width: {type: String, default: '238px'},
                  readonly: {type: Boolean, default: false},
                  value: {type: String, default: ''},
                  format: {type: String, default: 'DD-MM-YYYY'}
               },
               name: 'datepicker',
               template: `

					 <div class="datetime-picker" :style="{ width: width }">
						  <input
								type="date"
								min="12-12-2017"
								:readonly="readonly"
								:value="value"
								@click="show = !show">
						  <div class="picker-wrap" v-show="show">
								<table class="date-picker">
									 <thead>
										  <tr class="date-head">
												<th colspan="4">
													 <span class="btn-prev" @click="yearClick(-1)">&lt;</span>
													 <span class="show-year">{{now.getFullYear()}}</span>
													 <span class="btn-next" @click="yearClick(1)">&gt;</span>
												</th>
												<th colspan="3">
													 <span class="btn-prev" @click="monthClick(-1)">&lt;</span>
													 <span class="show-month">{{months[now.getMonth()]}}</span>
													 <span class="btn-next" @click="monthClick(1)">&gt;</span>
												</th>
										  </tr>
										  <tr class="date-days">
												<th v-for="day in days">{{day}}</th>
										  </tr>
									 </thead>
									 <tbody>
										  <tr v-for="i in 6">
												<td v-for="j in 7"
													 :class="date[i * 7 + j] && date[i * 7 + j].status"
													 :date="date[i * 7 + j] && date[i * 7 + j].date"
													 @click="pickDate(i * 7 + j)">{{date[i * 7 + j] && date[i * 7 + j].text}}</td>
										  </tr>
									 </tbody>
								</table>
						  </div>
					 </div>
					`,
               data () {
                  return {
                     show: false,
                     days: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                     months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                     date: [],
                     now: new Date()
                  };
               },
               watch: {
                  now () {
                     this.update();
                  },
                  show () {
                     this.update();
                  }
               },
               methods: {
                  close () {
                     this.show = false;
                  },
                  update () {
                     var arr = [];
                     var time = new Date(this.now);
                     time.setMonth(time.getMonth(), 1);           // the first day
                     var curFirstDay = time.getDay();
                     curFirstDay === 0 && (curFirstDay = 7);
                     time.setDate(0);                             // the last day
                     var lastDayCount = time.getDate();
                     for (let i = curFirstDay; i > 0; i--) {
                        arr.push({
                           text: lastDayCount - i + 1,
                           time: new Date(time.getFullYear(), time.getMonth(), lastDayCount - i + 1),
                           status: 'date-pass'
                        });
                     }

                     time.setMonth(time.getMonth() + 2, 0);       // the last day of this month
                     var curDayCount = time.getDate();
                     time.setDate(1);                             // fix bug when month change
                     var value = this.value || this.stringify(new Date());
                     for (let i = 0; i < curDayCount; i++) {
                        let tmpTime = new Date(time.getFullYear(), time.getMonth(), i + 1);
                        let status = '';
                        this.stringify(tmpTime) === value && (status = 'date-active');
                        arr.push({
                           text: i + 1,
                           time: tmpTime,
                           status: status
                        });
                     }

                     var j = 1;
                     while (arr.length < 42) {
                        arr.push({
                           text: j,
                           time: new Date(time.getFullYear(), time.getMonth() + 1, j),
                           status: 'date-future'
                        });
                        j++;
                     }
                     this.date = arr;
                  },
                  yearClick (flag) {
                     this.now.setFullYear(this.now.getFullYear() + flag);
                     this.now = new Date(this.now);
                  },
                  monthClick (flag) {
                     this.now.setMonth(this.now.getMonth() + flag);
                     this.now = new Date(this.now);
                  },
                  pickDate (index) {
                     this.show = false;
                     this.now = new Date(this.date[index].time);
                     this.value = this.stringify();
                  },
                  parse (str) {
                     var time = new Date(str);
                     return isNaN(time.getTime()) ? null : time;
                  },
                  stringify (time = this.now, format = this.format) {
                     var year = time.getFullYear();
                     var month = time.getMonth() + 1;
                     var date = time.getDate();
                     var monthName = this.months[time.getMonth()];

                     var map = {
                        YYYY: year,
                        MMM: monthName,
                        MM: ('0' + month).slice(-2),
                        M: month,
                        DD: ('0' + date).slice(-2),
                        D: date
                     };
                     return format.replace(/Y+|M+|D+/g, function (str) {
                        return map[str];
                     });
                  },
                  leave (e) {
                     if (!this.$el.contains(e.target)) {
                        this.close();
                     }
                  }
               },
               ready () {
                  this.now = this.parse(this.value) || new Date();
                  document.addEventListener('click', this.leave, false);
               },
               beforeDestroy () {
                  document.removeEventListener('click', this.leave, false);
               }
            },
         },
         ready () {
         },
         created () {

            var date = new Date();
            var dd = date.getDate();
            var mm = date.getMonth() + 1; //January is 0!
            var yyyy = date.getFullYear();
            this.min_date = yyyy + "-" + ((mm < 10) ? '0' + mm : mm) + "-" + ((dd < 10) ? '0' + dd : dd);
            var self = this;


            $(document).ready(function () {

               // #ncpe => nuevo compromiso plazo estimado grid hallazgo
               $('#ncpe').datepicker({//ncpe => nuevo compromiso plazo estimado
                  format: "dd-mm-yyyy",
                  language: "es",
                  startDate: (function () {
                     return date = (function () {
                        var date = new Date();
                        date.setDate(date.getDate());
                        return date;
                     })();
                  })(),
                  autoclose: true,
               });

               $('#ncpe').change(function () {//ncpe => nuevo compromiso plazo estimado grid hallazgo
                  if ($('#ncpe').val()) {

                     //hacer la validacion si es menor a la fecha actual, no avisar pero colocar la fecha que corresponde
                     var date_ncpe = $('#ncpe').val().split('-');


                     var date_today = new Date();
                     var dd = date_today.getDate();
                     var mm = date_today.getMonth() + 1; //January is 0!
                     var yyyy = date_today.getFullYear();

                     if (date_ncpe.length == 3) {
                        if (date_ncpe[1].length != 2 || date_ncpe[0].length != 2 || date_ncpe[2].length != 4) {
                           $('#ncpe').prop('value', ((dd < 10) ? '0' + dd : dd) + '-' + ((mm < 10) ? '0' + mm : mm) + '-' + yyyy);
                           self.nuevo_compromiso.plazo_estimado = ((dd < 10) ? '0' + dd : dd) + '-' + ((mm < 10) ? '0' + mm : mm) + '-' + yyyy;
                           return;
                        }
                     }

                     var date_today = new Date(mm + '/' + dd + '/' + yyyy);
                     date_ncpe = new Date(date_ncpe[1] + '/' + date_ncpe[0] + '/' + date_ncpe[2]);

                     var timeDiff = date_today.getTime() - date_ncpe.getTime();//Math.abs(date_ncpe.getTime() - date_ncpc.getTime());
                     var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                     //console.log(diffDays);

                     if (diffDays < 0) {
                        $('#ncpc').data('datepicker').setStartDate($('#ncpe').val());
                        self.nuevo_compromiso.plazo_estimado = $('#ncpe').val();
                     } else {
                        $('#ncpe').prop('value', ((dd < 10) ? '0' + dd : dd) + '-' + ((mm < 10) ? '0' + mm : mm) + '-' + yyyy);
                        self.nuevo_compromiso.plazo_estimado = ((dd < 10) ? '0' + dd : dd) + '-' + ((mm < 10) ? '0' + mm : mm) + '-' + yyyy;
                     }

                     //Si es que ya se habia ingresado el plazo comprometido, valida el rango
                     if ($('#ncpc').val()) {
                        var date_ncpc = $('#ncpc').val().split('-');
                        date_ncpc = new Date(date_ncpc[1] + '/' + date_ncpc[0] + '/' + date_ncpc[2]);

                        var timeDiff = date_ncpc.getTime() - date_ncpe.getTime();//Math.abs(date_ncpe.getTime() - date_ncpc.getTime());
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                        if (diffDays < 0) {
                           alert('El plazo comprometido no puede ser menor al plazo estimado ni a la fecha actual');
                           $('#ncpc').prop('value', null);
                           self.nuevo_compromiso.plazo_comprometido = '';
                        }
                     }

                  }
               });

               // #ncpc => nuevo compromiso plazo comprometido grid hallazgo
               $('#ncpc').datepicker({//ncpc => nuevo compromiso plazo comprometido grid hallazgo
                  format: "dd-mm-yyyy",
                  language: "es",
                  startDate: new Date(),
                  autoclose: true,
               });

               $('#ncpc').click(function (event) {
                  if ($('#ncpe').val()) {
                     $('#ncpc').data('datepicker').setStartDate($('#ncpe').val());
                  }
               });

               $('#ncpc').change(function (event) {
                  var date_ncpe = $('#ncpe').val().split('-');
                  date_ncpe = new Date(date_ncpe[1] + '/' + date_ncpe[0] + '/' + date_ncpe[2]);

                  var date_ncpc = $('#ncpc').val().split('-');
                  date_ncpc = new Date(date_ncpc[1] + '/' + date_ncpc[0] + '/' + date_ncpc[2]);

                  var timeDiff = date_ncpc.getTime() - date_ncpe.getTime();
                  //Math.abs(date_ncpe.getTime() - date_ncpc.getTime());
                  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                  if (diffDays < 0) {
                     alert('El plazo comprometido no puede ser menor al plazo estimado ni a la fecha actual');
                     $('#ncpc').prop('value', null);
                  }

                  self.nuevo_compromiso.plazo_comprometido = $('#ncpc').val();
               });

            });

         },
         filters: {
            replaceFono(fono) {
               if (fono != null) {
                  fono = fono.replace('fono_responsable', 'telefono');
               }
               return fono;
            },
            replacePlazoComprometido(plazo_comprometido) {
               if (plazo_comprometido != null) {
                  plazo_comprometido = plazo_comprometido.replace('plazo_comprometido', 'para el plazo comprometido');
               }
               return plazo_comprometido;
            },
            replacePlazoEstimado(plazo_estimado) {
               if (plazo_estimado != null) {
                  plazo_estimado = plazo_estimado.replace('plazo_estimado', ' para el plazo estimado');
               }
               return plazo_estimado;
            },
            replaceNombreCompromiso(nombre_compromiso) {
               if (nombre_compromiso != null) {
                  nombre_compromiso = nombre_compromiso.replace('nombre_compromiso', 'para el nombre del compromiso');
               }
               return nombre_compromiso;
            },
         },
         methods: {},
         watch: {},
      },
      'modal-nuevohallazgo': {
         props: ['nuevo_hallazgo'],
         template: `
			   <!-- template for the modal component -->
			   <transition name="modal">
				   <div class="modal-mask">
					   <div class="modal-wrapper">
					      <div class="modal-container">

						      <div class="modal-header">
							      <slot name="header"></slot>
						      </div>

						      <div class="modal-body">
							      <slot name="body">
                              <dl class="dl-vertical" style="margin: 20px;">
                                 <div class="row">
                                    <div style="overflow-y: scroll;max-height: 400px;">
                                       <div class="col-md-6">
                                          <dt>Nombre del hallazgo (*):</dt>
                                          <dd>
                                             <p class="control has-icon has-icon-right">
                                                <textarea name="nombre_hallazgo" rows="5"
                                                          v-model="nuevo_hallazgo.nombre_hallazgo"
                                                          :class="{'input': true, 'text-danger': errors.has('nombre_hallazgo'),
                                                          'scroll_textarea_original':true}"
                                                          v-validate="'required'" data-vv-delay="500">
                                                   @{{ nuevo_hallazgo.nombre_hallazgo }}
                                                </textarea>
                                                <transition name="bounce">
                                                <i v-show="errors.has('nombre_hallazgo')" class="fa fa-warning"></i>
                                                </transition>
                                                <transition name="bounce">
                                                <span v-show="errors.has('nombre_hallazgo')" class="text-danger">
                                                   {{ errors.first('nombre_hallazgo') | replaceNombreHallazgo }}
                                                </span>
                                                </transition>
                                             </p>
                                          </dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Redacte recomendacion (*):</dt>
                                          <dd>
                                             <p class="control has-icon has-icon-right">

                                                <textarea name="recomendacion" rows="5"
                                                          v-model="nuevo_hallazgo.recomendacion"
                                                          :class="{'input': true, 'text-danger': errors.has('recomendacion'),
                                                          'scroll_textarea_original':true}"
                                                          v-validate="'required'" data-vv-delay="500">
                                                   @{{ nuevo_hallazgo.recomendacion }}
                                                </textarea>

                                                <transition name="bounce">
                                                <i v-show="errors.has('recomendacion')" class="fa fa-warning"></i>
                                                </transition>
                                                <transition name="bounce">
                                                <span v-show="errors.has('recomendacion')" class="text-danger">
                                                   {{ errors.first('recomendacion') }}
                                                </span>
                                                </transition>
                                             </p>
                                          </dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Seleccione el nivel de criticidad (*):</dt>
                                          <dd>
                                             <p class="control has-icon has-icon-right">
                                                <select name="criticidad"
                                                         v-model="nuevo_hallazgo.criticidad"
                                                         v-validate="'required'" data-vv-delay="500"
                                                         :class="{'input': true, 'text-danger': errors.has('criticidad'), 'form-control':true}">
                                                   <option value="Alta" selected="selected">Alta</option>
                                                   <option value="Media">Media</option>
                                                   <option value="Baja">Baja</option>
                                                </select>

                                                <transition name="bounce">
                                                <i v-show="errors.has('criticidad')" class="fa fa-warning"></i>
                                                </transition>
                                                <transition name="bounce">
                                                <span v-show="errors.has('criticidad')" class="text-danger">
                                                   {{ errors.first('criticidad') }}
                                                </span>
                                                </transition>
                                             </p>
                                          </dd>
                                       </div>
                                    </div><!-- styled -->
                                 </div><!-- .row -->

                              </dl>

							      </slot>
						      </div>

						      <div class="modal-footer">
							      <slot name="footer">
                              <!--
                              <button class="btn btn-sm btn-success" @click="$emit('close')">
                                 Aceptar
                              </button>
                              -->
                              Los campos con <b>*</b> son obligatorios
                           </slot>
                        </div>
					      </div>
					   </div>
				   </div>
			   </transition>
			`,
         name: 'modal-nuevohallazgo',
         data () {
            return {}
         },
         ready () {
         },
         created () {
         },
         filters: {
            replaceNombreHallazgo(nombre_hallazgo) {
               if (nombre_hallazgo != null) {
                  nombre_hallazgo = nombre_hallazgo.replace('nombre_hallazgo', 'para el nombre del hallazgo');
               }
               return nombre_hallazgo;
            },
         },
         methods: {},
         watch: {},
      },
      'spinner': {
         props: [''],
         'name': 'spinner',
         'template': `
         <div class="loader text-center">Cargando tabla, espere por favor...</div>
      `,
         data () {
            return {
               visible: false,
            }
         },
         ready () {
         },
         created(){
         },
         filters: {},
         methods: {},
      },
      /*
       '':{
       props: [''],
       template: `
       `,
       name: '',
       data () {
       return {
       }
       },
       ready () {
       },
       created () {
       },
       methods: {
       },
       watch: {
       },
       }
       */
   },
   created(){
      this.fetchHallazgos();
   },
   ready: {},
   filters: {},
   methods: {
      //camelCase() => for specific functions
      agregarFiltroEstadoGrid: function (estado) {
         if (!this.filtroEstado) {
            this.filtroEstado = true;
            this.hallazgosFiltroEstado = this.hallazgos;
         } else {
            this.hallazgos = this.hallazgosFiltroEstado;
         }
         //Itero la lista de hallazgos y filtro segun estado seleccionado
         this.hallazgos = _.filter(this.hallazgos, function (h) {
            return h.estado == estado;
         });
         if (this.hallazgos.length == 0) {
            this.hallazgos = this.hallazgosFiltroEstado;
            alert('Sin resultados para "' + estado + '"');
            this.limpiarFiltros();
         }
      },
      agregarFiltroCriticidadGrid: function (criticidad) {
         if (!this.filtroCriticidad) {
            this.filtroCriticidad = true;
            this.hallazgosFiltroCriticidad = this.hallazgos;
         } else {
            this.hallazgos = this.hallazgosFiltroCriticidad;
         }

         //Itero la lista de hallazgos y filtro segun la criticidad seleccionada
         this.hallazgos = _.filter(this.hallazgos, function (h) {
            return h.criticidad == criticidad || h.criticidad == 'Criticidad ' + criticidad;
         });
         if (this.hallazgos.length == 0) {
            this.hallazgos = this.hallazgosFiltroCriticidad;
            alert('Sin resultados para "' + criticidad + '"');
            this.limpiarFiltros();
         }
      },
      agregarFiltroIdHallazgoGrid: function () {
         if (!this.filtroIdHallazgo) {
            this.filtroIdHallazgo = true;
            this.hallazgosFiltroIdHallazgo = this.hallazgos;
         } else {
            this.hallazgos = this.hallazgosFiltroIdHallazgo;
         }

         var self = this;
         //Itero la lista de hallazgos y filtro segun el id hallazgo ingresado
         this.hallazgos = _.filter(this.hallazgos, function (h) {
            return h.id_hallazgo == self.filterIdHallazgo;
         });
         /*
          if(this.hallazgos.length == 0){
          this.hallazgos = this.hallazgosFiltroIdHallazgo;
          if(this.filterIdHallazgo == '') return;
          else alert('Sin resultados para el id ingresado');
          }
          */
      },
      calcularDiferenciaTiempo: function (plazo_comprometido) {
         plazo_comprometido = plazo_comprometido.split('-');
         var today = new Date();
         var dd = today.getDate();
         var mm = today.getMonth() + 1; //January is 0!
         var yyyy = today.getFullYear();

         var date1 = new Date(plazo_comprometido[1] + '/' + plazo_comprometido[0] + '/' + plazo_comprometido[2]);

         var date2 = new Date(mm + '/' + dd + '/' + yyyy);
         var timeDiff = Math.abs(date2.getTime() - date1.getTime());
         var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
         return diffDays;
      },
      calcularEstadoHallazgo: function (hallazgo) {
         var cantidad_compromisos_1_y_99 = 0; //para contar cantidad de compromisos con % avance entre 1 y 99
         var promedio_avance_compromisos_1_y_99 = 0; //para sumar % avance entre 1 y 99
         var cantidad_compromisos_finalizados_100 = 0; //para contar cantidad de compromisos con % avance igual a 100
         var cantidad_total = 0;
         var estado_return = '';

         hallazgo.compromiso.map(function (c, i) { //c:compromiso, i:index
            if (c.porcentaje_avance > 0 && c.porcentaje_avance < 99 && c.estado != 'Finalizado') {
               cantidad_compromisos_1_y_99 += 1;
               promedio_avance_compromisos_1_y_99 += c.porcentaje_avance;
            } else if (c.porcentaje_avance == 100 && c.estado == 'Finalizado') {
               cantidad_compromisos_finalizados_100 += 1;
            }
            cantidad_total += 1;
         });

         if (cantidad_compromisos_1_y_99 > 0) {
            estado_return = 'Abierto';
         } else if (cantidad_compromisos_finalizados_100 > 0 && cantidad_compromisos_finalizados_100 == cantidad_total) {
            estado_return = 'Finalizado';
         } else if ((promedio_avance_compromisos_1_y_99 / cantidad_compromisos_1_y_99) > 0) {
            estado_return = 'Abierto';
         } else {
            estado_return = 'Seguimientos sin avances';
         }
         return estado_return;
      },
      calcularAvanceHallazgo: function (hallazgo) {
         var cantidad_compromisos_1_y_99 = 0; //para contar cantidad de compromisos con % avance entre 1 y 99
         var promedio_avance_compromisos_1_y_99 = 0; //para sumar % avance entre 1 y 99
         var cantidad_compromisos_finalizados_100 = 0; //para contar cantidad de compromisos con % avance igual a 100
         var cantidad_total = 0;
         var promedio_return = '';

         hallazgo.compromiso.map(function (c, i) { //c:compromiso, i:index
            if (c.porcentaje_avance > 0 && c.porcentaje_avance < 99 && c.estado != 'Finalizado') {
               cantidad_compromisos_1_y_99 += 1;
               promedio_avance_compromisos_1_y_99 += c.porcentaje_avance;
            } else if (c.porcentaje_avance == 100 && c.estado == 'Finalizado') {
               cantidad_compromisos_finalizados_100 += 1;
            }
            cantidad_total += 1;
         });

         if (cantidad_compromisos_1_y_99 > 0) {
            promedio_return = (promedio_avance_compromisos_1_y_99 / cantidad_compromisos_1_y_99) || 0;
         } else if (cantidad_compromisos_finalizados_100 > 0 && cantidad_compromisos_finalizados_100 == cantidad_total) {
            promedio_return = 100;
         } else if ((promedio_avance_compromisos_1_y_99 / cantidad_compromisos_1_y_99) > 0) {
            promedio_return = (promedio_avance_compromisos_1_y_99 / cantidad_compromisos_1_y_99) || 0;
         } else {
            promedio_return = 0;
         }
         return promedio_return;

      },
      // change order variable direction
      changeListOrder: function (column) {
         this.gridOrder == 'asc' ? this.gridOrder = 'desc' : this.gridOrder = 'asc';
         this.orderLists(column);
      },
      crear_nuevo_compromiso: function (id_hallazgo) {
         this.form_compromiso_creable = id_hallazgo;
         this.nuevo_compromiso.id_hallazgo = id_hallazgo;
         this.showModalNuevoCompromiso = true;
         this.permiteGuardarNuevoCompromiso = true;
         return this.nuevo_compromiso;
      },
      fetchHallazgos: function () {
         this._gcf = gcf;
         var id_proceso_auditado = $('#id_proceso_auditado').val();
         this.$http.get('/proceso_auditado/' + id_proceso_auditado + '/edit/ajax').then(response => { // success callback
            //Separo los datos aunque el request me retorne la relacion del proceso auditado + hallazgos, solo es para separar


            this.area_proceso_auditado = response.body.area_proceso_auditado;
            this.proceso_auditado = response.body.proceso_auditado;

            this.hallazgos = response.body.hallazgos;
            this.hallazgosTmp = response.body.hallazgos;
            //this.hallazgo = response.body.hallazgo;

            this.compromisos = response.body.compromisos;
            this.compromisosTmp = response.body.compromisos;
            //this.compromiso = response.body.compromiso;

            this.compromisos_responsables = response.body.compromisos_responsables;
            this.compromisos_responsablesTmp = response.body.compromisos_responsables;

            this.seguimientos = response.body.seguimientos;
            this.seguimientosTmp = response.body.seguimientos;
            //this.seguimiento = response.body.seguimiento;

            this.archivos = response.body.archivos;
            this.archivosTmp = response.body.archivos;

            this.usuarios = response.body.usuarios;
            this.config = response.body.config;
            this.auth = response.body.auth;
            this.role = response.body.role;
            this.auditor = response.body.auditor;


            this.preloadHallazgos();

            //Manda el controller que llama al metodo
            gcf.refetchControllersData({
               'proceso_auditado': this.proceso_auditado,
               'area_proceso_auditado': this.area_proceso_auditado,

               'hallazgos': this.hallazgos,
               'hallazgosTmp': this.hallazgos,

               'compromisos': this.compromisos,
               'compromisosTmp': this.compromisos,

               'compromisos_responsables': this.compromisos_responsables,
               'compromisos_responsablesTmp': this.compromisos_responsables,

               'seguimientos': this.seguimientos,
               'seguimientosTmp': this.seguimientos,

               'archivos': this.archivos,
               'archivosTmp': this.archivos,

               'usuarios': this.usuarios,
               'config': this.config,
               'auth': this.auth,
               'role': this.role,
               'auditor': this.auditor,

            }, {
               'CompromisoController': 'CompromisoController',
               'SeguimientoController': 'SeguimientoController',
               'ArchivoController': 'ArchivoController',
               'ResponsableController': 'ResponsableController',
            }, 'HallazgoController');


            this.nuevo_hallazgo.id_proceso_auditado = this.proceso_auditado.id_proceso_auditado;
            this.ctd_req_hallazgos = this.proceso_auditado.cantidad_hallazgo;
            this.ctd_hallazgos = this.hallazgos.length; // : cantidad actual de hallazgos referenciados al contraloria
            this.ctd_compromisos = this.compromisos.length;//this.ctd_compromisos = 0;
            this.ctd_seguimientos = this.seguimientos.length;

            CompromisoController.ctd_req_hallazgos =
               SeguimientoController.ctd_req_hallazgos =
                  ArchivoController.ctd_req_hallazgos =
                     ResponsableController.ctd_req_hallazgos = this.ctd_req_hallazgos;

            CompromisoController.ctd_hallazgos =
               SeguimientoController.ctd_hallazgos =
                  ArchivoController.ctd_hallazgos =
                     ResponsableController.ctd_hallazgos = this.ctd_hallazgos;

            CompromisoController.ctd_compromisos =
               SeguimientoController.ctd_compromisos =
                  ArchivoController.ctd_compromisos =
                     ResponsableController.ctd_compromisos = this.ctd_compromisos;

            CompromisoController.ctd_seguimientos =
               SeguimientoController.ctd_seguimientos =
                  ArchivoController.ctd_seguimientos =
                     ResponsableController.ctd_seguimientos = this.ctd_seguimientos;

            CompromisoController._gcf =
               SeguimientoController._gcf =
                  ArchivoController._gcf =
                     ResponsableController._gcf = this._gcf;

         }, response => { // error callback
            console.log('Error fetch_procesos_auditados: ' + response);
         });
      },
      filterGridHallazgoByCombo: function (id_hallazgo) {
         this.filterIdHallazgo = id_hallazgo || null;
         if (this.filterIdHallazgo != null) {
            return this.agregarFiltroIdHallazgoGrid();
         } else {
            this.limpiarFiltros();
            //alert('Debe seleccionar un hallazgo');
         }
         return;
      },
      limpiarFiltros: function () {
         this.hallazgos = this.proceso_auditado.hallazgo;
         this.hallazgosFiltroCriticidad = this.hallazgos;
         this.hallazgosFiltroEstado = this.hallazgos;
         this.filtroCriticidad = false;
         this.filtroEstado = false;
         this.mensajeResultadoConFiltros = false;
      },
      limpiarNuevoHallazgo: function () {
         this.nuevo_hallazgo = {};
         return this.nuevo_hallazgo = {
            'id_proceso_auditado': '',
            'nombre_hallazgo': '',
            'recomendacion': '',
            'criticidad': 'Alto',
            'cantidad_hallazgo': 0,
         }
      },
      limpiarNuevoCompromiso: function () {
         this.nuevo_compromiso = {};
         return this.nuevo_compromiso = {
            'id_hallazgo': '',
            'nomenclatura': '',
            'plazo_estimado': '',
            'plazo_comprometido': '',
            'nombre_compromiso': '',
            'responsable': '',
            'email_responsable': '',
            'fono_responsable': '',
         }
      },
      navigate: function (paso) {
         switch (paso) {
            case 1:
               this.paso_uno = true;
               this.paso_dos = false;
               this.paso_tres = false;
               break;
            case 2:
               this.paso_uno = false;
               this.paso_dos = true;
               this.paso_tres = false;
               break;
            case 3:
               this.paso_uno = false;
               this.paso_dos = false;
               this.paso_tres = true;
               break;
         }
      },
      // function to order users in the list
      orderLists: function (column) {
         this.hallazgos = _.orderBy(this.hallazgos, column, this.gridOrder);
         //console.log(column);
         //this.lists = this.shuffle(_.orderBy(this.lists, 'name', this.listOrder));
         //console.log(this.lists.length);
      },
      preloadHallazgos: function () {
         //De fetchCompromisos  para los compromisos, calcula la diferencia de tiempo
         for (let c in this.compromisos) {
            this.compromisos[c].plazo_comprometido_dias = this.calcularDiferenciaTiempo(this.compromisos[c].plazo_comprometido) || 0;
         }

         //De fetchCompromisos para compromisos/seguimientos
         for (let s in this.seguimientos) {
            this.seguimientos[s].id_hallazgo =
               gcf.findCompromisoById(this.compromisos, this.seguimientos[s].id_compromiso).id_hallazgo;
            this.seguimientos[s].nombre_hallazgo =
               gcf.findHallazgoById(this.hallazgos, this.seguimientos[s].id_hallazgo).nombre_hallazgo;
            this.seguimientos[s].nombre_compromiso =
               gcf.findCompromisoById(this.compromisos, this.seguimientos[s].id_compromiso).nombre_compromiso;
            this.seguimientos[s].usuario_registra =
               gcf.findById(this.usuarios, this.seguimientos[s].usuario_registra);
            this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra ?
               this.seguimientos[s].usuario_registra.name : 'Sistema';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';
         }

         //De fetchCompromisos para compromisos_responsables
         for (let r in this.compromisos_responsables) {
            this.compromisos_responsables[r].id_hallazgo =
               gcf.findCompromisoById(this.compromisos, this.compromisos_responsables[r].id_compromiso).id_hallazgo;
            this.compromisos_responsables[r].nombre_hallazgo =
               gcf.findHallazgoById(this.hallazgos, this.compromisos_responsables[r].id_hallazgo).nombre_hallazgo;
            this.compromisos_responsables[r].nombre_compromiso =
               gcf.findCompromisoById(this.compromisos, this.compromisos_responsables[r].id_compromiso).nombre_compromiso;

            this.compromisos_responsables[r].area = this.compromisos_responsables[r].area_proceso_auditado.descripcion;
         }

         //De fetchSeguimientos para seguimientos
         for (let s in this.seguimientos) {
            this.seguimientos[s].id_hallazgo = gcf.findCompromisoById(this.compromisos, this.seguimientos[s].id_compromiso).id_hallazgo;
            this.seguimientos[s].nombre_hallazgo = gcf.findHallazgoById(this.hallazgos, this.seguimientos[s].id_hallazgo).nombre_hallazgo;
            this.seguimientos[s].nombre_compromiso = gcf.findCompromisoById(this.compromisos, this.seguimientos[s].id_compromiso).nombre_compromiso;
            this.seguimientos[s].usuario_registra = gcf.findById(this.usuarios, this.seguimientos[s].usuario_registra);
            this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra ?
               this.seguimientos[s].usuario_registra.name : 'Sistema';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';

         }

         //De fetchArchivos para archivos
         for (let a in this.archivos) {
            this.archivos[a].id_hallazgo = gcf.findCompromisoById(this.compromisos, this.archivos[a].id_compromiso).id_hallazgo;
            this.archivos[a].nombre_hallazgo = gcf.findHallazgoById(this.hallazgos, this.archivos[a].id_hallazgo).nombre_hallazgo;
            this.archivos[a].nombre_compromiso = gcf.findCompromisoById(this.compromisos, this.archivos[a].id_compromiso).nombre_compromiso;
            this.archivos[a].usuario_registra = gcf.findById(this.usuarios, this.archivos[a].usuario_registra);
            this.archivos[a].usuario_registra = this.archivos[a].usuario_registra ?
               this.archivos[a].usuario_registra.name : 'Sistema';
            this.archivos[a].observacion = this.archivos[a].observacion || 'Sin Observacion';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';
         }

         //De fetchResponsables para responsables
         for (let r in this.compromisos_responsables) {
            this.compromisos_responsables[r].id_hallazgo =
               gcf.findCompromisoById(this.compromisos, this.compromisos_responsables[r].id_compromiso).id_hallazgo;
            this.compromisos_responsables[r].nombre_hallazgo =
               gcf.findHallazgoById(this.hallazgos, this.compromisos_responsables[r].id_hallazgo).nombre_hallazgo;
            this.compromisos_responsables[r].nombre_compromiso =
               gcf.findCompromisoById(this.compromisos, this.compromisos_responsables[r].id_compromiso).nombre_compromiso;
            this.compromisos_responsables[r].area = this.compromisos_responsables[r].area_proceso_auditado.descripcion;

         }
      },
      showModalData: function (id_hallazgo) {
         this.hallazgo = gcf.findHallazgoById(this.hallazgos, id_hallazgo);
         this.hallazgo.porcentaje_avance = parseInt(this.hallazgo.porcentaje_avance) || parseInt(0);

         if (this.hallazgo.compromiso.length > 0) {
            this.hallazgo.ctd_compromiso = parseInt(this.hallazgo.compromiso.length);
            var ctd_seguimiento = 0;
            for (var i in this.hallazgo.compromiso) {
               ctd_seguimiento += this.hallazgo.compromiso[i].seguimiento.length || 0;
            }
            this.hallazgo.ctd_seguimiento = ctd_seguimiento;

         }
         return this.showModal = true;
      },
      /* for transition group flip */
      shuffle: function (items) {
         return _.shuffle(items)
      },
      //with_dash() => for explained specific functions
      cambiar_form_hallazgo_editable: function (id_hallazgo) {
         //this.form_hallazgo_editable = (this.form_hallazgo_editable == false ? true : false);
         return this.form_hallazgo_editable = id_hallazgo;
      },
      guardar_nuevo_hallazgo: function () {
         if (this.permiteGuardarNuevoHallazgo == true) {
            this.permiteGuardarNuevoHallazgo = false;
            if (this.nuevo_hallazgo.nombre_hallazgo != '' &&
               this.nuevo_hallazgo.recomendacion != '' &&
               this.nuevo_hallazgo.criticidad != '' &&
               this.nuevo_hallazgo != {}) {

               //console.log(this.nuevo_hallazgo);
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               this.$http.post('/hallazgo', this.nuevo_hallazgo).then(response => {
                  //alert('Hallazgo creado.');

                  var self = this;
                  setTimeout(function () {
                     //self.$parent.$options.methods.fetchHallazgos();
                     //Cuando guarda hallazgo sin asociar procedimiento disciplinario
                     //self.$parent.fetchHallazgos();
                     self.fetchHallazgos();
                     self.nuevo_hallazgo = {};
                     self.navigate(1);
                     self.form_hallazgo_editable = 0;
                     self.showModalNuevoHallazgo = false;
                  }, 500);

                  //console.log(response);
                  this.hallazgos.push(response.body);
               }, response => {
               });
            }
         } else {
            alert('Se esta procesando la solicitud');
         }
      },
      guardar_nuevo_compromiso: function () {
         if (this.permiteGuardarNuevoCompromiso == true) {
            this.permiteGuardarNuevoCompromiso = false;
            if (this.nuevo_compromiso.nomenclatura != '' &&
               this.nuevo_compromiso.nombre_compromiso != '' &&
               this.nuevo_compromiso.plazo_estimado != '' &&
               this.nuevo_compromiso.plazo_comprometido != '' &&
               this.nuevo_compromiso != {}) {
               //console.log(this.nuevo_compromiso);
               this.form_compromiso_creable = 0;
               this.showModalNuevoCompromiso = false;
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               this.$http.post('/compromiso', this.nuevo_compromiso).then(response => {
                  //alert('Compromiso creado.');
                  var self = this;
                  setTimeout(function () {
                     //self.$parent.$options.methods.fetchHallazgos();
                     //Cuando guarda hallazgo sin asociar procedimiento disciplinario
                     //self.$parent.fetchHallazgos();
                     self.fetchHallazgos();
                     self.limpiarNuevoCompromiso();
                     self.form_compromiso_creable = 0;
                  }, 500);

               }, response => {
               });

            } else {
               this.permiteGuardarNuevoCompromiso = true;
            }
         } else {
            alert('Se esta procesando la solicitud');
         }
      },
      guardar_form_hallazgo_editable: function (id_hallazgo, index) {
         if (this.form_hallazgo_editable != 0 && id_hallazgo != 0) {
            //Lo guarda, verifica si los datos del objeto que son necesarios son iguales, sino que no lo guarde
            let hallazgoTmp = this.hallazgos[index];
            //console.log(hallazgoTmp);
            Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
            this.$http.put('/hallazgo/' + id_hallazgo, hallazgoTmp).then(response => {
               //console.log(response.body);
               var self = this;
               setTimeout(function () {
                  //self.$parent.$options.methods.fetchHallazgos();
                  //Cuando guarda hallazgo sin asociar procedimiento disciplinario
                  //self.$parent.fetchHallazgos();
                  self.fetchHallazgos();
                  self.form_hallazgo_editable = 0;

               }, 500);

            }, response => {
               // error callback
            });
            //if()
         } else {
            //Lo guarda
         }
      },
      validar_dentro_del_ano: function (date) {
         if (date.indexOf(new Date().getFullYear()) > 0) {
            return true;
         }
         return false;
      },
   },
});

const CompromisoController = new Vue({
   el: '#CompromisoController',
   data(){
      return {
         'area_proceso_auditado': [],
         'proceso_auditado': {},

         'hallazgos': {},
         'hallazgosTmp': {},
         'hallazgo': {},

         'compromisos': [],
         'compromisosTmp': [],
         'compromiso': [],

         'compromisos_responsables': [],
         'compromisos_responsablesTmp': [],

         'porcentajes_cumplimiento': {0: 0, 1: 10, 2: 20, 3: 30, 4: 40, 5: 50, 6: 60, 7: 70, 8: 80, 9: 90, 10: 100},

         'seguimientos': {},
         'seguimientosTmp': {},
         'seguimiento': {},

         'archivos': {},
         'archivosTmp': {},

         'usuarios': [],
         'config': [],
         'auth': [],
         'role': [],
         'auditor': [],

         'index': 0,
         'ctd_hallazgos': 0,
         'ctd_compromisos': 0,
         'ctd_seguimientos': 0,
         'ctd_req_hallazgos': 0,

         'nuevo_seguimiento': {
            'id_compromiso': '',
            'diferencia_tiempo': '',
            'documento_adjunto': {},
            'usuario_registra': 1,
            'estado': '',
            'condicion': '',
            'porcentaje_avance': '',
            'razon_no_cumplimiento': '',
            'observacion': '',
            'plazo_estimado': '',
            'plazo_comprometido': '',
         },

         'nuevo_compromiso': {
            'id_hallazgo': '',
            'nomenclatura': '',
            'plazo_estimado': '',
            'plazo_comprometido': '',
            'nombre_compromiso': '',
            'responsable': '',
            'email_responsable': '',
            'fono_responsable': '',
         },

         'filterTerm': '',
         'filterIdCompromiso': '',
         'filterIdHallazgo': '',

         'form_compromiso_editable': 0,
         'form_compromiso_creable': 0,
         'form_seguimiento_creable': 0,
         'gridOrder': 'asc',

         'mensajeResultadoConFiltros': false,
         'filtroNomenclatura': false,
         'filtroEstado': false,
         'filtroCondicion': false,
         'filtroIdHallazgo': false,
         'filtroIdCompromiso': false,
         'showModal': false,
         'showModalNuevoSeguimiento': false,
         'showModalNuevoCompromiso': false,
         'showModalEditarCompromiso': false,
         'permiteGuardarNuevoCompromiso': true,
         'permiteGuardarNuevoSeguimiento': true,

         'spinner_upload': false,

         'compromisosFiltroNomenclatura': {},
         'compromisosFiltroEstado': {},
         'compromisosFiltroCondicion': {},
         'compromisosFiltroIdHallazgo': {},
         'compromisosFiltroIdCompromiso': {},


         'excel_json_fields': {
            'id_compromiso': 'String',
            'id_hallazgo': 'String',
            'hallazgo': 'String',
            'nomenclatura': 'String',
            'compromiso': 'String',
            'plazo_estimado': 'String',
            'plazo_comprometido': 'String',
            'seguimientos': 'String',
            'seg.reprogramados': 'String',
            'estado': 'String',
            'condicion': 'String',
            'porcentaje_avance': 'String',
            'ultimo_seguimiento': 'String',
         },
         excel_json_data: [],
         excel_data_count: '',
         append_to_json_excel: {},

         _gcf: gcf,
      }
   },
   computed: {},
   watch: {
      compromisos: function (compromisos) {
         var self = this;
         this.excel_json_data = [];
         return compromisos.map(function (c, index) {
            return self.excel_json_data.push({
               'id_compromiso': c.id_compromiso,
               'id_hallazgo': c.id_hallazgo,
               'hallazgo': gcf.findHallazgoById(self.hallazgos, c.id_hallazgo).nombre_hallazgo,
               'nomenclatura': c.nomenclatura,
               'compromiso': c.nombre_compromiso,
               'plazo_estimado': c.plazo_estimado,
               'plazo_comprometido': c.plazo_comprometido,
               'seguimientos': self.seguimiento_no_reprogramado(c),
               'seg.reprogramados': self.seguimiento_reprogramado(c),
               'estado': c.seguimiento[c.seguimiento.length - 1].estado,
               'condicion': c.seguimiento[c.seguimiento.length - 1].condicion,
               'porcentaje_avance': c.seguimiento[c.seguimiento.length - 1].porcentaje_avance || 0,
               'ultimo_seguimiento': c.updated_at,
            });
         });
      },
      showModalEditarCompromiso: function (showModalEditarCompromiso) {
         if (showModalEditarCompromiso == false) {
            this.fetchCompromisos();
         }
      },
   },
   components: {
      'download-excel': {
         props: {
            'data': {
               type: Array,
               required: true
            },
            'excel_json_fields': {
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
               for (var colName in this.excel_json_fields) {
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
                     xml += '    <ss:Data ss:Type="' + this.excel_json_fields[col] + '">';
                     xml += String(data[row][col]).replace(/[^a-zA-Z0-9\s\-ñíéáóú\#\,\.\;\:ÑÍÉÓÁÚ]/g, '') + '</ss:Data>\n';
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
      'spinner': {
         props: [''],
         'name': 'spinner',
         'template': `
         <div class="loader text-center">Cargando tabla, espere por favor...</div>
      `,
         data () {
            return {
               visible: false,
            }
         },
         ready () {
         },
         created(){
         },
         filters: {},
         methods: {},
      },
      'mini-spinner': {
         props: [''],
         'name': 'mini-spinner',
         'template': `
         <div class="loader-mini text-center">Cargando tabla, espere por favor...</div>
      `,
         data () {
            return {
               visible: false,
            }
         },
         ready () {
         },
         created(){
         },
         filters: {},
         methods: {},
      },
      'modal': {
         props: ['compromiso', 'config'],
         template: `
			<!-- template for the modal component -->
			  	<transition name="modal">
				 	<div class="modal-mask">
						<div class="modal-wrapper">
					  		<div class="modal-container">

						 		<div class="modal-header">
									<slot name="header"></slot>
								</div>

						 		<div class="modal-body">
									<slot name="body">
                              <dl class="dl-vertical">
                                 <div class="row">
                                    <div style="overflow-y: scroll;max-height: 400px;">
                                       <div class="col-md-6">
                                          <dt>Id del Hallazgo</dt>
                                          <dd class="well well-sm">{{compromiso.id_hallazgo || '0'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Id del Compromiso</dt>
                                          <dd class="well well-sm">{{compromiso.id_compromiso || '0'}}</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Nombre del Hallazgo</dt>
                                          <dd class="well well-sm">{{compromiso.nombre_hallazgo || 'No definido'}}</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Nombre del Compromiso</dt>
                                          <dd class="well well-sm">{{compromiso.nombre_compromiso || 'No Ingresado'}}</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Nomenclatura</dt>
                                          <dd class="well well-sm">{{compromiso.nomenclatura || 'No definido'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Plazo Estimado</dt>
                                          <dd class="well well-sm">{{compromiso.plazo_estimado || 'Sin Ingresar'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Plazo Comprometido</dt>
                                          <dd class="well well-sm">{{compromiso.plazo_comprometido || 'Sin Ingresar'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Seguimientos</dt>
                                          <dd class="well well-sm">{{compromiso.seguimiento_no_reprogramado || '0'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Seguimientos Reprogramados</dt>
                                          <dd class="well well-sm">
                                             <span v-if="compromiso.seguimiento_reprogramado<=config.cantidad_veces_alerta_reprogramados">
                                                {{ compromiso.seguimiento_reprogramado }} de
                                                {{ config.cantidad_veces_alerta_reprogramados}} veces permitidas.
                                                </span>
                                                <span v-else>
                                                Haz superado la cantidad de reprogramaciones permitidas
                                                <b style="color:red;">@{{ compromiso.seguimiento_reprogramado }}</b> de
                                                {{ config.cantidad_veces_alerta_reprogramados}} veces permitidas.
                                             </span>
                                          </dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Estado</dt>
                                          <dd class="well well-sm">{{compromiso.estado || 'Sin Ingreso de Seguimientos'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Condicion</dt>
                                          <dd class="well well-sm">{{compromiso.condicion || 'Sin Ingreso de Seguimientos'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Porcentaje Avance</dt>
                                          <dd class="well well-sm">{{compromiso.porcentaje_avance || '0'}}%</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Fecha ultimo Seguimiento</dt>
                                          <dd class="well well-sm">{{compromiso.updated_at || 'Sin definir'}}</dd>
                                       </div>
                                    </div><!-- styled -->
                                 </div><!-- .row -->
                              </dl>
									</slot>
						 		</div>

								<!--
								 <div class="modal-footer">
									<slot name="footer">
									  <button class="btn btn-sm btn-success" @click="$emit('close')">
										 Aceptar
									  </button>
									</slot>
								 </div>
								-->
					  		</div>
						</div>
				 	</div>
			  	</transition>
			`,
         name: 'modal',
         data () {
            return {}
         },
         ready () {
         },
         created () {
         },
         methods: {},
         watch: {},
      },
      'modal-nuevoseguimiento': {
         props: ['nuevo_seguimiento', 'porcentajes_cumplimiento', 'auth'],
         template: `
				<!-- template for the modal component -->
			  	<transition name="modal">
				 	<div class="modal-mask">
						<div class="modal-wrapper">
					  		<div class="modal-container">

						 		<div class="modal-header">
									<slot name="header"></slot>
						 		</div>
						 		<div class="modal-body">
									<slot name="body">
                              <dl class="dl-vertical" style="margin: 20px;">
                                 <div class="row">
                                    <div style="overflow-y: scroll;max-height: 400px;">
                                       <div class="col-md-6">

                                       	<!-- Diferencia de tiempo -->
                                          <dt>Diferencia de tiempo: <small>(En dias)</small></dt>
                                          <dd class="well well-sm" style="max-height: 33px !important;margin-bottom: 10px !important;">
                                             {{nuevo_seguimiento.diferencia_tiempo}}
                                          </dd>

                                          <!-- Condicion -->
                                          <dt>Condicion (*):</dt>
                                          <dd v-if="auth.role != undefined && auth.role.role != 'Usuario Auditado'">
                                             <p class="control has-icon has-icon-right">
                                                <select name="condicion" v-model="nuevo_seguimiento.condicion"
                                                      v-validate="'required'" data-vv-delay="500"
                                                      :class="{'input': true, 'text-danger': errors.has('condicion'), 'form-control':true}">
                                                   <option value="No Evaluado">No Evaluado</option>
                                                   <option value="Asume Riesgo">Asume Riesgo</option>
                                                   <option value="Cumplida">Cumplida</option>
                                                   <option value="Cumplida Parcial">Cumplida Parcial</option>
                                                   <option value="No Cumplida">No Cumplida</option>
                                                   <option value="Reprogramado">Reprogramado</option>
                                                </select>
                                                <transition name="bounce">
                                                <i v-show="errors.has('condicion')" class="fa fa-warning"></i>
                                                </transition>
                                                <transition name="bounce">
                                                <span v-show="errors.has('condicion')" class="text-danger">
                                                   {{ errors.first('condicion') }}
                                                </span>
                                                </transition>
                                             </p>
                                          </dd>
                                          <dd v-else class="well well-sm">{{nuevo_seguimiento.condicion}}</dd>

														<div v-show="nuevo_seguimiento.estado == 'Reprogramado'">
															<dt>Plazo Estimado (*):</dt>
															<dd>
																<p class="control has-icon has-icon-right">
																	<input name="plazo_estimado" type="text" id="ncpe4"
																			v-validate="'required'" data-vv-delay="500"
																			class="form-control" />
																	<transition name="bounce">
																	<i v-show="errors.has('plazo_estimado')" class="fa fa-warning"></i>
																	</transition>
																	<transition name="bounce">
																	<span v-show="errors.has('plazo_estimado')" class="text-danger">
																		{{ errors.first('plazo_estimado') | replacePlazoEstimado }}
																	</span>
																	</transition>
																</p>
															</dd>
														</div>

                                          <!-- Razon no Cumplimiento -->
                                          <dt>Razon no Cumplimiento:</dt>
                                          <dd>
                                             <textarea class="scroll_textarea_original" rows="5"
                                                       v-model="nuevo_seguimiento.razon_no_cumplimiento">
                                                @{{ nuevo_seguimiento.razon_no_cumplimiento }}
                                             </textarea>
                                          </dd>


                                          <!-- Documentos Adjuntos -->
                                          <dt>Documentos Adjuntos:</dt>
                                          <dd>
                                             <input multiple="multiple" name="documento_adjunto[]" type="file"
                                                      @change="onFileChange" size="10">
                                          </dd>

                                       </div><!-- .col-md-* -->


                                       <div class="col-md-6">

                                      		<!-- Porcentaje de Avance -->
                                          <dt>Porcentaje de Avance (*):</dt>
                                          <dd v-if="auth.role != undefined && auth.role.role != 'Usuario Auditado'">
                                             <p class="control has-icon has-icon-right">
                                                <select name="porcentaje_avance" v-model="nuevo_seguimiento.porcentaje_avance"
                                                      v-validate="'required'" data-vv-delay="500"
                                                      :class="{'input': true, 'text-danger': errors.has('porcentaje_avance'),
                                                      'form-control':true}">

                                                   <option v-for="p in porcentajes_cumplimiento"
                                                           :value="p">
                                                      {{ p }}%
                                                   </option>
                                                </select>
                                                <transition name="bounce">
                                                <i v-show="errors.has('porcentaje_avance')" class="fa fa-warning"></i>
                                                </transition>
                                                <transition name="bounce">
                                                <span v-show="errors.has('porcentaje_avance')" class="text-danger">
                                                   {{ errors.first('porcentaje_avance') | replacePorcentajeAvance }}
                                                </span>
                                                </transition>
                                             </p>
                                          </dd>
                                          <dd v-else class="well well-sm">{{nuevo_seguimiento.porcentaje_avance || 0}}</dd>

                                          <!-- Estado -->
                                          <dt>Estado (*):</dt>
                                          <dd v-if="auth.role != undefined && auth.role.role != 'Usuario Auditado'">
                                             <p class="control has-icon has-icon-right">
                                                <select name="estado" v-model="nuevo_seguimiento.estado"
                                                      v-validate="'required'" data-vv-delay="500"
                                                      :class="{'input': true, 'text-danger': errors.has('estado'), 'form-control':true}">
                                                   <option value="Reprogramado">Reprogramado</option>
                                                   <option value="Vencido">Vencido</option>
                                                   <option value="Finalizado">Finalizado</option>
                                                   <option value="Vigente">Vigente</option>
                                                   <option value="Suscripcion">Suscripcion</option>
                                                </select>
                                                <transition name="bounce">
                                                <i v-show="errors.has('estado')" class="fa fa-warning"></i>
                                                </transition>
                                                <transition name="bounce">
                                                <span v-show="errors.has('estado')" class="text-danger">
                                                   {{ errors.first('estado') }}
                                                </span>
                                                </transition>
                                             </p>
                                          </dd>
                                          <dd v-else class="well well-sm">{{nuevo_seguimiento.estado}}</dd>


														<div v-show="nuevo_seguimiento.estado == 'Reprogramado'">
															<dt>Plazo Comprometido (*):</dt>
															<dd>
																<p class="control has-icon has-icon-right">
																	<input name="plazo_comprometido" type="text" id="ncpc4"
																			v-validate="'required'" data-vv-delay="500"
																			class="form-control" />

																	<transition name="bounce">
																	<i v-show="errors.has('plazo_comprometido')" class="fa fa-warning"></i>
																	</transition>
																	<transition name="bounce">
																	<span v-show="errors.has('plazo_comprometido')" class="text-danger">
																		{{ errors.first('plazo_comprometido') | replacePlazoComprometido }}
																	</span>
																	</transition>
																</p>
															</dd>
														</div>


                                          <!-- Observacion -->
                                          <dt>Observacion:</dt>
                                          <dd>
                                             <textarea class="scroll_textarea_original" rows="5" v-model="nuevo_seguimiento.observacion">
                                                @{{ nuevo_seguimiento.observacion }}
                                             </textarea>
                                          </dd>
                                       </div>

                                    </div><!-- styled -->
                                 </div><!-- .row -->
                              </dl>
									</slot>
						 		</div><!-- .modal-body -->
								<div class="modal-footer">
									<slot name="footer">
										<!--
										<button class="btn btn-sm btn-success" @click="$emit('close')">
											Aceptar
										</button>
										-->
										Los campos con <b>*</b> son obligatorios
									</slot>
								</div>
					  		</div>
						</div>
				 	</div>
			  	</transition>
			`,
         name: 'modal-nuevoseguimiento',
         data () {
            return {}
         },
         ready () {
         },
         created () {
            var self = this;
            var date = new Date();
            var dd = date.getDate();
            var mm = date.getMonth() + 1; //January is 0!
            var yyyy = date.getFullYear();
            this.min_date = yyyy + "-" + ((mm < 10) ? '0' + mm : mm) + "-" + ((dd < 10) ? '0' + dd : dd);

            $(document).ready(function () {

               // #ncpe => nuevo compromiso plazo estimado
               $('#ncpe4').datepicker({//ncpe => nuevo compromiso plazo estimado
                  format: "dd-mm-yyyy",
                  language: "es",
                  startDate: (function () {
                     return date = (function () {
                        var date = new Date();
                        date.setDate(date.getDate());
                        return date;
                     })();
                  })(),
                  autoclose: true,
               });

               $('#ncpe4').change(function () {//ncpe => nuevo compromiso plazo estimado
                  if ($('#ncpe4').val()) {

                     //hacer la validacion si es menor a la fecha actual, no avisar pero colocar la fecha que corresponde
                     var date_ncpe = $('#ncpe4').val().split('-');

                     var date_today = new Date();
                     var dd = date_today.getDate();
                     var mm = date_today.getMonth() + 1; //January is 0!
                     var yyyy = date_today.getFullYear();

                     if (date_ncpe.length == 3) {
                        if (date_ncpe[1].length != 2 || date_ncpe[0].length != 2 || date_ncpe[2].length != 4) {
                           $('#ncpe4').prop('value', ((dd < 10) ? '0' + dd : dd) + '-' + ((mm < 10) ? '0' + mm : mm) + '-' + yyyy);
                           self.nuevo_seguimiento.plazo_estimado = ((dd < 10) ? '0' + dd : dd) + '-' + ((mm < 10) ? '0' + mm : mm) + '-' + yyyy;
                           return;
                        }
                     }

                     var date_today = new Date(mm + '/' + dd + '/' + yyyy);
                     date_ncpe = new Date(date_ncpe[1] + '/' + date_ncpe[0] + '/' + date_ncpe[2]);

                     var timeDiff = date_today.getTime() - date_ncpe.getTime();//Math.abs(date_ncpe.getTime() - date_ncpc.getTime());
                     var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                     //console.log(diffDays);

                     if (diffDays < 0) {
                        $('#ncpc4').data('datepicker').setStartDate($('#ncpe4').val());
                        self.nuevo_seguimiento.plazo_estimado = $('#ncpe4').val();
                     } else {
                        $('#ncpe4').prop('value', ((dd < 10) ? '0' + dd : dd) + '-' + ((mm < 10) ? '0' + mm : mm) + '-' + yyyy);
                        self.nuevo_seguimiento.plazo_estimado = ((dd < 10) ? '0' + dd : dd) + '-' + ((mm < 10) ? '0' + mm : mm) + '-' + yyyy;
                     }

                     //Si es que ya se habia ingresado el plazo comprometido, valida el rango
                     if ($('#ncpc4').val()) {
                        var date_ncpc = $('#ncpc4').val().split('-');
                        date_ncpc = new Date(date_ncpc[1] + '/' + date_ncpc[0] + '/' + date_ncpc[2]);

                        var timeDiff = date_ncpc.getTime() - date_ncpe.getTime();//Math.abs(date_ncpe.getTime() - date_ncpc.getTime());
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                        if (diffDays < 0) {
                           alert('El plazo comprometido no puede ser menor al plazo estimado ni a la fecha actual');
                           $('#ncpc4').prop('value', null);
                           self.nuevo_seguimiento.plazo_comprometido = '';
                        }
                     }

                  }
               });


               // #ncpc => nuevo compromiso plazo comprometido
               $('#ncpc4').datepicker({//ncpc => nuevo compromiso plazo comprometido
                  format: "dd-mm-yyyy",
                  language: "es",
                  startDate: new Date(),
                  autoclose: true,
               });

               $('#ncpc4').click(function (event) {
                  if ($('#ncpe4').val()) {
                     $('#ncpc4').data('datepicker').setStartDate($('#ncpe4').val());
                  }
               });

               $('#ncpc4').change(function (event) {
                  var date_ncpe = $('#ncpe4').val().split('-');
                  date_ncpe = new Date(date_ncpe[1] + '/' + date_ncpe[0] + '/' + date_ncpe[2]);

                  var date_ncpc = $('#ncpc4').val().split('-');
                  date_ncpc = new Date(date_ncpc[1] + '/' + date_ncpc[0] + '/' + date_ncpc[2]);

                  var timeDiff = date_ncpc.getTime() - date_ncpe.getTime();//Math.abs(date_ncpe.getTime() - date_ncpc.getTime());
                  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                  if (diffDays < 0) {
                     alert('El plazo comprometido no puede ser menor al plazo estimado ni a la fecha actual');
                     $('#ncpc4').prop('value', null);
                  }

                  self.nuevo_seguimiento.plazo_comprometido = $('#ncpc4').val();
               });

            });
         },
         filters: {
            replacePorcentajeAvance(porcentaje_avance) {
               if (porcentaje_avance != null) {
                  porcentaje_avance = porcentaje_avance.replace('porcentaje_avance', 'porcentaje de avance');
               }
               return porcentaje_avance;
            },
            replacePlazoComprometido(plazo_comprometido) {
               if (plazo_comprometido != null) {
                  plazo_comprometido = plazo_comprometido.replace('plazo_comprometido', 'para el plazo comprometido');
               }
               return plazo_comprometido;
            },
            replacePlazoEstimado(plazo_estimado) {
               if (plazo_estimado != null) {
                  plazo_estimado = plazo_estimado.replace('plazo_estimado', ' para el plazo estimado');
               }
               return plazo_estimado;
            },
         },
         methods: {
            createImage: function (file) {
               var image = new Image();
               var reader = new FileReader();
               var vm = this;

               reader.onload = (e) => {
                  vm.image = e.target.result;
               };
               reader.readAsDataURL(file);
            },
            onFileChange: function (e) {
               var files = e.target.files || e.dataTransfer.files;
               var filesOverSizeLimit = [];
               var filesOk = [];

               $(files).each(function (f) {
                  //console.log(files[f].size); //tamaño
                  //console.log(files[f].name); //nombre
                  if (files[f].size > 10240000) {
                     filesOverSizeLimit.push(files[f]);
                  } else {
                     filesOk.push(files[f]);
                  }
               });

               if (filesOverSizeLimit.length > 0) {
                  let textNameFilesOverSizeLimit = '';
                  let textNameFilesOk = '';
                  $(filesOverSizeLimit).each(function (f) {
                     textNameFilesOverSizeLimit += "\n · " + filesOverSizeLimit[f].name;
                  });
                  $(filesOk).each(function (f) {
                     textNameFilesOk += "\n · " + filesOk[f].name;
                  });
                  alert(`
							Los siguientes archivos exceden el limite de memoria por archivo: ${textNameFilesOverSizeLimit}
							\n
							Los siguientes archivos estan permitidos: ${textNameFilesOk}
						`);
               }

               if (!filesOk.length)
                  return;
               this.nuevo_seguimiento.documento_adjunto = filesOk;
               //this.createImage(files[0]);
            },
         },
         watch: {},
      },
      'modal-nuevocompromiso': {
         props: ['nuevo_compromiso'],
         template: `
			<!-- template for the modal component -->
			  <transition name="modal">
				 <div class="modal-mask">
					<div class="modal-wrapper">
					  <div class="modal-container">

						 <div class="modal-header">
							<slot name="header">

							</slot>
						 </div>

						 <div class="modal-body">
							<slot name="body">
                        <dl class="dl-vertical" style="margin: 20px;">
                           <div class="row">
									   <div style="overflow-y: scroll;max-height: 400px;">
                                 <div class="col-md-12">
                                    <dt>Nomenclatura (*):</dt>
                                    <dd>
                                       <p class="control has-icon has-icon-right">
                                          <select name="nomenclatura" v-model="nuevo_compromiso.nomenclatura"
                                             v-validate="'required'" data-vv-delay="500"
                                             :class="{'input': true, 'text-danger': errors.has('nomenclatura'), 'form-control':true}">
                                             <option value="PMG">PMG</option>
                                             <option value="NO PMG">NO PMG</option>
                                             <option value="REPROG.">REPROG.</option>
                                             <option value="Contraloría General de la República">
                                                Contraloría General de la República
                                             </option>
                                          </select>
                                          <transition name="bounce">
                                          <i v-show="errors.has('nomenclatura')" class="fa fa-warning"></i>
                                          </transition>
                                          <transition name="bounce">
                                          <span v-show="errors.has('nomenclatura')" class="text-danger">
                                             {{ errors.first('nomenclatura') }}
                                          </span>
                                          </transition>
                                       </p>
                                    </dd>
                                 </div>
                                 <div class="col-md-12">
                                    <dt>Nombre Compromiso (*):</dt>
                                    <dd>
                                       <p class="control has-icon has-icon-right">
                                          <textarea name="nombre_compromiso" rows="7"
                                                   :class="{'input': true, 'text-danger': errors.has('nombre_compromiso'),
                                                    'scroll_textarea_original':true}"
                                                    v-validate="'required'" data-vv-delay="500"
                                                    v-model="nuevo_compromiso.nombre_compromiso"
                                                    :value="nuevo_compromiso.nombre_compromiso">
                                          </textarea>
                                          <transition name="bounce">
                                          <i v-show="errors.has('nombre_compromiso')" class="fa fa-warning"></i>
                                          </transition>
                                          <transition name="bounce">
                                          <span v-show="errors.has('nombre_compromiso')" class="text-danger">
                                             {{ errors.first('nombre_compromiso') | replaceNombreCompromiso }}
                                          </span>
                                          </transition>
                                       </p>
                                    </dd>
                                 </div>
                                 <div class="col-md-6">
                                    <dt>Plazo Estimado (*):</dt>
                                    <dd>
                                       <p class="control has-icon has-icon-right">
                                          <input name="plazo_estimado" type="text" id="ncpe2"
                                                v-validate="'required'" data-vv-delay="500"
                                                class="form-control" />

                                          <transition name="bounce">
                                          <i v-show="errors.has('plazo_estimado')" class="fa fa-warning"></i>
                                          </transition>
                                          <transition name="bounce">
                                          <span v-show="errors.has('plazo_estimado')" class="text-danger">
                                             {{ errors.first('plazo_estimado') | replacePlazoEstimado }}
                                          </span>
                                          </transition>
                                       </p>
                                    </dd>
                                 </div>
                                 <div class="col-md-6">
                                    <dt>Plazo Comprometido (*):</dt>
                                    <dd>
                                       <p class="control has-icon has-icon-right">
                                          <input name="plazo_comprometido" type="text" id="ncpc2"
                                                v-validate="'required'" data-vv-delay="500"
                                                class="form-control" />

                                          <transition name="bounce">
                                          <i v-show="errors.has('plazo_comprometido')" class="fa fa-warning"></i>
                                          </transition>
                                          <transition name="bounce">
                                          <span v-show="errors.has('plazo_comprometido')" class="text-danger">
                                             {{ errors.first('plazo_comprometido') | replacePlazoComprometido }}
                                          </span>
                                          </transition>
                                       </p>
                                    </dd>
                                 </div>
                              </div><!-- styled -->
                           </div><!-- .row -->
                        </dl>
							</slot>
						 </div>

						 <div class="modal-footer">
							<slot name="footer">
								<!--
							  	<button class="btn btn-sm btn-success" @click="$emit('close')">
									Aceptar
							  	</button>
							  	-->
							  	Los campos con <b>*</b> son obligatorios
							</slot>
						 </div>
					  </div>
					</div>
				 </div>
			  </transition>
			`,
         name: 'modal-nuevocompromiso',
         data () {
            return {}
         },
         ready () {
         },
         created () {
            var self = this;
            var date = new Date();
            var dd = date.getDate();
            var mm = date.getMonth() + 1; //January is 0!
            var yyyy = date.getFullYear();
            this.min_date = yyyy + "-" + ((mm < 10) ? '0' + mm : mm) + "-" + ((dd < 10) ? '0' + dd : dd);

            $(document).ready(function () {

               // #ncpe => nuevo compromiso plazo estimado
               $('#ncpe2').datepicker({//ncpe => nuevo compromiso plazo estimado
                  format: "dd-mm-yyyy",
                  language: "es",
                  startDate: (function () {
                     return date = (function () {
                        var date = new Date();
                        date.setDate(date.getDate());
                        return date;
                     })();
                  })(),
                  autoclose: true,
               });

               $('#ncpe2').change(function () {//ncpe => nuevo compromiso plazo estimado
                  if ($('#ncpe2').val()) {

                     //hacer la validacion si es menor a la fecha actual, no avisar pero colocar la fecha que corresponde
                     var date_ncpe = $('#ncpe2').val().split('-');

                     var date_today = new Date();
                     var dd = date_today.getDate();
                     var mm = date_today.getMonth() + 1; //January is 0!
                     var yyyy = date_today.getFullYear();

                     if (date_ncpe.length == 3) {
                        if (date_ncpe[1].length != 2 || date_ncpe[0].length != 2 || date_ncpe[2].length != 4) {
                           $('#ncpe2').prop('value', ((dd < 10) ? '0' + dd : dd) + '-' + ((mm < 10) ? '0' + mm : mm) + '-' + yyyy);
                           self.nuevo_compromiso.plazo_estimado = ((dd < 10) ? '0' + dd : dd) + '-' + ((mm < 10) ? '0' + mm : mm) + '-' + yyyy;
                           return;
                        }
                     }

                     var date_today = new Date(mm + '/' + dd + '/' + yyyy);
                     date_ncpe = new Date(date_ncpe[1] + '/' + date_ncpe[0] + '/' + date_ncpe[2]);

                     var timeDiff = date_today.getTime() - date_ncpe.getTime();//Math.abs(date_ncpe.getTime() - date_ncpc.getTime());
                     var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                     //console.log(diffDays);

                     if (diffDays < 0) {
                        $('#ncpc2').data('datepicker').setStartDate($('#ncpe2').val());
                        self.nuevo_compromiso.plazo_estimado = $('#ncpe2').val();
                     } else {
                        $('#ncpe2').prop('value', ((dd < 10) ? '0' + dd : dd) + '-' + ((mm < 10) ? '0' + mm : mm) + '-' + yyyy);
                        self.nuevo_compromiso.plazo_estimado = ((dd < 10) ? '0' + dd : dd) + '-' + ((mm < 10) ? '0' + mm : mm) + '-' + yyyy;
                     }

                     //Si es que ya se habia ingresado el plazo comprometido, valida el rango
                     if ($('#ncpc2').val()) {
                        var date_ncpc = $('#ncpc2').val().split('-');
                        date_ncpc = new Date(date_ncpc[1] + '/' + date_ncpc[0] + '/' + date_ncpc[2]);

                        var timeDiff = date_ncpc.getTime() - date_ncpe.getTime();//Math.abs(date_ncpe.getTime() - date_ncpc.getTime());
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                        if (diffDays < 0) {
                           alert('El plazo comprometido no puede ser menor al plazo estimado ni a la fecha actual');
                           $('#ncpc2').prop('value', null);
                           self.nuevo_compromiso.plazo_comprometido = '';
                        }
                     }

                  }
               });

               // #ncpc => nuevo compromiso plazo comprometido
               $('#ncpc2').datepicker({//ncpc => nuevo compromiso plazo comprometido
                  format: "dd-mm-yyyy",
                  language: "es",
                  startDate: new Date(),
                  autoclose: true,
               });

               $('#ncpc2').click(function (event) {
                  if ($('#ncpe2').val()) {
                     $('#ncpc2').data('datepicker').setStartDate($('#ncpe2').val());
                  }
               });

               $('#ncpc2').change(function (event) {
                  var date_ncpe = $('#ncpe2').val().split('-');
                  date_ncpe = new Date(date_ncpe[1] + '/' + date_ncpe[0] + '/' + date_ncpe[2]);

                  var date_ncpc = $('#ncpc2').val().split('-');
                  date_ncpc = new Date(date_ncpc[1] + '/' + date_ncpc[0] + '/' + date_ncpc[2]);

                  var timeDiff = date_ncpc.getTime() - date_ncpe.getTime();//Math.abs(date_ncpe.getTime() - date_ncpc.getTime());
                  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                  if (diffDays < 0) {
                     alert('El plazo comprometido no puede ser menor al plazo estimado ni a la fecha actual');
                     $('#ncpc2').prop('value', null);
                  }

                  self.nuevo_compromiso.plazo_comprometido = $('#ncpc2').val();
               });

            });

         },
         filters: {
            replaceFono(fono) {
               if (fono != null) {
                  fono = fono.replace('fono_responsable', 'telefono');
               }
               return fono;
            },
            replacePlazoComprometido(plazo_comprometido) {
               if (plazo_comprometido != null) {
                  plazo_comprometido = plazo_comprometido.replace('plazo_comprometido', 'para el plazo comprometido');
               }
               return plazo_comprometido;
            },
            replacePlazoEstimado(plazo_estimado) {
               if (plazo_estimado != null) {
                  plazo_estimado = plazo_estimado.replace('plazo_estimado', ' para el plazo estimado');
               }
               return plazo_estimado;
            },
            replaceNombreCompromiso(nombre_compromiso) {
               if (nombre_compromiso != null) {
                  nombre_compromiso = nombre_compromiso.replace('nombre_compromiso', 'para el nombre del compromiso');
               }
               return nombre_compromiso;
            },
         },
         methods: {},
         watch: {},
      },
      'modal-editarcompromiso': {
         props: ['compromiso', 'config', 'auth', 'role', 'auditor', 'usuarios', 'area_proceso_auditado',
            'compromisos_responsables', 'proceso_auditado', 'responsable_controller', 'compromisos', 'hallazgos'],
         template: `
         <!-- template for the modal component -->
         <transition name="modal">
            <div class="modal-mask">
               <div class="modal-wrapper">
                  <div class="modal-container">

                     <div class="modal-header">
                        <slot name="header">

                        </slot>
                     </div>

                     <div class="modal-body" style="overflow-y: scroll;max-height: 400px;">
                        <slot name="body">
                           <dl class="dl-vertical" style="margin: 20px;">
                              <div class="row">
                                 <div>
                                    <div class="col-md-6">
                                       <dt>Id Hallazgo:</dt>
                                       <dd class="well well-sm">
                                          {{compromiso.id_hallazgo}}
                                       </dd>
                                    </div>
                                    <div class="col-md-6">
                                       <dt>Id Compromiso:</dt>
                                       <dd class="well well-sm">
                                          {{compromiso.id_compromiso}}
                                       </dd>
                                    </div>
                                    <div class="col-md-12">
                                       <dt>Nombre del Hallazgo al que pertenece:</dt>
                                       <dd class="well well-sm">
                                          {{compromiso.nombre_hallazgo}}
                                       </dd>
                                    </div>
                                    <div class="col-md-12">
                                       <dt>Nombre del compromiso (*):</dt>
                                       <dd>
                                          <p class="control has-icon has-icon-right">
                                             <textarea name="nombre_compromiso" rows="5"
                                                :class="{'input': true, 'text-danger': errors.has('nombre_compromiso'),
                                                'scroll_textarea_original':true}"
                                                v-validate="'required'" data-vv-delay="500"
                                                v-model="compromiso.nombre_compromiso">
                                                {{ compromiso.nombre_compromiso }}
                                             </textarea>
                                             <transition name="bounce">
                                             <i v-show="errors.has('nombre_compromiso')" class="fa fa-warning"></i>
                                             </transition>
                                             <transition name="bounce">
                                             <span v-show="errors.has('nombre_compromiso')" class="text-danger">
                                                {{ errors.first('nombre_compromiso') | replaceNombreCompromiso }}
                                             </span>
                                             </transition>
                                          </p>
                                       </dd>
                                    </div>
                                    <div class="col-md-12">
                                       <dt>Nomenclatura (*):</dt>
                                       <dd>
                                          <p class="control has-icon has-icon-right">
                                             <select name="nomenclatura" v-model="compromiso.nomenclatura"
                                                   v-validate="'required'" data-vv-delay="500"
                                                   :class="{'input': true, 'text-danger': errors.has('nomenclatura'), 'form-control':true}">
                                                <option value="PMG">PMG</option>
                                                <option value="NO PMG">NO PMG</option>
                                                <option value="REPROG.">REPROG.</option>
                                                <option value="Contraloría General de la República">
                                                   Contraloría General de la República
                                                </option>
                                             </select>
                                             <transition name="bounce">
                                             <i v-show="errors.has('nomenclatura')" class="fa fa-warning"></i>
                                             </transition>
                                             <transition name="bounce">
                                             <span v-show="errors.has('nomenclatura')" class="text-danger">
                                                {{ errors.first('nomenclatura') }}
                                             </span>
                                             </transition>
                                          </p>
                                       </dd>
                                    </div>
                                 </div><!-- styled -->
                              </div><!-- .row -->

                              <button v-if="loadMore == false" class="btn btn-xs btn-success"
                                 @click.prevent="loadMoreFields">
                                 Ver mas campos
                              </button>
                              <button v-else class="btn btn-xs btn-warning"
                                 @click.prevent="loadMoreFields">
                                 Ocultar demas campos
                              </button>
                              <br /><br />

                              <div class="row" v-show="loadMore == true">
                                 <div>
                                    <div class="col-md-6">
                                       <dt>Plazo estimado:</dt>
                                       <dd class="well well-sm">
                                          {{compromiso.plazo_estimado}}
                                       </dd>
                                    </div>
                                    <div class="col-md-6">
                                       <dt>Plazo comprometido:</dt>
                                       <dd class="well well-sm">
                                          {{compromiso.plazo_comprometido}}
                                       </dd>
                                    </div>
                                    <div class="col-md-6">
                                       <dt>Seguimientos:</dt>
                                       <dd class="well well-sm">
                                          {{compromiso.seguimiento_no_reprogramado}}
                                       </dd>
                                    </div>
                                    <div class="col-md-6">
                                       <dt>Seguimientos reprogramados:</dt>
                                       <dd class="well well-sm">
                                          {{compromiso.seguimiento_reprogramado}}
                                       </dd>
                                    </div>
                                    <div class="col-md-6">
                                       <dt>Estado:</dt>
                                       <dd class="well well-sm">
                                          {{compromiso.estado}}
                                       </dd>
                                    </div>
                                    <div class="col-md-6">
                                       <dt>Condicion:</dt>
                                       <dd class="well well-sm">
                                          {{compromiso.condicion}}
                                       </dd>
                                    </div>
                                    <div class="col-md-6">
                                       <dt>% Avance:</dt>
                                       <dd class="well well-sm">
                                          {{compromiso.porcentaje_avance}}
                                       </dd>
                                    </div>
                                    <div class="col-md-6">
                                       <dt>Ultimo seguimiento:</dt>
                                       <dd class="well well-sm">
                                          {{compromiso.updated_at}}
                                       </dd>
                                    </div>
                                 </div><!-- styled -->
                              </div><!-- .row -->

                              <hr>


                              <div id="" class="panel with-nav-tabs panel-primary">
                                 <div class="panel-heading" style="border-bottom:0px;">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-tabs" role="tablist">
                                       <li role="presentation" class="active">
                                          <a href="#gestionResponsable" aria-controls="gestionResponsable" role="tab" data-toggle="tab">
                                             Gestion de Responsables asociados al Compromiso
                                          </a>
                                       </li>

                                       <li role="presentation">
                                          <a href="#nuevoUsuario" aria-controls="nuevoUsuario" role="tab" data-toggle="tab">
                                             <i class="fa fa-plus"></i> Registrar nuevo usuario
                                          </a>
                                       </li>
                                    </ul>
                                 </div><!-- .panel-heading -->

                                 <div class="panel-body">
                                    <!-- Tab panes -->
                                    <div class="tab-content">

                                       <!-- Gestion Responsable -->
                                       <div role="tabpanel" class="tab-pane fade in active" id="gestionResponsable">
                                          <dd>
                                             <div class="table-responsive">
                                                <table class="table custom-table table-striped text-center">
                                                   <thead>
                                                      <th>Asignar</th>
                                                      <th>Id Responsable Compromiso</th>
                                                      <th>Id Compromiso</th>
                                                      <th>Id Area Auditada</th>
                                                      <th>Responsable</th>
                                                      <th>Email Responsable</th>
                                                      <th>Fono Responsable</th>
                                                   </thead>
                                                   <tbody>
                                                      <tr v-if="compromisos_responsables.length > 0" v-for="cr in compromisos_responsables">
                                                         <td class="text-success">
                                                         	Asignado
                                                         </td>
                                                         <td>
                                                         {{cr.id_compromiso_responsable}}
                                                         </td>
                                                         <td>
                                                         {{cr.id_compromiso}}
                                                         </td>
                                                         <td>
                                                         {{cr.id_area_proceso_auditado}}
                                                         </td>
                                                         <td>
                                                         {{cr.responsable}}
                                                         </td>
                                                         <td>
                                                         {{cr.email_responsable}}
                                                         </td>
                                                         <td>
                                                         {{cr.fono_responsable}}
                                                         </td>
                                                      </tr>
                                                      <tr>
                                                         <td>

                                                            <button class="btn btn-xs btn-success"
                                                               @click.prevent="cambiar_form_responsable_creable"
                                                               data-toggle="tooltip" data-placement="left" title="Asociar nuevo responsable"
                                                               v-show="!form_responsable_creable">
                                                               <i class="fa fa-plus"></i>
                                                            </button>
                                                            <button class="btn btn-xs btn-success"
                                                               @click.prevent="guardar_nuevo_responsable"
                                                               data-toggle="tooltip" data-placement="left" title="Guardar"
                                                               v-show="form_responsable_creable">
                                                               <i class="fa fa-check"></i>
                                                            </button>

																			</td>
                                                         <slot v-if="form_responsable_creable">
                                                            <td>
                                                               En espera
                                                            </td>
                                                            <td>
                                                               {{ compromiso.id_compromiso }}
                                                            </td>
                                                            <td>
                                                               {{ nuevo_responsable.id_area_proceso_auditado }}
                                                            </td>
                                                            <td>
                                                               <p class="control has-icon has-icon-right">
                                                                  <select id="responsables_existentes" name="id_usuario_responsable"
                                                                     @change="completar_nuevo_responsable_email"
                                                                     v-model="nuevo_responsable.id_usuario_responsable"
                                                                     v-validate="'required'" data-vv-delay="500"
                                                                     :class="{'input': true, 'text-danger': errors.has('id_usuario_responsable'),
                                                                     'form-control':true}">
                                                                     <option class="responsables" v-for="(u,i) in usuarios" :value="u.id"
                                                                        v-if="validarResponsableNoRegistrado(u.id)">
                                                                        {{u.name}}
                                                                     </option>
                                                                     <option value="">Seleccione un responsable</option>
                                                                  </select>
                                                                  <transition name="bounce">
                                                                  <i v-show="errors.has('id_usuario_responsable')" class="fa fa-warning"></i>
                                                                  </transition>
                                                                  <transition name="bounce">
                                                                  <span v-show="errors.has('id_usuario_responsable')" class="text-danger">
                                                                     {{ errors.first('id_usuario_responsable') | replaceIdUsuarioResponsable }}
                                                                  </span>
                                                                  </transition>
                                                               </p>



                                                               <!--
                                                               <button class="btn btn-sm btn-success"
																						@click.prevent="guardar_nuevo_responsable"
																						data-toggle="tooltip" data-placement="left" title="Guardar"
																						v-show="form_responsable_creable">
																						<i class="fa fa-check"></i> Guardar nuevo responsable
																					</button>
																					<small>Para agregar un nuevo usuario, haga click en la pestaña:</small>
																					<a class="btn btn-sm btn-primary" href="#!"
																						data-toggle="tooltip" data-placement="left"
																						title="Debe registrar un nuevo Usuario">
																						<i class="fa fa-plus"></i> Registrar nuevo usuario
																					</a>
																					-->
                                                            </td>
                                                            <td>
                                                               <p class="control has-icon has-icon-right">
                                                                  <input name="email_responsable"
                                                                        v-validate="'required|email'" data-vv-delay="500"
                                                                        :class="{'input': true, 'text-danger': errors.has('email_responsable'),
                                                                        'form-control':true}"
                                                                        type="text" placeholder="Email"
                                                                        v-model="nuevo_responsable.email_responsable">
                                                                  <transition name="bounce">
                                                                  <i v-show="errors.has('email_responsable')" class="fa fa-warning"></i>
                                                                  </transition>
                                                                  <transition name="bounce">
                                                                  <span v-show="errors.has('email_responsable')" class="text-danger">
                                                                     {{ errors.first('email_responsable') | replaceEmailResponsable }}
                                                                  </span>
                                                                  </transition>
                                                               </p>
                                                            </td>
                                                            <td>
																					<input type="number" data-vv-name="fono_responsable" class="form-control"
																						v-model="nuevo_responsable.fono_responsable" />
                                                            </td>
                                                         </slot>
                                                         <slot v-else>
                                                            <td></td><td></td><td></td><td></td><td></td><td></td>
                                                         </slot>
                                                      </tr>
                                                   </tbody>
                                                </table>
                                             </div><!-- table-responsive styled -->
                                             <h4 class="text-center alert alert-warning" v-if="compromisos_responsables.length == 0">
                                                No se encontraron resultados
                                             </h4>
                                          </dd>

                                       </div><!-- .tab-pane .fade #gestionResponsable -->

                                        <!-- Nuevo Usuario -->
                                       <div role="tabpanel" class="tab-pane fade" id="nuevoUsuario">
                                          <div class="row">
                                             <div class="col-md-4">
                                                <dt>Nombre (*):</dt>
                                                <dd>
                                                   <p class="control has-icon has-icon-right">
                                                      <input name="name"
                                                            v-validate="'required'" data-vv-delay="500"
                                                            :class="{'input': true, 'text-danger': errors.has('name'),
                                                            'form-control':true}"
                                                            type="text" placeholder="Nombre"
                                                            v-model="nuevo_usuario.name">
                                                      <transition name="bounce">
                                                      <i v-show="errors.has('name')" class="fa fa-warning"></i>
                                                      </transition>
                                                      <transition name="bounce">
                                                      <span v-show="errors.has('name')" class="text-danger">
                                                         {{ errors.first('name') | replaceName }}
                                                      </span>
                                                      </transition>
                                                   </p>
                                                </dd>
                                             </div>
                                             <div class="col-md-4">
                                                <dt>Email (*):</dt>
                                                <dd>
                                                   <p class="control has-icon has-icon-right">
                                                      <input name="email"
                                                            v-validate="'required|email'" data-vv-delay="500"
                                                            :class="{'input': true, 'text-danger': errors.has('email'),
                                                            'form-control':true}"
                                                            type="text" placeholder="Email"
                                                            v-model="nuevo_usuario.email">
                                                      <transition name="bounce">
                                                      <i v-show="errors.has('email')" class="fa fa-warning"></i>
                                                      </transition>
                                                      <transition name="bounce">
                                                      <span v-show="errors.has('email')" class="text-danger">
                                                         {{ errors.first('email') }}
                                                      </span>
                                                      </transition>
                                                   </p>
                                                </dd>
                                             </div>
                                             <div class="col-md-4">
                                                <dt>Password (*):</dt>
                                                <dd>
                                                   <p class="control has-icon has-icon-right">
                                                      <input name="password"
                                                            v-validate="'required'" data-vv-delay="500"
                                                            :class="{'input': true, 'text-danger': errors.has('password'),
                                                            'form-control':true}"
                                                            type="password" placeholder="Password"
                                                            v-model="nuevo_usuario.password">
                                                      <transition name="bounce">
                                                      <i v-show="errors.has('password')" class="fa fa-warning"></i>
                                                      </transition>
                                                      <transition name="bounce">
                                                      <span v-show="errors.has('password')" class="text-danger">
                                                         {{ errors.first('password') | replacePassword }}
                                                      </span>
                                                      </transition>
                                                   </p>
                                                </dd>
                                             </div>
                                             <div class="col-md-6">
                                                <dt>Finalizar:</dt>
                                                <dd>
                                                   <button @click.prevent="guardar_nuevo_usuario" class="btn btn-sm btn-success">Guardar</button>
                                                </dd>
                                             </div>
                                          </div><!-- .row -->

                                       </div><!-- .tab-pane .fade #nuevoUsuario -->

                                    </div><!-- .tab-content -->
                                 </div><!-- .panel-body -->

                              </div><!-- .panel .with-nav-tabs panel-primary -->

                           </dl>
                        </slot>
                     </div><!-- .modal-body -->

                     <div class="modal-footer">
                        <slot name="footer">
                           <!--
                           <button class="btn btn-sm btn-success" @click="$emit('close')">
                              Aceptar
                           </button>
                           -->
                           Los campos con <b>*</b> son obligatorios
                        </slot>
                     </div>

                  </div>
               </div>
            </div>
         </transition>
			`,
         name: 'modal-editarcompromiso',
         data () {
            return {
               'loadMore': false,
               'usuariosTmp': [],
               'form_responsable_creable': false,
               'permiteGuardarNuevoResponsable': true,
               'nuevo_responsable': {
                  'id_compromiso': '',
                  'id_proceso_auditado': '',
                  'id_usuario_responsable': '',
                  'id_area_proceso_auditado': 0,
                  'responsable': '',
                  'email_responsable': '',
                  'fono_responsable': '',
               },
               'nuevo_usuario': {
                  'name': '',
                  'email': '',
                  'password': '',
                  'id_role': '12',
                  'id_auditor': '0',
                  'active_directory': 0,
                  'active_directory_user': '',
                  'tipo_acceso': 'Role',
                  'usuario_registra': 1,
                  'usuario_modifica': 0,
               },
            }
         },
         ready () {
         },
         created () {

         },
         filters: {
            replaceNombreCompromiso(nombre_compromiso) {
               if (nombre_compromiso != null) {
                  nombre_compromiso = nombre_compromiso.replace('nombre_compromiso', 'para el nombre del comprimiso');
               }
               return nombre_compromiso;
            },
            replaceEmailResponsable(email_responsable) {
               if (email_responsable != null) {
                  email_responsable = email_responsable.replace('email_responsable', 'email para el responsable');
               }
               return email_responsable;
            },
            replaceFonoResponsable(fono_responsable) {
               if (fono_responsable != null) {
                  fono_responsable = fono_responsable.replace('fono_responsable', 'fono para el responsable');
               }
               return fono_responsable;
            },
            replaceIdUsuarioResponsable(id_usuario_responsable) {
               if (id_usuario_responsable != null) {
                  id_usuario_responsable = id_usuario_responsable.replace('id_usuario_responsable', 'para el nombre del responsable');
               }
               return id_usuario_responsable;
            },
            replaceName(name) {
               if (name != null) {
                  name = name.replace('name', 'para el nombre del usuario');
               }
               return name;
            },
            replacePassword(password) {
               if (password != null) {
                  password = password.replace('password', 'password');
               }
               return password;
            },
            replaceIdRole(id_role) {
               if (id_role != null) {
                  id_role = id_role.replace('id_role', 'role');
               }
               return id_role;
            },
            replaceIdAuditor(id_auditor) {
               if (id_auditor != null) {
                  id_auditor = id_auditor.replace('id_auditor', 'nombre auditor');
               }
               return id_auditor;
            },
         },
         methods: {
            cambiar_form_responsable_creable: function () {
               if (this.compromiso != null && this.usuarios != null && this.config != null && this.area_proceso_auditado != null) {

                  //console.log(this.area_proceso_auditado);
                  this.nuevo_responsable.id_compromiso = this.compromiso.id_compromiso;
                  this.nuevo_responsable.id_area_proceso_auditado = this.area_proceso_auditado[0].id_area_proceso_auditado;
               } else {
                  console.log('Uno de los elementos a validar es nulo.');
               }
               this.permiteGuardarNuevoResponsable = true;
               return this.form_responsable_creable = !this.form_responsable_creable;
            },
            crear_nuevo_responsable: function () {
            },
            completar_nuevo_responsable_email: function () {
               if (this.nuevo_responsable.id_usuario_responsable != null) {
                  return this.nuevo_responsable.email_responsable =
                     gcf.findUsuarioById(this.usuarios, this.nuevo_responsable.id_usuario_responsable).email;
               }
            },

            guardar_nuevo_responsable: function () {
               if (this.permiteGuardarNuevoResponsable == true) {
                  this.permiteGuardarNuevoResponsable = false;
                  if (this.nuevo_responsable.id_compromiso != '' &&
                     this.nuevo_responsable.id_usuario_responsable != '' &&
                     this.nuevo_responsable.email_responsable != '' &&
                        //this.nuevo_responsable.fono_responsable != '' &&
                     this.nuevo_responsable != {}) {

                     var formData = new FormData();

                     formData.append('id_compromiso', this.nuevo_responsable.id_compromiso);
                     formData.append('id_proceso_auditado', this.proceso_auditado.id_proceso_auditado);
                     formData.append('id_usuario_responsable', this.nuevo_responsable.id_usuario_responsable);
                     formData.append('id_area_proceso_auditado', this.area_proceso_auditado[0].id_area_proceso_auditado);
                     formData.append('responsable', gcf.findUsuarioById(this.usuarios, this.nuevo_responsable.id_usuario_responsable).name);
                     formData.append('email_responsable', this.nuevo_responsable.email_responsable);
                     formData.append('fono_responsable', this.nuevo_responsable.fono_responsable);
                     formData.append('_token', $('#_token').val());

                     Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

                     this.$http.post('/compromiso/store/responsable', formData).then(response => {
                        //console.log(response.data.new_compromiso_responsable);

                        var compromiso = gcf.findCompromisoById(this.compromisos, this.nuevo_responsable.id_compromiso);
                        var hallazgo = gcf.findHallazgoById(this.hallazgos, compromiso.id_hallazgo);
                        var new_compromiso_responsable = response.data.new_compromiso_responsable;
                        new_compromiso_responsable.id_hallazgo = hallazgo.id_hallazgo;
                        new_compromiso_responsable.nombre_hallazgo = hallazgo.nombre_hallazgo;
                        new_compromiso_responsable.id_compromiso = compromiso.id_compromiso;
                        new_compromiso_responsable.nombre_compromiso = compromiso.nombre_compromiso;
                        this.compromisos_responsables.push(new_compromiso_responsable);
                        this.limpiarNuevoResponsable();
                        this.form_responsable_creable = false;
                        alert('Responsable agregado.');

                        //console.log(response);
                        //this.hallazgos.push(response.body);
                     }, response => {
                     });
                  } else {
                     this.permiteGuardarNuevoResponsable = true;
                  }
               } else {
                  alert('Se esta procesando la solicitud');
               }
            },
            guardar_nuevo_usuario: function () {
               if (this.nuevo_usuario != {}) {
                  if (this.nuevo_usuario.name != '' &&
                     this.nuevo_usuario.email != '' &&
                     this.nuevo_usuario.password != '' &&
                     this.nuevo_usuario.id_role != '') {

                     var formData = new FormData();

                     formData.append('name', this.nuevo_usuario.name);
                     formData.append('email', this.nuevo_usuario.email);
                     formData.append('password', this.nuevo_usuario.password);
                     formData.append('id_role', this.nuevo_usuario.id_role);
                     formData.append('id_auditor', this.nuevo_usuario.id_auditor || 0);
                     formData.append('active_directory', this.nuevo_usuario.active_directory);
                     formData.append('active_directory_user', this.nuevo_usuario.active_directory_user);
                     formData.append('tipo_acceso', this.nuevo_usuario.tipo_acceso);
                     formData.append('usuario_registra', this.nuevo_usuario.usuario_registra);
                     formData.append('usuario_modifica', this.nuevo_usuario.usuario_modifica);

                     Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

                     this.$http.post('/usuario', formData).then(response => {
                        if (response.data == 'The given data failed to pass validation.') {
                           return alert('El usuario ya ha sido registrado');
                        }
                        //console.log(response.data.new_compromiso_responsable);
                        //console.log(response);
                        this.usuarios.push(response.data.usuario_new);
                        //this.limpiarNuevoUsuario();
                        alert('Usuario creado.');

                        //console.log(response);
                        //this.hallazgos.push(response.body);
                     }, response => {
                     });
                  }
               }
            },
            findUsuarioById: function (items, id) {
               for (var i in items) {
                  if (items[i].id == id) {
                     return items[i];
                  }
               }
               return null;
            },
            limpiarNuevoResponsable: function () {
               return this.nuevo_responsable = {
                  'id_compromiso': '',
                  'id_proceso_auditado': '',
                  'id_usuario_responsable': '',
                  'id_area_proceso_auditado': 0,
                  'responsable': '',
                  'email_responsable': '',
                  'fono_responsable': '',
               };
            },
            limpiarNuevoUsuario: function () {
               return this.nuevo_usuario = {
                  'name': '',
                  'email': '',
                  'password': '',
                  'id_role': '12',
                  'id_auditor': '0',
                  'active_directory': 0,
                  'active_directory_user': '',
                  'tipo_acceso': 'Role',
                  'usuario_registra': 1,
                  'usuario_modifica': 0,
               };
            },
            loadMoreFields: function () {
               return this.loadMore = !this.loadMore;
            },
            validarResponsableNoRegistrado: function (id_responsable_registrado) {
               //Valida si ya ha sido registrado a traves de los compromiso_responsables, que es un objeto con todos
               //los responsables asociados al compromiso
               var items = this.compromisos_responsables;
               for (var i in items) {
                  if (items[i].id_usuario_responsable == id_responsable_registrado) {//12 es aqui por el perfil
                     return false; //Ya ha sido registrado
                  }
               }
               if (gcf.findUsuarioById(this.usuarios, id_responsable_registrado).role != undefined) {
                  if (gcf.findUsuarioById(this.usuarios, id_responsable_registrado).role.role != 'Usuario Auditado') {
                     return false;
                  }
               }

               return true; //No ha sido registrado
            },
         },
         watch: {},
      },
      /*
       '':{
       props: [''],
       template: `
       `,
       name: '',
       data () {
       return {
       }
       },
       ready () {
       },
       created () {
       },
       methods: {
       },
       watch: {
       },
       }
       */
   },
   created(){
      //this.fetchCompromisos();
   },
   ready: {},
   filters: {},
   methods: {
      //camelCase() => for specific functions
      agregarFiltroEstadoGrid: function (estado) {
         if (!this.filtroEstado) {
            this.filtroEstado = true;
            this.compromisosFiltroEstado = this.compromisos;
         } else {
            this.compromisos = this.compromisosFiltroEstado;
         }

         //Itero la lista de hallazgos y filtro segun estado seleccionado
         this.compromisos = _.filter(this.compromisos, function (c) {
            return c.estado == estado;
         });
         if (this.compromisos.length == 0) {
            this.compromisos = this.compromisosFiltroEstado;
            alert('Sin resultados para "' + estado + '"');
            //this.limpiarFiltros();
         }
      },
      agregarFiltroCondicionGrid: function (condicion) {
         if (!this.filtroCondicion) {
            this.filtroCondicion = true;
            this.compromisosFiltroCondicion = this.compromisos;
         } else {
            this.compromisos = this.compromisosFiltroCondicion;
         }

         //Itero la lista de hallazgos y filtro segun la criticidad seleccionada
         this.compromisos = _.filter(this.compromisos, function (c) {
            return c.condicion == condicion;
         });
         if (this.compromisos.length == 0) {
            this.compromisos = this.compromisosFiltroCondicion;
            alert('Sin resultados para "' + condicion + '"');
            //this.limpiarFiltros();
         }
      },
      agregarFiltroNomenclaturaGrid: function (nomenclatura) {
         if (!this.filtroNomenclatura) {
            this.filtroNomenclatura = true;
            this.compromisosFiltroNomenclatura = this.compromisos;
         } else {
            this.compromisos = this.compromisosFiltroNomenclatura;
         }

         //Itero la lista de hallazgos y filtro segun la criticidad seleccionada
         this.compromisos = _.filter(this.compromisos, function (c) {
            return c.nomenclatura == nomenclatura;
         });
         if (this.compromisos.length == 0) {
            this.compromisos = this.compromisosFiltroNomenclatura;
            alert('Sin resultados para "' + nomenclatura + '"');
            //this.limpiarFiltros();
         }
      },
      agregarFiltroIdHallazgoGrid: function () {
         if (!this.filtroIdHallazgo) {
            this.filtroIdHallazgo = true;
            this.compromisosFiltroIdHallazgo = this.compromisos;
         } else {
            this.compromisos = this.compromisosFiltroIdHallazgo;
         }

         var self = this;
         //Itero la lista de hallazgos y filtro segun el id hallazgo ingresado
         this.compromisos = _.filter(this.compromisos, function (c) {
            return c.id_hallazgo == self.filterIdHallazgo;
         });
         /*
          if(this.compromisos.length == 0){
          this.compromisos = this.compromisosFiltroIdHallazgo;
          if (this.filterIdHallazgo == '') return;
          else alert('Sin resultados para el id ingresado');
          }
          */
      },
      agregarFiltroIdCompromisoGrid: function () {
         if (!this.filtroIdCompromiso) {
            this.filtroIdCompromiso = true;
            this.compromisosFiltroIdCompromiso = this.compromisos;
         } else {
            this.compromisos = this.compromisosFiltroIdCompromiso;
         }

         var self = this;
         //Itero la lista de hallazgos y filtro segun el id hallazgo ingresado
         this.compromisos = _.filter(this.compromisos, function (c) {
            return c.id_compromiso == self.filterIdCompromiso;
         });
         /*
          if(this.compromisos.length == 0){
          this.compromisos = this.compromisosFiltroIdCompromiso;
          if (this.filterIdCompromiso == '') return;
          else alert('Sin resultados para el id ingresado');
          }
          */
      },
      // change order variable direction
      calcularDiferenciaTiempo: function (plazo_comprometido) {
         plazo_comprometido = plazo_comprometido.split('-');
         var today = new Date();
         var dd = today.getDate();
         var mm = today.getMonth() + 1; //January is 0!
         var yyyy = today.getFullYear();

         var date1 = new Date(plazo_comprometido[1] + '/' + plazo_comprometido[0] + '/' + plazo_comprometido[2]);
         var date2 = new Date(mm + '/' + dd + '/' + yyyy);
         var timeDiff = Math.abs(date2.getTime() - date1.getTime());
         var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

         return diffDays;
      },
      changeListOrder: function (column) {
         this.gridOrder == 'asc' ? this.gridOrder = 'desc' : this.gridOrder = 'asc';
         this.orderLists(column);
      },
      crear_nuevo_seguimiento: function (compromiso) {
         this.form_seguimiento_creable = compromiso.id_compromiso;
         this.nuevo_seguimiento.id_compromiso = compromiso.id_compromiso;
         this.nuevo_seguimiento.diferencia_tiempo = compromiso.plazo_comprometido_dias;
         this.nuevo_seguimiento.porcentaje_avance = compromiso.porcentaje_avance;
         this.nuevo_seguimiento.estado = compromiso.estado;
         this.nuevo_seguimiento.condicion = compromiso.condicion;
         this.nuevo_seguimiento.usuario_registra = this.auth.id;

         this.showModalNuevoSeguimiento = true;
         this.permiteGuardarNuevoSeguimiento = true;
         return this.nuevo_seguimiento;
      },
      crear_nuevo_compromiso: function (id_hallazgo) {
         this.$validator.validateAll().then(result => {
         });
         if (id_hallazgo == null || id_hallazgo == '') {
            alert('Debe seleccionar un hallazgo');
            return;
         }
         this.form_compromiso_creable = id_hallazgo;
         this.nuevo_compromiso.id_hallazgo = id_hallazgo;
         this.showModalNuevoCompromiso = true;
         this.permiteGuardarNuevoCompromiso = true;
         return this.nuevo_compromiso;
      },
      fetchCompromisos: function () {
         this._gcf = gcf;
         let id_proceso_auditado = $('#id_proceso_auditado').val();
         this.$http.get('/proceso_auditado/' + id_proceso_auditado + '/edit/ajax').then(response => { // success callback
            //console.log(response);
            this.area_proceso_auditado = response.body.area_proceso_auditado;
            this.proceso_auditado = response.body.proceso_auditado;

            this.hallazgos = response.body.hallazgos;
            this.hallazgosTmp = response.body.hallazgos;
            //this.hallazgo = response.body.hallazgo;

            this.compromisos = response.body.compromisos;
            this.compromisosTmp = response.body.compromisos;
            //this.compromiso = response.body.compromiso;

            this.compromisos_responsables = response.body.compromisos_responsables;
            this.compromisos_responsablesTmp = response.body.compromisos_responsables;

            this.seguimientos = response.body.seguimientos;
            this.seguimientosTmp = response.body.seguimientos;
            //this.seguimiento = response.body.seguimiento;

            this.archivos = response.body.archivos;
            this.archivosTmp = response.body.archivos;

            this.usuarios = response.body.usuarios;
            this.config = response.body.config;
            this.auth = response.body.auth;
            this.role = response.body.role;
            this.auditor = response.body.auditor;


            this.preloadCompromisos();

            //Manda el controller que llama al metodo
            gcf.refetchControllersData({
               'proceso_auditado': this.proceso_auditado,
               'area_proceso_auditado': this.area_proceso_auditado,

               'hallazgos': this.hallazgos,
               'hallazgosTmp': this.hallazgos,

               'compromisos': this.compromisos,
               'compromisosTmp': this.compromisos,

               'compromisos_responsables': this.compromisos_responsables,
               'compromisos_responsablesTmp': this.compromisos_responsables,

               'seguimientos': this.seguimientos,
               'seguimientosTmp': this.seguimientos,

               'archivos': this.archivos,
               'archivosTmp': this.archivos,

               'usuarios': this.usuarios,
               'config': this.config,
               'auth': this.auth,
               'role': this.role,
               'auditor': this.auditor,

            }, {
               'HallazgoController': 'HallazgoController',
               'SeguimientoController': 'SeguimientoController',
               'ArchivoController': 'ArchivoController',
               'ResponsableController': 'ResponsableController',
            }, 'CompromisoController');


            this.ctd_req_hallazgos = this.proceso_auditado.cantidad_hallazgo;
            this.ctd_hallazgos = this.hallazgos.length; // : cantidad actual de hallazgos referenciados al contraloria
            this.ctd_compromisos = this.compromisos.length;//this.ctd_compromisos = 0;
            this.ctd_seguimientos = this.seguimientos.length;


            HallazgoController.ctd_req_hallazgos =
               SeguimientoController.ctd_req_hallazgos =
                  ArchivoController.ctd_req_hallazgos =
                     ResponsableController.ctd_req_hallazgos = this.ctd_req_hallazgos;

            HallazgoController.ctd_hallazgos =
               SeguimientoController.ctd_hallazgos =
                  ArchivoController.ctd_hallazgos =
                     ResponsableController.ctd_hallazgos = this.ctd_hallazgos;

            HallazgoController.ctd_compromisos =
               SeguimientoController.ctd_compromisos =
                  ArchivoController.ctd_compromisos =
                     ResponsableController.ctd_compromisos = this.ctd_compromisos;

            HallazgoController.ctd_seguimientos =
               SeguimientoController.ctd_seguimientos =
                  ArchivoController.ctd_seguimientos =
                     ResponsableController.ctd_seguimientos = this.ctd_seguimientos;

            HallazgoController._gcf =
               SeguimientoController._gcf =
                  ArchivoController._gcf =
                     ResponsableController._gcf = this._gcf;

         }, response => { // error callback
            console.log('Error fetchCompromisos: ' + response);
         });
      },
      filterGridCompromisoByCombo: function (id_hallazgo) {
         this.filterIdHallazgo = id_hallazgo || null;
         if (this.filterIdHallazgo != null) {
            return this.agregarFiltroIdHallazgoGrid();
         } else {
            //alert('Debe seleccionar un hallazgo');
            this.limpiarFiltros();
         }
         return;
      },
      limpiarFiltros: function () {
         this.compromisos = this.compromisosTmp;
         this.compromisosFiltroNomenclatura = this.compromisos;
         this.compromisosFiltroEstado = this.compromisos;
         this.compromisosFiltroCondicion = this.compromisos;
         this.filtroNomenclatura = false;
         this.filtroEstado = false;
         this.filtroCondicion = false;
         this.mensajeResultadoConFiltros = false;
      },
      limpiarNuevoCompromiso: function () {
         this.nuevo_compromiso = {};
         return this.nuevo_compromiso = {
            'id_hallazgo': '',
            'nomenclatura': '',
            'plazo_estimado': '',
            'plazo_comprometido': '',
            'nombre_compromiso': '',
            'responsable': '',
            'email_responsable': '',
            'fono_responsable': '',
         }
      },
      limpiarNuevoSeguimiento: function () {
         this.nuevo_seguimiento = {};
         return this.nuevo_seguimiento = {
            'id_compromiso': '',
            'diferencia_tiempo': '',
            'documento_adjunto': {},
            'estado': '',
            'condicion': '',
            'porcentaje_avance': '',
            'plazo_estimado': '',
            'plazo_comprometido': '',
         }
      },
      // function to order users in the list
      orderLists: function (column) {
         this.compromisos = _.orderBy(this.compromisos, column, this.gridOrder);
         //console.log(column);
         //this.lists = this.shuffle(_.orderBy(this.lists, 'name', this.listOrder));
         //console.log(this.lists.length);
      },
      preloadCompromisos: function () {

         for (let c in this.compromisos) {
            this.compromisos[c].plazo_comprometido_dias = this.calcularDiferenciaTiempo(this.compromisos[c].plazo_comprometido) || 0;
         }

         for (let r in this.compromisos_responsables) {
            this.compromisos_responsables[r].id_hallazgo =
               gcf.findCompromisoById(this.compromisos, this.compromisos_responsables[r].id_compromiso).id_hallazgo;
            this.compromisos_responsables[r].nombre_hallazgo =
               gcf.findHallazgoById(this.hallazgos, this.compromisos_responsables[r].id_hallazgo).nombre_hallazgo;
            this.compromisos_responsables[r].nombre_compromiso =
               gcf.findCompromisoById(this.compromisos, this.compromisos_responsables[r].id_compromiso).nombre_compromiso;

            this.compromisos_responsables[r].area = this.compromisos_responsables[r].area_proceso_auditado.descripcion;
         }

         for (let s in this.seguimientos) {
            this.seguimientos[s].id_hallazgo =
               gcf.findCompromisoById(this.compromisos, this.seguimientos[s].id_compromiso).id_hallazgo;
            this.seguimientos[s].nombre_hallazgo =
               gcf.findHallazgoById(this.hallazgos, this.seguimientos[s].id_hallazgo).nombre_hallazgo;
            this.seguimientos[s].nombre_compromiso =
               gcf.findCompromisoById(this.compromisos, this.seguimientos[s].id_compromiso).nombre_compromiso;
            this.seguimientos[s].usuario_registra =
               gcf.findById(this.usuarios, this.seguimientos[s].usuario_registra);
            this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra ?
               this.seguimientos[s].usuario_registra.name : 'Sistema';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';
         }

         //De fetchArchivos para archivos
         for (let a in this.archivos) {
            this.archivos[a].id_hallazgo = gcf.findCompromisoById(this.compromisos, this.archivos[a].id_compromiso).id_hallazgo;
            this.archivos[a].nombre_hallazgo = gcf.findHallazgoById(this.hallazgos, this.archivos[a].id_hallazgo).nombre_hallazgo;
            this.archivos[a].nombre_compromiso = gcf.findCompromisoById(this.compromisos, this.archivos[a].id_compromiso).nombre_compromiso;
            this.archivos[a].usuario_registra = gcf.findById(this.usuarios, this.archivos[a].usuario_registra);
            this.archivos[a].usuario_registra = this.archivos[a].usuario_registra ?
               this.archivos[a].usuario_registra.name : 'Sistema';
            this.archivos[a].observacion = this.archivos[a].observacion || 'Sin Observacion';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';
         }

         //De fetchResponsables para responsables
         for (let r in this.compromisos_responsables) {
            this.compromisos_responsables[r].id_hallazgo =
               gcf.findCompromisoById(this.compromisos, this.compromisos_responsables[r].id_compromiso).id_hallazgo;
            this.compromisos_responsables[r].nombre_hallazgo =
               gcf.findHallazgoById(this.hallazgos, this.compromisos_responsables[r].id_hallazgo).nombre_hallazgo;
            this.compromisos_responsables[r].nombre_compromiso =
               gcf.findCompromisoById(this.compromisos, this.compromisos_responsables[r].id_compromiso).nombre_compromiso;
            this.compromisos_responsables[r].area = this.compromisos_responsables[r].area_proceso_auditado.descripcion;

         }

      },
      showModalData: function (id_compromiso) {
         this.compromiso = gcf.findCompromisoById(this.compromisos, id_compromiso);
         this.hallazgo = gcf.findHallazgoById(this.hallazgos, this.compromiso.id_hallazgo);
         this.compromiso.nombre_hallazgo = this.hallazgo.nombre_hallazgo;
         this.compromiso.seguimiento_no_reprogramado = this.seguimiento_no_reprogramado(this.compromiso);
         this.compromiso.seguimiento_reprogramado = this.seguimiento_reprogramado(this.compromiso);

         this.compromiso.updated_at = this.compromiso.seguimiento[this.compromiso.seguimiento.length - 1].updated_at;

         return this.showModal = true;
      },
      showModalCompromiso: function (id_compromiso) {
         this.compromisos_responsables = this.compromisos_responsablesTmp;

         this.compromisos_responsables = _.filter(this.compromisos_responsables, function (cr) {
            return cr.id_compromiso == id_compromiso;
         });

         this.compromiso = gcf.findCompromisoById(this.compromisos, id_compromiso);
         this.hallazgo = gcf.findHallazgoById(this.hallazgos, this.compromiso.id_hallazgo);
         this.compromiso.nombre_hallazgo = this.hallazgo.nombre_hallazgo;
         this.compromiso.seguimiento_no_reprogramado = this.seguimiento_no_reprogramado(this.compromiso);
         this.compromiso.seguimiento_reprogramado = this.seguimiento_reprogramado(this.compromiso);

         this.compromiso.estado = this.compromiso.seguimiento[this.compromiso.seguimiento.length - 1].estado;
         this.compromiso.condicion = this.compromiso.seguimiento[this.compromiso.seguimiento.length - 1].condicion;
         this.compromiso.porcentaje_avance = parseInt(this.compromiso.seguimiento[this.compromiso.seguimiento.length - 1].porcentaje_avance);
         this.compromiso.updated_at = this.compromiso.seguimiento[this.compromiso.seguimiento.length - 1].updated_at;
         return this.showModalEditarCompromiso = true;
      },
      /* for transition group flip */
      shuffle: function (items) {
         return _.shuffle(items)
      },
      seguimiento_reprogramado: function (compromiso) {
         let compromisoTmp = compromiso;
         let ctd_seguimientos_rpg = _.filter(compromisoTmp.seguimiento, function (s) {
            return s.estado == 'Reprogramado';
         });
         compromiso.ctd_seguimientos_rpg = ctd_seguimientos_rpg.length || 0;
         return ctd_seguimientos_rpg.length || 0;
      },
      seguimiento_no_reprogramado: function (compromiso) {
         let compromisoTmp = compromiso;
         let ctd_seguimientos_norpg = _.filter(compromisoTmp.seguimiento, function (s) {
            return s.estado != 'Reprogramado';
         });
         compromiso.ctd_seguimientos_norpg = ctd_seguimientos_norpg.length || 0;
         return ctd_seguimientos_norpg.length || 0;
      },

      //with_dash() => for explained specific functions
      cambiar_form_compromiso_editable: function (id_compromiso) {
         this.form_compromiso_editable = (this.form_compromiso_editable == false ? true : false);
         return this.form_compromiso_editable = id_compromiso;
      },
      guardar_nuevo_compromiso: function () {
         if (this.permiteGuardarNuevoCompromiso == true) {
            this.permiteGuardarNuevoCompromiso = false;
            if (this.nuevo_compromiso.nomenclatura != '' &&
               this.nuevo_compromiso.nombre_compromiso != '' &&
               this.nuevo_compromiso.plazo_estimado != '' &&
               this.nuevo_compromiso.plazo_comprometido != '' &&
               this.nuevo_compromiso != {}) {
               //console.log(this.nuevo_compromiso);
               this.form_compromiso_creable = 0;
               this.showModalNuevoCompromiso = false;
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               this.$http.post('/compromiso', this.nuevo_compromiso).then(response => {
                  //alert('Compromiso creado.');
                  var self = this;
                  setTimeout(function () {
                     //self.$parent.$options.methods.fetchHallazgos();
                     //Cuando guarda hallazgo sin asociar procedimiento disciplinario
                     //self.$parent.fetchHallazgos();
                     self.fetchCompromisos();
                     self.limpiarNuevoCompromiso();
                     self.form_compromiso_creable = 0;
                  }, 500);

               }, response => {
               });

            } else {
               this.permiteGuardarNuevoCompromiso = true;
            }
         } else {
            alert('Se esta procesando la solicitud');
         }
      },
      guardar_form_compromiso_editable: function (id_compromiso, cindex) {
         if ((this.form_compromiso_editable != 0 || cindex == 0) && id_compromiso != 0) {
            //Lo guarda, verifica si los datos del objeto que son necesarios son iguales, sino que no lo guarde
            let compromisoTmp = gcf.findCompromisoById(this.compromisos, id_compromiso);

            //console.log(compromisoTmp);
            Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
            this.$http.put('/compromiso/' + id_compromiso, compromisoTmp).then(response => {
               //console.log(response.body);
               var self = this;
               setTimeout(function () {
                  self.fetchCompromisos();
                  self.form_compromiso_editable = 0;
                  self.showModalEditarCompromiso = false;
               }, 500);
            }, response => {
               // error callback
            });
            //if()
         } else {
            //Lo guarda
         }
      },
      guardar_nuevo_seguimiento: function () {
         this.$validator.validateAll().then(result => {
         });
         if (this.permiteGuardarNuevoSeguimiento == true) {
            this.permiteGuardarNuevoSeguimiento = false;
            if (this.nuevo_seguimiento.porcentaje_avance != '' &&
               this.nuevo_seguimiento.estado != '' &&
               this.nuevo_seguimiento.condicion != '' &&
               (
                  this.nuevo_seguimiento.estado == 'Reprogramado' && (
                  this.nuevo_seguimiento.plazo_estimado != '' &&
                  this.nuevo_seguimiento.plazo_comprometido != '' )
                  || this.nuevo_seguimiento.estado != 'Reprogramado'
               ) &&
               this.nuevo_seguimiento != {}) {

               this.spinner_upload = true;
               var formData = new FormData();
               $.each(this.nuevo_seguimiento.documento_adjunto, function (i, file) {
                  formData.append('documento_adjunto[]', file);
               });

               formData.append('id_compromiso', this.nuevo_seguimiento.id_compromiso);
               formData.append('diferencia_tiempo', this.nuevo_seguimiento.diferencia_tiempo);
               formData.append('usuario_registra', this.nuevo_seguimiento.usuario_registra);
               formData.append('porcentaje_avance', this.nuevo_seguimiento.porcentaje_avance);
               formData.append('plazo_estimado', this.nuevo_seguimiento.plazo_estimado);
               formData.append('plazo_comprometido', this.nuevo_seguimiento.plazo_comprometido);
               formData.append('estado', this.nuevo_seguimiento.estado);
               formData.append('condicion', this.nuevo_seguimiento.condicion);
               formData.append('observacion', this.nuevo_seguimiento.observacion || '');
               formData.append('razon_no_cumplimiento', this.nuevo_seguimiento.razon_no_cumplimiento || '');
               formData.append('_token', $('#_token').val());

               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

               const config = {headers: {'Content-Type': 'multipart/form-data'}};
               this.$http.post('/seguimiento', formData, config).then(response => {

                  this.seguimientos.push(response.body);
                  this.seguimientosTmp.push(response.body);
                  var self = this;
                  setTimeout(function () {
                     self.fetchCompromisos();
                     self.form_hallazgo_editable = 0;
                     self.limpiarNuevoSeguimiento();
                     self.form_seguimiento_creable = 0;
                     self.showModalNuevoSeguimiento = false;
                     self.permiteGuardarNuevoSeguimiento = true;
                     self.spinner_upload = false;
                  }, 500);
               }, response => {
               });
            } else {
               this.permiteGuardarNuevoSeguimiento = true;
            }
         } else {
            alert('Se esta procesando la solicitud');
         }
      },
   },
});

const SeguimientoController = new Vue({
   el: '#SeguimientoController',
   data(){
      return {
         'area_proceso_auditado': [],
         'proceso_auditado': {},

         'hallazgos': {},
         'hallazgosTmp': {},
         'hallazgo': [],

         'compromisos': [],
         'compromisosTmp': [],
         'compromiso': [],

         'compromisos_responsables': [],
         'compromisos_responsablesTmp': [],

         'porcentajes_cumplimiento': {0: 0, 1: 10, 2: 20, 3: 30, 4: 40, 5: 50, 6: 60, 7: 70, 8: 80, 9: 90, 10: 100},

         'seguimientos': [],
         'seguimientosTmp': [],
         'seguimiento': [],

         'archivos': [],
         'archivosTmp': [],


         'usuarios': [],
         'config': [],
         'auth': [],
         'role': [],
         'auditor': [],

         'index': 0,
         'ctd_hallazgos': 0,
         'ctd_compromisos': 0,
         'ctd_seguimientos': 0,
         'ctd_req_hallazgos': 0,

         'filterTerm': '',
         'filterIdHallazgo': '',
         'filterIdCompromiso': '',
         'filterIdSeguimiento': '',
         'form_seguimiento_editable': 0,
         'form_seguimiento_creable': 0,
         'gridOrder': 'asc',

         'mensajeResultadoConFiltros': false,
         'filtroEstado': false,
         'filtroCondicion': false,
         'filtroObservacion': false,
         'filtroRazonNoCumplimiento': false,
         'filtroIdHallazgo': false,
         'filtroIdCompromiso': false,
         'showModal': false,
         'showModalNuevoSeguimiento': false,
         'permiteGuardarNuevoSeguimiento': true,

         'spinner_upload': false,

         'seguimientosFiltroEstado': {},
         'seguimientosFiltroCondicion': {},
         'seguimientosFiltroObservacion': {},
         'seguimientosFiltroRazonNoCumplimiento': {},
         'seguimientosFiltroIdHallazgo': {},
         'seguimientosFiltroIdCompromiso': {},

         'nuevo_seguimiento': {
            'id_hallazgo': '',
            'id_compromiso': '',
            'diferencia_tiempo': '',
            'documento_adjunto': {},
            'usuario_registra': 1,
            'estado': '',
            'condicion': '',
            'porcentaje_avance': '',
            'razon_no_cumplimiento': '',
            'observacion': '',
            'plazo_estimado': '',
            'plazo_comprometido': '',
         },

         'excel_json_fields': {
            'id_hallazgo': 'String',
            'nombre_hallazgo': 'String',
            'id_compromiso': 'String',
            'nombre_compromiso': 'String',
            'id_seguimiento': 'String',
            'estado': 'String',
            'condicion': 'String',
            'porcentaje_avance': 'String',
            'usuario_registra': 'String',
            'observacion': 'String',
            'razon_no_cumplimiento': 'String',
            'fercha_ingreso': 'String',
         },
         excel_json_data: [],
         excel_data_count: '',
         append_to_json_excel: {},

         _gcf: gcf,
      }
   },
   computed: {},
   watch: {
      seguimientos: function (seguimientos) {
         var self = this;
         this.excel_json_data = [];
         return seguimientos.map(function (s, index) {
            return self.excel_json_data.push({
               'id_hallazgo': s.id_hallazgo,
               'nombre_hallazgo': s.nombre_hallazgo,
               'id_compromiso': s.id_compromiso,
               'nombre_compromiso': s.nombre_compromiso,
               'id_seguimiento': s.id_seguimiento,
               'estado': s.estado,
               'condicion': s.condicion,
               'porcentaje_avance': s.porcentaje_avance,
               'usuario_registra': s.usuario_registra,
               'observacion': s.observacion || 'Sin observaciones',
               'razon_no_cumplimiento': s.razon_no_cumplimiento || 'Sin razones',
               'fercha_ingreso': s.fecha_ingreso || s.created_at,
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
            'excel_json_fields': {
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
               for (var colName in this.excel_json_fields) {
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
                     xml += '    <ss:Data ss:Type="' + this.excel_json_fields[col] + '">';
                     xml += String(data[row][col]).replace(/[^a-zA-Z0-9\s\-ñíéáóú\#\,\.\;\:ÑÍÉÓÁÚ]/g, '') + '</ss:Data>\n';
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
      'spinner': {
         props: [''],
         'name': 'spinner',
         'template': `
	         <div class="loader text-center">Cargando tabla, espere por favor...</div>
	      `,
         data () {
            return {
               visible: false,
            }
         },
         ready () {
         },
         created(){
         },
         filters: {},
         methods: {},
      },
      'mini-spinner': {
         props: [''],
         'name': 'mini-spinner',
         'template': `
	         <div class="loader-mini text-center">Cargando tabla, espere por favor...</div>
	      `,
         data () {
            return {
               visible: false,
            }
         },
         ready () {
         },
         created(){
         },
         filters: {},
         methods: {},
      },
      'modal': {
         props: ['seguimiento'],
         template: `
			   <!-- template for the modal component -->
			   <transition name="modal">
				   <div class="modal-mask">
					   <div class="modal-wrapper">
					      <div class="modal-container">

						      <div class="modal-header">
							      <slot name="header"></slot>
						      </div>

						      <div class="modal-body">
							      <slot name="body">
                              <dl class="dl-vertical">
                                 <div class="row">
                                    <div style="overflow-y: scroll;max-height: 400px;">
                                       <div class="col-md-6">
                                          <dt>Id del Hallazgo</dt>
                                          <dd class="well well-sm">{{seguimiento.id_hallazgo || '0'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Id del Compromiso</dt>
                                          <dd class="well well-sm">{{seguimiento.id_compromiso || '0'}}</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Nombre del Hallazgo</dt>
                                          <dd class="well well-sm">{{seguimiento.nombre_hallazgo || 'Sin ingresar'}}</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Nombre del Compromiso</dt>
                                          <dd class="well well-sm">{{seguimiento.nombre_compromiso || 'Sin ingresar'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Id del Seguimiento</dt>
                                          <dd class="well well-sm">{{seguimiento.id_seguimiento || '0'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Porcentaje Avance</dt>
                                          <dd class="well well-sm">{{seguimiento.porcentaje_avance || '0'}}%</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Estado</dt>
                                          <dd class="well well-sm">{{seguimiento.estado || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Condicion</dt>
                                          <dd class="well well-sm">{{seguimiento.condicion || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Fecha Creacion</dt>
                                          <dd class="well well-sm">{{seguimiento.created_at || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Fecha ultimo Seguimiento</dt>
                                          <dd class="well well-sm">{{seguimiento.updated_at || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Usuario que Registra</dt>
                                          <dd class="well well-sm">{{seguimiento.usuario_registra || 'Sin Definir' }}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Razon</dt>
                                          <dd class="well well-sm">{{seguimiento.razon_no_cumplimiento || 'Sin Razones'}}</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Observacion</dt>
                                          <dd class="well well-sm">{{seguimiento.observacion || 'Sin Observacion'}}</dd>
                                       </div>
                                    </div><!-- styled -->
                                 </div><!-- .row -->
                              </dl>
							      </slot>
						      </div>

						<!--
						 <div class="modal-footer">
							<slot name="footer">
							  <button class="btn btn-sm btn-success" @click="$emit('close')">
								 Aceptar
							  </button>
							</slot>
						 </div>
						-->
					  </div>
					</div>
				 </div>
			  </transition>
			`,
         name: 'modal',
         data () {
            return {}
         },
         ready () {
         },
         created () {
         },
         methods: {},
         watch: {},
      },
      'modal-nuevoseguimiento': {
         props: ['nuevo_seguimiento', 'porcentajes_cumplimiento', 'auth'],
         template: `
				<!-- template for the modal component -->
			  	<transition name="modal">
				 	<div class="modal-mask">
						<div class="modal-wrapper">
					  		<div class="modal-container">

						 		<div class="modal-header">
									<slot name="header"></slot>
						 		</div>
						 		<div class="modal-body">
									<slot name="body">
                              <dl class="dl-vertical" style="margin: 20px;">
                                 <div class="row">
                                    <div style="overflow-y: scroll;max-height: 400px;">
                                       <div class="col-md-6">

                                       	<!-- Diferencia de tiempo -->
                                          <dt>Diferencia de tiempo: <small>(En dias)</small></dt>
                                          <dd class="well well-sm" style="max-height: 33px !important;margin-bottom: 10px !important;">
                                             {{nuevo_seguimiento.diferencia_tiempo}}
                                          </dd>

                                          <!-- Condicion -->
                                          <dt>Condicion (*):</dt>
                                          <dd v-if="auth.role != undefined && auth.role.role != 'Usuario Auditado'">
                                             <p class="control has-icon has-icon-right">
                                                <select name="condicion" v-model="nuevo_seguimiento.condicion"
                                                      v-validate="'required'" data-vv-delay="500"
                                                      :class="{'input': true, 'text-danger': errors.has('condicion'), 'form-control':true}">
                                                   <option value="No Evaluado">No Evaluado</option>
                                                   <option value="Asume Riesgo">Asume Riesgo</option>
                                                   <option value="Cumplida">Cumplida</option>
                                                   <option value="Cumplida Parcial">Cumplida Parcial</option>
                                                   <option value="No Cumplida">No Cumplida</option>
                                                   <option value="Reprogramado">Reprogramado</option>
                                                </select>
                                                <transition name="bounce">
                                                <i v-show="errors.has('condicion')" class="fa fa-warning"></i>
                                                </transition>
                                                <transition name="bounce">
                                                <span v-show="errors.has('condicion')" class="text-danger">
                                                   {{ errors.first('condicion') }}
                                                </span>
                                                </transition>
                                             </p>
                                          </dd>
                                          <dd v-else class="well well-sm">{{nuevo_seguimiento.condicion}}</dd>

														<div v-show="nuevo_seguimiento.estado == 'Reprogramado'">
															<dt>Plazo Estimado (*):</dt>
															<dd>
																<p class="control has-icon has-icon-right">
																	<input name="plazo_estimado" type="text" id="ncpe3"
																			v-validate="'required'" data-vv-delay="500"
																			class="form-control" />
																	<transition name="bounce">
																	<i v-show="errors.has('plazo_estimado')" class="fa fa-warning"></i>
																	</transition>
																	<transition name="bounce">
																	<span v-show="errors.has('plazo_estimado')" class="text-danger">
																		{{ errors.first('plazo_estimado') | replacePlazoEstimado }}
																	</span>
																	</transition>
																</p>
															</dd>
														</div>

                                          <!-- Razon no Cumplimiento -->
                                          <dt>Razon no Cumplimiento:</dt>
                                          <dd>
                                             <textarea class="scroll_textarea_original" rows="5"
                                                       v-model="nuevo_seguimiento.razon_no_cumplimiento">
                                                @{{ nuevo_seguimiento.razon_no_cumplimiento }}
                                             </textarea>
                                          </dd>


                                          <!-- Documentos Adjuntos -->
                                          <dt>Documentos Adjuntos:</dt>
                                          <dd>
                                             <input multiple="multiple" name="documento_adjunto[]" type="file"
                                                      @change="onFileChange" size="10">
                                          </dd>

                                       </div><!-- .col-md-* -->


                                       <div class="col-md-6">

                                      		<!-- Porcentaje de Avance -->
                                          <dt>Porcentaje de Avance (*):</dt>
                                          <dd v-if="auth.role != undefined && auth.role.role != 'Usuario Auditado'">
                                             <p class="control has-icon has-icon-right">
                                                <select name="porcentaje_avance" v-model="nuevo_seguimiento.porcentaje_avance"
                                                      v-validate="'required'" data-vv-delay="500"
                                                      :class="{'input': true, 'text-danger': errors.has('porcentaje_avance'),
                                                      'form-control':true}">

                                                   <option v-for="p in porcentajes_cumplimiento"
                                                           :value="p">
                                                      {{ p }}%
                                                   </option>
                                                </select>
                                                <transition name="bounce">
                                                <i v-show="errors.has('porcentaje_avance')" class="fa fa-warning"></i>
                                                </transition>
                                                <transition name="bounce">
                                                <span v-show="errors.has('porcentaje_avance')" class="text-danger">
                                                   {{ errors.first('porcentaje_avance') | replacePorcentajeAvance }}
                                                </span>
                                                </transition>
                                             </p>
                                          </dd>
                                          <dd v-else class="well well-sm">{{nuevo_seguimiento.porcentaje_avance || 0}}</dd>

                                          <!-- Estado -->
                                          <dt>Estado (*):</dt>
                                          <dd v-if="auth.role != undefined && auth.role.role != 'Usuario Auditado'">
                                             <p class="control has-icon has-icon-right">
                                                <select name="estado" v-model="nuevo_seguimiento.estado"
                                                      v-validate="'required'" data-vv-delay="500"
                                                      :class="{'input': true, 'text-danger': errors.has('estado'), 'form-control':true}">
                                                   <option value="Reprogramado">Reprogramado</option>
                                                   <option value="Vencido">Vencido</option>
                                                   <option value="Finalizado">Finalizado</option>
                                                   <option value="Vigente">Vigente</option>
                                                   <option value="Suscripcion">Suscripcion</option>
                                                </select>
                                                <transition name="bounce">
                                                <i v-show="errors.has('estado')" class="fa fa-warning"></i>
                                                </transition>
                                                <transition name="bounce">
                                                <span v-show="errors.has('estado')" class="text-danger">
                                                   {{ errors.first('estado') }}
                                                </span>
                                                </transition>
                                             </p>
                                          </dd>
                                          <dd v-else class="well well-sm">{{nuevo_seguimiento.estado}}</dd>


														<div v-show="nuevo_seguimiento.estado == 'Reprogramado'">
															<dt>Plazo Comprometido (*):</dt>
															<dd>
																<p class="control has-icon has-icon-right">
																	<input name="plazo_comprometido" type="text" id="ncpc3"
																			v-validate="'required'" data-vv-delay="500"
																			class="form-control" />

																	<transition name="bounce">
																	<i v-show="errors.has('plazo_comprometido')" class="fa fa-warning"></i>
																	</transition>
																	<transition name="bounce">
																	<span v-show="errors.has('plazo_comprometido')" class="text-danger">
																		{{ errors.first('plazo_comprometido') | replacePlazoComprometido }}
																	</span>
																	</transition>
																</p>
															</dd>
														</div>


                                          <!-- Observacion -->
                                          <dt>Observacion:</dt>
                                          <dd>
                                             <textarea class="scroll_textarea_original" rows="5" v-model="nuevo_seguimiento.observacion">
                                                @{{ nuevo_seguimiento.observacion }}
                                             </textarea>
                                          </dd>
                                       </div>

                                    </div><!-- styled -->
                                 </div><!-- .row -->
                              </dl>
									</slot>
						 		</div><!-- .modal-body -->
								<div class="modal-footer">
									<slot name="footer">
										<!--
										<button class="btn btn-sm btn-success" @click="$emit('close')">
											Aceptar
										</button>
										-->
										Los campos con <b>*</b> son obligatorios
									</slot>
								</div>
					  		</div>
						</div>
				 	</div>
			  	</transition>
			`,
         name: 'modal-nuevoseguimiento',
         data () {
            return {}
         },
         ready () {
         },
         created () {
            var self = this;
            var date = new Date();
            var dd = date.getDate();
            var mm = date.getMonth() + 1; //January is 0!
            var yyyy = date.getFullYear();
            this.min_date = yyyy + "-" + ((mm < 10) ? '0' + mm : mm) + "-" + ((dd < 10) ? '0' + dd : dd);

            $(document).ready(function () {

               // #ncpe => nuevo compromiso plazo estimado
               $('#ncpe3').datepicker({//ncpe => nuevo compromiso plazo estimado
                  format: "dd-mm-yyyy",
                  language: "es",
                  startDate: (function () {
                     return date = (function () {
                        var date = new Date();
                        date.setDate(date.getDate());
                        return date;
                     })();
                  })(),
                  autoclose: true,
               });

               $('#ncpe3').change(function () {//ncpe => nuevo compromiso plazo estimado
                  if ($('#ncpe3').val()) {

                     //hacer la validacion si es menor a la fecha actual, no avisar pero colocar la fecha que corresponde
                     var date_ncpe = $('#ncpe3').val().split('-');

                     var date_today = new Date();
                     var dd = date_today.getDate();
                     var mm = date_today.getMonth() + 1; //January is 0!
                     var yyyy = date_today.getFullYear();

                     if (date_ncpe.length == 3) {
                        if (date_ncpe[1].length != 2 || date_ncpe[0].length != 2 || date_ncpe[2].length != 4) {
                           $('#ncpe3').prop('value', ((dd < 10) ? '0' + dd : dd) + '-' + ((mm < 10) ? '0' + mm : mm) + '-' + yyyy);
                           self.nuevo_seguimiento.plazo_estimado = ((dd < 10) ? '0' + dd : dd) + '-' + ((mm < 10) ? '0' + mm : mm) + '-' + yyyy;
                           return;
                        }
                     }

                     var date_today = new Date(mm + '/' + dd + '/' + yyyy);
                     date_ncpe = new Date(date_ncpe[1] + '/' + date_ncpe[0] + '/' + date_ncpe[2]);

                     var timeDiff = date_today.getTime() - date_ncpe.getTime();//Math.abs(date_ncpe.getTime() - date_ncpc.getTime());
                     var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                     //console.log(diffDays);

                     if (diffDays < 0) {
                        $('#ncpc3').data('datepicker').setStartDate($('#ncpe3').val());
                        self.nuevo_seguimiento.plazo_estimado = $('#ncpe3').val();
                     } else {
                        $('#ncpe3').prop('value', ((dd < 10) ? '0' + dd : dd) + '-' + ((mm < 10) ? '0' + mm : mm) + '-' + yyyy);
                        self.nuevo_seguimiento.plazo_estimado = ((dd < 10) ? '0' + dd : dd) + '-' + ((mm < 10) ? '0' + mm : mm) + '-' + yyyy;
                     }

                     //Si es que ya se habia ingresado el plazo comprometido, valida el rango
                     if ($('#ncpc3').val()) {
                        var date_ncpc = $('#ncpc3').val().split('-');
                        date_ncpc = new Date(date_ncpc[1] + '/' + date_ncpc[0] + '/' + date_ncpc[2]);

                        var timeDiff = date_ncpc.getTime() - date_ncpe.getTime();//Math.abs(date_ncpe.getTime() - date_ncpc.getTime());
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                        if (diffDays < 0) {
                           alert('El plazo comprometido no puede ser menor al plazo estimado ni a la fecha actual');
                           $('#ncpc3').prop('value', null);
                           self.nuevo_seguimiento.plazo_comprometido = '';
                        }
                     }

                  }
               });


               // #ncpc => nuevo compromiso plazo comprometido
               $('#ncpc3').datepicker({//ncpc => nuevo compromiso plazo comprometido
                  format: "dd-mm-yyyy",
                  language: "es",
                  startDate: new Date(),
                  autoclose: true,
               });

               $('#ncpc3').click(function (event) {
                  if ($('#ncpe3').val()) {
                     $('#ncpc3').data('datepicker').setStartDate($('#ncpe3').val());
                  }
               });

               $('#ncpc3').change(function (event) {
                  var date_ncpe = $('#ncpe3').val().split('-');
                  date_ncpe = new Date(date_ncpe[1] + '/' + date_ncpe[0] + '/' + date_ncpe[2]);

                  var date_ncpc = $('#ncpc3').val().split('-');
                  date_ncpc = new Date(date_ncpc[1] + '/' + date_ncpc[0] + '/' + date_ncpc[2]);

                  var timeDiff = date_ncpc.getTime() - date_ncpe.getTime();//Math.abs(date_ncpe.getTime() - date_ncpc.getTime());
                  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                  if (diffDays < 0) {
                     alert('El plazo comprometido no puede ser menor al plazo estimado ni a la fecha actual');
                     $('#ncpc3').prop('value', null);
                  }

                  self.nuevo_seguimiento.plazo_comprometido = $('#ncpc3').val();
               });

            });
         },
         filters: {
            replacePorcentajeAvance(porcentaje_avance) {
               if (porcentaje_avance != null) {
                  porcentaje_avance = porcentaje_avance.replace('porcentaje_avance', 'porcentaje de avance');
               }
               return porcentaje_avance;
            },
            replacePlazoComprometido(plazo_comprometido) {
               if (plazo_comprometido != null) {
                  plazo_comprometido = plazo_comprometido.replace('plazo_comprometido', 'para el plazo comprometido');
               }
               return plazo_comprometido;
            },
            replacePlazoEstimado(plazo_estimado) {
               if (plazo_estimado != null) {
                  plazo_estimado = plazo_estimado.replace('plazo_estimado', ' para el plazo estimado');
               }
               return plazo_estimado;
            },
         },
         methods: {
            createImage: function (file) {
               var image = new Image();
               var reader = new FileReader();
               var vm = this;

               reader.onload = (e) => {
                  vm.image = e.target.result;
               };
               reader.readAsDataURL(file);
            },
            onFileChange: function (e) {
               var files = e.target.files || e.dataTransfer.files;

               var filesOverSizeLimit = [];
               var filesOk = [];

               $(files).each(function (f) {
                  //console.log(files[f].size); //tamaño
                  //console.log(files[f].name); //nombre
                  if (files[f].size > 10240000) {
                     filesOverSizeLimit.push(files[f]);
                  } else {
                     filesOk.push(files[f]);
                  }
               });

               if (filesOverSizeLimit.length > 0) {
                  let textNameFilesOverSizeLimit = '';
                  let textNameFilesOk = '';
                  $(filesOverSizeLimit).each(function (f) {
                     textNameFilesOverSizeLimit += "\n · " + filesOverSizeLimit[f].name;
                  });
                  $(filesOk).each(function (f) {
                     textNameFilesOk += "\n · " + filesOk[f].name;
                  });
                  alert(`
							Los siguientes archivos exceden el limite de memoria por archivo: ${textNameFilesOverSizeLimit}
							\n
							Los siguientes archivos estan permitidos: ${textNameFilesOk}
						`);
               }

               if (!filesOk.length)
                  return;
               this.nuevo_seguimiento.documento_adjunto = filesOk;
               //this.createImage(files[0]);
            },
         },
         watch: {},
      },
      /*
       '':{
       props: [''],
       template: `
       `,
       name: '',
       data () {
       return {
       }
       },
       ready () {
       },
       created () {
       },
       methods: {
       },
       watch: {
       },
       }
       */
   },
   created(){
      //this.fetchSeguimientos();
   },
   ready: {},
   filters: {},
   methods: {
      //camelCase() => for specific functions
      agregarFiltroEstadoGrid: function (estado) {
         if (!this.filtroEstado) {
            this.filtroEstado = true;
            this.seguimientosFiltroEstado = this.seguimientos;
         } else {
            this.seguimientos = this.seguimientosFiltroEstado;
         }
         //Itero la lista de seguimientos y filtro segun estado seleccionado
         this.seguimientos = _.filter(this.seguimientos, function (s) {
            return s.estado == estado;
         });
         if (this.seguimientos.length == 0) {
            this.seguimientos = this.seguimientosFiltroEstado;
            alert('Sin resultados para "' + estado + '"');
            //this.limpiarFiltros();
         }
      },
      agregarFiltroCondicionGrid: function (condicion) {
         if (!this.filtroCondicion) {
            this.filtroCondicion = true;
            this.seguimientosFiltroCondicion = this.seguimientos;
         } else {
            this.seguimientos = this.seguimientosFiltroCondicion;
         }

         //Itero la lista de seguimientos y filtro segun la condicion seleccionada
         this.seguimientos = _.filter(this.seguimientos, function (s) {
            return s.condicion == condicion;
         });

         if (this.seguimientos.length == 0) {
            this.seguimientos = this.seguimientosFiltroCondicion;
            alert('Sin resultados para "' + condicion + '"');
            //this.limpiarFiltros();
         }
      },
      agregarFiltroObservacionGrid: function (observacion) {
         if (!this.filtroObservacion) {
            this.filtroObservacion = true;
            this.seguimientosFiltroObservacion = this.seguimientos;
         } else {
            this.seguimientos = this.seguimientosFiltroObservacion;
         }

         //Itero la lista de seguimientos y filtro segun la observacion seleccionada
         this.seguimientos = _.filter(this.seguimientos, function (s) {
            s.observacion = s.observacion || 'Sin observacion';
            return s.observacion == observacion;
         });

         if (this.seguimientos.length == 0) {
            this.seguimientos = this.seguimientosFiltroObservacion;
            alert('Sin resultados para "' + observacion + '"');
            //this.limpiarFiltros();
         }
      },
      agregarFiltroRazonNoCumplimientoGrid: function (razonNoCumplimiento) {
         if (!this.filtroRazonNoCumplimiento) {
            this.filtroRazonNoCumplimiento = true;
            this.seguimientosFiltroRazonNoCumplimiento = this.seguimientos;
         } else {
            this.seguimientos = this.seguimientosFiltroRazonNoCumplimiento;
         }

         //Itero la lista de seguimientos y filtro segun la observacion seleccionada
         this.seguimientos = _.filter(this.seguimientos, function (s) {
            s.razon_no_cumplimiento = s.razon_no_cumplimiento || 'Sin razones';
            return s.razon_no_cumplimiento == razonNoCumplimiento;
         });

         if (this.seguimientos.length == 0) {
            this.seguimientos = this.seguimientosFiltroRazonNoCumplimiento;
            alert('Sin resultados para "' + razonNoCumplimiento + '"');
            //this.limpiarFiltros();
         }
      },
      agregarFiltroIdHallazgoGrid: function () {
         if (!this.filtroIdHallazgo) {
            this.filtroIdHallazgo = true;
            this.seguimientosFiltroIdHallazgo = this.seguimientos;
         } else {
            this.seguimientos = this.seguimientosFiltroIdHallazgo;
         }

         var self = this;
         //Itero la lista de hallazgos y filtro segun el id hallazgo ingresado
         this.seguimientos = _.filter(this.seguimientos, function (s) {
            return s.id_hallazgo == self.filterIdHallazgo;
         });
         /*
          if(this.seguimientos.length == 0){
          this.seguimientos = this.seguimientosFiltroIdHallazgo;
          if (this.filterIdHallazgo == '') return;
          else alert('Sin resultados para el id ingresado');
          }
          */
      },
      agregarFiltroIdCompromisoGrid: function () {
         if (!this.filtroIdCompromiso) {
            this.filtroIdCompromiso = true;
            this.seguimientosFiltroIdCompromiso = this.seguimientos;
         } else {
            this.seguimientos = this.seguimientosFiltroIdCompromiso;
         }

         var self = this;
         //Itero la lista de hallazgos y filtro segun el id hallazgo ingresado
         this.seguimientos = _.filter(this.seguimientos, function (c) {
            return c.id_compromiso == self.filterIdCompromiso;
         });
         /*
          if(this.seguimientos.length == 0){
          this.seguimientos = this.seguimientosFiltroIdCompromiso;
          if (this.filterIdCompromiso == '') return;
          else alert('Sin resultados para el id ingresado');
          }
          */
      },
      // change order variable direction
      changeListOrder: function (column) {
         this.gridOrder == 'asc' ? this.gridOrder = 'desc' : this.gridOrder = 'asc';
         this.orderLists(column);
      },
      crear_nuevo_seguimiento: function (nuevo_seguimiento) {

         if (!nuevo_seguimiento.id_compromiso || nuevo_seguimiento.id_compromiso == null || nuevo_seguimiento.id_compromiso == '') {
            alert('Debe seleccionar un compromiso');
            return;
         }

         var compromiso = gcf.findCompromisoById(this.compromisos, nuevo_seguimiento.id_compromiso);

         this.form_seguimiento_creable = compromiso.id_compromiso;

         this.nuevo_seguimiento.id_compromiso = compromiso.id_compromiso;
         this.nuevo_seguimiento.diferencia_tiempo = compromiso.plazo_comprometido_dias;
         this.nuevo_seguimiento.porcentaje_avance = compromiso.porcentaje_avance;

         this.nuevo_seguimiento.estado = compromiso.estado;
         this.nuevo_seguimiento.condicion = compromiso.condicion;

         this.nuevo_seguimiento.usuario_registra = this.auth.id;

         this.showModalNuevoSeguimiento = true;
         this.permiteGuardarNuevoSeguimiento = true;

         return this.nuevo_seguimiento;
      },
      fetchSeguimientos: function () {
         this._gcf = gcf;
         let id_proceso_auditado = $('#id_proceso_auditado').val();
         this.$http.get('/proceso_auditado/' + id_proceso_auditado + '/edit/ajax').then(response => { // success callback
            //console.log(response);
            this.area_proceso_auditado = response.body.area_proceso_auditado;
            this.proceso_auditado = response.body.proceso_auditado;

            this.hallazgos = response.body.hallazgos;
            this.hallazgosTmp = response.body.hallazgos;
            //this.hallazgo = response.body.hallazgo;

            this.compromisos = response.body.compromisos;
            this.compromisosTmp = response.body.compromisos;
            //this.compromiso = response.body.compromiso;

            this.compromisos_responsables = response.body.compromisos_responsables;
            this.compromisos_responsablesTmp = response.body.compromisos_responsables;

            this.seguimientos = response.body.seguimientos;
            this.seguimientosTmp = response.body.seguimientos;
            //this.seguimiento = response.body.seguimiento;

            this.archivos = response.body.archivos;
            this.archivosTmp = response.body.archivos;

            this.usuarios = response.body.usuarios;
            this.config = response.body.config;
            this.auth = response.body.auth;
            this.role = response.body.role;
            this.auditor = response.body.auditor;

            this.preloadSeguimientos();


            //Manda el controller que llama al metodo
            gcf.refetchControllersData({
               'proceso_auditado': this.proceso_auditado,
               'area_proceso_auditado': this.area_proceso_auditado,

               'hallazgos': this.hallazgos,
               'hallazgosTmp': this.hallazgos,

               'compromisos': this.compromisos,
               'compromisosTmp': this.compromisos,

               'compromisos_responsables': this.compromisos_responsables,
               'compromisos_responsablesTmp': this.compromisos_responsables,

               'seguimientos': this.seguimientos,
               'seguimientosTmp': this.seguimientos,

               'archivos': this.archivos,
               'archivosTmp': this.archivos,

               'usuarios': this.usuarios,
               'config': this.config,
               'auth': this.auth,
               'role': this.role,
               'auditor': this.auditor,

            }, {
               'HallazgoController': 'HallazgoController',
               'CompromisoController': 'CompromisoController',
               'ArchivoController': 'ArchivoController',
               'ResponsableController': 'ResponsableController',
            }, 'SeguimientoController');


            this.ctd_req_hallazgos = this.proceso_auditado.cantidad_hallazgo;
            this.ctd_hallazgos = this.hallazgos.length; // : cantidad actual de hallazgos referenciados al contraloria
            this.ctd_compromisos = this.compromisos.length;//this.ctd_compromisos = 0;
            this.ctd_seguimientos = this.seguimientos.length;

            HallazgoController.ctd_req_hallazgos =
               CompromisoController.ctd_req_hallazgos =
                  ArchivoController.ctd_req_hallazgos =
                     ResponsableController.ctd_req_hallazgos = this.ctd_req_hallazgos;

            HallazgoController.ctd_hallazgos =
               CompromisoController.ctd_hallazgos =
                  ArchivoController.ctd_hallazgos =
                     ResponsableController.ctd_hallazgos = this.ctd_hallazgos;

            HallazgoController.ctd_compromisos =
               CompromisoController.ctd_compromisos =
                  ArchivoController.ctd_compromisos =
                     ResponsableController.ctd_compromisos = this.ctd_compromisos;

            HallazgoController.ctd_seguimientos =
               CompromisoController.ctd_seguimientos =
                  ArchivoController.ctd_seguimientos =
                     ResponsableController.ctd_seguimientos = this.ctd_seguimientos;

            HallazgoController._gcf =
               CompromisoController._gcf =
                  ArchivoController._gcf =
                     ResponsableController._gcf = this._gcf;


         }, response => { // error callback
            console.log('Error fetchCompromisos: ' + response);
         });
      },
      filterGridSeguimientoByComboHallazgo: function (id_hallazgo) {
         this.filterIdHallazgo = id_hallazgo || null;
         if (this.filterIdHallazgo != null) {
            return this.agregarFiltroIdHallazgoGrid();
         } else {
            //alert('Debe seleccionar un hallazgo');
            this.limpiarFiltros();
         }
         return;
      },
      filterGridSeguimientoByComboCompromiso: function (id_compromiso) {
         this.limpiarFiltros();
         this.filterIdCompromiso = id_compromiso || null;
         if (this.filterIdCompromiso != null) {
            return this.agregarFiltroIdCompromisoGrid();
         } else {
            //alert('Debe seleccionar un compromiso');
            this.limpiarFiltros();
         }
         return;
      },
      limpiarFiltros: function () {
         this.compromisos = this.compromisosTmp;
         this.seguimientos = this.seguimientosTmp;
         this.seguimientosFiltroEstado = this.seguimientos;
         this.seguimientosFiltroCondicion = this.seguimientos;
         this.seguimientosFiltroObservacion = this.seguimientos;
         this.seguimientosFiltroRazonNoCumplimiento = this.seguimientos;
         this.filtroNomenclatura = false;
         this.filtroEstado = false;
         this.filtroCondicion = false;
         this.filtroObservacion = false;
         this.filtroRazonNoCumplimiento = false;
         this.mensajeResultadoConFiltros = false;
      },
      limpiarNuevoSeguimiento: function () {
         this.nuevo_seguimiento = {};
         return this.nuevo_seguimiento = {
            'id_hallazgo': '',
            'id_compromiso': '',
            'diferencia_tiempo': '',
            'documento_adjunto': {},
            'estado': '',
            'condicion': '',
            'porcentaje_avance': '',
            'plazo_estimado': '',
            'plazo_comprometido': '',
         }
      },
      // function to order users in the list
      orderLists: function (column) {
         this.seguimientos = _.orderBy(this.seguimientos, column, this.gridOrder);
         //console.log(column);
         //this.lists = this.shuffle(_.orderBy(this.lists, 'name', this.listOrder));
         //console.log(this.lists.length);
      },
      preloadSeguimientos: function () {

         for (let s in this.seguimientos) {
            this.seguimientos[s].id_hallazgo = gcf.findCompromisoById(this.compromisos, this.seguimientos[s].id_compromiso).id_hallazgo;
            this.seguimientos[s].nombre_hallazgo = gcf.findHallazgoById(this.hallazgos, this.seguimientos[s].id_hallazgo).nombre_hallazgo;
            this.seguimientos[s].nombre_compromiso = gcf.findCompromisoById(this.compromisos, this.seguimientos[s].id_compromiso).nombre_compromiso;
            this.seguimientos[s].usuario_registra = gcf.findById(this.usuarios, this.seguimientos[s].usuario_registra);
            this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra ?
               this.seguimientos[s].usuario_registra.name : 'Sistema';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';

         }

         //De fetchCompromisos para compromisos_responsables
         for (let r in this.compromisos_responsables) {
            this.compromisos_responsables[r].id_hallazgo =
               gcf.findCompromisoById(this.compromisos, this.compromisos_responsables[r].id_compromiso).id_hallazgo;
            this.compromisos_responsables[r].nombre_hallazgo =
               gcf.findHallazgoById(this.hallazgos, this.compromisos_responsables[r].id_hallazgo).nombre_hallazgo;
            this.compromisos_responsables[r].nombre_compromiso =
               gcf.findCompromisoById(this.compromisos, this.compromisos_responsables[r].id_compromiso).nombre_compromiso;

            this.compromisos_responsables[r].area = this.compromisos_responsables[r].area_proceso_auditado.descripcion;
         }

         //De fetchArchivos para archivos
         for (let a in this.archivos) {
            this.archivos[a].id_hallazgo = gcf.findCompromisoById(this.compromisos, this.archivos[a].id_compromiso).id_hallazgo;
            this.archivos[a].nombre_hallazgo = gcf.findHallazgoById(this.hallazgos, this.archivos[a].id_hallazgo).nombre_hallazgo;
            this.archivos[a].nombre_compromiso = gcf.findCompromisoById(this.compromisos, this.archivos[a].id_compromiso).nombre_compromiso;
            this.archivos[a].usuario_registra = gcf.findById(this.usuarios, this.archivos[a].usuario_registra);
            this.archivos[a].usuario_registra = this.archivos[a].usuario_registra ?
               this.archivos[a].usuario_registra.name : 'Sistema';
            this.archivos[a].observacion = this.archivos[a].observacion || 'Sin Observacion';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';
         }


      },
      showModalData: function (id_seguimiento) {
         this.seguimiento = gcf.findSeguimientoById(this.seguimientos, id_seguimiento);
         this.compromiso = gcf.findCompromisoById(this.compromisos, this.seguimiento.id_compromiso);
         this.hallazgo = gcf.findHallazgoById(this.hallazgos, this.compromiso.id_hallazgo);
         this.seguimiento.id_hallazgo = this.hallazgo.id_hallazgo;
         this.seguimiento.nombre_hallazgo = this.hallazgo.nombre_hallazgo;
         this.seguimiento.id_compromiso = this.compromiso.id_compromiso;
         this.seguimiento.nombre_compromiso = this.compromiso.nombre_compromiso;
         this.seguimiento.usuario_registra = gcf.findById(this.usuarios, this.seguimiento.usuario_registra);
         this.seguimiento.usuario_registra = this.seguimiento.usuario_registra ?
            this.seguimiento.usuario_registra.name : 'Sistema';
         return this.showModal = true;
      },
      /* for transition group flip */
      shuffle: function (items) {
         return _.shuffle(items)
      },
      seguimiento_reprogramado: function (seguimiento) {
         let seguimientoTmp = seguimiento;
         let ctd_seguimientos_rpg = _.filter(seguimientoTmp.seguimiento, function (s) {
            return s.estado == 'Reprogramado';
         });
         seguimiento.ctd_seguimientos_rpg = ctd_seguimientos_rpg.length || 0;
         return ctd_seguimientos_rpg.length || 0;
      },
      seguimiento_no_reprogramado: function (seguimiento) {
         let seguimientoTmp = seguimiento;
         let ctd_seguimientos_norpg = _.filter(seguimientoTmp.seguimiento, function (s) {
            return s.estado != 'Reprogramado';
         });
         seguimiento.ctd_seguimientos_norpg = ctd_seguimientos_norpg.length || 0;
         return ctd_seguimientos_norpg.length || 0;
      },

      //with_dash() => for explained specific functions
      cambiar_form_seguimiento_editable: function (id_seguimiento) {
         this.form_seguimiento_editable = (this.form_seguimiento_editable == false ? true : false);
         return this.form_seguimiento_editable = id_seguimiento;
      },
      filtrar_compromisos_nuevo_seguimiento: function (id_hallazgo) {
         this.limpiarFiltros();
         var hallazgo = gcf.findHallazgoById(this.hallazgos, id_hallazgo);
         this.nuevo_seguimiento.id_compromiso = '';
         this.filterGridSeguimientoByComboHallazgo(id_hallazgo);
      },
      guardar_form_seguimiento_editable: function (id_seguimiento, cindex) {
         if (this.form_seguimiento_editable != 0 && id_seguimiento != 0) {
            //Lo guarda, verifica si los datos del objeto que son necesarios son iguales, sino que no lo guarde
            let seguimientoTmp = this.seguimientos[cindex];
            //console.log(seguimientoTmp);
            //console.log(seguimientoTmp);
            Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
            this.$http.put('/seguimiento/' + id_seguimiento, seguimientoTmp).then(response => {
               //console.log(response.body);

               var self = this;
               setTimeout(function () {
                  self.fetchSeguimientos();
                  self.form_seguimiento_editable = 0;
               }, 500);
            }, response => {
               // error callback
            });
            //if()
         } else {
            //Lo guarda
         }
      },
      guardar_nuevo_seguimiento: function () {
         this.$validator.validateAll().then(result => {
         });
         if (this.permiteGuardarNuevoSeguimiento == true) {
            this.permiteGuardarNuevoSeguimiento = false;
            if (this.nuevo_seguimiento.porcentaje_avance != '' &&
               this.nuevo_seguimiento.estado != '' &&
               this.nuevo_seguimiento.condicion != '' &&
               (
                  this.nuevo_seguimiento.estado == 'Reprogramado' && (
                  this.nuevo_seguimiento.plazo_estimado != '' &&
                  this.nuevo_seguimiento.plazo_comprometido != '' )
                  || this.nuevo_seguimiento.estado != 'Reprogramado'
               ) &&
               this.nuevo_seguimiento != {}) {

               this.spinner_upload = true;
               var formData = new FormData();
               $.each(this.nuevo_seguimiento.documento_adjunto, function (i, file) {
                  formData.append('documento_adjunto[]', file);
               });

               formData.append('id_compromiso', this.nuevo_seguimiento.id_compromiso);
               formData.append('diferencia_tiempo', this.nuevo_seguimiento.diferencia_tiempo || 0);
               formData.append('usuario_registra', this.nuevo_seguimiento.usuario_registra);
               formData.append('porcentaje_avance', this.nuevo_seguimiento.porcentaje_avance);
               formData.append('plazo_estimado', this.nuevo_seguimiento.plazo_estimado);
               formData.append('plazo_comprometido', this.nuevo_seguimiento.plazo_comprometido);
               formData.append('estado', this.nuevo_seguimiento.estado);
               formData.append('condicion', this.nuevo_seguimiento.condicion);
               formData.append('observacion', this.nuevo_seguimiento.observacion || '');
               formData.append('razon_no_cumplimiento', this.nuevo_seguimiento.razon_no_cumplimiento || '');
               formData.append('_token', $('#_token').val());

               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

               const config = {headers: {'Content-Type': 'multipart/form-data'}};
               this.$http.post('/seguimiento', formData, config).then(response => {

                  this.seguimientos.push(response.body);
                  this.seguimientosTmp.push(response.body);
                  var self = this;
                  setTimeout(function () {
                     self.fetchSeguimientos();
                     self.form_hallazgo_editable = 0;
                     self.limpiarNuevoSeguimiento();
                     self.form_seguimiento_creable = 0;
                     self.showModalNuevoSeguimiento = false;
                     self.permiteGuardarNuevoSeguimiento = true;
                     self.spinner_upload = false;
                  }, 500);
               }, response => {
               });
            } else {
               this.permiteGuardarNuevoSeguimiento = true;
            }
         } else {
            alert('Se esta procesando la solicitud');
         }
      },
   },
});

const ArchivoController = new Vue({
   el: '#ArchivoController',
   data(){
      return {
         'area_proceso_auditado': [],
         'proceso_auditado': {},

         'hallazgos': {},
         'hallazgosTmp': {},
         'hallazgo': [],

         'compromisos': [],
         'compromisosTmp': [],
         'compromiso': [],

         'compromisos_responsables': [],
         'compromisos_responsablesTmp': [],

         'porcentajes_cumplimiento': {0: 0, 1: 10, 2: 20, 3: 30, 4: 40, 5: 50, 6: 60, 7: 70, 8: 80, 9: 90, 10: 100},

         'seguimientos': [],
         'seguimientosTmp': [],
         'seguimiento': {},

         'archivos': {},
         'archivosTmp': {},

         'usuarios': [],
         'config': [],
         'auth': [],
         'role': [],
         'auditor': [],


         'index': 0,
         'ctd_hallazgos': 0,
         'ctd_compromisos': 0,
         'ctd_seguimientos': 0,
         'ctd_req_hallazgos': 0,


         'filterTerm': '',
         'filterIdCompromiso': '',
         'filterIdHallazgo': '',
         'filterIdSeguimiento': '',
         'filterIdArchivo': '',
         'gridOrder': 'asc',

         'mensajeResultadoConFiltros': false,
         'filtroDescripcion': false,
         'filtroObservacion': false,
         'filtroIdHallazgo': false,
         'filtroIdCompromiso': false,
         'showModal': false,
         'showModalNuevoSeguimiento': false,
         'spinner_upload': false,

         'archivosFiltroDescripcion': {},
         'archivosFiltroIdHallazgo': {},
         'archivosFiltroIdCompromiso': {},

         /*
          'nuevo_archivo':{
          'id_hallazgo' : '',
          'id_compromiso' : '',
          'documento_adjunto' : {},
          'usuario_registra' : 1,
          'descripcion' : '',
          },
          */

         'nuevo_seguimiento': {
            'id_compromiso': '',
            'id_hallazgo': '',
            'documento_adjunto': {},
            'usuario_registra': 1,
         },

         'excel_json_fields': {
            'id_medio_verificacion': 'String',
            'id_hallazgo': 'String',
            'nombre_hallazgo': 'String',
            'id_compromiso': 'String',
            'nombre_compromiso': 'String',
            'descripcion': 'String',
            'observacion': 'String',
            'documento_adjunto': 'String',
            'usuario_registra': 'String',
            'created_at': 'String',
            'upadted_at': 'String',
         },
         excel_json_data: [],
         excel_data_count: '',
         append_to_json_excel: {},

         _gcf: gcf,
      }
   },
   computed: {},
   watch: {
      archivos: function (archivos) {
         var self = this;
         this.excel_json_data = [];
         return archivos.map(function (a, index) {
            return self.excel_json_data.push({
               'id_medio_verificacion': a.id_medio_verificacion,
               'id_hallazgo': a.id_hallazgo,
               'nombre_hallazgo': a.nombre_hallazgo,
               'id_compromiso': a.id_compromiso,
               'nombre_compromiso': a.nombre_compromiso,
               'descripcion': a.descripcion,
               'observacion': a.observacion,
               'usuario_registra': a.usuario_registra,
               'created_at': a.created_at,
               'updated_at': a.updated_at,
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
            'excel_json_fields': {
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
               for (var colName in this.excel_json_fields) {
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
                     xml += '    <ss:Data ss:Type="' + this.excel_json_fields[col] + '">';
                     xml += String(data[row][col]).replace(/[^a-zA-Z0-9\s\-ñíéáóú\#\,\.\;\:ÑÍÉÓÁÚ]/g, '') + '</ss:Data>\n';
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
      'spinner': {
         props: [''],
         'name': 'spinner',
         'template': `
	         <div class="loader text-center">Cargando tabla, espere por favor...</div>
	      `,
         data () {
            return {
               visible: false,
            }
         },
         ready () {
         },
         created(){
         },
         filters: {},
         methods: {},
      },
      'mini-spinner': {
         props: [''],
         'name': 'mini-spinner',
         'template': `
	         <div class="loader-mini text-center">Cargando tabla, espere por favor...</div>
	      `,
         data () {
            return {
               visible: false,
            }
         },
         ready () {
         },
         created(){
         },
         filters: {},
         methods: {},
      },
      'modal': {
         props: ['archivo'],
         template: `
			   <!-- template for the modal component -->
			   <transition name="modal">
				   <div class="modal-mask">
					   <div class="modal-wrapper">
					      <div class="modal-container">

						      <div class="modal-header">
							      <slot name="header"></slot>
						      </div>

						      <div class="modal-body">
							      <slot name="body">
                              <dl class="dl-vertical">
                                 <div class="row">
									         <div style="overflow-y: scroll;max-height: 400px;">
                                       <div class="col-md-6">
                                          <dt>Id del Hallazgo</dt>
                                          <dd class="well well-sm">{{archivo.id_hallazgo || '0'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Id del Compromiso</dt>
                                          <dd class="well well-sm">{{archivo.id_compromiso || '0'}}</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Nombre del Hallazgo</dt>
                                          <dd class="well well-sm">{{archivo.nombre_hallazgo || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Nombre del Compromiso</dt>
                                          <dd class="well well-sm">{{archivo.nombre_compromiso || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Descripcion</dt>
                                          <dd class="well well-sm">{{archivo.descripcion || 'Descripcion'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Fecha Creacion</dt>
                                          <dd class="well well-sm">{{archivo.created_at || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Fecha ultimo Seguimiento</dt>
                                          <dd class="well well-sm">{{archivo.updated_at || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Usuario que Registra</dt>
                                          <dd class="well well-sm">{{archivo.usuario_registra || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Observacion</dt>
                                          <dd class="well well-sm">{{archivo.observacion || 'Sin Observacion'}}</dd>
                                       </div>
                                       <!--
                                       <div class="col-md-12">
                                          <dt>Contenido del archivo</dt>
                                          <dd class="well well-sm">{{archivo.contenido_documento_adjunto}}</dd>
                                       </div>
                                       -->

                                    </div><!-- styled -->
                                 </div><!-- .row -->
                              </dl>
							      </slot>
						      </div>

						      <!--
						      <div class="modal-footer">
							      <slot name="footer">
							         <button class="btn btn-sm btn-success" @click="$emit('close')">
								         Aceptar
							         </button>
                           </slot>
						      </div>
						      -->
					      </div>
                  </div>
				   </div>
			   </transition>
			`,
         name: 'modal',
         data () {
            return {}
         },
         ready () {
         },
         created () {
         },
         methods: {},
         watch: {},
      },
      'modal-nuevoseguimiento': {
         props: ['nuevo_seguimiento'],
         template: `
				<!-- template for the modal component -->
			  	<transition name="modal">
				 	<div class="modal-mask">
						<div class="modal-wrapper">
					  		<div class="modal-container">

						 		<div class="modal-header">
									<slot name="header"></slot>
						 		</div>
						 		<div class="modal-body">
									<slot name="body">
                              <dl class="dl-vertical" style="margin: 20px;">
                                 <div class="row">
                                    <div style="overflow-y: scroll;max-height: 400px;">
                                       <div class="col-md-12">


                                          <!-- Documentos Adjuntos -->
                                          <dt>Documentos Adjuntos:</dt>
                                          <dd>
                                             <input multiple="multiple" name="documento_adjunto[]" type="file"
                                                      @change="onFileChange" size="10">
                                          </dd>
                                          <br />


                                       </div><!-- .col-md-* -->

                                    </div><!-- styled -->
                                 </div><!-- .row -->
                              </dl>
									</slot>
						 		</div><!-- .modal-body -->
								<div class="modal-footer">
									<slot name="footer">
										<!--
										<button class="btn btn-sm btn-success" @click="$emit('close')">
											Aceptar
										</button>
										-->
										Los campos con <b>*</b> son obligatorios
									</slot>
								</div>
					  		</div>
						</div>
				 	</div>
			  	</transition>
			`,
         name: 'modal-nuevoseguimiento',
         data () {
            return {}
         },
         ready () {
         },
         created () {
         },
         filters: {},
         methods: {
            createImage: function (file) {
               var image = new Image();
               var reader = new FileReader();
               var vm = this;

               reader.onload = (e) => {
                  vm.image = e.target.result;
               };
               reader.readAsDataURL(file);
            },
            onFileChange: function (e) {
               var files = e.target.files || e.dataTransfer.files;
               var filesOverSizeLimit = [];
               var filesOk = [];

               $(files).each(function (f) {
                  //console.log(files[f].size); //tamaño
                  //console.log(files[f].name); //nombre
                  if (files[f].size > 10240000) {
                     filesOverSizeLimit.push(files[f]);
                  } else {
                     filesOk.push(files[f]);
                  }
               });

               if (filesOverSizeLimit.length > 0) {
                  let textNameFilesOverSizeLimit = '';
                  let textNameFilesOk = '';
                  $(filesOverSizeLimit).each(function (f) {
                     textNameFilesOverSizeLimit += "\n · " + filesOverSizeLimit[f].name;
                  });
                  $(filesOk).each(function (f) {
                     textNameFilesOk += "\n · " + filesOk[f].name;
                  });
                  alert(`
							Los siguientes archivos exceden el limite de memoria por archivo: ${textNameFilesOverSizeLimit}
							\n
							Los siguientes archivos estan permitidos: ${textNameFilesOk}
						`);
               }

               if (!filesOk.length)
                  return;
               this.nuevo_seguimiento.documento_adjunto = filesOk;
               //this.createImage(files[0]);
            },
         },
         watch: {},
      },
      /*
       '':{
       props: [''],
       template: `
       `,
       name: '',
       data () {
       return {
       }
       },
       ready () {
       },
       created () {
       },
       methods: {
       },
       watch: {
       },
       }
       */
   },
   created(){
      //this.fetchArchivos();
   },
   ready: {},
   filters: {},
   methods: {
      //camelCase() => for specific functions
      agregarFiltroIdHallazgoGrid: function () {
         if (!this.filtroIdHallazgo) {
            this.filtroIdHallazgo = true;
            this.archivosFiltroIdHallazgo = this.archivos;
         } else {
            this.archivos = this.archivosFiltroIdHallazgo;
         }

         var self = this;
         //Itero la lista de hallazgos y filtro segun el id hallazgo ingresado
         this.archivos = _.filter(this.archivos, function (s) {
            return s.id_hallazgo == self.filterIdHallazgo;
         });
         /*
          if(this.archivos.length == 0){
          this.archivos = this.archivosFiltroIdHallazgo;
          if (this.filterIdHallazgo == '') return;
          else alert('Sin resultados para el id ingresado');
          }
          */
      },
      agregarFiltroIdCompromisoGrid: function () {
         if (!this.filtroIdCompromiso) {
            this.filtroIdCompromiso = true;
            this.archivosFiltroIdCompromiso = this.archivos;
         } else {
            this.archivos = this.archivosFiltroIdCompromiso;
         }

         var self = this;
         //Itero la lista de hallazgos y filtro segun el id compromiso ingresado
         this.archivos = _.filter(this.archivos, function (s) {
            return s.id_compromiso == self.filterIdCompromiso;
         });
         /*
          if(this.archivos.length == 0){
          this.archivos = this.archivosFiltroIdCompromiso;
          if (this.filterIdCompromiso == '') return;
          else alert('Sin resultados para el id ingresado');
          }
          */
      },
      // change order variable direction
      changeListOrder: function (column) {
         this.gridOrder == 'asc' ? this.gridOrder = 'desc' : this.gridOrder = 'asc';
         this.orderLists(column);
      },
      download_file: function (archivo) {
         window.open('/mv/compromiso/' + archivo.id_compromiso + '/' + archivo.descripcion + '/')
      },
      crear_nuevo_archivo: function (id_compromiso) {

         this.compromiso = gcf.findCompromisoById(this.compromisos, id_compromiso);

         if (this.compromiso != null) {
            this.nuevo_seguimiento.id_compromiso = this.compromiso.id_compromiso;
            this.nuevo_seguimiento.usuario_registra = this.auth.id;

            this.showModalNuevoSeguimiento = true;
            this.permiteGuardarNuevoSeguimiento = true;
         }


      },

      guardar_nuevo_seguimiento: function () {
         if (this.permiteGuardarNuevoSeguimiento == true) {
            this.permiteGuardarNuevoSeguimiento = false;
            if (
               this.nuevo_seguimiento.id_compromiso != '' &&
               this.nuevo_seguimiento.documento_adjunto.length > 0 &&
               this.nuevo_seguimiento != {}) {

               this.spinner_upload = true;
               var formData = new FormData();
               $.each(this.nuevo_seguimiento.documento_adjunto, function (i, file) {
                  formData.append('documento_adjunto[]', file);
               });

               formData.append('id_compromiso', this.nuevo_seguimiento.id_compromiso);
               formData.append('usuario_registra', this.nuevo_seguimiento.usuario_registra);
               formData.append('_token', $('#_token').val());

               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               const config = {headers: {'Content-Type': 'multipart/form-data'}};
               this.$http.post('/seguimiento/store/medio_verificacion/' + this.nuevo_seguimiento.id_compromiso, formData, config).then(response => {
                  var self = this;
                  setTimeout(() => {
                     self.fetchArchivos();
                  }, 500);
                  this.limpiarNuevoSeguimiento();

                  this.showModalNuevoSeguimiento = false;
                  this.spinner_upload = false;
               }, response => {
               });

            } else {
               this.permiteGuardarNuevoSeguimiento = true;
            }
         } else {
            alert('Se esta procesando la solicitud');
         }
      },
      fetchArchivos: function () {
         this._gcf = gcf;
         let id_proceso_auditado = $('#id_proceso_auditado').val();
         this.$http.get('/proceso_auditado/' + id_proceso_auditado + '/edit/ajax').then(response => { // success callback
            //console.log(response);
            this.area_proceso_auditado = response.body.area_proceso_auditado;
            this.proceso_auditado = response.body.proceso_auditado;

            this.hallazgos = response.body.hallazgos;
            this.hallazgosTmp = response.body.hallazgos;
            //this.hallazgo = response.body.hallazgo;

            this.compromisos = response.body.compromisos;
            this.compromisosTmp = response.body.compromisos;
            //this.compromiso = response.body.compromiso;

            this.compromisos_responsables = response.body.compromisos_responsables;
            this.compromisos_responsablesTmp = response.body.compromisos_responsables;

            this.seguimientos = response.body.seguimientos;
            this.seguimientosTmp = response.body.seguimientos;
            //this.seguimiento = response.body.seguimiento;

            this.archivos = response.body.archivos;
            this.archivosTmp = response.body.archivos;

            this.usuarios = response.body.usuarios;
            this.config = response.body.config;
            this.auth = response.body.auth;
            this.role = response.body.role;
            this.auditor = response.body.auditor;

            this.preloadArchivos();


            //Manda el controller que llama al metodo
            gcf.refetchControllersData({
               'proceso_auditado': this.proceso_auditado,
               'area_proceso_auditado': this.area_proceso_auditado,

               'hallazgos': this.hallazgos,
               'hallazgosTmp': this.hallazgos,

               'compromisos': this.compromisos,
               'compromisosTmp': this.compromisos,

               'compromisos_responsables': this.compromisos_responsables,
               'compromisos_responsablesTmp': this.compromisos_responsables,

               'seguimientos': this.seguimientos,
               'seguimientosTmp': this.seguimientos,

               'archivos': this.archivos,
               'archivosTmp': this.archivos,

               'usuarios': this.usuarios,
               'config': this.config,
               'auth': this.auth,
               'role': this.role,
               'auditor': this.auditor,

            }, {
               'HallazgoController': 'HallazgoController',
               'CompromisoController': 'CompromisoController',
               'SeguimientoController': 'SeguimientoController',
               'ResponsableController': 'ResponsableController',
            }, 'ArchivoController');


            this.ctd_req_hallazgos = this.proceso_auditado.cantidad_hallazgo;
            this.ctd_hallazgos = this.hallazgos.length; // : cantidad actual de hallazgos referenciados al contraloria
            this.ctd_compromisos = this.compromisos.length;//this.ctd_compromisos = 0;
            this.ctd_seguimientos = this.seguimientos.length;

            HallazgoController.ctd_req_hallazgos =
               CompromisoController.ctd_req_hallazgos =
                  SeguimientoController.ctd_req_hallazgos =
                     ResponsableController.ctd_req_hallazgos = this.ctd_req_hallazgos;

            HallazgoController.ctd_hallazgos =
               CompromisoController.ctd_hallazgos =
                  SeguimientoController.ctd_hallazgos =
                     ResponsableController.ctd_hallazgos = this.ctd_hallazgos;

            HallazgoController.ctd_compromisos =
               CompromisoController.ctd_compromisos =
                  SeguimientoController.ctd_compromisos =
                     ResponsableController.ctd_compromisos = this.ctd_compromisos;

            HallazgoController.ctd_seguimientos =
               CompromisoController.ctd_seguimientos =
                  SeguimientoController.ctd_seguimientos =
                     ResponsableController.ctd_seguimientos = this.ctd_seguimientos;

            HallazgoController._gcf =
               CompromisoController._gcf =
                  SeguimientoController._gcf =
                     ResponsableController._gcf = this._gcf;

         }, response => { // error callback
            console.log('Error fetchArchivos: ' + response);
         });
      },
      filterGridArchivoByComboHallazgo: function (id_hallazgo) {
         this.filterIdHallazgo = id_hallazgo || null;
         if (this.filterIdHallazgo != null) {
            return this.agregarFiltroIdHallazgoGrid();
         } else {
            //alert('Debe seleccionar un hallazgo');
            this.limpiarFiltros();
         }
         return;
      },
      filterGridArchivoByComboCompromiso: function (id_compromiso) {
         this.limpiarFiltros();
         this.filterIdCompromiso = id_compromiso || null;
         if (this.filterIdCompromiso != null) {
            return this.agregarFiltroIdCompromisoGrid();
         } else {
            //alert('Debe seleccionar un compromiso');
            this.limpiarFiltros();
         }
         return;
      },
      limpiarFiltros: function () {
         this.archivos = this.archivosTmp;
      },
      limpiarNuevoSeguimiento: function () {
         return this.nuevo_seguimiento = {
            'id_compromiso': '',
            'id_hallazgo': '',
            'documento_adjunto': {},
            'usuario_registra': 1,
         };
      },
      // function to order users in the list
      orderLists: function (column) {
         this.archivos = _.orderBy(this.archivos, column, this.gridOrder);
         //console.log(column);
         //this.lists = this.shuffle(_.orderBy(this.lists, 'name', this.listOrder));
         //console.log(this.lists.length);
      },
      preloadArchivos: function () {
         for (let a in this.archivos) {
            this.archivos[a].id_hallazgo = gcf.findCompromisoById(this.compromisos, this.archivos[a].id_compromiso).id_hallazgo;
            this.archivos[a].nombre_hallazgo = gcf.findHallazgoById(this.hallazgos, this.archivos[a].id_hallazgo).nombre_hallazgo;
            this.archivos[a].nombre_compromiso = gcf.findCompromisoById(this.compromisos, this.archivos[a].id_compromiso).nombre_compromiso;
            this.archivos[a].usuario_registra = gcf.findById(this.usuarios, this.archivos[a].usuario_registra);
            this.archivos[a].usuario_registra = this.archivos[a].usuario_registra ?
               this.archivos[a].usuario_registra.name : 'Sistema';
            this.archivos[a].observacion = this.archivos[a].observacion || 'Sin Observacion';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';
         }

         for (let s in this.seguimientos) {
            this.seguimientos[s].id_hallazgo = gcf.findCompromisoById(this.compromisos, this.seguimientos[s].id_compromiso).id_hallazgo;
            this.seguimientos[s].nombre_hallazgo = gcf.findHallazgoById(this.hallazgos, this.seguimientos[s].id_hallazgo).nombre_hallazgo;
            this.seguimientos[s].nombre_compromiso = gcf.findCompromisoById(this.compromisos, this.seguimientos[s].id_compromiso).nombre_compromiso;
            this.seguimientos[s].usuario_registra = gcf.findById(this.usuarios, this.seguimientos[s].usuario_registra);
            this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra ?
               this.seguimientos[s].usuario_registra.name : 'Sistema';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';

         }

         //De fetchCompromisos para compromisos_responsables
         for (let r in this.compromisos_responsables) {
            this.compromisos_responsables[r].id_hallazgo =
               gcf.findCompromisoById(this.compromisos, this.compromisos_responsables[r].id_compromiso).id_hallazgo;
            this.compromisos_responsables[r].nombre_hallazgo =
               gcf.findHallazgoById(this.hallazgos, this.compromisos_responsables[r].id_hallazgo).nombre_hallazgo;
            this.compromisos_responsables[r].nombre_compromiso =
               gcf.findCompromisoById(this.compromisos, this.compromisos_responsables[r].id_compromiso).nombre_compromiso;

            this.compromisos_responsables[r].area = this.compromisos_responsables[r].area_proceso_auditado.descripcion;
         }
      },
      showModalData: function (id_medio_verificacion) {
         this.archivo = gcf.findArchivoById(this.archivos, id_medio_verificacion);
         this.compromiso = gcf.findCompromisoById(this.compromisos, this.archivo.id_compromiso);
         this.hallazgo = gcf.findHallazgoById(this.hallazgos, this.compromiso.id_hallazgo);
         this.archivo.nombre_compromiso = this.compromiso.nombre_compromiso;
         this.archivo.id_hallazgo = this.hallazgo.id_hallazgo;
         this.archivo.nombre_hallazgo = this.hallazgo.nombre_hallazgo;
         this.archivo.usuario_registra = gcf.findById(this.usuarios, this.archivo.usuario_registra);
         this.archivo.usuario_registra = this.archivo.usuario_registra ?
            this.archivo.usuario_registra.name : 'Sistema';

         var rawFile = new XMLHttpRequest();
         var self = this;
         rawFile.open("GET",
            'http://' + window.location.host + '/mv/compromiso/' + this.archivo.id_compromiso + '/' + this.archivo.descripcion, false);
         rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
               if (rawFile.status === 200 || rawFile.status == 0) {
                  var allText = rawFile.responseText;
                  //alert(allText);
                  self.archivo.contenido_documento_adjunto = rawFile.responseText;
               }
            }
         }
         rawFile.send(null);

         return this.showModal = true;
      },
      /* for transition group flip */
      shuffle: function (items) {
         return _.shuffle(items)
      },
      filtrar_compromisos_nuevo_archivo: function (id_hallazgo) {
         this.limpiarFiltros();
         var hallazgo = gcf.findHallazgoById(this.hallazgos, id_hallazgo);
         this.nuevo_archivo.id_compromiso = '';
         this.filterGridArchivoByComboHallazgo(id_hallazgo);
      },
   },
});

const ResponsableController = new Vue({
   el: '#ResponsableController',
   data(){
      return {
         'area_proceso_auditado': [],
         'proceso_auditado': {},

         'hallazgos': {},
         'hallazgosTmp': {},
         'hallazgo': [],

         'compromisos': [],
         'compromisosTmp': [],
         'compromiso': [],

         'compromisos_responsables': [],
         'compromisos_responsablesTmp': [],

         'porcentajes_cumplimiento': {0: 0, 1: 10, 2: 20, 3: 30, 4: 40, 5: 50, 6: 60, 7: 70, 8: 80, 9: 90, 10: 100},

         'seguimientos': {},
         'seguimientosTmp': {},
         'seguimiento': {},

         'archivos': {},
         'archivosTmp': {},

         'usuarios': [],
         'config': [],
         'auth': [],
         'role': [],
         'auditor': [],

         'index': 0,
         'ctd_hallazgos': 0,
         'ctd_compromisos': 0,
         'ctd_seguimientos': 0,
         'ctd_req_hallazgos': 0,

         'filterTerm': '',
         'filterIdCompromiso': '',
         'filterIdHallazgo': '',
         'filterIdSeguimiento': '',
         'filterIdArchivo': '',
         'gridOrder': 'asc',

         'mensajeResultadoConFiltros': false,
         'filtroIdHallazgo': false,
         'filtroIdCompromiso': false,
         'showModal': false,
         'showModalEditarCompromiso': false,

         'responsablesFiltroIdHallazgo': {},
         'responsablesFiltroIdCompromiso': {},

         'nuevo_responsable': {
            'id_hallazgo': '',
            'id_compromiso': '',
            'id_proceso_auditado': '',
            'id_usuario_responsable': '',
            'id_area_proceso_auditado': 0,
            'responsable': '',
            'email_responsable': '',
            'fono_responsable': '',
         },

         'excel_json_fields': {
            'id_compromiso_responsable': 'String',
            'id_hallazgo': 'String',
            'nombre_hallazgo': 'String',
            'id_compromiso': 'String',
            'nombre_compromiso': 'String',
            'id_area_proceso_auditado': 'String',
            'area_proceso_auditado': 'String',
            'responsable': 'String',
            'email_responsable': 'String',
            'fono_responsable': 'String',
            'created_at': 'String',
         },
         excel_json_data: [],
         excel_data_count: '',
         append_to_json_excel: {},

         _gcf: gcf,
      }
   },
   computed: {},
   watch: {
      compromisos_responsables: function (compromisos_responsables) {
         var self = this;
         this.excel_json_data = [];
         return compromisos_responsables.map(function (r, index) {
            return self.excel_json_data.push({
               'id_compromiso_responsable': r.id_compromiso_responsable,
               'id_hallazgo': r.id_hallazgo,
               'nombre_hallazgo': r.nombre_hallazgo,
               'id_compromiso': r.id_compromiso,
               'nombre_compromiso': r.nombre_compromiso,
               'id_area_proceso_auditado': r.id_area_proceso_auditado,
               'area_proceso_auditado': r.area_proceso_auditado.descripcion,
               'responsable': r.responsable,
               'email_responsable': r.email_responsable,
               'fono_responsable': r.fono_responsable,
               'created_at': r.created_at,
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
            'excel_json_fields': {
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
               for (var colName in this.excel_json_fields) {
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
                     xml += '    <ss:Data ss:Type="' + this.excel_json_fields[col] + '">';
                     xml += String(data[row][col]).replace(/[^a-zA-Z0-9\s\-ñíéáóú\#\,\.\;\:ÑÍÉÓÁÚ]/g, '') + '</ss:Data>\n';
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
      'spinner': {
         props: [''],
         'name': 'spinner',
         'template': `
	         <div class="loader text-center">Cargando tabla, espere por favor...</div>
	      `,
         data () {
            return {
               visible: false,
            }
         },
         ready () {
         },
         created(){
         },
         filters: {},
         methods: {},
      },
      'mini-spinner': {
         props: [''],
         'name': 'mini-spinner',
         'template': `
	         <div class="loader-mini text-center">Cargando tabla, espere por favor...</div>
	      `,
         data () {
            return {
               visible: false,
            }
         },
         ready () {
         },
         created(){
         },
         filters: {},
         methods: {},
      },
      'modal': {
         props: ['responsable'],
         template: `
			   <!-- template for the modal component -->
			   <transition name="modal">
				   <div class="modal-mask">
					   <div class="modal-wrapper">
					      <div class="modal-container">

						      <div class="modal-header">
							      <slot name="header"></slot>
						      </div>

						      <div class="modal-body">
							      <slot name="body">
                              <dl class="dl-vertical">
                                 <div class="row">
									         <div style="overflow-y: scroll;max-height: 400px;">
                                       <div class="col-md-6">
                                          <dt>Id del Hallazgo</dt>
                                          <dd class="well well-sm">{{responsable.id_hallazgo || '0'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Id del Compromiso</dt>
                                          <dd class="well well-sm">{{responsable.id_compromiso || '0'}}</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Nombre del Hallazgo</dt>
                                          <dd class="well well-sm">{{responsable.nombre_hallazgo || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Nombre del Compromiso</dt>
                                          <dd class="well well-sm">{{responsable.nombre_compromiso || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Id Area</dt>
                                          <dd class="well well-sm">{{responsable.id_area_proceso_auditado || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Area Proceso Auditado</dt>
                                          <dd class="well well-sm">
                                          	{{responsable.area_proceso_auditado.descripcion || 'Sin Definir'}}
														</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Responsable</dt>
                                          <dd class="well well-sm">{{responsable.responsable || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Email Responsable</dt>
                                          <dd class="well well-sm">{{responsable.email_responsable || 'Sin Email'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Fono Responsable</dt>
                                          <dd class="well well-sm">{{responsable.fono_responsable || 'Sin Fono'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Fecha Creacion</dt>
                                          <dd class="well well-sm">{{responsable.created_at || 'Sin Definir'}}</dd>
                                       </div>
                                    </div><!-- styled -->
                                 </div><!-- .row -->
                              </dl>
							      </slot>
						      </div>

						      <!--
						      <div class="modal-footer">
							      <slot name="footer">
							         <button class="btn btn-sm btn-success" @click="$emit('close')">
								         Aceptar
							         </button>
                           </slot>
						      </div>
						      -->
					      </div>
                  </div>
				   </div>
			   </transition>
			`,
         name: 'modal',
         data () {
            return {}
         },
         ready () {
         },
         created () {
         },
         methods: {},
         watch: {},
      },
      'modal-editarcompromiso': {
         props: ['compromiso', 'config', 'auth', 'role', 'auditor', 'usuarios', 'area_proceso_auditado',
            'compromisos_responsables', 'proceso_auditado', 'responsable_controller', 'compromisos', 'hallazgos'],
         template: `
         <!-- template for the modal component -->
         <transition name="modal">
            <div class="modal-mask">
               <div class="modal-wrapper">
                  <div class="modal-container">

                     <div class="modal-header">
                        <slot name="header">

                        </slot>
                     </div>

                     <div class="modal-body" style="overflow-y: scroll;max-height: 400px;">
                        <slot name="body">
                           <dl class="dl-vertical" style="margin: 20px;">

                              <div id="" class="panel with-nav-tabs panel-primary">
                                 <div class="panel-heading" style="border-bottom:0px;">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-tabs" role="tablist">
                                       <li role="presentation" class="active">
                                          <a href="#gestionResponsableGridResponsable" aria-controls="gestionResponsableGridResponsable" role="tab" data-toggle="tab">
                                             Gestion de Responsables asociados al Compromiso
                                          </a>
                                       </li>

                                       <li role="presentation">
                                          <a href="#nuevoUsuarioGridResponsable" aria-controls="nuevoUsuarioGridResponsable" role="tab" data-toggle="tab">
                                             <i class="fa fa-plus"></i> Registrar nuevo usuario
                                          </a>
                                       </li>
                                    </ul>
                                 </div><!-- .panel-heading -->

                                 <div class="panel-body">
                                    <!-- Tab panes -->
                                    <div class="tab-content">

                                       <!-- Gestion Responsable -->
                                       <div role="tabpanel" class="tab-pane fade in active" id="gestionResponsableGridResponsable">
                                          <dd>
                                             <div class="table-responsive">
                                                <table class="table custom-table table-striped text-center">
                                                   <thead>
                                                      <th>Asignar</th>
                                                      <th>Id Responsable Compromiso</th>
                                                      <th>Id Compromiso</th>
                                                      <th>Id Area Auditada</th>
                                                      <th>Responsable</th>
                                                      <th>Email Responsable</th>
                                                      <th>Fono Responsable</th>
                                                   </thead>
                                                   <tbody>
                                                      <tr v-if="compromisos_responsables.length > 0" v-for="cr in compromisos_responsables">
                                                         <td class="text-success">
                                                         	Asignado
                                                         </td>
                                                         <td>
                                                         {{cr.id_compromiso_responsable}}
                                                         </td>
                                                         <td>
                                                         {{cr.id_compromiso}}
                                                         </td>
                                                         <td>
                                                         {{cr.id_area_proceso_auditado}}
                                                         </td>
                                                         <td>
                                                         {{cr.responsable}}
                                                         </td>
                                                         <td>
                                                         {{cr.email_responsable}}
                                                         </td>
                                                         <td>
                                                         {{cr.fono_responsable}}
                                                         </td>
                                                      </tr>
                                                      <tr>
                                                         <td>

                                                            <button class="btn btn-xs btn-success"
                                                               @click.prevent="cambiar_form_responsable_creable"
                                                               data-toggle="tooltip" data-placement="left" title="Asociar nuevo responsable"
                                                               v-show="!form_responsable_creable">
                                                               <i class="fa fa-plus"></i>
                                                            </button>
                                                            <button class="btn btn-xs btn-success"
                                                               @click.prevent="guardar_nuevo_responsable"
                                                               data-toggle="tooltip" data-placement="left" title="Guardar"
                                                               v-show="form_responsable_creable">
                                                               <i class="fa fa-check"></i>
                                                            </button>

																			</td>
                                                         <slot v-if="form_responsable_creable">
                                                            <td>
                                                               En espera
                                                            </td>
                                                            <td>
                                                               {{ compromiso.id_compromiso }}
                                                            </td>
                                                            <td>
                                                               {{ nuevo_responsable.id_area_proceso_auditado }}
                                                            </td>
                                                            <td>
                                                               <p class="control has-icon has-icon-right">
                                                                  <select id="responsables_existentes" name="id_usuario_responsable"
                                                                     @change="completar_nuevo_responsable_email"
                                                                     v-model="nuevo_responsable.id_usuario_responsable"
                                                                     v-validate="'required'" data-vv-delay="500"
                                                                     :class="{'input': true, 'text-danger': errors.has('id_usuario_responsable'),
                                                                     'form-control':true}">
                                                                     <option class="responsables" v-for="(u,i) in usuarios" :value="u.id"
                                                                        v-if="validarResponsableNoRegistrado(u.id)">
                                                                        {{u.name}}
                                                                     </option>
                                                                     <option value="">Seleccione un responsable</option>
                                                                  </select>
                                                                  <transition name="bounce">
                                                                  <i v-show="errors.has('id_usuario_responsable')" class="fa fa-warning"></i>
                                                                  </transition>
                                                                  <transition name="bounce">
                                                                  <span v-show="errors.has('id_usuario_responsable')" class="text-danger">
                                                                     {{ errors.first('id_usuario_responsable') | replaceIdUsuarioResponsable }}
                                                                  </span>
                                                                  </transition>
                                                               </p>



                                                               <!--
                                                               <button class="btn btn-sm btn-success"
																						@click.prevent="guardar_nuevo_responsable"
																						data-toggle="tooltip" data-placement="left" title="Guardar"
																						v-show="form_responsable_creable">
																						<i class="fa fa-check"></i> Guardar nuevo responsable
																					</button>
																					<small>Para agregar un nuevo usuario, haga click en la pestaña:</small>
																					<a class="btn btn-sm btn-primary" href="#!"
																						data-toggle="tooltip" data-placement="left"
																						title="Debe registrar un nuevo Usuario">
																						<i class="fa fa-plus"></i> Registrar nuevo usuario
																					</a>
																					-->
                                                            </td>
                                                            <td>
                                                               <p class="control has-icon has-icon-right">
                                                                  <input name="email_responsable"
                                                                        v-validate="'required|email'" data-vv-delay="500"
                                                                        :class="{'input': true, 'text-danger': errors.has('email_responsable'),
                                                                        'form-control':true}"
                                                                        type="text" placeholder="Email"
                                                                        v-model="nuevo_responsable.email_responsable">
                                                                  <transition name="bounce">
                                                                  <i v-show="errors.has('email_responsable')" class="fa fa-warning"></i>
                                                                  </transition>
                                                                  <transition name="bounce">
                                                                  <span v-show="errors.has('email_responsable')" class="text-danger">
                                                                     {{ errors.first('email_responsable') | replaceEmailResponsable }}
                                                                  </span>
                                                                  </transition>
                                                               </p>
                                                            </td>
                                                            <td>
																					<input type="number" data-vv-name="fono_responsable" class="form-control"
																							v-model="nuevo_responsable.fono_responsable" />
                                                            </td>
                                                         </slot>
                                                         <slot v-else>
                                                            <td></td><td></td><td></td><td></td><td></td><td></td>
                                                         </slot>
                                                      </tr>
                                                   </tbody>
                                                </table>
                                             </div><!-- table-responsive styled -->
                                             <h4 class="text-center alert alert-warning" v-if="compromisos_responsables.length == 0">
                                                No se encontraron resultados
                                             </h4>
                                          </dd>

                                       </div><!-- .tab-pane .fade #gestionResponsableGridResponsable -->

                                        <!-- Nuevo Usuario -->
                                       <div role="tabpanel" class="tab-pane fade" id="nuevoUsuarioGridResponsable">
                                          <div class="row">
                                             <div class="col-md-4">
                                                <dt>Nombre (*):</dt>
                                                <dd>
                                                   <p class="control has-icon has-icon-right">
                                                      <input name="name"
                                                            v-validate="'required'" data-vv-delay="500"
                                                            :class="{'input': true, 'text-danger': errors.has('name'),
                                                            'form-control':true}"
                                                            type="text" placeholder="Nombre"
                                                            v-model="nuevo_usuario.name">
                                                      <transition name="bounce">
                                                      <i v-show="errors.has('name')" class="fa fa-warning"></i>
                                                      </transition>
                                                      <transition name="bounce">
                                                      <span v-show="errors.has('name')" class="text-danger">
                                                         {{ errors.first('name') | replaceName }}
                                                      </span>
                                                      </transition>
                                                   </p>
                                                </dd>
                                             </div>
                                             <div class="col-md-4">
                                                <dt>Email (*):</dt>
                                                <dd>
                                                   <p class="control has-icon has-icon-right">
                                                      <input name="email"
                                                            v-validate="'required|email'" data-vv-delay="500"
                                                            :class="{'input': true, 'text-danger': errors.has('email'),
                                                            'form-control':true}"
                                                            type="text" placeholder="Email"
                                                            v-model="nuevo_usuario.email">
                                                      <transition name="bounce">
                                                      <i v-show="errors.has('email')" class="fa fa-warning"></i>
                                                      </transition>
                                                      <transition name="bounce">
                                                      <span v-show="errors.has('email')" class="text-danger">
                                                         {{ errors.first('email') }}
                                                      </span>
                                                      </transition>
                                                   </p>
                                                </dd>
                                             </div>
                                             <div class="col-md-4">
                                                <dt>Password (*):</dt>
                                                <dd>
                                                   <p class="control has-icon has-icon-right">
                                                      <input name="password"
                                                            v-validate="'required'" data-vv-delay="500"
                                                            :class="{'input': true, 'text-danger': errors.has('password'),
                                                            'form-control':true}"
                                                            type="password" placeholder="Password"
                                                            v-model="nuevo_usuario.password">
                                                      <transition name="bounce">
                                                      <i v-show="errors.has('password')" class="fa fa-warning"></i>
                                                      </transition>
                                                      <transition name="bounce">
                                                      <span v-show="errors.has('password')" class="text-danger">
                                                         {{ errors.first('password') | replacePassword }}
                                                      </span>
                                                      </transition>
                                                   </p>
                                                </dd>
                                             </div>
                                             <div class="col-md-6">
                                                <dt>Finalizar:</dt>
                                                <dd>
                                                   <button @click.prevent="guardar_nuevo_usuario" class="btn btn-sm btn-success">Guardar</button>
                                                </dd>
                                             </div>
                                          </div><!-- .row -->

                                       </div><!-- .tab-pane .fade #nuevoUsuarioGridResponsable -->

                                    </div><!-- .tab-content -->
                                 </div><!-- .panel-body -->

                              </div><!-- .panel .with-nav-tabs panel-primary -->

                           </dl>
                        </slot>
                     </div><!-- .modal-body -->

                     <div class="modal-footer">
                        <slot name="footer">
                           <!--
                           <button class="btn btn-sm btn-success" @click="$emit('close')">
                              Aceptar
                           </button>
                           -->
                           Los campos con <b>*</b> son obligatorios
                        </slot>
                     </div>

                  </div>
               </div>
            </div>
         </transition>
			`,
         name: 'modal-editarcompromiso',
         data () {
            return {
               'loadMore': false,
               'usuariosTmp': [],
               'form_responsable_creable': false,
               'permiteGuardarNuevoResponsable': true,
               'nuevo_responsable': {
                  'id_compromiso': '',
                  'id_proceso_auditado': '',
                  'id_usuario_responsable': '',
                  'id_area_proceso_auditado': 0,
                  'responsable': '',
                  'email_responsable': '',
                  'fono_responsable': '',
               },
               'nuevo_usuario': {
                  'name': '',
                  'email': '',
                  'password': '',
                  'id_role': '12',
                  'id_auditor': '0',
                  'active_directory': 0,
                  'active_directory_user': '',
                  'tipo_acceso': 'Role',
                  'usuario_registra': 1,
                  'usuario_modifica': 0,
               },
            }
         },
         ready () {
         },
         created () {

         },
         filters: {
            replaceNombreCompromiso(nombre_compromiso) {
               if (nombre_compromiso != null) {
                  nombre_compromiso = nombre_compromiso.replace('nombre_compromiso', 'para el nombre del comprimiso');
               }
               return nombre_compromiso;
            },
            replaceEmailResponsable(email_responsable) {
               if (email_responsable != null) {
                  email_responsable = email_responsable.replace('email_responsable', 'email para el responsable');
               }
               return email_responsable;
            },
            replaceFonoResponsable(fono_responsable) {
               if (fono_responsable != null) {
                  fono_responsable = fono_responsable.replace('fono_responsable', 'fono para el responsable');
               }
               return fono_responsable;
            },
            replaceIdUsuarioResponsable(id_usuario_responsable) {
               if (id_usuario_responsable != null) {
                  id_usuario_responsable = id_usuario_responsable.replace('id_usuario_responsable', 'para el nombre del responsable');
               }
               return id_usuario_responsable;
            },
            replaceName(name) {
               if (name != null) {
                  name = name.replace('name', 'para el nombre del usuario');
               }
               return name;
            },
            replacePassword(password) {
               if (password != null) {
                  password = password.replace('password', 'password');
               }
               return password;
            },
            replaceIdRole(id_role) {
               if (id_role != null) {
                  id_role = id_role.replace('id_role', 'role');
               }
               return id_role;
            },
            replaceIdAuditor(id_auditor) {
               if (id_auditor != null) {
                  id_auditor = id_auditor.replace('id_auditor', 'nombre auditor');
               }
               return id_auditor;
            },
         },
         methods: {
            cambiar_form_responsable_creable: function () {
               if (this.compromiso != null && this.usuarios != null && this.config != null && this.area_proceso_auditado != null) {

                  //console.log(this.area_proceso_auditado);
                  this.nuevo_responsable.id_compromiso = this.compromiso.id_compromiso;
                  this.nuevo_responsable.id_area_proceso_auditado = this.area_proceso_auditado[0].id_area_proceso_auditado;
               } else {
                  console.log('Uno de los elementos a validar es nulo.');
               }
               this.permiteGuardarNuevoResponsable = true;
               return this.form_responsable_creable = !this.form_responsable_creable;
            },
            crear_nuevo_responsable: function () {
            },
            completar_nuevo_responsable_email: function () {
               if (this.nuevo_responsable.id_usuario_responsable != null) {
                  return this.nuevo_responsable.email_responsable =
                     gcf.findUsuarioById(this.usuarios, this.nuevo_responsable.id_usuario_responsable).email;
               }
            },

            guardar_nuevo_responsable: function () {
               if (this.permiteGuardarNuevoResponsable == true) {
                  this.permiteGuardarNuevoResponsable = false;
                  if (this.nuevo_responsable.id_compromiso != '' &&
                     this.nuevo_responsable.id_usuario_responsable != '' &&
                     this.nuevo_responsable.email_responsable != '' &&
                        //this.nuevo_responsable.fono_responsable != '' &&
                     this.nuevo_responsable != {}) {

                     var compromiso = gcf.findCompromisoById(this.compromisos, this.nuevo_responsable.id_compromiso);
                     console.log(compromiso);

                     var formData = new FormData();

                     formData.append('id_compromiso', this.nuevo_responsable.id_compromiso);
                     formData.append('id_proceso_auditado', this.proceso_auditado.id_proceso_auditado);
                     formData.append('id_usuario_responsable', this.nuevo_responsable.id_usuario_responsable);
                     formData.append('id_area_proceso_auditado', this.area_proceso_auditado[0].id_area_proceso_auditado);
                     formData.append('responsable', gcf.findUsuarioById(this.usuarios, this.nuevo_responsable.id_usuario_responsable).name);
                     formData.append('email_responsable', this.nuevo_responsable.email_responsable);
                     formData.append('fono_responsable', this.nuevo_responsable.fono_responsable);
                     formData.append('_token', $('#_token').val());

                     Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();


                     this.$http.post('/compromiso/store/responsable', formData).then(response => {
                        //console.log(response.data.new_compromiso_responsable);


                        var hallazgo = gcf.findHallazgoById(this.hallazgos, compromiso.id_hallazgo);

                        var new_compromiso_responsable = response.data.new_compromiso_responsable;
                        new_compromiso_responsable.id_hallazgo = hallazgo.id_hallazgo;
                        new_compromiso_responsable.nombre_hallazgo = hallazgo.nombre_hallazgo;
                        new_compromiso_responsable.id_compromiso = compromiso.id_compromiso;
                        new_compromiso_responsable.nombre_compromiso = compromiso.nombre_compromiso;
                        console.log(new_compromiso_responsable);
                        this.compromisos_responsables.push(new_compromiso_responsable);
                        this.limpiarNuevoResponsable();
                        this.form_responsable_creable = false;
                        alert('Responsable agregado.');


                        //console.log(response);
                        //this.hallazgos.push(response.body);
                     }, response => {
                     });
                  } else {
                     this.permiteGuardarNuevoResponsable = true;
                  }
               } else {
                  alert('Se esta procesando la solicitud');
               }
            },
            guardar_nuevo_usuario: function () {
               if (this.nuevo_usuario != {}) {
                  if (this.nuevo_usuario.name != '' &&
                     this.nuevo_usuario.email != '' &&
                     this.nuevo_usuario.password != '' &&
                     this.nuevo_usuario.id_role != '') {

                     var formData = new FormData();

                     formData.append('name', this.nuevo_usuario.name);
                     formData.append('email', this.nuevo_usuario.email);
                     formData.append('password', this.nuevo_usuario.password);
                     formData.append('id_role', this.nuevo_usuario.id_role);
                     formData.append('id_auditor', this.nuevo_usuario.id_auditor || 0);
                     formData.append('active_directory', this.nuevo_usuario.active_directory);
                     formData.append('active_directory_user', this.nuevo_usuario.active_directory_user);
                     formData.append('tipo_acceso', this.nuevo_usuario.tipo_acceso);
                     formData.append('usuario_registra', this.nuevo_usuario.usuario_registra);
                     formData.append('usuario_modifica', this.nuevo_usuario.usuario_modifica);

                     Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

                     this.$http.post('/usuario', formData).then(response => {
                        if (response.data == 'The given data failed to pass validation.') {
                           return alert('El usuario ya ha sido registrado');
                        }
                        this.usuarios.push(response.data.usuario_new);
                        //this.limpiarNuevoUsuario();
                        alert('Usuario creado.');

                     }, response => {
                     });
                  }
               }
            },
            findUsuarioById: function (items, id) {
               for (var i in items) {
                  if (items[i].id == id) {
                     return items[i];
                  }
               }
               return null;
            },
            limpiarNuevoResponsable: function () {
               return this.nuevo_responsable = {
                  'id_compromiso': '',
                  'id_proceso_auditado': '',
                  'id_usuario_responsable': '',
                  'id_area_proceso_auditado': 0,
                  'responsable': '',
                  'email_responsable': '',
                  'fono_responsable': '',
               };
            },
            limpiarNuevoUsuario: function () {
               return this.nuevo_usuario = {
                  'name': '',
                  'email': '',
                  'password': '',
                  'id_role': '12',
                  'id_auditor': '0',
                  'active_directory': 0,
                  'active_directory_user': '',
                  'tipo_acceso': 'Role',
                  'usuario_registra': 1,
                  'usuario_modifica': 0,
               };
            },
            loadMoreFields: function () {
               return this.loadMore = !this.loadMore;
            },
            validarResponsableNoRegistrado: function (id_responsable_registrado) {
               //Valida si ya ha sido registrado a traves de los compromiso_responsables, que es un objeto con todos
               //los responsables asociados al compromiso
               var items = this.compromisos_responsables;
               for (var i in items) {
                  if (items[i].id_usuario_responsable == id_responsable_registrado) {//12 es aqui por el perfil
                     return false; //Ya ha sido registrado
                  }
               }
               if (gcf.findUsuarioById(this.usuarios, id_responsable_registrado).role != undefined) {
                  if (gcf.findUsuarioById(this.usuarios, id_responsable_registrado).role.role != 'Usuario Auditado') {
                     return false;
                  }
               }

               return true; //No ha sido registrado
            },
         },
         watch: {},
      },
      /*
       '':{
       props: [''],
       template: `
       `,
       name: '',
       data () {
       return {
       }
       },
       ready () {
       },
       created () {
       },
       methods: {
       },
       watch: {
       },
       }
       */
   },
   created(){
      //this.fetchResponsables();
   },
   ready: {},
   filters: {},
   methods: {
      //camelCase() => for specific functions
      agregarFiltroIdHallazgoGrid: function () {
         if (!this.filtroIdHallazgo) {
            this.filtroIdHallazgo = true;
            this.responsablesFiltroIdHallazgo = this.compromisos_responsables;
         } else {
            this.compromisos_responsables = this.responsablesFiltroIdHallazgo;
         }

         var self = this;
         //Itero la lista de hallazgos y filtro segun el id hallazgo ingresado
         this.compromisos_responsables = _.filter(this.compromisos_responsables, function (r) {
            return r.id_hallazgo == self.filterIdHallazgo;
         });
         /*
          if(this.compromisos_responsables.length == 0){
          this.compromisos_responsables = this.responsablesFiltroIdHallazgo;
          if (this.filterIdHallazgo == '') return;
          else alert('Sin resultados para el id ingresado');
          }
          */
      },
      agregarFiltroIdCompromisoGrid: function () {
         if (!this.filtroIdCompromiso) {
            this.filtroIdCompromiso = true;
            this.responsablesFiltroIdCompromiso = this.compromisos_responsables;
         } else {
            this.compromisos_responsables = this.responsablesFiltroIdCompromiso;
         }

         var self = this;
         //Itero la lista de hallazgos y filtro segun el id compromiso ingresado
         this.compromisos_responsables = _.filter(this.compromisos_responsables, function (r) {
            return r.id_compromiso == self.filterIdCompromiso;
         });
         /*
          if(this.compromisos_responsables.length == 0){
          this.compromisos_responsables = this.responsablesFiltroIdCompromiso;
          if (this.filterIdCompromiso == '') return;
          else alert('Sin resultados para el id ingresado');
          }
          */
      },
      // change order variable direction
      changeListOrder: function (column) {
         this.gridOrder == 'asc' ? this.gridOrder = 'desc' : this.gridOrder = 'asc';
         this.orderLists(column);
      },
      crear_nuevo_responsable: function (id_compromiso) {
         this.$validator.validateAll().then(result => {
         });
         if (id_compromiso == null || id_compromiso == '') {
            alert('Debe seleccionar un compromiso');
            return;
         }
         this.compromiso = gcf.findCompromisoById(this.compromisos, id_compromiso);
         this.nuevo_responsable.id_compromiso = id_compromiso;


         this.compromisos_responsables = _.filter(this.compromisos_responsables, function (cr) {
            return cr.id_compromiso == id_compromiso;
         });


         this.showModalEditarCompromiso = true;
         return;
      },
      fetchResponsables: function () {
         this._gcf = gcf;
         let id_proceso_auditado = $('#id_proceso_auditado').val();
         this.$http.get('/proceso_auditado/' + id_proceso_auditado + '/edit/ajax').then(response => { // success callback
            //console.log(response);
            this.area_proceso_auditado = response.body.area_proceso_auditado;
            this.proceso_auditado = response.body.proceso_auditado;

            this.hallazgos = response.body.hallazgos;
            this.hallazgosTmp = response.body.hallazgos;
            //this.hallazgo = response.body.hallazgo;

            this.compromisos = response.body.compromisos;
            this.compromisosTmp = response.body.compromisos;
            //this.compromiso = response.body.compromiso;

            this.compromisos_responsables = {};
            this.compromisos_responsables = response.body.compromisos_responsables;
            this.compromisos_responsablesTmp = response.body.compromisos_responsables;

            this.seguimientos = response.body.seguimientos;
            this.seguimientosTmp = response.body.seguimientos;
            //this.seguimiento = response.body.seguimiento;

            this.archivos = response.body.archivos;
            this.archivosTmp = response.body.archivos;

            this.usuarios = response.body.usuarios;
            this.config = response.body.config;
            this.auth = response.body.auth;
            this.role = response.body.role;
            this.auditor = response.body.auditor;

            this.preloadResponsables();

            //Manda el controller que llama al metodo
            gcf.refetchControllersData({
               'proceso_auditado': this.proceso_auditado,
               'area_proceso_auditado': this.area_proceso_auditado,

               'hallazgos': this.hallazgos,
               'hallazgosTmp': this.hallazgos,

               'compromisos': this.compromisos,
               'compromisosTmp': this.compromisos,

               'compromisos_responsables': this.compromisos_responsables,
               'compromisos_responsablesTmp': this.compromisos_responsables,

               'seguimientos': this.seguimientos,
               'seguimientosTmp': this.seguimientos,

               'archivos': this.archivos,
               'archivosTmp': this.archivos,

               'usuarios': this.usuarios,
               'config': this.config,
               'auth': this.auth,
               'role': this.role,
               'auditor': this.auditor,

            }, {
               'HallazgoController': 'HallazgoController',
               'CompromisoController': 'CompromisoController',
               'SeguimientoController': 'SeguimientoController',
               'ArchivoController': 'ArchivoController',
            }, 'ResponsableController');


            this.ctd_req_hallazgos = this.proceso_auditado.cantidad_hallazgo;
            this.ctd_hallazgos = this.hallazgos.length; // : cantidad actual de hallazgos referenciados al contraloria
            this.ctd_compromisos = this.compromisos.length;//this.ctd_compromisos = 0;
            this.ctd_seguimientos = this.seguimientos.length;

            HallazgoController.ctd_req_hallazgos =
               CompromisoController.ctd_req_hallazgos =
                  SeguimientoController.ctd_req_hallazgos =
                     ArchivoController.ctd_req_hallazgos = this.ctd_req_hallazgos;

            HallazgoController.ctd_hallazgos =
               CompromisoController.ctd_hallazgos =
                  SeguimientoController.ctd_hallazgos =
                     ArchivoController.ctd_hallazgos = this.ctd_hallazgos;

            HallazgoController.ctd_compromisos =
               CompromisoController.ctd_compromisos =
                  SeguimientoController.ctd_compromisos =
                     ArchivoController.ctd_compromisos = this.ctd_compromisos;

            HallazgoController.ctd_seguimientos =
               CompromisoController.ctd_seguimientos =
                  SeguimientoController.ctd_seguimientos =
                     ArchivoController.ctd_seguimientos = this.ctd_seguimientos;


            HallazgoController._gcf =
               CompromisoController._gcf =
                  SeguimientoController._gcf =
                     ArchivoController._gcf = this._gcf;

         }, response => { // error callback
            console.log('Error fetchResponsables: ' + response);
         });
      },
      filterGridResponsableByComboHallazgo: function (id_hallazgo) {
         this.filterIdHallazgo = id_hallazgo || null;
         if (this.filterIdHallazgo != null) {
            return this.agregarFiltroIdHallazgoGrid();
         } else {
            //alert('Debe seleccionar un hallazgo');
            this.limpiarFiltros();
         }
         return;
      },
      filterGridResponsableByComboCompromiso: function (id_compromiso) {
         this.limpiarFiltros();
         this.filterIdCompromiso = id_compromiso || null;
         if (this.filterIdCompromiso != null) {
            return this.agregarFiltroIdCompromisoGrid();
         } else {
            //alert('Debe seleccionar un compromiso');
            this.limpiarFiltros();
         }
         return;
      },
      limpiarFiltros: function () {
         this.compromisos_responsables = this.compromisos_responsablesTmp;
      },
      // function to order users in the list
      orderLists: function (column) {
         this.compromisos_responsables = _.orderBy(this.compromisos_responsables, column, this.gridOrder);
         //console.log(column);
         //this.lists = this.shuffle(_.orderBy(this.lists, 'name', this.listOrder));
         //console.log(this.lists.length);
      },
      preloadResponsables: function () {
         for (let r in this.compromisos_responsables) {
            this.compromisos_responsables[r].id_hallazgo =
               gcf.findCompromisoById(this.compromisos, this.compromisos_responsables[r].id_compromiso).id_hallazgo;
            this.compromisos_responsables[r].nombre_hallazgo =
               gcf.findHallazgoById(this.hallazgos, this.compromisos_responsables[r].id_hallazgo).nombre_hallazgo;
            this.compromisos_responsables[r].nombre_compromiso =
               gcf.findCompromisoById(this.compromisos, this.compromisos_responsables[r].id_compromiso).nombre_compromiso;
            this.compromisos_responsables[r].area = this.compromisos_responsables[r].area_proceso_auditado.descripcion;

         }

         //De fetchSeguimientos para seguimientos
         for (let s in this.seguimientos) {
            this.seguimientos[s].id_hallazgo = gcf.findCompromisoById(this.compromisos, this.seguimientos[s].id_compromiso).id_hallazgo;
            this.seguimientos[s].nombre_hallazgo = gcf.findHallazgoById(this.hallazgos, this.seguimientos[s].id_hallazgo).nombre_hallazgo;
            this.seguimientos[s].nombre_compromiso = gcf.findCompromisoById(this.compromisos, this.seguimientos[s].id_compromiso).nombre_compromiso;
            this.seguimientos[s].usuario_registra = gcf.findById(this.usuarios, this.seguimientos[s].usuario_registra);
            this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra ?
               this.seguimientos[s].usuario_registra.name : 'Sistema';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';

         }

         //De fetchArchivos para archivos
         for (let a in this.archivos) {
            this.archivos[a].id_hallazgo = gcf.findCompromisoById(this.compromisos, this.archivos[a].id_compromiso).id_hallazgo;
            this.archivos[a].nombre_hallazgo = gcf.findHallazgoById(this.hallazgos, this.archivos[a].id_hallazgo).nombre_hallazgo;
            this.archivos[a].nombre_compromiso = gcf.findCompromisoById(this.compromisos, this.archivos[a].id_compromiso).nombre_compromiso;
            this.archivos[a].usuario_registra = gcf.findById(this.usuarios, this.archivos[a].usuario_registra);
            this.archivos[a].usuario_registra = this.archivos[a].usuario_registra ?
               this.archivos[a].usuario_registra.name : 'Sistema';
            this.archivos[a].observacion = this.archivos[a].observacion || 'Sin Observacion';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';
         }
      },
      showModalData: function (id_compromiso_responsable) {

         this.responsable = gcf.findResponsableById(this.compromisos_responsables, id_compromiso_responsable);

         this.compromiso = gcf.findCompromisoById(this.compromisos, this.responsable.id_compromiso);
         this.hallazgo = gcf.findHallazgoById(this.hallazgos, this.compromiso.id_hallazgo);

         this.responsable.nombre_compromiso = this.compromiso.nombre_compromiso;
         this.responsable.id_hallazgo = this.hallazgo.id_hallazgo;
         this.responsable.nombre_hallazgo = this.hallazgo.nombre_hallazgo;

         return this.showModal = true;
      },
      /* for transition group flip */
      shuffle: function (items) {
         return _.shuffle(items)
      },
      filtrar_compromisos_nuevo_responsable: function (id_hallazgo) {
         this.limpiarFiltros();
         var hallazgo = gcf.findHallazgoById(this.hallazgos, id_hallazgo);
         this.nuevo_responsable.id_compromiso = '';
         this.filterGridResponsableByComboHallazgo(id_hallazgo);
      },
   },
});