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
      //console.log(controllerName); //console.log(fields);
      //Por cada campo actualizo el del controller correspondiente


      for (let field in fieldsData) {
         for (let controller in controllersToFetch) {

            switch (controller) {
               case 'HallazgoController':

                  if (field == 'contraloria') HallazgoController.contraloria = fieldsData[field];
                  if (field == 'area_contraloria') HallazgoController.area_contraloria = fieldsData[field];
                  if (field == 'estado_contraloria') HallazgoController.estado_contraloria = fieldsData[field];
                  if (field == 'hallazgos') HallazgoController.hallazgos = fieldsData[field];
                  if (field == 'hallazgosTmp') HallazgoController.hallazgosTmp = fieldsData[field];
                  if (field == 'compromisos') HallazgoController.compromisos = fieldsData[field];
                  if (field == 'compromisosTmp') HallazgoController.compromisosTmp = fieldsData[field];
                  if (field == 'compromisos_responsables') HallazgoController.compromisos_responsables = fieldsData[field];
                  if (field == 'compromisos_responsablesTmp') HallazgoController.compromisos_responsablesTmp = fieldsData[field];
                  if (field == 'hallazgos_responsables') HallazgoController.hallazgos_responsables = fieldsData[field];
                  if (field == 'hallazgos_responsablesTmp') HallazgoController.hallazgos_responsablesTmp = fieldsData[field];
                  if (field == 'seguimientos') HallazgoController.seguimientos = fieldsData[field];
                  if (field == 'seguimientosTmp') HallazgoController.seguimientosTmp = fieldsData[field];
                  if (field == 'archivos') HallazgoController.archivos = fieldsData[field];
                  if (field == 'archivosTmp') HallazgoController.archivosTmp = fieldsData[field];
                  if (field == 'usuarios') HallazgoController.usuarios = fieldsData[field];
                  if (field == 'config') HallazgoController.config = fieldsData[field];
                  if (field == 'auth') HallazgoController.auth = fieldsData[field];
                  if (field == 'role') HallazgoController.role = fieldsData[field];
                  if (field == 'auditor') HallazgoController.auditor = fieldsData[field];
                  if (field == 'tipo_proceso_disciplinario') HallazgoController.tipo_proceso_disciplinario = fieldsData[field];
                  if (field == 'estado_proceso_disciplinario') HallazgoController.estado_proceso_disciplinario = fieldsData[field];
                  if (field == 'responsable_proceso_disciplinario') HallazgoController.responsable_proceso_disciplinario = fieldsData[field];
                  if (field == 'criticidad') HallazgoController.criticidad = fieldsData[field];
                  if (field == 'clasificacion_materia') HallazgoController.clasificacion_materia = fieldsData[field];
                  if (field == 'historico_hallazgos') HallazgoController.historico_hallazgos = fieldsData[field];
                  if (field == 'historico_hallazgosTmp') HallazgoController.historico_hallazgosTmp = fieldsData[field];
                  if (field == 'hallazgo_historico_procedimientos_disciplinarios') HallazgoController.hallazgo_historico_procedimientos_disciplinarios = fieldsData[field];
                  if (field == 'hallazgo_procedimientos_disciplinarios') HallazgoController.hallazgo_procedimientos_disciplinarios = fieldsData[field];

                  break;
               case 'CompromisoController':

                  if (field == 'contraloria') CompromisoController.contraloria = fieldsData[field];
                  if (field == 'area_contraloria') CompromisoController.area_contraloria = fieldsData[field];
                  if (field == 'estado_contraloria') CompromisoController.estado_contraloria = fieldsData[field];
                  if (field == 'hallazgos') CompromisoController.hallazgos = fieldsData[field];
                  if (field == 'hallazgosTmp') CompromisoController.hallazgosTmp = fieldsData[field];
                  if (field == 'compromisos') CompromisoController.compromisos = fieldsData[field];
                  if (field == 'compromisosTmp') CompromisoController.compromisosTmp = fieldsData[field];
                  if (field == 'compromisos_responsables') CompromisoController.compromisos_responsables = fieldsData[field];
                  if (field == 'compromisos_responsablesTmp') CompromisoController.compromisos_responsablesTmp = fieldsData[field];
                  if (field == 'hallazgos_responsables') CompromisoController.hallazgos_responsables = fieldsData[field];
                  if (field == 'hallazgos_responsablesTmp') CompromisoController.hallazgos_responsablesTmp = fieldsData[field];
                  if (field == 'seguimientos') CompromisoController.seguimientos = fieldsData[field];
                  if (field == 'seguimientosTmp') CompromisoController.seguimientosTmp = fieldsData[field];
                  if (field == 'archivos') CompromisoController.archivos = fieldsData[field];
                  if (field == 'archivosTmp') CompromisoController.archivosTmp = fieldsData[field];
                  if (field == 'usuarios') CompromisoController.usuarios = fieldsData[field];
                  if (field == 'config') CompromisoController.config = fieldsData[field];
                  if (field == 'auth') CompromisoController.auth = fieldsData[field];
                  if (field == 'role') CompromisoController.role = fieldsData[field];
                  if (field == 'auditor') CompromisoController.auditor = fieldsData[field];
                  if (field == 'tipo_proceso_disciplinario') CompromisoController.tipo_proceso_disciplinario = fieldsData[field];
                  if (field == 'estado_proceso_disciplinario') CompromisoController.estado_proceso_disciplinario = fieldsData[field];
                  if (field == 'responsable_proceso_disciplinario') CompromisoController.responsable_proceso_disciplinario = fieldsData[field];
                  if (field == 'criticidad') CompromisoController.criticidad = fieldsData[field];
                  if (field == 'clasificacion_materia') CompromisoController.clasificacion_materia = fieldsData[field];
                  if (field == 'historico_hallazgos') CompromisoController.historico_hallazgos = fieldsData[field];
                  if (field == 'historico_hallazgosTmp') CompromisoController.historico_hallazgosTmp = fieldsData[field];
                  if (field == 'hallazgo_historico_procedimientos_disciplinarios') CompromisoController.hallazgo_historico_procedimientos_disciplinarios = fieldsData[field];
                  if (field == 'hallazgo_procedimientos_disciplinarios') CompromisoController.hallazgo_procedimientos_disciplinarios = fieldsData[field];

                  break;
               case 'SeguimientoController':

                  if (field == 'contraloria') SeguimientoController.contraloria = fieldsData[field];
                  if (field == 'area_contraloria') SeguimientoController.area_contraloria = fieldsData[field];
                  if (field == 'estado_contraloria') SeguimientoController.estado_contraloria = fieldsData[field];
                  if (field == 'hallazgos') SeguimientoController.hallazgos = fieldsData[field];
                  if (field == 'hallazgosTmp') SeguimientoController.hallazgosTmp = fieldsData[field];
                  if (field == 'compromisos') SeguimientoController.compromisos = fieldsData[field];
                  if (field == 'compromisosTmp') SeguimientoController.compromisosTmp = fieldsData[field];
                  if (field == 'compromisos_responsables') SeguimientoController.compromisos_responsables = fieldsData[field];
                  if (field == 'compromisos_responsablesTmp') SeguimientoController.compromisos_responsablesTmp = fieldsData[field];
                  if (field == 'hallazgos_responsables') SeguimientoController.hallazgos_responsables = fieldsData[field];
                  if (field == 'hallazgos_responsablesTmp') SeguimientoController.hallazgos_responsablesTmp = fieldsData[field];
                  if (field == 'seguimientos') SeguimientoController.seguimientos = fieldsData[field];
                  if (field == 'seguimientosTmp') SeguimientoController.seguimientosTmp = fieldsData[field];
                  if (field == 'archivos') SeguimientoController.archivos = fieldsData[field];
                  if (field == 'archivosTmp') SeguimientoController.archivosTmp = fieldsData[field];
                  if (field == 'usuarios') SeguimientoController.usuarios = fieldsData[field];
                  if (field == 'config') SeguimientoController.config = fieldsData[field];
                  if (field == 'auth') SeguimientoController.auth = fieldsData[field];
                  if (field == 'role') SeguimientoController.role = fieldsData[field];
                  if (field == 'auditor') SeguimientoController.auditor = fieldsData[field];
                  if (field == 'tipo_proceso_disciplinario') SeguimientoController.tipo_proceso_disciplinario = fieldsData[field];
                  if (field == 'estado_proceso_disciplinario') SeguimientoController.estado_proceso_disciplinario = fieldsData[field];
                  if (field == 'responsable_proceso_disciplinario') SeguimientoController.responsable_proceso_disciplinario = fieldsData[field];
                  if (field == 'criticidad') SeguimientoController.criticidad = fieldsData[field];
                  if (field == 'clasificacion_materia') SeguimientoController.clasificacion_materia = fieldsData[field];
                  if (field == 'historico_hallazgos') SeguimientoController.historico_hallazgos = fieldsData[field];
                  if (field == 'historico_hallazgosTmp') SeguimientoController.historico_hallazgosTmp = fieldsData[field];
                  if (field == 'hallazgo_historico_procedimientos_disciplinarios') SeguimientoController.hallazgo_historico_procedimientos_disciplinarios = fieldsData[field];
                  if (field == 'hallazgo_procedimientos_disciplinarios') SeguimientoController.hallazgo_procedimientos_disciplinarios = fieldsData[field];

                  break;
               case 'ArchivoController':

                  if (field == 'contraloria') ArchivoController.contraloria = fieldsData[field];
                  if (field == 'area_contraloria') ArchivoController.area_contraloria = fieldsData[field];
                  if (field == 'estado_contraloria') ArchivoController.estado_contraloria = fieldsData[field];
                  if (field == 'hallazgos') ArchivoController.hallazgos = fieldsData[field];
                  if (field == 'hallazgosTmp') ArchivoController.hallazgosTmp = fieldsData[field];
                  if (field == 'compromisos') ArchivoController.compromisos = fieldsData[field];
                  if (field == 'compromisosTmp') ArchivoController.compromisosTmp = fieldsData[field];
                  if (field == 'compromisos_responsables') ArchivoController.compromisos_responsables = fieldsData[field];
                  if (field == 'compromisos_responsablesTmp') ArchivoController.compromisos_responsablesTmp = fieldsData[field];
                  if (field == 'hallazgos_responsables') ArchivoController.hallazgos_responsables = fieldsData[field];
                  if (field == 'hallazgos_responsablesTmp') ArchivoController.hallazgos_responsablesTmp = fieldsData[field];
                  if (field == 'seguimientos') ArchivoController.seguimientos = fieldsData[field];
                  if (field == 'seguimientosTmp') ArchivoController.seguimientosTmp = fieldsData[field];
                  if (field == 'archivos') ArchivoController.archivos = fieldsData[field];
                  if (field == 'archivosTmp') ArchivoController.archivosTmp = fieldsData[field];
                  if (field == 'usuarios') ArchivoController.usuarios = fieldsData[field];
                  if (field == 'config') ArchivoController.config = fieldsData[field];
                  if (field == 'auth') ArchivoController.auth = fieldsData[field];
                  if (field == 'role') ArchivoController.role = fieldsData[field];
                  if (field == 'auditor') ArchivoController.auditor = fieldsData[field];
                  if (field == 'tipo_proceso_disciplinario') ArchivoController.tipo_proceso_disciplinario = fieldsData[field];
                  if (field == 'estado_proceso_disciplinario') ArchivoController.estado_proceso_disciplinario = fieldsData[field];
                  if (field == 'responsable_proceso_disciplinario') ArchivoController.responsable_proceso_disciplinario = fieldsData[field];
                  if (field == 'criticidad') ArchivoController.criticidad = fieldsData[field];
                  if (field == 'clasificacion_materia') ArchivoController.clasificacion_materia = fieldsData[field];
                  if (field == 'historico_hallazgos') ArchivoController.historico_hallazgos = fieldsData[field];
                  if (field == 'historico_hallazgosTmp') ArchivoController.historico_hallazgosTmp = fieldsData[field];
                  if (field == 'hallazgo_historico_procedimientos_disciplinarios') ArchivoController.hallazgo_historico_procedimientos_disciplinarios = fieldsData[field];
                  if (field == 'hallazgo_procedimientos_disciplinarios') ArchivoController.hallazgo_procedimientos_disciplinarios = fieldsData[field];
                  break;
               case 'ResponsableController':

                  if (field == 'contraloria') ResponsableController.contraloria = fieldsData[field];
                  if (field == 'area_contraloria') ResponsableController.area_contraloria = fieldsData[field];
                  if (field == 'estado_contraloria') ResponsableController.estado_contraloria = fieldsData[field];
                  if (field == 'hallazgos') ResponsableController.hallazgos = fieldsData[field];
                  if (field == 'hallazgosTmp') ResponsableController.hallazgosTmp = fieldsData[field];
                  if (field == 'compromisos') ResponsableController.compromisos = fieldsData[field];
                  if (field == 'compromisosTmp') ResponsableController.compromisosTmp = fieldsData[field];
                  if (field == 'compromisos_responsables') ResponsableController.compromisos_responsables = fieldsData[field];
                  if (field == 'compromisos_responsablesTmp') ResponsableController.compromisos_responsablesTmp = fieldsData[field];
                  if (field == 'hallazgos_responsables') ResponsableController.hallazgos_responsables = fieldsData[field];
                  if (field == 'hallazgos_responsablesTmp') ResponsableController.hallazgos_responsablesTmp = fieldsData[field];
                  if (field == 'seguimientos') ResponsableController.seguimientos = fieldsData[field];
                  if (field == 'seguimientosTmp') ResponsableController.seguimientosTmp = fieldsData[field];
                  if (field == 'archivos') ResponsableController.archivos = fieldsData[field];
                  if (field == 'archivosTmp') ResponsableController.archivosTmp = fieldsData[field];
                  if (field == 'usuarios') ResponsableController.usuarios = fieldsData[field];
                  if (field == 'config') ResponsableController.config = fieldsData[field];
                  if (field == 'auth') ResponsableController.auth = fieldsData[field];
                  if (field == 'role') ResponsableController.role = fieldsData[field];
                  if (field == 'auditor') ResponsableController.auditor = fieldsData[field];
                  if (field == 'tipo_proceso_disciplinario') ResponsableController.tipo_proceso_disciplinario = fieldsData[field];
                  if (field == 'estado_proceso_disciplinario') ResponsableController.estado_proceso_disciplinario = fieldsData[field];
                  if (field == 'responsable_proceso_disciplinario') ResponsableController.responsable_proceso_disciplinario = fieldsData[field];
                  if (field == 'criticidad') ResponsableController.criticidad = fieldsData[field];
                  if (field == 'clasificacion_materia') ResponsableController.clasificacion_materia = fieldsData[field];
                  if (field == 'historico_hallazgos') ResponsableController.historico_hallazgos = fieldsData[field];
                  if (field == 'historico_hallazgosTmp') ResponsableController.historico_hallazgosTmp = fieldsData[field];
                  if (field == 'hallazgo_historico_procedimientos_disciplinarios') ResponsableController.hallazgo_historico_procedimientos_disciplinarios = fieldsData[field];
                  if (field == 'hallazgo_procedimientos_disciplinarios') ResponsableController.hallazgo_procedimientos_disciplinarios = fieldsData[field];

                  break;
               case 'ProcedimientosDisciplinariosController':

                  if (field == 'contraloria') ProcedimientosDisciplinariosController.contraloria = fieldsData[field];
                  if (field == 'area_contraloria') ProcedimientosDisciplinariosController.area_contraloria = fieldsData[field];
                  if (field == 'estado_contraloria') ProcedimientosDisciplinariosController.estado_contraloriaTmp = fieldsData[field];
                  if (field == 'hallazgos') ProcedimientosDisciplinariosController.hallazgos = fieldsData[field];
                  if (field == 'hallazgosTmp') ProcedimientosDisciplinariosController.hallazgosTmp = fieldsData[field];
                  if (field == 'compromisos') ProcedimientosDisciplinariosController.compromisos = fieldsData[field];
                  if (field == 'compromisosTmp') ProcedimientosDisciplinariosController.compromisosTmp = fieldsData[field];
                  if (field == 'compromisos_responsables') ProcedimientosDisciplinariosController.compromisos_responsables = fieldsData[field];
                  if (field == 'compromisos_responsablesTmp') ProcedimientosDisciplinariosController.compromisos_responsables = fieldsData[field];
                  if (field == 'hallazgos_responsables') ProcedimientosDisciplinariosController.hallazgos_responsables = fieldsData[field];
                  if (field == 'hallazgos_responsablesTmp') ProcedimientosDisciplinariosController.hallazgos_responsablesTmp = fieldsData[field];
                  if (field == 'seguimientos') ProcedimientosDisciplinariosController.seguimientos = fieldsData[field];
                  if (field == 'seguimientosTmp') ProcedimientosDisciplinariosController.seguimientosTmp = fieldsData[field];
                  if (field == 'archivos') ProcedimientosDisciplinariosController.archivos = fieldsData[field];
                  if (field == 'archivosTmp') ProcedimientosDisciplinariosController.archivosTmp = fieldsData[field];
                  if (field == 'usuarios') ProcedimientosDisciplinariosController.usuarios = fieldsData[field];
                  if (field == 'config') ProcedimientosDisciplinariosController.config = fieldsData[field];
                  if (field == 'auth') ProcedimientosDisciplinariosController.auth = fieldsData[field];
                  if (field == 'role') ProcedimientosDisciplinariosController.role = fieldsData[field];
                  if (field == 'auditor') ProcedimientosDisciplinariosController.auditor = fieldsData[field];
                  if (field == 'tipo_proceso_disciplinario') ProcedimientosDisciplinariosController.tipo_proceso_disciplinario = fieldsData[field];
                  if (field == 'estado_proceso_disciplinario') ProcedimientosDisciplinariosController.estado_proceso_disciplinario = fieldsData[field];
                  if (field == 'responsable_proceso_disciplinario') ProcedimientosDisciplinariosController.responsable_proceso_disciplinario = fieldsData[field];
                  if (field == 'criticidad') ProcedimientosDisciplinariosController.criticidad = fieldsData[field];
                  if (field == 'clasificacion_materia') ProcedimientosDisciplinariosController.clasificacion_materia = fieldsData[field];
                  if (field == 'historico_hallazgos') ProcedimientosDisciplinariosController.historico_hallazgos = fieldsData[field];
                  if (field == 'historico_hallazgosTmp') ProcedimientosDisciplinariosController.historico_hallazgosTmp = fieldsData[field];
                  if (field == 'hallazgo_historico_procedimientos_disciplinarios') ProcedimientosDisciplinariosController.hallazgo_historico_procedimientos_disciplinarios = fieldsData[field];
                  if (field == 'hallazgo_procedimientos_disciplinarios') ProcedimientosDisciplinariosController.hallazgo_procedimientos_disciplinarios = fieldsData[field];

                  break;
            }

         }//end for
         //eval(controllerName+'.'+field) = fields[field]; //console.log(eval(controllerName+'.'+field));//fields[field]
      }//end for

      return true;
   },
   findById: (items, id) => { for (var i in items) { if (items[i].id==id) { return items[i]; } } return null; },
   findHallazgoById: (items, id) => { for (var i in items) { if (items[i].id_hallazgo_contraloria==id) { return items[i]; } } return null; },
   findHallazgoEventoById: (items, id) => { for (var i in items) { if (items[i].id_hallazgo_contraloria_evento==id) { return items[i]; } } return null; },
   findCompromisoById: (items, id) => { for (var i in items) { if (items[i].id_compromiso_contraloria==id) { return items[i]; } } return null; },
   getIndexCompromisoById: (items, id) => { for (var i in items) { if (items[i].id_compromiso_contraloria==id) { return i; } } return null; },
   findSeguimientoById: (items, id) => { for (var i in items) { if (items[i].id_seguimiento_contraloria==id) { return items[i]; } } return null; },
   findTipoProcesoDisciplinarioById: (items, id) => { if (items[id] != 'undefined'){ return items[id]; } return 'Sin tipo disciplinario'; },
   findEstadoProcesoDisciplinarioById: (items, id) => { if (typeof items[id] != 'undefined'){ return items[id]; } return 'Sin estado disciplinario'; },
   findResponsableById: (items, id) => { for (var i in items) { if (items[i].id_compromiso_responsable_contraloria==id) { return items[i]; } } return null; },
   findArchivoById: (items, id) => { for (var i in items) { if (items[i].id_medio_verificacion_contraloria==id) { return items[i]; } } return null; },
   findUsuarioById: (items, id) => { for (var i in items) { if (items[i].id==id) { return items[i]; } } return null; },
}

