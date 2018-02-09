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


const ContraloriaController = new Vue({
      el: '#ContraloriaController',
      data(){
         return {
            'contraloria':{
               'id_ministerio':null,
               'id_auditar':null,
               'id_servicio_salud':null,
               'id_establecimiento':null,
               'id_seremi':null,
               'id_subsecretaria':null,
               'id_organismo':null,
               'id_auditor_lider':null,
               'id_proceso_contraloria':null,
               'id_clasificacion_materia':null,
               'ministerio':null,
               'servicio_salud':null,
               'establecimiento':null,
               'seremi':null,
               'organismo':null,
               'sub_secretaria':null,
               'area_auditada':null,
               'objetivo_contraloria':null,
               'actividad_contraloria':null,
               'tipo_contraloria':null,
               'codigo_caigg':null,
               'proceso_contraloria':null,
               'tipo_informe':null,
               'ano':null,
               'fecha':null,
               'numero_informe_unidad':null,
               'numero_informe':null,
               'nombre_contraloria':null,
               'cantidad_hallazgo_contraloria':null,
               'auditores':null,
               'existe':false,
            },
            'contraloria_new':[],
            'ministerio':[],
            'seremis':[],
            'servicio_salud':[],
            'establecimiento':[],
            'establecimientoTmp':[],
            'sub_secretaria':[],
            'organismo':[],
            'nuevo_auditor':{
               '':null,
               '':null,
               'jefatura_equipo':false,
            },
            //begin get inicio contraloria
            'auditor':[],
            'proceso_contraloria':[],
            'equipo_auditor':[],
            'objetivo_contraloria':[],
            'actividad_contraloria':[],
            'tipo_contraloria':[],
            'clasificacion_materia':[],
            'ano':[],
            'numero_informe_unidad':[],
            'tipo_informe':[],
            'criticidad':[],
            //end inicio contraloria
            'establ':false, //establecimiento
            'sersal':false, //servicio salud
            'seremi':false, //seremi
            'organi':false, //organismo
            'subsec':false, //subsecretaria
            'filtroEstablecimiento':false,
            'paso1_filtro':true,
            'paso2_confirmar':false,
            'paso3_crear':false,
            'paso4_finalizar':false,
            'spinner_iniciar':true,
            'spinner_finalizar':false,

         }
      },
      computed: {},
      watch: {
      },
      components: {
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
         this.fetchContraloriaFiltro();
      },
      ready: {},
      filters: {
         replaceEstablecimiento(id_establecimiento) {
            if (id_establecimiento != null) {id_establecimiento = id_establecimiento.replace('id_establecimiento', 'establecimiento');}
            return id_establecimiento;
         },
         replaceServicioSalud(id_servicio_salud) {
            if (id_servicio_salud != null) {id_servicio_salud = id_servicio_salud.replace('id_servicio_salud', 'servicio de salud');}
            return id_servicio_salud;
         },
         replaceSeremi(id_seremi) {
            if (id_seremi != null) {id_seremi = id_seremi.replace('id_seremi', 'seremi');}
            return id_seremi;
         },
         replaceOrganismo(id_organismo) {
            if (id_organismo != null) {id_organismo = id_organismo.replace('id_organismo', 'organismo');}
            return id_organismo;
         },
         replaceSubSecretaria(id_subsecretaria) {
            if (id_subsecretaria != null) {id_subsecretaria = id_subsecretaria.replace('id_subsecretaria', 'subsecretaria');}
            return id_subsecretaria;
         },
         replaceMinisterio(id_ministerio) {
            if (id_ministerio != null) {id_ministerio = id_ministerio.replace('id_ministerio', 'ministerio');}
            return id_ministerio;
         },
         replaceObjetivoContraloria(objetivo_contraloria) {
            if (objetivo_contraloria != null) {objetivo_contraloria = objetivo_contraloria.replace('objetivo_contraloria', 'objetivo contraloria');}
            return objetivo_contraloria;
         },
         replaceActividadContraloria(actividad_contraloria) {
            if (actividad_contraloria != null) {actividad_contraloria =
               actividad_contraloria.replace('actividad_contraloria', 'actividad contraloria');}
            return actividad_contraloria;
         },
         replaceObjetivoContraloria(objetivo_contraloria) {
            if (objetivo_contraloria != null) {objetivo_contraloria = objetivo_contraloria.replace('objetivo_contraloria', 'objetivo contraloria');}
            return objetivo_contraloria;
         },
         replaceAno(ano) {
            if (ano != null) {ano = ano.replace('ano', 'año');}
            return ano;
         },
         replaceNumeroInformeUnidad(numero_informe_unidad) {
            if (numero_informe_unidad != null) {numero_informe_unidad = numero_informe_unidad.replace('numero_informe_unidad', 'unidad');}
            return numero_informe_unidad;
         },
         replaceNumeroInforme(numero_informe) {
            if (numero_informe != null) {numero_informe = numero_informe.replace('numero_informe', 'numero informe');}
            return numero_informe;
         },
         replaceNombreContraloria(nombre_contraloria) {
            if (nombre_contraloria != null) {nombre_contraloria = nombre_contraloria.replace('nombre_contraloria', 'nombre auditoria');}
            return nombre_contraloria;
         },
         replaceCantidadHallazgoContraloria(cantidad_hallazgo_contraloria) {
            if (cantidad_hallazgo_contraloria != null) {cantidad_hallazgo_contraloria =
               cantidad_hallazgo_contraloria.replace('cantidad_hallazgo_contraloria', 'cantidad de hallazgos');}
            return cantidad_hallazgo_contraloria;
         },
         replaceClasificacionMateria(id_clasificacion_materia) {
            if (id_clasificacion_materia != null) {id_clasificacion_materia =
               id_clasificacion_materia.replace('id_clasificacion_materia', 'clasificacion materia');}
            return id_clasificacion_materia;
         },
      },
      methods: {
         //camelCase() => for specific functions
         agregarAuditor: function () {
            //console.log(this.findAuditorById(this.auditor,this.nuevo_auditor.id_auditor).nombre_auditor);
            if (this.nuevo_auditor.id_auditor != null) {

               this.nuevo_auditor.nombre_auditor =
                  this.findAuditorById(this.auditor, this.nuevo_auditor.id_auditor).nombre_auditor
                  || 'Sin nombre ingresado';

               if (this.contraloria.auditores == null) {
                  this.nuevo_auditor.jefatura_equipo = true;
                  this.contraloria.auditores = [];
               }
               this.contraloria.auditores.push(this.nuevo_auditor);
               this.limpiarNuevoAuditor();
            }
         },
         auditar: function (e) {
            if(e.target.value != null && e.target.value != undefined){// && e.target.value  && /^\s*$/.test(e.target.value)){
               switch (e.target.value) {
                  case 'establecimiento':
                     this.resetAuditar();
                     this.establ = true;
                     break;
                  case 'servicio_salud':
                     this.resetAuditar();
                     this.sersal = true;
                     break;
                  case 'seremi':
                     this.resetAuditar();
                     this.seremi = true;
                     break;
                  case 'organismo':
                     this.resetAuditar();
                     this.organi = true;
                     break;
                  case 'subsecretaria':
                     this.resetAuditar();
                     this.subsec = true;
                     break;
               }
               return;
            }else{
               alert('Debe seleccionar un item valido.');
            }
         },
         auditarServicioSalud: function () {
            this.paso1_filtro = false;
            this.paso2_confirmar = true;

            this.contraloria.tipo_contraloria = "Servicio de Salud";
            this.contraloria.ministerio =
               this.findMinisterioById(this.ministerio, this.contraloria.id_ministerio).nombre_ministerio;

            this.contraloria.servicio_salud =
               this.findServicioSaludById(this.servicio_salud, this.contraloria.id_servicio_salud).nombre_servicio;

            //Dato general
            this.contraloria.area_auditada = this.contraloria.servicio_salud;

         },

         auditarEstablecimiento: function () {
            this.paso1_filtro = false;
            this.paso2_confirmar = true;

            this.contraloria.tipo_contraloria = "Establecimiento";
            this.contraloria.ministerio =
               this.findMinisterioById(this.ministerio, this.contraloria.id_ministerio).nombre_ministerio;

            this.contraloria.servicio_salud =
               this.findServicioSaludById(this.servicio_salud, this.contraloria.id_servicio_salud).nombre_servicio;

            this.contraloria.establecimiento =
               this.findEstablecimientoById(this.establecimiento, this.contraloria.id_establecimiento).nombre_establecimiento;

            //Dato general
            this.contraloria.area_auditada = this.contraloria.establecimiento;
         },

         auditarSeremi: function () {
            this.paso1_filtro = false;
            this.paso2_confirmar = true;

            this.contraloria.tipo_contraloria = "Seremi";
            this.contraloria.ministerio =
               this.findMinisterioById(this.ministerio, this.contraloria.id_ministerio).nombre_ministerio;

            this.contraloria.seremi =
               this.findSeremiById(this.seremis, this.contraloria.id_seremi).nombre_centro_responsabilidad;

            //Dato general
            this.contraloria.area_auditada = this.contraloria.seremi;
         },

         auditarOrganismo: function () {
            this.paso1_filtro = false;
            this.paso2_confirmar = true;

            this.contraloria.tipo_contraloria = "Organismo";

            this.contraloria.ministerio =
               this.findMinisterioById(this.ministerio, this.contraloria.id_ministerio).nombre_ministerio;

            this.contraloria.organismo =
               this.findOrganismoById(this.organismo, this.contraloria.id_organismo).nombre_organismo;

            //Dato general
            this.contraloria.area_auditada = this.contraloria.organismo;
         },

         auditarSubsecretaria: function () {
            this.paso1_filtro = false;
            this.paso2_confirmar = true;

            this.contraloria.tipo_contraloria = "Subsecretaria";

            this.contraloria.ministerio =
               this.findMinisterioById(this.ministerio, this.contraloria.id_ministerio).nombre_ministerio;
            this.contraloria.sub_secretaria =
            this.findSubsecretariaById(this.sub_secretaria, this.contraloria.id_subsecretaria).nombre_subsecretaria;

            //Dato general
            this.contraloria.area_auditada = this.contraloria.sub_secretaria;
         },

         buscarAuditorAgregado: function (id_auditor) {
            var items = this.contraloria.auditores;
            for (let i in items) {
               if (items[i].id_auditor == id_auditor) {
                  return true;
               }
            }
            return false;
         },
         fetchContraloriaFiltro: function () {
            this.$http.get('/contraloria/filtro_ajax_data').then(response => { // success callback
               this.ministerio = response.body.ministerio;
               this.seremis = response.body.seremi;
               this.servicio_salud = response.body.servicio_salud;
               this.establecimiento = response.body.establecimiento;
               this.sub_secretaria = response.body.sub_secretaria;
               this.organismo = response.body.organismo;
               this.auth = response.body.auth;
            }, response => { // error callback
               console.log('Error fetch_contraloria: '+response);
            });
            this.$http.get('/contraloria/iniciar_contraloria').then(response => { // success callback
               this.objetivo_contraloria = response.body.objetivo_contraloria;
               this.actividad_contraloria = response.body.actividad_contraloria;
               this.tipo_contraloria = response.body.tipo_contraloria;
               this.clasificacion_materia = response.body.clasificacion_materia;
               this.proceso_contraloria = response.body.proceso_contraloria; //proceso transversal
               this.tipo_informe = response.body.tipo_informe;
               this.ano = response.body.ano;
               this.numero_informe_unidad = response.body.numero_informe_unidad;

               this.auditor = response.body.auditor;

               this.equipo_auditor = response.body.equipo_auditor;

               this.criticidad = response.body.criticidad;
            }, response => { // error callback
               console.log('Error : '+response);
            });

            var self = this;
            setTimeout(function(){
               self.spinner_iniciar = false;
            }, 1500);

            return;
         },
         fijarLiderAuditor: function (id_auditor) {
            var items = this.contraloria.auditores;
            for (let i in items) {
               items[i].jefatura_equipo = false;
               if (items[i].id_auditor == id_auditor && this.contraloria.auditores.length >= 1) {
                  items[i].jefatura_equipo = true;
                  this.contraloria.id_auditor_lider = items[i].id_auditor;
               }
            }
         },
         filtrarEstablecimiento: function () {
            if (this.contraloria.id_servicio_salud == null || this.contraloria.id_servicio_salud == '') {
               return;
            }else{

               if (this.establ == true) this.contraloria.id_establecimiento = null;

               if(!this.filtroEstablecimiento){
                  this.filtroEstablecimiento = true;
                  this.establecimientoTmp = this.establecimiento;
               }else{
                  this.establecimiento = this.establecimientoTmp;
               }

               //Itero la lista de establecimientos y filtro segun servicio de salud seleccionado
               var self = this;
               this.establecimiento = _.filter(this.establecimiento, function (e) {
                  return e.id_servicio_salud == self.contraloria.id_servicio_salud || 0;
               });

               if(this.establecimiento.length == 0){
                  this.establecimiento = this.establecimientoTmp;
               }
            }
         },
         findAuditorById: function (items,id) {
            for (var i in items) {
               if (items[i].id_auditor==id) {
                  return items[i];
               }
            }
            return null;
         },
         findSubSecretariaById: function (items,id) {
            for (var i in items) {
               if (items[i].id_subsecretaria==id) {
                  return items[i];
               }
            }
            return null;
         },
         findServicioSaludById: function (items,id) {
            for (var i in items) {
               if (items[i].id_servicio_salud==id) {
                  return items[i];
               }
            }
            return null;
         },
         findEstablecimientoById: function (items,id) {
            for (var i in items) {
               if (items[i].id_establecimiento==id) {
                  return items[i];
               }
            }
            return null;
         },
         findSeremiById: function (items,id) {
            for (var i in items) {
               if (items[i].id_centro_responsabilidad==id) {
                  return items[i];
               }
            }
            return null;
         },
         findOrganismoById: function (items,id) {
            for (var i in items) {
               if (items[i].id_organismo==id) {
                  return items[i];
               }
            }
            return null;
         },
         findSubsecretariaById: function (items,id) {
            for (var i in items) {
               if (items[i].id_subsecretaria==id) {
                  return items[i];
               }
            }
            return null;
         },
         findMinisterioById: function (items,id) {
            for (var i in items) {
               if (items[i].id_ministerio==id) {
                  return items[i];
               }
            }
            return null;
         },
         guardarContraloria: function () {
            this.spinner_finalizar = true;
            var c = this.contraloria;
            var formData = new FormData();

            formData.append('id_ministerio', c.id_ministerio);
            formData.append('ministerio', c.ministerio);
            formData.append('objetivo_contraloria', c.objetivo_contraloria);
            formData.append('organismo', c.area_auditada);
            formData.append('actividad_contraloria', c.actividad_contraloria);
            formData.append('tipo_contraloria', c.tipo_contraloria);
            formData.append('id_auditar', c.id_auditar);
            formData.append('id_clasificacion_materia', c.id_clasificacion_materia);
            switch (c.id_auditar) {
               case 'establecimiento':
                  formData.append('id_establecimiento', c.id_establecimiento);
                  formData.append('id_servicio_salud', c.id_servicio_salud);
                  break;
               case 'servicio_salud':
                  formData.append('id_servicio_salud', c.id_servicio_salud);
                  formData.append('id_subsecretaria', c.id_subsecretaria);
                  break;
               case 'seremi':
                  formData.append('id_centro_responsabilidad', c.id_seremi);
                  break;
               case 'organismo':
                  formData.append('id_organismo', c.id_organismo);
                  break;
               case 'subsecretaria':
                  formData.append('id_subsecretaria', c.id_subsecretaria);
                  break;
            }
            formData.append('numero_informe', c.numero_informe);
            //formData.append('numero_informe_unidad', c.numero_informe_unidad);
            formData.append('ano', c.ano);
            formData.append('fecha', c.fecha);
            formData.append('nombre_contraloria', c.nombre_contraloria);
            formData.append('id_auditor_lider', c.id_auditor_lider);
            formData.append('id_proceso_contraloria', c.proceso_contraloria || 0);
            formData.append('cantidad_hallazgo_contraloria', c.cantidad_hallazgo_contraloria);
            formData.append('auditores[]', JSON.stringify(c.auditores));
            //for (let i in c.auditores) {}
            //$.each(c.auditores, function(i, auditor) {});

            formData.append('_token', $('#_token').val());
            Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

            this.$http.post('/contraloria', formData).then(response => { // success callback
               //console.log(response);
               this.paso3_crear = false;
               this.spinner_finalizar = false;
               this.paso4_finalizar = true;
               this.contraloria_new = response.data.contraloria_new;
               this.limpiarNuevoAuditor();
               this.limpiarContraloria();
               this.resetAuditar();
            }, response => { // error callback
               console.log('Error : '+response);
            });

            return;
         },
         iniciarContraloria: function () {
            this.paso1_filtro = false;
            this.paso2_confirmar = false;
            this.paso3_crear = true;
         },
         limpiarContraloria: function (){
            return this.contraloria = {
               'id_ministerio':null,
               'id_auditar':null,
               'id_servicio_salud':null,
               'id_subsecretaria':null,
               'id_establecimiento':null,
               'id_seremi':null,
               'id_auditor_lider':null,
               'id_proceso_contraloria':null,
               'ministerio':null,
               'servicio_salud':null,
               'sub_secretaria':null,
               'establecimiento':null,
               'seremi':null,
               'area_auditada':null,
               'objetivo_contraloria':null,
               'actividad_contraloria':null,
               'tipo_contraloria':null,
               'codigo_caigg':null,
               'proceso_contraloria':null,
               'tipo_informe':null,
               'ano':null,
               'fecha':null,
               'numero_informe_unidad':null,
               'numero_informe':null,
               'nombre_contraloria':null,
               'cantidad_hallazgo_contraloria':null,
               'auditores':null,
               'existe':false,
            };
         },
         limpiarNuevoAuditor: function () {
            return this.nuevo_auditor = {
               id_auditor:null,
               nombre_auditor:null,
               jefatura_equipo:false,
            };
         },
         quitarAuditor: function (id_auditor) {
            var items = this.contraloria.auditores;
            for (let i in items) {
               if (items[i].id_auditor == id_auditor) {
                  this.contraloria.auditores.splice(i,1);
               }
            }
            if (this.contraloria.auditores.length == 0) {
               this.contraloria.auditores = null;
            }else{
               this.verificaSiEsJefeDeEquipo(this.contraloria.auditores);
            }

         },
         quitarLiderAuditor: function (id_auditor) {
            var items = this.contraloria.auditores;
            for (let i in items) {
               if (items[i].id_auditor == id_auditor && this.contraloria.auditores.length > 1) {
                  items[i].jefatura_equipo = false;
               }
            }
            if (this.contraloria.auditores.length == 0) {
               this.contraloria.auditores = null;
            }else{
               this.verificaSiEsJefeDeEquipo(this.contraloria.auditores);
            }

         },
         resetAuditar: function () {
            this.establ = false;
            this.sersal = false;
            this.seremi = false;
            this.organi = false;
            this.subsec = false;
            this.contraloria.id_seremi = null;
            this.contraloria.id_establecimiento = null;
            this.contraloria.id_servicio_salud = null;
            this.contraloria.id_organismo = null;
            this.contraloria.id_subsecretaria = null;
            return;
         },
         validateInicioContraloria: function (auditoria) {
            this.$validator.validateAll().then(result => {});
            if (auditoria) {
               var c = this.contraloria;
               switch (auditoria) {
                  case 'auditarServicioSalud':
                     if (c.id_servicio_salud != null) {
                        return this.auditarServicioSalud();
                     }
                     break;
                  case 'auditarEstablecimiento':
                     if (c.id_servicio_salud != null && c.id_establecimiento != null) {
                        return this.auditarEstablecimiento();
                     }
                     break;
                  case 'auditarSeremi':
                     if (c.id_seremi != null) {
                        return this.auditarSeremi();
                     }
                     break;
                  case 'auditarOrganismo':
                     if (c.id_organismo != null) {
                        return this.auditarOrganismo();
                     }
                     break;
                  case 'auditarSubsecretaria':
                     if (c.id_subsecretaria != null) {
                        return this.auditarSubsecretaria();
                     }
                     break;
               }
               return;
            }
         },
         validateFinContraloria: function () {
            var c = this.contraloria;
            this.$validator.validateAll().then(result => {console.log(result);});
            /*&& c.objetivo_contraloria != null && c.actividad_contraloria != null*/
            if (c.existe == false && c.auditores != null && c.nombre_contraloria != null &&
               c.cantidad_hallazgo_contraloria != null && c.id_clasificacion_materia != null &&
               c.fecha != null && c.ano != null && c.numero_informe != null) {
               this.guardarContraloria();
            }
            return;
         },
         validarCantidadHallazgos: function () {
            if (this.contraloria.cantidad_hallazgo_contraloria < 0 && this.contraloria.cantidad_hallazgo_contraloria != 0) {
               this.contraloria.cantidad_hallazgo_contraloria *= -1;
            }
         },
         verificaSiInformeExiste: function () {
            var c = this.contraloria;
            if (c.ano != null/* && c.fecha != null  && c.numero_informe_unidad != null*/ && c.numero_informe != null){

               var formData = new FormData();

               formData.append('ano', c.ano);
               formData.append('fecha', c.fecha);
               formData.append('numero_informe', c.numero_informe);
               //formData.append('numero_informe_unidad', c.numero_informe_unidad);

               formData.append('_token', $('#_token').val());
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

               this.$http.post('/contraloria/valida/numero_informe', formData).then(response => { // success callback
                  if (response.body.result == 0) {
                     //Informe no existe
                     this.contraloria.existe = false;
                  }else if(response.body.result > 0){
                     //Informe existe
                     this.contraloria.existe = true;
                  }
                  //console.log(response);
               }, response => { // error callback
                  console.log('Error : '+response);
               });
               return;
            }
         },
         verificaSiEsJefeDeEquipo: function (items) {
            var hay_jefe = false;
            for (let i in items) {
               if (items[i].jefatura_equipo == true) {
                  hay_jefe = true;
               }
            }
            if (!hay_jefe) {
               this.contraloria.auditores[0].jefatura_equipo = true;
            }
         },
         volverAlPaso1: function () {
            this.paso1_filtro = true;
            this.paso2_confirmar = false;
            this.paso3_crear = false;
            this.paso4_finalizar = false;
         },
         volverAlPaso2: function () {
            this.paso1_filtro = false;
            this.paso2_confirmar = true;
            this.paso3_crear = false;
            this.paso4_finalizar = false;
         },
         //with_dash() => for explained specific functions
      },
   });