var HallazgoController = new Vue({
   el: '#HallazgoController',
   data(){
      return {
         'contraloria':{},
         'area_contraloria':[],
         'estado_contraloria':{},
         'hallazgos':{},'hallazgosTmp':{},'hallazgo':{},'nuevo_hallazgo':{
            'id_contraloria':'',
            'nombre_hallazgo_contraloria':'',
            'recomendacion':'',
            'observaciones':null,
            'criticidad':'',
            'cantidad_hallazgo':0,
            'materia_observacion':'',
            'procedimiento_disciplinario':false,
            'id_tipo_proceso_disciplinario':'',
            'id_estado_proceso_disciplinario':'',
            'id_responsable_proceso_disciplinario':'',
            'id_clasificacion_materia':'',
         },
         'compromisos':{},'compromisosTmp':{},'nuevo_compromiso':{
            'id_hallazgo_contraloria' : '',
            'nomenclatura' : '',
            'plazo_estimado' : '',
            'plazo_comprometido' : '',
            'nombre_compromiso_contraloria' : '',
            'responsable' : '',
            'email_responsable' : '',
            'fono_responsable' : '',
         },
         'compromisos_responsables':[],
         'compromisos_responsablesTmp':[],
         'hallazgos_responsables':[],
         'hallazgos_responsablesTmp':[],
         'seguimientosTmp':{},
         'seguimientos':{},
         'archivos':[],
         'usuarios':[],
         'config':[],
         'role':[],
         'auth':[],
         'auditor':[],
         'criticidad':[],
         'clasificacion_materia':[],
         'historico_hallazgos':[],
         'historico_hallazgosTmp':[],
         'hallazgo_historico_procedimientos_disciplinarios':[],
         'hallazgo_procedimientos_disciplinarios':[],

         'tipo_proceso_disciplinario':[],
         'estado_proceso_disciplinario':[],
         'compromisos_responsables':[],
         'hallazgos_responsables':[],
         'hallazgos_responsablesTmp':[],

         'index':0,
         'ctd_hallazgos':0,
         'ctd_compromisos':0,
         'ctd_seguimientos':0,
         'ctd_req_hallazgos':0,

         'filterTerm':'',
         'filterIdHallazgo':'',

         'form_hallazgo_editable':0,
         'form_compromiso_creable':0,

         'gridOrder':'asc',

         'mensajeResultadoConFiltros':false,
         'filtroCriticidad':false,
         'filtroEstado':false,
         'showModal': false,
         'showModalNuevoCompromiso': false,
         'showModalNuevoHallazgo': false,
         'showModalEditarHallazgo': false,
         'permiteGuardarHallazgo': true,
         'permiteGuardarNuevoCompromiso': true,

         'hallazgosFiltroCriticidad':{},
         'hallazgosFiltroEstado':{},
         'hallazgosFiltroIdHallazgo':{},

         'excel_json_fields': {
            'id': 'String',
            'materia_observacion': 'String',
            'hallazgo_contraloria': 'String',
            'observaciones': 'String',
            'recomendacion': 'String',
            //'procedimiento_disciplinario': 'String',
            //'tipo_proceso_disciplinario': 'String',
            //'estado_proceso_disciplinario': 'String',
            //'id_responsable_proceso_disciplinario': 'String',
            'criticidad': 'String',
            'compromisos': 'String',
            'porcentaje_avance': 'String',
            'estado': 'String',
         },
         
         'excel_selection_hallazgos':[//excel_selection_json_fields
            { 'field':'id_hallazgo_contraloria', 'name':'id','isVisible':true },
            { 'field':'materia_observacion', 'name':'materia observacion', 'isVisible':true },
            { 'field':'nombre_hallazgo_contraloria', 'name':'hallazgo contraloria', 'isVisible':true },
            { 'field':'observaciones', 'name':'observaciones', 'isVisible':true },
            { 'field':'recomendacion', 'name':'recomendacion', 'isVisible':true },
            { 'field':'procedimiento_disciplinario', 'name':'procedimiento disciplinario', 'isVisible':true },
            { 'field':'tipo_proceso_disciplinario', 'name':'tipo proceso disciplinario', 'isVisible':true },
            { 'field':'estado_proceso_disciplinario', 'name':'estado proceso disciplinario', 'isVisible':true },
            { 'field':'responsable_proceso_disciplinario', 'name':'responsable proceso disciplinario', 'isVisible':true },
            { 'field':'criticidad', 'name':'criticidad', 'isVisible':true },
            { 'field':'compromiso_contraloria', 'name':'compromisos', 'isVisible':true },
            { 'field':'porcentaje_avance', 'name':'porcentaje de avance', 'isVisible':true },
            { 'field':'estado', 'name':'estado', 'isVisible':true },
         ],

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

             if(h.compromiso_contraloria.length > 0){
                h.porcentaje_avance = h.compromiso_contraloria[0].seguimiento_contraloria[h.compromiso_contraloria[0].seguimiento_contraloria.length-1].porcentaje_avance || 0;
                h.estado = h.compromiso_contraloria[0].seguimiento_contraloria[h.compromiso_contraloria[0].seguimiento_contraloria.length-1].estado;
             }else{
                h.porcentaje_avance = 0;
                h.estado = 'Pendiente ingreso Compromiso';
             }

            return self.excel_json_data.push({
               'id': h.id_hallazgo_contraloria,
               'materia_observacion': h.materia_observacion,
               'hallazgo_contraloria': h.nombre_hallazgo_contraloria,
               'observaciones': h.observaciones,
               'recomendacion': h.recomendacion,
               'criticidad': h.criticidad,
               'compromisos': (h.compromiso_contraloria ? h.compromiso_contraloria.length : 0 ) || 0,

               //'procedimiento_disciplinario': h.procedimiento_disciplinario || 'No',
               //'tipo_proceso_disciplinario':
                  //self.tipo_proceso_disciplinario[h.id_tipo_proceso_disciplinario] || 'Sin tipo disciplinario',
               //'estado_proceso_disciplinario':
                  //self.estado_proceso_disciplinario[h.id_estado_proceso_disciplinario] || 'Sin estado disciplinario',
               'porcentaje_avance': h.porcentaje_avance || 0,
               'estado': h.estado || 'Pendiente ingreso Compromiso',
            });


         });

      },
      showModalNuevoHallazgo: function (showModalNuevoHallazgo) {
         if (showModalNuevoHallazgo == true) {
            this.permite_guardar_nuevo_hallazgo = true;
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
         ready () {},
         created(){},
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
         ready () {},
         created(){},
         filters: {},
         methods: {},
      },
      'modal':{
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
                                          <dd class="well well-sm">{{hallazgo.id_hallazgo_contraloria || '0'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Porcentaje de Avance</dt>
                                          <dd class="well well-sm">{{calcularAvanceHallazgo(hallazgo) || '0'}}%</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Materia Observacion</dt>
                                          <dd class="well well-sm">{{hallazgo.materia_observacion || 'Sin datos'}}</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Nombre</dt>
                                          <dd class="well well-sm">{{hallazgo.nombre_hallazgo_contraloria || 'Sin datos'}}</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Recomendacion</dt>
                                          <dd class="well well-sm">{{hallazgo.recomendacion || 'Sin datos'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Tipo Proceso Disciplinario</dt>
                                          <dd class="well well-sm">{{hallazgo.tipo_proceso_disciplinario || 'Sin datos'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Estado Proceso Disciplinario</dt>
                                          <dd class="well well-sm">{{hallazgo.estado_proceso_disciplinario || 'Sin datos'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Responsable Proceso Disciplinario</dt>
                                          <dd class="well well-sm">{{hallazgo.id_responsable_proceso_disciplinario || 'Sin datos'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Recomendacion</dt>
                                          <dd class="well well-sm">{{hallazgo.procedimiento_disciplinario || 'No'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Observaciones</dt>
                                          <dd class="well well-sm">{{hallazgo.observaciones || 'Sin Observaciones'}}</dd>
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
            return {

            }
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
               hallazgo.compromiso_contraloria.map( function (c,i) { //c:compromiso, i:index
                  if (c.porcentaje_avance > 0 && c.porcentaje_avance < 99 && c.estado != 'Informe de seguimiento emitido') {
                     cantidad_compromisos_1_y_99 += 1;
                     promedio_avance_compromisos_1_y_99 += c.porcentaje_avance;
                  }else if(c.porcentaje_avance == 100 && c.estado == 'Informe de seguimiento emitido'){
                     cantidad_compromisos_finalizados_100 += 1;
                  }
                  cantidad_total += 1;
               });
               if (cantidad_compromisos_1_y_99 > 0) {
                  estado_return = 'Abierto';
               }else if(cantidad_compromisos_finalizados_100 > 0 && cantidad_compromisos_finalizados_100 <= cantidad_total){
                  estado_return = 'Informe de seguimiento emitido';
               }else if( (promedio_avance_compromisos_1_y_99 / cantidad_compromisos_1_y_99) > 0 ){
                  estado_return = 'Abierto';
               }else{
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

               hallazgo.compromiso_contraloria.map( function (c,i) { //c:compromiso, i:index
                  if (c.porcentaje_avance > 0 && c.porcentaje_avance < 99 && c.estado != 'Informe de seguimiento emitido') {
                     cantidad_compromisos_1_y_99 += 1;
                     promedio_avance_compromisos_1_y_99 += c.porcentaje_avance;
                  }else if(c.porcentaje_avance == 100 && c.estado == 'Informe de seguimiento emitido'){
                     cantidad_compromisos_finalizados_100 += 1;
                  }
                  cantidad_total += 1;
               });

               if (cantidad_compromisos_1_y_99 > 0) {
                  promedio_return = (promedio_avance_compromisos_1_y_99 / cantidad_compromisos_1_y_99) || 0;
               }else if(cantidad_compromisos_finalizados_100 > 0 && cantidad_compromisos_finalizados_100 <= cantidad_total){
                  promedio_return = 100;
               }else if( (promedio_avance_compromisos_1_y_99 / cantidad_compromisos_1_y_99) > 0 ){
                  promedio_return = (promedio_avance_compromisos_1_y_99 / cantidad_compromisos_1_y_99) || 0;
               }else{
                  promedio_return = 0;
               }
               return promedio_return;


            },
         },
         watch: {
         },
      },
      'modal-nuevocompromiso':{
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
									      <!--
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
                                 -->
                                 <div class="col-md-12">
                                    <dt>Nombre Compromiso (*):</dt>
                                    <dd>
                                       <p class="control has-icon has-icon-right">
                                          <textarea name="nombre_compromiso_contraloria" rows="7"
                                                   :class="{'input': true, 'text-danger': errors.has('nombre_compromiso_contraloria'),
                                                    'scroll_textarea_original':true}"
                                                    v-validate="'required'" data-vv-delay="500"
                                                    v-model="nuevo_compromiso.nombre_compromiso_contraloria"
                                                    :value="nuevo_compromiso.nombre_compromiso_contraloria">
                                          </textarea>
                                          <transition name="bounce">
                                          <i v-show="errors.has('nombre_compromiso_contraloria')" class="fa fa-warning"></i>
                                          </transition>
                                          <transition name="bounce">
                                          <span v-show="errors.has('nombre_compromiso_contraloria')" class="text-danger">
                                             {{ errors.first('nombre_compromiso_contraloria') | replaceNombreCompromisoContraloria }}
                                          </span>
                                          </transition>
                                       </p>
                                    </dd>
                                 </div>
                                 <div class="col-md-6">
                                    <dt>Plazo Estimado (*):</dt>
                                    <dd>
                                       <p class="control has-icon has-icon-right">
                                          <input name="plazo_estimado" type="text" id="ncpe"
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
                                          <input name="plazo_comprometido" type="text" id="ncpc"
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
            return {
               'min_date':'',
            }
         },
         ready () {
         },
         created () {
            var self = this;
            var date = new Date();
            var dd = date.getDate();
            var mm = date.getMonth()+1; //January is 0!
            var yyyy = date.getFullYear();
            this.min_date = yyyy+"-"+((mm<10)?'0'+mm:mm)+"-"+((dd<10)?'0'+dd:dd);

            $(document).ready(function(){

               // #ncpe => nuevo compromiso plazo estimado
               $('#ncpe').datepicker({//ncpe => nuevo compromiso plazo estimado
                  format: "dd-mm-yyyy",
                  language: "es",
                  startDate: (function(){
                     return date = (function(){
                        var date = new Date();
                        date.setDate(date.getDate());
                        return date;
                     })();
                  })(),
                  autoclose: true,
               });

               $('#ncpe').change(function(){//ncpe => nuevo compromiso plazo estimado
                  if ($('#ncpe').val()) {

                     //hacer la validacion si es menor a la fecha actual, no avisar pero colocar la fecha que corresponde
                     var date_ncpe = $('#ncpe').val().split('-');

                     var date_today = new Date();
                     var dd = date_today.getDate();
                     var mm = date_today.getMonth()+1; //January is 0!
                     var yyyy = date_today.getFullYear();

                     if (date_ncpe.length == 3) {
                        if (date_ncpe[1].length != 2 || date_ncpe[0].length != 2 || date_ncpe[2].length != 4) {
                           $('#ncpe').prop('value', ((dd<10)?'0'+dd:dd)+'-'+((mm<10)?'0'+mm:mm)+'-'+yyyy);
                           self.nuevo_compromiso.plazo_estimado = ((dd<10)?'0'+dd:dd)+'-'+((mm<10)?'0'+mm:mm)+'-'+yyyy;
                           return ;
                        }
                     }

                     var date_today = new Date(mm+'/'+dd+'/'+yyyy);
                     date_ncpe = new Date(date_ncpe[1]+'/'+date_ncpe[0]+'/'+date_ncpe[2]);

                     var timeDiff = date_today.getTime() - date_ncpe.getTime();//Math.abs(date_ncpe.getTime() - date_ncpc.getTime());
                     var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                     //console.log(diffDays);

                     if (diffDays < 0) {
                        $('#ncpc').data('datepicker').setStartDate($('#ncpe').val());
                        self.nuevo_compromiso.plazo_estimado = $('#ncpe').val();
                     }else{
                        $('#ncpe').prop('value', ((dd<10)?'0'+dd:dd)+'-'+((mm<10)?'0'+mm:mm)+'-'+yyyy);
                        self.nuevo_compromiso.plazo_estimado = ((dd<10)?'0'+dd:dd)+'-'+((mm<10)?'0'+mm:mm)+'-'+yyyy;
                     }

                     //Si es que ya se habia ingresado el plazo comprometido, valida el rango
                     if ($('#ncpc').val()) {
                        var date_ncpc = $('#ncpc').val().split('-');
                        date_ncpc = new Date(date_ncpc[1]+'/'+date_ncpc[0]+'/'+date_ncpc[2]);

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


               // #ncpc => nuevo compromiso plazo comprometido
               $('#ncpc').datepicker({//ncpc => nuevo compromiso plazo comprometido
                  format: "dd-mm-yyyy",
                  language: "es",
                  startDate: new Date(),
                  autoclose: true,
               });

               $('#ncpc').click(function(event){
                  if ($('#ncpe').val()) {
                     $('#ncpc').data('datepicker').setStartDate($('#ncpe').val());
                  }
               });

               $('#ncpc').change(function(event){
                  var date_ncpe = $('#ncpe').val().split('-');
                  date_ncpe = new Date(date_ncpe[1]+'/'+date_ncpe[0]+'/'+date_ncpe[2]);

                  var date_ncpc = $('#ncpc').val().split('-');
                  date_ncpc = new Date(date_ncpc[1]+'/'+date_ncpc[0]+'/'+date_ncpc[2]);

                  var timeDiff = date_ncpc.getTime() - date_ncpe.getTime();//Math.abs(date_ncpe.getTime() - date_ncpc.getTime());
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
               if (fono != null) {fono = fono.replace('fono_responsable', 'telefono');}
               return fono;
            },
            replacePlazoComprometido(plazo_comprometido) {
               if (plazo_comprometido != null) { plazo_comprometido = plazo_comprometido.replace('plazo_comprometido', 'para el plazo comprometido');}
               return plazo_comprometido;
            },
            replacePlazoEstimado(plazo_estimado) {
               if (plazo_estimado != null) { plazo_estimado = plazo_estimado.replace('plazo_estimado', ' para el plazo estimado');}
               return plazo_estimado;
            },
            replaceNombreCompromisoContraloria(nombre_compromiso_contraloria) {
               if (nombre_compromiso_contraloria != null) { nombre_compromiso_contraloria =
                  nombre_compromiso_contraloria.replace('nombre_compromiso_contraloria', 'para el nombre del compromiso');}
               return nombre_compromiso_contraloria;
            },
         },
         methods: {

         },
         watch: {
         },
      },
      'modal-nuevohallazgo':{
         props: ['nuevo_hallazgo', 'criticidad', 'clasificacion_materia', 'hallazgos', 'form_hallazgo_editable',
            'tipo_proceso_disciplinario', 'estado_proceso_disciplinario', 'responsable_proceso_disciplinario',
            'hallazgo_historico_procedimientos_disciplinarios', 'hallazgo_procedimientos_disciplinarios'],
         template: `
			   <!-- template for the modal component -->
			   <transition name="modal">
				   <div class="modal-mask">
					   <div class="modal-wrapper">
					      <div class="modal-container">

						      <div class="modal-header">
							      <slot name="header"></slot>
						      </div><!-- .modal-header -->

						      <div class="modal-body">
							      <slot name="body">

                              <!-- ################################################# -->
                              <!-- Modal con el inicio del panel con tabs - nav-tabs -->
                              <!-- ################################################# -->

                              <div id="" class="panel with-nav-tabs panel-primary">

                                 <div class="panel-heading" style="border-bottom:0px;">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-tabs" role="tablist">
                                       <li role="presentation" class="active">
                                          <a href="#datosGenerales" aria-controls="datosGenerales" role="tab" data-toggle="tab">
                                             Datos Generales
                                          </a>
                                       </li>
                                       <li role="presentation">
                                          <a href="#procedimientosDisciplinarios" aria-controls="procedimientosDisciplinarios" role="tab" data-toggle="tab">
                                             Procedimientos Disciplinarios
                                          </a>
                                       </li>
                                    </ul>
                                 </div><!-- .panel-heading -->

                                 <!-- ########## -->
                                 <!-- Tabs Panes -->
                                 <!-- ########## -->

                                 <div class="panel-body">
                                    <!-- Tab panes -->
                                    <div class="tab-content">
                                       <div role="tabpanel" class="tab-pane fade in active" id="datosGenerales">

                                          <!-- dl : structure -->
                                          <dl class="dl-vertical" style="margin: 20px;">
                                             <div class="row">
                                                <div style="overflow-y: scroll;max-height: 400px;">
                                                   <div class="col-md-12">

                                                      <!-- Field : nombre_hallazgo_contraloria -->

                                                      <dt>Observaciones de CGR (Nombre del Hallazgo) (*):</dt>
                                                      <dd>
                                                         <p class="control has-icon has-icon-right">
                                                            <textarea name="nombre_hallazgo_contraloria" rows="3"
                                                                      v-model="nuevo_hallazgo.nombre_hallazgo_contraloria"
                                                                      :class="{'input': true, 'text-danger': errors.has('nombre_hallazgo_contraloria'),
                                                                      'scroll_textarea_original':true}"
                                                                      v-validate="'required'" data-vv-delay="500">
                                                               @{{ nuevo_hallazgo.nombre_hallazgo_contraloria }}
                                                            </textarea>
                                                            <transition name="bounce">
                                                            <i v-show="errors.has('nombre_hallazgo_contraloria')" class="fa fa-warning"></i>
                                                            </transition>
                                                            <transition name="bounce">
                                                            <span v-show="errors.has('nombre_hallazgo_contraloria')" class="text-danger">
                                                               {{ errors.first('nombre_hallazgo_contraloria') | replaceNombreHallazgoContraloria }}
                                                            </span>
                                                            </transition>
                                                         </p>
                                                      </dd>
                                                   </div><!-- .col-md-12 -->
                                                   <div class="col-md-6">

                                                      <!-- Field : criticidad -->

                                                      <dt>Seleccione el nivel de criticidad (*):</dt>
                                                      <dd>
                                                         <p class="control has-icon has-icon-right">
                                                            <select name="criticidad"
                                                                     v-model="nuevo_hallazgo.criticidad"
                                                                     v-validate="'required'" data-vv-delay="500"
                                                                     :class="{'input': true, 'text-danger': errors.has('criticidad'), 'form-control':true}">
                                                               <option v-for="c in criticidad" :value="c">{{c}}</option>
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
                                                   </div><!-- .col-md-6 -->
                                                   <div class="col-md-6">

                                                      <!-- Field : id_clasificacion_materia -->

                                                      <dt>Clasificacion Materia: (*)</dt>
                                                      <dd>
                                                         <p class="control has-icon has-icon-right">
                                                            <select name="id_clasificacion_materia" id="id_clasificacion_materia"
                                                                    v-model="nuevo_hallazgo.id_clasificacion_materia"
                                                                    v-validate="'required'" data-vv-delay="500"
                                                                    :class="{'input': true, 'text-danger': errors.has('id_clasificacion_materia'), 'form-control':true}">
                                                               <option v-for="(cm,i) in clasificacion_materia" :value="cm.id_clasificacion_materia">
                                                                  {{ cm.clasificacion_materia }}
                                                               </option>
                                                            </select>

                                                            <transition name="bounce">
                                                               <i v-show="errors.has('id_clasificacion_materia')" class="fa fa-warning"></i>
                                                            </transition>

                                                            <transition name="bounce">
                                                            <span v-show="errors.has('id_clasificacion_materia')" class="text-danger">
                                                               {{ errors.first('id_clasificacion_materia') | replaceClasificacionMateria }}
                                                            </span>
                                                            </transition>
                                                         </p>
                                                      </dd>

                                                   </div><!-- .col-md-6 -->
                                                   <div class="col-md-6">

                                                      <!-- Field : materia_observacion -->

                                                      <dt>Materia de Observacion:</dt>
                                                      <dd>
                                                            <textarea name="materia_observacion" rows="2"
                                                                      v-model="nuevo_hallazgo.materia_observacion"
                                                                      class="scroll_textarea_original">
                                                               @{{ nuevo_hallazgo.materia_observacion }}
                                                            </textarea>
                                                      </dd>

                                                   </div><!-- .col-md-6 -->
                                                   <div class="col-md-6">

                                                      <!-- Field : recomendacion -->

                                                      <dt>Redacte recomendacion:</dt>
                                                      <dd>
                                                         <textarea name="recomendacion" rows="2"
                                                                   v-model="nuevo_hallazgo.recomendacion"
                                                                   class="scroll_textarea_original">
                                                            @{{ nuevo_hallazgo.recomendacion }}
                                                         </textarea>
                                                      </dd>

                                                   </div><!-- .col-md-6 -->
                                                   <div class="col-md-12">
                                                      <br />
                                                      <button @click.prevent="guardar_nuevo_hallazgo" class="btn btn-sm btn-success pull-left"
                                                         v-if="button_guardar_hallazgo == true">
                                                         Guardar hallazgo
                                                      </button>
                                                   </div><!-- .col-md-12 -->

                                                </div><!-- styled -->
                                             </div><!-- .row -->
                                          </dl><!-- .dl-vertical styled margin:20 -->
                                       </div><!-- .tab-pane .fade .in .active #datosGenerales -->

                                       <div role="tabpanel" class="tab-pane fade" id="procedimientosDisciplinarios">
                                          <dl class="dl-vertical" style="margin: 20px;">
                                             <div class="row">
                                                <div style="overflow-y: scroll;max-height: 400px;">

                                                   <div class="col-md-12">

                                                      <!-- Field : procedimiento_disciplinario -->

                                                      <dt>Procedimiento Disciplinario (*):</dt>
                                                      <dd>
                                                         Instruye procedimiento disciplinario
                                                         <input id="procedimiento_disciplinario" type="checkbox" name="procedimiento_disciplinario"
                                                                  style="width: 20px;height: 20px;"
                                                                  @click="changeProcedimientoDisciplinario"">
                                                      </dd>
                                                      <br />

                                                      <div class="alert alert-danger" v-if="
                                                         nuevo_hallazgo.nombre_hallazgo_contraloria == '' ||
                                                         nuevo_hallazgo.criticidad == '' ||
                                                         nuevo_hallazgo.id_clasificacion_materia == ''">

                                                         <!-- Errores : campos inconmpletos -->
                                                         <b>Los siguientes datos son requeridos *:</b>
                                                         <br>
                                                         <ul>
                                                            <li v-show="nuevo_hallazgo.nombre_hallazgo_contraloria == ''">
                                                               Observaciones CGR (Nombre Hallazgo)
                                                            </li>
                                                            <li v-show="nuevo_hallazgo.criticidad == ''">
                                                               Criticidad
                                                            </li>
                                                            <li v-show="nuevo_hallazgo.id_clasificacion_materia == ''">
                                                               Clasificacion Materia
                                                            </li>
                                                         </ul>

                                                         <small>
                                                            * Para asignar un procedimiento disciplinario se deben completar los campos requeridos,
                                                            ya que son necesarios para asociar un procedimiento a un hallazgo.
                                                         </small>

                                                      </div><!-- .alert .alert-danger -->

                                                      <!--
                                                      <div class="alert alert-success" v-else>
                                                         <i class="fa fa-check"></i>
                                                      </div>
                                                      <!-- .alert .alert-danger -->


                                                   </div><!-- .col-md-12 -->
                                                   <div class="col-md-6">

                                                      <!-- Validation if includes procedimiento disciplinario -->

                                                      <div v-show="instruyeProcedimientoDisciplinario == true">

                                                         <!-- Field : procedimiento_disciplinario -->

                                                         <dt>Tipo proceso Disciplinario (*):</dt>
                                                         <dd>
                                                            <p class="control has-icon has-icon-right">
                                                               <select name="id_tipo_proceso_disciplinario"
                                                                        v-model="nuevo_hallazgo.id_tipo_proceso_disciplinario"
                                                                        v-validate="'required'" data-vv-delay="500"
                                                                        :class="{'input': true,
                                                                        'text-danger': errors.has('id_tipo_proceso_disciplinario'),
                                                                        'form-control':true}">
                                                                  <option v-for="(v,i) in tipo_proceso_disciplinario" :value="i">{{v}}</option>
                                                               </select>
                                                               <transition name="bounce">
                                                               <i v-show="errors.has('id_tipo_proceso_disciplinario')" class="fa fa-warning"></i>
                                                               </transition>
                                                               <transition name="bounce">
                                                               <span v-show="errors.has('id_tipo_proceso_disciplinario')" class="text-danger">
                                                                  {{ errors.first('id_tipo_proceso_disciplinario') | replaceTipoProcesoDisciplinario }}
                                                               </span>
                                                               </transition>
                                                            </p>
                                                         </dd>

                                                         <!-- Field : id_responsable_proceso_disciplinario -->

                                                         <dt>Responsable proceso Disciplinario (*):</dt>
                                                         <dd>
                                                            <p class="control has-icon has-icon-right">
                                                               <select name="id_responsable_proceso_disciplinario"
                                                                        v-model="nuevo_hallazgo.id_responsable_proceso_disciplinario"
                                                                        v-validate="'required'" data-vv-delay="500"
                                                                        :class="{'input': true, 'text-danger': errors.has('id_responsable_proceso_disciplinario'), 'form-control':true}">
                                                                  <option v-for="(v,i) in responsable_proceso_disciplinario" :value="i">{{v}}</option>
                                                               </select>
                                                               <transition name="bounce">
                                                               <i v-show="errors.has('id_responsable_proceso_disciplinario')" class="fa fa-warning"></i>
                                                               </transition>
                                                               <transition name="bounce">
                                                               <span v-show="errors.has('id_responsable_proceso_disciplinario')" class="text-danger">
                                                                  {{ errors.first('id_responsable_proceso_disciplinario') | replaceResponsableProcesoDisciplinario }}
                                                               </span>
                                                               </transition>
                                                            </p>
                                                         </dd>

                                                         <!-- Field : button to add -->

                                                         <dt>Asignar procedimiento:</dt>
                                                         <dd>
                                                            <br />
                                                            <p class="control has-icon has-icon-right">
                                                               <button class="btn btn-md btn-success"
                                                                  @click.prevent="guardar_nuevo_procedimiento_disciplinario">
                                                               Asignar
                                                               </button>
                                                            </p>
                                                         </dd>

                                                      </div><!-- validation v-show when includes proc. disc. -->

                                                   </div><!-- .col-md-6 -->
                                                   <div class="col-md-6">

                                                      <!-- Validation if includes procedimiento disciplinario -->

                                                      <div v-show="instruyeProcedimientoDisciplinario == true">

                                                         <!-- Field : id_estado_proceso_disciplinario -->

                                                         <dt>Estado proceso Disciplinario (*):</dt>
                                                         <dd>

                                                            <p class="control has-icon has-icon-right">
                                                               <select name="id_estado_proceso_disciplinario"
                                                                        v-model="nuevo_hallazgo.id_estado_proceso_disciplinario"
                                                                        v-validate="'required'" data-vv-delay="500"
                                                                        :class="{'input': true, 'text-danger': errors.has('id_estado_proceso_disciplinario'), 'form-control':true}">
                                                                  <option v-for="(v,i) in estado_proceso_disciplinario" :value="i">{{v}}</option>
                                                               </select>
                                                               <transition name="bounce">
                                                               <i v-show="errors.has('id_estado_proceso_disciplinario')" class="fa fa-warning"></i>
                                                               </transition>
                                                               <transition name="bounce">
                                                               <span v-show="errors.has('id_estado_proceso_disciplinario')" class="text-danger">
                                                                  {{ errors.first('id_estado_proceso_disciplinario') | replaceEstadoProcesoDisciplinario }}
                                                               </span>
                                                               </transition>
                                                            </p>
                                                         </dd>

                                                         <!-- Field : id_estado_proceso_disciplinario -->

                                                         <dt>Observacion Procedimiento (*):</dt>
                                                         <dd>
                                                            <p class="control has-icon has-icon-right">
                                                               <textarea name="observaciones" rows="5"
                                                                      v-model="nuevo_hallazgo.observaciones"
                                                                      :class="{'input': true, 'text-danger': errors.has('observaciones'),
                                                                      'scroll_textarea_original':true}"
                                                                      v-validate="'required'" data-vv-delay="500">
                                                                  @{{ nuevo_hallazgo.observaciones}}
                                                               </textarea>
                                                               <transition name="bounce">
                                                               <i v-show="errors.has('observaciones')" class="fa fa-warning"></i>
                                                               </transition>
                                                               <transition name="bounce">
                                                               <span v-show="errors.has('observaciones')" class="text-danger">
                                                                  {{ errors.first('observaciones') }}
                                                               </span>
                                                               </transition>
                                                            </p>
                                                         </dd>


                                                      </div><!-- validation v-show when includes proc. disc. -->
                                                   </div><!-- .col-md-6 -->
                                                   <div class="col-md-12">

                                                      <!-- Validation if includes procedimiento disciplinario -->

                                                      <div v-show="instruyeProcedimientoDisciplinario == true">

                                                         <!-- ################################################################## -->
                                                         <!-- Tabla con asignaciones/historicos de procedimientos disciplinarios -->
                                                         <!-- ################################################################## -->


                                                         <dl class="dl-vertical" style="margin: 20px;">
                                                            <div class="row">

                                                               <div id="" class="panel with-nav-tabs panel-primary">
                                                                  <div class="panel-heading" style="border-bottom:0px;">
                                                                     <!-- Nav tabs -->
                                                                     <ul class="nav nav-tabs" role="tablist">
                                                                        <li role="presentation" class="active">
                                                                           <a href="#procedimientosAsignados" aria-controls="gestionResponsable"
                                                                              role="tab" data-toggle="tab">

                                                                              Procedimientos disciplinarios asignados
                                                                           </a>
                                                                        </li>

                                                                        <li role="presentation">
                                                                           <a href="#historicoProcedimientos" aria-controls="nuevoUsuario"
                                                                              role="tab" data-toggle="tab">

                                                                              Historico de procedimientos
                                                                           </a>
                                                                        </li>
                                                                     </ul><!-- .nav .nav-tabs -->
                                                                  </div><!-- .panel-heading -->

                                                                  <div class="panel-body">
                                                                     <!-- Tab panes -->
                                                                     <div class="tab-content">

                                                                        <!-- Procedimientos Asignados -->

                                                                        <div role="tabpanel" class="tab-pane fade in active" id="procedimientosAsignados">
                                                                           <div class="table-responsive">
                                                                              <table class="table custom-table table-striped text-center">
                                                                                 <thead>
                                                                                    <th>Id</th>
                                                                                    <th>Accion</th>
                                                                                    <th>Tipo</th>
                                                                                    <th>Estado</th>
                                                                                    <th>Responsable</th>
                                                                                    <th>Observaciones</th>
                                                                                 </thead>
                                                                                 <tbody>
                                                                                    <tr v-for="hpd in hallazgo_procedimientos_disciplinarios"
                                                                                       v-if="hpd.id_hallazgo_contraloria == nuevo_hallazgo.id_hallazgo_contraloria">
                                                                                       <td>
                                                                                       <button
                                                                                          v-if="hpd.id_hallazgo_contraloria_procedimiento_disciplinario!=form_hpd"
                                                                                          type="button"
                                                                                          class="btn btn-primary btn-xs"
                                                                                          :value="hpd.id_hallazgo_contraloria_procedimiento_disciplinario"
                                                                                          @click.prevent="
                                                                                          cambiar_form_hpd(hpd.id_hallazgo_contraloria_procedimiento_disciplinario)"
                                                                                          data-toggle="tooltip" data-placement="left" title="Modificar">
                                                                                          <i class="fa fa-pencil"></i>
                                                                                       </button>
                                                                                       <button v-else type="button" class="btn btn-success btn-xs"
                                                                                          :value="hpd.id_hallazgo_contraloria_procedimiento_disciplinario"
                                                                                          @click.prevent="
                                                                                          guardar_form_hpd(hpd.id_hallazgo_contraloria_procedimiento_disciplinario,0)"
                                                                                          data-toggle="tooltip" data-placement="left" title="Guardar">
                                                                                          <i class="fa fa-check" aria-hidden="true"></i>
                                                                                       </button>
                                                                                       </td>

                                                                                       <!-- Id hallazgo contraloria procedimiento disciplinario -->
                                                                                       <td>
                                                                                          {{hpd.id_hallazgo_contraloria_procedimiento_disciplinario}}
                                                                                       </td>

                                                                                       <!-- Tipo proceso disciplinario -->
                                                                                       <td v-if="hpd.id_hallazgo_contraloria_procedimiento_disciplinario!=form_hpd">
                                                                                          {{tipo_proceso_disciplinario[
                                                                                             hpd.id_tipo_proceso_disciplinario
                                                                                          ]}}
                                                                                       </td>
                                                                                       <td v-else>
                                                                                       <p class="control has-icon has-icon-right">
                                                                                          <select name="id_tipo_proceso_disciplinario"
                                                                                                   v-model="hpd.id_tipo_proceso_disciplinario"
                                                                                                   v-validate="'required'" data-vv-delay="500"
                                                                                                   :class="{'input': true,
                                                                                                   'text-danger': errors.has('id_tipo_proceso_disciplinario'),
                                                                                                   'form-control':true}">
                                                                                             <option v-for="(v,i) in tipo_proceso_disciplinario"
                                                                                                :value="i">
                                                                                                {{v}}
                                                                                             </option>
                                                                                          </select>
                                                                                          <transition name="bounce">
                                                                                          <i v-show="errors.has('id_tipo_proceso_disciplinario')"
                                                                                             class="fa fa-warning"></i>
                                                                                          </transition>
                                                                                          <transition name="bounce">
                                                                                          <span v-show="errors.has('id_tipo_proceso_disciplinario')"
                                                                                             class="text-danger">
                                                                                             {{ errors.first('id_tipo_proceso_disciplinario')
                                                                                                | replaceTipoProcesoDisciplinario }}
                                                                                          </span>
                                                                                          </transition>
                                                                                       </p>
                                                                                       </td>

                                                                                       <!-- Estado proceso disciplinario -->
                                                                                       <td v-if="hpd.id_hallazgo_contraloria_procedimiento_disciplinario!=form_hpd">
                                                                                          {{estado_proceso_disciplinario[
                                                                                             hpd.id_estado_proceso_disciplinario
                                                                                          ]}}
                                                                                       </td>
                                                                                       <td v-else>
                                                                                       <p class="control has-icon has-icon-right">
                                                                                          <select name="id_estado_proceso_disciplinario"
                                                                                                   v-model="hpd.id_estado_proceso_disciplinario"
                                                                                                   v-validate="'required'" data-vv-delay="500"
                                                                                                   :class="{'input': true,
                                                                                                   'text-danger': errors.has('id_estado_proceso_disciplinario'),
                                                                                                   'form-control':true}">
                                                                                             <option v-for="(v,i) in estado_proceso_disciplinario"
                                                                                                :value="i">
                                                                                                {{v}}
                                                                                             </option>
                                                                                          </select>
                                                                                          <transition name="bounce">
                                                                                          <i v-show="errors.has('id_estado_proceso_disciplinario')"
                                                                                             class="fa fa-warning"></i>
                                                                                          </transition>
                                                                                          <transition name="bounce">
                                                                                          <span v-show="errors.has('id_estado_proceso_disciplinario')"
                                                                                             class="text-danger">
                                                                                             {{ errors.first('id_estado_proceso_disciplinario')
                                                                                                | replaceEstadoProcesoDisciplinario }}
                                                                                          </span>
                                                                                          </transition>
                                                                                       </p>
                                                                                       </td>

                                                                                       <!-- Estado proceso disciplinario -->
                                                                                       <td v-if="hpd.id_hallazgo_contraloria_procedimiento_disciplinario!=form_hpd">
                                                                                          {{responsable_proceso_disciplinario[
                                                                                             hpd.id_responsable_proceso_disciplinario
                                                                                          ]}}
                                                                                       </td>
                                                                                       <td v-else>
                                                                                       <p class="control has-icon has-icon-right">
                                                                                          <select name="id_responsable_proceso_disciplinario"
                                                                                                   v-model="hpd.id_responsable_proceso_disciplinario"
                                                                                                   v-validate="'required'" data-vv-delay="500"
                                                                                                   :class="{'input': true,
                                                                                                   'text-danger': errors.has('id_responsable_proceso_disciplinario'),
                                                                                                   'form-control':true}">
                                                                                             <option v-for="(v,i) in responsable_proceso_disciplinario"
                                                                                                :value="i">
                                                                                                {{v}}
                                                                                             </option>
                                                                                          </select>
                                                                                          <transition name="bounce">
                                                                                          <i v-show="errors.has('id_responsable_proceso_disciplinario')"
                                                                                             class="fa fa-warning"></i>
                                                                                          </transition>
                                                                                          <transition name="bounce">
                                                                                          <span v-show="errors.has('id_responsable_proceso_disciplinario')"
                                                                                             class="text-danger">
                                                                                             {{ errors.first('id_responsable_proceso_disciplinario')
                                                                                                | replaceResponsableProcesoDisciplinario }}
                                                                                          </span>
                                                                                          </transition>
                                                                                       </p>
                                                                                       </td>

                                                                                       <!-- Observaciones -->
                                                                                       <td v-if="hpd.id_hallazgo_contraloria_procedimiento_disciplinario!=form_hpd">
                                                                                          {{hpd.observaciones}}
                                                                                       </td>
                                                                                       <td v-else>
                                                                                       <p class="control has-icon has-icon-right">
                                                                                          <textarea name="observaciones" rows="2"
                                                                                                 v-model="hpd.observaciones"
                                                                                                 :class="{'input': true, 'text-danger': errors.has('observaciones'),
                                                                                                 'scroll_textarea_original':true}"
                                                                                                 v-validate="'required'" data-vv-delay="500">
                                                                                             @{{ hpd.observaciones}}
                                                                                          </textarea>
                                                                                          <transition name="bounce">
                                                                                          <i v-show="errors.has('observaciones')" class="fa fa-warning"></i>
                                                                                          </transition>
                                                                                          <transition name="bounce">
                                                                                          <span v-show="errors.has('observaciones')" class="text-danger">
                                                                                             {{ errors.first('observaciones') }}
                                                                                          </span>
                                                                                          </transition>
                                                                                       </p>
                                                                                       </td>

                                                                                    </tr>
                                                                                 </tbody>
                                                                              </table>
                                                                           </div><!-- table-responsive styled -->

                                                                        </div><!-- .tab-pane .fade #procedimientosAsignados -->

                                                                        <!-- Historico de Seguimientos -->
                                                                        <div role="tabpanel" class="tab-pane fade" id="historicoProcedimientos">

                                                                           <div class="table-responsive">
                                                                              <table class="table custom-table table-striped text-center">
                                                                                 <thead>
                                                                                    <th>Id historico</th>
                                                                                    <th>Tipo</th>
                                                                                    <th>Estado</th>
                                                                                    <th>Responsable</th>
                                                                                    <th>Observaciones</th>
                                                                                 </thead>
                                                                                 <tbody>
                                                                                    <tr v-for="hhpd in hallazgo_historico_procedimientos_disciplinarios"
                                                                                       v-if="hhpd.id_hallazgo_contraloria ==
                                                                                       nuevo_hallazgo.id_hallazgo_contraloria">

                                                                                       <td>
                                                                                          {{hhpd.id_hallazgo_historico_procedimiento_disciplinario}}
                                                                                       </td>
                                                                                       <td>
                                                                                          {{tipo_proceso_disciplinario[
                                                                                             hhpd.id_tipo_proceso_disciplinario
                                                                                          ]}}
                                                                                       </td>
                                                                                       <td>
                                                                                          {{estado_proceso_disciplinario[
                                                                                             hhpd.id_estado_proceso_disciplinario
                                                                                          ]}}
                                                                                       </td>
                                                                                       <td>
                                                                                          {{responsable_proceso_disciplinario[
                                                                                             hhpd.id_responsable_proceso_disciplinario
                                                                                          ]}}
                                                                                       </td>
                                                                                       <td>
                                                                                          {{hhpd.observaciones}}
                                                                                       </td>
                                                                                    </tr>
                                                                                 </tbody>
                                                                              </table>
                                                                           </div><!-- table-responsive styled -->

                                                                        </div><!-- .tab-pane .fade #historicoProcedimientos -->

                                                                     </div><!-- .tab-content -->
                                                                  </div><!-- .panel-body -->

                                                               </div><!-- .panel .with-nav-tabs panel-primary -->

                                                            </div><!-- .row -->
                                                         </dl><!-- .dl-vertical styled margin:20 -->


                                                         <!-- ###################################################################### -->
                                                         <!-- Fin tabla con asignaciones/historicos de procedimientos disciplinarios -->
                                                         <!-- ###################################################################### -->

                                                      </div><!-- validation v-show when includes proc. disc. -->
                                                   </div><!-- .col-md-12 -->
                                                </div><!-- styled -->
                                             </div><!-- .row -->

                                          </dl><!-- .dl-vertical styled margin:20 -->

                                       </div><!-- #procedimientosDisciplinarios -->
                                    </div><!-- .tab-content -->

                                 </div><!-- .panel-body -->
                              </div><!-- panel -->

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
            return {
               'instruyeProcedimientoDisciplinario':false,
               'permite_guardar_nuevo_hallazgo': true,
               'permite_guardar_nuevo_procedimiento_disciplinario': true,
               'button_guardar_hallazgo': true,
               'form_hpd':0,
               'permiteGuardarHpd':true,
            }
         },
         ready () {
         },
         created () {
         },
         filters: {
            replaceNombreHallazgoContraloria(nombre_hallazgo_contraloria) {
               if (nombre_hallazgo_contraloria != null) {nombre_hallazgo_contraloria =
                  nombre_hallazgo_contraloria.replace('nombre_hallazgo_contraloria', 'para el nombre del hallazgo');}
               return nombre_hallazgo_contraloria;
            },
            replaceMateriaObservacion(materia_observacion) {
               if (materia_observacion != null) {materia_observacion =
                  materia_observacion.replace('materia_observacion', 'materia observacion');}
               return materia_observacion;
            },
            replaceProcedimientoDisciplinario: function (procedimiento_disciplinario) {
               if (procedimiento_disciplinario != null) {procedimiento_disciplinario =
                  procedimiento_disciplinario.replace('procedimiento_disciplinario', 'procedimiento disciplinario');}
               return procedimiento_disciplinario;
            },
            replaceTipoProcesoDisciplinario: function (id_tipo_proceso_disciplinario) {
               if (id_tipo_proceso_disciplinario != null) {id_tipo_proceso_disciplinario =
                  id_tipo_proceso_disciplinario.replace('id_tipo_proceso_disciplinario', 'tipo proceso disciplinario');}
               return id_tipo_proceso_disciplinario;
            },
            replaceEstadoProcesoDisciplinario: function (id_estado_proceso_disciplinario) {
               if (id_estado_proceso_disciplinario != null) {id_estado_proceso_disciplinario =
                  id_estado_proceso_disciplinario.replace('id_estado_proceso_disciplinario', 'estado proceso disciplinario');}
               return id_estado_proceso_disciplinario;
            },
            replaceResponsableProcesoDisciplinario: function (id_responsable_proceso_disciplinario) {
               if (id_responsable_proceso_disciplinario != null) {id_responsable_proceso_disciplinario =
                  id_responsable_proceso_disciplinario.replace('id_responsable_proceso_disciplinario', 'responsable proceso disciplinario');}
               return id_responsable_proceso_disciplinario;
            },
            replaceClasificacionMateria: function (id_clasificacion_materia) {
               if (id_clasificacion_materia != null) {id_clasificacion_materia =
                  id_clasificacion_materia.replace('id_clasificacion_materia', 'clasificacion materia');}
               return id_clasificacion_materia;
            },
         },
         methods: {
            cambiar_form_hpd: function(id_hallazgo_contraloria_procedimiento_disciplinario){
               //this.form_hallazgo_editable = (this.form_hallazgo_editable == false ? true : false);
               return this.form_hpd = id_hallazgo_contraloria_procedimiento_disciplinario;
            },
            changeProcedimientoDisciplinario: function () {

               if (this.nuevo_hallazgo.nombre_hallazgo_contraloria == '' ||
                  this.nuevo_hallazgo.criticidad == '' ||
                  this.nuevo_hallazgo.id_clasificacion_materia == '') {
                  alert('No se puede asignar un procedimiento hasta que complete los campos requeridos.');
                  $('#procedimiento_disciplinario').prop('checked', false);
                  return ;
               }else{
                  //this.$parent.$options.methods.guardar_nuevo_hallazgo();
                  if (this.permite_guardar_nuevo_hallazgo == true) {
                     this.button_guardar_hallazgo = false;
                     this.guardar_nuevo_hallazgo();
                  }
                  return ;
               }
            },
            findHallazgoProcedimientoDisciplinarioById: function (items, id) {
               //hpd.id_hallazgo_contraloria_procedimiento_disciplinario
               for (var i in items) {
                  if (items[i].id_hallazgo_contraloria_procedimiento_disciplinario==id) {
                     return items[i];
                  }
               }
               return null;
            },
            guardar_form_hpd: function(id_hallazgo_contraloria_procedimiento_disciplinario,index){
               //return this.form_hpd = 0;
               if(this.form_hpd != 0 && id_hallazgo_contraloria_procedimiento_disciplinario != 0){
                  this.$validator.validateAll().then(result => {});
                  if (this.permiteGuardarHpd == true){
                     this.permiteGuardarHpd = false;
                     var hpd =
                        this.findHallazgoProcedimientoDisciplinarioById(
                           this.hallazgo_procedimientos_disciplinarios,
                           id_hallazgo_contraloria_procedimiento_disciplinario
                        );

                     if (hpd.id_tipo_proceso_disciplinario != '' &&
                        hpd.id_estado_proceso_disciplinario != '' &&
                        hpd.id_responsable_proceso_disciplinario != '' &&
                        hpd.observaciones != '' ){

                        //Lo guarda, verifica si los datos del objeto que son necesarios son iguales, sino que no lo guarde
                        Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                        this.$http.put('/hallazgo_contraloria/update/procedimiento_disciplinario', hpd).then(response => {
                           //console.log(response.body);
                           this.form_hpd = 0;
                           //this.showModalEditarHallazgo = false;
                           //this.permiteGuardarHallazgo = true;
                           var self = this;
                           setTimeout(() => {
                              self.$parent.fetchHallazgos();
                              self.permiteGuardarHpd = true;
                           }, 500);

                        }, response => {
                           // error callback
                        });


                     }else{
                        this.permiteGuardarHpd = true;
                     }
                  }else{
                     alert('Se esta procesando la solicitud');
                  }
               }

               /*else if (this.form_hallazgo_editable != 0 && id_hallazgo_contraloria != 0 && index == 0) {
                Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                this.hallazgo = gcf.findHallazgoById(this.hallazgos, id_hallazgo_contraloria);
                this.$http.put('/hallazgo_contraloria/'+id_hallazgo_contraloria, this.hallazgo).then(response => {
                //console.log(response.body);
                this.form_hallazgo_editable = 0;
                var self = this;
                setTimeout(() => {
                self.fetchHallazgos();
                }, 1000);

                }, response => {
                // error callback
                });

                }*/
            },
            guardar_nuevo_hallazgo: function (){
               //this.$validator.validateAll().then(result => {});
               if (this.permite_guardar_nuevo_hallazgo == true){
                  this.permite_guardar_nuevo_hallazgo = false;
                  if (this.nuevo_hallazgo.nombre_hallazgo_contraloria != '' &&
                     this.nuevo_hallazgo.criticidad != '' &&
                     this.nuevo_hallazgo.id_clasificacion_materia != ''
                  ) {

                     if (this.nuevo_hallazgo.procedimiento_disciplinario == false) {
                        this.nuevo_hallazgo.procedimiento_disciplinario = 'No';
                        this.nuevo_hallazgo.id_tipo_proceso_disciplinario = 0;
                        this.nuevo_hallazgo.id_estado_proceso_disciplinario = 0;
                        this.nuevo_hallazgo.id_responsable_proceso_disciplinario = 0;
                     }else{
                        this.nuevo_hallazgo.procedimiento_disciplinario = 'Si';
                     }

                     //console.log(this.nuevo_hallazgo);
                     Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                     this.$http.post('/hallazgo_contraloria', this.nuevo_hallazgo).then(response => {
                        //agregar al final
                        //this.permite_guardar_nuevo_procedimiento_disciplinario = true;

                        this.form_hallazgo_editable = 0;
                        this.hallazgos.push(response.body);
                        this.nuevo_hallazgo.id_hallazgo_contraloria = response.body.id_hallazgo_contraloria;

                        var self = this;
                        setTimeout(function() {
                           //self.$parent.$options.methods.fetchHallazgos();
                           //Cuando guarda hallazgo sin asociar procedimiento disciplinario
                           self.$parent.fetchHallazgos();
                           if (self.button_guardar_hallazgo == true) {
                              //this.navigate(1);
                              self.nuevo_hallazgo = {};
                              self.$parent.limpiarNuevoHallazgo();
                              self.$parent.showModalNuevoHallazgo = false;
                           }else{
                              //Cuando guarda hallazgo y asocia o quiere asociar un procedimiento disciplinario

                              self.nuevo_hallazgo.procedimiento_disciplinario =
                                 self.instruyeProcedimientoDisciplinario =
                                    (self.instruyeProcedimientoDisciplinario == false) ? true : false;

                              self.button_guardar_hallazgo = false;
                           }
                        }, 500);
                     }, response => {/*·*/});
                  }else{
                     this.permite_guardar_nuevo_hallazgo = true;
                  }
               }else{
                  //alert('Se esta procesando la solicitud');
               }
            },
            guardar_nuevo_procedimiento_disciplinario: function () {
               this.$validator.validateAll().then(result => {});
               if (this.permite_guardar_nuevo_procedimiento_disciplinario == true){
                  this.permite_guardar_nuevo_procedimiento_disciplinario = false;
                  if (
                   this.nuevo_hallazgo.procedimiento_disciplinario == true &&
                   this.nuevo_hallazgo.id_tipo_proceso_disciplinario != '' &&
                   this.nuevo_hallazgo.id_estado_proceso_disciplinario != '' &&
                   this.nuevo_hallazgo.id_responsable_proceso_disciplinario != '' &&
                   this.nuevo_hallazgo.id_hallazgo_contraloria != '' &&
                   this.nuevo_hallazgo.id_contraloria != '' &&
                   this.nuevo_hallazgo.observaciones != '' && this.nuevo_hallazgo.observaciones != null
                  ) {

                     if (this.nuevo_hallazgo.procedimiento_disciplinario == false) {
                        this.nuevo_hallazgo.procedimiento_disciplinario = 'No';
                        this.nuevo_hallazgo.id_tipo_proceso_disciplinario = 0;
                        this.nuevo_hallazgo.id_estado_proceso_disciplinario = 0;
                        this.nuevo_hallazgo.id_responsable_proceso_disciplinario = 0;
                     }else{
                        this.nuevo_hallazgo.procedimiento_disciplinario = 'Si';
                     }

                     //console.log(this.nuevo_hallazgo);
                     Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                     this.$http.post('/hallazgo_contraloria/store/procedimiento_disciplinario', this.nuevo_hallazgo).then(response => {

                        this.form_hallazgo_editable = 0;
                        this.permite_guardar_nuevo_procedimiento_disciplinario = true;
                        this.hallazgo_procedimientos_disciplinarios.push(response.body);
                        this.hallazgo_historico_procedimientos_disciplinarios.push(response.body);
                        var self = this;
                        setTimeout(function() {
                           //self.$parent.$options.methods.fetchHallazgos();
                           //Cuando guarda hallazgo sin asociar procedimiento disciplinario
                           self.$parent.fetchHallazgos();
                           self.nuevo_hallazgo.procedimiento_disciplinario = true;
                           self.nuevo_hallazgo.id_tipo_proceso_disciplinario = '';
                           self.nuevo_hallazgo.id_estado_proceso_disciplinario = '';
                           self.nuevo_hallazgo.id_responsable_proceso_disciplinario = '';
                           self.nuevo_hallazgo.observaciones = '';

                        }, 500);

                     }, response => {});
                  }else{
                     this.permite_guardar_nuevo_procedimiento_disciplinario = true;
                  }
               }else{
                  //alert('Se esta procesando la solicitud');
               }
            },
         },
         watch: {
         },
      },
      'modal-editarhallazgo':{
         props: ['hallazgo', 'config', 'auth', 'role', 'auditor', 'usuarios', 'area_contraloria', 'hallazgos_responsables', 'contraloria',
            'hallazgo_historico_procedimientos_disciplinarios', 'hallazgo_procedimientos_disciplinarios',
            'tipo_proceso_disciplinario', 'estado_proceso_disciplinario', 'responsable_proceso_disciplinario', 'criticidad', 'clasificacion_materia'],
         template: `
			   <!-- template for the modal component -->
			   <transition name="modal">
				   <div class="modal-mask">
					   <div class="modal-wrapper">
					      <div class="modal-container">

						      <div class="modal-header">
							      <slot name="header"></slot>
						      </div><!-- .modal-header -->

						      <div class="modal-body">
							      <slot name="body">

                              <!-- ###################################### -->
                              <!-- Modal con el inicio del panel con tabs -->
                              <!-- ###################################### -->


                              <div id="" class="panel with-nav-tabs panel-primary">

                                 <div class="panel-heading" style="border-bottom:0px;">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-tabs" role="tablist">
                                       <li role="presentation" class="active">
                                          <a href="#datosGenerales" aria-controls="datosGenerales" role="tab" data-toggle="tab">
                                             Datos Generales
                                          </a>
                                       </li>
                                       <li role="presentation">
                                          <a href="#procedimientosDisciplinarios" aria-controls="procedimientosDisciplinarios" role="tab" data-toggle="tab">
                                             Procedimientos Disciplinarios
                                          </a>
                                       </li>
                                    </ul>
                                 </div><!-- .panel-heading -->

                                 <!-- ########## -->
                                 <!-- Tabs Panes -->
                                 <!-- ########## -->

                                 <div class="panel-body">
                                    <!-- Tab panes -->
                                    <div class="tab-content">
                                       <div role="tabpanel" class="tab-pane fade in active" id="datosGenerales">

                                          <!-- dl : structure -->
                                          <dl class="dl-vertical" style="margin: 20px;">
                                             <div class="row">
                                                <div style="overflow-y: scroll;max-height: 400px;">
                                                   <div class="col-md-12">

                                                      <!-- Field : nombre_hallazgo_contraloria -->

                                                      <dt>Observaciones de CGR (Nombre del Hallazgo) (*):</dt>
                                                      <dd>
                                                         <p class="control has-icon has-icon-right">
                                                            <textarea name="nombre_hallazgo_contraloria" rows="3"
                                                                      v-model="hallazgo.nombre_hallazgo_contraloria"
                                                                      :class="{'input': true, 'text-danger': errors.has('nombre_hallazgo_contraloria'),
                                                                      'scroll_textarea_original':true}"
                                                                      v-validate="'required'" data-vv-delay="500">
                                                               @{{ hallazgo.nombre_hallazgo_contraloria }}
                                                            </textarea>
                                                            <transition name="bounce">
                                                            <i v-show="errors.has('nombre_hallazgo_contraloria')" class="fa fa-warning"></i>
                                                            </transition>
                                                            <transition name="bounce">
                                                            <span v-show="errors.has('nombre_hallazgo_contraloria')" class="text-danger">
                                                               {{ errors.first('nombre_hallazgo_contraloria') | replaceNombreHallazgoContraloria }}
                                                            </span>
                                                            </transition>
                                                         </p>
                                                      </dd>
                                                   </div><!-- .col-md-12 -->
                                                   <div class="col-md-6">

                                                      <!-- Field : criticidad -->

                                                      <dt>Seleccione el nivel de criticidad (*):</dt>
                                                      <dd>
                                                         <p class="control has-icon has-icon-right">
                                                            <select name="criticidad"
                                                                     v-model="hallazgo.criticidad"
                                                                     v-validate="'required'" data-vv-delay="500"
                                                                     :class="{'input': true, 'text-danger': errors.has('criticidad'), 'form-control':true}">
                                                               <option v-for="c in criticidad" :value="c">{{c}}</option>
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
                                                   </div><!-- .col-md-6 -->
                                                   <div class="col-md-6">

                                                      <!-- Field : id_clasificacion_materia -->

                                                      <dt>Clasificacion Materia (*):</dt>
                                                      <dd>
                                                         <p class="control has-icon has-icon-right">
                                                            <select name="id_clasificacion_materia" id="id_clasificacion_materia"
                                                                    v-model="hallazgo.id_clasificacion_materia"
                                                                    v-validate="'required'" data-vv-delay="500"
                                                                    :class="{'input': true, 'text-danger': errors.has('id_clasificacion_materia'), 'form-control':true}">
                                                               <option v-for="(cm,i) in clasificacion_materia" :value="cm.id_clasificacion_materia">
                                                                  {{ cm.clasificacion_materia }}
                                                               </option>
                                                            </select>

                                                            <transition name="bounce">
                                                               <i v-show="errors.has('id_clasificacion_materia')" class="fa fa-warning"></i>
                                                            </transition>

                                                            <transition name="bounce">
                                                            <span v-show="errors.has('id_clasificacion_materia')" class="text-danger">
                                                               {{ errors.first('id_clasificacion_materia') | replaceClasificacionMateria }}
                                                            </span>
                                                            </transition>
                                                         </p>
                                                      </dd>

                                                   </div><!-- .col-md-6 -->
                                                   <div class="col-md-6">

                                                      <!-- Field : materia_observacion -->

                                                      <dt>Materia de Observacion :</dt>
                                                      <dd>
                                                         <textarea name="materia_observacion" rows="3"
                                                                   v-model="hallazgo.materia_observacion"
                                                                   class="scroll_textarea_original">
                                                            @{{ hallazgo.materia_observacion }}
                                                         </textarea>
                                                      </dd>

                                                   </div><!-- .col-md-6 -->
                                                   <div class="col-md-6">

                                                      <!-- Field : recomendacion -->

                                                      <dt>Redacte recomendacion :</dt>
                                                      <dd>
                                                         <textarea name="recomendacion" rows="2"
                                                                   v-model="hallazgo.recomendacion"
                                                                   class="scroll_textarea_original">
                                                            @{{ hallazgo.recomendacion }}
                                                         </textarea>
                                                      </dd>

                                                   </div><!-- .col-md-6 -->
                                                </div><!-- styled -->
                                             </div><!-- .row -->
                                          </dl><!-- .dl-vertical styled margin:20 -->
                                       </div><!-- .tab-pane .fade .in .active #datosGenerales -->

                                       <div role="tabpanel" class="tab-pane fade" id="procedimientosDisciplinarios">

                                          <dl class="dl-vertical" style="margin: 20px;">
                                             <div class="row">
                                                <div style="overflow-y: scroll;max-height: 400px;">
                                                   <div class="col-md-12">

                                                      <!-- Field : procedimiento_disciplinario -->

                                                      <dt>Procedimiento Disciplinario (*):</dt>
                                                      <dd>
                                                         Instruye procedimiento disciplinario
                                                         <input id="procedimiento_disciplinario" type="checkbox" name="procedimiento_disciplinario"
                                                                  style="width: 20px;height: 20px;"
                                                                  @click="changeProcedimientoDisciplinario"
                                                                  :checked="hallazgo.proceso_disciplinario">
                                                      </dd>
                                                      <br />

                                                   </div><!-- .col-md-12 -->
                                                   <div class="col-md-6">

                                                      <!-- Validation if includes procedimiento disciplinario -->

                                                      <div v-show="(instruyeProcedimientoDisciplinario == true)">

                                                         <!-- Field : procedimiento_disciplinario -->

                                                         <dt>Tipo proceso Disciplinario (*):</dt>
                                                         <dd>
                                                            <p class="control has-icon has-icon-right">
                                                               <select name="id_tipo_proceso_disciplinario"
                                                                        v-model="hallazgo.id_tipo_proceso_disciplinario"
                                                                        v-validate="'required'" data-vv-delay="500"
                                                                        :class="{'input': true,
                                                                        'text-danger': errors.has('id_tipo_proceso_disciplinario'),
                                                                        'form-control':true}">
                                                                  <option v-for="(v,i) in tipo_proceso_disciplinario" :value="i">{{v}}</option>
                                                               </select>
                                                               <transition name="bounce">
                                                               <i v-show="errors.has('id_tipo_proceso_disciplinario')" class="fa fa-warning"></i>
                                                               </transition>
                                                               <transition name="bounce">
                                                               <span v-show="errors.has('id_tipo_proceso_disciplinario')" class="text-danger">
                                                                  {{ errors.first('id_tipo_proceso_disciplinario') | replaceTipoProcesoDisciplinario }}
                                                               </span>
                                                               </transition>
                                                            </p>
                                                         </dd>

                                                         <!-- Field : id_responsable_proceso_disciplinario -->

                                                         <dt>Responsable proceso Disciplinario (*):</dt>
                                                         <dd>

                                                            <p class="control has-icon has-icon-right">
                                                               <select name="id_responsable_proceso_disciplinario"
                                                                        v-model="hallazgo.id_responsable_proceso_disciplinario"
                                                                        v-validate="'required'" data-vv-delay="500"
                                                                        :class="{'input': true, 'text-danger': errors.has('id_responsable_proceso_disciplinario'), 'form-control':true}">
                                                                  <option v-for="(v,i) in responsable_proceso_disciplinario" :value="i">{{v}}</option>
                                                               </select>
                                                               <transition name="bounce">
                                                               <i v-show="errors.has('id_responsable_proceso_disciplinario')" class="fa fa-warning"></i>
                                                               </transition>
                                                               <transition name="bounce">
                                                               <span v-show="errors.has('id_responsable_proceso_disciplinario')" class="text-danger">
                                                                  {{ errors.first('id_responsable_proceso_disciplinario') | replaceResponsableProcesoDisciplinario }}
                                                               </span>
                                                               </transition>
                                                            </p>
                                                         </dd>

                                                         <!-- Field : button to add -->

                                                         <dt>Asignar procedimiento:</dt>
                                                         <dd>
                                                            <br />
                                                            <p class="control has-icon has-icon-right">
                                                               <button class="btn btn-md btn-success"
                                                               @click.prevent="guardar_nuevo_procedimiento_disciplinario">
                                                               Asignar
                                                               </button>
                                                            </p>
                                                         </dd>

                                                      </div><!-- validation v-show when includes proc. disc. -->

                                                   </div><!-- col-md-6 -->
                                                   <div class="col-md-6">

                                                      <!-- Validation if includes procedimiento disciplinario -->

                                                      <div v-show="instruyeProcedimientoDisciplinario == true">

                                                         <!-- Field : id_estado_proceso_disciplinario -->

                                                         <dt>Estado proceso Disciplinario (*):</dt>
                                                         <dd>

                                                            <p class="control has-icon has-icon-right">
                                                               <select name="id_estado_proceso_disciplinario"
                                                                        v-model="hallazgo.id_estado_proceso_disciplinario"
                                                                        v-validate="'required'" data-vv-delay="500"
                                                                        :class="{'input': true, 'text-danger': errors.has('id_estado_proceso_disciplinario'), 'form-control':true}">
                                                                  <option v-for="(v,i) in estado_proceso_disciplinario" :value="i">{{v}}</option>
                                                               </select>
                                                               <transition name="bounce">
                                                               <i v-show="errors.has('id_estado_proceso_disciplinario')" class="fa fa-warning"></i>
                                                               </transition>
                                                               <transition name="bounce">
                                                               <span v-show="errors.has('id_estado_proceso_disciplinario')" class="text-danger">
                                                                  {{ errors.first('id_estado_proceso_disciplinario') | replaceEstadoProcesoDisciplinario }}
                                                               </span>
                                                               </transition>
                                                            </p>
                                                         </dd>

                                                         <!-- Field : id_estado_proceso_disciplinario -->

                                                         <dt>Observacion Procedimiento (*):</dt>
                                                         <dd>
                                                            <p class="control has-icon has-icon-right">
                                                               <textarea name="observaciones" rows="2"
                                                                      v-model="hallazgo.observaciones"
                                                                      :class="{'input': true, 'text-danger': errors.has('observaciones'),
                                                                      'scroll_textarea_original':true}"
                                                                      v-validate="'required'" data-vv-delay="500">
                                                                  @{{ hallazgo.observaciones}}
                                                               </textarea>
                                                               <transition name="bounce">
                                                               <i v-show="errors.has('observaciones')" class="fa fa-warning"></i>
                                                               </transition>
                                                               <transition name="bounce">
                                                               <span v-show="errors.has('observaciones')" class="text-danger">
                                                                  {{ errors.first('observaciones') }}
                                                               </span>
                                                               </transition>
                                                            </p>
                                                         </dd>
                                                      </div><!-- validation v-show when includes proc. disc. -->
                                                   </div><!-- .col-md-6 -->
                                                   <div class="col-md-12">

                                                      <!-- Validation if includes procedimiento disciplinario -->

                                                      <div v-show="instruyeProcedimientoDisciplinario == true">

                                                         <!-- ################################################################## -->
                                                         <!-- Tabla con asignaciones/historicos de procedimientos disciplinarios -->
                                                         <!-- ################################################################## -->


                                                         <dl class="dl-vertical" style="margin: 20px;">
                                                            <div class="row">

                                                               <div id="" class="panel with-nav-tabs panel-primary">
                                                                  <div class="panel-heading" style="border-bottom:0px;">
                                                                     <!-- Nav tabs -->
                                                                     <ul class="nav nav-tabs" role="tablist">
                                                                        <li role="presentation" class="active">
                                                                           <a href="#procedimientosAsignados" aria-controls="gestionResponsable"
                                                                              role="tab" data-toggle="tab">

                                                                              Procedimientos disciplinarios asignados
                                                                           </a>
                                                                        </li>

                                                                        <li role="presentation">
                                                                           <a href="#historicoProcedimientos" aria-controls="nuevoUsuario"
                                                                              role="tab" data-toggle="tab">

                                                                              Historico de procedimientos
                                                                           </a>
                                                                        </li>
                                                                     </ul><!-- .nav .nav-tabs -->
                                                                  </div><!-- .panel-heading -->

                                                                  <div class="panel-body">
                                                                     <!-- Tab panes -->
                                                                     <div class="tab-content">

                                                                        <!-- Procedimientos Asignados -->

                                                                        <div role="tabpanel" class="tab-pane fade in active" id="procedimientosAsignados">
                                                                           <div class="table-responsive">
                                                                              <table class="table custom-table table-striped text-center">
                                                                                 <thead>
                                                                                    <th>Accion</th>
                                                                                    <th>Id</th>
                                                                                    <th>Tipo</th>
                                                                                    <th>Estado</th>
                                                                                    <th>Responsable</th>
                                                                                    <th>Observaciones</th>
                                                                                 </thead>
                                                                                 <tbody>
                                                                                    <tr v-for="hpd in hallazgo_procedimientos_disciplinarios"
                                                                                       v-if="hpd.id_hallazgo_contraloria == hallazgo.id_hallazgo_contraloria">
                                                                                       <td>
                                                                                       <button
                                                                                          v-if="hpd.id_hallazgo_contraloria_procedimiento_disciplinario!=form_hpd"
                                                                                          type="button"
                                                                                          class="btn btn-primary btn-xs"
                                                                                          :value="hpd.id_hallazgo_contraloria_procedimiento_disciplinario"
                                                                                          @click.prevent="
                                                                                          cambiar_form_hpd(hpd.id_hallazgo_contraloria_procedimiento_disciplinario)"
                                                                                          data-toggle="tooltip" data-placement="left" title="Modificar">
                                                                                          <i class="fa fa-pencil"></i>
                                                                                       </button>
                                                                                       <button v-else type="button" class="btn btn-success btn-xs"
                                                                                          :value="hpd.id_hallazgo_contraloria_procedimiento_disciplinario"
                                                                                          @click.prevent="
                                                                                          guardar_form_hpd(hpd.id_hallazgo_contraloria_procedimiento_disciplinario,0)"
                                                                                          data-toggle="tooltip" data-placement="left" title="Guardar">
                                                                                          <i class="fa fa-check" aria-hidden="true"></i>
                                                                                       </button>
                                                                                       </td>

                                                                                       <!-- Id hallazgo contraloria procedimiento disciplinario -->
                                                                                       <td>
                                                                                          {{hpd.id_hallazgo_contraloria_procedimiento_disciplinario}}
                                                                                       </td>

                                                                                       <!-- Tipo proceso disciplinario -->
                                                                                       <td v-if="hpd.id_hallazgo_contraloria_procedimiento_disciplinario!=form_hpd">
                                                                                          {{tipo_proceso_disciplinario[
                                                                                             hpd.id_tipo_proceso_disciplinario
                                                                                          ]}}
                                                                                       </td>
                                                                                       <td v-else>
                                                                                       <p class="control has-icon has-icon-right">
                                                                                          <select name="id_tipo_proceso_disciplinario"
                                                                                                   v-model="hpd.id_tipo_proceso_disciplinario"
                                                                                                   v-validate="'required'" data-vv-delay="500"
                                                                                                   :class="{'input': true,
                                                                                                   'text-danger': errors.has('id_tipo_proceso_disciplinario'),
                                                                                                   'form-control':true}">
                                                                                             <option v-for="(v,i) in tipo_proceso_disciplinario"
                                                                                                :value="i">
                                                                                                {{v}}
                                                                                             </option>
                                                                                          </select>
                                                                                          <transition name="bounce">
                                                                                          <i v-show="errors.has('id_tipo_proceso_disciplinario')"
                                                                                             class="fa fa-warning"></i>
                                                                                          </transition>
                                                                                          <transition name="bounce">
                                                                                          <span v-show="errors.has('id_tipo_proceso_disciplinario')"
                                                                                             class="text-danger">
                                                                                             {{ errors.first('id_tipo_proceso_disciplinario')
                                                                                                | replaceTipoProcesoDisciplinario }}
                                                                                          </span>
                                                                                          </transition>
                                                                                       </p>
                                                                                       </td>

                                                                                       <!-- Estado proceso disciplinario -->
                                                                                       <td v-if="hpd.id_hallazgo_contraloria_procedimiento_disciplinario!=form_hpd">
                                                                                          {{estado_proceso_disciplinario[
                                                                                             hpd.id_estado_proceso_disciplinario
                                                                                          ]}}
                                                                                       </td>
                                                                                       <td v-else>
                                                                                       <p class="control has-icon has-icon-right">
                                                                                          <select name="id_estado_proceso_disciplinario"
                                                                                                   v-model="hpd.id_estado_proceso_disciplinario"
                                                                                                   v-validate="'required'" data-vv-delay="500"
                                                                                                   :class="{'input': true,
                                                                                                   'text-danger': errors.has('id_estado_proceso_disciplinario'),
                                                                                                   'form-control':true}">
                                                                                             <option v-for="(v,i) in estado_proceso_disciplinario"
                                                                                                :value="i">
                                                                                                {{v}}
                                                                                             </option>
                                                                                          </select>
                                                                                          <transition name="bounce">
                                                                                          <i v-show="errors.has('id_estado_proceso_disciplinario')"
                                                                                             class="fa fa-warning"></i>
                                                                                          </transition>
                                                                                          <transition name="bounce">
                                                                                          <span v-show="errors.has('id_estado_proceso_disciplinario')"
                                                                                             class="text-danger">
                                                                                             {{ errors.first('id_estado_proceso_disciplinario')
                                                                                                | replaceEstadoProcesoDisciplinario }}
                                                                                          </span>
                                                                                          </transition>
                                                                                       </p>
                                                                                       </td>

                                                                                       <!-- Estado proceso disciplinario -->
                                                                                       <td v-if="hpd.id_hallazgo_contraloria_procedimiento_disciplinario!=form_hpd">
                                                                                          {{responsable_proceso_disciplinario[
                                                                                             hpd.id_responsable_proceso_disciplinario
                                                                                          ]}}
                                                                                       </td>
                                                                                       <td v-else>
                                                                                       <p class="control has-icon has-icon-right">
                                                                                          <select name="id_responsable_proceso_disciplinario"
                                                                                                   v-model="hpd.id_responsable_proceso_disciplinario"
                                                                                                   v-validate="'required'" data-vv-delay="500"
                                                                                                   :class="{'input': true,
                                                                                                   'text-danger': errors.has('id_responsable_proceso_disciplinario'),
                                                                                                   'form-control':true}">
                                                                                             <option v-for="(v,i) in responsable_proceso_disciplinario"
                                                                                                :value="i">
                                                                                                {{v}}
                                                                                             </option>
                                                                                          </select>
                                                                                          <transition name="bounce">
                                                                                          <i v-show="errors.has('id_responsable_proceso_disciplinario')"
                                                                                             class="fa fa-warning"></i>
                                                                                          </transition>
                                                                                          <transition name="bounce">
                                                                                          <span v-show="errors.has('id_responsable_proceso_disciplinario')"
                                                                                             class="text-danger">
                                                                                             {{ errors.first('id_responsable_proceso_disciplinario')
                                                                                                | replaceResponsableProcesoDisciplinario }}
                                                                                          </span>
                                                                                          </transition>
                                                                                       </p>
                                                                                       </td>

                                                                                       <!-- Observaciones -->
                                                                                       <td v-if="hpd.id_hallazgo_contraloria_procedimiento_disciplinario!=form_hpd">
                                                                                          {{hpd.observaciones}}
                                                                                       </td>
                                                                                       <td v-else>
                                                                                       <p class="control has-icon has-icon-right">
                                                                                          <textarea name="observaciones" rows="2"
                                                                                                 v-model="hpd.observaciones"
                                                                                                 :class="{'input': true, 'text-danger': errors.has('observaciones'),
                                                                                                 'scroll_textarea_original':true}"
                                                                                                 v-validate="'required'" data-vv-delay="500">
                                                                                             @{{ hpd.observaciones}}
                                                                                          </textarea>
                                                                                          <transition name="bounce">
                                                                                          <i v-show="errors.has('observaciones')" class="fa fa-warning"></i>
                                                                                          </transition>
                                                                                          <transition name="bounce">
                                                                                          <span v-show="errors.has('observaciones')" class="text-danger">
                                                                                             {{ errors.first('observaciones') }}
                                                                                          </span>
                                                                                          </transition>
                                                                                       </p>
                                                                                       </td>

                                                                                    </tr>
                                                                                 </tbody>
                                                                              </table>
                                                                           </div><!-- table-responsive styled -->

                                                                        </div><!-- .tab-pane .fade #procedimientosAsignados -->

                                                                        <!-- Historico de Seguimientos -->
                                                                        <div role="tabpanel" class="tab-pane fade" id="historicoProcedimientos">

                                                                           <div class="table-responsive">
                                                                              <table class="table custom-table table-striped text-center">
                                                                                 <thead>
                                                                                    <th>Id historico</th>
                                                                                    <th>Tipo</th>
                                                                                    <th>Estado</th>
                                                                                    <th>Responsable</th>
                                                                                    <th>Observaciones</th>
                                                                                 </thead>
                                                                                 <tbody>
                                                                                    <tr v-for="hhpd in hallazgo_historico_procedimientos_disciplinarios"
                                                                                       v-if="hhpd.id_hallazgo_contraloria ==
                                                                                       hallazgo.id_hallazgo_contraloria">

                                                                                       <td>
                                                                                          {{hhpd.id_hallazgo_historico_procedimiento_disciplinario}}
                                                                                       </td>
                                                                                       <td>
                                                                                          {{tipo_proceso_disciplinario[
                                                                                             hhpd.id_tipo_proceso_disciplinario
                                                                                          ]}}
                                                                                       </td>
                                                                                       <td>
                                                                                          {{estado_proceso_disciplinario[
                                                                                             hhpd.id_estado_proceso_disciplinario
                                                                                          ]}}
                                                                                       </td>
                                                                                       <td>
                                                                                          {{responsable_proceso_disciplinario[
                                                                                             hhpd.id_responsable_proceso_disciplinario
                                                                                          ]}}
                                                                                       </td>
                                                                                       <td>
                                                                                          {{hhpd.observaciones}}
                                                                                       </td>
                                                                                    </tr>
                                                                                 </tbody>
                                                                              </table>
                                                                           </div><!-- table-responsive styled -->

                                                                        </div><!-- .tab-pane .fade #historicoProcedimientos -->

                                                                     </div><!-- .tab-content -->
                                                                  </div><!-- .panel-body -->

                                                               </div><!-- .panel .with-nav-tabs panel-primary -->

                                                            </div><!-- .row -->
                                                         </dl><!-- .dl-vertical styled margin:20 -->


                                                         <!-- ###################################################################### -->
                                                         <!-- Fin tabla con asignaciones/historicos de procedimientos disciplinarios -->
                                                         <!-- ###################################################################### -->

                                                      </div><!-- validation v-show when includes proc. disc. -->
                                                   </div><!-- .col-md-12 -->

                                                </div><!-- styled -->
                                             </div><!-- .row -->

                                          </dl>

                                       </div>
                                    </div>

                                 </div><!-- .panel-body -->
                              </div><!-- panel -->

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
         name: 'modal-editarhallazgo',
         data () {
            return {
               'instruyeProcedimientoDisciplinario':false,
               'permite_guardar_nuevo_procedimiento_disciplinario':true,
               'form_hpd':0,
               'permiteGuardarHpd':true,
            }
         },
         ready () {
            if (this.hallazgo.proceso_disciplinario == true) {
               this.instruyeProcedimientoDisciplinario = true;
            }
         },
         created () {
            if (this.hallazgo.proceso_disciplinario == true) {
               this.instruyeProcedimientoDisciplinario = true;
            }
         },
         filters: {
            replaceNombreHallazgoContraloria(nombre_hallazgo_contraloria) {
               if (nombre_hallazgo_contraloria != null) {nombre_hallazgo_contraloria =
                  nombre_hallazgo_contraloria.replace('nombre_hallazgo_contraloria', 'para el nombre del hallazgo');}
               return nombre_hallazgo_contraloria;
            },
            replaceMateriaObservacion(materia_observacion) {
               if (materia_observacion != null) {materia_observacion =
                  materia_observacion.replace('materia_observacion', 'materia observacion');}
               return materia_observacion;
            },
            replaceProcedimientoDisciplinario: function (procedimiento_disciplinario) {
               if (procedimiento_disciplinario != null) {procedimiento_disciplinario =
                  procedimiento_disciplinario.replace('procedimiento_disciplinario', 'procedimiento disciplinario');}
               return procedimiento_disciplinario;
            },
            replaceTipoProcesoDisciplinario: function (id_tipo_proceso_disciplinario) {
               if (id_tipo_proceso_disciplinario != null) {id_tipo_proceso_disciplinario =
                  id_tipo_proceso_disciplinario.replace('id_tipo_proceso_disciplinario', 'tipo proceso disciplinario');}
               return id_tipo_proceso_disciplinario;
            },
            replaceEstadoProcesoDisciplinario: function (id_estado_proceso_disciplinario) {
               if (id_estado_proceso_disciplinario != null) {id_estado_proceso_disciplinario =
                  id_estado_proceso_disciplinario.replace('id_estado_proceso_disciplinario', 'estado proceso disciplinario');}
               return id_estado_proceso_disciplinario;
            },
            replaceResponsableProcesoDisciplinario: function (id_responsable_proceso_disciplinario) {
               if (id_responsable_proceso_disciplinario != null) {id_responsable_proceso_disciplinario =
                  id_responsable_proceso_disciplinario.replace('id_responsable_proceso_disciplinario', 'responsable proceso disciplinario');}
               return id_responsable_proceso_disciplinario;
            },
            replaceClasificacionMateria: function (id_clasificacion_materia) {
               if (id_clasificacion_materia != null) {id_clasificacion_materia =
                  id_clasificacion_materia.replace('id_clasificacion_materia', 'clasificacion materia');}
               return id_clasificacion_materia;
            },
         },
         methods: {
            cambiar_form_hpd: function(id_hallazgo_contraloria_procedimiento_disciplinario){
               //this.form_hallazgo_editable = (this.form_hallazgo_editable == false ? true : false);
               return this.form_hpd = id_hallazgo_contraloria_procedimiento_disciplinario;
            },
            changeProcedimientoDisciplinario: function () {
               this.instruyeProcedimientoDisciplinario = (this.instruyeProcedimientoDisciplinario==false)?true:false;
               this.hallazgo.procedimiento_disciplinario = this.hallazgo.proceso_disciplinario = this.instruyeProcedimientoDisciplinario;
               return this.hallazgo.procedimiento_disciplinario = this.hallazgo.procedimiento_disciplinario==false?true:false;
            },
            findHallazgoProcedimientoDisciplinarioById: function (items, id) {
               //hpd.id_hallazgo_contraloria_procedimiento_disciplinario
               for (var i in items) {
                  if (items[i].id_hallazgo_contraloria_procedimiento_disciplinario==id) {
                     return items[i];
                  }
               }
               return null;
            },
            guardar_form_hpd: function(id_hallazgo_contraloria_procedimiento_disciplinario,index){
               //return this.form_hpd = 0;
               if(this.form_hpd != 0 && id_hallazgo_contraloria_procedimiento_disciplinario != 0){
                  this.$validator.validateAll().then(result => {});
                  if (this.permiteGuardarHpd == true){
                     this.permiteGuardarHpd = false;
                     var hpd =
                        this.findHallazgoProcedimientoDisciplinarioById(
                           this.hallazgo_procedimientos_disciplinarios,
                           id_hallazgo_contraloria_procedimiento_disciplinario
                        );

                     if (hpd.id_tipo_proceso_disciplinario != '' &&
                        hpd.id_estado_proceso_disciplinario != '' &&
                        hpd.id_responsable_proceso_disciplinario != '' &&
                        hpd.observaciones != '' ){

                        //Lo guarda, verifica si los datos del objeto que son necesarios son iguales, sino que no lo guarde
                        Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                        this.$http.put('/hallazgo_contraloria/update/procedimiento_disciplinario', hpd).then(response => {
                           //console.log(response.body);
                           this.form_hpd = 0;
                           //this.showModalEditarHallazgo = false;
                           //this.permiteGuardarHallazgo = true;
                           var self = this;
                           setTimeout(() => {
                              self.$parent.fetchHallazgos();
                              self.permiteGuardarHpd = true;
                           }, 500);

                        }, response => {
                           // error callback
                        });


                     }else{
                        this.permiteGuardarHpd = true;
                     }
                  }else{
                     alert('Se esta procesando la solicitud');
                  }
               }

               /*else if (this.form_hallazgo_editable != 0 && id_hallazgo_contraloria != 0 && index == 0) {
                  Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                  this.hallazgo = gcf.findHallazgoById(this.hallazgos, id_hallazgo_contraloria);
                  this.$http.put('/hallazgo_contraloria/'+id_hallazgo_contraloria, this.hallazgo).then(response => {
                     //console.log(response.body);
                     this.form_hallazgo_editable = 0;
                     var self = this;
                     setTimeout(() => {
                        self.fetchHallazgos();
                     }, 1000);

                  }, response => {
                     // error callback
                  });

               }*/
            },
            guardar_nuevo_procedimiento_disciplinario: function () {
               this.$validator.validateAll().then(result => {});
               if (this.permite_guardar_nuevo_procedimiento_disciplinario == true){
                  this.permite_guardar_nuevo_procedimiento_disciplinario = false;
                  if (
                     this.hallazgo.proceso_disciplinario == true &&
                     this.hallazgo.id_tipo_proceso_disciplinario != '' &&
                     this.hallazgo.id_estado_proceso_disciplinario != '' &&
                     this.hallazgo.id_responsable_proceso_disciplinario != '' &&
                     this.hallazgo.id_hallazgo_contraloria != '' &&
                     this.hallazgo.id_contraloria != '' &&
                     this.hallazgo.observaciones != '' && this.hallazgo.observaciones != null
                  ) {

                     if (this.hallazgo.proceso_disciplinario == false) {
                        this.hallazgo.procedimiento_disciplinario = 'No';
                        this.hallazgo.id_tipo_proceso_disciplinario = 0;
                        this.hallazgo.id_estado_proceso_disciplinario = 0;
                        this.hallazgo.id_responsable_proceso_disciplinario = 0;
                     }else{
                        this.hallazgo.procedimiento_disciplinario = 'Si';
                     }

                     //console.log(this.nuevo_hallazgo);
                     Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                     this.$http.post('/hallazgo_contraloria/store/procedimiento_disciplinario', this.hallazgo).then(response => {

                        this.permite_guardar_nuevo_procedimiento_disciplinario = true;
                        this.hallazgo_procedimientos_disciplinarios.push(response.body);
                        this.hallazgo_historico_procedimientos_disciplinarios.push(response.body);
                        var self = this;
                        setTimeout(function() {
                           //self.$parent.$options.methods.fetchHallazgos();
                           //Cuando guarda hallazgo sin asociar procedimiento disciplinario
                           self.$parent.fetchHallazgos();
                           self.hallazgo.procedimiento_disciplinario = true;
                           self.hallazgo.id_tipo_proceso_disciplinario = '';
                           self.hallazgo.id_estado_proceso_disciplinario = '';
                           self.hallazgo.id_responsable_proceso_disciplinario = '';
                           self.hallazgo.observaciones = '';

                        }, 500);

                     }, response => {});
                  }else{
                     this.permite_guardar_nuevo_procedimiento_disciplinario = true;
                  }
               }else{
                  //alert('Se esta procesando la solicitud');
               }
            },
         },
         watch: {
         },
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
   filters: {
   },
   methods: {
      //camelCase() => for specific functions
      agregarFiltroEstadoGrid: function(estado){
         if(!this.filtroEstado){
            this.filtroEstado = true;
            this.hallazgosFiltroEstado = this.hallazgos;
         }else{
            this.hallazgos = this.hallazgosFiltroEstado;
         }
         //Itero la lista de hallazgos y filtro segun estado seleccionado
         this.hallazgos = _.filter(this.hallazgos, function (h) {
            return h.estado == estado;
         });
         if(this.hallazgos.length == 0){
            this.hallazgos = this.hallazgosFiltroEstado;
            alert('Sin resultados para "'+estado+'"');
            this.limpiarFiltros();
         }
      },
      agregarFiltroCriticidadGrid: function(criticidad){
         if(!this.filtroCriticidad){
            this.filtroCriticidad = true;
            this.hallazgosFiltroCriticidad = this.hallazgos;
         }else{
            this.hallazgos = this.hallazgosFiltroCriticidad;
         }

         //Itero la lista de hallazgos y filtro segun la criticidad seleccionada
         this.hallazgos = _.filter(this.hallazgos, function (h) {
            return h.criticidad == criticidad || h.criticidad == 'Criticidad '+criticidad;
         });
         if(this.hallazgos.length == 0){
            this.hallazgos = this.hallazgosFiltroCriticidad;
            alert('Sin resultados para "'+criticidad+'"');
            this.limpiarFiltros();
         }
      },
      agregarFiltroIdHallazgoGrid: function(){
         if(!this.filtroIdHallazgo){
            this.filtroIdHallazgo = true;
            this.hallazgosFiltroIdHallazgo = this.hallazgos;
         }else{
            this.hallazgos = this.hallazgosFiltroIdHallazgo;
         }

         var self = this;
         //Itero la lista de hallazgos y filtro segun el id hallazgo ingresado
         this.hallazgos = _.filter(this.hallazgos, function (h) {
            return h.id_hallazgo_contraloria == self.filterIdHallazgo;
         });
         /*
         if(this.hallazgos.length == 0){
            this.hallazgos = this.hallazgosFiltroIdHallazgo;
            if(this.filterIdHallazgo == '') return;
            else alert('Sin resultados para el id ingresado');
         }
         */
      },
      calcularDiferenciaTiempo: function (plazo_comprometido){
         plazo_comprometido = plazo_comprometido.split('-');
         var today = new Date();
         var dd = today.getDate();
         var mm = today.getMonth()+1; //January is 0!
         var yyyy = today.getFullYear();

         var date1 = new Date(plazo_comprometido[1]+'/'+plazo_comprometido[0]+'/'+plazo_comprometido[2]);
         var date2 = new Date(mm+'/'+dd+'/'+yyyy);
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
         hallazgo.compromiso_contraloria.map( function (c,i) { //c:compromiso, i:index
            if (c.porcentaje_avance > 0 && c.porcentaje_avance < 99 && c.estado != 'Informe de seguimiento emitido') {
               cantidad_compromisos_1_y_99 += 1;
               promedio_avance_compromisos_1_y_99 += c.porcentaje_avance;
            }else if(c.porcentaje_avance == 100 && c.estado == 'Informe de seguimiento emitido'){
               cantidad_compromisos_finalizados_100 += 1;
            }
            cantidad_total += 1;
         });
         if (cantidad_compromisos_1_y_99 > 0) {
            estado_return = 'Abierto';
         }else if(cantidad_compromisos_finalizados_100 > 0 && cantidad_compromisos_finalizados_100 <= cantidad_total){
            estado_return = 'Informe de seguimiento emitido';
         }else if( (promedio_avance_compromisos_1_y_99 / cantidad_compromisos_1_y_99) > 0 ){
            estado_return = 'Abierto';
         }else{
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

         hallazgo.compromiso_contraloria.map( function (c,i) { //c:compromiso, i:index
            if (c.porcentaje_avance > 0 && c.porcentaje_avance < 99 && c.estado != 'Informe de seguimiento emitido') {
               cantidad_compromisos_1_y_99 += 1;
               promedio_avance_compromisos_1_y_99 += c.porcentaje_avance;
            }else if(c.porcentaje_avance == 100 && c.estado == 'Informe de seguimiento emitido'){
               cantidad_compromisos_finalizados_100 += 1;
            }
            cantidad_total += 1;
         });

         if (cantidad_compromisos_1_y_99 > 0) {
            promedio_return = (promedio_avance_compromisos_1_y_99 / cantidad_compromisos_1_y_99) || 0;
         }else if(cantidad_compromisos_finalizados_100 > 0 && cantidad_compromisos_finalizados_100 <= cantidad_total){
            promedio_return = 100;
         }else if( (promedio_avance_compromisos_1_y_99 / cantidad_compromisos_1_y_99) > 0 ){
            promedio_return = (promedio_avance_compromisos_1_y_99 / cantidad_compromisos_1_y_99) || 0;
         }else{
            promedio_return = 0;
         }
         return promedio_return;
      },
      // change order variable direction
      changeListOrder: function (column) {
         this.gridOrder == 'asc' ? this.gridOrder = 'desc' : this.gridOrder = 'asc';
         this.orderLists(column);
      },
      crear_nuevo_compromiso: function (id_hallazgo_contraloria){
         this.form_compromiso_creable = id_hallazgo_contraloria;
         this.nuevo_compromiso.id_hallazgo_contraloria = id_hallazgo_contraloria;
         this.showModalNuevoCompromiso = true;
         this.permiteGuardarNuevoCompromiso = true;
         return this.nuevo_compromiso;
      },
      fetchHallazgos: function (){
         this._gcf = gcf;
         let id_contraloria = $('#id_contraloria').val();
         this.$http.get('/contraloria/'+id_contraloria+'/edit/ajax').then(response => { // success callback
            //Separo los datos aunque el request me retorne la relacion del proceso auditado + hallazgos, solo es para separar
            this.contraloria = response.body.contraloria;
            this.area_contraloria = response.body.area_contraloria;
            this.estado_contraloria = response.body.estado_contraloria;
            this.hallazgos = response.body.hallazgos;
            this.hallazgosTmp = response.body.hallazgos;
            this.compromisos = response.body.compromisos;
            this.compromisosTmp = response.body.compromisos;
            this.compromisos_responsables = response.body.compromisos_responsables;
            this.compromisos_responsablesTmp = response.body.compromisos_responsables;
            this.hallazgos_responsables = response.body.hallazgos_responsables;
            this.hallazgos_responsablesTmp = response.body.hallazgos_responsables;
            this.seguimientos = response.body.seguimientos;
            this.seguimientosTmp = response.body.seguimientos;
            this.archivos = response.body.archivos;
            this.archivosTmp = response.body.archivos;
            this.usuarios = response.body.usuarios;
            this.config = response.body.config;
            this.auth = response.body.auth;
            this.role = response.body.role;
            this.auditor = response.body.auditor;
            this.tipo_proceso_disciplinario = response.body.tipo_proceso_disciplinario;
            this.estado_proceso_disciplinario = response.body.estado_proceso_disciplinario;
            this.responsable_proceso_disciplinario = response.body.responsable_proceso_disciplinario;
            this.criticidad = response.body.criticidad;
            this.clasificacion_materia = response.body.clasificacion_materia;
            this.nuevo_hallazgo.id_contraloria = this.contraloria.id_contraloria;
            this.historico_hallazgos = response.body.historico_hallazgos;
            this.historico_hallazgosTmp = response.body.historico_hallazgos;
            this.hallazgo_historico_procedimientos_disciplinarios = response.body.hallazgo_historico_procedimientos_disciplinarios;
            this.hallazgo_procedimientos_disciplinarios = response.body.hallazgo_procedimientos_disciplinarios;

            this.preloadHallazgos();

            //Manda el controller que llama al metodo
            gcf.refetchControllersData({
               'contraloria':this.contraloria,
               'area_contraloria':this.area_contraloria,
               'estado_contraloria':this.estado_contraloria,
               'hallazgos':this.hallazgos,
               'hallazgosTmp':this.hallazgosTmp,
               'compromisos':this.compromisos,
               'compromisosTmp':this.compromisosTmp,
               'compromisos_responsables':this.compromisos_responsables,
               'compromisos_responsablesTmp':this.compromisos_responsablesTmp,
               'hallazgos_responsables':this.hallazgos_responsables,
               'hallazgos_responsablesTmp':this.hallazgos_responsablesTmp,
               'seguimientos':this.seguimientos,
               'seguimientosTmp':this.seguimientosTmp,
               'archivos':this.archivos,
               'archivosTmp':this.archivosTmp,
               'usuarios':this.usuarios,
               'config':this.config,
               'auth':this.auth,
               'role':this.role,
               'auditor':this.auditor,
               'tipo_proceso_disciplinario':this.tipo_proceso_disciplinario,
               'estado_proceso_disciplinario':this.estado_proceso_disciplinario,
               'responsable_proceso_disciplinario':this.responsable_proceso_disciplinario,
               'criticidad':this.criticidad,
               'clasificacion_materia':this.clasificacion_materia,
               'historico_hallazgos':this.historico_hallazgos,
               'historico_hallazgosTmp':this.historico_hallazgosTmp,
               'hallazgo_historico_procedimientos_disciplinarios':this.hallazgo_historico_procedimientos_disciplinarios,
               'hallazgo_procedimientos_disciplinarios':this.hallazgo_procedimientos_disciplinarios,
            },{
               'CompromisoController':'CompromisoController',
               'SeguimientoController':'SeguimientoController',
               'ArchivoController':'ArchivoController',
               'ResponsableController':'ResponsableController',
               'ProcedimientosDisciplinariosController':'ProcedimientosDisciplinariosController',
            }, 'HallazgoController');

            this.ctd_req_hallazgos = this.contraloria.cantidad_hallazgo_contraloria; // : cantidad de hallazgos especificados al inicio para el contraloria
            this.ctd_hallazgos = this.hallazgos.length; // : cantidad actual de hallazgos referenciados al contraloria
            this.ctd_compromisos = this.compromisos.length;//this.ctd_compromisos = 0;
            this.ctd_seguimientos = this.seguimientos.length;

            ProcedimientosDisciplinariosController.ctd_req_hallazgos = CompromisoController.ctd_req_hallazgos = SeguimientoController.ctd_req_hallazgos = ArchivoController.ctd_req_hallazgos = ResponsableController.ctd_req_hallazgos = this.ctd_req_hallazgos;
            ProcedimientosDisciplinariosController.ctd_hallazgos = CompromisoController.ctd_hallazgos = SeguimientoController.ctd_hallazgos = ArchivoController.ctd_hallazgos = ResponsableController.ctd_hallazgos = this.ctd_hallazgos;
            ProcedimientosDisciplinariosController.ctd_compromisos = CompromisoController.ctd_compromisos = SeguimientoController.ctd_compromisos = ArchivoController.ctd_compromisos = ResponsableController.ctd_compromisos = this.ctd_compromisos;
            ProcedimientosDisciplinariosController.ctd_seguimientos = CompromisoController.ctd_seguimientos = SeguimientoController.ctd_seguimientos = ArchivoController.ctd_seguimientos = ResponsableController.ctd_seguimientos = this.ctd_seguimientos;


            ProcedimientosDisciplinariosController._gcf = CompromisoController._gcf = SeguimientoController._gcf = ArchivoController._gcf = ResponsableController._gcf = this._gcf;


         }, response => { // error callback
            console.log('Error fetch_hallazgos_contraloria: '+response);
         });
      },
      filterGridHallazgoByCombo: function (id_hallazgo) {
         this.filterIdHallazgo = id_hallazgo || null;
         if (this.filterIdHallazgo != null) {
            return this.agregarFiltroIdHallazgoGrid();
         }else{
            this.limpiarFiltros();
            //alert('Debe seleccionar un hallazgo');
         } return;
      },
      limpiarFiltros: function () {
         this.hallazgosFiltroCriticidad = this.hallazgos;
         this.hallazgosFiltroEstado = this.hallazgos;
         this.filtroCriticidad = false;
         this.filtroEstado = false;
         this.mensajeResultadoConFiltros = false;
      },
      limpiarNuevoHallazgo: function () {
         this.nuevo_hallazgo = {};
         return this.nuevo_hallazgo = {
            'id_contraloria':this.contraloria.id_contraloria,
            'nombre_hallazgo_contraloria':'',
            'recomendacion':'',
            'observaciones':null,
            'criticidad':'',
            'cantidad_hallazgo':0,
            'materia_observacion':'',
            'procedimiento_disciplinario':false,
            'id_tipo_proceso_disciplinario':'',
            'id_estado_proceso_disciplinario':'',
            'id_responsable_proceso_disciplinario':'',
            'id_clasificacion_materia':'',
         }
      },
      limpiarNuevoCompromiso: function () {
         this.nuevo_compromiso = {};
         return this.nuevo_compromiso = {
            'id_hallazgo_contraloria' : '',
            'nomenclatura' : '',
            'plazo_estimado' : '',
            'plazo_comprometido' : '',
            'nombre_compromiso_contraloria' : '',
            'responsable' : '',
            'email_responsable' : '',
            'fono_responsable' : '',
         }
      },
      navigate: function (paso){
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
      hideFieldGridHallazgo: function (fieldName) {
         for (let f in this.excel_selection_hallazgos) {
            if (this.excel_selection_hallazgos[f].field == fieldName) {
               return this.excel_selection_hallazgos[f].isVisible = !this.excel_selection_hallazgos[f].isVisible;
            }
         }
      },
      restoreFieldGridHallazgo: function (fieldName) {
         for (let f in this.excel_selection_hallazgos) {
            if (this.excel_selection_hallazgos[f].field == fieldName) {
               return this.excel_selection_hallazgos[f].isVisible = !this.excel_selection_hallazgos[f].isVisible;
            }
         }
      },
      preloadHallazgos: function () {

         //Para hallazgos y compromisos
         for (let c in this.compromisos) {
            this.compromisos[c].plazo_comprometido_dias = this.calcularDiferenciaTiempo(this.compromisos[c].plazo_comprometido) || 0;
         }

         //Para Seguimientos
         for (let s in this.seguimientos) {
            this.seguimientos[s].id_hallazgo_contraloria =
               gcf.findCompromisoById(this.compromisos,this.seguimientos[s].id_compromiso_contraloria).id_hallazgo_contraloria;
            this.seguimientos[s].nombre_hallazgo_contraloria =
               gcf.findHallazgoById(this.hallazgos, this.seguimientos[s].id_hallazgo_contraloria).nombre_hallazgo_contraloria;
            this.seguimientos[s].nombre_compromiso_contraloria =
               gcf.findCompromisoById(this.compromisos,this.seguimientos[s].id_compromiso_contraloria).nombre_compromiso_contraloria;
            this.seguimientos[s].usuario_registra =
               gcf.findById(this.usuarios,this.seguimientos[s].usuario_registra);
            this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra ?
               this.seguimientos[s].usuario_registra.name : 'Sistema';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';
         }

         //Para Archivos
         for (let a in this.archivos) {
            this.archivos[a].id_hallazgo_contraloria =
               gcf.findCompromisoById(this.compromisos,this.archivos[a].id_compromiso_contraloria).id_hallazgo_contraloria;
            this.archivos[a].nombre_hallazgo_contraloria =
               gcf.findHallazgoById(this.hallazgos, this.archivos[a].id_hallazgo_contraloria).nombre_hallazgo_contraloria;
            this.archivos[a].nombre_compromiso_contraloria =
               gcf.findCompromisoById(this.compromisos,this.archivos[a].id_compromiso_contraloria).nombre_compromiso_contraloria;
            this.archivos[a].usuario_registra =
               gcf.findById(this.usuarios,this.archivos[a].usuario_registra);
            this.archivos[a].usuario_registra = this.archivos[a].usuario_registra ? this.archivos[a].usuario_registra.name : 'Sistema';
            this.archivos[a].observacion = this.archivos[a].observacion || 'Sin Observacion';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';
         }

         //Para Responsables
         for (let r in this.compromisos_responsables) {
            this.compromisos_responsables[r].id_hallazgo_contraloria =
               gcf.findCompromisoById(this.compromisos,this.compromisos_responsables[r].id_compromiso_contraloria).id_hallazgo_contraloria;
            this.compromisos_responsables[r].nombre_hallazgo_contraloria =
               gcf.findHallazgoById(this.hallazgos, this.compromisos_responsables[r].id_hallazgo_contraloria).nombre_hallazgo_contraloria;
            this.compromisos_responsables[r].nombre_compromiso_contraloria =
               gcf.findCompromisoById(this.compromisos,this.compromisos_responsables[r].id_compromiso_contraloria).nombre_compromiso_contraloria;
            this.compromisos_responsables[r].area = this.compromisos_responsables[r].area_contraloria.descripcion;
         }

         //Para Hallazgos historico // Procedimientos disciplinarios
         for (let h in this.historico_hallazgos) {
            let hh = gcf.findHallazgoById(this.hallazgos, this.historico_hallazgos[h].id_hallazgo_contraloria);
            this.historico_hallazgos[h].nombre_hallazgo_contraloria = hh.nombre_hallazgo_contraloria ;
            this.historico_hallazgos[h].id_hallazgo_contraloria = hh.id_hallazgo_contraloria ;
         }

      },
      showModalData: function (id_hallazgo_contraloria) {
         this.hallazgo = gcf.findHallazgoById(this.hallazgos, id_hallazgo_contraloria);
         this.hallazgo.porcentaje_avance = parseInt(this.hallazgo.porcentaje_avance) || parseInt(0);
         this.hallazgo.tipo_proceso_disciplinario =
            gcf.findTipoProcesoDisciplinarioById(this.tipo_proceso_disciplinario,this.hallazgo.id_tipo_proceso_disciplinario) || 'Sin tipo';
         this.hallazgo.estado_proceso_disciplinario =
            gcf.findEstadoProcesoDisciplinarioById(this.estado_proceso_disciplinario,this.hallazgo.id_estado_proceso_disciplinario) || 'Sin estado';
         if (this.hallazgo.compromiso_contraloria && this.hallazgo.compromiso_contraloria.length > 0){
            this.hallazgo.ctd_compromiso = parseInt(this.hallazgo.compromiso_contraloria.length);
            var ctd_seguimiento = 0;
            for (var i in this.hallazgo.compromiso_contraloria) {
               ctd_seguimiento += this.hallazgo.compromiso_contraloria[i].seguimiento_contraloria.length || 0;
            }
            this.hallazgo.ctd_seguimiento = ctd_seguimiento;

         }
         return this.showModal = true;
      },
      showModalHallazgo: function (id_hallazgo_contraloria) {
         this.hallazgos_responsables = this.hallazgos_responsablesTmp;

         this.hallazgos_responsables = _.filter(this.hallazgos_responsables, function(hr){
            return hr.id_hallazgo_contraloria == id_hallazgo_contraloria;
         });

         //this.compromiso = gcf.findCompromisoById(this.compromisos, id_compromiso_contraloria);
         this.hallazgo = gcf.findHallazgoById(this.hallazgos, id_hallazgo_contraloria);

         var ctd_hpd = 0;
         for (let hpd in this.hallazgo_procedimientos_disciplinarios) {
            if (this.hallazgo_procedimientos_disciplinarios[hpd].id_hallazgo_contraloria == this.hallazgo.id_hallazgo_contraloria) {
               ctd_hpd += 1;
            }
         }

         //Si el hallazgo TIENE ya asociado algun procedimiento
         if (ctd_hpd > 0) {
            this.hallazgo.proceso_disciplinario = true;
            this.hallazgo.procedimiento_disciplinario = true;
         }else{
            this.hallazgo.proceso_disciplinario = (this.hallazgo.procedimiento_disciplinario == 'Si') ? true:false;
            this.hallazgo.procedimiento_disciplinario = this.hallazgo.proceso_disciplinario;
         }


         /*
         this.compromiso.nombre_hallazgo_contraloria = this.hallazgo.nombre_hallazgo_contraloria;
         this.compromiso.seguimiento_no_reprogramado = this.seguimiento_no_reprogramado(this.compromiso);
         this.compromiso.seguimiento_reprogramado = this.seguimiento_reprogramado(this.compromiso);

         this.compromiso.estado =
            this.compromiso.seguimiento_contraloria[this.compromiso.seguimiento_contraloria.length-1].estado || 'Pendiente ingreso segumiento';
         this.compromiso.condicion =
            this.compromiso.seguimiento_contraloria[this.compromiso.seguimiento_contraloria.length-1].condicion || 'Pendiente ingreso segumiento';
         this.compromiso.porcentaje_avance = parseInt(this.compromiso.seguimiento_contraloria[this.compromiso.seguimiento_contraloria.length-1].porcentaje_avance);
         this.compromiso.updated_at = this.compromiso.seguimiento_contraloria ? this.compromiso.seguimiento_contraloria[this.compromiso.seguimiento_contraloria.length-1].updated_at : 'Sin seguimientos ingresados';
         */
         return this.showModalEditarHallazgo = true;

      },
      /* for transition group flip */
      shuffle: function (items) {return _.shuffle(items)},
      //with_dash() => for explained specific functions
      cambiar_form_hallazgo_editable: function(id_hallazgo_contraloria){
         //this.form_hallazgo_editable = (this.form_hallazgo_editable == false ? true : false);
         return this.form_hallazgo_editable = id_hallazgo_contraloria;
      },

      guardar_nuevo_compromiso: function (){
         this.$validator.validateAll().then(result => {});
         if (this.permiteGuardarNuevoCompromiso == true){
            this.permiteGuardarNuevoCompromiso = false;
            if (
               // this.nuevo_compromiso.nomenclatura != '' &&
               this.nuevo_compromiso.nombre_compromiso_contraloria != '' &&
               this.nuevo_compromiso.plazo_estimado != '' &&
               this.nuevo_compromiso.plazo_comprometido != '' &&
               this.nuevo_compromiso != {}) {

               this.form_compromiso_creable = 0;
               this.showModalNuevoCompromiso = false;
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               this.$http.post('/compromiso_contraloria', this.nuevo_compromiso).then(response => {
                  this.form_compromiso_creable = 0;
                  this.compromisos.push(response.body)
                  var self = this;
                  setTimeout(() => {
                     self.fetchHallazgos();
                  }, 500);
               }, response => {

               });

               this.limpiarNuevoCompromiso();


            }else{
               this.permiteGuardarNuevoCompromiso = true;
            }
         }else{
            alert('Se esta procesando la solicitud');
         }
      },
      guardar_form_hallazgo_editable: function(id_hallazgo_contraloria,index){
         if(this.form_hallazgo_editable == 0 && id_hallazgo_contraloria != 0){
            this.$validator.validateAll().then(result => {});
            if (this.permiteGuardarHallazgo == true){
               this.permiteGuardarHallazgo = false;
               if (this.hallazgo.nombre_hallazgo_contraloria != '' &&
                  this.hallazgo.criticidad != '' &&
                  this.hallazgo.id_clasificacion_materia != '' ){

                  if (!this.hallazgo.id_tipo_proceso_disciplinario &&
                     !this.hallazgo.id_estado_proceso_disciplinario) {
                     this.hallazgo.procedimiento_disciplinario = 'No';
                     this.hallazgo.id_tipo_proceso_disciplinario = 0;
                     this.hallazgo.id_estado_proceso_disciplinario = 0;
                  }else if(this.hallazgo.id_tipo_proceso_disciplinario &&
                     this.hallazgo.id_estado_proceso_disciplinario){
                     this.hallazgo.procedimiento_disciplinario = 'Si';
                  }

                  if (this.hallazgo.proceso_disciplinario == false) {
                     this.hallazgo.procedimiento_disciplinario = 'No';
                     this.hallazgo.id_estado_proceso_disciplinario = null;
                     this.hallazgo.id_tipo_proceso_disciplinario = null;
                     this.hallazgo.id_responsable_proceso_disciplinario = null;
                     this.hallazgo.observaciones = null;
                  }

                  //Lo guarda, verifica si los datos del objeto que son necesarios son iguales, sino que no lo guarde
                  Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                  this.$http.put('/hallazgo_contraloria/'+id_hallazgo_contraloria, this.hallazgo).then(response => {
                     //console.log(response.body);
                     this.form_hallazgo_editable = 0;
                     this.showModalEditarHallazgo = false;
                     this.permiteGuardarHallazgo = true;
                     var self = this;
                     setTimeout(() => {
                        self.fetchHallazgos();
                     }, 500);

                  }, response => {
                     // error callback
                  });


               }else{
                  this.permiteGuardarHallazgo = true;
               }
            }else{
               alert('Se esta procesando la solicitud');
            }
         }else if (this.form_hallazgo_editable != 0 && id_hallazgo_contraloria != 0 && index == 0) {
            Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
            this.hallazgo = gcf.findHallazgoById(this.hallazgos, id_hallazgo_contraloria);
            this.$http.put('/hallazgo_contraloria/'+id_hallazgo_contraloria, this.hallazgo).then(response => {
               //console.log(response.body);
               this.form_hallazgo_editable = 0;
               var self = this;
               setTimeout(() => {
                  self.fetchHallazgos();
               }, 500);

            }, response => {
               // error callback
            });

         }
      },
      validar_dentro_del_ano: function (date) {
         if(date.indexOf(new Date().getFullYear())>0){
            return true;
         }
         return false;
      },
   },
});

var CompromisoController = new Vue({
   el: '#CompromisoController',
   data(){
      return {
         'contraloria':{},
         'area_contraloria':[],
         'estado_contraloria':[],
         'hallazgos':{},
         'hallazgosTmp':{},
         'hallazgo':{},
         'compromiso':[],
         'compromisos':[],
         'compromisosTmp':[],
         'compromisos_responsables':[],
         'compromisos_responsablesTmp':[],
         'hallazgos_responsables':[],
         'hallazgos_responsablesTmp':[],
         'seguimientos':{},
         'seguimientosTmp':{},
         'porcentajes_cumplimiento':{0:0,1:10,2:20,3:30,4:40,5:50,6:60,7:70,8:80,9:90,10:100},
         //'compromiso':{}, si algo falla puede que sea donde modifique esto y lo deje comentado, fue en reemplazo a 'compromiso':[],
         'archivos':[],
         'usuarios':[],
         'config':[],
         'role':[],
         'auth':[],
         'auditor':[],
         'criticidad':[],
         'clasificacion_materia':[],
         'historico_hallazgos':[],
         'historico_hallazgosTmp':[],
         'hallazgo_historico_procedimientos_disciplinarios':[],
         'hallazgo_procedimientos_disciplinarios':[],

         'index':0,
         'ctd_hallazgos':0,
         'ctd_compromisos':0,
         'ctd_seguimientos':0,
         'ctd_req_hallazgos':0,

         'nuevo_compromiso':{
            'id_hallazgo_contraloria' : '',
            'nomenclatura' : '',
            'plazo_estimado' : '',
            'plazo_comprometido' : '',
            'nombre_compromiso_contraloria' : '',
            'responsable' : '',
            'email_responsable' : '',
            'fono_responsable' : '',
         },

         'nuevo_seguimiento':{
            'id_compromiso_contraloria' : '',
            'diferencia_tiempo' : '',
            'documento_adjunto' : {},
            'usuario_registra' : 1,
            'estado' : '',
            'condicion' : '',
            'porcentaje_avance' : 0,
            'razon_no_cumplimiento' : '',
            'observacion' : '',
         },

         'filterTerm':'',
         'filterIdCompromiso':'',
         'filterIdHallazgo':'',

         'form_compromiso_editable':0,
         'form_compromiso_creable':0,
         'form_seguimiento_creable':0,

         'gridOrder':'asc',

         'mensajeResultadoConFiltros':false,
         'filtroNomenclatura':false,
         'filtroEstado':false,
         'filtroCondicion':false,
         'filtroIdHallazgo':false,
         'filtroIdCompromiso':false,
         'showModal': false,
         'showModalNuevoSeguimiento': false,
         'showModalNuevoCompromiso': false,
         'showModalEditarCompromiso': false,
         'permiteGuardarNuevoCompromiso': true,
         'permiteGuardarNuevoSeguimiento': true,
         'spinner_upload': false,

         'compromisosFiltroNomenclatura':{},
         'compromisosFiltroEstado':{},
         'compromisosFiltroCondicion':{},
         'compromisosFiltroIdHallazgo':{},
         'compromisosFiltroIdCompromiso':{},

         'excel_json_fields': {
            'id_compromiso_contraloria': 'String',
            'id_hallazgo_contraloria': 'String',
            'hallazgo_contraloria': 'String',
            //'nomenclatura': 'String',
            'compromiso_contarloria': 'String',
            'plazo_estimado': 'String',
            'plazo_comprometido': 'String',
            'seguimientos': 'String',
            //'seg.reprogramados': 'String',
            'estado': 'String',
            //'condicion': 'String',
            'porcentaje_avance': 'String',
            'ultimo_seguimiento': 'String',
         },
         excel_json_data: [],
         excel_data_count: '',
         append_to_json_excel: {},

         'excel_selection_compromisos':[//excel_selection_json_fields
            { 'field':'id_compromiso_contraloria', 'name':'id','isVisible':true },
            { 'field':'nombre_hallazgo_contraloria', 'name':'hallazgo', 'isVisible':true },
            { 'field':'id_hallazgo_contraloria', 'name':'id hallazgo', 'isVisible':true },
            { 'field':'nombre_compromiso_contraloria', 'name':'compromiso', 'isVisible':true },
            { 'field':'plazo_estimado', 'name':'plazo estimado', 'isVisible':true },
            { 'field':'plazo_comprometido', 'name':'plazo comprometido', 'isVisible':true },
            { 'field':'ctd_seguimientos_norpg', 'name':'seguimientos', 'isVisible':true },
            { 'field':'estado', 'name':'estado', 'isVisible':true },
            { 'field':'porcentaje_avance', 'name':'porcentaje de avance', 'isVisible':true },
            { 'field':'updated_at', 'name':'ultimo seguimiento', 'isVisible':true },
         ],

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
               'id_compromiso_contraloria': c.id_compromiso_contraloria,
               'id_hallazgo_contraloria': c.id_hallazgo_contraloria,
               'hallazgo_contraloria': gcf.findHallazgoById(self.hallazgos,c.id_hallazgo_contraloria).nombre_hallazgo_contraloria || 'Sin Nombre',
               //'nomenclatura': c.nomenclatura,
               'compromiso_contraloria': c.nombre_compromiso_contraloria,
               'plazo_estimado': c.plazo_estimado,
               'plazo_comprometido': c.plazo_comprometido,
               'seguimientos': self.seguimiento_no_reprogramado(c) || 0,
               //'seg.reprogramados': self.seguimiento_reprogramado(c) || 0,
               'estado': c.seguimiento_contraloria[c.seguimiento_contraloria.length-1].estado || 'Sin Estado',
               //'condicion': c.seguimiento_contraloria[c.seguimiento_contraloria.length-1].condicion || 'Sin Condicion',
               'porcentaje_avance': c.seguimiento_contraloria[c.seguimiento_contraloria.length-1].porcentaje_avance || 0,
               'ultimo_seguimiento': c.updated_at,
            });
         });
      },
      showModalEditarCompromiso: function (showModalEditarCompromiso){
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
         ready () {},
         created(){},
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
         ready () {},
         created(){},
         filters: {},
         methods: {},
      },
      'modal':{
         props: ['compromiso','config'],
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
                                          <dd class="well well-sm">{{compromiso.id_hallazgo_contraloria || '0'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Id del Compromiso</dt>
                                          <dd class="well well-sm">{{compromiso.id_compromiso_contraloria || '0'}}</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Nombre del Hallazgo</dt>
                                          <dd class="well well-sm">
                                             {{compromiso.nombre_hallazgo_contraloria || 'Sin Definir'}}
                                          </dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Nombre del Compromiso</dt>
                                          <dd class="well well-sm">
                                             {{compromiso.nombre_compromiso_contraloria || 'Sin Definir'}}
                                          </dd>
                                       </div>
                                       <!--
                                       <div class="col-md-12">
                                          <dt>Nomenclatura</dt>
                                          <dd class="well well-sm">
                                             {{compromiso.nomenclatura || 'Sin Definir'}}
                                          </dd>
                                       </div>
                                       -->
                                       <div class="col-md-6">
                                          <dt>Plazo Estimado</dt>
                                          <dd class="well well-sm">{{compromiso.plazo_estimado || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Plazo Comprometido</dt>
                                          <dd class="well well-sm">{{compromiso.plazo_comprometido || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Seguimientos</dt>
                                          <dd class="well well-sm">{{compromiso.seguimiento_no_reprogramado || '0'}}</dd>
                                       </div>

                                       <!--
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
                                       -->

                                       <div class="col-md-6">
                                          <dt>Estado</dt>
                                          <dd class="well well-sm">{{compromiso.estado || 'Pendiente ingreso seguimiento'}}</dd>
                                       </div>
                                       <!--
                                       <div class="col-md-6">
                                          <dt>Condicion</dt>
                                          <dd class="well well-sm">{{compromiso.condicion || 'Pendiente ingreso seguimiento'}}</dd>
                                       </div>
                                       -->
                                       <div class="col-md-6">
                                          <dt>Porcentaje Avance</dt>
                                          <dd class="well well-sm">{{compromiso.porcentaje_avance || '0'}}%</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Fecha ultimo Seguimiento</dt>
                                          <dd class="well well-sm">{{compromiso.updated_at || 'Sin Definir'}}</dd>
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
            return {

            }
         },
         ready () {},
         created () {},
         methods: {},
         watch: {},
      },
      'modal-nuevoseguimiento':{
         props: ['nuevo_seguimiento', 'porcentajes_cumplimiento', 'auth', 'estado_contraloria'],
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

                                          <!-- Documentos Adjuntos -->
                                          <dt>Documentos Adjuntos:</dt>
                                          <dd>
                                             <input multiple="multiple" name="documento_adjunto[]" type="file"
                                                      @change="onFileChange" size="10">
                                          </dd>
                                          <br />

                                          <!-- Razon no Cumplimiento -->
                                          <dt>Razon no Cumplimiento:</dt>
                                          <dd>
                                             <textarea class="scroll_textarea_original" rows="5"
                                                       v-model="nuevo_seguimiento.razon_no_cumplimiento">
                                                @{{ nuevo_seguimiento.razon_no_cumplimiento }}
                                             </textarea>
                                          </dd>


                                       </div><!-- .col-md-* -->


                                       <div class="col-md-6">

                                      		<!-- Porcentaje de Avance -->
                                          <dt>Porcentaje de Avance (*):</dt>
                                          <dd v-if="auth.role != undefined &&
                                             auth.role.role != 'Usuario Auditado' && auth.role.role != 'Usuario Auditado Contraloria'">
                                             <p class="control has-icon has-icon-right">
                                                <select name="porcentaje_avance" v-model="nuevo_seguimiento.porcentaje_avance"
                                                      v-validate="'required'" data-vv-delay="500"
                                                      :class="{'input': true, 'text-danger': errors.has('porcentaje_avance'),
                                                      'form-control':true}">

                                                   <option v-for="p in porcentajes_cumplimiento" :value="p">
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
                                          <dd v-if="auth.role != undefined &&
                                             auth.role.role != 'Usuario Auditado' && auth.role.role != 'Usuario Auditado Contraloria'">
                                             <p class="control has-icon has-icon-right">
                                                <select name="estado" v-model="nuevo_seguimiento.estado"
                                                      v-validate="'required'" data-vv-delay="500"
                                                      :class="{'input': true, 'text-danger': errors.has('estado'), 'form-control':true}">

                                                   <option v-for="(v,e) in estado_contraloria" :value="e">{{v}}</option>

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

                                          <!-- Observacion -->
                                          <dt>Justificacion de Avance:</dt>
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
            return {

            }
         },
         ready () {
         },
         created () {
         },
         filters: {
            replacePorcentajeAvance(porcentaje_avance) {
               if (porcentaje_avance != null) {porcentaje_avance = porcentaje_avance.replace('porcentaje_avance', 'porcentaje de avance');}
               return porcentaje_avance;
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
            onFileChange: function(e) {
               var files = e.target.files || e.dataTransfer.files;
               var filesOverSizeLimit = [];
               var filesOk = [];

               $(files).each(function(f){
                  //console.log(files[f].size); //tamaño
                  //console.log(files[f].name); //nombre
                  if (files[f].size > 10240000) {
                     filesOverSizeLimit.push(files[f]);
                  }else{
                     filesOk.push(files[f]);
                  }
               });

               if (filesOverSizeLimit.length > 0) {
                  let textNameFilesOverSizeLimit = '';
                  let textNameFilesOk = '';
                  $(filesOverSizeLimit).each(function(f){
                     textNameFilesOverSizeLimit += "\n · "+filesOverSizeLimit[f].name;
                  });
                  $(filesOk).each(function(f){
                     textNameFilesOk += "\n · "+filesOk[f].name;
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
         watch: {
         },
      },
      'modal-nuevocompromiso':{
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
									      <!--
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
                                 -->
                                 <div class="col-md-12">
                                    <dt>Nombre Compromiso (*):</dt>
                                    <dd>
                                       <p class="control has-icon has-icon-right">
                                          <textarea name="nombre_compromiso_contraloria" rows="7"
                                                   :class="{'input': true, 'text-danger': errors.has('nombre_compromiso_contraloria'),
                                                    'scroll_textarea_original':true}"
                                                    v-validate="'required'" data-vv-delay="500"
                                                    v-model="nuevo_compromiso.nombre_compromiso_contraloria"
                                                    :value="nuevo_compromiso.nombre_compromiso_contraloria">
                                          </textarea>
                                          <transition name="bounce">
                                          <i v-show="errors.has('nombre_compromiso_contraloria')" class="fa fa-warning"></i>
                                          </transition>
                                          <transition name="bounce">
                                          <span v-show="errors.has('nombre_compromiso_contraloria')" class="text-danger">
                                             {{ errors.first('nombre_compromiso_contraloria') | replaceNombreCompromisoContraloria }}
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
            return {

            }
         },
         ready () {
         },
         created () {
            var self = this;
            var date = new Date();
            var dd = date.getDate();
            var mm = date.getMonth()+1; //January is 0!
            var yyyy = date.getFullYear();
            this.min_date = yyyy+"-"+((mm<10)?'0'+mm:mm)+"-"+((dd<10)?'0'+dd:dd);

            var self = this;
            var date = new Date();
            var dd = date.getDate();
            var mm = date.getMonth()+1; //January is 0!
            var yyyy = date.getFullYear();
            this.min_date = yyyy+"-"+((mm<10)?'0'+mm:mm)+"-"+((dd<10)?'0'+dd:dd);

            $(document).ready(function(){

               // #ncpe => nuevo compromiso plazo estimado
               $('#ncpe2').datepicker({//ncpe => nuevo compromiso plazo estimado
                  format: "dd-mm-yyyy",
                  language: "es",
                  startDate: (function(){
                     return date = (function(){
                        var date = new Date();
                        date.setDate(date.getDate());
                        return date;
                     })();
                  })(),
                  autoclose: true,
               });

               $('#ncpe2').change(function(){//ncpe => nuevo compromiso plazo estimado
                  if ($('#ncpe2').val()) {

                     //hacer la validacion si es menor a la fecha actual, no avisar pero colocar la fecha que corresponde
                     var date_ncpe = $('#ncpe2').val().split('-');

                     var date_today = new Date();
                     var dd = date_today.getDate();
                     var mm = date_today.getMonth()+1; //January is 0!
                     var yyyy = date_today.getFullYear();

                     if (date_ncpe.length == 3) {
                        if (date_ncpe[1].length != 2 || date_ncpe[0].length != 2 || date_ncpe[2].length != 4) {
                           $('#ncpe2').prop('value', ((dd<10)?'0'+dd:dd)+'-'+((mm<10)?'0'+mm:mm)+'-'+yyyy);
                           self.nuevo_compromiso.plazo_estimado = ((dd<10)?'0'+dd:dd)+'-'+((mm<10)?'0'+mm:mm)+'-'+yyyy;
                           return ;
                        }
                     }

                     var date_today = new Date(mm+'/'+dd+'/'+yyyy);
                     date_ncpe = new Date(date_ncpe[1]+'/'+date_ncpe[0]+'/'+date_ncpe[2]);

                     var timeDiff = date_today.getTime() - date_ncpe.getTime();//Math.abs(date_ncpe.getTime() - date_ncpc.getTime());
                     var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                     //console.log(diffDays);

                     if (diffDays < 0) {
                        $('#ncpc2').data('datepicker').setStartDate($('#ncpe2').val());
                        self.nuevo_compromiso.plazo_estimado = $('#ncpe2').val();
                     }else{
                        $('#ncpe2').prop('value', ((dd<10)?'0'+dd:dd)+'-'+((mm<10)?'0'+mm:mm)+'-'+yyyy);
                        self.nuevo_compromiso.plazo_estimado = ((dd<10)?'0'+dd:dd)+'-'+((mm<10)?'0'+mm:mm)+'-'+yyyy;
                     }

                     //Si es que ya se habia ingresado el plazo comprometido, valida el rango
                     if ($('#ncpc2').val()) {
                        var date_ncpc = $('#ncpc2').val().split('-');
                        date_ncpc = new Date(date_ncpc[1]+'/'+date_ncpc[0]+'/'+date_ncpc[2]);

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

               $('#ncpc2').click(function(event){
                  if ($('#ncpe2').val()) {
                     $('#ncpc2').data('datepicker').setStartDate($('#ncpe2').val());
                  }
               });

               $('#ncpc2').change(function(event){
                  var date_ncpe = $('#ncpe2').val().split('-');
                  date_ncpe = new Date(date_ncpe[1]+'/'+date_ncpe[0]+'/'+date_ncpe[2]);

                  var date_ncpc = $('#ncpc2').val().split('-');
                  date_ncpc = new Date(date_ncpc[1]+'/'+date_ncpc[0]+'/'+date_ncpc[2]);

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
               if (fono != null) {fono = fono.replace('fono_responsable', 'telefono');}
               return fono;
            },
            replacePlazoComprometido(plazo_comprometido) {
               if (plazo_comprometido != null) { plazo_comprometido = plazo_comprometido.replace('plazo_comprometido', 'para el plazo comprometido');}
               return plazo_comprometido;
            },
            replacePlazoEstimado(plazo_estimado) {
               if (plazo_estimado != null) { plazo_estimado = plazo_estimado.replace('plazo_estimado', ' para el plazo estimado');}
               return plazo_estimado;
            },
            replaceNombreCompromisoContraloria(nombre_compromiso_contraloria) {
               if (nombre_compromiso_contraloria != null) { nombre_compromiso_contraloria =
                  nombre_compromiso_contraloria.replace('nombre_compromiso_contraloria', 'para el nombre del compromiso');}
               return nombre_compromiso_contraloria;
            },
         },
         methods: {

         },
         watch: {
         },
      },
      'modal-editarcompromiso':{
         props: ['compromiso', 'config', 'auth', 'role', 'auditor', 'usuarios', 'area_contraloria',
            'compromisos_responsables', 'contraloria', 'responsable_controller', 'compromisos', 'hallazgos'],
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
                                          {{compromiso.id_hallazgo_contraloria}}
                                       </dd>
                                    </div>
                                    <div class="col-md-6">
                                       <dt>Id Compromiso:</dt>
                                       <dd class="well well-sm">
                                          {{compromiso.id_compromiso_contraloria}}
                                       </dd>
                                    </div>
                                    <div class="col-md-12">
                                       <dt>Nombre del Hallazgo al que pertenece:</dt>
                                       <dd class="well well-sm">
                                          {{compromiso.nombre_hallazgo_contraloria}}
                                       </dd>
                                    </div>
                                    <div class="col-md-12">
                                       <dt>Nombre del compromiso (*):</dt>
                                       <dd>
                                          <p class="control has-icon has-icon-right">
                                             <textarea name="nombre_compromiso_contraloria" rows="5"
                                                :class="{'input': true, 'text-danger': errors.has('nombre_compromiso_contraloria'),
                                                'scroll_textarea_original':true}"
                                                v-validate="'required'" data-vv-delay="500"
                                                v-model="compromiso.nombre_compromiso_contraloria">
                                                {{ compromiso.nombre_compromiso_contraloria }}
                                             </textarea>
                                             <transition name="bounce">
                                             <i v-show="errors.has('nombre_compromiso_contraloria')" class="fa fa-warning"></i>
                                             </transition>
                                             <transition name="bounce">
                                             <span v-show="errors.has('nombre_compromiso_contraloria')" class="text-danger">
                                                {{ errors.first('nombre_compromiso_contraloria') | replaceNombreCompromisoContraloria }}
                                             </span>
                                             </transition>
                                          </p>
                                       </dd>
                                    </div>
                                    <!--
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
                                    -->
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
                                          {{compromiso.porcentaje_avance}}%
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
                                                         {{cr.id_compromiso_responsable_contraloria}}
                                                         </td>
                                                         <td>
                                                         {{cr.id_compromiso_contraloria}}
                                                         </td>
                                                         <td>
                                                         {{cr.id_area_contraloria}}
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
                                                               {{ compromiso.id_compromiso_contraloria }}
                                                            </td>
                                                            <td>
                                                               {{ nuevo_responsable.id_area_contraloria }}
                                                            </td>
                                                            <td>
                                                               <p class="control has-icon has-icon-right">
                                                                  <select id="responsables_existentes" name="id_usuario_responsable_contraloria"
                                                                     @change="completar_nuevo_responsable_email"
                                                                     v-model="nuevo_responsable.id_usuario_responsable_contraloria"
                                                                     v-validate="'required'" data-vv-delay="500"
                                                                     :class="{'input': true,
                                                                     'text-danger': errors.has('id_usuario_responsable_contraloria'),
                                                                     'form-control':true}">
                                                                     <option class="responsables" v-for="(u,i) in usuarios" :value="u.id"
                                                                        v-if="validarResponsableNoRegistrado(u.id)">
                                                                        {{u.name}}
                                                                     </option>
                                                                  </select>
                                                                  <transition name="bounce">
                                                                  <i v-show="errors.has('id_usuario_responsable_contraloria')"
                                                                  class="fa fa-warning"></i>
                                                                  </transition>
                                                                  <transition name="bounce">
                                                                  <span v-show="errors.has('id_usuario_responsable_contraloria')"
                                                                     class="text-danger">
                                                                     {{ errors.first('id_usuario_responsable_contraloria') |
                                                                        replaceIdUsuarioResponsableContraloria }}
                                                                  </span>
                                                                  </transition>
                                                               </p>

																					<!--
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
                                                               <p class="control has-icon has-icon-right">
                                                                  <input type="number" data-vv-name="fono_responsable"
                                                                        v-validate="'required'" data-vv-delay="500"
                                                                        :class="{'input': true, 'text-danger': errors.has('fono_responsable'),
                                                                        'form-control':true}"
                                                                        v-model="nuevo_responsable.fono_responsable" />
                                                                  <transition name="bounce">
                                                                  <i v-show="errors.has('fono_responsable')" class="fa fa-warning"></i>
                                                                  </transition>
                                                                  <transition name="bounce">
                                                                  <span v-show="errors.has('fono_responsable')" class="text-danger">
                                                                     {{ errors.first('fono_responsable') | replaceFonoResponsable }}
                                                                  </span>
                                                                  </transition>
                                                               </p>
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
               'loadMore':false,
               'usuariosTmp':[],
               'form_responsable_creable':false,
               'permiteGuardarNuevoResponsable':true,
               'nuevo_responsable':{
                  'id_compromiso_contraloria':'',
                  'id_contraloria':'',
                  'id_usuario_responsable_contraloria':'',
                  'id_area_contraloria':0,
                  'responsable':'',
                  'email_responsable':'',
                  'fono_responsable':'',
               },
               'nuevo_usuario':{
                  'name':'',
                  'email':'',
                  'password':'',
                  'id_role':'13',
                  'id_auditor':'0',
                  'active_directory':0,
                  'active_directory_user':'',
                  'tipo_acceso':'Role',
                  'usuario_registra':1,
                  'usuario_modifica':0,
               },
            }
         },
         ready () {
         },
         created () {

         },
         filters: {
            replaceNombreCompromisoContraloria(nombre_compromiso_contraloria) {
               if (nombre_compromiso_contraloria != null) {nombre_compromiso_contraloria =
                  nombre_compromiso_contraloria.replace('nombre_compromiso_contraloria', 'para el nombre del comprimiso');}
               return nombre_compromiso_contraloria;
            },
            replaceEmailResponsable(email_responsable) {
               if (email_responsable != null) {email_responsable = email_responsable.replace('email_responsable', 'email para el responsable');}
               return email_responsable;
            },
            replaceFonoResponsable(fono_responsable) {
               if (fono_responsable != null) {fono_responsable = fono_responsable.replace('fono_responsable', 'fono para el responsable');}
               return fono_responsable;
            },
            replaceIdUsuarioResponsableContraloria(id_usuario_responsable_contraloria) {
               if (id_usuario_responsable_contraloria != null) {id_usuario_responsable_contraloria =
                  id_usuario_responsable_contraloria.replace('id_usuario_responsable_contraloria', 'para el nombre del responsable');}
               return id_usuario_responsable_contraloria;
            },
            replaceName(name) {
               if (name != null) {name = name.replace('name', 'para el nombre del usuario');}
               return name;
            },
            replacePassword(password) {
               if (password != null) {password = password.replace('password', 'password');}
               return password;
            },
            replaceIdRole(id_role) {
               if (id_role != null) {id_role = id_role.replace('id_role', 'role');}
               return id_role;
            },
            replaceIdAuditor(id_auditor) {
               if (id_auditor != null) {id_auditor = id_auditor.replace('id_auditor', 'nombre auditor');}
               return id_auditor;
            },
         },
         methods: {
            cambiar_form_responsable_creable: function () {
               if(this.compromiso != null && this.usuarios != null && this.config != null && this.area_contraloria != null){
                  this.nuevo_responsable.id_compromiso_contraloria = this.compromiso.id_compromiso_contraloria;
                  this.nuevo_responsable.id_area_contraloria = this.area_contraloria[0].id_area_contraloria;
               }else{
                  console.log('Uno de los elementos a validar es nulo.');
               }
               this.permiteGuardarNuevoResponsable = true;
               return this.form_responsable_creable = !this.form_responsable_creable;
            },
            crear_nuevo_responsable: function () {},
            completar_nuevo_responsable_email: function () {
               if (this.nuevo_responsable.id_usuario_responsable_contraloria != null) {
                  return this.nuevo_responsable.email_responsable =
                     gcf.findUsuarioById(this.usuarios, this.nuevo_responsable.id_usuario_responsable_contraloria).email;
               }
            },

            guardar_nuevo_responsable: function () {
               if (this.permiteGuardarNuevoResponsable == true){
                  this.permiteGuardarNuevoResponsable = false;
                  if (this.nuevo_responsable.id_compromiso_contraloria != '' &&
                     this.nuevo_responsable.id_usuario_responsable_contraloria != '' &&
                     this.nuevo_responsable.email_responsable != '' &&
                     //this.nuevo_responsable.fono_responsable != '' &&
                     this.nuevo_responsable != {}) {

                     var formData = new FormData();

                     formData.append('id_compromiso_contraloria', this.nuevo_responsable.id_compromiso_contraloria);
                     formData.append('id_contraloria', this.contraloria.id_contraloria);
                     formData.append('id_usuario_responsable_contraloria', this.nuevo_responsable.id_usuario_responsable_contraloria);
                     formData.append('id_area_contraloria', this.area_contraloria[0].id_area_contraloria);
                     formData.append('responsable',
                        gcf.findUsuarioById(this.usuarios, this.nuevo_responsable.id_usuario_responsable_contraloria).name);
                     formData.append('email_responsable', this.nuevo_responsable.email_responsable);
                     formData.append('fono_responsable', this.nuevo_responsable.fono_responsable);
                     formData.append('_token', $('#_token').val());

                     Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

                     this.$http.post('/compromiso_contraloria/store/responsable', formData).then(response => {
                        var compromiso = gcf.findCompromisoById(this.compromisos, this.nuevo_responsable.id_compromiso_contraloria);
                        var hallazgo = gcf.findHallazgoById(this.hallazgos, compromiso.id_hallazgo_contraloria);

                        var new_compromiso_responsable = response.data.new_compromiso_responsable;

                        new_compromiso_responsable.id_hallazgo_contraloria = hallazgo.id_hallazgo_contraloria;
                        new_compromiso_responsable.nombre_hallazgo_contraloria = hallazgo.nombre_hallazgo_contraloria;
                        new_compromiso_responsable.id_compromiso_contraloria = compromiso.id_compromiso_contraloria;
                        new_compromiso_responsable.nombre_compromiso_contraloria = compromiso.nombre_compromiso_contraloria;
                        new_compromiso_responsable.area = this.area_contraloria[0].descripcion;

                        this.compromisos_responsables.push(new_compromiso_responsable);
                        this.limpiarNuevoResponsable();
                        this.form_responsable_creable = false;
                        alert('Responsable agregado.');


                        //console.log(response);
                        //this.hallazgos.push(response.body);
                     }, response => {
                     });
                  }else{
                     this.permiteGuardarNuevoResponsable = true;
                  }
               }else{
                  alert('Se esta procesando la solicitud');
               }
            },
            guardar_nuevo_usuario: function () {
               if (this.nuevo_usuario != {}){
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
            limpiarNuevoResponsable: function () {
               return this.nuevo_responsable = {
                  'id_compromiso_contraloria':'',
                  'id_contraloria':'',
                  'id_usuario_responsable':'',
                  'id_area_contraloria':0,
                  'responsable':'',
                  'email_responsable':'',
                  'fono_responsable':'',
               };
            },
            limpiarNuevoUsuario: function () {
               return this.nuevo_usuario = {
                  'name':'',
                  'email':'',
                  'password':'',
                  'id_role':'12',
                  'id_auditor':'0',
                  'active_directory':0,
                  'active_directory_user':'',
                  'tipo_acceso':'Role',
                  'usuario_registra':1,
                  'usuario_modifica':0,
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
                  if (items[i].id_usuario_responsable_contraloria==id_responsable_registrado ) {//12 es aqui por el perfil
                     return false; //Ya ha sido registrado
                  }
               }
               if (gcf.findUsuarioById(this.usuarios,id_responsable_registrado).role != undefined) {
                  if (gcf.findUsuarioById(this.usuarios,id_responsable_registrado).role.role != 'Usuario Auditado Contraloria') {
                     return false;
                  }
               }

               return true; //No ha sido registrado
            },
         },
         watch: {
         },
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
      agregarFiltroEstadoGrid: function(estado){
         if(!this.filtroEstado){
            this.filtroEstado = true;
            this.compromisosFiltroEstado = this.compromisos;
         }else{
            this.compromisos = this.compromisosFiltroEstado;
         }

         //Itero la lista de hallazgos y filtro segun estado seleccionado
         this.compromisos = _.filter(this.compromisos, function (c) {
            return c.estado == estado;
         });
         if(this.compromisos.length == 0){
            this.compromisos = this.compromisosFiltroEstado;
            alert('Sin resultados para "'+estado+'"');
            //this.limpiarFiltros();
         }
      },
      agregarFiltroCondicionGrid: function(condicion){
         if(!this.filtroCondicion){
            this.filtroCondicion = true;
            this.compromisosFiltroCondicion = this.compromisos;
         }else{
            this.compromisos = this.compromisosFiltroCondicion;
         }

         //Itero la lista de hallazgos y filtro segun la criticidad seleccionada
         this.compromisos = _.filter(this.compromisos, function (c) {
            return c.condicion == condicion;
         });
         if(this.compromisos.length == 0){
            this.compromisos = this.compromisosFiltroCondicion;
            alert('Sin resultados para "'+condicion+'"');
            //this.limpiarFiltros();
         }
      },
      agregarFiltroNomenclaturaGrid: function(nomenclatura){
         if(!this.filtroNomenclatura){
            this.filtroNomenclatura = true;
            this.compromisosFiltroNomenclatura = this.compromisos;
         }else{
            this.compromisos = this.compromisosFiltroNomenclatura;
         }

         //Itero la lista de hallazgos y filtro segun la criticidad seleccionada
         this.compromisos = _.filter(this.compromisos, function (c) {
            return c.nomenclatura == nomenclatura;
         });
         if(this.compromisos.length == 0){
            this.compromisos = this.compromisosFiltroNomenclatura;
            alert('Sin resultados para "'+nomenclatura+'"');
            //this.limpiarFiltros();
         }
      },
      agregarFiltroIdHallazgoGrid: function(){
         if(!this.filtroIdHallazgo){
            this.filtroIdHallazgo = true;
            this.compromisosFiltroIdHallazgo = this.compromisos;
         }else{
            this.compromisos = this.compromisosFiltroIdHallazgo;
         }

         var self = this;
         //Itero la lista de hallazgos y filtro segun el id hallazgo ingresado
         this.compromisos = _.filter(this.compromisos, function (c) {
            return c.id_hallazgo_contraloria == self.filterIdHallazgo;
         });
         /*
         if(this.compromisos.length == 0){
            this.compromisos = this.compromisosFiltroIdHallazgo;
            if (this.filterIdHallazgo == '') return;
            else alert('Sin resultados para el id ingresado');
         }
         */
      },
      agregarFiltroIdCompromisoGrid: function(){
         if(!this.filtroIdCompromiso){
            this.filtroIdCompromiso = true;
            this.compromisosFiltroIdCompromiso = this.compromisos;
         }else{
            this.compromisos = this.compromisosFiltroIdCompromiso;
         }

         var self = this;
         //Itero la lista de hallazgos y filtro segun el id hallazgo ingresado
         this.compromisos = _.filter(this.compromisos, function (c) {
            return c.id_compromiso_contraloria == self.filterIdCompromiso;
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
      calcularDiferenciaTiempo: function (plazo_comprometido){
         plazo_comprometido = plazo_comprometido.split('-');
         var today = new Date();
         var dd = today.getDate();
         var mm = today.getMonth()+1; //January is 0!
         var yyyy = today.getFullYear();

         var date1 = new Date(plazo_comprometido[1]+'/'+plazo_comprometido[0]+'/'+plazo_comprometido[2]);
         var date2 = new Date(mm+'/'+dd+'/'+yyyy);
         var timeDiff = Math.abs(date2.getTime() - date1.getTime());
         var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
         return diffDays;
      },
      changeListOrder: function (column) {
         this.gridOrder == 'asc' ? this.gridOrder = 'desc' : this.gridOrder = 'asc';
         this.orderLists(column);
      },
      crear_nuevo_compromiso: function (id_hallazgo_contraloria) {
         this.$validator.validateAll().then(result => {});
         if (id_hallazgo_contraloria == null || id_hallazgo_contraloria == '') {
            alert('Debe seleccionar un hallazgo');
            return ;
         }
         this.form_compromiso_creable = id_hallazgo_contraloria;
         this.nuevo_compromiso.id_hallazgo_contraloria = id_hallazgo_contraloria;
         this.showModalNuevoCompromiso = true;
         this.permiteGuardarNuevoCompromiso = true;
         return this.nuevo_compromiso;
      },
      crear_nuevo_seguimiento: function (compromiso){
         //console.log(compromiso);
         this.form_seguimiento_creable = compromiso.id_compromiso_contraloria;
         this.nuevo_seguimiento.id_compromiso_contraloria = compromiso.id_compromiso_contraloria;
         this.nuevo_seguimiento.diferencia_tiempo = compromiso.plazo_comprometido_dias;
         this.nuevo_seguimiento.porcentaje_avance = compromiso.porcentaje_avance;
         this.nuevo_seguimiento.estado = compromiso.estado;
         this.nuevo_seguimiento.condicion = compromiso.condicion;
         this.nuevo_seguimiento.usuario_registra = this.auth.id;

         this.showModalNuevoSeguimiento = true;
         this.permiteGuardarNuevoSeguimiento = true;
         return this.nuevo_seguimiento;
      },
      estado_compromiso: function (compromiso) {
         compromiso = gcf.findCompromisoById(this.compromisos, compromiso.id_compromiso_contraloria);
         return compromiso.estado;
      },
      porcentaje_avance: function (compromiso) {
         compromiso = gcf.findCompromisoById(this.compromisos, compromiso.id_compromiso_contraloria);
         return compromiso.porcentaje_avance || 0;
      },
      fetchCompromisos: function (){
         this._gcf = gcf;
         let id_contraloria = $('#id_contraloria').val();
         this.$http.get('/contraloria/'+id_contraloria+'/edit/ajax').then(response => { // success callback
            //console.log(response);

            this.contraloria = response.body.contraloria;
            this.area_contraloria = response.body.area_contraloria;
            this.estado_contraloria = response.body.estado_contraloria;
            this.hallazgos = response.body.hallazgos;
            this.compromisos = response.body.compromisos;
            this.compromisos_responsables = response.body.compromisos_responsables;
            this.hallazgos_responsables = response.body.hallazgos_responsables;
            this.seguimientos = response.body.seguimientos;
            this.archivos = response.body.archivos;
            this.archivosTmp = response.body.archivos;
            this.usuarios = response.body.usuarios;
            this.config = response.body.config;
            this.auth = response.body.auth;
            this.role = response.body.role;
            this.auditor = response.body.auditor;
            this.tipo_proceso_disciplinario = response.body.tipo_proceso_disciplinario;
            this.estado_proceso_disciplinario = response.body.estado_proceso_disciplinario;
            this.responsable_proceso_disciplinario = response.body.responsable_proceso_disciplinario;
            this.criticidad = response.body.criticidad;
            this.clasificacion_materia = response.body.clasificacion_materia;
            this.historico_hallazgos = response.body.historico_hallazgos;
            this.historico_hallazgosTmp = response.body.historico_hallazgos;
            this.hallazgo_historico_procedimientos_disciplinarios = response.body.hallazgo_historico_procedimientos_disciplinarios;
            this.hallazgo_procedimientos_disciplinarios = response.body.hallazgo_procedimientos_disciplinarios;

            this.preloadCompromisos();

            //Manda el controller que llama al metodo
            gcf.refetchControllersData({
               'contraloria':this.contraloria,
               'area_contraloria':this.area_contraloria,
               'estado_contraloria':this.estado_contraloria,
               'hallazgos':this.hallazgos,
               'hallazgosTmp':this.hallazgos,
               'compromisos':this.compromisos,
               'compromisosTmp':this.compromisos,
               'compromisos_responsables':this.compromisos_responsables,
               'compromisos_responsablesTmp':this.compromisos_responsables,
               'hallazgos_responsables':this.hallazgos_responsables,
               'hallazgos_responsablesTmp':this.hallazgos_responsables,
               'seguimientos':this.seguimientos,
               'seguimientosTmp':this.seguimientos,
               'archivos':this.archivos,
               'archivosTmp':this.archivos,
               'usuarios':this.usuarios,
               'config':this.config,
               'auth':this.auth,
               'role':this.role,
               'auditor':this.auditor,
               'tipo_proceso_disciplinario':this.tipo_proceso_disciplinario,
               'estado_proceso_disciplinario':this.estado_proceso_disciplinario,
               'responsable_proceso_disciplinario':this.responsable_proceso_disciplinario,
               'criticidad':this.criticidad,
               'clasificacion_materia':this.clasificacion_materia,
               'historico_hallazgos':this.historico_hallazgos,
               'historico_hallazgosTmp':this.historico_hallazgosTmp,
               'hallazgo_historico_procedimientos_disciplinarios':this.hallazgo_historico_procedimientos_disciplinarios,
               'hallazgo_procedimientos_disciplinarios':this.hallazgo_procedimientos_disciplinarios,
            },{
               'HallazgoController':'HallazgoController',
               'SeguimientoController':'SeguimientoController',
               'ArchivoController':'ArchivoController',
               'ResponsableController':'ResponsableController',
               'ProcedimientosDisciplinariosController':'ProcedimientosDisciplinariosController',
            }, 'CompromisoController');

            this.ctd_req_hallazgos = this.contraloria.cantidad_hallazgo_contraloria; // : cantidad de hallazgos especificados al inicio para el contraloria
            this.ctd_hallazgos = this.hallazgos.length; // : cantidad actual de hallazgos referenciados al contraloria
            this.ctd_compromisos = this.compromisos.length;//this.ctd_compromisos = 0;
            this.ctd_seguimientos = this.seguimientos.length;

            ProcedimientosDisciplinariosController.ctd_req_hallazgos = HallazgoController.ctd_req_hallazgos = SeguimientoController.ctd_req_hallazgos = ArchivoController.ctd_req_hallazgos = ResponsableController.ctd_req_hallazgos = this.ctd_req_hallazgos;
            ProcedimientosDisciplinariosController.ctd_hallazgos = HallazgoController.ctd_hallazgos = SeguimientoController.ctd_hallazgos = ArchivoController.ctd_hallazgos = ResponsableController.ctd_hallazgos = this.ctd_hallazgos;
            ProcedimientosDisciplinariosController.ctd_compromisos = HallazgoController.ctd_compromisos = SeguimientoController.ctd_compromisos = ArchivoController.ctd_compromisos = ResponsableController.ctd_compromisos = this.ctd_compromisos;
            ProcedimientosDisciplinariosController.ctd_seguimientos = HallazgoController.ctd_seguimientos = SeguimientoController.ctd_seguimientos = ArchivoController.ctd_seguimientos = ResponsableController.ctd_seguimientos = this.ctd_seguimientos;

            ProcedimientosDisciplinariosController._gcf = HallazgoController._gcf = SeguimientoController._gcf = ArchivoController._gcf = ResponsableController._gcf = this._gcf;

         }, response => { // error callback
            console.log('Error fetchCompromisos: '+response);
         });
      },
      limpiarFiltros: function() {
         //this.compromisos = this.compromisosTmp;
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
            'id_hallazgo_contraloria' : '',
            'nomenclatura' : '',
            'plazo_estimado' : '',
            'plazo_comprometido' : '',
            'nombre_compromiso_contraloria' : '',
            'responsable' : '',
            'email_responsable' : '',
            'fono_responsable' : '',
         }
      },
      limpiarNuevoSeguimiento: function () {
         this.nuevo_seguimiento = {};
         return this.nuevo_seguimiento = {
            'id_compromiso_contraloria' : '',
            'diferencia_tiempo' : '',
            'documento_adjunto' : {},
            'estado' : '',
            'condicion' : '',
            'porcentaje_avance' : 0,
         }
      },
      // function to order users in the list
      orderLists: function (column) {
         this.compromisos = _.orderBy(this.compromisos, column, this.gridOrder);
         //console.log(column);
         //this.lists = this.shuffle(_.orderBy(this.lists, 'name', this.listOrder));
         //console.log(this.lists.length);
      },
      hideFieldGridCompromiso: function (fieldName) {
         for (let f in this.excel_selection_compromisos) {
            if (this.excel_selection_compromisos[f].field == fieldName) {
               return this.excel_selection_compromisos[f].isVisible = !this.excel_selection_compromisos[f].isVisible;
            }
         }
      },
      restoreFieldGridCompromiso: function (fieldName) {
         for (let f in this.excel_selection_compromisos) {
            if (this.excel_selection_compromisos[f].field == fieldName) {
               return this.excel_selection_compromisos[f].isVisible = !this.excel_selection_compromisos[f].isVisible;
            }
         }
      },
      preloadCompromisos: function () {
         for (let c in this.compromisos) {
            this.compromisos[c].plazo_comprometido_dias = this.calcularDiferenciaTiempo(this.compromisos[c].plazo_comprometido) || 0;
         }

         //Para Seguimientos
         for (let s in this.seguimientos) {
            this.seguimientos[s].id_hallazgo_contraloria =
               gcf.findCompromisoById(this.compromisos,this.seguimientos[s].id_compromiso_contraloria).id_hallazgo_contraloria;
            this.seguimientos[s].nombre_hallazgo_contraloria =
               gcf.findHallazgoById(this.hallazgos, this.seguimientos[s].id_hallazgo_contraloria).nombre_hallazgo_contraloria;
            this.seguimientos[s].nombre_compromiso_contraloria =
               gcf.findCompromisoById(this.compromisos,this.seguimientos[s].id_compromiso_contraloria).nombre_compromiso_contraloria;
            this.seguimientos[s].usuario_registra =
               gcf.findById(this.usuarios,this.seguimientos[s].usuario_registra);
            this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra ?
               this.seguimientos[s].usuario_registra.name : 'Sistema';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';
         }

         //Para Archivos
         for (let a in this.archivos) {
            this.archivos[a].id_hallazgo_contraloria =
               gcf.findCompromisoById(this.compromisos,this.archivos[a].id_compromiso_contraloria).id_hallazgo_contraloria;
            this.archivos[a].nombre_hallazgo_contraloria =
               gcf.findHallazgoById(this.hallazgos, this.archivos[a].id_hallazgo_contraloria).nombre_hallazgo_contraloria;
            this.archivos[a].nombre_compromiso_contraloria =
               gcf.findCompromisoById(this.compromisos,this.archivos[a].id_compromiso_contraloria).nombre_compromiso_contraloria;
            this.archivos[a].usuario_registra =
               gcf.findById(this.usuarios,this.archivos[a].usuario_registra);
            this.archivos[a].usuario_registra = this.archivos[a].usuario_registra ? this.archivos[a].usuario_registra.name : 'Sistema';
            this.archivos[a].observacion = this.archivos[a].observacion || 'Sin Observacion';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';
         }

         //Para Responsables
         for (let r in this.compromisos_responsables) {
            this.compromisos_responsables[r].id_hallazgo_contraloria =
               gcf.findCompromisoById(this.compromisos,this.compromisos_responsables[r].id_compromiso_contraloria).id_hallazgo_contraloria;
            this.compromisos_responsables[r].nombre_hallazgo_contraloria =
               gcf.findHallazgoById(this.hallazgos, this.compromisos_responsables[r].id_hallazgo_contraloria).nombre_hallazgo_contraloria;
            this.compromisos_responsables[r].nombre_compromiso_contraloria =
               gcf.findCompromisoById(this.compromisos,this.compromisos_responsables[r].id_compromiso_contraloria).nombre_compromiso_contraloria;
            this.compromisos_responsables[r].area = this.compromisos_responsables[r].area_contraloria.descripcion;
         }

         //Para Hallazgos historico // Procedimientos disciplinarios
         for (let h in this.historico_hallazgos) {
            let hh = gcf.findHallazgoById(this.hallazgos, this.historico_hallazgos[h].id_hallazgo_contraloria);
            this.historico_hallazgos[h].nombre_hallazgo_contraloria = hh.nombre_hallazgo_contraloria ;
            this.historico_hallazgos[h].id_hallazgo_contraloria = hh.id_hallazgo_contraloria ;
         }
      },
      showModalData: function (id_compromiso_contraloria) {
         this.compromiso = gcf.findCompromisoById(this.compromisos, id_compromiso_contraloria);
         this.hallazgo = gcf.findHallazgoById(this.hallazgos, this.compromiso.id_hallazgo_contraloria);
         this.compromiso.nombre_hallazgo_contraloria = this.hallazgo.nombre_hallazgo_contraloria;
         this.compromiso.seguimiento_no_reprogramado = this.seguimiento_no_reprogramado(this.compromiso);
         this.compromiso.seguimiento_reprogramado = this.seguimiento_reprogramado(this.compromiso);

         this.compromiso.updated_at = this.compromiso.seguimiento_contraloria ? this.compromiso.seguimiento_contraloria[this.compromiso.seguimiento_contraloria.length-1].updated_at : 'Sin seguimientos ingresados';

         return this.showModal = true;
      },
      showModalCompromiso: function (id_compromiso_contraloria) {
         //this.compromisos_responsables = this.compromisos_responsablesTmp;

         this.compromisos_responsables = _.filter(this.compromisos_responsables, function(cr){
            return cr.id_compromiso_contraloria == id_compromiso_contraloria;
         });

         this.compromiso = gcf.findCompromisoById(this.compromisos, id_compromiso_contraloria);
         this.hallazgo = gcf.findHallazgoById(this.hallazgos, this.compromiso.id_hallazgo_contraloria);

         this.compromiso.nombre_hallazgo_contraloria = this.hallazgo.nombre_hallazgo_contraloria;
         this.compromiso.seguimiento_no_reprogramado = this.seguimiento_no_reprogramado(this.compromiso);
         this.compromiso.seguimiento_reprogramado = this.seguimiento_reprogramado(this.compromiso);

         this.compromiso.estado =
            this.compromiso.seguimiento_contraloria[this.compromiso.seguimiento_contraloria.length-1].estado || 'Pendiente ingreso segumiento';
         this.compromiso.condicion =
            this.compromiso.seguimiento_contraloria[this.compromiso.seguimiento_contraloria.length-1].condicion || 'Pendiente ingreso segumiento';
         this.compromiso.porcentaje_avance = parseInt(this.compromiso.seguimiento_contraloria[this.compromiso.seguimiento_contraloria.length-1].porcentaje_avance);
         this.compromiso.updated_at = this.compromiso.seguimiento_contraloria ? this.compromiso.seguimiento_contraloria[this.compromiso.seguimiento_contraloria.length-1].updated_at : 'Sin seguimientos ingresados';
         return this.showModalEditarCompromiso = true;
      },
      /* for transition group flip */
      shuffle: function (items) {return _.shuffle(items)},
      seguimiento_reprogramado: function (compromiso){
         let compromisoTmp = compromiso;
         let ctd_seguimientos_rpg = _.filter(compromisoTmp.seguimiento_contraloria, function (s) {
            return s.estado == 'Reprogramado';
         });
         compromiso.ctd_seguimientos_rpg = ctd_seguimientos_rpg.length || 0;
         return ctd_seguimientos_rpg.length || 0;
      },
      seguimiento_no_reprogramado: function (compromiso){
         let compromisoTmp = compromiso;
         let ctd_seguimientos_norpg = _.filter(compromisoTmp.seguimiento_contraloria, function (s) {
            return s.estado != 'Reprogramado';
         });
         compromiso.ctd_seguimientos_norpg = ctd_seguimientos_norpg.length || 0;
         return ctd_seguimientos_norpg.length || 0;
      },

      //with_dash() => for explained specific functions
      cambiar_form_compromiso_editable: function(id_compromiso_contraloria){
         this.form_compromiso_editable = (this.form_compromiso_editable == false ? true : false);
         return this.form_compromiso_editable = id_compromiso_contraloria;
      },
      guardar_form_compromiso_editable: function(id_compromiso_contraloria,cindex){
         if((this.form_compromiso_editable != 0 || cindex == 0) && id_compromiso_contraloria != 0){
            //Lo guarda, verifica si los datos del objeto que son necesarios son iguales, sino que no lo guarde
            let compromisoTmp = {};
            if (cindex == 0) {
               compromisoTmp = this.compromiso;
            }else{
               compromisoTmp = this.compromisos[cindex];
            }

            //console.log(compromisoTmp);
            Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
            this.$http.put('/compromiso_contraloria/'+id_compromiso_contraloria, compromisoTmp).then(response => {
               //console.log(response.body);
               this.form_compromiso_editable = 0;
               this.showModalEditarCompromiso = false;
               var self = this;
               setTimeout(() => {
                  self.fetchCompromisos();
               }, 500);
            }, response => {
               // error callback
            });
         }else{
            //Lo guarda
         }
      },
      guardar_nuevo_compromiso: function () {
         if (this.permiteGuardarNuevoCompromiso == true){
            this.permiteGuardarNuevoCompromiso = false;
            if (this.nuevo_compromiso.nombre_compromiso_contraloria != '' &&
               this.nuevo_compromiso.plazo_estimado != '' &&
               this.nuevo_compromiso.plazo_comprometido != '' &&
               this.nuevo_compromiso != {}) {
               //console.log(this.nuevo_compromiso);
               this.form_compromiso_creable = 0;
               this.showModalNuevoCompromiso = false;
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               this.$http.post('/compromiso_contraloria', this.nuevo_compromiso).then(response => {
                  //alert('Compromiso creado.');
                  var self = this;
                  setTimeout(function() {
                     //self.$parent.$options.methods.fetchHallazgos();
                     //Cuando guarda hallazgo sin asociar procedimiento disciplinario
                     //self.$parent.fetchHallazgos();
                     self.fetchCompromisos();
                     self.limpiarNuevoCompromiso();
                     self.form_compromiso_creable = 0;
                  }, 500);

               }, response => {});

            }else{
               this.permiteGuardarNuevoCompromiso = true;
            }
         }else{
            alert('Se esta procesando la solicitud');
         }
      },
      guardar_nuevo_seguimiento: function (){

         if (this.permiteGuardarNuevoSeguimiento == true){
            this.permiteGuardarNuevoSeguimiento = false;
            if (this.nuevo_seguimiento.porcentaje_avance != '' &&
               typeof this.nuevo_seguimiento.porcentaje_avance != 'undefined' &&
               this.nuevo_seguimiento.estado != '' &&
               this.nuevo_seguimiento != {}) {

               this.spinner_upload = true;
               var formData = new FormData();
               $.each(this.nuevo_seguimiento.documento_adjunto, function(i, file) {
                  formData.append('documento_adjunto[]', file);
               });

               formData.append('id_compromiso_contraloria', this.nuevo_seguimiento.id_compromiso_contraloria);
               formData.append('diferencia_tiempo', this.nuevo_seguimiento.diferencia_tiempo);
               formData.append('usuario_registra', this.nuevo_seguimiento.usuario_registra);
               formData.append('porcentaje_avance', this.nuevo_seguimiento.porcentaje_avance);
               formData.append('estado', this.nuevo_seguimiento.estado);
               formData.append('observacion', this.nuevo_seguimiento.observacion || '');
               formData.append('razon_no_cumplimiento', this.nuevo_seguimiento.razon_no_cumplimiento || '');
               formData.append('_token', $('#_token').val());
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               const config = { headers: { 'Content-Type': 'multipart/form-data' } };
               this.$http.post('/seguimiento_contraloria', formData, config).then(response => {
                  var self = this;
                  setTimeout(() => {
                     self.fetchCompromisos();
                  }, 500);
                  this.limpiarNuevoSeguimiento();
                  this.form_seguimiento_creable = 0;
                  this.showModalNuevoSeguimiento = false;
                  this.spinner_upload = false;
               }, response => {
               });

            }else{
               this.permiteGuardarNuevoSeguimiento = true;
            }
         }else{
            alert('Se esta procesando la solicitud');
         }
      },
   },
});

var SeguimientoController = new Vue({
   el: '#SeguimientoController',
   data(){
      return {
         'contraloria':{},
         'area_contraloria':[],
         'estado_contraloria':[],

         'hallazgos':{},
         'hallazgosTmp':{},
         'hallazgo':[],

         'compromisos':[],
         'compromisosTmp':[],
         'compromiso':[],

         'seguimiento':[],
         'seguimientos':[],
         'seguimientosTmp':[],

         'porcentajes_cumplimiento':{0:0,1:10,2:20,3:30,4:40,5:50,6:60,7:70,8:80,9:90,10:100},

         'compromisos_responsables':[],
         'compromisos_responsablesTmp':[],

         'hallazgos_responsables':[],
         'hallazgos_responsablesTmp':[],

         'archivos':[],
         'usuarios':[],
         'config':[],
         'role':[],
         'auth':[],
         'auditor':[],
         'criticidad':[],
         'clasificacion_materia':[],
         'historico_hallazgos':[],
         'historico_hallazgosTmp':[],

         'hallazgo_historico_procedimientos_disciplinarios':[],
         'hallazgo_procedimientos_disciplinarios':[],

         'tipo_proceso_disciplinario':[],
         'estado_proceso_disciplinario':[],
         'compromisos_responsables':[],
         'hallazgos_responsables':[],
         'hallazgos_responsablesTmp':[],

         'nuevo_seguimiento':{
            'id_compromiso_contraloria' : '',
            'id_hallazgo_contraloria' : '',
            'diferencia_tiempo' : '',
            'documento_adjunto' : {},
            'usuario_registra' : 1,
            'estado' : '',
            'condicion' : '',
            'porcentaje_avance' : 0,
            'razon_no_cumplimiento' : '',
            'observacion' : '',
         },

         'index':0,
         'ctd_hallazgos':0,
         'ctd_compromisos':0,
         'ctd_seguimientos':0,
         'ctd_req_hallazgos':0,
         'filterTerm':'',
         'filterIdHallazgo':'',
         'filterIdCompromiso':'',
         'filterIdSeguimiento':'',

         'form_seguimiento_editable':0,
         'form_seguimiento_creable':0,

         'gridOrder':'asc',
         'mensajeResultadoConFiltros':false,
         'filtroEstado':false,
         'filtroCondicion':false,
         'filtroObservacion':false,
         'filtroRazonNoCumplimiento':false,
         'filtroIdHallazgo':false,
         'filtroIdCompromiso':false,
         'showModal':false,
         'showModalNuevoSeguimiento':false,
         'permiteGuardarNuevoSeguimiento': true,
         'spinner_upload': false,

         'seguimientosFiltroEstado':{},
         'seguimientosFiltroCondicion':{},
         'seguimientosFiltroObservacion':{},
         'seguimientosFiltroRazonNoCumplimiento':{},
         'seguimientosFiltroIdHallazgo':{},
         'seguimientosFiltroIdCompromiso':{},
         'excel_json_fields': {
            'id_hallazgo_contraloria': 'String',
            'nombre_hallazgo_contraloria': 'String',
            'id_compromiso_contraloria': 'String',
            'nombre_compromiso_contraloria': 'String',
            'id_seguimiento_contraloria': 'String',
            'estado': 'String',
            //'condicion': 'String',
            'porcentaje_avance': 'String',
            'usuario_registra': 'String',
            'observacion': 'String',
            'razon_no_cumplimiento': 'String',
            'fercha_creacion': 'String',
         },
         excel_json_data: [],
         excel_data_count: '',
         append_to_json_excel: {},

         'excel_selection_seguimientos':[//excel_selection_json_fields
            { 'field':'id_hallazgo_contraloria', 'name':'id','isVisible':true },
            { 'field':'nombre_hallazgo_contraloria', 'name':'hallazgo', 'isVisible':true },
            { 'field':'id_compromiso_contraloria', 'name':'id compromiso', 'isVisible':true },
            { 'field':'nombre_compromiso_contraloria', 'name':'compromiso', 'isVisible':true },
            { 'field':'id_seguimiento_contraloria', 'name':'id seguimiento', 'isVisible':true },
            { 'field':'estado', 'name':'estado', 'isVisible':true },
            { 'field':'porcentaje_avance', 'name':'porcentaje de avance', 'isVisible':true },
            { 'field':'usuario_registra', 'name':'usuario que registra', 'isVisible':true },
            { 'field':'observacion', 'name':'observacion', 'isVisible':true },
            { 'field':'razon_no_cumplimiento', 'name':'razon no cumplimiento', 'isVisible':true },
            { 'field':'created_at', 'name':'fecha creacion', 'isVisible':true },
         ],

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
               'id_hallazgo_contraloria': s.id_hallazgo_contraloria,
               'nombre_hallazgo_contraloria': s.nombre_hallazgo_contraloria,
               'id_compromiso_contraloria': s.id_compromiso_contraloria,
               'nombre_compromiso_contraloria': s.nombre_compromiso_contraloria,
               'id_seguimiento_contraloria': s.id_seguimiento_contraloria,
               'estado': s.estado,
               //'condicion': s.condicion,
               'porcentaje_avance': s.porcentaje_avance,
               'usuario_registra': s.usuario_registra,
               'observacion': s.observacion || 'Sin observaciones',
               'razon_no_cumplimiento': s.razon_no_cumplimiento || 'Sin razones',
               'fercha_creacion': s.created_at,
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
         ready () {},
         created(){},
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
         ready () {},
         created(){},
         filters: {},
         methods: {},
      },
      'modal':{
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
                                          <dd class="well well-sm">{{seguimiento.id_hallazgo_contraloria || '0'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Id del Compromiso</dt>
                                          <dd class="well well-sm">{{seguimiento.id_compromiso_contraloria || '0'}}</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Nombre del Hallazgo</dt>
                                          <dd class="well well-sm">{{seguimiento.nombre_hallazgo_contraloria || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Nombre del Compromiso</dt>
                                          <dd class="well well-sm">{{seguimiento.nombre_compromiso_contraloria || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Id del Seguimiento</dt>
                                          <dd class="well well-sm">{{seguimiento.id_seguimiento_contraloria || '0'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Porcentaje Avance</dt>
                                          <dd class="well well-sm">{{seguimiento.porcentaje_avance || '0'}}%</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Estado</dt>
                                          <dd class="well well-sm">{{seguimiento.estado || 'Sin estado ingresado'}}</dd>
                                       </div>
                                       <!--
                                       <div class="col-md-6">
                                          <dt>Condicion</dt>
                                          <dd class="well well-sm">{{seguimiento.condicion || 'Sin condicion ingresado'}}</dd>
                                       </div>
                                       -->
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
                                          <dd class="well well-sm">{{seguimiento.usuario_registra || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Razon</dt>
                                          <dd class="well well-sm">{{seguimiento.razon_no_cumplimiento || 'Sin Razones'}}</dd>
                                       </div>
                                       <div class="col-md-6">
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
      },
      'modal-nuevoseguimiento':{
         props: ['nuevo_seguimiento', 'porcentajes_cumplimiento', 'auth', 'estado_contraloria'],
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

                                          <!-- Documentos Adjuntos -->
                                          <dt>Documentos Adjuntos:</dt>
                                          <dd>
                                             <input multiple="multiple" name="documento_adjunto[]" type="file"
                                                      @change="onFileChange" size="10">
                                          </dd>
                                          <br />

                                          <!-- Razon no Cumplimiento -->
                                          <dt>Razon no Cumplimiento:</dt>
                                          <dd>
                                             <textarea class="scroll_textarea_original" rows="5"
                                                       v-model="nuevo_seguimiento.razon_no_cumplimiento">
                                                @{{ nuevo_seguimiento.razon_no_cumplimiento }}
                                             </textarea>
                                          </dd>


                                       </div><!-- .col-md-* -->


                                       <div class="col-md-6">

                                      		<!-- Porcentaje de Avance -->
                                          <dt>Porcentaje de Avance (*):</dt>
                                          <dd v-if="auth.role != undefined &&
                                             auth.role.role != 'Usuario Auditado' && auth.role.role != 'Usuario Auditado Contraloria'">
                                             <p class="control has-icon has-icon-right">
                                                <select name="porcentaje_avance" v-model="nuevo_seguimiento.porcentaje_avance"
                                                      v-validate="'required'" data-vv-delay="500"
                                                      :class="{'input': true, 'text-danger': errors.has('porcentaje_avance'),
                                                      'form-control':true}">

                                                   <option v-for="p in porcentajes_cumplimiento" :value="p">
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
                                          <dd v-if="auth.role != undefined &&
                                             auth.role.role != 'Usuario Auditado' && auth.role.role != 'Usuario Auditado Contraloria'">
                                             <p class="control has-icon has-icon-right">
                                                <select name="estado" v-model="nuevo_seguimiento.estado"
                                                      v-validate="'required'" data-vv-delay="500"
                                                      :class="{'input': true, 'text-danger': errors.has('estado'), 'form-control':true}">

                                                   <option v-for="(v,e) in estado_contraloria" :value="e">{{v}}</option>

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

                                          <!-- Observacion -->
                                          <dt>Justificacion de Avance:</dt>
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
            return {

            }
         },
         ready () {
         },
         created () {
         },
         filters: {
            replacePorcentajeAvance(porcentaje_avance) {
               if (porcentaje_avance != null) {porcentaje_avance = porcentaje_avance.replace('porcentaje_avance', 'porcentaje de avance');}
               return porcentaje_avance;
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
            onFileChange: function(e) {
               var files = e.target.files || e.dataTransfer.files;
               var filesOverSizeLimit = [];
               var filesOk = [];

               $(files).each(function(f){
                  //console.log(files[f].size); //tamaño
                  //console.log(files[f].name); //nombre
                  if (files[f].size > 10240000) {
                     filesOverSizeLimit.push(files[f]);
                  }else{
                     filesOk.push(files[f]);
                  }
               });

               if (filesOverSizeLimit.length > 0) {
                  let textNameFilesOverSizeLimit = '';
                  let textNameFilesOk = '';
                  $(filesOverSizeLimit).each(function(f){
                     textNameFilesOverSizeLimit += "\n · "+filesOverSizeLimit[f].name;
                  });
                  $(filesOk).each(function(f){
                     textNameFilesOk += "\n · "+filesOk[f].name;
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
         watch: {
         },
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
      agregarFiltroEstadoGrid: function(estado){
         if(!this.filtroEstado){
            this.filtroEstado = true;
            this.seguimientosFiltroEstado = this.seguimientos;
         }else{
            this.seguimientos = this.seguimientosFiltroEstado;
         }
         //Itero la lista de seguimientos y filtro segun estado seleccionado
         this.seguimientos = _.filter(this.seguimientos, function (s) {
            return s.estado == estado;
         });
         if(this.seguimientos.length == 0){
            this.seguimientos = this.seguimientosFiltroEstado;
            alert('Sin resultados para "'+estado+'"');
            //this.limpiarFiltros();
         }
      },
      agregarFiltroCondicionGrid: function(condicion){
         if(!this.filtroCondicion){
            this.filtroCondicion = true;
            this.seguimientosFiltroCondicion = this.seguimientos;
         }else{
            this.seguimientos = this.seguimientosFiltroCondicion;
         }

         //Itero la lista de seguimientos y filtro segun la condicion seleccionada
         this.seguimientos = _.filter(this.seguimientos, function (s) {
            return s.condicion == condicion;
         });

         if(this.seguimientos.length == 0){
            this.seguimientos = this.seguimientosFiltroCondicion;
            alert('Sin resultados para "'+condicion+'"');
            //this.limpiarFiltros();
         }
      },
      agregarFiltroObservacionGrid: function(observacion){
         if(!this.filtroObservacion){
            this.filtroObservacion = true;
            this.seguimientosFiltroObservacion = this.seguimientos;
         }else{
            this.seguimientos = this.seguimientosFiltroObservacion;
         }

         //Itero la lista de seguimientos y filtro segun la observacion seleccionada
         this.seguimientos = _.filter(this.seguimientos, function (s) {
            s.observacion = s.observacion || 'Sin observacion';
            return s.observacion == observacion;
         });

         if(this.seguimientos.length == 0){
            this.seguimientos = this.seguimientosFiltroObservacion;
            alert('Sin resultados para "'+observacion+'"');
            //this.limpiarFiltros();
         }
      },
      agregarFiltroRazonNoCumplimientoGrid: function(razonNoCumplimiento){
         if(!this.filtroRazonNoCumplimiento){
            this.filtroRazonNoCumplimiento = true;
            this.seguimientosFiltroRazonNoCumplimiento = this.seguimientos;
         }else{
            this.seguimientos = this.seguimientosFiltroRazonNoCumplimiento;
         }

         //Itero la lista de seguimientos y filtro segun la observacion seleccionada
         this.seguimientos = _.filter(this.seguimientos, function (s) {
            s.razon_no_cumplimiento = s.razon_no_cumplimiento || 'Sin razones';
            return s.razon_no_cumplimiento == razonNoCumplimiento;
         });

         if(this.seguimientos.length == 0){
            this.seguimientos = this.seguimientosFiltroRazonNoCumplimiento;
            alert('Sin resultados para "'+razonNoCumplimiento+'"');
            //this.limpiarFiltros();
         }
      },
      agregarFiltroIdHallazgoGrid: function(){
         if(!this.filtroIdHallazgo){
            this.filtroIdHallazgo = true;
            this.seguimientosFiltroIdHallazgo = this.seguimientos;
         }else{
            this.seguimientos = this.seguimientosFiltroIdHallazgo;
         }

         var self = this;
         //Itero la lista de hallazgos y filtro segun el id hallazgo ingresado
         this.seguimientos = _.filter(this.seguimientos, function (s) {
            return s.id_hallazgo_contraloria == self.filterIdHallazgo;
         });
         /*
         if(this.seguimientos.length == 0){
            this.seguimientos = this.seguimientosFiltroIdHallazgo;
            if (this.filterIdHallazgo == '') return;
            else alert('Sin resultados para el id ingresado');
         }
         */
      },
      agregarFiltroIdCompromisoGrid: function(){
         if(!this.filtroIdCompromiso){
            this.filtroIdCompromiso = true;
            this.seguimientosFiltroIdCompromiso = this.seguimientos;
         }else{
            this.seguimientos = this.seguimientosFiltroIdCompromiso;
         }

         var self = this;
         //Itero la lista de hallazgos y filtro segun el id hallazgo ingresado
         this.seguimientos = _.filter(this.seguimientos, function (c) {
            return c.id_compromiso_contraloria == self.filterIdCompromiso;
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
      calcularDiferenciaTiempo: function (plazo_comprometido){
         plazo_comprometido = plazo_comprometido.split('-');
         var today = new Date();
         var dd = today.getDate();
         var mm = today.getMonth()+1; //January is 0!
         var yyyy = today.getFullYear();

         var date1 = new Date(plazo_comprometido[1]+'/'+plazo_comprometido[0]+'/'+plazo_comprometido[2]);
         var date2 = new Date(mm+'/'+dd+'/'+yyyy);
         var timeDiff = Math.abs(date2.getTime() - date1.getTime());
         var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
         return diffDays;
      },
      crear_nuevo_seguimiento: function (nuevo_seguimiento){

         if(!nuevo_seguimiento.id_compromiso_contraloria ||
            nuevo_seguimiento.id_compromiso_contraloria == null ||
            nuevo_seguimiento.id_compromiso_contraloria == '') {
            alert('Debe seleccionar un compromiso');
            return ;
         }

         var compromiso = gcf.findCompromisoById(this.compromisos, nuevo_seguimiento.id_compromiso_contraloria);

         this.form_seguimiento_creable = compromiso.id_compromiso_contraloria;

         this.nuevo_seguimiento.id_compromiso_contraloria = compromiso.id_compromiso_contraloria;
         this.nuevo_seguimiento.diferencia_tiempo = compromiso.plazo_comprometido_dias;
         this.nuevo_seguimiento.porcentaje_avance = compromiso.porcentaje_avance;

         this.nuevo_seguimiento.estado = compromiso.estado;
         this.nuevo_seguimiento.condicion = compromiso.condicion;

         this.nuevo_seguimiento.usuario_registra = this.auth.id;

         this.showModalNuevoSeguimiento = true;
         this.permiteGuardarNuevoSeguimiento = true;

         return this.nuevo_seguimiento;
      },
      fetchSeguimientos: function (){
         this._gcf = gcf;
         let id_contraloria = $('#id_contraloria').val();
         this.$http.get('/contraloria/'+id_contraloria+'/edit/ajax').then(response => { // success callback
            //console.log(response);
            this.contraloria = response.body.contraloria;
            this.area_contraloria = response.body.area_contraloria;
            this.estado_contraloria = response.body.estado_contraloria;
            this.hallazgos = response.body.hallazgos;
            this.compromisos = response.body.compromisos;
            this.compromisos_responsables = response.body.compromisos_responsables;
            this.hallazgos_responsables = response.body.hallazgos_responsables;
            this.seguimientos = response.body.seguimientos;
            this.archivos = response.body.archivos;
            this.archivosTmp = response.body.archivos;
            this.usuarios = response.body.usuarios;
            this.config = response.body.config;
            this.auth = response.body.auth;
            this.role = response.body.role;
            this.auditor = response.body.auditor;
            this.tipo_proceso_disciplinario = response.body.tipo_proceso_disciplinario;
            this.estado_proceso_disciplinario = response.body.estado_proceso_disciplinario;
            this.responsable_proceso_disciplinario = response.body.responsable_proceso_disciplinario;
            this.criticidad = response.body.criticidad;
            this.clasificacion_materia = response.body.clasificacion_materia;
            this.historico_hallazgos = response.body.historico_hallazgos;
            this.historico_hallazgosTmp = response.body.historico_hallazgos;
            this.hallazgo_historico_procedimientos_disciplinarios = response.body.hallazgo_historico_procedimientos_disciplinarios;
            this.hallazgo_procedimientos_disciplinarios = response.body.hallazgo_procedimientos_disciplinarios;

            this.preloadSeguimientos();

            //Manda el controller que llama al metodo
            gcf.refetchControllersData({
               'contraloria':this.contraloria,
               'area_contraloria':this.area_contraloria,
               'estado_contraloria':this.estado_contraloria,
               'hallazgos':this.hallazgos,
               'hallazgosTmp':this.hallazgos,
               'compromisos':this.compromisos,
               'compromisosTmp':this.compromisos,
               'compromisos_responsables':this.compromisos_responsables,
               'compromisos_responsablesTmp':this.compromisos_responsables,
               'hallazgos_responsables':this.hallazgos_responsables,
               'hallazgos_responsablesTmp':this.hallazgos_responsables,
               'seguimientos':this.seguimientos,
               'seguimientosTmp':this.seguimientos,
               'archivos':this.archivos,
               'archivosTmp':this.archivos,
               'usuarios':this.usuarios,
               'config':this.config,
               'auth':this.auth,
               'role':this.role,
               'auditor':this.auditor,
               'tipo_proceso_disciplinario':this.tipo_proceso_disciplinario,
               'estado_proceso_disciplinario':this.estado_proceso_disciplinario,
               'responsable_proceso_disciplinario':this.responsable_proceso_disciplinario,
               'criticidad':this.criticidad,
               'clasificacion_materia':this.clasificacion_materia,
               'historico_hallazgos':this.historico_hallazgos,
               'historico_hallazgosTmp':this.historico_hallazgosTmp,
               'hallazgo_historico_procedimientos_disciplinarios':this.hallazgo_historico_procedimientos_disciplinarios,
               'hallazgo_procedimientos_disciplinarios':this.hallazgo_procedimientos_disciplinarios,
            },{
               'HallazgoController':'HallazgoController',
               'CompromisoController':'CompromisoController',
               'ArchivoController':'ArchivoController',
               'ResponsableController':'ResponsableController',
               'ProcedimientosDisciplinariosController':'ProcedimientosDisciplinariosController',
            }, 'SeguimientoController');

            this.ctd_req_hallazgos = this.contraloria.cantidad_hallazgo_contraloria; // : cantidad de hallazgos especificados al inicio para el contraloria
            this.ctd_hallazgos = this.hallazgos.length; // : cantidad actual de hallazgos referenciados al contraloria
            this.ctd_compromisos = this.compromisos.length;//this.ctd_compromisos = 0;
            this.ctd_seguimientos = this.seguimientos.length;

            ProcedimientosDisciplinariosController.ctd_req_hallazgos = CompromisoController.ctd_req_hallazgos = HallazgoController.ctd_req_hallazgos = ArchivoController.ctd_req_hallazgos = ResponsableController.ctd_req_hallazgos = this.ctd_req_hallazgos;
            ProcedimientosDisciplinariosController.ctd_hallazgos = CompromisoController.ctd_hallazgos = HallazgoController.ctd_hallazgos = ArchivoController.ctd_hallazgos = ResponsableController.ctd_hallazgos = this.ctd_hallazgos;
            ProcedimientosDisciplinariosController.ctd_compromisos = CompromisoController.ctd_compromisos = HallazgoController.ctd_compromisos = ArchivoController.ctd_compromisos = ResponsableController.ctd_compromisos = this.ctd_compromisos;
            ProcedimientosDisciplinariosController.ctd_seguimientos = CompromisoController.ctd_seguimientos = HallazgoController.ctd_seguimientos = ArchivoController.ctd_seguimientos = ResponsableController.ctd_seguimientos = this.ctd_seguimientos;


            ProcedimientosDisciplinariosController._gcf = CompromisoController._gcf = HallazgoController._gcf = ArchivoController._gcf = ResponsableController._gcf = this._gcf;


         }, response => { // error callback
            console.log('Error fetchCompromisos: '+response);
         });
      },
      filterGridSeguimientoByComboHallazgo: function (id_hallazgo) {
         this.filterIdHallazgo = id_hallazgo || null;
         if (this.filterIdHallazgo != null) {
            return this.agregarFiltroIdHallazgoGrid();
         }else{
            //alert('Debe seleccionar un hallazgo');
            this.limpiarFiltros();
         } return;
      },
      filterGridSeguimientoByComboCompromiso: function (id_compromiso) {
         this.limpiarFiltros();
         this.filterIdCompromiso = id_compromiso || null;
         if (this.filterIdCompromiso != null) {
            return this.agregarFiltroIdCompromisoGrid();
         }else{
            //alert('Debe seleccionar un compromiso');
            this.limpiarFiltros();
         } return;
      },
      limpiarFiltros: function() {
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
            'id_hallazgo_contraloria' : '',
            'id_compromiso_contraloria' : '',
            'diferencia_tiempo' : '',
            'documento_adjunto' : {},
            'estado' : '',
            'condicion' : '',
            'porcentaje_avance' : '',
            'plazo_estimado':'',
            'plazo_comprometido':'',
         }
      },
      // function to order users in the list
      orderLists: function (column) {
         this.seguimientos = _.orderBy(this.seguimientos, column, this.gridOrder);
         //console.log(column);
         //this.lists = this.shuffle(_.orderBy(this.lists, 'name', this.listOrder));
         //console.log(this.lists.length);
      },
      hideFieldGridSeguimiento: function (fieldName) {
         for (let f in this.excel_selection_seguimientos) {
            if (this.excel_selection_seguimientos[f].field == fieldName) {
               return this.excel_selection_seguimientos[f].isVisible = !this.excel_selection_seguimientos[f].isVisible;
            }
         }
      },
      restoreFieldGridSeguimiento: function (fieldName) {
         for (let f in this.excel_selection_seguimientos) {
            if (this.excel_selection_seguimientos[f].field == fieldName) {
               return this.excel_selection_seguimientos[f].isVisible = !this.excel_selection_seguimientos[f].isVisible;
            }
         }
      },
      preloadSeguimientos: function () {
         //Para hallazgos y compromisos
         for (let c in this.compromisos) {
            this.compromisos[c].plazo_comprometido_dias = this.calcularDiferenciaTiempo(this.compromisos[c].plazo_comprometido) || 0;
         }

         //Para Seguimientos
         for (let s in this.seguimientos) {
            this.seguimientos[s].id_hallazgo_contraloria =
               gcf.findCompromisoById(this.compromisos,this.seguimientos[s].id_compromiso_contraloria).id_hallazgo_contraloria;
            this.seguimientos[s].nombre_hallazgo_contraloria =
               gcf.findHallazgoById(this.hallazgos, this.seguimientos[s].id_hallazgo_contraloria).nombre_hallazgo_contraloria;
            this.seguimientos[s].nombre_compromiso_contraloria =
               gcf.findCompromisoById(this.compromisos,this.seguimientos[s].id_compromiso_contraloria).nombre_compromiso_contraloria;
            this.seguimientos[s].usuario_registra =
               gcf.findById(this.usuarios,this.seguimientos[s].usuario_registra);
            this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra ?
               this.seguimientos[s].usuario_registra.name : 'Sistema';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';
         }

         //Para Archivos
         for (let a in this.archivos) {
            this.archivos[a].id_hallazgo_contraloria =
               gcf.findCompromisoById(this.compromisos,this.archivos[a].id_compromiso_contraloria).id_hallazgo_contraloria;
            this.archivos[a].nombre_hallazgo_contraloria =
               gcf.findHallazgoById(this.hallazgos, this.archivos[a].id_hallazgo_contraloria).nombre_hallazgo_contraloria;
            this.archivos[a].nombre_compromiso_contraloria =
               gcf.findCompromisoById(this.compromisos,this.archivos[a].id_compromiso_contraloria).nombre_compromiso_contraloria;
            this.archivos[a].usuario_registra =
               gcf.findById(this.usuarios,this.archivos[a].usuario_registra);
            this.archivos[a].usuario_registra = this.archivos[a].usuario_registra ? this.archivos[a].usuario_registra.name : 'Sistema';
            this.archivos[a].observacion = this.archivos[a].observacion || 'Sin Observacion';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';
         }

         //Para Responsables
         for (let r in this.compromisos_responsables) {
            this.compromisos_responsables[r].id_hallazgo_contraloria =
               gcf.findCompromisoById(this.compromisos,this.compromisos_responsables[r].id_compromiso_contraloria).id_hallazgo_contraloria;
            this.compromisos_responsables[r].nombre_hallazgo_contraloria =
               gcf.findHallazgoById(this.hallazgos, this.compromisos_responsables[r].id_hallazgo_contraloria).nombre_hallazgo_contraloria;
            this.compromisos_responsables[r].nombre_compromiso_contraloria =
               gcf.findCompromisoById(this.compromisos,this.compromisos_responsables[r].id_compromiso_contraloria).nombre_compromiso_contraloria;
            this.compromisos_responsables[r].area = this.compromisos_responsables[r].area_contraloria.descripcion;
         }

         //Para Hallazgos historico // Procedimientos disciplinarios
         for (let h in this.historico_hallazgos) {
            let hh = gcf.findHallazgoById(this.hallazgos, this.historico_hallazgos[h].id_hallazgo_contraloria);
            this.historico_hallazgos[h].nombre_hallazgo_contraloria = hh.nombre_hallazgo_contraloria ;
            this.historico_hallazgos[h].id_hallazgo_contraloria = hh.id_hallazgo_contraloria ;
         }

      },
      showModalData: function (id_seguimiento_contraloria) {
         this.seguimiento = gcf.findSeguimientoById(this.seguimientos, id_seguimiento_contraloria);
         this.compromiso = gcf.findCompromisoById(this.compromisos, this.seguimiento.id_compromiso_contraloria);
         this.hallazgo = gcf.findHallazgoById(this.hallazgos, this.compromiso.id_hallazgo_contraloria);
         this.seguimiento.id_hallazgo = this.hallazgo.id_hallazgo_contraloria;
         this.seguimiento.nombre_hallazgo = this.hallazgo.nombre_hallazgo_contraloria;
         this.seguimiento.id_compromiso = this.compromiso.id_compromiso_contraloria;
         this.seguimiento.nombre_compromiso = this.compromiso.nombre_compromiso_contraloria;
         this.seguimiento.usuario_registra = gcf.findById(this.usuarios,this.seguimiento.usuario_registra);
         this.seguimiento.usuario_registra = this.seguimiento.usuario_registra ?
            this.seguimiento.usuario_registra.name : 'Sistema';
         return this.showModal = true;
      },
      /* for transition group flip */
      shuffle: function (items) {return _.shuffle(items)},
      seguimiento_reprogramado: function (seguimiento){
         let seguimientoTmp = seguimiento;
         let ctd_seguimientos_rpg = _.filter(seguimientoTmp.seguimiento_contraloria, function (s) {
            return s.estado == 'Reprogramado';
         });
         seguimiento.ctd_seguimientos_rpg = ctd_seguimientos_rpg.length || 0;
         return ctd_seguimientos_rpg.length || 0;
      },
      seguimiento_no_reprogramado: function (seguimiento){
         let seguimientoTmp = seguimiento;
         let ctd_seguimientos_norpg = _.filter(seguimientoTmp.seguimiento_contraloria, function (s) {
            return s.estado != 'Reprogramado';
         });
         seguimiento.ctd_seguimientos_norpg = ctd_seguimientos_norpg.length || 0;
         return ctd_seguimientos_norpg.length || 0;
      },

      //with_dash() => for explained specific functions
      cambiar_form_seguimiento_editable: function(id_seguimiento_contraloria){
         this.form_seguimiento_editable = (this.form_seguimiento_editable == false ? true : false);
         return this.form_seguimiento_editable = id_seguimiento_contraloria;
      },
      filtrar_compromisos_nuevo_seguimiento: function (id_hallazgo) {
         this.limpiarFiltros();
         var hallazgo = gcf.findHallazgoById(this.hallazgos, id_hallazgo);
         this.nuevo_seguimiento.id_compromiso_contraloria = '';
         this.filterGridSeguimientoByComboHallazgo(id_hallazgo);
      },
      guardar_form_seguimiento_editable: function(id_seguimiento_contraloria,cindex){
         if(this.form_seguimiento_editable != 0 && id_seguimiento_contraloria != 0){
            //Lo guarda, verifica si los datos del objeto que son necesarios son iguales, sino que no lo guarde
            let seguimientoTmp = this.seguimientos[cindex];
            //console.log(seguimientoTmp);
            //console.log(seguimientoTmp);
            Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
            this.$http.put('/seguimiento_contraloria/'+id_seguimiento_contraloria, seguimientoTmp).then(response => {
               //console.log(response.body);
               this.form_seguimiento_editable = 0;
            }, response => {
               // error callback
            });
            //if()
         }else{
            //Lo guarda
         }
      },
      guardar_nuevo_seguimiento: function (){

         if (this.permiteGuardarNuevoSeguimiento == true){
            this.permiteGuardarNuevoSeguimiento = false;
            if (this.nuevo_seguimiento.porcentaje_avance != '' &&
               typeof this.nuevo_seguimiento.porcentaje_avance != 'undefined' &&
               this.nuevo_seguimiento.estado != '' &&
               this.nuevo_seguimiento != {}) {

               this.spinner_upload = true;
               var formData = new FormData();
               $.each(this.nuevo_seguimiento.documento_adjunto, function(i, file) {
                  formData.append('documento_adjunto[]', file);
               });

               formData.append('id_compromiso_contraloria', this.nuevo_seguimiento.id_compromiso_contraloria);
               formData.append('diferencia_tiempo', this.nuevo_seguimiento.diferencia_tiempo);
               formData.append('usuario_registra', this.nuevo_seguimiento.usuario_registra);
               formData.append('porcentaje_avance', this.nuevo_seguimiento.porcentaje_avance);
               formData.append('estado', this.nuevo_seguimiento.estado);
               formData.append('observacion', this.nuevo_seguimiento.observacion || '');
               formData.append('razon_no_cumplimiento', this.nuevo_seguimiento.razon_no_cumplimiento || '');
               formData.append('_token', $('#_token').val());
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               const config = { headers: { 'Content-Type': 'multipart/form-data' } };
               this.$http.post('/seguimiento_contraloria', formData, config).then(response => {
                  var self = this;
                  setTimeout(() => {
                     self.fetchSeguimientos();
                     self.limpiarNuevoSeguimiento();
                     self.form_seguimiento_creable = 0;
                     self.showModalNuevoSeguimiento = false;
                     self.spinner_upload = false;
                  }, 500);
               }, response => {
               });

            }else{
               this.permiteGuardarNuevoSeguimiento = true;
            }
         }else{
            alert('Se esta procesando la solicitud');
         }
      },
   },
});

var ArchivoController = new Vue({
   el: '#ArchivoController',
   data(){
      return {
         'contraloria':{},
         'area_contraloria':[],
         'estado_contraloria':[],
         'hallazgos':{},
         'hallazgosTmp':{},
         'compromisos':[],
         'compromisosTmp':[],
         'seguimientos':[],
         'seguimientosTmp':[],
         'archivos':[],
         'archivo':[],
         'usuarios':[],
         'config':[],
         'role':[],
         'auth':[],
         'auditor':[],
         'criticidad':[],
         'index':0,
      /**/'porcentajes_cumplimiento':{0:0,1:10,2:20,3:30,4:40,5:50,6:60,7:70,8:80,9:90,10:100},
         'filterTerm':'',
         'filterIdCompromiso':'',
         'filterIdHallazgo':'',
         'filterIdSeguimiento':'',
         'filterIdArchivo':'',
         'gridOrder':'asc',
         'mensajeResultadoConFiltros':false,
         'filtroDescripcion':false,
         'filtroObservacion':false,
         'filtroIdHallazgo':false,
         'filtroIdCompromiso':false,
         'showModal':false,
         'showModalNuevoSeguimiento':false,
         'permiteGuardarNuevoSeguimiento':false,
         'spinner_upload': false,
         'archivosFiltroDescripcion':{},
         'archivosFiltroIdHallazgo':{},
         'archivosFiltroIdCompromiso':{},
         /*
         'nuevo_archivo':{
            'id_hallazgo_contraloria' : '',
            'id_compromiso_contraloria' : '',
            'documento_adjunto' : {},
            'usuario_registra' : 1,
            'descripcion' : '',
         },
         */
         'nuevo_seguimiento':{
            'id_compromiso_contraloria' : '',
            'id_hallazgo_contraloria' : '',
            'documento_adjunto' : {},
            'usuario_registra' : 1,
         },

         'compromisos_responsables':[],
         'compromisos_responsablesTmp':[],
         'hallazgos_responsables':[],
         'hallazgos_responsablesTmp':[],
         'historico_hallazgos':[],
         'historico_hallazgosTmp':[],
         'hallazgo_historico_procedimientos_disciplinarios':[],
         'hallazgo_procedimientos_disciplinarios':[],

         'excel_json_fields': {
            'id_medio_verificacion_contraloria': 'String',
            'id_hallazgo_contraloria': 'String',
            'nombre_hallazgo_contraloria': 'String',
            'id_compromiso_contraloria': 'String',
            'nombre_compromiso_contraloria': 'String',
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
               'id_medio_verificacion_contraloria': a.id_medio_verificacion_contraloria,
               'id_hallazgo_contraloria': a.id_hallazgo_contraloria,
               'nombre_hallazgo_contraloria': a.nombre_hallazgo_contraloria,
               'id_compromiso_contraloria': a.id_compromiso_contraloria,
               'nombre_compromiso_contraloria': a.nombre_compromiso_contraloria,
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
         ready () {},
         created(){},
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
         ready () {},
         created(){},
         filters: {},
         methods: {},
      },
      'modal':{
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
                                          <dd class="well well-sm">{{archivo.id_hallazgo_contraloria || '0'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Id del Compromiso</dt>
                                          <dd class="well well-sm">{{archivo.id_compromiso_contraloria || '0'}}</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Nombre del Hallazgo</dt>
                                          <dd class="well well-sm">{{archivo.nombre_hallazgo_contraloria || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Nombre del Compromiso</dt>
                                          <dd class="well well-sm">{{archivo.nombre_compromiso_contraloria || 'Sin Definir'}}</dd>
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
      },
      'modal-nuevoseguimiento':{
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
            return {

            }
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
            onFileChange: function(e) {
               var files = e.target.files || e.dataTransfer.files;
               var filesOverSizeLimit = [];
               var filesOk = [];

               $(files).each(function(f){
                  //console.log(files[f].size); //tamaño
                  //console.log(files[f].name); //nombre
                  if (files[f].size > 10240000) {
                     filesOverSizeLimit.push(files[f]);
                  }else{
                     filesOk.push(files[f]);
                  }
               });

               if (filesOverSizeLimit.length > 0) {
                  let textNameFilesOverSizeLimit = '';
                  let textNameFilesOk = '';
                  $(filesOverSizeLimit).each(function(f){
                     textNameFilesOverSizeLimit += "\n · "+filesOverSizeLimit[f].name;
                  });
                  $(filesOk).each(function(f){
                     textNameFilesOk += "\n · "+filesOk[f].name;
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
         watch: {
         },
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
      agregarFiltroIdHallazgoGrid: function(){
         if(!this.filtroIdHallazgo){
            this.filtroIdHallazgo = true;
            this.archivosFiltroIdHallazgo = this.archivos;
         }else{
            this.archivos = this.archivosFiltroIdHallazgo;
         }

         var self = this;
         //Itero la lista de hallazgos y filtro segun el id hallazgo ingresado
         this.archivos = _.filter(this.archivos, function (s) {
            return s.id_hallazgo_contraloria == self.filterIdHallazgo;
         });
         /*
         if(this.archivos.length == 0){
            this.archivos = this.archivosFiltroIdHallazgo;
            if (this.filterIdHallazgo == '') return;
            else alert('Sin resultados para el id ingresado');
         }
         */
      },
      agregarFiltroIdCompromisoGrid: function(){
         if(!this.filtroIdCompromiso){
            this.filtroIdCompromiso = true;
            this.archivosFiltroIdCompromiso = this.archivos;
         }else{
            this.archivos = this.archivosFiltroIdCompromiso;
         }

         var self = this;
         //Itero la lista de hallazgos y filtro segun el id compromiso ingresado
         this.archivos = _.filter(this.archivos, function (s) {
            return s.id_compromiso_contraloria == self.filterIdCompromiso;
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
      calcularDiferenciaTiempo: function (plazo_comprometido){
         plazo_comprometido = plazo_comprometido.split('-');
         var today = new Date();
         var dd = today.getDate();
         var mm = today.getMonth()+1; //January is 0!
         var yyyy = today.getFullYear();

         var date1 = new Date(plazo_comprometido[1]+'/'+plazo_comprometido[0]+'/'+plazo_comprometido[2]);
         var date2 = new Date(mm+'/'+dd+'/'+yyyy);
         var timeDiff = Math.abs(date2.getTime() - date1.getTime());
         var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
         return diffDays;
      },
      crear_nuevo_archivo: function (id_compromiso_contraloria) {

         this.compromiso = gcf.findCompromisoById(this.compromisos, id_compromiso_contraloria);

         if (this.compromiso != null) {
            this.nuevo_seguimiento.id_compromiso_contraloria = this.compromiso.id_compromiso_contraloria;
            this.nuevo_seguimiento.usuario_registra = this.auth.id;

            this.showModalNuevoSeguimiento = true;
            this.permiteGuardarNuevoSeguimiento = true;
         }


      },

      guardar_nuevo_seguimiento: function () {
         if (this.permiteGuardarNuevoSeguimiento == true){
            this.permiteGuardarNuevoSeguimiento = false;
            if (
               this.nuevo_seguimiento.id_compromiso_contraloria != '' &&
               this.nuevo_seguimiento.documento_adjunto.length > 0 &&
               this.nuevo_seguimiento != {}) {

               this.spinner_upload = true;
               var formData = new FormData();
               $.each(this.nuevo_seguimiento.documento_adjunto, function(i, file) {
                  formData.append('documento_adjunto[]', file);
               });

               formData.append('id_compromiso_contraloria', this.nuevo_seguimiento.id_compromiso_contraloria);
               formData.append('usuario_registra', this.nuevo_seguimiento.usuario_registra);
               formData.append('_token', $('#_token').val());

               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               const config = { headers: { 'Content-Type': 'multipart/form-data' } };
               this.$http.post('/seguimiento_contraloria/store/medio_verificacion/'+this.nuevo_seguimiento.id_compromiso_contraloria, formData, config).then(response => {
                  var self = this;
                  setTimeout(() => {
                     self.fetchArchivos();
                  }, 500);
                  this.limpiarNuevoSeguimiento();

                  this.showModalNuevoSeguimiento = false;
                  this.spinner_upload = false;
               }, response => {
               });

            }else{
               this.permiteGuardarNuevoSeguimiento = true;
            }
         }else{
            alert('Se esta procesando la solicitud');
         }
      },

      download_file: function(archivo) {
         window.open('/mv/compromiso_contraloria/'+archivo.id_compromiso_contraloria+'/'+archivo.descripcion+'/')
      },
      fetchArchivos: function (){
         this._gcf = gcf;
         let id_contraloria = $('#id_contraloria').val();
         this.$http.get('/contraloria/'+id_contraloria+'/edit/ajax').then(response => { // success callback
            //console.log(response);
            this.contraloria = response.body.contraloria;
            this.area_contraloria = response.body.area_contraloria;
            this.estado_contraloria = response.body.estado_contraloria;
            this.hallazgos = response.body.hallazgos;
            this.compromisos = response.body.compromisos;
            this.compromisos_responsables = response.body.compromisos_responsables;
            this.hallazgos_responsables = response.body.hallazgos_responsables;
            this.seguimientos = response.body.seguimientos;
            this.archivos = response.body.archivos;
            this.archivosTmp = response.body.archivos;
            this.usuarios = response.body.usuarios;
            this.config = response.body.config;
            this.auth = response.body.auth;
            this.role = response.body.role;
            this.auditor = response.body.auditor;
            this.tipo_proceso_disciplinario = response.body.tipo_proceso_disciplinario;
            this.estado_proceso_disciplinario = response.body.estado_proceso_disciplinario;
            this.responsable_proceso_disciplinario = response.body.responsable_proceso_disciplinario;
            this.criticidad = response.body.criticidad;
            this.clasificacion_materia = response.body.clasificacion_materia;
            this.historico_hallazgos = response.body.historico_hallazgos;
            this.historico_hallazgosTmp = response.body.historico_hallazgos;
            this.hallazgo_historico_procedimientos_disciplinarios = response.body.hallazgo_historico_procedimientos_disciplinarios;
            this.hallazgo_procedimientos_disciplinarios = response.body.hallazgo_procedimientos_disciplinarios;

            this.preloadArchivos();

            //Manda el controller que llama al metodo
            gcf.refetchControllersData({
               'contraloria':this.contraloria,
               'area_contraloria':this.area_contraloria,
               'estado_contraloria':this.estado_contraloria,
               'hallazgos':this.hallazgos,
               'hallazgosTmp':this.hallazgos,
               'compromisos':this.compromisos,
               'compromisosTmp':this.compromisos,
               'compromisos_responsables':this.compromisos_responsables,
               'compromisos_responsablesTmp':this.compromisos_responsables,
               'hallazgos_responsables':this.hallazgos_responsables,
               'hallazgos_responsablesTmp':this.hallazgos_responsables,
               'seguimientos':this.seguimientos,
               'seguimientosTmp':this.seguimientos,
               'archivos':this.archivos,
               'archivosTmp':this.archivos,
               'usuarios':this.usuarios,
               'config':this.config,
               'auth':this.auth,
               'role':this.role,
               'auditor':this.auditor,
               'tipo_proceso_disciplinario':this.tipo_proceso_disciplinario,
               'estado_proceso_disciplinario':this.estado_proceso_disciplinario,
               'responsable_proceso_disciplinario':this.responsable_proceso_disciplinario,
               'criticidad':this.criticidad,
               'clasificacion_materia':this.clasificacion_materia,
               'historico_hallazgos':this.historico_hallazgos,
               'historico_hallazgosTmp':this.historico_hallazgosTmp,
               'hallazgo_historico_procedimientos_disciplinarios':this.hallazgo_historico_procedimientos_disciplinarios,
               'hallazgo_procedimientos_disciplinarios':this.hallazgo_procedimientos_disciplinarios,
            },{
               'HallazgoController':'HallazgoController',
               'CompromisoController':'CompromisoController',
               'SeguimientoController':'SeguimientoController',
               'ResponsableController':'ResponsableController',
               'ProcedimientosDisciplinariosController':'ProcedimientosDisciplinariosController',
            }, 'ArchivoController');

            this.ctd_req_hallazgos = this.contraloria.cantidad_hallazgo_contraloria; // : cantidad de hallazgos especificados al inicio para el contraloria
            this.ctd_hallazgos = this.hallazgos.length; // : cantidad actual de hallazgos referenciados al contraloria
            this.ctd_compromisos = this.compromisos.length;//this.ctd_compromisos = 0;
            this.ctd_seguimientos = this.seguimientos.length;

            ProcedimientosDisciplinariosController.ctd_req_hallazgos = CompromisoController.ctd_req_hallazgos = HallazgoController.ctd_req_hallazgos = SeguimientoController.ctd_req_hallazgos = ResponsableController.ctd_req_hallazgos = this.ctd_req_hallazgos;
            ProcedimientosDisciplinariosController.ctd_hallazgos = CompromisoController.ctd_hallazgos = HallazgoController.ctd_hallazgos = SeguimientoController.ctd_hallazgos = ResponsableController.ctd_hallazgos = this.ctd_hallazgos;
            ProcedimientosDisciplinariosController.ctd_compromisos = CompromisoController.ctd_compromisos = HallazgoController.ctd_compromisos = SeguimientoController.ctd_compromisos = ResponsableController.ctd_compromisos = this.ctd_compromisos;
            ProcedimientosDisciplinariosController.ctd_seguimientos = CompromisoController.ctd_seguimientos = HallazgoController.ctd_seguimientos = SeguimientoController.ctd_seguimientos = ResponsableController.ctd_seguimientos = this.ctd_seguimientos;

            ProcedimientosDisciplinariosController._gcf = CompromisoController._gcf = HallazgoController._gcf = SeguimientoController._gcf = ResponsableController._gcf = this._gcf;

         }, response => { // error callback
            console.log('Error fetchCompromisos: '+response);
         });
      },
      filterGridArchivoByComboHallazgo: function (id_hallazgo_contraloria) {
         this.filterIdHallazgo = id_hallazgo_contraloria || null;
         if (this.filterIdHallazgo != null) {
            return this.agregarFiltroIdHallazgoGrid();
         }else{
            //alert('Debe seleccionar un hallazgo');
            this.limpiarFiltros();
         } return;
      },
      filterGridArchivoByComboCompromiso: function (id_compromiso_contraloria) {
         this.limpiarFiltros();
         this.filterIdCompromiso = id_compromiso_contraloria || null;
         if (this.filterIdCompromiso != null) {
            return this.agregarFiltroIdCompromisoGrid();
         }else{
            //alert('Debe seleccionar un compromiso');
            this.limpiarFiltros();
         } return;
      },
      limpiarFiltros: function() {
         this.archivos = this.archivosTmp;
      },
      limpiarNuevoSeguimiento: function () {
         return this.nuevo_seguimiento = {
            'id_compromiso_contraloria' : '',
            'id_hallazgo_contraloria' : '',
            'documento_adjunto' : {},
            'usuario_registra' : 1,
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
         //Para hallazgos y compromisos
         for (let c in this.compromisos) {
            this.compromisos[c].plazo_comprometido_dias = this.calcularDiferenciaTiempo(this.compromisos[c].plazo_comprometido) || 0;
         }

         //Para Seguimientos
         for (let s in this.seguimientos) {
            this.seguimientos[s].id_hallazgo_contraloria =
               gcf.findCompromisoById(this.compromisos,this.seguimientos[s].id_compromiso_contraloria).id_hallazgo_contraloria;
            this.seguimientos[s].nombre_hallazgo_contraloria =
               gcf.findHallazgoById(this.hallazgos, this.seguimientos[s].id_hallazgo_contraloria).nombre_hallazgo_contraloria;
            this.seguimientos[s].nombre_compromiso_contraloria =
               gcf.findCompromisoById(this.compromisos,this.seguimientos[s].id_compromiso_contraloria).nombre_compromiso_contraloria;
            this.seguimientos[s].usuario_registra =
               gcf.findById(this.usuarios,this.seguimientos[s].usuario_registra);
            this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra ?
               this.seguimientos[s].usuario_registra.name : 'Sistema';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';
         }

         //Para Archivos
         for (let a in this.archivos) {
            this.archivos[a].id_hallazgo_contraloria =
               gcf.findCompromisoById(this.compromisos,this.archivos[a].id_compromiso_contraloria).id_hallazgo_contraloria;
            this.archivos[a].nombre_hallazgo_contraloria =
               gcf.findHallazgoById(this.hallazgos, this.archivos[a].id_hallazgo_contraloria).nombre_hallazgo_contraloria;
            this.archivos[a].nombre_compromiso_contraloria =
               gcf.findCompromisoById(this.compromisos,this.archivos[a].id_compromiso_contraloria).nombre_compromiso_contraloria;
            this.archivos[a].usuario_registra =
               gcf.findById(this.usuarios,this.archivos[a].usuario_registra);
            this.archivos[a].usuario_registra = this.archivos[a].usuario_registra ? this.archivos[a].usuario_registra.name : 'Sistema';
            this.archivos[a].observacion = this.archivos[a].observacion || 'Sin Observacion';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';
         }

         //Para Responsables
         for (let r in this.compromisos_responsables) {
            this.compromisos_responsables[r].id_hallazgo_contraloria =
               gcf.findCompromisoById(this.compromisos,this.compromisos_responsables[r].id_compromiso_contraloria).id_hallazgo_contraloria;
            this.compromisos_responsables[r].nombre_hallazgo_contraloria =
               gcf.findHallazgoById(this.hallazgos, this.compromisos_responsables[r].id_hallazgo_contraloria).nombre_hallazgo_contraloria;
            this.compromisos_responsables[r].nombre_compromiso_contraloria =
               gcf.findCompromisoById(this.compromisos,this.compromisos_responsables[r].id_compromiso_contraloria).nombre_compromiso_contraloria;
            this.compromisos_responsables[r].area = this.compromisos_responsables[r].area_contraloria.descripcion;
         }

         //Para Hallazgos historico // Procedimientos disciplinarios
         for (let h in this.historico_hallazgos) {
            let hh = gcf.findHallazgoById(this.hallazgos, this.historico_hallazgos[h].id_hallazgo_contraloria);
            this.historico_hallazgos[h].nombre_hallazgo_contraloria = hh.nombre_hallazgo_contraloria ;
            this.historico_hallazgos[h].id_hallazgo_contraloria = hh.id_hallazgo_contraloria ;
         }


      },
      showModalData: function (id_medio_verificacion_contraloria) {
         this.archivo = gcf.findArchivoById(this.archivos, id_medio_verificacion_contraloria);
         this.compromiso = gcf.findCompromisoById(this.compromisos, this.archivo.id_compromiso_contraloria);
         this.hallazgo = gcf.findHallazgoById(this.hallazgos, this.compromiso.id_hallazgo_contraloria);
         this.archivo.nombre_compromiso_contraloria = this.compromiso.nombre_compromiso_contraloria;
         this.archivo.id_hallazgo_contraloria = this.hallazgo.id_hallazgo_contraloria;
         this.archivo.nombre_hallazgo_contraloria = this.hallazgo.nombre_hallazgo_contraloria;
         this.archivo.usuario_registra = gcf.findById(this.usuarios,this.archivo.usuario_registra);
         this.archivo.usuario_registra = this.archivo.usuario_registra ?
            this.archivo.usuario_registra.name : 'Sistema';

         var rawFile = new XMLHttpRequest();
         var self = this;
         rawFile.open("GET",
            'http://'+window.location.host+'/mv/compromiso_contraloria/'+this.archivo.id_compromiso_contraloria+'/'+this.archivo.descripcion, false);
         rawFile.onreadystatechange = function () {
            if(rawFile.readyState === 4) {
               if(rawFile.status === 200 || rawFile.status == 0) {
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
      shuffle: function (items) {return _.shuffle(items)},
      filtrar_compromisos_nuevo_archivo: function (id_hallazgo_contraloria) {
         this.limpiarFiltros();
         var hallazgo = gcf.findHallazgoById(this.hallazgos, id_hallazgo_contraloria);
         this.nuevo_archivo.id_compromiso_contraloria = '';
         this.filterGridArchivoByComboHallazgo(id_hallazgo_contraloria);
      },
   },
});

var ResponsableController = new Vue({
   el: '#ResponsableController',
   data(){
      return {
         'area_contraloria':{},
         'contraloria':{},
         'hallazgo':{},
         'hallazgos':{},
         'hallazgosTmp':{},
         'compromiso':[],
         'compromisos':[],
         'compromisosTmp':[],
         'seguimientos':[],
         'seguimientosTmp':[],
         'usuarios':[],
         'archivos':[],
         'archivo':[],
         'config':[],
         'role':[],
         'auth':[],
         'auditor':[],
         'criticidad':[],
         'compromisos_responsables':[],
         'hallazgos_responsables':[],
         'hallazgos_responsablesTmp':[],
         'historico_hallazgos':[],
         'historico_hallazgosTmp':[],
         'hallazgo_historico_procedimientos_disciplinarios':[],
         'hallazgo_procedimientos_disciplinarios':[],
         'responsable':[],
         'index':0,
         'filterTerm':'',
         'filterIdCompromiso':'',
         'filterIdHallazgo':'',
         'filterIdSeguimiento':'',
         'filterIdArchivo':'',
         'gridOrder':'asc',
         'mensajeResultadoConFiltros':false,
         'filtroIdHallazgo':false,
         'filtroIdCompromiso':false,
         'showModal':false,
         'showModalEditarCompromiso':false,
         'responsablesFiltroIdHallazgo':{},
         'responsablesFiltroIdCompromiso':{},

         'nuevo_responsable':{
            'id_hallazgo_contraloria':'',
            'id_compromiso_contraloria':'',
            'id_contraloria':'',
            'id_usuario_responsable_contraloria':'',
            'id_area_contraloria':0,
            'responsable':'',
            'email_responsable':'',
            'fono_responsable':'',
         },

         'excel_json_fields': {
            'id_compromiso_responsable_contraloria': 'String',
            'id_hallazgo_contraloria': 'String',
            'nombre_hallazgo_contraloria': 'String',
            'id_compromiso_contraloria': 'String',
            'nombre_compromiso_contraloria': 'String',
            'id_area_contraloria': 'String',
            'area_contraloria': 'String',
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
               'id_compromiso_responsable_contraloria': r.id_compromiso_responsable_contraloria,
               'id_hallazgo_contraloria': r.id_hallazgo_contraloria,
               'nombre_hallazgo_contraloria': r.nombre_hallazgo_contraloria,
               'id_compromiso_contraloria': r.id_compromiso_contraloria,
               'nombre_compromiso_contraloria': r.nombre_compromiso_contraloria,
               'id_area_contraloria': r.id_area_contraloria,
               'area_contraloria': r.area_contraloria.descripcion,
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
         ready () {},
         created(){},
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
         ready () {},
         created(){},
         filters: {},
         methods: {},
      },
      'modal':{
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
                                          <dd class="well well-sm">{{responsable.id_hallazgo_contraloria || '0'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Id del Compromiso</dt>
                                          <dd class="well well-sm">{{responsable.id_compromiso_contraloria || '0'}}</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Nombre del Hallazgo</dt>
                                          <dd class="well well-sm">{{responsable.nombre_hallazgo_contraloria || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-12">
                                          <dt>Nombre del Compromiso</dt>
                                          <dd class="well well-sm">{{responsable.nombre_compromiso_contraloria || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Id Area</dt>
                                          <dd class="well well-sm">{{responsable.id_area_contraloria || 'Sin definir'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Area Contraloria</dt>
                                          <dd class="well well-sm">{{responsable.area_contraloria.descripcion || 'Sin definir'}}</dd>
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
      },
      'modal-editarcompromiso':{
         props: ['compromiso', 'config', 'auth', 'role', 'auditor', 'usuarios', 'area_contraloria',
            'compromisos_responsables', 'contraloria', 'responsable_controller', 'compromisos', 'hallazgos'],
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
                                                         {{cr.id_compromiso_responsable_contraloria}}
                                                         </td>
                                                         <td>
                                                         {{cr.id_compromiso_contraloria}}
                                                         </td>
                                                         <td>
                                                         {{cr.id_area_contraloria}}
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
                                                               {{ compromiso.id_compromiso_contraloria }}
                                                            </td>
                                                            <td>
                                                               {{ nuevo_responsable.id_area_contraloria }}
                                                            </td>
                                                            <td>
                                                               <p class="control has-icon has-icon-right">
                                                                  <select id="responsables_existentes" name="id_usuario_responsable_contraloria"
                                                                     @change="completar_nuevo_responsable_email"
                                                                     v-model="nuevo_responsable.id_usuario_responsable_contraloria"
                                                                     v-validate="'required'" data-vv-delay="500"
                                                                     :class="{'input': true,
                                                                     'text-danger': errors.has('id_usuario_responsable_contraloria'),
                                                                     'form-control':true}">
                                                                     <option class="responsables" v-for="(u,i) in usuarios" :value="u.id"
                                                                        v-if="validarResponsableNoRegistrado(u.id)">
                                                                        {{u.name}}
                                                                     </option>
                                                                  </select>
                                                                  <transition name="bounce">
                                                                  <i v-show="errors.has('id_usuario_responsable_contraloria')"
                                                                  class="fa fa-warning"></i>
                                                                  </transition>
                                                                  <transition name="bounce">
                                                                  <span v-show="errors.has('id_usuario_responsable_contraloria')"
                                                                     class="text-danger">
                                                                     {{ errors.first('id_usuario_responsable_contraloria') |
                                                                        replaceIdUsuarioResponsableContraloria }}
                                                                  </span>
                                                                  </transition>
                                                               </p>

																					<!--
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
               'loadMore':false,
               'usuariosTmp':[],
               'form_responsable_creable':false,
               'permiteGuardarNuevoResponsable':true,
               'nuevo_responsable':{
                  'id_compromiso_contraloria':'',
                  'id_contraloria':'',
                  'id_usuario_responsable_contraloria':'',
                  'id_area_contraloria':0,
                  'responsable':'',
                  'email_responsable':'',
                  'fono_responsable':'',
               },
               'nuevo_usuario':{
                  'name':'',
                  'email':'',
                  'password':'',
                  'id_role':'13',
                  'id_auditor':'0',
                  'active_directory':0,
                  'active_directory_user':'',
                  'tipo_acceso':'Role',
                  'usuario_registra':1,
                  'usuario_modifica':0,
               },
            }
         },
         ready () {
         },
         created () {

         },
         filters: {
            replaceNombreCompromisoContraloria(nombre_compromiso_contraloria) {
               if (nombre_compromiso_contraloria != null) {nombre_compromiso_contraloria =
                  nombre_compromiso_contraloria.replace('nombre_compromiso_contraloria', 'para el nombre del comprimiso');}
               return nombre_compromiso_contraloria;
            },
            replaceEmailResponsable(email_responsable) {
               if (email_responsable != null) {email_responsable = email_responsable.replace('email_responsable', 'email para el responsable');}
               return email_responsable;
            },
            replaceFonoResponsable(fono_responsable) {
               if (fono_responsable != null) {fono_responsable = fono_responsable.replace('fono_responsable', 'fono para el responsable');}
               return fono_responsable;
            },
            replaceIdUsuarioResponsableContraloria(id_usuario_responsable_contraloria) {
               if (id_usuario_responsable_contraloria != null) {id_usuario_responsable_contraloria =
                  id_usuario_responsable_contraloria.replace('id_usuario_responsable_contraloria', 'para el nombre del responsable');}
               return id_usuario_responsable_contraloria;
            },
            replaceName(name) {
               if (name != null) {name = name.replace('name', 'para el nombre del usuario');}
               return name;
            },
            replacePassword(password) {
               if (password != null) {password = password.replace('password', 'password');}
               return password;
            },
            replaceIdRole(id_role) {
               if (id_role != null) {id_role = id_role.replace('id_role', 'role');}
               return id_role;
            },
            replaceIdAuditor(id_auditor) {
               if (id_auditor != null) {id_auditor = id_auditor.replace('id_auditor', 'nombre auditor');}
               return id_auditor;
            },
         },
         methods: {
            cambiar_form_responsable_creable: function () {
               if(this.compromiso != null && this.usuarios != null && this.config != null && this.area_contraloria != null){
                  this.nuevo_responsable.id_compromiso_contraloria = this.compromiso.id_compromiso_contraloria;
                  this.nuevo_responsable.id_area_contraloria = this.area_contraloria[0].id_area_contraloria;
               }else{
                  console.log('Uno de los elementos a validar es nulo.');
               }
               this.permiteGuardarNuevoResponsable = true;
               return this.form_responsable_creable = !this.form_responsable_creable;
            },
            crear_nuevo_responsable: function () {},
            completar_nuevo_responsable_email: function () {
               if (this.nuevo_responsable.id_usuario_responsable_contraloria != null) {
                  return this.nuevo_responsable.email_responsable =
                     gcf.findUsuarioById(this.usuarios, this.nuevo_responsable.id_usuario_responsable_contraloria).email;
               }
            },

            guardar_nuevo_responsable: function () {
               if (this.permiteGuardarNuevoResponsable == true){
                  this.permiteGuardarNuevoResponsable = false;
                  if (this.nuevo_responsable.id_compromiso_contraloria != '' &&
                     this.nuevo_responsable.id_usuario_responsable_contraloria != '' &&
                     this.nuevo_responsable.email_responsable != '' &&
                     //this.nuevo_responsable.fono_responsable != '' &&
                     this.nuevo_responsable != {}) {


                     var formData = new FormData();

                     formData.append('id_compromiso_contraloria', this.nuevo_responsable.id_compromiso_contraloria);
                     formData.append('id_contraloria', this.contraloria.id_contraloria);
                     formData.append('id_usuario_responsable_contraloria', this.nuevo_responsable.id_usuario_responsable_contraloria);
                     formData.append('id_area_contraloria', this.area_contraloria[0].id_area_contraloria);
                     formData.append('responsable',
                        gcf.findUsuarioById(this.usuarios, this.nuevo_responsable.id_usuario_responsable_contraloria).name);
                     formData.append('email_responsable', this.nuevo_responsable.email_responsable);
                     formData.append('fono_responsable', this.nuevo_responsable.fono_responsable);
                     formData.append('_token', $('#_token').val());

                     Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

                     this.$http.post('/compromiso_contraloria/store/responsable', formData).then(response => {

                        var compromiso = gcf.findCompromisoById(this.compromisos, this.nuevo_responsable.id_compromiso_contraloria);
                        var hallazgo = gcf.findHallazgoById(this.hallazgos, compromiso.id_hallazgo_contraloria);

                        var new_compromiso_responsable = response.data.new_compromiso_responsable;

                        new_compromiso_responsable.id_hallazgo_contraloria = hallazgo.id_hallazgo_contraloria;
                        new_compromiso_responsable.nombre_hallazgo_contraloria = hallazgo.nombre_hallazgo_contraloria;
                        new_compromiso_responsable.id_compromiso_contraloria = compromiso.id_compromiso_contraloria;
                        new_compromiso_responsable.nombre_compromiso_contraloria = compromiso.nombre_compromiso_contraloria;
                        new_compromiso_responsable.area = this.area_contraloria[0].descripcion;

                        this.compromisos_responsables.push(new_compromiso_responsable);
                        this.limpiarNuevoResponsable();
                        this.form_responsable_creable = false;
                        alert('Responsable agregado.');

                     }, response => {
                     });
                  }else{
                     this.permiteGuardarNuevoResponsable = true;
                  }
               }else{
                  alert('Se esta procesando la solicitud');
               }
            },
            guardar_nuevo_usuario: function () {
               if (this.nuevo_usuario != {}){
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

                        //console.log(response);
                        //this.hallazgos.push(response.body);
                     }, response => {
                     });
                  }
               }
            },
            limpiarNuevoResponsable: function () {
               return this.nuevo_responsable = {
                  'id_compromiso_contraloria':'',
                  'id_contraloria':'',
                  'id_usuario_responsable':'',
                  'id_area_contraloria':0,
                  'responsable':'',
                  'email_responsable':'',
                  'fono_responsable':'',
               };
            },
            limpiarNuevoUsuario: function () {
               return this.nuevo_usuario = {
                  'name':'',
                  'email':'',
                  'password':'',
                  'id_role':'12',
                  'id_auditor':'0',
                  'active_directory':0,
                  'active_directory_user':'',
                  'tipo_acceso':'Role',
                  'usuario_registra':1,
                  'usuario_modifica':0,
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
                  if (items[i].id_usuario_responsable_contraloria==id_responsable_registrado ) {//12 es aqui por el perfil
                     return false; //Ya ha sido registrado
                  }
               }
               if (gcf.findUsuarioById(this.usuarios,id_responsable_registrado).role != undefined) {
                  if (gcf.findUsuarioById(this.usuarios,id_responsable_registrado).role.role != 'Usuario Auditado Contraloria') {
                     return false;
                  }
               }

               return true; //No ha sido registrado
            },
         },
         watch: {
         },
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
      agregarFiltroIdHallazgoGrid: function(){
         if(!this.filtroIdHallazgo){
            this.filtroIdHallazgo = true;
            this.responsablesFiltroIdHallazgo = this.compromisos_responsables;
         }else{
            this.compromisos_responsables = this.responsablesFiltroIdHallazgo;
         }

         var self = this;
         //Itero la lista de hallazgos y filtro segun el id hallazgo ingresado
         this.compromisos_responsables = _.filter(this.compromisos_responsables, function (r) {
            return r.id_hallazgo_contraloria == self.filterIdHallazgo;
         });
         /*
         if(this.compromisos_responsables.length == 0){
            this.compromisos_responsables = this.responsablesFiltroIdHallazgo;
            if (this.filterIdHallazgo == '') return;
            else alert('Sin resultados para el id ingresado');
         }
         */
      },
      agregarFiltroIdCompromisoGrid: function(){
         if(!this.filtroIdCompromiso){
            this.filtroIdCompromiso = true;
            this.responsablesFiltroIdCompromiso = this.compromisos_responsables;
         }else{
            this.compromisos_responsables = this.responsablesFiltroIdCompromiso;
         }

         var self = this;
         //Itero la lista de hallazgos y filtro segun el id compromiso ingresado
         this.compromisos_responsables = _.filter(this.compromisos_responsables, function (r) {
            return r.id_compromiso_contraloria == self.filterIdCompromiso;
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
      calcularDiferenciaTiempo: function (plazo_comprometido){
         plazo_comprometido = plazo_comprometido.split('-');
         var today = new Date();
         var dd = today.getDate();
         var mm = today.getMonth()+1; //January is 0!
         var yyyy = today.getFullYear();

         var date1 = new Date(plazo_comprometido[1]+'/'+plazo_comprometido[0]+'/'+plazo_comprometido[2]);
         var date2 = new Date(mm+'/'+dd+'/'+yyyy);
         var timeDiff = Math.abs(date2.getTime() - date1.getTime());
         var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
         return diffDays;
      },
      crear_nuevo_responsable: function (id_compromiso_contraloria) {
         this.$validator.validateAll().then(result => {});
         if (id_compromiso_contraloria == null || id_compromiso_contraloria == '') {
            alert('Debe seleccionar un compromiso');
            return ;
         }
         this.compromiso = gcf.findCompromisoById(this.compromisos, id_compromiso_contraloria);
         this.nuevo_responsable.id_compromiso_contraloria = id_compromiso_contraloria;
         this.showModalEditarCompromiso = true;
         return ;
      },
      fetchResponsables: function (){
         this._gcf = gcf;
         let id_contraloria = $('#id_contraloria').val();
         this.$http.get('/contraloria/'+id_contraloria+'/edit/ajax').then(response => { // success callback
            //console.log(response);
            this.contraloria = response.body.contraloria;
            this.area_contraloria = response.body.area_contraloria;
            this.estado_contraloria = response.body.estado_contraloria;
            this.hallazgos = response.body.hallazgos;
            this.compromisos = response.body.compromisos;
            this.compromisos_responsables = {};
            this.compromisos_responsables = response.body.compromisos_responsables;
            this.hallazgos_responsables = response.body.hallazgos_responsables;
            this.seguimientos = response.body.seguimientos;
            this.archivos = response.body.archivos;
            this.archivosTmp = response.body.archivos;
            this.usuarios = response.body.usuarios;
            this.config = response.body.config;
            this.auth = response.body.auth;
            this.role = response.body.role;
            this.auditor = response.body.auditor;
            this.tipo_proceso_disciplinario = response.body.tipo_proceso_disciplinario;
            this.estado_proceso_disciplinario = response.body.estado_proceso_disciplinario;
            this.responsable_proceso_disciplinario = response.body.responsable_proceso_disciplinario;
            this.criticidad = response.body.criticidad;
            this.clasificacion_materia = response.body.clasificacion_materia;
            this.historico_hallazgos = response.body.historico_hallazgos;
            this.historico_hallazgosTmp = response.body.historico_hallazgos;
            this.hallazgo_historico_procedimientos_disciplinarios = response.body.hallazgo_historico_procedimientos_disciplinarios;
            this.hallazgo_procedimientos_disciplinarios = response.body.hallazgo_procedimientos_disciplinarios;

            this.preloadResponsableController();

            //Manda el controller que llama al metodo
            gcf.refetchControllersData({
               'contraloria':this.contraloria,
               'area_contraloria':this.area_contraloria,
               'estado_contraloria':this.estado_contraloria,
               'hallazgos':this.hallazgos,
               'hallazgosTmp':this.hallazgos,
               'compromisos':this.compromisos,
               'compromisosTmp':this.compromisos,
               'compromisos_responsables':this.compromisos_responsables,
               'compromisos_responsablesTmp':this.compromisos_responsables,
               'hallazgos_responsables':this.hallazgos_responsables,
               'hallazgos_responsablesTmp':this.hallazgos_responsables,
               'seguimientos':this.seguimientos,
               'seguimientosTmp':this.seguimientos,
               'archivos':this.archivos,
               'archivosTmp':this.archivos,
               'usuarios':this.usuarios,
               'config':this.config,
               'auth':this.auth,
               'role':this.role,
               'auditor':this.auditor,
               'tipo_proceso_disciplinario':this.tipo_proceso_disciplinario,
               'estado_proceso_disciplinario':this.estado_proceso_disciplinario,
               'responsable_proceso_disciplinario':this.responsable_proceso_disciplinario,
               'criticidad':this.criticidad,
               'clasificacion_materia':this.clasificacion_materia,
               'historico_hallazgos':this.historico_hallazgos,
               'historico_hallazgosTmp':this.historico_hallazgosTmp,
               'hallazgo_historico_procedimientos_disciplinarios':this.hallazgo_historico_procedimientos_disciplinarios,
               'hallazgo_procedimientos_disciplinarios':this.hallazgo_procedimientos_disciplinarios,
            },{
               'HallazgoController':'HallazgoController',
               'CompromisoController':'CompromisoController',
               'SeguimientoController':'SeguimientoController',
               'ArchivoController':'ArchivoController',
               'ProcedimientosDisciplinariosController':'ProcedimientosDisciplinariosController',
            }, 'ResponsableController');

            this.ctd_req_hallazgos = this.contraloria.cantidad_hallazgo_contraloria; // : cantidad de hallazgos especificados al inicio para el contraloria
            this.ctd_hallazgos = this.hallazgos.length; // : cantidad actual de hallazgos referenciados al contraloria
            this.ctd_compromisos = this.compromisos.length;//this.ctd_compromisos = 0;
            this.ctd_seguimientos = this.seguimientos.length;

            ProcedimientosDisciplinariosController.ctd_req_hallazgos = CompromisoController.ctd_req_hallazgos = HallazgoController.ctd_req_hallazgos = SeguimientoController.ctd_req_hallazgos = ArchivoController.ctd_req_hallazgos = this.ctd_req_hallazgos;
            ProcedimientosDisciplinariosController.ctd_hallazgos = CompromisoController.ctd_hallazgos = HallazgoController.ctd_hallazgos = SeguimientoController.ctd_hallazgos = ArchivoController.ctd_hallazgos = this.ctd_hallazgos;
            ProcedimientosDisciplinariosController.ctd_compromisos = CompromisoController.ctd_compromisos = HallazgoController.ctd_compromisos = SeguimientoController.ctd_compromisos = ArchivoController.ctd_compromisos = this.ctd_compromisos;
            ProcedimientosDisciplinariosController.ctd_seguimientos = CompromisoController.ctd_seguimientos = HallazgoController.ctd_seguimientos = SeguimientoController.ctd_seguimientos = ArchivoController.ctd_seguimientos = this.ctd_seguimientos;

            ProcedimientosDisciplinariosController._gcf = CompromisoController._gcf = HallazgoController._gcf = SeguimientoController._gcf = ArchivoController._gcf = this._gcf;

         }, response => { // error callback
            console.log('Error fetchResponsables: '+response);
         });
      },
      filterGridResponsableByComboHallazgo: function (id_hallazgo_contraloria) {
         this.filterIdHallazgo = id_hallazgo_contraloria || null;
         if (this.filterIdHallazgo != null) {
            return this.agregarFiltroIdHallazgoGrid();
         }else{
            //alert('Debe seleccionar un hallazgo');
            this.limpiarFiltros();
         } return;
      },
      filterGridResponsableByComboCompromiso: function (id_compromiso_contraloria) {
         this.limpiarFiltros();
         this.filterIdCompromiso = id_compromiso_contraloria || null;
         if (this.filterIdCompromiso != null) {
            return this.agregarFiltroIdCompromisoGrid();
         }else{
            //alert('Debe seleccionar un compromiso');
            this.limpiarFiltros();
         } return;
      },
      limpiarFiltros: function() {
         this.compromisos_responsables = this.compromisos_responsablesTmp;
      },
      // function to order users in the list
      orderLists: function (column) {
         this.compromisos_responsables = _.orderBy(this.compromisos_responsables, column, this.gridOrder);
         //console.log(column);
         //this.lists = this.shuffle(_.orderBy(this.lists, 'name', this.listOrder));
         //console.log(this.lists.length);
      },
      preloadResponsableController: function () {
         //Para hallazgos y compromisos
         for (let c in this.compromisos) {
            this.compromisos[c].plazo_comprometido_dias = this.calcularDiferenciaTiempo(this.compromisos[c].plazo_comprometido) || 0;
         }

         //Para Seguimientos
         for (let s in this.seguimientos) {
            this.seguimientos[s].id_hallazgo_contraloria =
               gcf.findCompromisoById(this.compromisos,this.seguimientos[s].id_compromiso_contraloria).id_hallazgo_contraloria;
            this.seguimientos[s].nombre_hallazgo_contraloria =
               gcf.findHallazgoById(this.hallazgos, this.seguimientos[s].id_hallazgo_contraloria).nombre_hallazgo_contraloria;
            this.seguimientos[s].nombre_compromiso_contraloria =
               gcf.findCompromisoById(this.compromisos,this.seguimientos[s].id_compromiso_contraloria).nombre_compromiso_contraloria;
            this.seguimientos[s].usuario_registra =
               gcf.findById(this.usuarios,this.seguimientos[s].usuario_registra);
            this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra ?
               this.seguimientos[s].usuario_registra.name : 'Sistema';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';
         }

         //Para Archivos
         for (let a in this.archivos) {
            this.archivos[a].id_hallazgo_contraloria =
               gcf.findCompromisoById(this.compromisos,this.archivos[a].id_compromiso_contraloria).id_hallazgo_contraloria;
            this.archivos[a].nombre_hallazgo_contraloria =
               gcf.findHallazgoById(this.hallazgos, this.archivos[a].id_hallazgo_contraloria).nombre_hallazgo_contraloria;
            this.archivos[a].nombre_compromiso_contraloria =
               gcf.findCompromisoById(this.compromisos,this.archivos[a].id_compromiso_contraloria).nombre_compromiso_contraloria;
            this.archivos[a].usuario_registra =
               gcf.findById(this.usuarios,this.archivos[a].usuario_registra);
            this.archivos[a].usuario_registra = this.archivos[a].usuario_registra ? this.archivos[a].usuario_registra.name : 'Sistema';
            this.archivos[a].observacion = this.archivos[a].observacion || 'Sin Observacion';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';
         }

         //Para Responsables
         for (let r in this.compromisos_responsables) {
            this.compromisos_responsables[r].id_hallazgo_contraloria =
               gcf.findCompromisoById(this.compromisos,this.compromisos_responsables[r].id_compromiso_contraloria).id_hallazgo_contraloria;
            this.compromisos_responsables[r].nombre_hallazgo_contraloria =
               gcf.findHallazgoById(this.hallazgos, this.compromisos_responsables[r].id_hallazgo_contraloria).nombre_hallazgo_contraloria;
            this.compromisos_responsables[r].nombre_compromiso_contraloria =
               gcf.findCompromisoById(this.compromisos,this.compromisos_responsables[r].id_compromiso_contraloria).nombre_compromiso_contraloria;
            this.compromisos_responsables[r].area = this.compromisos_responsables[r].area_contraloria.descripcion;
         }

         //Para Hallazgos historico // Procedimientos disciplinarios
         for (let h in this.historico_hallazgos) {
            let hh = gcf.findHallazgoById(this.hallazgos, this.historico_hallazgos[h].id_hallazgo_contraloria);
            this.historico_hallazgos[h].nombre_hallazgo_contraloria = hh.nombre_hallazgo_contraloria ;
            this.historico_hallazgos[h].id_hallazgo_contraloria = hh.id_hallazgo_contraloria ;
         }
      },
      showModalData: function (id_compromiso_responsable_contraloria) {

         this.responsable = gcf.findResponsableById(this.compromisos_responsables, id_compromiso_responsable_contraloria);

         this.compromiso = gcf.findCompromisoById(this.compromisos, this.responsable.id_compromiso_contraloria);
         this.hallazgo = gcf.findHallazgoById(this.hallazgos, this.compromiso.id_hallazgo_contraloria);

         this.responsable.nombre_compromiso = this.compromiso.nombre_compromiso_contraloria;
         this.responsable.id_hallazgo = this.hallazgo.id_hallazgo_contraloria;
         this.responsable.nombre_hallazgo = this.hallazgo.nombre_hallazgo_contraloria;

         return this.showModal = true;
      },
      /* for transition group flip */
      shuffle: function (items) {return _.shuffle(items)},
      filtrar_compromisos_nuevo_responsable: function (id_hallazgo_contraloria) {
         this.limpiarFiltros();
         var hallazgo = gcf.findHallazgoById(this.hallazgos, id_hallazgo_contraloria);
         //this.nuevo_responsable.id_compromiso_contraloria = '';
         this.filterGridResponsableByComboHallazgo(id_hallazgo_contraloria);
      },
   },
});

var ProcedimientosDisciplinariosController = new Vue({
   el: '#ProcedimientosDisciplinariosController',
   data(){
      return {
         'area_contraloria':{},
         'contraloria':{},
         'hallazgo':{},
         'hallazgos':{},
         'hallazgosTmp':{},
         'compromisos':[],
         'compromisosTmp':[],
         'seguimientos':[],
         'seguimientosTmp':[],
         'usuarios':[],
         'archivos':[],
         'archivo':[],
         'config':[],
         'role':[],
         'auth':[],
         'auditor':[],
         'criticidad':[],
         'compromisos_responsables':[],
         'compromisos_responsablesTmp':[],
         'hallazgos_responsables':[],
         'hallazgos_responsablesTmp':[],
         'historico_hallazgos':[],
         'historico_hallazgosTmp':[],
         'clasificacion_materia':[],
         'hallazgo_historico_procedimientos_disciplinarios':[],
         'hallazgo_procedimientos_disciplinarios':[],
         'procedimiento_disciplinario':[],
         'historico_hallazgo':[],
         'historico_hallazgosTmp':[],
         'responsable':[],
         'index':0,
         'filterTerm':'',
         'filterIdCompromiso':'',
         'filterIdHallazgo':'',
         'filterIdSeguimiento':'',
         'filterIdArchivo':'',
         'gridOrder':'asc',
         'mensajeResultadoConFiltros':false,
         'filtroIdHallazgo':false,
         'filtroIdCompromiso':false,
         'showModal':false,
         'showModalEditarHallazgo':false,
         'responsablesFiltroIdHallazgo':{},
         'procedimientosDisciplinariosFiltroIdHallazgo':{},
         'responsablesFiltroIdCompromiso':{},
         'tipo_proceso_disciplinario':[],
         'estado_proceso_disciplinario':[],
         'compromisos_responsables':[],


         'excel_json_fields': {
            'id_hallazgo_contraloria': 'String',
            'nombre_hallazgo_contraloria': 'String',
            'procedimiento_disciplinario': 'String',
            'responsable_proceso_disciplinario': 'String',
            'tipo_proceso_disciplinario': 'String',
            'estado_proceso_disciplinario': 'String',
            'observaciones': 'String',
            'created_at': 'String',
         },

         'excel_json_fields_historico': {
            'id_hallazgo_contraloria': 'String',
            'nombre_hallazgo_contraloria': 'String',
            'procedimiento_disciplinario': 'String',
            'responsable_proceso_disciplinario': 'String',
            'tipo_proceso_disciplinario': 'String',
            'estado_proceso_disciplinario': 'String',
            'observaciones': 'String',
            'created_at': 'String',
         },

         'nuevo_procedimiento_disciplinario': {
            'id_hallazgo_contraloria':'',
            'id_compromiso_contraloria':'',
            'procedimiento_disciplinario':false,
            'id_tipo_proceso_disciplinario':'',
            'id_estado_proceso_disciplinario':'',
            'id_responsable_proceso_disciplinario':'',
            'id_clasificacion_materia':'',
         },

         excel_json_data: [],
         excel_json_data_historico: [],
         excel_data_count: '',
         excel_data_count_historico: '',
         append_to_json_excel: {},
         _gcf: gcf,
      }
   },
   computed: {},
   watch: {
      hallazgo_historico_procedimientos_disciplinarios: function (hallazgo_historico_procedimientos_disciplinarios) {
         var self = this;
         this.excel_json_data = [];
         return hallazgo_historico_procedimientos_disciplinarios.map(function (hpd, index) {
            return self.excel_json_data.push({
               'id_hallazgo_contraloria': hpd.id_hallazgo_contraloria,
               'nombre_hallazgo_contraloria': gcf.findHallazgoById(self.hallazgos,hpd.id_hallazgo_contraloria).nombre_hallazgo_contraloria || 'Sin definir',
               'procedimiento_disciplinario': hpd.procedimiento_disciplinario || 'Sin proceso',
               'responsable_proceso_disciplinario': self.responsable_proceso_disciplinario[hpd.id_responsable_proceso_disciplinario] || 'Sin proceso',
               'tipo_proceso_disciplinario': self.tipo_proceso_disciplinario[hpd.id_tipo_proceso_disciplinario] || 'Sin proceso',
               'estado_proceso_disciplinario': self.estado_proceso_disciplinario[hpd.id_estado_proceso_disciplinario] || 'Sin proceso',
               'observaciones': hpd.observaciones || 'Sin observaciones',
               'created_at': hpd.created_at,
            });
         });
      },
      historico_hallazgos: function (historico_hallazgos) {
         var self = this;
         this.excel_json_data_historico = [];
         return historico_hallazgos.map(function (hpd, index) {
            return self.excel_json_data_historico.push({
               'id_hallazgo_contraloria': hpd.id_hallazgo_contraloria,
               'nombre_hallazgo_contraloria': hpd.nombre_hallazgo_contraloria || 'Sin definir',
               'procedimiento_disciplinario': hpd.procedimiento_disciplinario || 'Sin proceso',
               'responsable_proceso_disciplinario': self.responsable_proceso_disciplinario[hpd.id_responsable_proceso_disciplinario] || 'Sin proceso',
               'tipo_proceso_disciplinario': self.tipo_proceso_disciplinario[hpd.id_tipo_proceso_disciplinario] || 'Sin proceso',
               'estado_proceso_disciplinario': self.estado_proceso_disciplinario[hpd.id_estado_proceso_disciplinario] || 'Sin proceso',
               'observaciones': hpd.observaciones || 'Sin observaciones',
               'created_at': hpd.created_at,
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
         ready () {},
         created(){},
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
         ready () {},
         created(){},
         filters: {},
         methods: {},
      },
      'modal':{
         props: ['hh','tipo_proceso_disciplinario', 'estado_proceso_disciplinario', 'responsable_proceso_disciplinario'],
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
                                       <div class="col-md-12">
                                          <dt>Nombre del Hallazgo</dt>
                                          <dd class="well well-sm">{{hh.nombre_hallazgo_contraloria || 'Sin Definir'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Id del Hallazgo</dt>
                                          <dd class="well well-sm">{{hh.id_hallazgo_contraloria_evento || '0'}}</dd>
                                       </div>
                                       <div class="col-md-6">
                                          <dt>Procedimiento Disciplinario</dt>
                                          <dd class="well well-sm">{{hh.procedimiento_disciplinario || 'Sin Procedimientos'}}</dd>
                                       </div>

                                       <div class="col-md-6">
                                          <dt>Responsable</dt>
                                          <dd class="well well-sm">{{hh.id_responsable_proceso_disciplinario || 'Sin responsables.'}}</dd>
                                       </div>

                                       <div class="col-md-6">
                                          <dt>Tipo</dt>
                                          <dd class="well well-sm">{{tipo_proceso_disciplinario[hh.id_tipo_proceso_disciplinario] || 'Sin tipo.'}}</dd>
                                       </div>

                                       <div class="col-md-6">
                                          <dt>Estado</dt>
                                          <dd class="well well-sm">{{estado_proceso_disciplinario[hh.id_estado_proceso_disciplinario] || 'Sin estado.'}}</dd>
                                       </div>

                                       <div class="col-md-6">
                                          <dt>Observaciones</dt>
                                          <dd class="well well-sm">{{hh.observaciones || 'Sin observaciones.'}}</dd>
                                       </div>

                                       <div class="col-md-6">
                                          <dt>Fecha Creacion</dt>
                                          <dd class="well well-sm">{{hh.created_at || 'Sin Definir'}}</dd>
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
      },
      'modal-editarhallazgo':{
         props: ['hallazgo', 'config', 'auth', 'role', 'auditor', 'usuarios', 'area_contraloria', 'hallazgos_responsables', 'contraloria',
            'hallazgo_historico_procedimientos_disciplinarios', 'hallazgo_procedimientos_disciplinarios',
            'tipo_proceso_disciplinario', 'estado_proceso_disciplinario', 'responsable_proceso_disciplinario', 'criticidad', 'clasificacion_materia'],
         template: `
			   <!-- template for the modal component -->
			   <transition name="modal">
				   <div class="modal-mask">
					   <div class="modal-wrapper">
					      <div class="modal-container">

						      <div class="modal-header">
							      <slot name="header"></slot>
						      </div><!-- .modal-header -->

						      <div class="modal-body">
							      <slot name="body">

                              <!-- ###################################### -->
                              <!-- Modal con el inicio del panel con tabs -->
                              <!-- ###################################### -->


                              <div id="" class="panel with-nav-tabs panel-primary">

                                 <div class="panel-heading" style="border-bottom:0px;">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-tabs" role="tablist">
                                       <li role="presentation" class="active">
                                          <a href="#procedimientosDisciplinarios" aria-controls="procedimientosDisciplinarios"
                                             role="tab" data-toggle="tab">
                                             Procedimientos Disciplinarios
                                          </a>
                                       </li>
                                    </ul>
                                 </div><!-- .panel-heading -->

                                 <!-- ########## -->
                                 <!-- Tabs Panes -->
                                 <!-- ########## -->

                                 <div class="panel-body">
                                    <!-- Tab panes -->
                                    <div class="tab-content">

                                       <div role="tabpanel" class="tab-pane fade in active" id="procedimientosDisciplinarios">

                                          <dl class="dl-vertical" style="margin: 20px;">
                                             <div class="row">
                                                <div style="overflow-y: scroll;max-height: 400px;">
                                                   <div class="col-md-12">

                                                      <!-- Field : procedimiento_disciplinario -->

                                                      <h5>Formulario para la creacion de un Nuevo Procedimiento Disciplinario</h5>
                                                      <br />

                                                   </div><!-- .col-md-12 -->
                                                   <div class="col-md-6">


                                                      <!-- Field : procedimiento_disciplinario -->

                                                      <dt>Tipo proceso Disciplinario (*):</dt>
                                                      <dd>
                                                         <p class="control has-icon has-icon-right">
                                                            <select name="id_tipo_proceso_disciplinario"
                                                                     v-model="hallazgo.id_tipo_proceso_disciplinario"
                                                                     v-validate="'required'" data-vv-delay="500"
                                                                     :class="{'input': true,
                                                                     'text-danger': errors.has('id_tipo_proceso_disciplinario'),
                                                                     'form-control':true}">
                                                               <option v-for="(v,i) in tipo_proceso_disciplinario" :value="i">{{v}}</option>
                                                            </select>
                                                            <transition name="bounce">
                                                            <i v-show="errors.has('id_tipo_proceso_disciplinario')" class="fa fa-warning"></i>
                                                            </transition>
                                                            <transition name="bounce">
                                                            <span v-show="errors.has('id_tipo_proceso_disciplinario')" class="text-danger">
                                                               {{ errors.first('id_tipo_proceso_disciplinario') | replaceTipoProcesoDisciplinario }}
                                                            </span>
                                                            </transition>
                                                         </p>
                                                      </dd>

                                                      <!-- Field : id_responsable_proceso_disciplinario -->

                                                      <dt>Responsable proceso Disciplinario (*):</dt>
                                                      <dd>

                                                         <p class="control has-icon has-icon-right">
                                                            <select name="id_responsable_proceso_disciplinario"
                                                                     v-model="hallazgo.id_responsable_proceso_disciplinario"
                                                                     v-validate="'required'" data-vv-delay="500"
                                                                     :class="{'input': true, 'text-danger': errors.has('id_responsable_proceso_disciplinario'), 'form-control':true}">
                                                               <option v-for="(v,i) in responsable_proceso_disciplinario" :value="i">{{v}}</option>
                                                            </select>
                                                            <transition name="bounce">
                                                            <i v-show="errors.has('id_responsable_proceso_disciplinario')" class="fa fa-warning"></i>
                                                            </transition>
                                                            <transition name="bounce">
                                                            <span v-show="errors.has('id_responsable_proceso_disciplinario')" class="text-danger">
                                                               {{ errors.first('id_responsable_proceso_disciplinario') | replaceResponsableProcesoDisciplinario }}
                                                            </span>
                                                            </transition>
                                                         </p>
                                                      </dd>

                                                      <!-- Field : button to add -->

                                                      <dt>Asignar procedimiento:</dt>
                                                      <dd>
                                                         <br />
                                                         <p class="control has-icon has-icon-right">
                                                            <button class="btn btn-md btn-success"
                                                            @click.prevent="guardar_nuevo_procedimiento_disciplinario">
                                                            Asignar
                                                            </button>
                                                         </p>
                                                      </dd>


                                                   </div><!-- col-md-6 -->
                                                   <div class="col-md-6">

                                                      <!-- Field : id_estado_proceso_disciplinario -->

                                                      <dt>Estado proceso Disciplinario (*):</dt>
                                                      <dd>

                                                         <p class="control has-icon has-icon-right">
                                                            <select name="id_estado_proceso_disciplinario"
                                                                     v-model="hallazgo.id_estado_proceso_disciplinario"
                                                                     v-validate="'required'" data-vv-delay="500"
                                                                     :class="{'input': true, 'text-danger': errors.has('id_estado_proceso_disciplinario'), 'form-control':true}">
                                                               <option v-for="(v,i) in estado_proceso_disciplinario" :value="i">{{v}}</option>
                                                            </select>
                                                            <transition name="bounce">
                                                            <i v-show="errors.has('id_estado_proceso_disciplinario')" class="fa fa-warning"></i>
                                                            </transition>
                                                            <transition name="bounce">
                                                            <span v-show="errors.has('id_estado_proceso_disciplinario')" class="text-danger">
                                                               {{ errors.first('id_estado_proceso_disciplinario') | replaceEstadoProcesoDisciplinario }}
                                                            </span>
                                                            </transition>
                                                         </p>
                                                      </dd>

                                                      <!-- Field : id_estado_proceso_disciplinario -->

                                                      <dt>Observacion Procedimiento (*):</dt>
                                                      <dd>
                                                         <p class="control has-icon has-icon-right">
                                                            <textarea name="observaciones" rows="2"
                                                                   v-model="hallazgo.observaciones"
                                                                   :class="{'input': true, 'text-danger': errors.has('observaciones'),
                                                                   'scroll_textarea_original':true}"
                                                                   v-validate="'required'" data-vv-delay="500">
                                                               @{{ hallazgo.observaciones}}
                                                            </textarea>
                                                            <transition name="bounce">
                                                            <i v-show="errors.has('observaciones')" class="fa fa-warning"></i>
                                                            </transition>
                                                            <transition name="bounce">
                                                            <span v-show="errors.has('observaciones')" class="text-danger">
                                                               {{ errors.first('observaciones') }}
                                                            </span>
                                                            </transition>
                                                         </p>
                                                      </dd>
                                                   </div><!-- .col-md-6 -->
                                                   <div class="col-md-12">


                                                      <!-- ################################################################## -->
                                                      <!-- Tabla con asignaciones/historicos de procedimientos disciplinarios -->
                                                      <!-- ################################################################## -->


                                                      <dl class="dl-vertical" style="margin: 20px;">
                                                         <div class="row">

                                                            <div id="" class="panel with-nav-tabs panel-primary">
                                                               <div class="panel-heading" style="border-bottom:0px;">
                                                                  <!-- Nav tabs -->
                                                                  <ul class="nav nav-tabs" role="tablist">
                                                                     <li role="presentation" class="active">
                                                                        <a href="#procedimientosAsignados" aria-controls="gestionResponsable"
                                                                           role="tab" data-toggle="tab">

                                                                           Procedimientos disciplinarios asignados
                                                                        </a>
                                                                     </li>

                                                                     <li role="presentation">
                                                                        <a href="#historicoProcedimientos" aria-controls="nuevoUsuario"
                                                                           role="tab" data-toggle="tab">

                                                                           Historico de procedimientos
                                                                        </a>
                                                                     </li>
                                                                  </ul><!-- .nav .nav-tabs -->
                                                               </div><!-- .panel-heading -->

                                                               <div class="panel-body">
                                                                  <!-- Tab panes -->
                                                                  <div class="tab-content">

                                                                     <!-- Procedimientos Asignados -->

                                                                     <div role="tabpanel" class="tab-pane fade in active" id="procedimientosAsignados">
                                                                        <div class="table-responsive">
                                                                           <table class="table custom-table table-striped text-center">
                                                                              <thead>
                                                                                 <th>Accion</th>
                                                                                 <th>Id</th>
                                                                                 <th>Tipo</th>
                                                                                 <th>Estado</th>
                                                                                 <th>Responsable</th>
                                                                                 <th>Observaciones</th>
                                                                              </thead>
                                                                              <tbody>
                                                                                 <tr v-for="hpd in hallazgo_procedimientos_disciplinarios"
                                                                                    v-if="hpd.id_hallazgo_contraloria == hallazgo.id_hallazgo_contraloria">
                                                                                    <td>
                                                                                    <button
                                                                                       v-if="hpd.id_hallazgo_contraloria_procedimiento_disciplinario!=form_hpd"
                                                                                       type="button"
                                                                                       class="btn btn-primary btn-xs"
                                                                                       :value="hpd.id_hallazgo_contraloria_procedimiento_disciplinario"
                                                                                       @click.prevent="
                                                                                       cambiar_form_hpd(hpd.id_hallazgo_contraloria_procedimiento_disciplinario)"
                                                                                       data-toggle="tooltip" data-placement="left" title="Modificar">
                                                                                       <i class="fa fa-pencil"></i>
                                                                                    </button>
                                                                                    <button v-else type="button" class="btn btn-success btn-xs"
                                                                                       :value="hpd.id_hallazgo_contraloria_procedimiento_disciplinario"
                                                                                       @click.prevent="
                                                                                       guardar_form_hpd(hpd.id_hallazgo_contraloria_procedimiento_disciplinario,0)"
                                                                                       data-toggle="tooltip" data-placement="left" title="Guardar">
                                                                                       <i class="fa fa-check" aria-hidden="true"></i>
                                                                                    </button>
                                                                                    </td>

                                                                                    <!-- Id hallazgo contraloria procedimiento disciplinario -->
                                                                                    <td>
                                                                                       {{hpd.id_hallazgo_contraloria_procedimiento_disciplinario}}
                                                                                    </td>

                                                                                    <!-- Tipo proceso disciplinario -->
                                                                                    <td v-if="hpd.id_hallazgo_contraloria_procedimiento_disciplinario!=form_hpd">
                                                                                       {{tipo_proceso_disciplinario[
                                                                                          hpd.id_tipo_proceso_disciplinario
                                                                                       ]}}
                                                                                    </td>
                                                                                    <td v-else>
                                                                                    <p class="control has-icon has-icon-right">
                                                                                       <select name="id_tipo_proceso_disciplinario"
                                                                                                v-model="hpd.id_tipo_proceso_disciplinario"
                                                                                                v-validate="'required'" data-vv-delay="500"
                                                                                                :class="{'input': true,
                                                                                                'text-danger': errors.has('id_tipo_proceso_disciplinario'),
                                                                                                'form-control':true}">
                                                                                          <option v-for="(v,i) in tipo_proceso_disciplinario"
                                                                                             :value="i">
                                                                                             {{v}}
                                                                                          </option>
                                                                                       </select>
                                                                                       <transition name="bounce">
                                                                                       <i v-show="errors.has('id_tipo_proceso_disciplinario')"
                                                                                          class="fa fa-warning"></i>
                                                                                       </transition>
                                                                                       <transition name="bounce">
                                                                                       <span v-show="errors.has('id_tipo_proceso_disciplinario')"
                                                                                          class="text-danger">
                                                                                          {{ errors.first('id_tipo_proceso_disciplinario')
                                                                                             | replaceTipoProcesoDisciplinario }}
                                                                                       </span>
                                                                                       </transition>
                                                                                    </p>
                                                                                    </td>

                                                                                    <!-- Estado proceso disciplinario -->
                                                                                    <td v-if="hpd.id_hallazgo_contraloria_procedimiento_disciplinario!=form_hpd">
                                                                                       {{estado_proceso_disciplinario[
                                                                                          hpd.id_estado_proceso_disciplinario
                                                                                       ]}}
                                                                                    </td>
                                                                                    <td v-else>
                                                                                    <p class="control has-icon has-icon-right">
                                                                                       <select name="id_estado_proceso_disciplinario"
                                                                                                v-model="hpd.id_estado_proceso_disciplinario"
                                                                                                v-validate="'required'" data-vv-delay="500"
                                                                                                :class="{'input': true,
                                                                                                'text-danger': errors.has('id_estado_proceso_disciplinario'),
                                                                                                'form-control':true}">
                                                                                          <option v-for="(v,i) in estado_proceso_disciplinario"
                                                                                             :value="i">
                                                                                             {{v}}
                                                                                          </option>
                                                                                       </select>
                                                                                       <transition name="bounce">
                                                                                       <i v-show="errors.has('id_estado_proceso_disciplinario')"
                                                                                          class="fa fa-warning"></i>
                                                                                       </transition>
                                                                                       <transition name="bounce">
                                                                                       <span v-show="errors.has('id_estado_proceso_disciplinario')"
                                                                                          class="text-danger">
                                                                                          {{ errors.first('id_estado_proceso_disciplinario')
                                                                                             | replaceEstadoProcesoDisciplinario }}
                                                                                       </span>
                                                                                       </transition>
                                                                                    </p>
                                                                                    </td>

                                                                                    <!-- Estado proceso disciplinario -->
                                                                                    <td v-if="hpd.id_hallazgo_contraloria_procedimiento_disciplinario!=form_hpd">
                                                                                       {{responsable_proceso_disciplinario[
                                                                                          hpd.id_responsable_proceso_disciplinario
                                                                                       ]}}
                                                                                    </td>
                                                                                    <td v-else>
                                                                                    <p class="control has-icon has-icon-right">
                                                                                       <select name="id_responsable_proceso_disciplinario"
                                                                                                v-model="hpd.id_responsable_proceso_disciplinario"
                                                                                                v-validate="'required'" data-vv-delay="500"
                                                                                                :class="{'input': true,
                                                                                                'text-danger': errors.has('id_responsable_proceso_disciplinario'),
                                                                                                'form-control':true}">
                                                                                          <option v-for="(v,i) in responsable_proceso_disciplinario"
                                                                                             :value="i">
                                                                                             {{v}}
                                                                                          </option>
                                                                                       </select>
                                                                                       <transition name="bounce">
                                                                                       <i v-show="errors.has('id_responsable_proceso_disciplinario')"
                                                                                          class="fa fa-warning"></i>
                                                                                       </transition>
                                                                                       <transition name="bounce">
                                                                                       <span v-show="errors.has('id_responsable_proceso_disciplinario')"
                                                                                          class="text-danger">
                                                                                          {{ errors.first('id_responsable_proceso_disciplinario')
                                                                                             | replaceResponsableProcesoDisciplinario }}
                                                                                       </span>
                                                                                       </transition>
                                                                                    </p>
                                                                                    </td>

                                                                                    <!-- Observaciones -->
                                                                                    <td v-if="hpd.id_hallazgo_contraloria_procedimiento_disciplinario!=form_hpd">
                                                                                       {{hpd.observaciones}}
                                                                                    </td>
                                                                                    <td v-else>
                                                                                    <p class="control has-icon has-icon-right">
                                                                                       <textarea name="observaciones" rows="2"
                                                                                              v-model="hpd.observaciones"
                                                                                              :class="{'input': true, 'text-danger': errors.has('observaciones'),
                                                                                              'scroll_textarea_original':true}"
                                                                                              v-validate="'required'" data-vv-delay="500">
                                                                                          @{{ hpd.observaciones}}
                                                                                       </textarea>
                                                                                       <transition name="bounce">
                                                                                       <i v-show="errors.has('observaciones')" class="fa fa-warning"></i>
                                                                                       </transition>
                                                                                       <transition name="bounce">
                                                                                       <span v-show="errors.has('observaciones')" class="text-danger">
                                                                                          {{ errors.first('observaciones') }}
                                                                                       </span>
                                                                                       </transition>
                                                                                    </p>
                                                                                    </td>

                                                                                 </tr>
                                                                              </tbody>
                                                                           </table>
                                                                        </div><!-- table-responsive styled -->

                                                                     </div><!-- .tab-pane .fade #procedimientosAsignados -->

                                                                     <!-- Historico de Seguimientos -->
                                                                     <div role="tabpanel" class="tab-pane fade" id="historicoProcedimientos">

                                                                        <div class="table-responsive">
                                                                           <table class="table custom-table table-striped text-center">
                                                                              <thead>
                                                                                 <th>Id historico</th>
                                                                                 <th>Tipo</th>
                                                                                 <th>Estado</th>
                                                                                 <th>Responsable</th>
                                                                                 <th>Observaciones</th>
                                                                              </thead>
                                                                              <tbody>
                                                                                 <tr v-for="hhpd in hallazgo_historico_procedimientos_disciplinarios"
                                                                                    v-if="hhpd.id_hallazgo_contraloria ==
                                                                                    hallazgo.id_hallazgo_contraloria">

                                                                                    <td>
                                                                                       {{hhpd.id_hallazgo_historico_procedimiento_disciplinario}}
                                                                                    </td>
                                                                                    <td>
                                                                                       {{tipo_proceso_disciplinario[
                                                                                          hhpd.id_tipo_proceso_disciplinario
                                                                                       ]}}
                                                                                    </td>
                                                                                    <td>
                                                                                       {{estado_proceso_disciplinario[
                                                                                          hhpd.id_estado_proceso_disciplinario
                                                                                       ]}}
                                                                                    </td>
                                                                                    <td>
                                                                                       {{responsable_proceso_disciplinario[
                                                                                          hhpd.id_responsable_proceso_disciplinario
                                                                                       ]}}
                                                                                    </td>
                                                                                    <td>
                                                                                       {{hhpd.observaciones}}
                                                                                    </td>
                                                                                 </tr>
                                                                              </tbody>
                                                                           </table>
                                                                        </div><!-- table-responsive styled -->

                                                                     </div><!-- .tab-pane .fade #historicoProcedimientos -->

                                                                  </div><!-- .tab-content -->
                                                               </div><!-- .panel-body -->

                                                            </div><!-- .panel .with-nav-tabs panel-primary -->

                                                         </div><!-- .row -->
                                                      </dl><!-- .dl-vertical styled margin:20 -->


                                                      <!-- ###################################################################### -->
                                                      <!-- Fin tabla con asignaciones/historicos de procedimientos disciplinarios -->
                                                      <!-- ###################################################################### -->

                                                   </div><!-- .col-md-12 -->

                                                </div><!-- styled -->
                                             </div><!-- .row -->

                                          </dl>

                                       </div>
                                    </div>

                                 </div><!-- .panel-body -->
                              </div><!-- panel -->

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
         name: 'modal-editarhallazgo',
         data () {
            return {
               'instruyeProcedimientoDisciplinario':false,
               'permite_guardar_nuevo_procedimiento_disciplinario':true,
               'form_hpd':0,
               'permiteGuardarHpd':true,
            }
         },
         ready () {},
         created () {},
         filters: {
            replaceNombreHallazgoContraloria(nombre_hallazgo_contraloria) {
               if (nombre_hallazgo_contraloria != null) {nombre_hallazgo_contraloria =
                  nombre_hallazgo_contraloria.replace('nombre_hallazgo_contraloria', 'para el nombre del hallazgo');}
               return nombre_hallazgo_contraloria;
            },
            replaceMateriaObservacion(materia_observacion) {
               if (materia_observacion != null) {materia_observacion =
                  materia_observacion.replace('materia_observacion', 'materia observacion');}
               return materia_observacion;
            },
            replaceProcedimientoDisciplinario: function (procedimiento_disciplinario) {
               if (procedimiento_disciplinario != null) {procedimiento_disciplinario =
                  procedimiento_disciplinario.replace('procedimiento_disciplinario', 'procedimiento disciplinario');}
               return procedimiento_disciplinario;
            },
            replaceTipoProcesoDisciplinario: function (id_tipo_proceso_disciplinario) {
               if (id_tipo_proceso_disciplinario != null) {id_tipo_proceso_disciplinario =
                  id_tipo_proceso_disciplinario.replace('id_tipo_proceso_disciplinario', 'tipo proceso disciplinario');}
               return id_tipo_proceso_disciplinario;
            },
            replaceEstadoProcesoDisciplinario: function (id_estado_proceso_disciplinario) {
               if (id_estado_proceso_disciplinario != null) {id_estado_proceso_disciplinario =
                  id_estado_proceso_disciplinario.replace('id_estado_proceso_disciplinario', 'estado proceso disciplinario');}
               return id_estado_proceso_disciplinario;
            },
            replaceResponsableProcesoDisciplinario: function (id_responsable_proceso_disciplinario) {
               if (id_responsable_proceso_disciplinario != null) {id_responsable_proceso_disciplinario =
                  id_responsable_proceso_disciplinario.replace('id_responsable_proceso_disciplinario', 'responsable proceso disciplinario');}
               return id_responsable_proceso_disciplinario;
            },
            replaceClasificacionMateria: function (id_clasificacion_materia) {
               if (id_clasificacion_materia != null) {id_clasificacion_materia =
                  id_clasificacion_materia.replace('id_clasificacion_materia', 'clasificacion materia');}
               return id_clasificacion_materia;
            },
         },
         methods: {
            cambiar_form_hpd: function(id_hallazgo_contraloria_procedimiento_disciplinario){
               //this.form_hallazgo_editable = (this.form_hallazgo_editable == false ? true : false);
               return this.form_hpd = id_hallazgo_contraloria_procedimiento_disciplinario;
            },
            changeProcedimientoDisciplinario: function () {
               this.instruyeProcedimientoDisciplinario = (this.instruyeProcedimientoDisciplinario==false)?true:false;
               this.hallazgo.procedimiento_disciplinario = this.hallazgo.proceso_disciplinario = this.instruyeProcedimientoDisciplinario;
               return this.hallazgo.procedimiento_disciplinario = this.hallazgo.procedimiento_disciplinario==false?true:false;
            },
            findHallazgoProcedimientoDisciplinarioById: function (items, id) {
               //hpd.id_hallazgo_contraloria_procedimiento_disciplinario
               for (var i in items) {
                  if (items[i].id_hallazgo_contraloria_procedimiento_disciplinario==id) {
                     return items[i];
                  }
               }
               return null;
            },
            guardar_form_hpd: function(id_hallazgo_contraloria_procedimiento_disciplinario,index){
               //return this.form_hpd = 0;
               if(this.form_hpd != 0 && id_hallazgo_contraloria_procedimiento_disciplinario != 0){
                  this.$validator.validateAll().then(result => {});
                  if (this.permiteGuardarHpd == true){
                     this.permiteGuardarHpd = false;
                     var hpd =
                        this.findHallazgoProcedimientoDisciplinarioById(
                           this.hallazgo_procedimientos_disciplinarios,
                           id_hallazgo_contraloria_procedimiento_disciplinario
                        );

                     if (hpd.id_tipo_proceso_disciplinario != '' &&
                        hpd.id_estado_proceso_disciplinario != '' &&
                        hpd.id_responsable_proceso_disciplinario != '' &&
                        hpd.observaciones != '' ){

                        //Lo guarda, verifica si los datos del objeto que son necesarios son iguales, sino que no lo guarde
                        Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                        this.$http.put('/hallazgo_contraloria/update/procedimiento_disciplinario', hpd).then(response => {
                           //console.log(response.body);
                           this.form_hpd = 0;
                           //this.showModalEditarHallazgo = false;
                           //this.permiteGuardarHallazgo = true;
                           var self = this;
                           setTimeout(() => {
                              self.$parent.fetchProcedimientosDisciplinarios();
                              self.permiteGuardarHpd = true;
                           }, 500);

                        }, response => {
                           // error callback
                        });


                     }else{
                        this.permiteGuardarHpd = true;
                     }
                  }else{
                     alert('Se esta procesando la solicitud');
                  }
               }

               /*else if (this.form_hallazgo_editable != 0 && id_hallazgo_contraloria != 0 && index == 0) {
                Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                this.hallazgo = gcf.findHallazgoById(this.hallazgos, id_hallazgo_contraloria);
                this.$http.put('/hallazgo_contraloria/'+id_hallazgo_contraloria, this.hallazgo).then(response => {
                //console.log(response.body);
                this.form_hallazgo_editable = 0;
                var self = this;
                setTimeout(() => {
                self.fetchHallazgos();
                }, 1000);

                }, response => {
                // error callback
                });

                }*/
            },
            guardar_nuevo_procedimiento_disciplinario: function () {
               this.$validator.validateAll().then(result => {});
               if (this.permite_guardar_nuevo_procedimiento_disciplinario == true){
                  this.permite_guardar_nuevo_procedimiento_disciplinario = false;
                  if (
                     this.hallazgo.proceso_disciplinario == true &&
                     this.hallazgo.id_tipo_proceso_disciplinario != '' &&
                     this.hallazgo.id_estado_proceso_disciplinario != '' &&
                     this.hallazgo.id_responsable_proceso_disciplinario != '' &&
                     this.hallazgo.id_hallazgo_contraloria != '' &&
                     this.hallazgo.id_contraloria != '' &&
                     this.hallazgo.observaciones != '' && this.hallazgo.observaciones != null
                  ) {

                     if (this.hallazgo.proceso_disciplinario == false) {
                        this.hallazgo.procedimiento_disciplinario = 'No';
                        this.hallazgo.id_tipo_proceso_disciplinario = 0;
                        this.hallazgo.id_estado_proceso_disciplinario = 0;
                        this.hallazgo.id_responsable_proceso_disciplinario = 0;
                     }else{
                        this.hallazgo.procedimiento_disciplinario = 'Si';
                     }

                     //console.log(this.nuevo_hallazgo);
                     Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                     this.$http.post('/hallazgo_contraloria/store/procedimiento_disciplinario', this.hallazgo).then(response => {

                        this.permite_guardar_nuevo_procedimiento_disciplinario = true;
                        this.hallazgo_procedimientos_disciplinarios.push(response.body);
                        this.hallazgo_historico_procedimientos_disciplinarios.push(response.body);
                        var self = this;
                        setTimeout(function() {
                           //self.$parent.$options.methods.fetchHallazgos();
                           //Cuando guarda hallazgo sin asociar procedimiento disciplinario
                           self.$parent.fetchProcedimientosDisciplinarios();
                           self.hallazgo.procedimiento_disciplinario = true;
                           self.hallazgo.id_tipo_proceso_disciplinario = '';
                           self.hallazgo.id_estado_proceso_disciplinario = '';
                           self.hallazgo.id_responsable_proceso_disciplinario = '';
                           self.hallazgo.observaciones = '';

                        }, 500);

                     }, response => {});
                  }else{
                     this.permite_guardar_nuevo_procedimiento_disciplinario = true;
                  }
               }else{
                  //alert('Se esta procesando la solicitud');
               }
            },
         },
         watch: {
         },
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
      agregarFiltroIdHallazgoGrid: function(){
         if(!this.filtroIdHallazgo){
            this.filtroIdHallazgo = true;
            this.procedimientosDisciplinariosFiltroIdHallazgo = this.historico_hallazgos;
         }else{
            this.historico_hallazgos = this.procedimientosDisciplinariosFiltroIdHallazgo;
         }

         var self = this;
         //Itero la lista de hallazgos y filtro segun el id hallazgo ingresado
         this.historico_hallazgos = _.filter(this.historico_hallazgos, function (h) {
            return h.id_hallazgo_contraloria == self.filterIdHallazgo;
         });
         /*
         if(this.historico_hallazgos.length == 0){
            this.historico_hallazgos = this.procedimientosDisciplinariosFiltroIdHallazgo;
            if (this.filterIdHallazgo == '') return;
            else alert('Sin resultados para el id ingresado');
         }
         */
      },
      // change order variable direction
      changeListOrder: function (column) {
         this.gridOrder == 'asc' ? this.gridOrder = 'desc' : this.gridOrder = 'asc';
         this.orderLists(column);
      },
      calcularDiferenciaTiempo: function (plazo_comprometido){
         plazo_comprometido = plazo_comprometido.split('-');
         var today = new Date();
         var dd = today.getDate();
         var mm = today.getMonth()+1; //January is 0!
         var yyyy = today.getFullYear();

         var date1 = new Date(plazo_comprometido[1]+'/'+plazo_comprometido[0]+'/'+plazo_comprometido[2]);
         var date2 = new Date(mm+'/'+dd+'/'+yyyy);
         var timeDiff = Math.abs(date2.getTime() - date1.getTime());
         var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
         return diffDays;
      },
      fetchProcedimientosDisciplinarios: function (){
         this._gcf = gcf;
         let id_contraloria = $('#id_contraloria').val();
         this.$http.get('/contraloria/'+id_contraloria+'/edit/ajax').then(response => { // success callback
            //console.log(response);
            this.contraloria = response.body.contraloria;
            this.area_contraloria = response.body.area_contraloria;
            this.estado_contraloria = response.body.estado_contraloria;
            this.hallazgos = response.body.hallazgos;
            this.hallazgosTmp = response.body.hallazgos;
            this.compromisos = response.body.compromisos;
            this.compromisosTmp = response.body.compromisos;
            this.compromisos_responsables = response.body.compromisos_responsables;
            this.compromisos_responsablesTmp = response.body.compromisos_responsables;
            this.hallazgos_responsables = response.body.hallazgos_responsables;
            this.hallazgos_responsablesTmp = response.body.hallazgos_responsables;
            this.seguimientos = response.body.seguimientos;
            this.seguimientosTmp = response.body.seguimientos;
            this.archivos = response.body.archivos;
            this.archivosTmp = response.body.archivos;
            this.usuarios = response.body.usuarios;
            this.config = response.body.config;
            this.auth = response.body.auth;
            this.role = response.body.role;
            this.auditor = response.body.auditor;
            this.tipo_proceso_disciplinario = response.body.tipo_proceso_disciplinario;
            this.estado_proceso_disciplinario = response.body.estado_proceso_disciplinario;
            this.responsable_proceso_disciplinario = response.body.responsable_proceso_disciplinario;
            this.criticidad = response.body.criticidad;
            this.clasificacion_materia = response.body.clasificacion_materia;
            this.historico_hallazgos = response.body.historico_hallazgos;
            this.historico_hallazgosTmp = response.body.historico_hallazgos;
            this.hallazgo_historico_procedimientos_disciplinarios = response.body.hallazgo_historico_procedimientos_disciplinarios;
            this.hallazgo_procedimientos_disciplinarios = response.body.hallazgo_procedimientos_disciplinarios;


            this.preloadProcedimientosDisciplinarios();

            //Manda el controller que llama al metodo
            gcf.refetchControllersData({
               'contraloria':this.contraloria,
               'area_contraloria':this.area_contraloria,
               'estado_contraloria':this.estado_contraloria,
               'hallazgos':this.hallazgos,
               'hallazgosTmp':this.hallazgos,
               'compromisos':this.compromisos,
               'compromisosTmp':this.compromisos,
               'compromisos_responsables':this.compromisos_responsables,
               'compromisos_responsablesTmp':this.compromisos_responsables,
               'hallazgos_responsables':this.hallazgos_responsables,
               'hallazgos_responsablesTmp':this.hallazgos_responsables,
               'seguimientos':this.seguimientos,
               'seguimientosTmp':this.seguimientos,
               'archivos':this.archivos,
               'archivosTmp':this.archivos,
               'usuarios':this.usuarios,
               'config':this.config,
               'auth':this.auth,
               'role':this.role,
               'auditor':this.auditor,
               'tipo_proceso_disciplinario':this.tipo_proceso_disciplinario,
               'estado_proceso_disciplinario':this.estado_proceso_disciplinario,
               'responsable_proceso_disciplinario':this.responsable_proceso_disciplinario,
               'criticidad':this.criticidad,
               'clasificacion_materia':this.clasificacion_materia,
               'historico_hallazgos':this.historico_hallazgos,
               'historico_hallazgosTmp':this.historico_hallazgosTmp,
               'hallazgo_historico_procedimientos_disciplinarios':this.hallazgo_historico_procedimientos_disciplinarios,
               'hallazgo_procedimientos_disciplinarios':this.hallazgo_procedimientos_disciplinarios,
            },{
               'HallazgoController':'HallazgoController',
               'CompromisoController':'CompromisoController',
               'SeguimientoController':'SeguimientoController',
               'ArchivoController':'ArchivoController',
               'ResponsableController':'ResponsableController',
            }, 'ProcedimientosDisciplinariosController');

            this.ctd_req_hallazgos = this.contraloria.cantidad_hallazgo_contraloria; // : cantidad de hallazgos especificados al inicio para el contraloria
            this.ctd_hallazgos = this.hallazgos.length; // : cantidad actual de hallazgos referenciados al contraloria
            this.ctd_compromisos = this.compromisos.length;//this.ctd_compromisos = 0;
            this.ctd_seguimientos = this.seguimientos.length;

            ResponsableController.ctd_req_hallazgos = CompromisoController.ctd_req_hallazgos = HallazgoController.ctd_req_hallazgos = SeguimientoController.ctd_req_hallazgos = ArchivoController.ctd_req_hallazgos = this.ctd_req_hallazgos;
            ResponsableController.ctd_hallazgos = CompromisoController.ctd_hallazgos = HallazgoController.ctd_hallazgos = SeguimientoController.ctd_hallazgos = ArchivoController.ctd_hallazgos = this.ctd_hallazgos;
            ResponsableController.ctd_compromisos = CompromisoController.ctd_compromisos = HallazgoController.ctd_compromisos = SeguimientoController.ctd_compromisos = ArchivoController.ctd_compromisos = this.ctd_compromisos;
            ResponsableController.ctd_seguimientos = CompromisoController.ctd_seguimientos = HallazgoController.ctd_seguimientos = SeguimientoController.ctd_seguimientos = ArchivoController.ctd_seguimientos = this.ctd_seguimientos;

            ResponsableController._gcf = CompromisoController._gcf = HallazgoController._gcf = SeguimientoController._gcf = ArchivoController._gcf = this._gcf;

         }, response => { // error callback
            console.log('Error fetchResponsables: '+response);
         });
      },
      filterGridProcedimientoDisciplinarioByComboHallazgo: function (id_hallazgo_contraloria) {
         this.filterIdHallazgo = id_hallazgo_contraloria || null;
         if (this.filterIdHallazgo != null) {
            return this.agregarFiltroIdHallazgoGrid();
         }else{
            //alert('Debe seleccionar un hallazgo');
            this.limpiarFiltros();
         } return;
      },
      limpiarFiltros: function() {
         this.historico_hallazgos = this.historico_hallazgosTmp;
      },
      // function to order users in the list
      orderLists: function (column) {
         this.historico_hallazgos = _.orderBy(this.historico_hallazgos, column, this.gridOrder);
         //console.log(column);
         //this.lists = this.shuffle(_.orderBy(this.lists, 'name', this.listOrder));
         //console.log(this.lists.length);
      },
      preloadProcedimientosDisciplinarios: function(){
         //Para hallazgos y compromisos
         for (let c in this.compromisos) {
            this.compromisos[c].plazo_comprometido_dias = this.calcularDiferenciaTiempo(this.compromisos[c].plazo_comprometido) || 0;
         }

         //Para Seguimientos
         for (let s in this.seguimientos) {
            this.seguimientos[s].id_hallazgo_contraloria =
               gcf.findCompromisoById(this.compromisos,this.seguimientos[s].id_compromiso_contraloria).id_hallazgo_contraloria;
            this.seguimientos[s].nombre_hallazgo_contraloria =
               gcf.findHallazgoById(this.hallazgos, this.seguimientos[s].id_hallazgo_contraloria).nombre_hallazgo_contraloria;
            this.seguimientos[s].nombre_compromiso_contraloria =
               gcf.findCompromisoById(this.compromisos,this.seguimientos[s].id_compromiso_contraloria).nombre_compromiso_contraloria;
            this.seguimientos[s].usuario_registra =
               gcf.findById(this.usuarios,this.seguimientos[s].usuario_registra);
            this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra ?
               this.seguimientos[s].usuario_registra.name : 'Sistema';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';
         }

         //Para Archivos
         for (let a in this.archivos) {
            this.archivos[a].id_hallazgo_contraloria =
               gcf.findCompromisoById(this.compromisos,this.archivos[a].id_compromiso_contraloria).id_hallazgo_contraloria;
            this.archivos[a].nombre_hallazgo_contraloria =
               gcf.findHallazgoById(this.hallazgos, this.archivos[a].id_hallazgo_contraloria).nombre_hallazgo_contraloria;
            this.archivos[a].nombre_compromiso_contraloria =
               gcf.findCompromisoById(this.compromisos,this.archivos[a].id_compromiso_contraloria).nombre_compromiso_contraloria;
            this.archivos[a].usuario_registra =
               gcf.findById(this.usuarios,this.archivos[a].usuario_registra);
            this.archivos[a].usuario_registra = this.archivos[a].usuario_registra ? this.archivos[a].usuario_registra.name : 'Sistema';
            this.archivos[a].observacion = this.archivos[a].observacion || 'Sin Observacion';
            //this.seguimientos[s].usuario_registra = this.seguimientos[s].usuario_registra.name || 'Sistema';
         }

         //Para Responsables
         for (let r in this.compromisos_responsables) {
            this.compromisos_responsables[r].id_hallazgo_contraloria =
               gcf.findCompromisoById(this.compromisos,this.compromisos_responsables[r].id_compromiso_contraloria).id_hallazgo_contraloria;
            this.compromisos_responsables[r].nombre_hallazgo_contraloria =
               gcf.findHallazgoById(this.hallazgos, this.compromisos_responsables[r].id_hallazgo_contraloria).nombre_hallazgo_contraloria;
            this.compromisos_responsables[r].nombre_compromiso_contraloria =
               gcf.findCompromisoById(this.compromisos,this.compromisos_responsables[r].id_compromiso_contraloria).nombre_compromiso_contraloria;
            this.compromisos_responsables[r].area = this.compromisos_responsables[r].area_contraloria.descripcion;
         }

         //Para Hallazgos historico // Procedimientos disciplinarios
         for (let h in this.historico_hallazgos) {
            let hh = gcf.findHallazgoById(this.hallazgos, this.historico_hallazgos[h].id_hallazgo_contraloria);
            this.historico_hallazgos[h].nombre_hallazgo_contraloria = hh.nombre_hallazgo_contraloria ;
            this.historico_hallazgos[h].id_hallazgo_contraloria = hh.id_hallazgo_contraloria ;
         }


      },
      showModalData: function (id_hallazgo_contraloria_evento) {
         this.historico_hallazgo = gcf.findHallazgoEventoById(this.historico_hallazgos, id_hallazgo_contraloria_evento);
         return this.showModal = true;
      },
      /* for transition group flip */
      shuffle: function (items) {return _.shuffle(items)},
      crear_nuevo_procedimiento_disciplinario: function (id_hallazgo_contraloria) {
         this.hallazgo = gcf.findHallazgoById(this.hallazgos, id_hallazgo_contraloria);
         if (this.hallazgo != null) {
            this.nuevo_procedimiento_disciplinario.id_hallazgo_contraloria = id_hallazgo_contraloria;
            this.showModalEditarHallazgo = true;
            this.hallazgo.proceso_disciplinario = true;
            return ;
         }

      },
   },
});
