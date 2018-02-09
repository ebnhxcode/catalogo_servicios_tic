import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
import { _ , range } from 'lodash';
import Vue2Filters from 'vue2-filters';
Vue.use(Vue2Filters);

//import es from 'vee-validate/dist/locale/es';
//import VeeValidate, { Validator } from 'vee-validate';

import { validate, clean, format } from 'rut.js';

import moment from 'moment-es6';

// Add locale helper.
//Validator.addLocale(es);

// Install the Plugin and set the locale.
//Vue.use(VeeValidate, { locale: 'es' });

const FormularioController = new Vue({
   el: '#FormularioController ',
   data(){
      return {
         'instructions':[],
         'inputs':[],
         //'labels':[],
         'nav_tab_form_deis':[],
         'deis_form_table_options':[],
         'pais_origen':[],
         'fdc':[],
         'fdc_temp':[],
         'auth':[],

         'formularios_encontrados':{},
         'formulario_guardandose':false,

         //Objeto para modal Mis Formularios gestionados
         'mis_formularios':[],
         'inputs_formulario':[],

         'establecimiento_a_editar':null,

         'spinner_form_deis':true,

         'inputTypes':{
            'basics':['text', 'number', 'email', 'password', 'date', 'time'],
            'select':['select'],
            'textarea':['textarea'],
         },
         'tags': [
            'h1','h2','h3','h4','h5','h6'
         ],

         'show_modal_buscar_formulario':false,
         'show_modal_formularios_encontrados':false,
         'show_modal_errores_formulario':false,
         'show_modal_seleccion_establecimiento':false,
         'show_modal_mis_formularios':false,

         'spinner_iniciar':true,
         'spinner_finalizar':false,
         'mini_loader':false,

         'permiso_temporal_edicion':false,

         'formularioNuevoActivo':false,
         'formularioEditActivo':false,

         'formularioActivoObj':[],

         'hayGuardadoActivo':false,
         'idFormularioActivo':'',

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
      'mini-loader': {
         props: [''],
         'name': 'mini-loader',
         'template':`<div class="mini-loader">Loading...</div>`,
         data () {
            return {
            }
         },
         ready () {},
         created(){},
         filters: {},
         methods: {},
      },
      'inputs':{
         props: ['name','id','type', 'max_length', 'required', 'readonly', 'class_custom', 'style_custom', 'placeholder'],
         'name': 'inputs',
         'template': `
            <input :name="name!=''?name:id"
                   :id="id!=''?id:name"
                   :type="type!=''?type:text"
                   :max-lenght="max_lenght!=''?max_lenght:25"
                   :required="required!=''?required:false"
                   :readonly="readonly!=''?readonly:false"
                   :style="style_custom!=''?style_custom:''"
                   :class="class_custom!=''?class_custom:'form-control'"
                   :placeholder="placeholder!=''?placeholder:''" />
         `,
         data () {},
         ready () {},
         created(){},
         filters: {},
         methods: {},
      },
      'selects':{
         props: ['name','id'],
         'name': 'selects',
         'template': `
            <select name="name"
                    id="id"
                   :required="required"
                   :readonly="readonly"
                   :class="'form-control '+class" />
            </select>
         `,
         data () {},
         ready () {},
         created(){},
         filters: {},
         methods: {},
      },
      'textareas':{
         props: ['name','id'],
         'name': 'textareas',
         'template': `
            <textarea name="name"
                    id="id"
                   :required="required"
                   :readonly="readonly"
                   :class="'form-control '+class" />
            </textarea>
         `,
         data () {},
         ready () {},
         created(){},
         filters: {},
         methods: {},
      },
      'modal_buscar_formulario':{
         props: ['auth'],
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

                              <div id="" class="panel with-nav-tabs panel-primary">
                                 <!-- Items elementos de cabecera -->
                                 <div class="panel-heading">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-tabs small" role="tablist">

                                       <li role="presentation" class="active">
                                          <a href="#lista_personas_run" aria-controls="lista_personas_run" role="tab" data-toggle="tab">
                                             Búsqueda de Personas - <b>Run Madre</b>
                                          </a>
                                       </li>

                                       <li role="presentation">
                                          <a href="#lista_personas_pasaporte" aria-controls="lista_personas_pasaporte"
                                             role="tab" data-toggle="tab">
                                             Búsqueda de Personas - <b>Pasaporte</b>
                                          </a>
                                       </li>

                                       <!-- solo se habilita para el perfil 3 -->
                                       <li role="presentation" v-if="auth && auth.id_role==3">
                                          <a href="#lista_personas_correlativo" aria-controls="lista_personas_correlativo"
                                             role="tab" data-toggle="tab">
                                             Búsqueda de Personas - <b>Correlativo</b>
                                          </a>
                                       </li>

                                    </ul>
                                 </div><!-- .panel-heading -->

                                 <div class="panel-body">
                                    <!-- Tab panes -->
                                    <div class="tab-content">

                                       <div role="tabpanel" class="tab-pane fade in active" id="lista_personas_run">


                                          <dl class="dl-vertical">
                                             <div class="row">
                                                <div class="col-md-12" style="overflow-y: scroll;max-height: 400px;">

                                                   <dt>
                                                      Run Madre
                                                   </dt>
                                                   <dd>

                                                      <!-- Busqueda por RUN -->
                                                      <div class="form-group">
                                                         <div class="input-group input-group-sm">
                                                            <div class="input-group-addon">
                                                               <i class="fa fa-user"></i>
                                                            </div>

                                                            <input class="form-control"
                                                             type="text"
                                                             style="padding-bottom: 5px;"
                                                             name="run_madre"
                                                             placeholder="Ej: 123456789 Sin puntos ni guión"
                                                             id="run_madre"
                                                             maxlength="12"
                                                             v-model="run_madre"
                                                             @keyup.prevent="formatear_rut"
                                                             @change="buscar_por_run">

                                                            <span class="input-group-btn">
                                                               <button class="btn btn-sm btn-info"
                                                                  @click.prevent="buscar_por_run">
                                                                  Buscar&nbsp;<i class="fa fa-search"></i>
                                                               </button>
                                                            </span><!-- .input-group-btn -->
                                                         </div><!-- /.input-group -->
                                                      </div><!-- /.form-group -->


                                                      <div class="table-responsive" v-if="formulario_vacio == false">
                                                         <small class="text-info">Resultados encontrados</small>
                                                         <br>
                                                         <table class="table table-striped small">
                                                            <thead>
                                                               <tr>
                                                                  <th>Accion</th>
                                                                  <th>Correlativo</th>
                                                                  <th>Run Madre</th>
                                                                  <th>Nombres</th>
                                                                  <th>Disponibilidad Registro</th>
                                                                  <th>Estado Registro</th>
                                                                  <th>Fecha Parto</th>
                                                                  <th>Hora Parto</th>
                                                               </tr>
                                                            </thead>
                                                            <tbody>
                                                               <tr v-for="f in formularios">
                                                                  <td>
                                                                     <button class="btn btn-sm btn-primary"
                                                                        @click.prevent="modificar_usuario_seleccionado(f)">
                                                                        <i class="fa fa-pencil"></i>
                                                                     </button>
                                                                  </td>
                                                                  <td>{{f.n_correlativo_interno}}</td>
                                                                  <td>{{f.run_madre}}</td>
                                                                  <td>{{f.nombres_madre}}</td>
                                                                  <td>{{f.estado_form_deis || 'disponible'}}</td>
                                                                  <td>{{f.estado_formulario_completo_form_deis || 'Incompleto'}}</td>
                                                                  <td>{{f.fecha_parto || 'No Ingresado'}}</td>
                                                                  <td>{{f.hora_parto || 'No Ingresado'}}</td>
                                                               </tr>
                                                            </tbody>
                                                         </table>
                                                      </div><!-- .table-responsive -->
                                                   </dd>

                                                </div><!-- .col-md-12 -->
                                             </div>
                                          </dl><!-- dl-horizontal -->


                                       </div><!-- .tab-pane .fade #lista_personas_run -->

<!--////////////////////////////////////////////////////////////////////////////////////-->

                                       <div role="tabpanel" class="tab-pane fade" id="lista_personas_pasaporte">


                                          <dl class="dl-vertical">
                                             <div class="row">
                                                <div class="col-md-12" style="overflow-y: scroll;max-height: 400px;">

                                                   <dt>
                                                      Pasaporte
                                                   </dt>
                                                   <dd>

                                                      <!-- Busqueda por PASAPORTE -->
                                                      <div class="form-group">
                                                         <div class="input-group input-group-sm">
                                                            <div class="input-group-addon">
                                                               <i class="fa fa-user"></i>
                                                            </div>

                                                            <input class="form-control"
                                                             type="text"
                                                             style="padding-bottom: 5px;"
                                                             name="pasaporte_provisorio"
                                                             placeholder="Ej: 123456789 Sin puntos ni guión"
                                                             id="pasaporte_provisorio"
                                                             maxlength="12"
                                                             v-model="pasaporte_provisorio"
                                                             @change="buscar_por_pasaporte">

                                                            <span class="input-group-btn">
                                                               <button class="btn btn-sm btn-info"
                                                                  @click.prevent="buscar_por_pasaporte">
                                                                  Buscar&nbsp;<i class="fa fa-search"></i>
                                                               </button>
                                                            </span><!-- .input-group-btn -->
                                                         </div><!-- /.input-group -->
                                                      </div><!-- /.form-group -->


                                                      <div class="table-responsive" v-if="formulario_vacio == false">
                                                         <small class="text-info">Resultados encontrados</small>
                                                         <br>
                                                         <table class="table table-striped small">
                                                            <thead>
                                                               <tr>
                                                                  <th>Accion</th>
                                                                  <th>Correlativo</th>
                                                                  <th>Run Madre</th>
                                                                  <th>Nombres</th>
                                                                  <th>Disponibilidad Registro</th>
                                                                  <th>Estado Registro</th>
                                                                  <th>Fecha Parto</th>
                                                                  <th>Hora Parto</th>
                                                               </tr>
                                                            </thead>
                                                            <tbody>
                                                               <tr v-for="f in formularios">
                                                                  <td>
                                                                     <button class="btn btn-sm btn-primary"
                                                                        @click.prevent="modificar_usuario_seleccionado(f)">
                                                                        <i class="fa fa-pencil"></i>
                                                                     </button>
                                                                  </td>
                                                                  <td>{{f.n_correlativo_interno}}</td>
                                                                  <td>{{f.run_madre}}</td>
                                                                  <td>{{f.nombres_madre}}</td>
                                                                  <td>{{f.estado_form_deis || 'disponible'}}</td>
                                                                  <td>{{f.estado_formulario_completo_form_deis || 'Incompleto'}}</td>
                                                                  <td>{{f.fecha_parto || 'No Ingresado'}}</td>
                                                                  <td>{{f.hora_parto || 'No Ingresado'}}</td>
                                                               </tr>
                                                            </tbody>
                                                         </table>
                                                      </div><!-- .table-responsive -->
                                                   </dd>

                                                </div><!-- .col-md-12 -->
                                             </div>
                                          </dl><!-- dl-horizontal -->


                                       </div><!-- .tab-pane .fade #lista_personas_pasaporte -->


<!--////////////////////////////////////////////////////////////////////////////////////-->

                                       <div role="tabpanel" class="tab-pane fade" id="lista_personas_correlativo">


                                          <dl class="dl-vertical">
                                             <div class="row">
                                                <div class="col-md-12" style="overflow-y: scroll;max-height: 400px;">

                                                   <dt>
                                                      Correlativo
                                                   </dt>
                                                   <dd>

                                                      <!-- Busqueda por CORRELATIVO -->
                                                      <div class="form-group">
                                                         <div class="input-group input-group-sm">
                                                            <div class="input-group-addon">
                                                               <i class="fa fa-user"></i>
                                                            </div>

                                                            <input class="form-control"
                                                             type="text"
                                                             style="padding-bottom: 5px;"
                                                             name="n_correlativo_interno"
                                                             placeholder="Ej: 403230"
                                                             id="n_correlativo_interno"
                                                             maxlength="12"
                                                             v-model="n_correlativo_interno"
                                                             @change="buscar_por_correlativo" />

                                                            <span class="input-group-btn">
                                                               <button class="btn btn-sm btn-info"
                                                                  @click.prevent="buscar_por_correlativo">
                                                                  Buscar&nbsp;<i class="fa fa-search"></i>
                                                               </button>
                                                            </span><!-- .input-group-btn -->
                                                         </div><!-- /.input-group -->
                                                      </div><!-- /.form-group -->


                                                      <div class="table-responsive" v-if="formulario_vacio == false">
                                                         <small class="text-info">Resultados encontrados</small>
                                                         <br>
                                                         <table class="table table-striped small">
                                                            <thead>
                                                               <tr>
                                                                  <th>Accion</th>
                                                                  <th>Correlativo</th>
                                                                  <th>Run Madre</th>
                                                                  <th>Nombres</th>
                                                                  <th>Disponibilidad Registro</th>
                                                                  <th>Estado Registro</th>
                                                                  <th>Fecha Parto</th>
                                                                  <th>Hora Parto</th>
                                                               </tr>
                                                            </thead>
                                                            <tbody>
                                                               <tr v-for="f in formularios">
                                                                  <td>
                                                                     <button class="btn btn-sm btn-primary"
                                                                        @click.prevent="modificar_usuario_seleccionado(f)">
                                                                        <i class="fa fa-pencil"></i>
                                                                     </button>
                                                                  </td>
                                                                  <td>{{f.n_correlativo_interno}}</td>
                                                                  <td>{{f.run_madre}}</td>
                                                                  <td>{{f.nombres_madre}}</td>
                                                                  <td>{{f.estado_form_deis || 'disponible'}}</td>
                                                                  <td>{{f.estado_formulario_completo_form_deis || 'Incompleto'}}</td>
                                                                  <td>{{f.fecha_parto || 'No Ingresado'}}</td>
                                                                  <td>{{f.hora_parto || 'No Ingresado'}}</td>
                                                               </tr>
                                                            </tbody>
                                                         </table>
                                                      </div><!-- .table-responsive -->
                                                   </dd>

                                                </div><!-- .col-md-12 -->
                                             </div>
                                          </dl><!-- dl-horizontal -->


                                       </div><!-- .tab-pane .fade #lista_personas_pasaporte -->


                                    </div><!-- .panel-heading -->
                                 </div><!-- .panel-heading -->
                              </div><!-- .panel-heading -->


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
         name: 'modal_buscar_formulario',
         data () {
            return {
               'run_madre':'',
               'pasaporte_provisorio':'',
               'n_correlativo_interno':'',
               'formularios':[],
               'formularios_correlativo':[],
               'formulario_vacio':true,
               'formulario_vacio_correlativo':true,
            }
         },
         ready () {
         },
         created () {
         },
         methods: {
            formatear_rut: function () {
               var run = this.run_madre;
               this.run_madre = format(run);
            },
            validar_rut: function (run) {
               if (validate(run) == false) {
                  swal({
                     title: "Advertencia",
                     text: "El formato del rut es incorrecto.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  return this.run = null;
               }else{
                  return format(run);
               }
            },
            buscar_por_pasaporte: function () {
               var formData = new FormData();

               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               formData.append('pasaporte_provisorio', this.pasaporte_provisorio);

               this.$http.post('/formulario/buscar_por_pasaporte', formData).then(response => { // success callback
                  //console.log(response);
                  this.formularios = response.body.formularios;
                  this.formulario_vacio = $.isEmptyObject(this.formularios)==true?true:false;
                  this.pasaporte_provisorio = null;

                  if (this.formulario_vacio == true) {
                     swal({
                        title: "Atención",
                        text: "El pasaporte ingresado no se encuentra registrado.",
                        type: "warning",
                        confirmButtonClass: "btn-danger",
                        closeOnConfirm: false
                     });
                  }

               }, response => { // error callback
                  //console.log(response);
                  this.$parent.check_status_code(response.status);
               });
            },
            buscar_por_run: function () {
               if (!this.run_madre || validate(this.run_madre) == false){
                  swal({
                     title: "Advertencia",
                     text: "Debe ingresar un rut valido.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  return;
               }

               var formData = new FormData();

               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

               var run_limpio = clean(this.run_madre);
               run_limpio = run_limpio.substr(0, run_limpio.length-1);
               //alert (run_limpio) ;
               //return;

               //formData.append('run_madre', this.run_madre);
               formData.append('run_madre', run_limpio);

               this.$http.post('/formulario/buscar_por_run', formData).then(response => { // success callback
                  //console.log(response);
                  this.formularios = response.body.formularios;
                  this.formulario_vacio = $.isEmptyObject(this.formularios)==true?true:false;
                  this.run_madre = null;
                  if (this.formulario_vacio == true) {
                     swal({
                        title: "Atención",
                        text: "El rut ingresado no se encuentra registrado.",
                        type: "warning",
                        confirmButtonClass: "btn-danger",
                        closeOnConfirm: false
                     });
                  }

               }, response => { // error callback
                  //console.log(response);
                  this.$parent.check_status_code(response.status);
               });
            },
            buscar_por_correlativo: function () {
               if (!this.n_correlativo_interno) return;
               var formData = new FormData();

               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               formData.append('n_correlativo_interno', this.n_correlativo_interno);

               this.$http.post('/formulario/buscar_por_correlativo', formData).then(response => { // success callback
                  //console.log(response);

                  //this.formularios_correlativo = response.body.formularios;
                  //this.formulario_vacio_correlativo = $.isEmptyObject(this.formularios_correlativo)==true?true:false;
                  this.formularios = response.body.formularios;
                  this.formulario_vacio = $.isEmptyObject(this.formularios)==true?true:false;
                  this.n_correlativo_interno = null;

                  if (this.formulario_vacio == true) {
                     swal({
                        title: "Atención",
                        text: "El pasaporte ingresado no se encuentra registrado.",
                        type: "warning",
                        confirmButtonClass: "btn-danger",
                        closeOnConfirm: false
                     });
                  }


               }, response => { // error callback
                  //console.log(response);
                  this.$parent.check_status_code(response.status);
               });
            },
            modificar_usuario_seleccionado: function (formulario) {
               /*
                for (let f in formulario) {

                if (f.indexOf('fecha')>-1 && formulario[f]) {
                let fecha_x = formulario[f].split('-');
                formulario[f] = fecha_x[2]+'-'+fecha_x[1]+'-'+fecha_x[0];
                }

                }
                */
               this.$parent.renderizar_solo_inputs();
               this.$parent.fdc = [];
               this.$parent.fdc_temp = [];
               this.$parent.fdc = formulario;
               this.$parent.fdc_temp = formulario;
               this.$parent.formularioActivoObj = formulario;
               this.$parent.formularioEditActivo = true;
               this.$parent.formularioNuevoActivo = false;
               this.$parent.show_modal_buscar_formulario = false;

               /*
               //Generamos limpieza de los campos con el plugin
               $('#select2-establecimiento_control_sifilis-container').val(null).empty();
               $('#select2-establecimiento_control_vih-container').val(null).empty();
               $('#select2-lugar_control_prenatal-container').val(null).empty();
               $('#select2-lugar_control_embarazo-container').val(null).empty();
               $('#select2-lugar_atencion_parto-container').val(null).empty();
               */


               var formData = new FormData();
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               formData.append('n_correlativo_interno', formulario.n_correlativo_interno);

               this.$http.post('/formulario/marcar_registro_form_deis', formData).then(response => { // success callback
                  this.$parent.fdc = [];
                  this.$parent.fdc = response.body.fdc;

                  //console.log(response);
               }, response => { // error callback
                  //console.log(response);
                  this.$parent.check_status_code(response.status);
               });
               this.formularios = [];

            },
         },
         watch: {
         },
      },
      'modal_formularios_encontrados':{
         props: ['formularios_encontrados'],
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

                              <div id="" class="panel with-nav-tabs panel-primary">
                                 <!-- Items elementos de cabecera -->
                                 <div class="panel-heading">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-tabs small" role="tablist">

                                       <li role="presentation" class="active">
                                          <a href="#lista_personas_run" aria-controls="lista_personas_run" role="tab" data-toggle="tab">
                                             Lista de personas encontradas
                                          </a>
                                       </li>

                                    </ul>
                                 </div><!-- .panel-heading -->

                                 <div class="panel-body">
                                    <!-- Tab panes -->
                                    <div class="tab-content">

                                       <div role="tabpanel" class="tab-pane fade in active" id="lista_personas_run">


                                          <dl class="dl-vertical">
                                             <div class="row">
                                                <div class="col-md-12" style="overflow-y: scroll;max-height: 400px;">

                                                   <dt>
                                                      Formularios encontrados
                                                   </dt>
                                                   <dd>
                                                      <div class="table-responsive">
                                                         <small class="text-info">Resultados encontrados</small>
                                                         <br>
                                                         <table class="table table-striped small">
                                                            <thead>
                                                               <tr>
                                                                  <th>Accion</th>
                                                                  <th>Correlativo</th>
                                                                  <th>Run Madre</th>
                                                                  <th>Nombres</th>
                                                                  <th>Disponibilidad Registro</th>
                                                                  <th>Estado Registro</th>
                                                                  <th>Fecha Parto</th>
                                                                  <th>Hora Parto</th>
                                                               </tr>
                                                            </thead>
                                                            <tbody>
                                                               <tr v-for="f in formularios_encontrados">
                                                                  <td>
                                                                     <button class="btn btn-sm btn-primary"
                                                                        @click.prevent="modificar_usuario_seleccionado(f)">
                                                                        <i class="fa fa-pencil"></i>
                                                                     </button>
                                                                  </td>
                                                                  <td>{{f.n_correlativo_interno}}</td>
                                                                  <td>{{f.run_madre}}</td>
                                                                  <td>{{f.nombres_madre}}</td>
                                                                  <td>{{f.estado_form_deis || 'disponible'}}</td>
                                                                  <td>{{f.estado_formulario_completo_form_deis || 'Incompleto'}}</td>
                                                                  <td>{{f.fecha_parto || 'No Ingresado'}}</td>
                                                                  <td>{{f.hora_parto || 'No Ingresado'}}</td>
                                                               </tr>
                                                            </tbody>
                                                         </table>
                                                      </div><!-- .table-responsive -->
                                                   </dd>

                                                </div><!-- .col-md-12 -->
                                             </div>
                                          </dl><!-- dl-horizontal -->


                                       </div><!-- .tab-pane .fade #lista_personas_run -->
                                    </div><!-- .panel-heading -->
                                 </div><!-- .panel-heading -->
                              </div><!-- .panel-heading -->


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
         name: 'modal_formularios_encontrados',
         data () {
            return {
               'run_madre':'',
               'formularios':[],
               'formularios_correlativo':[],
               'formulario_vacio':true,
               'formulario_vacio_correlativo':true,
            }
         },
         ready () {
         },
         created () {
         },
         methods: {
            modificar_usuario_seleccionado: function (formulario) {
               this.$parent.renderizar_solo_inputs();
               this.$parent.fdc = [];
               this.$parent.fdc_temp = [];
               this.$parent.fdc = formulario;
               this.$parent.fdc_temp = formulario;
               this.$parent.formularioActivoObj = formulario;
               this.$parent.formularioEditActivo = true;
               this.$parent.formularioNuevoActivo = false;
               this.$parent.show_modal_formularios_encontrados = false;

               var formData = new FormData();
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               formData.append('n_correlativo_interno', formulario.n_correlativo_interno);

               this.$http.post('/formulario/marcar_registro_form_deis', formData).then(response => { // success callback
                  this.$parent.fdc = [];
                  this.$parent.fdc = response.body.fdc;
                  //console.log(response);
               }, response => { // error callback
                  //console.log(response);
                  this.$parent.check_status_code(response.status);
               });

            },
         },
         watch: {
         },
      },
      'modal_errores_formulario':{
         props: ['auth'],
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

                              <div id="" class="panel with-nav-tabs panel-primary">
                                 <!-- Items elementos de cabecera -->
                                 <div class="panel-heading">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-tabs small" role="tablist">

                                       <li role="presentation" class="active">
                                          <a href="#lista_errores_formulario" aria-controls="lista_errores_formulario" role="tab" data-toggle="tab">
                                             Lista de inconsistencias al ingreso de información en fichas
                                          </a>
                                       </li>

                                       <li role="presentation" v-if="$parent.in_array([2,3,5],auth.id_role)">
                                          <a href="#lista_errores_formulario_otros"
                                             aria-controls="lista_errores_formulario_otros" role="tab" data-toggle="tab">
                                             Inconsistencias de otros
                                             <span class="label label-warning">nuevo</span>
                                          </a>
                                       </li>

                                    </ul>
                                 </div><!-- .panel-heading -->

                                 <div class="panel-body">

                                    <!-- Tab panes -->
                                    <div class="tab-content">




                                       <div role="tabpanel" class="tab-pane fade in active" id="lista_errores_formulario">


                                          <dl class="dl-vertical">
                                             <div class="row">
                                                <div class="col-md-12" style="overflow-y: scroll;max-height: 400px;">

                                                   <dt>
                                                      Inconsistencias identificadas
                                                   </dt>
                                                   <dd>
                                                      <div class="table-responsive">
                                                         <small class="text-info">Resultados encontrados</small>
                                                         <br>
                                                         <table class="table table-striped small">
                                                            <thead>
                                                               <tr>
                                                                  <th>Accion</th>
                                                                  <!-- <th>ID</th> -->
                                                                  <!-- <th># Registro</th> -->
                                                                  <th>Correlativo</th>
                                                                  <th>Run Madre</th>
                                                                  <th>Glosa Error</th>
                                                                  <!-- <th>Estado</th> -->
                                                               </tr>
                                                            </thead>
                                                            <tbody>

                                                               <tr v-for="e,i in auth['form_deis_errores']">
                                                               <!-- v-if="!e.estado || e.estado=='Pendiente' || e.estado=='pendiente'" -->
                                                                  <td>
                                                                     <button class="btn btn-xs btn-success"
                                                                        @click.prevent="marcar_error_revisado(e.id)"
                                                                         v-if="e.estado!='Revisado'">
                                                                        <i class="fa fa-check"></i>
                                                                        <small>Marcar Revisado</small>
                                                                     </button>
                                                                     <button class="btn btn-xs btn-info" v-else>
                                                                        Revisado
                                                                     </button>
                                                                     <!-- Boton editar formulario cumplimiento -->
                                                                     <button class="btn btn-xs btn-primary"
                                                                        v-if="e.run_madre!=null&&e.digito_verificador!=null"
                                                                        @click.prevent="modificar_usuario_seleccionado
                                                                        (e.run_madre,e.digito_verificador)">
                                                                        &nbsp;<i class="fa fa-pencil"></i>
                                                                     </button>
                                                                  </td>
                                                                  <!-- <td>{{e.id}}</td> -->
                                                                  <!-- <td>{{(i+1)}}</td> -->
                                                                  <td>{{e.id_form_deis}}</td>
                                                                  <td>{{e.run_madre+e.digito_verificador}}</td>
                                                                  <td>{{e.glosa_error}}</td>

                                                                  <!--
                                                                   <td :class="e.estado=='Revisado'?'text-success':'text-warning'">
                                                                     {{e.estado || 'Pendiente'}}
                                                                  </td>
                                                                  -->

                                                               </tr>

                                                            </tbody>
                                                         </table>

                                                      </div><!-- .table-responsive -->
                                                      <small class="text-center" v-if="auth['form_deis_errores'].length==0">
                                                         No hay más inconsistencias
                                                      </small>
                                                   </dd>

                                                </div><!-- .col-md-12 -->
                                             </div>
                                          </dl><!-- dl-horizontal -->


                                       </div><!-- .tab-pane .fade #lista_errores_formulario -->



                                       <div role="tabpanel" class="tab-pane fade" id="lista_errores_formulario_otros">

                                          <dl class="dl-vertical">
                                             <div class="row">
                                                <div class="col-md-12" style="overflow-y: scroll;max-height: 400px;">

                                                   <dt>
                                                      Inconsistencias de otros usuarios (matrones o matronas) del sistema
                                                      <small>(Solo para perfil Observador)</small>
                                                      <br><br>
                                                   </dt>
                                                   <dd>

                                                      <div class="row">

                                                         <div class="col-sm-6 col-md-6">

                                                            <dl class="dl-horizontal">
                                                               <dt>
                                                                  Buscar por rut
                                                               </dt>
                                                               <dd>

                                                                  <div class="input-group input-group-sm">
                                                                     <input type="text"
                                                                        placeholder="Ej: 123456789"
                                                                        id="rut_inconsistencias_otros"
                                                                        name="rut_inconsistencias_otros"
                                                                        class="form-control"
                                                                        v-model="rut_inconsistencias_otros"
                                                                        @blur.prevent="buscar_inconsistencias_rut"
                                                                        @change.prevent="buscar_inconsistencias_rut">

                                                                     <span class="input-group-btn">
                                                                        <button class="btn btn-sm btn-primary"
                                                                           @click.prevent="buscar_inconsistencias_rut">
                                                                           &nbsp;<i class="fa fa-search"></i>
                                                                        </button>
                                                                        &nbsp;
                                                                     </span><!-- .input-group-btn -->

                                                                  </div><!-- /.input-group -->

                                                                  <small>completo sin puntos ni guión de matrón o matrona registrado/a.</small>
                                                               </dd>
                                                            </dl>

                                                         </div><!-- .col-* -->

                                                         <div class="col-sm-6 col-md-6">

                                                            <dl class="dl-horizontal">
                                                               <dt>
                                                                  Buscar por email
                                                               </dt>
                                                               <dd>

                                                                  <div class="input-group input-group-sm">
                                                                     <input type="email"
                                                                        id="email_inconsistencias_otros"
                                                                        name="email_inconsistencias_otros"
                                                                        class="form-control"
                                                                        v-model="email_inconsistencias_otros"
                                                                        @blur.prevent="buscar_inconsistencias_email"
                                                                        @change.prevent="buscar_inconsistencias_email">

                                                                     <span class="input-group-btn">
                                                                        <button class="btn btn-sm btn-primary"
                                                                            @click.prevent="buscar_inconsistencias_email">
                                                                           &nbsp;<i class="fa fa-search"></i>
                                                                        </button>
                                                                     </span><!-- .input-group-btn -->
                                                                  </div><!-- /.input-group -->

                                                                  <small>email de matrón o matrona registrado/a.</small>
                                                               </dd>
                                                            </dl>

                                                         </div><!-- .col-* -->

                                                      </div><!-- .row -->

                                                      <div class="table-responsive">
                                                         <small class="text-info btn btn-link pull-right" @click.prevent="inconsistencias=[]">
                                                            Limpiar tabla
                                                         </small>
                                                         <small class="text-info">Resultados encontrados</small>

                                                         <br>
                                                         <table class="table table-striped small">
                                                            <thead>
                                                               <tr>
                                                                  <th>Acción</th>
                                                                  <th>Correlativo</th>
                                                                  <th>Run Madre</th>
                                                                  <th>Glosa Error</th>
                                                                  <th>Estado</th>
                                                               </tr>
                                                            </thead>
                                                            <tbody>

                                                               <tr v-for="e,i in inconsistencias['form_deis_errores']">
                                                               <!-- v-if="!e.estado || e.estado=='Pendiente' || e.estado=='pendiente'" -->

                                                                  <td>
                                                                     <button class="btn btn-xs btn-primary"
                                                                        v-if="e.run_madre!=null&&e.digito_verificador!=null"
                                                                        @click.prevent="modificar_usuario_seleccionado
                                                                        (e.run_madre,e.digito_verificador)">
                                                                        Ir a ver ficha
                                                                        &nbsp;<i class="fa fa-eye"></i>
                                                                     </button>
                                                                     <button class="btn btn-xs btn-warning"
                                                                        @click.prevent="modificar_usuario_seleccionado_id(e.id_form_deis)"
                                                                         v-else>
                                                                        Ir a ver ficha
                                                                        &nbsp;<i class="fa fa-eye"></i>
                                                                     </button>

                                                                  </td>
                                                                  <td>{{e.id_form_deis}}</td>
                                                                  <td>{{e.run_madre+e.digito_verificador}}</td>
                                                                  <td>{{e.glosa_error}}</td>
                                                                  <td :class="e.estado=='Revisado'?'text-success':'text-warning'">
                                                                     {{ (e.estado!='NULL')?e.estado:'Pendiente' || 'Pendiente' }}
                                                                  </td>
                                                               </tr>
                                                            </tbody>
                                                         </table>
                                                      </div><!-- .table-responsive -->
                                                      <small class="text-center" v-if="!inconsistencias['form_deis_errores'] ||
                                                         inconsistencias['form_deis_errores'].length==0">
                                                         No hay más inconsistencias
                                                      </small>
                                                   </dd>

                                                </div><!-- .col-md-12 -->
                                             </div>
                                          </dl><!-- dl-horizontal -->


                                       </div><!-- .tab-pane .fade #lista_errores_formulario_otros -->



                                    </div><!-- .tab-content -->


                                 </div><!-- .panel-heading -->
                              </div><!-- .panel-heading -->


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
         name: 'modal_errores_formulario',
         data () {
            return {
               'rut_inconsistencias_otros':null,
               'email_inconsistencias_otros':null,
               'inconsistencias':[],

            }
         },
         ready () {
         },
         created () {
         },
         methods: {
            buscar_inconsistencias_rut: function () {

               if (validate(this.rut_inconsistencias_otros) == false) {
                  swal({
                     title: "Advertencia",
                     text: "El rut es incorrecto.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  return this.rut_inconsistencias_otros = null;
               }else{
                  format(this.rut_inconsistencias_otros);
               }

               var formData = new FormData();

               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               formData.append('rut', this.rut_inconsistencias_otros);

               this.$http.post('/formulario/buscar_inconsistencias_rut', formData).then(response => { // success callback
                  //console.log(response);
                  this.inconsistencias = [];
                  this.inconsistencias = response.body.inconsistencias[0];
                  //console.log(this.inconsistencias);

               }, response => { // error callback
                  //console.log(response);
                  this.$parent.check_status_code(response.status);
               });


            },
            buscar_inconsistencias_email: function () {

               var formData = new FormData();

               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               formData.append('email', this.email_inconsistencias_otros);

               this.$http.post('/formulario/buscar_inconsistencias_email', formData).then(response => { // success callback
                  //console.log(response);
                  this.inconsistencias = [];
                  this.inconsistencias = response.body.inconsistencias[0];
                  //console.log(this.inconsistencias);

               }, response => { // error callback
                  //console.log(response);
                  this.$parent.check_status_code(response.status);
               });

            },

            modificar_usuario_seleccionado_id: function (id_form_deis) {
               if (!id_form_deis){
                  swal({
                     title: "Advertencia",
                     text: "Debe seleccionar a un usuario válido.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  return;
               }

               this.$parent.fdc = [];
               this.$parent.fdc_temp = [];

               var formData = new FormData();

               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();


               formData.append('id', id_form_deis);

               var formularios = null;
               var formulario_vacio = null;
               this.$http.post('/formulario/buscar_por_id', formData).then(response => { // success callback

                  if (response.status == 200) {

                     formularios = response.body.formularios[0];

                     formulario_vacio = $.isEmptyObject(formularios)==true?true:false;

                     if (formulario_vacio == true) {
                        swal({
                           title: "Atención",
                           text: "El rut ingresado no se encuentra registrado.",
                           type: "warning",
                           confirmButtonClass: "btn-danger",
                           closeOnConfirm: false
                        });
                     }

                     this.$parent.fdc = formularios;
                     this.$parent.fdc_temp = formularios;
                     this.$parent.formularioActivoObj = formularios;

                     this.$parent.formularioEditActivo = true;
                     this.$parent.formularioNuevoActivo = false;

                     this.$parent.show_modal_mis_formularios = false;

                     this.$parent.renderizar_solo_inputs();


                     var formData = new FormData();
                     Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                     formData.append('n_correlativo_interno', formularios.n_correlativo_interno);

                     this.$http.post('/formulario/marcar_registro_form_deis', formData).then(response => { // success callback
                        this.$parent.fdc = response.body.fdc;

                        //console.log(response);
                     }, response => { // error callback
                        //console.log(response);
                        this.$parent.check_status_code(response.status);
                     });

                  }

                  //console.log(formularios);
               }, response => { // error callback
                  //console.log(response);
                  this.$parent.check_status_code(response.status);
               });


               return ;

            },
            modificar_usuario_seleccionado: function (run_madre,digito_verificador) {

               if (!run_madre || !digito_verificador || validate(run_madre+""+digito_verificador) == false){
                  swal({
                     title: "Advertencia",
                     text: "Debe ingresar un rut valido.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  return;
               }

               this.$parent.fdc = [];
               this.$parent.fdc_temp = [];

               var formData = new FormData();

               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

               var run_limpio = clean(run_madre+""+digito_verificador);
               run_limpio = run_limpio.substr(0, run_limpio.length-1);

               formData.append('run_madre', run_limpio);

               var formularios = null;
               var formulario_vacio = null;
               this.$http.post('/formulario/buscar_por_run', formData).then(response => { // success callback

                  if (response.status == 200) {

                     formularios = response.body.formularios[0];

                     formulario_vacio = $.isEmptyObject(formularios)==true?true:false;

                     if (formulario_vacio == true) {
                        swal({
                           title: "Atención",
                           text: "El rut ingresado no se encuentra registrado.",
                           type: "warning",
                           confirmButtonClass: "btn-danger",
                           closeOnConfirm: false
                        });
                     }


                     this.$parent.fdc = formularios;
                     this.$parent.fdc_temp = formularios;
                     this.$parent.formularioActivoObj = formularios;

                     this.$parent.formularioEditActivo = true;
                     this.$parent.formularioNuevoActivo = false;

                     this.$parent.show_modal_errores_formulario = false;

                     this.$parent.renderizar_solo_inputs();


                     var formData = new FormData();
                     Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                     formData.append('n_correlativo_interno', formularios.n_correlativo_interno);

                     this.$http.post('/formulario/marcar_registro_form_deis', formData).then(response => { // success callback
                        this.$parent.fdc = response.body.fdc;

                        //console.log(response);
                     }, response => { // error callback
                        //console.log(response);
                        this.$parent.check_status_code(response.status);
                     });

                  }

                  //console.log(formularios);
               }, response => { // error callback
                  //console.log(response);
                  this.$parent.check_status_code(response.status);
               });


               return ;

            },
            marcar_error_revisado: function (id_error) {
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               var formData = new FormData();
               formData.append('id_error', id_error);

               this.$http.post('/formulario/marcar_error_revisado', formData).then(response => { // success callback
                  //console.log(response.status);

                  if (response.status == 200) {
                     let form_deis_errores = this.auth['form_deis_errores'];
                     for (var e in form_deis_errores) {
                        if (form_deis_errores[e].id == id_error) {
                           form_deis_errores[e].estado = 'Revisado';
                        }
                     }

                  }

                  /*
                   swal("Guardado", `
                   El registro se ha guardado automáticamente con éxito.

                   Recuerda que el registro se guarda cada 5 minutos.
                   `, "success");
                   */

               }, response => { // error callback
                  //console.log(response);
                  this.check_status_code(response.status);
               });
            }

         },
         watch: {
         },
      },
      'modal_seleccion_establecimiento':{
         props: ['auth', 'deis_form_table_options','establecimiento_a_editar'],
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

                              <div id="" class="panel with-nav-tabs panel-primary">
                                 <!-- Items elementos de cabecera -->
                                 <div class="panel-heading">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-tabs small" role="tablist">

                                       <li role="presentation" class="active">
                                          <a href="#lista_establecimientos" aria-controls="lista_establecimientos" role="tab" data-toggle="tab">
                                             Lista de establecimientos
                                          </a>
                                       </li>

                                    </ul>
                                 </div><!-- .panel-heading -->

                                 <div class="panel-body">
                                    <!-- Tab panes -->
                                    <div class="tab-content">

                                       <div role="tabpanel" class="tab-pane fade in active" id="lista_establecimientos">


                                          <dl class="dl-vertical">
                                             <div class="row">




                                                <div class="col-md-12" style="overflow-y: scroll;max-height: 400px;">

                                                <!-- Text animacion al termino de busqueda -->
                                                <transition name="fade" mode="out-in">
                                                   <h5 style="position: relative;" v-if="filterTerm">Filtrando por el criterio '<b>{{ filterTerm }}</b>'</h5>
                                                   <h5 style="position: relative;" v-else>Filtrar por criterio...</h5>
                                                </transition>

                                                <!-- Input filterTerm -->
                                                <div class="form-group">
                                                   <div class="input-group input-group-sm">
                                                      <div class="input-group-addon">
                                                         <i class="fa fa-font"></i>
                                                      </div>
                                                      <!-- Input para escribir el termino a buscar -->
                                                      <input type="text" class="form-control" placeholder="Ingrese criterio de búsqueda para filtrar"
                                                             v-model="filterTerm" id="filterTerm">
                                                      <!-- Boton para limpiar contenido del filtro por criterio -->
                                                         <span class="input-group-btn">
                                                            <button @click.prevent="filterTerm=''" type="button" class="btn btn-default">
                                                               Limpiar
                                                            </button>
                                                         </span><!-- .input-group-btn -->
                                                   </div><!-- /.input-group -->
                                                </div><!-- /.form-group -->

                                                   <dt>
                                                      Seleccione establecimiento
                                                   </dt>
                                                   <dd>
                                                      <div class="table-responsive">
                                                         <small class="text-info">Resultados encontrados</small>
                                                         <br>Establecimientos actuales
                                                         <table class="table table-striped small">
                                                            <thead>
                                                               <tr>
                                                                  <th>Accion</th>
                                                                  <th>Codigo</th>
                                                                  <th>Completo</th>
                                                               </tr>
                                                            </thead>
                                                            <tbody>

                                                               <tr v-for="e in
                                                               filterBy(deis_form_table_options[establecimiento_a_editar], filterTerm)">

                                                                  <td>
                                                                     <button class="btn btn-xs btn-success"
                                                                        @click.prevent="seleccionar_establecimiento(e['$key'])">
                                                                        <i class="fa fa-check"></i>
                                                                        <small>Seleccionar</small>
                                                                     </button>
                                                                  </td>
                                                                  <td>
                                                                     {{e["$key"]}}
                                                                  </td>
                                                                  <td>
                                                                     {{e["$value"]}}
                                                                  </td>

                                                               </tr>
                                                            </tbody>
                                                         </table>
                                                      </div><!-- .table-responsive -->
                                                   </dd>

                                                </div><!-- .col-md-12 -->
                                             </div>
                                          </dl><!-- dl-horizontal -->


                                       </div><!-- .tab-pane .fade #lista_establecimientos -->
                                    </div><!-- .panel-heading -->
                                 </div><!-- .panel-heading -->
                              </div><!-- .panel-heading -->


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
         name: 'modal_seleccion_establecimiento',
         data () {
            return {
               'filterTerm':null,
            }
         },
         ready () {
         },
         created () {
         },
         methods: {
            seleccionar_establecimiento: function (codigo_establecimiento) {
               this.$parent.fdc[this.establecimiento_a_editar] = codigo_establecimiento;
               this.$parent.show_modal_seleccion_establecimiento = false;
               return 0;
            },
         },
         watch: {
         },
      },
      'modal_mis_formularios':{
         props: ['auth', 'mis_formularios', 'inputs_formulario'],
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

                              <div id="" class="panel with-nav-tabs panel-primary">
                                 <!-- Items elementos de cabecera -->
                                 <div class="panel-heading">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-tabs small" role="tablist">

                                       <li role="presentation" class="active">
                                          <a href="#lista_mis_formularios" aria-controls="lista_mis_formularios" role="tab" data-toggle="tab">
                                             Mis fichas gestionadas
                                          </a>
                                       </li>

                                       <li role="presentation" v-if="$parent.in_array([2,3,5],auth.id_role)">
                                          <a href="#lista_formularios_otros" aria-controls="lista_formularios_otros" role="tab" data-toggle="tab">
                                             Fichas gestionadas de otros
                                             <span class="label label-warning">nuevo</span>
                                          </a>
                                       </li>

                                    </ul>
                                 </div><!-- .panel-heading -->

                                 <div class="panel-body">
                                    <!-- Tab panes -->
                                    <div class="tab-content">

                                       <div role="tabpanel" class="tab-pane fade in active" id="lista_mis_formularios">


                                          <div class="row">

                                             <div class="col-md-12" style="overflow-y: scroll;max-height: 400px;">

                                                <div v-if="show_mis_formularios_grid == true">


                                                   <!--// buscador en grid //-->
                                                   <h5 style="position: relative;" v-if="filterTerm">Filtrando por el criterio '<b>{{ filterTerm }}</b>'</h5>
                                                   <h5 style="position: relative;" v-else>Filtrar por criterio...</h5>

                                                   <!-- Input filterTerm -->
                                                   <div class="form-group">
                                                      <div class="input-group input-group-sm">
                                                         <div class="input-group-addon">
                                                            <i class="fa fa-font"></i>
                                                         </div>
                                                         <!-- Input para escribir el termino a buscar -->
                                                         <input type="text" class="form-control"
                                                            placeholder="Ingrese criterio de búsqueda para filtrar"
                                                                v-model="filterTerm" id="filterTerm">
                                                         <!-- Boton para limpiar contenido del filtro por criterio -->
                                                            <span class="input-group-btn">
                                                               <button @click.prevent="filterTerm=''" type="button" class="btn btn-default">
                                                                  Limpiar
                                                               </button>
                                                            </span><!-- .input-group-btn -->
                                                      </div><!-- /.input-group -->
                                                   </div><!-- /.form-group -->



                                                   <dl class="dl-vertical">
                                                      <dt>
                                                         Seleccion de ficha
                                                      </dt>


                                                      <dd>
                                                         <div class="table-responsive">
                                                            <small class="text-info">Resultados encontrados:</small>
                                                            <small class="text-info">{{filterBy(mis_formularios, filterTerm).length || 0}}</small>

                                                            <br>

                                                            <table class="table table-striped small">
                                                               <thead>
                                                                  <tr>

                                                                     <th>Accion</th>
                                                                     <th>Correlativo</th>
                                                                     <th>Run Madre</th>
                                                                     <th>Nombre</th>
                                                                  </tr>
                                                               </thead>
                                                               <tbody>

                                                                  <tr v-for="f in
                                                                     filterBy(mis_formularios, filterTerm)"
                                                                     v-if="f.form_deis != null">

                                                                     <!-- Botón de acción -->
                                                                     <td>
                                                                        <!-- Boton revisar cumplimiento -->
                                                                        <button class="btn btn-xs btn-success"
                                                                           @click.prevent="mostrar_detalles_formulario(f.form_deis)">
                                                                           <!-- <i class="fa fa-external-link-square"></i> -->
                                                                           Revisar cumplimiento <i class="fa fa-check"></i>
                                                                        </button>

                                                                        <!-- Boton editar formulario cumplimiento -->
                                                                        <button class="btn btn-xs btn-primary"
                                                                           v-if="f.form_deis.run_madre!=null&&f.form_deis.digito_verificador!=null"
                                                                           @click.prevent="modificar_usuario_seleccionado(f.form_deis.run_madre,f.form_deis.digito_verificador)">
                                                                           &nbsp;<i class="fa fa-pencil"></i>
                                                                        </button>
                                                                        <button class="btn btn-xs btn-warning"
                                                                           @click.prevent="modificar_usuario_seleccionado_id(f.form_deis.id)"
                                                                           v-else>


                                                                           &nbsp;<i class="fa fa-pencil"></i>
                                                                        </button>

                                                                     </td>

                                                                     <!-- Correlativo -->
                                                                     <td>
                                                                        {{f.form_deis.id}}
                                                                     </td>

                                                                     <!-- Run madre y dv -->
                                                                     <td v-if="f.form_deis.run_madre != null &&
                                                                        f.form_deis.digito_verificador != null">
                                                                        {{
                                                                           f.form_deis.run_madre
                                                                           +""+
                                                                           f.form_deis.digito_verificador
                                                                        }}
                                                                     </td>
                                                                     <td v-else class="text-warning">
                                                                        Run sin ingresar
                                                                     </td>

                                                                     <!-- Nombre Paciente -->
                                                                     <td>
                                                                        {{f.form_deis.nombres_madre ||
                                                                           'Sin Nombre'}}
                                                                        {{f.form_deis.primer_apellido_madre ||
                                                                           'Sin Apellido'}}
                                                                     </td>

                                                                  </tr>

                                                               </tbody>
                                                            </table>
                                                         </div><!-- .table-responsive -->

                                                      </dd>
                                                   </dl><!-- dl-vertical -->


                                                </div>
                                                <div style="padding: 30px;" v-else>


                                                   <dl class="dl-vertical">
                                                      <dt>
                                                      <!-- por el momento, asi vacio se ve bien -->
                                                      </dt>


                                                      <dd>

                                                         <div id="" class="panel with-nav-tabs panel-primary">

                                                            <!-- Items elementos de cabecera -->
                                                            <div class="panel-heading">
                                                               <!-- Nav tabs -->
                                                               <ul class="nav nav-tabs small" role="tablist" style="height: 24px;">

                                                                  <li role="presentation" class="active">
                                                                     <a href="#estadistica_detalle" aria-controls="estadistica_detalle"
                                                                        role="tab" data-toggle="tab"
                                                                        style="padding-top: 1px;padding-bottom: 0px;height: 25px;">
                                                                        Detalle de ficha
                                                                     </a>
                                                                  </li>
                                                                  <!--
                                                                  <li role="presentation" class="">
                                                                     <a href="#estadisticas_generales" aria-controls="estadisticas_generales"
                                                                        role="tab" data-toggle="tab"
                                                                        style="padding-top: 3px;padding-bottom: 0px;height: 24px;">
                                                                        Estadísticas generales
                                                                     </a>
                                                                  </li>
                                                                  -->


                                                               </ul>
                                                            </div><!-- .panel-heading -->

                                                            <div class="panel-body">
                                                               <!-- Tab panes -->
                                                               <div class="tab-content">

                                                                  <div role="tabpanel" class="tab-pane fade in active"
                                                                     id="estadistica_detalle">

                                                                     <button class="btn btn-success btn-xs"
                                                                        @click.prevent="show_mis_formularios_grid=true">
                                                                        Volver
                                                                     </button>

                                                                     <br>
                                                                     <br>

                                                                     <div class="well">
                                                                        <h4 class="text-center">
                                                                           Información de completitud de fichas por pestaña
                                                                        </h4>
                                                                     </div>

                                                                     <div>
                                                                        <!-- Boton editar formulario cumplimiento -->
                                                                        <button class="btn btn-xs btn-primary pull-right"
                                                                           v-if="formulario_tmp['run_madre']!=null &&
                                                                              formulario_tmp['digito_verificador']!=null"
                                                                           @click.prevent="modificar_usuario_seleccionado(
                                                                              formulario_tmp['run_madre'],
                                                                              formulario_tmp['digito_verificador']
                                                                           )">
                                                                           Ir a editar
                                                                           &nbsp;<i class="fa fa-pencil"></i>
                                                                        </button>
                                                                        <button class="btn btn-xs btn-warning pull-right"
                                                                           v-else
                                                                           @click.prevent="modificar_usuario_seleccionado_id(
                                                                              formulario_tmp['id']
                                                                           )">
                                                                           Ir a editar
                                                                           &nbsp;<i class="fa fa-pencil"></i>
                                                                        </button>

                                                                        Nombre: {{
                                                                           (formulario_tmp['nombres_madre'] || 'sin nombre') +" "+
                                                                           (formulario_tmp['primer_apellido_madre'] || 'sin ap. paterno') +" "+
                                                                           (formulario_tmp['segundo_apellido_madre'] || 'sin ap. materno')
                                                                        }}

                                                                     </div>

                                                                     <hr>

                                                                     <!-- Mensaje -->
                                                                     <!--div class="alert alert-info alert-dismissable">
                                                                        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                                                                        El porcentaje es solo referencial, existen campos en el formulario que son opcionales y otros que por reglas de negocio no pueden ser completados.
                                                                     </div-->

                                                                     <!-- Si entra aqui es por que estoy viendo un solo item -->

                                                                     <div class="row">
                                                                     <div class="col-sm-6 col-md-6"
                                                                        v-for="o,i in datos_estadisticas_mi_formulario">

                                                                        <div class="list-group">
                                                                           <div class="list-group-item">

                                                                              <h4>{{ o[Object.keys(o)[0]].title }}</h4>

                                                                           </div>

                                                                           <div class="list-group-item">

                                                                              <span>
                                                                                 <b>Completado: </b>

                                                                                 <!--{{ o[Object.keys(o)[0]].not_null }} campos-->

                                                                                 <small class="pull-right text-success">
                                                                                    {{
                                                                                       Math.round(o[Object.keys(o)[0]].completion) > 100 ?
                                                                                       100 : Math.round(o[Object.keys(o)[0]].completion)
                                                                                    }}% completado
                                                                                 </small>
                                                                              </span>

                                                                              <br>

                                                                              <span>
                                                                                 <b>Sin Completar: </b>
                                                                                    <!-- {{ o[Object.keys(o)[0]].null }} campos -->

                                                                                 <small class="pull-right text-warning">
                                                                                    {{
                                                                                       Math.round(o[Object.keys(o)[0]].remaining) < 0 ?
                                                                                       0 : Math.round(o[Object.keys(o)[0]].remaining)
                                                                                    }}% restante
                                                                                 </small>
                                                                              </span>

                                                                              <br>

                                                                              <span>
                                                                                 <!-- <b>De un total de: {{ o[Object.keys(o)[0]].total }} campos</b> -->
                                                                              </span>



                                                                              <div class="progress">
                                                                                 <div class="progress-bar progress-bar-success progress-bar-striped active"
                                                                                    :style="'width: '+
                                                                                       ((o[Object.keys(o)[0]].completion) > 100 ?
                                                                                       100 : o[Object.keys(o)[0]].completion)
                                                                                    +'%'">
                                                                                    <span class="">
                                                                                       +{{
                                                                                          (Math.round(o[Object.keys(o)[0]].completion) > 100) ?
                                                                                          100 : Math.round(o[Object.keys(o)[0]].completion)
                                                                                       }}%
                                                                                    </span>
                                                                                 </div>
                                                                                 <div class="progress-bar progress-bar-warning progress-bar-striped active"
                                                                                    :style="'width: '+
                                                                                       ((o[Object.keys(o)[0]].remaining < 0) ?
                                                                                       0 : o[Object.keys(o)[0]].remaining)
                                                                                    +'%'">
                                                                                    <span class="">
                                                                                       -{{
                                                                                          (Math.round(o[Object.keys(o)[0]].remaining) < 0) ?
                                                                                          0 : Math.round(o[Object.keys(o)[0]].remaining)
                                                                                       }}%
                                                                                    </span>
                                                                                 </div>
                                                                              </div>

                                                                              <div v-if="o.field_name.field_name.length > 0">

                                                                                 <button class="btn btn-danger btn-sm"
                                                                                    type="button" data-toggle="collapse"
                                                                                         style="box-shadow: 2px 1px 2px 1px #dbdbdb;"
                                                                                         :data-target="'#fields'+i" aria-expanded="false"
                                                                                         :aria-controls="'fields'+i">
                                                                                    <small>Ver campos por completar</small>
                                                                                 </button><!-- .btn .btn-success -->


                                                                                 <div class="collapse" :id="'fields'+i"
                                                                                    style="overflow-y: scroll;max-height: 200px;">
                                                                                    <h5>Campos por completar</h5>

                                                                                    <span class="small text-success"
                                                                                       v-if="Math.round(o[Object.keys(o)[0]].completion) == 100">
                                                                                       A continuación sólo quedan campos opcionales
                                                                                       <br>
                                                                                    </span>

                                                                                    <ul v-for="i in o.field_name.field_name">
                                                                                       <li class="small">{{i.keyjs}}</li>
                                                                                    </ul>
                                                                                 </div><!-- .collapse #fields -->

                                                                              </div>

                                                                           </div>

                                                                        </div>


                                                                     </div><!-- .col -->
                                                                     </div><!-- .row -->
                                                                  </div><!-- .tab-pane .fade #estadistica_detalle -->


                                                                  <div role="tabpanel" class="tab-pane <!--fade in active-->"
                                                                     id="estadisticas_generales">

                                                                     <small>Temporalmente sin datos</small>

                                                                  </div><!-- .tab-pane .fade #estadisticas_generales -->

                                                               </div><!-- .tab-content -->
                                                            </div><!-- .panel-body -->
                                                         </div><!-- .panel -->


                                                      </dd>

                                                   </dl><!-- dl-horizontal -->

                                                </div>

                                             </div><!-- .col-md-12 -->
                                          </div>
                                       </div><!-- .tab-pane .fade #lista_mis_formularios -->

<!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

                                       <div role="tabpanel" class="tab-pane fade" id="lista_formularios_otros">

                                          <div class="row">

                                             <div class="col-md-12" style="overflow-y: scroll;max-height: 400px;">

                                                <h4 class="text-center">Fichas de otros usuarios (Solo para perfil observador)</h4>
                                                <br>

                                                <div v-if="show_formularios_otros_grid == true">

                                                      <div class="row">

                                                         <div class="col-sm-6 col-md-6">

                                                            <dl class="dl-horizontal">
                                                               <dt>
                                                                  Buscar por rut
                                                               </dt>
                                                               <dd>

                                                                  <div class="input-group input-group-sm">
                                                                     <input type="text"
                                                                        placeholder="Ej: 123456789"
                                                                        id="rut_formularios_otros"
                                                                        name="rut_formularios_otros"
                                                                        class="form-control"
                                                                        v-model="rut_formularios_otros"
                                                                        @blur.prevent="buscar_formularios_otros_rut"
                                                                        @change.prevent="buscar_formularios_otros_rut">

                                                                     <span class="input-group-btn">
                                                                        <button class="btn btn-sm btn-primary"
                                                                           @click.prevent="buscar_formularios_otros_rut">
                                                                           &nbsp;<i class="fa fa-search"></i>
                                                                        </button>
                                                                        &nbsp;
                                                                     </span><!-- .input-group-btn -->

                                                                  </div><!-- /.input-group -->

                                                                  <small>completo sin puntos ni guión de matrón o matrona registrado/a.</small>
                                                               </dd>
                                                            </dl>

                                                         </div><!-- .col-* -->

                                                         <div class="col-sm-6 col-md-6">

                                                            <dl class="dl-horizontal">
                                                               <dt>
                                                                  Buscar por email
                                                               </dt>
                                                               <dd>

                                                                  <div class="input-group input-group-sm">
                                                                     <input type="email"
                                                                        id="email_formularios_otros"
                                                                        name="email_formularios_otros"
                                                                        class="form-control"
                                                                        v-model="email_formularios_otros"
                                                                        @blur.prevent="buscar_formularios_otros_email"
                                                                        @change.prevent="buscar_formularios_otros_email">

                                                                     <span class="input-group-btn">
                                                                        <button class="btn btn-sm btn-primary"
                                                                            @click.prevent="buscar_formularios_otros_email">
                                                                           &nbsp;<i class="fa fa-search"></i>
                                                                        </button>
                                                                     </span><!-- .input-group-btn -->
                                                                  </div><!-- /.input-group -->

                                                                  <small>email de matrón o matrona registrado/a.</small>
                                                               </dd>
                                                            </dl>

                                                         </div><!-- .col-* -->

                                                      </div><!-- .row -->

                                                   <!--// buscador en grid //-->
                                                   <h5 style="position: relative;" v-if="filterTermOtros">Filtrando por el criterio '<b>{{ filterTermOtros }}</b>'</h5>
                                                   <h5 style="position: relative;" v-else>Filtrar por criterio...</h5>

                                                   <!-- Input filterTermOtros -->
                                                   <div class="form-group">
                                                      <div class="input-group input-group-sm">
                                                         <div class="input-group-addon">
                                                            <i class="fa fa-font"></i>
                                                         </div>
                                                         <!-- Input para escribir el termino a buscar -->
                                                         <input type="text" class="form-control"
                                                            placeholder="Ingrese criterio de búsqueda para filtrar"
                                                                v-model="filterTermOtros" id="filterTermOtros">
                                                         <!-- Boton para limpiar contenido del filtro por criterio -->
                                                            <span class="input-group-btn">
                                                               <button @click.prevent="filterTermOtros=''" type="button" class="btn btn-default">
                                                                  Limpiar
                                                               </button>
                                                            </span><!-- .input-group-btn -->
                                                      </div><!-- /.input-group -->
                                                   </div><!-- /.form-group -->



                                                   <dl class="dl-vertical">
                                                      <dt>
                                                         Seleccion de ficha
                                                      </dt>


                                                      <dd>
                                                         <div class="table-responsive">
                                                            <small class="text-info">Resultados encontrados:</small>
                                                            <small class="text-info btn btn-link pull-right" @click.prevent="formularios_otros=[]">
                                                               Limpiar tabla
                                                            </small>
                                                            <small class="text-info">{{filterBy(formularios_otros, filterTermOtros).length || 0}}</small>

                                                            <br>

                                                            <table class="table table-striped small">
                                                               <thead>
                                                                  <tr>

                                                                     <th>Accion</th>
                                                                     <th>Correlativo</th>
                                                                     <th>Run Madre</th>
                                                                     <th>Nombre</th>
                                                                  </tr>
                                                               </thead>
                                                               <tbody>

                                                                  <tr v-for="f in
                                                                     filterBy(formularios_otros, filterTermOtros)"
                                                                     v-if="f.form_deis != null">

                                                                     <!-- Botón de acción -->
                                                                     <td>
                                                                        <!-- Boton revisar cumplimiento -->
                                                                        <button class="btn btn-xs btn-success"
                                                                           @click.prevent="mostrar_detalles_formulario_otros(f.form_deis)">
                                                                           <!-- <i class="fa fa-external-link-square"></i> -->
                                                                           Revisar cumplimiento <i class="fa fa-check"></i>
                                                                        </button>

                                                                        <!-- Boton editar formulario cumplimiento -->
                                                                        <button class="btn btn-xs btn-primary"
                                                                           v-if="f.form_deis.run_madre!=null&&f.form_deis.digito_verificador!=null"
                                                                           @click.prevent="modificar_usuario_seleccionado(f.form_deis.run_madre,f.form_deis.digito_verificador)">
                                                                           &nbsp;<i class="fa fa-pencil"></i>
                                                                        </button>
                                                                        <button class="btn btn-xs btn-warning"
                                                                           @click.prevent="modificar_usuario_seleccionado_id(f.form_deis.id)"
                                                                           v-else>
                                                                           &nbsp;<i class="fa fa-pencil"></i>
                                                                        </button>
                                                                     </td>

                                                                     <!-- Correlativo -->
                                                                     <td>
                                                                        {{f.form_deis.id}}
                                                                     </td>

                                                                     <!-- Run madre y dv -->
                                                                     <td v-if="f.form_deis.run_madre != null &&
                                                                        f.form_deis.digito_verificador != null">
                                                                        {{
                                                                           f.form_deis.run_madre
                                                                           +""+
                                                                           f.form_deis.digito_verificador
                                                                        }}
                                                                     </td>
                                                                     <td v-else class="text-warning">
                                                                        Run sin ingresar
                                                                     </td>

                                                                     <!-- Nombre Paciente -->
                                                                     <td>
                                                                        {{f.form_deis.nombres_madre ||
                                                                           'Sin Nombre'}}
                                                                        {{f.form_deis.primer_apellido_madre ||
                                                                           'Sin Apellido'}}
                                                                     </td>

                                                                  </tr>

                                                               </tbody>
                                                            </table>
                                                         </div><!-- .table-responsive -->

                                                      </dd>
                                                   </dl><!-- dl-vertical -->


                                                </div>
                                                <div style="padding: 30px;" v-else>


                                                   <dl class="dl-vertical">
                                                      <dt>
                                                      <!-- por el momento, asi vacio se ve bien -->
                                                      </dt>


                                                      <dd>

                                                         <div id="" class="panel with-nav-tabs panel-primary">

                                                            <!-- Items elementos de cabecera -->
                                                            <div class="panel-heading">
                                                               <!-- Nav tabs -->
                                                               <ul class="nav nav-tabs small" role="tablist" style="height: 24px;">

                                                                  <li role="presentation" class="active">
                                                                     <a href="#estadistica_detalle" aria-controls="estadistica_detalle"
                                                                        role="tab" data-toggle="tab"
                                                                        style="padding-top: 1px;padding-bottom: 0px;height: 25px;">
                                                                        Detalle de ficha
                                                                     </a>
                                                                  </li>
                                                                  <!--
                                                                  <li role="presentation" class="">
                                                                     <a href="#estadisticas_generales" aria-controls="estadisticas_generales"
                                                                        role="tab" data-toggle="tab"
                                                                        style="padding-top: 3px;padding-bottom: 0px;height: 24px;">
                                                                        Estadísticas generales
                                                                     </a>
                                                                  </li>
                                                                  -->


                                                               </ul>
                                                            </div><!-- .panel-heading -->

                                                            <div class="panel-body">
                                                               <!-- Tab panes -->
                                                               <div class="tab-content">

                                                                  <div role="tabpanel" class="tab-pane fade in active"
                                                                     id="estadistica_detalle">

                                                                     <button class="btn btn-success btn-xs"
                                                                        @click.prevent="show_formularios_otros_grid=true">
                                                                        Volver
                                                                     </button>

                                                                     <br>
                                                                     <br>

                                                                     <div class="well">
                                                                        <h4 class="text-center">
                                                                           Información de completitud de fichas por pestaña
                                                                        </h4>
                                                                     </div>

                                                                     <div>
                                                                        <!-- Boton editar formulario cumplimiento -->
                                                                        <button class="btn btn-xs btn-primary pull-right"
                                                                           v-if="formulario_otros_tmp['run_madre']!=null &&
                                                                              formulario_otros_tmp['digito_verificador']!=null"
                                                                           @click.prevent="modificar_usuario_seleccionado(
                                                                              formulario_otros_tmp['run_madre'],
                                                                              formulario_otros_tmp['digito_verificador']
                                                                           )">
                                                                           Ir a editar
                                                                           &nbsp;<i class="fa fa-pencil"></i>
                                                                        </button>
                                                                        <button class="btn btn-xs btn-warning pull-right"
                                                                           v-else
                                                                           @click.prevent="modificar_usuario_seleccionado_id(
                                                                              formulario_otros_tmp['id']
                                                                           )">
                                                                           Ir a editar
                                                                           &nbsp;<i class="fa fa-pencil"></i>
                                                                        </button>

                                                                        Nombre: {{
                                                                           (formulario_otros_tmp['nombres_madre'] || 'sin nombre') +" "+
                                                                           (formulario_otros_tmp['primer_apellido_madre'] || 'sin ap. paterno') +" "+
                                                                           (formulario_otros_tmp['segundo_apellido_madre'] || 'sin ap. materno')
                                                                        }}

                                                                     </div>

                                                                     <hr>

                                                                     <!-- Mensaje -->
                                                                     <!--div class="alert alert-info alert-dismissable">
                                                                        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                                                                        El porcentaje es solo referencial, existen campos en el formulario que son opcionales y otros que por reglas de negocio no pueden ser completados.
                                                                     </div-->

                                                                     <!-- Si entra aqui es por que estoy viendo un solo item -->

                                                                     <div class="row">
                                                                     <div class="col-sm-6 col-md-6"
                                                                        v-for="o,i in datos_estadisticas_mi_formulario_otros">

                                                                        <div class="list-group">
                                                                           <div class="list-group-item">

                                                                              <h4>{{ o[Object.keys(o)[0]].title }}</h4>

                                                                           </div>

                                                                           <div class="list-group-item">

                                                                              <span>
                                                                                 <b>Completado: </b>

                                                                                 <!--{{ o[Object.keys(o)[0]].not_null }} campos-->

                                                                                 <small class="pull-right text-success">
                                                                                    {{
                                                                                       Math.round(o[Object.keys(o)[0]].completion) > 100 ?
                                                                                       100 : Math.round(o[Object.keys(o)[0]].completion)
                                                                                    }}% completado
                                                                                 </small>
                                                                              </span>

                                                                              <br>

                                                                              <span>
                                                                                 <b>Sin Completar: </b>
                                                                                    <!-- {{ o[Object.keys(o)[0]].null }} campos -->

                                                                                 <small class="pull-right text-warning">
                                                                                    {{
                                                                                       Math.round(o[Object.keys(o)[0]].remaining) < 0 ?
                                                                                       0 : Math.round(o[Object.keys(o)[0]].remaining)
                                                                                    }}% restante
                                                                                 </small>
                                                                              </span>

                                                                              <br>

                                                                              <span>
                                                                                 <!-- <b>De un total de: {{ o[Object.keys(o)[0]].total }} campos</b> -->
                                                                              </span>



                                                                              <div class="progress">
                                                                                 <div class="progress-bar progress-bar-success progress-bar-striped active"
                                                                                    :style="'width: '+
                                                                                       ((o[Object.keys(o)[0]].completion) > 100 ?
                                                                                       100 : o[Object.keys(o)[0]].completion)
                                                                                    +'%'">
                                                                                    <span class="">
                                                                                       +{{
                                                                                          (Math.round(o[Object.keys(o)[0]].completion) > 100) ?
                                                                                          100 : Math.round(o[Object.keys(o)[0]].completion)
                                                                                       }}%
                                                                                    </span>
                                                                                 </div>
                                                                                 <div class="progress-bar progress-bar-warning progress-bar-striped active"
                                                                                    :style="'width: '+
                                                                                       ((o[Object.keys(o)[0]].remaining < 0) ?
                                                                                       0 : o[Object.keys(o)[0]].remaining)
                                                                                    +'%'">
                                                                                    <span class="">
                                                                                       -{{
                                                                                          (Math.round(o[Object.keys(o)[0]].remaining) < 0) ?
                                                                                          0 : Math.round(o[Object.keys(o)[0]].remaining)
                                                                                       }}%
                                                                                    </span>
                                                                                 </div>
                                                                              </div>

                                                                              <div v-if="o.field_name.field_name.length > 0">

                                                                                 <button class="btn btn-danger btn-sm"
                                                                                    type="button" data-toggle="collapse"
                                                                                         style="box-shadow: 2px 1px 2px 1px #dbdbdb;"
                                                                                         :data-target="'#fields'+i" aria-expanded="false"
                                                                                         :aria-controls="'fields'+i">
                                                                                    <small>Ver campos por completar</small>
                                                                                 </button><!-- .btn .btn-success -->


                                                                                 <div class="collapse" :id="'fields'+i"
                                                                                    style="overflow-y: scroll;max-height: 200px;">
                                                                                    <h5>Campos por completar</h5>

                                                                                    <span class="small text-success"
                                                                                       v-if="Math.round(o[Object.keys(o)[0]].completion) == 100">
                                                                                       A continuación sólo quedan campos opcionales
                                                                                       <br>
                                                                                    </span>

                                                                                    <ul v-for="i in o.field_name.field_name">
                                                                                       <li class="small">{{i.keyjs}}</li>
                                                                                    </ul>
                                                                                 </div><!-- .collapse #fields -->

                                                                              </div>

                                                                           </div>

                                                                        </div>


                                                                     </div><!-- .col -->
                                                                     </div><!-- .row -->
                                                                  </div><!-- .tab-pane .fade #estadistica_detalle -->


                                                                  <div role="tabpanel" class="tab-pane <!--fade in active-->"
                                                                     id="estadisticas_generales">

                                                                     <small>Temporalmente sin datos</small>

                                                                  </div><!-- .tab-pane .fade #estadisticas_generales -->

                                                               </div><!-- .tab-content -->
                                                            </div><!-- .panel-body -->
                                                         </div><!-- .panel -->


                                                      </dd>

                                                   </dl><!-- dl-horizontal -->

                                                </div>

                                             </div><!-- .col-md-12 -->
                                          </div>
                                       </div><!-- .tab-pane .fade #lista_formularios_otros -->




                                    </div><!-- .panel-heading -->
                                 </div><!-- .panel-heading -->
                              </div><!-- .panel-heading -->


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
         name: 'modal_mis_formularios',
         data () {
            return {
               'filterTerm':null,
               'filterTermOtros':null,
               'rut_formularios_otros':null,
               'email_formularios_otros':null,
               'show_mis_formularios_grid':true,
               'show_formularios_otros_grid':true,
               'formulario_tmp':{},
               'formulario_otros_tmp':{},
               'formularios_otros':[],
               'inputs_formularios_otros':[],
               'datos_estadisticas_mi_formulario':[],
               'datos_estadisticas_mi_formulario_otros':[],
               //'mis_formularios':{},
            }
         },
         ready () {
            //console.log(this.auth);
            this.show_mis_formularios_grid=false;
            this.show_formularios_otros_grid=false;

         },
         created () {

            //this.mis_formularios =

         },
         methods: {

            buscar_formularios_otros_rut: function () {


               if (validate(this.rut_formularios_otros) == false) {
                  swal({
                     title: "Advertencia",
                     text: "El rut es incorrecto.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  return this.rut_formularios_otros = null;
               }else{
                  format(this.rut_formularios_otros);
               }

               var formData = new FormData();

               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               formData.append('rut', this.rut_formularios_otros);

               this.$http.post('/formulario/buscar_formularios_otros_rut', formData).then(response => { // success callback
                  //return console.log(response);
                  this.formularios_otros = [];
                  this.inputs_formularios_otros = [];
                  this.formularios_otros = response.body.formularios_otros;
                  this.inputs_formularios_otros = response.body.inputs_formularios_otros;
                  //console.log(this.inconsistencias);

               }, response => { // error callback
                  //console.log(response);
                  this.$parent.check_status_code(response.status);
               });


            },

            buscar_formularios_otros_email: function () {


               var formData = new FormData();

               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               formData.append('email', this.email_formularios_otros);

               this.$http.post('/formulario/buscar_formularios_otros_email', formData).then(response => { // success callback
                  //return console.log(response);
                  this.formularios_otros = [];
                  this.inputs_formularios_otros = [];
                  this.formularios_otros = response.body.formularios_otros;
                  this.inputs_formularios_otros = response.body.inputs_formularios_otros;
                  //console.log(this.inconsistencias);

               }, response => { // error callback
                  //console.log(response);
                  this.$parent.check_status_code(response.status);
               });


            },

            modificar_usuario_seleccionado_id: function (id_form_deis) {
               if (!id_form_deis){
                  swal({
                     title: "Advertencia",
                     text: "Debe seleccionar a un usuario válido.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  return;
               }

               this.$parent.fdc = [];
               this.$parent.fdc_temp = [];

               var formData = new FormData();

               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();


               formData.append('id', id_form_deis);

               var formularios = null;
               var formulario_vacio = null;
               this.$http.post('/formulario/buscar_por_id', formData).then(response => { // success callback

                  if (response.status == 200) {

                     formularios = response.body.formularios[0];

                     formulario_vacio = $.isEmptyObject(formularios)==true?true:false;

                     if (formulario_vacio == true) {
                        swal({
                           title: "Atención",
                           text: "El rut ingresado no se encuentra registrado.",
                           type: "warning",
                           confirmButtonClass: "btn-danger",
                           closeOnConfirm: false
                        });
                     }

                     this.$parent.fdc = formularios;
                     this.$parent.fdc_temp = formularios;
                     this.$parent.formularioActivoObj = formularios;

                     this.$parent.formularioEditActivo = true;
                     this.$parent.formularioNuevoActivo = false;

                     this.$parent.show_modal_mis_formularios = false;

                     this.$parent.renderizar_solo_inputs();


                     var formData = new FormData();
                     Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                     formData.append('n_correlativo_interno', formularios.n_correlativo_interno);

                     this.$http.post('/formulario/marcar_registro_form_deis', formData).then(response => { // success callback
                        this.$parent.fdc = response.body.fdc;

                        //console.log(response);
                     }, response => { // error callback
                        //console.log(response);
                        this.$parent.check_status_code(response.status);
                     });

                  }

                  //console.log(formularios);
               }, response => { // error callback
                  //console.log(response);
                  this.$parent.check_status_code(response.status);
               });


               return ;

            },
            modificar_usuario_seleccionado: function (run_madre,digito_verificador) {

               if (!run_madre || !digito_verificador || validate(run_madre+""+digito_verificador) == false){
                  swal({
                     title: "Advertencia",
                     text: "Debe ingresar un rut valido.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  return;
               }

               this.$parent.fdc = [];
               this.$parent.fdc_temp = [];

               var formData = new FormData();

               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

               var run_limpio = clean(run_madre+""+digito_verificador);
               run_limpio = run_limpio.substr(0, run_limpio.length-1);

               formData.append('run_madre', run_limpio);

               var formularios = null;
               var formulario_vacio = null;
               this.$http.post('/formulario/buscar_por_run', formData).then(response => { // success callback

                  if (response.status == 200) {

                     formularios = response.body.formularios[0];

                     formulario_vacio = $.isEmptyObject(formularios)==true?true:false;

                     if (formulario_vacio == true) {
                        swal({
                           title: "Atención",
                           text: "El rut ingresado no se encuentra registrado.",
                           type: "warning",
                           confirmButtonClass: "btn-danger",
                           closeOnConfirm: false
                        });
                     }

                     this.$parent.fdc = formularios;
                     this.$parent.fdc_temp = formularios;
                     this.$parent.formularioActivoObj = formularios;

                     this.$parent.formularioEditActivo = true;
                     this.$parent.formularioNuevoActivo = false;

                     this.$parent.show_modal_mis_formularios = false;

                     this.$parent.renderizar_solo_inputs();


                     var formData = new FormData();
                     Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                     formData.append('n_correlativo_interno', formularios.n_correlativo_interno);

                     this.$http.post('/formulario/marcar_registro_form_deis', formData).then(response => { // success callback
                        this.$parent.fdc = response.body.fdc;

                        //console.log(response);
                     }, response => { // error callback
                        //console.log(response);
                        this.$parent.check_status_code(response.status);
                     });

                  }

                  //console.log(formularios);
               }, response => { // error callback
                  //console.log(response);
                  this.$parent.check_status_code(response.status);
               });


               return ;

            },

            mostrar_detalles_formulario: function (formulario) { //console.log();
               this.formulario_tmp = formulario || null;
               var inputs = this.inputs_formulario;
               this.datos_estadisticas_mi_formulario=[];

               //Variables contenedoras de los inputs y el valor
               var identificacion_mujer = [];
               var control_embarazo = [];
               var patologias_sifilis = [];
               var patologias_vih = [];
               var datos_parto = [];
               var datos_recien_nacido = [];

               if (this.formulario_tmp != null && this.formulario_tmp != null) {

                  var im=0; //identificacion mujer
                  var imrn=0; //identificacion mujer regla de negocio
                  var ce=0; //control embarazo
                  var cern=0; //control embarazo regla de negocio
                  var ps=0; //patologias sifilis
                  var psrn=0; //patologias sifilis regla de negocio
                  var pv=0; //patologias vih
                  var pvrn=0; //patologias vih regla de negocio
                  var dp=0; //datos parto
                  var dprn=0; //datos parto regla de negocio
                  var drn=0; //datos recien nacido
                  var drnrn=0; //datos recien nacido regla de negocio

                  //Todas las null
                  var im_null=0;
                  var ce_null=0;
                  var ps_null=0;
                  var pv_null=0;
                  var dp_null=0;
                  var drn_null=0;

                  //Todas las completas o no null
                  var im_not_null=0;
                  var ce_not_null=0;
                  var ps_not_null=0;
                  var pv_not_null=0;
                  var dp_not_null=0;
                  var drn_not_null=0;

                  var keyjs = null;
                  var value = null;
                  var label = null;
                  var ftmp = [];

                  for (var i in this.inputs_formulario) {

                     keyjs = inputs[i].id; //Le paso el nombre del campo\input
                     value = this.formulario_tmp[inputs[i].id]; //Le paso el value del campo\input
                     label = inputs[i].label; //Le paso el nombre del label
                     ftmp = this.formulario_tmp; //Le paso el formulario

                     switch (inputs[i].seccion) {
                        case "identificacion_mujer":
                           //identificacion_mujer.push({key:value});//Mis elementos de la seccion
                           im++; //Mi total de elementos en esta seccion
                           if (value != null) {
                              im_not_null++;
                           } else {
                              im_null++;
                              identificacion_mujer.push({keyjs:label});
                           }
                           break;

                        case "control_embarazo":

                           if (ftmp["embarazo_con_control_parental"] == "No") {
                              ce = 30;
                              ce_not_null = 30;
                              ce_null = 0;
                           } else {

                              //control_embarazo.push({key:value});//Mis elementos de la seccion
                              ce++; //Mi total de elementos en esta seccion
                              if (value != null) {
                                 ce_not_null++;
                              } else {
                                 ce_null++;
                              }

                              //cuando está, manda la posicion
                              //cuando no está, manda -1
                              //this.$parent.in_array(["a",undefined,3,"4","e",true,1],"e");
                              switch (keyjs) {

                                 case 'resultado_1_vdrl_embarazo':
                                 case 'resultado_2_vdrl_embarazo':
                                 case 'resultado_3_vdrl_embarazo':
                                    if (value == "No Reactivo") {
                                       cern += 1;
                                       break;
                                    } else if (value == "No Realizado") {
                                       cern += 3;
                                       break;
                                    }
                                    if ( value == null ) {
                                       control_embarazo.push({keyjs:label});
                                    }
                                    break;
                                 case 'resultado_dilucion_1_vdrl_embarazo':
                                 case 'resultado_dilucion_2_vdrl_embarazo':
                                 case 'resultado_dilucion_3_vdrl_embarazo':
                                    if (this.$parent.in_array(["No Reactivo","No Realizado"],ftmp[keyjs]) ) {
                                       break;
                                    }
                                    if ( value == null ) {
                                       control_embarazo.push({keyjs:label});
                                    }
                                    break;
                                 case 'fecha_1_vdrl_embarazo':
                                 case 'eg_1_vdrl_embarazo':
                                    if (this.$parent.in_array(["No Realizado"],ftmp["resultado_1_vdrl_embarazo"]) ) {
                                       break;
                                    }
                                    if ( value == null ) {
                                       control_embarazo.push({keyjs:label});
                                    }
                                    break;
                                 case 'fecha_2_vdrl_embarazo':
                                 case 'eg_2_vdrl_embarazo':
                                    if (this.$parent.in_array(["No Realizado"],ftmp["resultado_2_vdrl_embarazo"]) ) {
                                       break;
                                    }
                                    if ( value == null ) {
                                       control_embarazo.push({keyjs:label});
                                    }
                                    break;
                                 case 'fecha_3_vdrl_embarazo':
                                 case 'eg_3_vdrl_embarazo':
                                    if (this.$parent.in_array(["No Realizado"],ftmp["resultado_3_vdrl_embarazo"]) ) {
                                       break;
                                    }
                                    if ( value == null ) {
                                       control_embarazo.push({keyjs:label});
                                    }
                                    break;

                                 case 'resultado_1_examen_vih_embarazo':
                                 case 'resultado_2_examen_vih_embarazo':
                                    if (value == "No Realizado") {
                                       cern += 2;
                                       break;
                                    }

                                    if ( value == null ) {
                                       control_embarazo.push({keyjs:label});
                                    }
                                    break;
                                 case 'fecha_1_examen_vih_embarazo':
                                 case 'eg_1_examen_vih':
                                    if (this.$parent.in_array(["No Realizado"],ftmp["resultado_1_examen_vih_embarazo"]) ) {
                                       break;
                                    }
                                    if ( value == null ) {
                                       control_embarazo.push({keyjs:label});
                                    }
                                    break;
                                 case 'fecha_2_examen_vih_embarazo':
                                 case 'eg_2_examen_vih':
                                    if (this.$parent.in_array(["No Realizado"],ftmp["resultado_2_examen_vih_embarazo"]) ) {
                                       break;
                                    }
                                    if ( value == null ) {
                                       control_embarazo.push({keyjs:label});
                                    }
                                    break;


                                 default:
                                    if ( value == null ) {
                                       control_embarazo.push({keyjs:label});
                                    }
                                    break;
                              }

                           }


                           break;

                        case "patologias_sifilis":
                           //patologias_sifilis.push({key:value});//Mis elementos de la seccion
                           ps++; //Mi total de elementos en esta seccion
                           if (value != null) {
                              ps_not_null++;
                           } else {
                              ps_null++;
                           }

                           switch (keyjs) {
                              case 'ano_sifilis_previa_embarazo':
                                 if (ftmp["sifilis_previa_embarazo"] == "No") {
                                    break;
                                 }
                                 if (value == null) {
                                    patologias_sifilis.push({keyjs:label});
                                 }
                                 break;
                              case 'sifilis_previa_embarazo':
                                 if (value == "No") {
                                    psrn += 1;
                                    break;
                                 }
                                 if (value == null) {
                                    patologias_sifilis.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_examen_treponemico':
                                 if (ftmp["resultado_treponemico"] == "No Realizado") {
                                    break;
                                 }
                                 if (value == null) {
                                    patologias_sifilis.push({keyjs:label});
                                 }
                                 break;
                              case 'resultado_treponemico':
                                 if (value == "No Realizado") {
                                    psrn += 1;
                                    break;
                                 }
                                 if (value == null) {
                                    patologias_sifilis.push({keyjs:label});
                                 }
                                 break;
                              case 'numero_contactos_sexuales_estudiados':
                              case 'numero_contactos_sexuales_tratados':
                                 //console.log(ftmp[keyjs]);
                                 if (ftmp["numero_contactos_sexuales_declarados"] == 0 || ftmp["numero_contactos_sexuales_declarados"] == "0") {
                                    break;
                                 }
                                 if (value == null) {
                                    patologias_sifilis.push({keyjs:label});
                                 }
                                 break;
                              case 'numero_contactos_sexuales_declarados':
                                 if (value == "0") {
                                    psrn += 2;
                                    break;
                                 }
                                 if (value == null) {
                                    patologias_sifilis.push({keyjs:label});
                                 }
                                 break;
                              default:
                                 if ( value == null ) {
                                    patologias_sifilis.push({keyjs:label});
                                 }
                                 break;

                           }

                           break;

                        case "patologias_vih":
                           //patologias_vih.push({key:value});//Mis elementos de la seccion
                           pv++; //Mi total de elementos en esta seccion
                           if (value != null) {
                              pv_not_null++;
                           } else {
                              pv_null++;
                           }

                           switch (keyjs) {
                              case 'numero_contactos_sexuales_estudiados':
                              case 'numero_contactos_sexuales_tratados':
                                 //console.log(ftmp[keyjs]);
                                 if (ftmp["numero_contactos_sexuales_declarados"] == 0 || ftmp["numero_contactos_sexuales_declarados"] == "0") {
                                    break;
                                 }
                                 if (value == null) {
                                    patologias_vih.push({keyjs:label});
                                 }
                                 break;
                              case 'numero_contactos_sexuales_declarados':
                                 if (value == "0" || value == 0) {
                                    pvrn += 2;
                                    break;
                                 }
                                 if (value == null) {
                                    patologias_vih.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_examen_linfocitos_cd4_ingreso_control_prenatal':
                              case 'fecha_examen_carga_viral_control_prenatal':
                              case 'fecha_examen_carga_viral_semana_34':
                              case 'terapia_antiretroviral_farmaco_1':
                              case 'terapia_antiretroviral_tar_farmaco_2':
                              case 'terapia_antiretroviral_tar_farmaco_3':
                                 if (value == null) {
                                    pvrn += 1;
                                    break;
                                 }
                                 if (value == null) {
                                    patologias_vih.push({keyjs:label});
                                 }
                                 break;
                              default :
                                 if (value == null) {
                                    patologias_vih.push({keyjs:label});
                                 }
                              break;
                           }

                           break;

                        case "datos_parto":
                           //datos_parto.push({key:value});//Mis elementos de la seccion
                           dp++; //Mi total de elementos en esta seccion
                           if (value != null) {
                              dp_not_null++;
                           } else {
                              dp_null++;
                           }

                           switch (keyjs) {
                              case 'resultado_dilucion_vdrl_parto':
                                 if (this.$parent.in_array(["No Reactivo","No Realizado"], ftmp["resultado_vdrl_parto"])) {
                                    break;
                                 }
                                 if (value == null) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;
                              case 'resultado_vdrl_parto':
                                 if (this.$parent.in_array(["No Reactivo","No Realizado"], value)) {
                                    dprn += 1;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;

                              case 'tratamiento_retroviral_parto':
                                 if (this.$parent.in_array(["No Reactivo","No Realizado","No Corresponde"], ftmp["resultado_examen_vih_parto"])) {
                                    break;
                                 }
                                 if (value == null) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;
                              case 'resultado_examen_vih_parto':
                                 if (this.$parent.in_array(["No Reactivo","No Realizado","No Corresponde"], value)) {
                                    dprn += 1;
                                    break;
                                 }

                                 if ( value == null ) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;


                              case 'peso_mujer_parto':
                              case 'dosis_farmaco_1_vih':
                              case 'fecha_inicio_farmaco_1_vih':
                              case 'hora_inicio_farmaco_1_vih':
                              case 'dosis_2_farmaco_1_vih':
                              case 'fecha_2_inicio_farmaco_1_vih':
                              case 'hora_2_inicio_farmaco_1_vih':
                                 if (ftmp["nombre_farmaco_1_vih"] == null || ftmp["nombre_farmaco_1_vih"] == "") {
                                    break;
                                 }
                                 if (value == null) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;
                              case 'nombre_farmaco_1_vih':
                                 if (value == null || value == "") {
                                    dprn += 7;
                                    //break;
                                 }
                                 if ( value == null ) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;

                              case 'dosis_farmaco_2_vih':
                              case 'fecha_inicio_farmaco_2_vih':
                              case 'hora_inicio_farmaco_2_vih':
                                 if (ftmp["nombre_farmaco_2_vih"] == null || ftmp["nombre_farmaco_2_vih"] == "") {
                                    break;
                                 }
                                 if (value == null) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;
                              case 'nombre_farmaco_2_vih':
                                 if (value == null && value == "") {
                                    dprn += 3;
                                    //break;
                                 }
                                 if ( value == null ) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;


                              case 'fecha_administracion_farmaco_suspencion_lactancia':
                                 if (ftmp["nombre_farmaco_suspencion_lactancia"] == null ||
                                    ftmp["nombre_farmaco_suspencion_lactancia"] == "") {
                                    break;
                                 }
                                 if (value == null) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;
                              case 'nombre_farmaco_suspencion_lactancia':
                                 if (value == null && value == "") {
                                    dprn += 1;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;

                              default:
                                 if ( value == null ) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;
                           }

                           break;

                        case "datos_recien_nacido":
                           //datos_recien_nacido.push({key:value});//Mis elementos de la seccion
                           drn++; //Mi total de elementos en esta seccion
                           if (value != null) {
                              drn_not_null++;
                           } else {
                              drn_null++;
                           }

                           switch (keyjs) {
                              case 'resultado_vdrl_periferico_recien_nacido':
                                 if (value == "No Realizado") {
                                    drnrn += 2;
                                    break;
                                 } else if (value == "No Reactivo") {
                                    drnrn += 1;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'titulacion_vdrl_periferico_recien_nacido':
                                 if (ftmp["resultado_vdrl_periferico_recien_nacido"] == "No Realizado" ||
                                    ftmp["resultado_vdrl_periferico_recien_nacido"] == "No Reactivo") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_examen_vdrl_periferico_recien_nacido':
                                 if (ftmp["resultado_vdrl_periferico_recien_nacido"] == "No Realizado") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'resultado_vdrl_liq_cefalo_recien_nacido':
                                 if (value == "Puncion Frustrada" ||
                                    value == "No Reactivo" ||
                                    value == "No Realizado") {
                                    drnrn += 2;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'titulacion_vdrl_liq_cefalo_recien_nacido':
                              case 'fecha_examen_vdrl_liq_cefalo_recien_nacido':
                                 if (ftmp["resultado_vdrl_liq_cefalo_recien_nacido"] == "Puncion Frustrada" ||
                                    ftmp["resultado_vdrl_liq_cefalo_recien_nacido"] == "No Reactivo" ||
                                    ftmp["resultado_vdrl_liq_cefalo_recien_nacido"] == "No Realizado") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'tratamiento_recien_nacido_farmaco':
                                 if (this.$parent.in_array([null,"","No Aplica","No Administrado"], value)) {
                                    drnrn += 2;
                                    //break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'tratamiento_recien_nacido_dosis':
                              case 'tratamiento_recien_nacido_frecuencia':
                                 if (this.$parent.in_array([null,"","No Aplica","No Administrado"], ftmp["tratamiento_recien_nacido_farmaco"])) {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'resultado_examen_treponemico_parto_madre':
                                 if (value == "No Realizado") {
                                    drnrn += 1;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_examen_treponemico_recien_nacido':
                                 if (ftmp["resultado_examen_treponemico_parto_madre"] == null ||
                                    ftmp["resultado_examen_treponemico_parto_madre"] == "") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'sustituto_leche_materna':
                                 if (value == "No") {
                                    drnrn += 3;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_inicio_sustituto_leche_materna':
                              case 'hora_inicio_sustituto_leche_materna':
                              case 'entrega_sustituto_leche_materna_al_alta':
                                 if (ftmp["sustituto_leche_materna"] == "No") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'nombre_farmaco_1_vih_recien_nacido':
                                 if (value == "" || value == null) {
                                    drnrn += 3;
                                    //break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_inicio_farmaco_1_vih_recien_nacido':
                              case 'hora_inicio_farmaco_1_vih_recien_nacido':
                              case 'dosis_farmaco_1_vih_recien_nacido':
                                 if (ftmp["nombre_farmaco_1_vih_recien_nacido"] == "" ||
                                    ftmp["nombre_farmaco_1_vih_recien_nacido"] == null) {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;


                              case 'nombre_farmaco_2_vih_recien_nacido':
                                 if (value == "" || value == null) {
                                    drnrn += 3;
                                    //break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_inicio_farmaco_2_vih_recien_nacido':
                              case 'hora_inicio_farmaco_2_vih_recien_nacido':
                              case 'dosis_farmaco_2_vih_recien_nacido':
                                 if (ftmp["nombre_farmaco_2_vih_recien_nacido"] == "" ||
                                    ftmp["nombre_farmaco_2_vih_recien_nacido"] == null) {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'resultado_1_examen_pcr_recien_nacido':
                                 if (value == "No Realizado") {
                                    drnrn += 1;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_1_examen_pcr_recien_nacido':
                                 if (ftmp["resultado_1_examen_pcr_recien_nacido"] == "No Realizado") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'resultado_2_examen_pcr_recien_nacido':
                                 if (value == "No Realizado") {
                                    drnrn += 1;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_2_examen_pcr_recien_nacido':
                                 if (ftmp["resultado_2_examen_pcr_recien_nacido"] == "No Realizado") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'resultado_3_examen_pcr_recien_nacido':
                                 if (value == "No Realizado") {
                                    drnrn += 1;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_3_examen_pcr_recien_nacido':
                                 if (ftmp["resultado_3_examen_pcr_recien_nacido"] == "No Realizado") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'resultado_test_elisa_18_meses':
                                 if (value == "No Realizado") {
                                    drnrn += 1;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_test_elisa_18_meses':
                                 if (ftmp["resultado_test_elisa_18_meses"] == "No Realizado") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'resultado_final_isp_examen_vih_recien_nacido':
                                 if (value == "No Realizado") {
                                    drnrn += 1;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_resultado_final_isp_examen_vih_recien_nacido':
                                 if (ftmp["resultado_final_isp_examen_vih_recien_nacido"] == "No Realizado") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'derivacion_recien_nacido_a_seguimiento':
                                 if (value == "No") {
                                    drnrn += 2;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'lugar_derivacion_recien_nacido_a_seguimiento':
                              case 'fecha_ingreso_control_recien_nacido_post_nacimiento':
                                 if (ftmp["derivacion_recien_nacido_a_seguimiento"] == "No") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;


                              default:
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;



                           }

                           break;

                     }//Fin switch
                  }//Fin for



                  // Los 1 en duro son por campos opcionales por concepto de no realizado, eso es todo quedó clarito
                  this.empaquetar_datos_estadistica(im-1,im_null-1,im_not_null,"Identificacion de la Mujer",keyjs,identificacion_mujer);

                  this.empaquetar_datos_estadistica(ce-(cern),ce_null-(cern),ce_not_null,"Control de Embarazo (APS)",keyjs,control_embarazo);

                  /*

                  this.empaquetar_datos_estadistica(ps-(psrn),ps_null-(psrn),ps_not_null,"Control Sífilis (Especialidades)",keyjs,patologias_sifilis);

                  this.empaquetar_datos_estadistica(pv-(pvrn),pv_null-(pvrn),pv_not_null,"Control VIH (Especialidades)",keyjs,patologias_vih);

                  this.empaquetar_datos_estadistica(dp-(dprn),dp_null-(dprn),dp_not_null,"Datos del Parto",keyjs,datos_parto);

                  this.empaquetar_datos_estadistica(drn-(drnrn-3),drn_null-(drnrn-3),drn_not_null,"Datos recien nacido",keyjs,datos_recien_nacido);

                  */


                  this.show_mis_formularios_grid = false;
                  return ;
               }
               return alert("No se ha seleccionador un formulario.");
            },

            mostrar_detalles_formulario_otros: function (formulario) { //console.log();
               this.formulario_otros_tmp = formulario || null;
               var inputs = this.inputs_formularios_otros;
               this.datos_estadisticas_mi_formulario_otros=[];

               //Variables contenedoras de los inputs y el valor
               var identificacion_mujer = [];
               var control_embarazo = [];
               var patologias_sifilis = [];
               var patologias_vih = [];
               var datos_parto = [];
               var datos_recien_nacido = [];

               if (this.formulario_otros_tmp != null && this.formulario_otros_tmp != null) {

                  var im=0; //identificacion mujer
                  var imrn=0; //identificacion mujer regla de negocio
                  var ce=0; //control embarazo
                  var cern=0; //control embarazo regla de negocio
                  var ps=0; //patologias sifilis
                  var psrn=0; //patologias sifilis regla de negocio
                  var pv=0; //patologias vih
                  var pvrn=0; //patologias vih regla de negocio
                  var dp=0; //datos parto
                  var dprn=0; //datos parto regla de negocio
                  var drn=0; //datos recien nacido
                  var drnrn=0; //datos recien nacido regla de negocio

                  //Todas las null
                  var im_null=0;
                  var ce_null=0;
                  var ps_null=0;
                  var pv_null=0;
                  var dp_null=0;
                  var drn_null=0;

                  //Todas las completas o no null
                  var im_not_null=0;
                  var ce_not_null=0;
                  var ps_not_null=0;
                  var pv_not_null=0;
                  var dp_not_null=0;
                  var drn_not_null=0;

                  var keyjs = null;
                  var value = null;
                  var label = null;
                  var ftmp = [];

                  for (var i in this.inputs_formularios_otros) {

                     keyjs = inputs[i].id; //Le paso el nombre del campo\input
                     value = this.formulario_otros_tmp[inputs[i].id]; //Le paso el value del campo\input
                     label = inputs[i].label; //Le paso el nombre del label
                     ftmp = this.formulario_otros_tmp; //Le paso el formulario

                     switch (inputs[i].seccion) {
                        case "identificacion_mujer":
                           //identificacion_mujer.push({key:value});//Mis elementos de la seccion
                           im++; //Mi total de elementos en esta seccion
                           if (value != null) {
                              im_not_null++;
                           } else {
                              im_null++;
                              identificacion_mujer.push({keyjs:label});
                           }
                           break;

                        case "control_embarazo":

                           if (ftmp["embarazo_con_control_parental"] == "No") {
                              ce = 30;
                              ce_not_null = 30;
                              ce_null = 0;
                           } else {

                              //control_embarazo.push({key:value});//Mis elementos de la seccion
                              ce++; //Mi total de elementos en esta seccion
                              if (value != null) {
                                 ce_not_null++;
                              } else {
                                 ce_null++;
                              }

                              //cuando está, manda la posicion
                              //cuando no está, manda -1
                              //this.$parent.in_array(["a",undefined,3,"4","e",true,1],"e");
                              switch (keyjs) {

                                 case 'resultado_1_vdrl_embarazo':
                                 case 'resultado_2_vdrl_embarazo':
                                 case 'resultado_3_vdrl_embarazo':
                                    if (value == "No Reactivo") {
                                       cern += 1;
                                       break;
                                    } else if (value == "No Realizado") {
                                       cern += 3;
                                       break;
                                    }
                                    if ( value == null ) {
                                       control_embarazo.push({keyjs:label});
                                    }
                                    break;
                                 case 'resultado_dilucion_1_vdrl_embarazo':
                                 case 'resultado_dilucion_2_vdrl_embarazo':
                                 case 'resultado_dilucion_3_vdrl_embarazo':
                                    if (this.$parent.in_array(["No Reactivo","No Realizado"],ftmp[keyjs]) ) {
                                       break;
                                    }
                                    if ( value == null ) {
                                       control_embarazo.push({keyjs:label});
                                    }
                                    break;
                                 case 'fecha_1_vdrl_embarazo':
                                 case 'eg_1_vdrl_embarazo':
                                    if (this.$parent.in_array(["No Realizado"],ftmp["resultado_1_vdrl_embarazo"]) ) {
                                       break;
                                    }
                                    if ( value == null ) {
                                       control_embarazo.push({keyjs:label});
                                    }
                                    break;
                                 case 'fecha_2_vdrl_embarazo':
                                 case 'eg_2_vdrl_embarazo':
                                    if (this.$parent.in_array(["No Realizado"],ftmp["resultado_2_vdrl_embarazo"]) ) {
                                       break;
                                    }
                                    if ( value == null ) {
                                       control_embarazo.push({keyjs:label});
                                    }
                                    break;
                                 case 'fecha_3_vdrl_embarazo':
                                 case 'eg_3_vdrl_embarazo':
                                    if (this.$parent.in_array(["No Realizado"],ftmp["resultado_3_vdrl_embarazo"]) ) {
                                       break;
                                    }
                                    if ( value == null ) {
                                       control_embarazo.push({keyjs:label});
                                    }
                                    break;

                                 case 'resultado_1_examen_vih_embarazo':
                                 case 'resultado_2_examen_vih_embarazo':
                                    if (value == "No Realizado") {
                                       cern += 2;
                                       break;
                                    }

                                    if ( value == null ) {
                                       control_embarazo.push({keyjs:label});
                                    }
                                    break;
                                 case 'fecha_1_examen_vih_embarazo':
                                 case 'eg_1_examen_vih':
                                    if (this.$parent.in_array(["No Realizado"],ftmp["resultado_1_examen_vih_embarazo"]) ) {
                                       break;
                                    }
                                    if ( value == null ) {
                                       control_embarazo.push({keyjs:label});
                                    }
                                    break;
                                 case 'fecha_2_examen_vih_embarazo':
                                 case 'eg_2_examen_vih':
                                    if (this.$parent.in_array(["No Realizado"],ftmp["resultado_2_examen_vih_embarazo"]) ) {
                                       break;
                                    }
                                    if ( value == null ) {
                                       control_embarazo.push({keyjs:label});
                                    }
                                    break;


                                 default:
                                    if ( value == null ) {
                                       control_embarazo.push({keyjs:label});
                                    }
                                    break;
                              }

                           }


                           break;

                        case "patologias_sifilis":
                           //patologias_sifilis.push({key:value});//Mis elementos de la seccion
                           ps++; //Mi total de elementos en esta seccion
                           if (value != null) {
                              ps_not_null++;
                           } else {
                              ps_null++;
                           }

                           switch (keyjs) {
                              case 'ano_sifilis_previa_embarazo':
                                 if (ftmp["sifilis_previa_embarazo"] == "No") {
                                    break;
                                 }
                                 if (value == null) {
                                    patologias_sifilis.push({keyjs:label});
                                 }
                                 break;
                              case 'sifilis_previa_embarazo':
                                 if (value == "No") {
                                    psrn += 1;
                                    break;
                                 }
                                 if (value == null) {
                                    patologias_sifilis.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_examen_treponemico':
                                 if (ftmp["resultado_treponemico"] == "No Realizado") {
                                    break;
                                 }
                                 if (value == null) {
                                    patologias_sifilis.push({keyjs:label});
                                 }
                                 break;
                              case 'resultado_treponemico':
                                 if (value == "No Realizado") {
                                    psrn += 1;
                                    break;
                                 }
                                 if (value == null) {
                                    patologias_sifilis.push({keyjs:label});
                                 }
                                 break;
                              case 'numero_contactos_sexuales_estudiados':
                              case 'numero_contactos_sexuales_tratados':
                                 //console.log(ftmp[keyjs]);
                                 if (ftmp["numero_contactos_sexuales_declarados"] == 0 || ftmp["numero_contactos_sexuales_declarados"] == "0") {
                                    break;
                                 }
                                 if (value == null) {
                                    patologias_sifilis.push({keyjs:label});
                                 }
                                 break;
                              case 'numero_contactos_sexuales_declarados':
                                 if (value == "0") {
                                    psrn += 2;
                                    break;
                                 }
                                 if (value == null) {
                                    patologias_sifilis.push({keyjs:label});
                                 }
                                 break;
                              default:
                                 if ( value == null ) {
                                    patologias_sifilis.push({keyjs:label});
                                 }
                                 break;

                           }

                           break;

                        case "patologias_vih":
                           //patologias_vih.push({key:value});//Mis elementos de la seccion
                           pv++; //Mi total de elementos en esta seccion
                           if (value != null) {
                              pv_not_null++;
                           } else {
                              pv_null++;
                           }

                           switch (keyjs) {
                              case 'numero_contactos_sexuales_estudiados':
                              case 'numero_contactos_sexuales_tratados':
                                 //console.log(ftmp[keyjs]);
                                 if (ftmp["numero_contactos_sexuales_declarados"] == 0 || ftmp["numero_contactos_sexuales_declarados"] == "0") {
                                    break;
                                 }
                                 if (value == null) {
                                    patologias_vih.push({keyjs:label});
                                 }
                                 break;
                              case 'numero_contactos_sexuales_declarados':
                                 if (value == "0" || value == 0) {
                                    pvrn += 2;
                                    break;
                                 }
                                 if (value == null) {
                                    patologias_vih.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_examen_linfocitos_cd4_ingreso_control_prenatal':
                              case 'fecha_examen_carga_viral_control_prenatal':
                              case 'fecha_examen_carga_viral_semana_34':
                              case 'terapia_antiretroviral_farmaco_1':
                              case 'terapia_antiretroviral_tar_farmaco_2':
                              case 'terapia_antiretroviral_tar_farmaco_3':
                                 if (value == null) {
                                    pvrn += 1;
                                    break;
                                 }
                                 if (value == null) {
                                    patologias_vih.push({keyjs:label});
                                 }
                                 break;
                              default :
                                 if (value == null) {
                                    patologias_vih.push({keyjs:label});
                                 }
                                 break;
                           }

                           break;

                        case "datos_parto":
                           //datos_parto.push({key:value});//Mis elementos de la seccion
                           dp++; //Mi total de elementos en esta seccion
                           if (value != null) {
                              dp_not_null++;
                           } else {
                              dp_null++;
                           }

                           switch (keyjs) {
                              case 'resultado_dilucion_vdrl_parto':
                                 if (this.$parent.in_array(["No Reactivo","No Realizado"], ftmp["resultado_vdrl_parto"])) {
                                    break;
                                 }
                                 if (value == null) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;
                              case 'resultado_vdrl_parto':
                                 if (this.$parent.in_array(["No Reactivo","No Realizado"], value)) {
                                    dprn += 1;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;

                              case 'tratamiento_retroviral_parto':
                                 if (this.$parent.in_array(["No Reactivo","No Realizado","No Corresponde"], ftmp["resultado_examen_vih_parto"])) {
                                    break;
                                 }
                                 if (value == null) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;
                              case 'resultado_examen_vih_parto':
                                 if (this.$parent.in_array(["No Reactivo","No Realizado","No Corresponde"], value)) {
                                    dprn += 1;
                                    break;
                                 }

                                 if ( value == null ) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;


                              case 'peso_mujer_parto':
                              case 'dosis_farmaco_1_vih':
                              case 'fecha_inicio_farmaco_1_vih':
                              case 'hora_inicio_farmaco_1_vih':
                              case 'dosis_2_farmaco_1_vih':
                              case 'fecha_2_inicio_farmaco_1_vih':
                              case 'hora_2_inicio_farmaco_1_vih':
                                 if (ftmp["nombre_farmaco_1_vih"] == null || ftmp["nombre_farmaco_1_vih"] == "") {
                                    break;
                                 }
                                 if (value == null) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;
                              case 'nombre_farmaco_1_vih':
                                 if (value == null || value == "") {
                                    dprn += 7;
                                    //break;
                                 }
                                 if ( value == null ) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;

                              case 'dosis_farmaco_2_vih':
                              case 'fecha_inicio_farmaco_2_vih':
                              case 'hora_inicio_farmaco_2_vih':
                                 if (ftmp["nombre_farmaco_2_vih"] == null || ftmp["nombre_farmaco_2_vih"] == "") {
                                    break;
                                 }
                                 if (value == null) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;
                              case 'nombre_farmaco_2_vih':
                                 if (value == null && value == "") {
                                    dprn += 3;
                                    //break;
                                 }
                                 if ( value == null ) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;


                              case 'fecha_administracion_farmaco_suspencion_lactancia':
                                 if (ftmp["nombre_farmaco_suspencion_lactancia"] == null ||
                                    ftmp["nombre_farmaco_suspencion_lactancia"] == "") {
                                    break;
                                 }
                                 if (value == null) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;
                              case 'nombre_farmaco_suspencion_lactancia':
                                 if (value == null && value == "") {
                                    dprn += 1;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;

                              default:
                                 if ( value == null ) {
                                    datos_parto.push({keyjs:label});
                                 }
                                 break;
                           }

                           break;

                        case "datos_recien_nacido":
                           //datos_recien_nacido.push({key:value});//Mis elementos de la seccion
                           drn++; //Mi total de elementos en esta seccion
                           if (value != null) {
                              drn_not_null++;
                           } else {
                              drn_null++;
                           }

                           switch (keyjs) {
                              case 'resultado_vdrl_periferico_recien_nacido':
                                 if (value == "No Realizado") {
                                    drnrn += 2;
                                    break;
                                 } else if (value == "No Reactivo") {
                                    drnrn += 1;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'titulacion_vdrl_periferico_recien_nacido':
                                 if (ftmp["resultado_vdrl_periferico_recien_nacido"] == "No Realizado" ||
                                    ftmp["resultado_vdrl_periferico_recien_nacido"] == "No Reactivo") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_examen_vdrl_periferico_recien_nacido':
                                 if (ftmp["resultado_vdrl_periferico_recien_nacido"] == "No Realizado") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'resultado_vdrl_liq_cefalo_recien_nacido':
                                 if (value == "Puncion Frustrada" ||
                                    value == "No Reactivo" ||
                                    value == "No Realizado") {
                                    drnrn += 2;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'titulacion_vdrl_liq_cefalo_recien_nacido':
                              case 'fecha_examen_vdrl_liq_cefalo_recien_nacido':
                                 if (ftmp["resultado_vdrl_liq_cefalo_recien_nacido"] == "Puncion Frustrada" ||
                                    ftmp["resultado_vdrl_liq_cefalo_recien_nacido"] == "No Reactivo" ||
                                    ftmp["resultado_vdrl_liq_cefalo_recien_nacido"] == "No Realizado") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'tratamiento_recien_nacido_farmaco':
                                 if (this.$parent.in_array([null,"","No Aplica","No Administrado"], value)) {
                                    drnrn += 2;
                                    //break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'tratamiento_recien_nacido_dosis':
                              case 'tratamiento_recien_nacido_frecuencia':
                                 if (this.$parent.in_array([null,"","No Aplica","No Administrado"], ftmp["tratamiento_recien_nacido_farmaco"])) {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'resultado_examen_treponemico_parto_madre':
                                 if (value == "No Realizado") {
                                    drnrn += 1;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_examen_treponemico_recien_nacido':
                                 if (ftmp["resultado_examen_treponemico_parto_madre"] == null ||
                                    ftmp["resultado_examen_treponemico_parto_madre"] == "") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'sustituto_leche_materna':
                                 if (value == "No") {
                                    drnrn += 3;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_inicio_sustituto_leche_materna':
                              case 'hora_inicio_sustituto_leche_materna':
                              case 'entrega_sustituto_leche_materna_al_alta':
                                 if (ftmp["sustituto_leche_materna"] == "No") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'nombre_farmaco_1_vih_recien_nacido':
                                 if (value == "" || value == null) {
                                    drnrn += 3;
                                    //break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_inicio_farmaco_1_vih_recien_nacido':
                              case 'hora_inicio_farmaco_1_vih_recien_nacido':
                              case 'dosis_farmaco_1_vih_recien_nacido':
                                 if (ftmp["nombre_farmaco_1_vih_recien_nacido"] == "" ||
                                    ftmp["nombre_farmaco_1_vih_recien_nacido"] == null) {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;


                              case 'nombre_farmaco_2_vih_recien_nacido':
                                 if (value == "" || value == null) {
                                    drnrn += 3;
                                    //break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_inicio_farmaco_2_vih_recien_nacido':
                              case 'hora_inicio_farmaco_2_vih_recien_nacido':
                              case 'dosis_farmaco_2_vih_recien_nacido':
                                 if (ftmp["nombre_farmaco_2_vih_recien_nacido"] == "" ||
                                    ftmp["nombre_farmaco_2_vih_recien_nacido"] == null) {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'resultado_1_examen_pcr_recien_nacido':
                                 if (value == "No Realizado") {
                                    drnrn += 1;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_1_examen_pcr_recien_nacido':
                                 if (ftmp["resultado_1_examen_pcr_recien_nacido"] == "No Realizado") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'resultado_2_examen_pcr_recien_nacido':
                                 if (value == "No Realizado") {
                                    drnrn += 1;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_2_examen_pcr_recien_nacido':
                                 if (ftmp["resultado_2_examen_pcr_recien_nacido"] == "No Realizado") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'resultado_3_examen_pcr_recien_nacido':
                                 if (value == "No Realizado") {
                                    drnrn += 1;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_3_examen_pcr_recien_nacido':
                                 if (ftmp["resultado_3_examen_pcr_recien_nacido"] == "No Realizado") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'resultado_test_elisa_18_meses':
                                 if (value == "No Realizado") {
                                    drnrn += 1;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_test_elisa_18_meses':
                                 if (ftmp["resultado_test_elisa_18_meses"] == "No Realizado") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'resultado_final_isp_examen_vih_recien_nacido':
                                 if (value == "No Realizado") {
                                    drnrn += 1;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'fecha_resultado_final_isp_examen_vih_recien_nacido':
                                 if (ftmp["resultado_final_isp_examen_vih_recien_nacido"] == "No Realizado") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;

                              case 'derivacion_recien_nacido_a_seguimiento':
                                 if (value == "No") {
                                    drnrn += 2;
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;
                              case 'lugar_derivacion_recien_nacido_a_seguimiento':
                              case 'fecha_ingreso_control_recien_nacido_post_nacimiento':
                                 if (ftmp["derivacion_recien_nacido_a_seguimiento"] == "No") {
                                    break;
                                 }
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;


                              default:
                                 if ( value == null ) {
                                    datos_recien_nacido.push({keyjs:label});
                                 }
                                 break;



                           }

                           break;

                     }//Fin switch
                  }//Fin for



                  // Los 1 en duro son por campos opcionales por concepto de no realizado, eso es todo quedó clarito
                  this.empaquetar_datos_estadistica_otros(im-1,im_null-1,im_not_null,"Identificacion de la Mujer",keyjs,identificacion_mujer);

                  this.empaquetar_datos_estadistica_otros(ce-(cern),ce_null-(cern),ce_not_null,"Control de Embarazo (APS)",keyjs,control_embarazo);

                  /*

                  this.empaquetar_datos_estadistica_otros(ps-(psrn),ps_null-(psrn),ps_not_null,"Control Sífilis (Especialidades)",keyjs,patologias_sifilis);

                  this.empaquetar_datos_estadistica_otros(pv-(pvrn),pv_null-(pvrn),pv_not_null,"Control VIH (Especialidades)",keyjs,patologias_vih);

                  this.empaquetar_datos_estadistica_otros(dp-(dprn),dp_null-(dprn),dp_not_null,"Datos del Parto",keyjs,datos_parto);

                  this.empaquetar_datos_estadistica_otros(drn-(drnrn-3),drn_null-(drnrn-3),drn_not_null,"Datos recien nacido",keyjs,datos_recien_nacido);

                  */


                  this.show_formularios_otros_grid = false;
                  return ;
               }
               return alert("No se ha seleccionador un formulario.");
            },

            empaquetar_datos_estadistica: function (total, nulls, not_null, title, field_name, arr_detail) {
               this.datos_estadisticas_mi_formulario.push({
                  field_name:{
                     'total':total,
                     'null':nulls,
                     'not_null':not_null,
                     'title':title,
                     'completion':(not_null/total)*100,
                     'remaining':(nulls/total)*100,
                     'field_name':arr_detail,
                  }
               });
               return;
            },
            empaquetar_datos_estadistica_otros: function (total, nulls, not_null, title, field_name, arr_detail) {
               this.datos_estadisticas_mi_formulario_otros.push({
                  field_name:{
                     'total':total,
                     'null':nulls,
                     'not_null':not_null,
                     'title':title,
                     'completion':(not_null/total)*100,
                     'remaining':(nulls/total)*100,
                     'field_name':arr_detail,
                  }
               });
               return;
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
      //Instancia parametros iniciales
      this.fetch_formulario();
      //Variable de contexto
      var self = this;

      //Funcion de auto guardado cada 5 minutos
      /*
      setInterval(function () {
         self.guardar_formulario_completo();
      },300000);
      */
      $(document).ready(function () {
         //Handle al recargar pagina
         window.onbeforeunload = function(e){
            return "Estás seguro que deseas cerrar la ventana?";
            /*
            return function () {
               var cookies = document.cookie.split(";");

               for (var i = 0; i < cookies.length; i++) {
                  var cookie = cookies[i];
                  var eqPos = cookie.indexOf("=");
                  var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
               }
            */
            /*
            var self = this;
            return function () {
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               self.$http.post('/formulario/prueba_session').then(response => { // success callback
               }, response => { // error callback
                  console.log(response);
               });
            }
            */
            //return window.open('/formulario/prueba_session');
         };
         window.onunload = function(e){
            return "Cierre de la ventana";
         };

      });

      setTimeout(function () {
         self.spinner_form_deis = false;
      }, 1500);

   },
   ready: {},
   filters: {
   },
   methods: {

      alert_if_info_reactivo_especialidades: function () {
         if (this.fdc['derivada_a_especialidades_embarazo'] == null) {
            swal({
               title: "Recuerde",
               text: "Si usted marcó un resultado reactivo, señale si realizó derivación a especialidades, si ya lo realizó, omita este mensaje.",
               type: "success",
               confirmButtonClass: "btn-success",
               closeOnConfirm: false
            });
         }

      },

      check_status_code: function (status_code) {
         switch (status_code) {

            case 401:

               swal({
                  title: "Atencion",
                  text: "Su sesión ha expirado, por favor inicie sesion nuevamente.",
                  type: "warning",
                  confirmButtonClass: "btn-danger",
                  closeOnConfirm: true,
               }, function (isConfirm) {
                  if (isConfirm) {
                     window.location.href = '/login';
                  }
               });

               break;

            case 500:

               swal({
                  title: "Atencion",
                  text: "Ocurrio un error al guardar, por favor actualice la página.",
                  type: "warning",
                  confirmButtonClass: "btn-danger",
                  closeOnConfirm: true,
               }, function (isConfirm) {
                  if (isConfirm) {
                     window.location.href = '/login';
                  }
               });

               break;

            default :
               swal({
                  title: "Atencion",
                  text: "Ocurrio un error al procesar el formulario, por favor actualice la página.",
                  type: "warning",
                  confirmButtonClass: "btn-danger",
                  closeOnConfirm: true
               }, function (isConfirm) {
                  if (isConfirm) {
                     window.location.href = '/login';
                  }
               });
               break;
         }
      },

      find_input: function (inputs, ref) {
         for (var i in inputs) {
            if (inputs[i].name == ref) {
               return inputs[i];
            }
         }
         return null;
      },

      is_undefined:(v) => { return (typeof v == undefined)?true:false; },
      is_null: (v) => { return (v==null)?true:false; },
      is_empty: (v) => { return (!v || v==null || v=='' || typeof v == undefined) ? true : false; },
      in_array: (array, v) => { return (array.indexOf(v) > -1) ? true : false; },

      //Checkea cada input a renderizar de forma reactiva, realiza validación en cualquier cambio de otros campos
      check_input: function (input,index) {
         /*if (this.auth.id_role == 5 && this.auth.form_deis_user != null && this.fdc.id != null) {
            for (var i in this.auth.form_deis_user) {
               console.log(this.auth.form_deis_user[i].id_form_deis);
               if (this.auth.form_deis_user[i].id_form_deis != this.fdc.id) {
                  //this.inputs[index].readonly = 'readonly';
                  //this.inputs[index].disabled = 'disabled';
               }
            }
         }*/

         if (input.bloque == 'campo_limitado') {
            //por que se requiere completar
            if ( this.fdc_temp[this.inputs[index].id] != null &&
               this.fdc_temp[this.inputs[index].id] != ''
               && this.formularioNuevoActivo == false
            ) {

               this.inputs[index].edicion_temporal = false;

            }else{
               //caso contrario, no es necesario completar
               this.inputs[index].edicion_temporal = true;
            }

            return this.inputs[index].edicion_temporal;
         }
         return true;

      },

      //Valida que los campos de cierta pestaña estén completados , actualmente deprecated
      validar_campos_completados: function (tabName) {
         var validation = true;
         for (let i in this.inputs){
            //console.log(tabName);
            //console.log(this.inputs[i].seccion == tabName);
            if (this.inputs[i].seccion == tabName && this.fdc[this.inputs[i].name] == null
               && this.inputs[i].disabled == null ) {
               validation = false;
            }
         }
         return validation;
      },

      validar_derivada_especialidad: function () {

         if (this.fdc['resultado_1_examen_vih_embarazo'] != 'Reactivo' &&
            this.fdc['resultado_2_examen_vih_embarazo'] != 'Reactivo' &&
            this.fdc['resultado_1_vdrl_embarazo'] != 'Reactivo' &&
            this.fdc['resultado_2_vdrl_embarazo'] != 'Reactivo' &&
            this.fdc['resultado_3_vdrl_embarazo'] != 'Reactivo' &&
            this.fdc['acepta_rechaza_toma_examen_vih'] != 'Rechaza' &&
            this.fdc['acepta_rechaza_toma_examen_vih'] != 'No Corresponde') {

            for (let i in this.inputs){
               if (this.inputs[i].name == 'derivada_a_especialidades_embarazo' ||
                  this.inputs[i].name == 'fecha_administracion_1_dosis_penicilina_gestante') {
                  this.fdc['derivada_a_especialidades_embarazo']='';
                  this.inputs[i].disabled = true;
               }
            }

         }else if (this.fdc['resultado_1_examen_vih_embarazo'] == 'Reactivo' ||
            this.fdc['resultado_2_examen_vih_embarazo'] == 'Reactivo' ||
            this.fdc['resultado_1_vdrl_embarazo'] == 'Reactivo' ||
            this.fdc['resultado_2_vdrl_embarazo'] == 'Reactivo' ||
            this.fdc['resultado_3_vdrl_embarazo'] == 'Reactivo'){
            for (let i in this.inputs){
               if (this.inputs[i].name == 'derivada_a_especialidades_embarazo' ||
                  this.inputs[i].name == 'fecha_administracion_1_dosis_penicilina_gestante' ) {
                  this.inputs[i].disabled = null;
               }
            }
            if (this.fdc['derivada_a_especialidades_embarazo'] == null) {
               this.alert_if_info_reactivo_especialidades();
            }
         }

      },

      /*
      * VALIDACIONES DE INPUTS
      * Validacion de campos en los eventos JS, se condiciona mediante un switch para analizar el campo,
      * segun el evento, y de forma reactiva.
      *
      * */

      //Validacion de campos 1 a 1 al evento keyup filtrado por un case sobre el cambio
      verifica_validacion_keyup: function (input) {
         switch (input.id) {
            case 'run_madre':
               //this.fdc[input.name] = format(this.fdc[input.name]);

               //console.log(this.fdc.run_madre);
               //console.log(this.fdc_temp.run_madre);
               break;
            /*
            case 'run_recien_nacido':
               this.fdc[input.name] = format(this.fdc[input.name]);
               break;
            */
         }
      },

      verifica_validacion_change: function (input) {

         switch (input.id) {

            case 'digito_verificador':
               input.disabled = 'disabled';
               break;
            case 'run_madre':




               var r = this.fdc[input.name];
               var dv = this.fdc['digito_verificador'];

               //Si se está editando, que valide el rut
               if (this.fdc[input.name] != this.fdc_temp[input.name]) {

                  if (validate(r) == false) {
                     alert('Debe ingresar un rut completo valido, sin puntos ni guión.');
                     this.fdc[input.name] = null;
                     this.fdc['digito_verificador'] = dv;
                     return;
                  } else {
                     var run_limpio = clean(this.fdc[input.name]);
                     dv = run_limpio.substr(run_limpio.length-1, run_limpio.length);
                     run_limpio = run_limpio.substr(0, run_limpio.length-1);
                     this.fdc['run_madre'] = run_limpio;
                     this.fdc['digito_verificador'] = dv;
                  }
               }



               if (this.fdc[input.name] != null && this.fdc[input.name]) {
                  this.find_input(this.inputs, 'pasaporte_provisorio').disabled = true;

               }


               //input.disabled = 'disabled';

               if (this.formularioNuevoActivo == true && this.fdc[input.name] != null) {
                  var formData = new FormData();
                  Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                  //formData.append('run_madre', this.fdc[input.name]);
                  formData.append('run_madre', run_limpio);
                  this.$http.post('/formulario/buscar_run_existente', formData).then(response => { // success callback
                     //console.log(response);
                     if (response.status == 200) {
                        var rd = response.body.rd;
                        this.formularios_encontrados = response.body.formularios;
                        if (rd == 'Existe') {
                           //this.fdc[input.name] = null;
                           var self = this;
                           swal({
                              title: "Atencion",
                              text: "El rut ingresado ya existe para una madre registrada, por favor seleccione el registro a modificar.",
                              type: "success",
                              confirmButtonClass: "btn-success",
                              closeOnConfirm: true
                           }, function(isConfirm){
                              if (isConfirm) {
                                 self.show_modal_formularios_encontrados = true;
                              }
                           });
                        }
                     }else{
                        swal({
                           title: "Advertencia",
                           text: "Ocurrio un error al procesar la solicitud.",
                           type: "error",
                           confirmButtonClass: "btn-danger",
                           closeOnConfirm: false
                        });
                     }
                  }, response => { // error callback
                     //console.log(response);
                  });
               }

               break;








               /*
               // Valida si es distinto a null, bloquea digito y pasaporte
               var run_limpio = null;
               var dv = null;

               if (this.is_null(this.fdc[input.name]) == false ) {
                  this.find_input(this.inputs, 'pasaporte_provisorio').disabled = 'disabled';
                  this.find_input(this.inputs, 'digito_verificador').disabled = 'disabled';
               }

               if (this.formularioNuevoActivo == true) {
                  if (this.fdc[input.name]) {
                     if (validate(this.fdc[input.name]) == false) {
                        swal({
                           title: "Error",
                           text: "Debe ingresar un rut completo valido, sin puntos ni guión.",
                           type: "error",
                           confirmButtonClass: "btn-danger",
                           closeOnConfirm: false
                        });
                        this.find_input(this.inputs, 'pasaporte_provisorio').disabled = null;
                        this.fdc[input.name] = null;
                        this.fdc['digito_verificador'] = null;
                        break;
                     } else {
                        run_limpio = clean(this.fdc[input.name]);
                        dv = run_limpio.substr(run_limpio.length-1, run_limpio.length);
                        run_limpio = run_limpio.substr(0, run_limpio.length-1);
                        this.fdc['run_madre'] = run_limpio;
                        this.fdc['digito_verificador'] = dv;
                     }
                  } else {
                     break;
                  }
               }

               if (this.formularioEditActivo == true) {

                  if (validate(this.fdc[input.name]+""+this.fdc['digito_verificador']) == false) {
                     swal({
                        title: "Error",
                        text: "Debe ingresar un rut completo valido, sin puntos ni guión.",
                        type: "error",
                        confirmButtonClass: "btn-danger",
                        closeOnConfirm: false
                     });
                     this.find_input(this.inputs, 'pasaporte_provisorio').disabled = null;
                     this.fdc[input.name] = null;
                     this.fdc['digito_verificador'] = null;
                     break;
                  }



               }




               if (this.formularioNuevoActivo == true && this.fdc[input.name] != null) {
                  var formData = new FormData();
                  Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                  formData.append('run_madre', run_limpio);
                  this.$http.post('/formulario/buscar_run_existente', formData).then(response => { // success callback
                     if (response.status == 200) {
                        var rd = response.body.rd;
                        this.formularios_encontrados = response.body.formularios;
                        if (rd == 'Existe') {
                           var self = this;
                           swal({
                              title: "Atencion",
                              text: "El rut ingresado ya existe para una madre registrada, por favor seleccione el registro a modificar.",
                              type: "success",
                              confirmButtonClass: "btn-success",
                              closeOnConfirm: true
                           }, function(isConfirm){ if (isConfirm) { self.show_modal_formularios_encontrados = true; } });
                        }
                     }else{
                        swal({
                           title: "Advertencia",
                           text: "Ocurrio un error al procesar la solicitud.",
                           type: "error",
                           confirmButtonClass: "btn-danger",
                           closeOnConfirm: false
                        });
                     }
                  }, response => { }); // error callback //console.log(response);
               }

               */

               /*
               if (this.auth && this.in_array([2,3,5], this.auth.id_role)) {
                  input.disabled = null
               }else {
                  input.disabled = 'disabled';
                  return;
               }
               */

               /*
               if ( this.formularioNuevoActivo == true || this.fdc[input.name] == null ) {
                  break;
               } else {
                  if (validate(this.fdc[input.name]+""+this.fdc['digito_verificador']) == false) {
                     swal({
                        title: "Error",
                        text: "Debe ingresar un rut completo valido, sin puntos ni guión.",
                        type: "error",
                        confirmButtonClass: "btn-danger",
                        closeOnConfirm: false
                     });
                     this.find_input(this.inputs, 'pasaporte_provisorio').disabled = null;
                     this.fdc[input.name] = null;
                     break;
                  }
               }
               */

               //console.log(this.fdc[input.name].substr(this.fdc[input.name].length-1, this.fdc[input.name].length));
               /*
               if ( this.formularioEditActivo == true ) {

                  if (this.fdc['digito_verificador'] != null &&
                     this.fdc[input.name].substr(this.fdc[input.name].length-1, this.fdc[input.name].length) !=
                     this.fdc['digito_verificador']
                  ) {

                     if (validate(this.fdc[input.name]+""+this.fdc['digito_verificador']) == false) {
                        swal({
                           title: "Error",
                           text: "Debe ingresar un rut completo valido, sin puntos ni guión.",
                           type: "error",
                           confirmButtonClass: "btn-danger",
                           closeOnConfirm: false
                        });
                        this.find_input(this.inputs, 'pasaporte_provisorio').disabled = null;
                        this.fdc[input.name] = null;
                        this.fdc['digito_verificador'] = null;
                        break;
                     }

                  }else{
                     this.fdc['digito_verificador'] = null;
                     if (validate(this.fdc[input.name]) == false) {

                        swal({
                           title: "Error",
                           text: "Debe ingresar un rut completo valido, sin puntos ni guión.",
                           type: "error",
                           confirmButtonClass: "btn-danger",
                           closeOnConfirm: false
                        });
                        this.find_input(this.inputs, 'pasaporte_provisorio').disabled = null;
                        this.fdc[input.name] = null;
                        this.fdc['digito_verificador'] = null;
                        break;
                     }
                  }

               }
               */


               /*
               // Valida si se está editando para bloquear la edicion del campo
               if ( this.formularioEditActivo == true &&
                  (this.fdc[input.name] == null ||
                  this.fdc['digito_verificador'] == null)
                  ) {
                  return;
               }else{
                  if (validate(this.fdc[input.name]+""+this.fdc['digito_verificador']) == false) {

                     swal({
                        title: "Error",
                        text: "Debe ingresar un rut completo valido, sin puntos ni guión.",
                        type: "error",
                        confirmButtonClass: "btn-danger",
                        closeOnConfirm: false
                     });
                     this.find_input(this.inputs, 'pasaporte_provisorio').disabled = null;
                     this.fdc[input.name] = null;
                     break;
                  }
               }
               */




               //Aca ya está validado el rut
               /*
               if (this.formularioNuevoActivo == true ||
                  ( validate(this.fdc[input.name]) && this.fdc['digito_verificador'] == null ) ) {

                  var run_limpio = clean(this.fdc[input.name]);
                  var dv = run_limpio.substr(run_limpio.length-1, run_limpio.length);
                  run_limpio = run_limpio.substr(0, run_limpio.length-1);
                  this.fdc['run_madre'] = run_limpio;
                  this.fdc['digito_verificador'] = dv;

                  //input.disabled = 'disabled';
               }
               */


               // Validacion para recordar al usuario que ese rut ingresado ya existe en el sistema,
               // entonces le pregunta si es nuevo o lo sigue creando



               break;

            case 'mujer_es_vih_positivo':
               break;
               if (this.fdc[input.name] == 'Si') {
                  var self = this;
                  swal({
                     title: "Advertencia!",
                     text: `
                     Acuerdo de confidencialidad
                     Al seleccionar si, acuerdo mantener el proceso de ingreso de información de forma confidencial y anónima.
                     Para confirmar ingrese su clave de acceso
                     `,
                     type: "input",
                     inputType: "password",
                     showCancelButton: true,
                     closeOnConfirm: false,
                     inputPlaceholder: "Ingrese su clave de acceso",
                  }, function (inputValue) {
                     if (inputValue === false) {
                        self.fdc[input.name] = null;
                        return false;
                     }

                     if (inputValue === "") {
                        swal.showInputError("Necesitas ingresar tu clave de acceso!");
                        //this.fdc[input.name] = null;
                        return false;
                     }

                     var formData = new FormData();
                     Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                     formData.append('rut_usuario', self.auth.rut);
                     formData.append('clave_usuario', inputValue);

                     self.$http.post('/formulario/confirmar_confidencialidad_mujer_vih', formData).then(response => { // success callback
                        //console.log(response);
                        var rd = response.body.rd;
                        if (rd == true) {
                           swal("Gracias!", "Te recordamos que al ser información sensible solicitamos tomar con seriedad el ingreso de la información.");
                        }else{
                           self.fdc[input.name] = null;
                           swal({
                              title: "Advertencia",
                              text: "La clave ingresada es incorrecta.",
                              type: "warning",
                              confirmButtonClass: "btn-danger",
                              closeOnConfirm: false
                           });
                        }

                     }, response => { // error callback
                        //console.log(response);
                     });
                     return false;
                  });
                  /*
                  swal({
                     title: "",
                     text: "El rut ingresado ya existe.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  */
               }
               break;

            case 'edad_gestacional_ingreso_control_embarazo':
               if (parseInt(this.fdc[input.name])<0) {
                  this.fdc[input.name] = 0;
               }
               break;
            case 'embarazo_con_control_parental':
               if (this.fdc[input.name] == null) { break; }
               if (this.in_array(["No","Desconocido"] ,this.fdc[input.name])) {
                  for (let i in this.inputs){
                     //Aqui agregar la validacion del bloque para que no se lo pase de largo
                     if (input.seccion == this.inputs[i].seccion &&
                        input.name != this.inputs[i].name &&
                        this.inputs[i].disabled != 'disabled'
                     ) { this.inputs[i].disabled = true; }
                  }
               }
               else{
                  for (let i in this.inputs){
                     if (input.seccion == this.inputs[i].seccion && input.name != this.inputs[i].name) {
                        /*
                        if (this.fdc['acepta_rechaza_toma_examen_vih'] == 'Acepta' ||
                        this.fdc['acepta_rechaza_toma_examen_vih'] == 'Rechaza' ||
                        this.fdc['acepta_rechaza_toma_examen_vih'] == null ||
                        this.inputs[i].bloque == input.bloque  ) {
                           this.inputs[i].disabled = null;
                        }*/

                        switch (this.inputs[i].name) {
                           case 'resultado_1_vdrl_embarazo':
                           case 'resultado_dilucion_1_vdrl_embarazo':
                           case 'fecha_1_vdrl_embarazo':
                           case 'eg_1_vdrl_embarazo':


                              if (this.fdc['resultado_1_vdrl_embarazo'] == "Reactivo" ||
                              this.fdc['resultado_1_vdrl_embarazo'] == null ||
                              this.fdc['resultado_1_vdrl_embarazo'] == "") {
                                 this.inputs[i].disabled = null;
                              } else if (this.fdc['resultado_1_vdrl_embarazo'] == "No Reactivo" &&
                                 this.inputs[i].name != "resultado_dilucion_1_vdrl_embarazo") {
                                 this.inputs[i].disabled = null;
                              } else {
                                 var input = this.find_input(this.inputs, 'resultado_1_vdrl_embarazo');
                                 input.disabled = null;
                              }

                              break;

                           case 'resultado_2_vdrl_embarazo':
                           case 'resultado_dilucion_2_vdrl_embarazo':
                           case 'fecha_2_vdrl_embarazo':
                           case 'eg_2_vdrl_embarazo':
                              if (this.fdc['resultado_2_vdrl_embarazo'] == "Reactivo" ||
                              this.fdc['resultado_2_vdrl_embarazo'] == null ||
                              this.fdc['resultado_2_vdrl_embarazo'] == "") {
                                 this.inputs[i].disabled = null;
                              } else if (this.fdc['resultado_2_vdrl_embarazo'] == "No Reactivo" &&
                                 this.inputs[i].name != "resultado_dilucion_2_vdrl_embarazo") {
                                 this.inputs[i].disabled = null;
                              } else { this.find_input(this.inputs, 'resultado_2_vdrl_embarazo').disabled = null; }
                              break;

                           case 'resultado_3_vdrl_embarazo':
                           case 'resultado_dilucion_3_vdrl_embarazo':
                           case 'fecha_3_vdrl_embarazo':
                           case 'eg_3_vdrl_embarazo':
                              if (this.fdc['resultado_3_vdrl_embarazo'] == "Reactivo" ||
                              this.fdc['resultado_3_vdrl_embarazo'] == null ||
                              this.fdc['resultado_3_vdrl_embarazo'] == "") {
                                 this.inputs[i].disabled = null;
                              } else if (this.fdc['resultado_3_vdrl_embarazo'] == "No Reactivo" &&
                                 this.inputs[i].name != "resultado_dilucion_3_vdrl_embarazo") {
                                 this.inputs[i].disabled = null;
                              } else { this.find_input(this.inputs, 'resultado_3_vdrl_embarazo').disabled = null; }
                              break;

                           case 'resultado_1_examen_vih_embarazo':
                           case 'fecha_1_examen_vih_embarazo':
                           case 'eg_1_examen_vih':
                              if (this.fdc['resultado_1_examen_vih_embarazo'] == "Reactivo" ||
                              this.fdc['resultado_1_examen_vih_embarazo'] == null ||
                              this.fdc['resultado_1_examen_vih_embarazo'] == "") {
                                 this.inputs[i].disabled = null;
                              } else { this.find_input(this.inputs, 'resultado_1_examen_vih_embarazo').disabled = null; }
                              break;

                           case 'resultado_2_examen_vih_embarazo':
                           case 'fecha_2_examen_vih_embarazo':
                           case 'eg_2_examen_vih':
                              if (this.fdc['resultado_2_examen_vih_embarazo'] == "Reactivo" ||
                              this.fdc['resultado_2_examen_vih_embarazo'] == null ||
                              this.fdc['resultado_2_examen_vih_embarazo'] == "") {
                                 this.inputs[i].disabled = null;
                              } else { this.find_input(this.inputs, 'resultado_2_examen_vih_embarazo').disabled = null }
                              break;

                           default:
                              this.inputs[i].disabled = null;
                              break;

                        }

                     }
                  }
               }
               break;

            case 'resultado_1_vdrl_embarazo':
               if (this.fdc[input.name] == 'No Reactivo' || this.fdc[input.name] == 'No Realizado') {
                  if (this.fdc[input.name] == 'No Realizado') {

                     this.find_input(this.inputs, 'resultado_dilucion_1_vdrl_embarazo').disabled = true;
                     this.find_input(this.inputs, 'fecha_1_vdrl_embarazo').disabled = true;
                     this.find_input(this.inputs, 'eg_1_vdrl_embarazo').disabled = true;

                     if (this.fdc['fecha_1_vdrl_embarazo'] || this.fdc['eg_1_vdrl_embarazo']) {
                        swal({
                           title: "Advertencia",
                           text:  `
                              Si el resultado del examen es No Realizado,
                              No debe ir la Fecha ni Edad Gestacional ya que solo aplica para los resultados Reactivo y No Reactivo.
                           `,
                           type: "warning",
                           confirmButtonClass: "btn-danger",
                           closeOnConfirm: false
                        });
                        this.fdc['fecha_1_vdrl_embarazo'] = null;
                        this.fdc['eg_1_vdrl_embarazo'] = null;
                     }

                  }else if (this.fdc[input.name] == 'No Reactivo') {
                     this.find_input(this.inputs, 'fecha_1_vdrl_embarazo').disabled = null;
                     this.find_input(this.inputs, 'eg_1_vdrl_embarazo').disabled = null;
                     this.find_input(this.inputs, 'resultado_dilucion_1_vdrl_embarazo').disabled = true;

                  }
                  //Mara marcar como dato ya ingresado
                  this.fdc['resultado_dilucion_1_vdrl_embarazo'] = 'true';

               }
               else if (this.fdc[input.name] == 'Reactivo') {
                  this.find_input(this.inputs, 'resultado_dilucion_1_vdrl_embarazo').disabled = null;
                  this.find_input(this.inputs, 'fecha_1_vdrl_embarazo').disabled = null;
                  this.find_input(this.inputs, 'eg_1_vdrl_embarazo').disabled = null;
               } else {
                  this.find_input(this.inputs, 'resultado_dilucion_1_vdrl_embarazo').disabled = true;
                  this.find_input(this.inputs, 'fecha_1_vdrl_embarazo').disabled = true;
                  this.find_input(this.inputs, 'eg_1_vdrl_embarazo').disabled = true;
               }

               this.validar_derivada_especialidad();
               break;

            case 'resultado_2_vdrl_embarazo':
               if (this.fdc[input.name] == 'No Reactivo' || this.fdc[input.name] == 'No Realizado') {
                  if (this.fdc[input.name] == 'No Realizado') {

                     this.find_input(this.inputs, 'resultado_dilucion_2_vdrl_embarazo').disabled = true;
                     this.find_input(this.inputs, 'fecha_2_vdrl_embarazo').disabled = true;
                     this.find_input(this.inputs, 'eg_2_vdrl_embarazo').disabled = true;

                     if (this.fdc['fecha_2_vdrl_embarazo'] || this.fdc['eg_2_vdrl_embarazo']) {
                        swal({
                           title: "Advertencia",
                           text: `
                              Si el resultado del examen es No Realizado,
                              No debe ir la Fecha ni Edad Gestacional ya que solo aplica para los resultados Reactivo y No Reactivo.
                           `,
                           type: "warning",
                           confirmButtonClass: "btn-danger",
                           closeOnConfirm: false
                        });
                        this.fdc['fecha_2_vdrl_embarazo'] = null;
                        this.fdc['eg_2_vdrl_embarazo'] = null;
                     }

                  }else if (this.fdc[input.name] == 'No Reactivo') {
                     this.find_input(this.inputs, 'fecha_2_vdrl_embarazo').disabled = null;
                     this.find_input(this.inputs, 'eg_2_vdrl_embarazo').disabled = null;
                     this.find_input(this.inputs, 'resultado_dilucion_2_vdrl_embarazo').disabled = true;

                  }
                  //Mara marcar como dato ya ingresado
                  this.fdc['resultado_dilucion_2_vdrl_embarazo'] = 'true';
               }
               else if (this.fdc[input.name] == 'Reactivo') {
                  this.find_input(this.inputs, 'resultado_dilucion_2_vdrl_embarazo').disabled = null;
                  this.find_input(this.inputs, 'fecha_2_vdrl_embarazo').disabled = null;
                  this.find_input(this.inputs, 'eg_2_vdrl_embarazo').disabled = null;
               }else{
                  this.find_input(this.inputs, 'resultado_dilucion_2_vdrl_embarazo').disabled = true;
                  this.find_input(this.inputs, 'fecha_2_vdrl_embarazo').disabled = true;
                  this.find_input(this.inputs, 'eg_2_vdrl_embarazo').disabled = true;
               }

               this.validar_derivada_especialidad();
               break;

            case 'resultado_3_vdrl_embarazo':
               if (this.fdc[input.name] == 'No Reactivo' || this.fdc[input.name] == 'No Realizado') {

                  if (this.fdc[input.name] == 'No Realizado') {
                     this.find_input(this.inputs, 'resultado_dilucion_3_vdrl_embarazo').disabled = true;
                     this.find_input(this.inputs, 'fecha_3_vdrl_embarazo').disabled = true;
                     this.find_input(this.inputs, 'eg_3_vdrl_embarazo').disabled = true;

                     if (this.fdc['fecha_3_vdrl_embarazo'] || this.fdc['eg_3_vdrl_embarazo']) {
                        swal({
                           title: "Advertencia",
                           text:  `
                              Si el resultado del examen es No Realizado,
                              No debe ir la Fecha ni Edad Gestacional ya que solo aplica para los resultados Reactivo y No Reactivo.
                           `,
                           type: "warning",
                           confirmButtonClass: "btn-danger",
                           closeOnConfirm: false
                        });
                        this.fdc['fecha_3_vdrl_embarazo'] = null;
                        this.fdc['eg_3_vdrl_embarazo'] = null;
                     }

                  }else if (this.fdc[input.name] == 'No Reactivo') {
                     this.find_input(this.inputs, 'fecha_3_vdrl_embarazo').disabled = null;
                     this.find_input(this.inputs, 'eg_3_vdrl_embarazo').disabled = null;
                     this.find_input(this.inputs, 'resultado_dilucion_3_vdrl_embarazo').disabled = true;
                  }
                  //Mara marcar como dato ya ingresado
                  this.fdc['resultado_dilucion_3_vdrl_embarazo'] = 'true';
               }
               else if (this.fdc[input.name] == 'Reactivo') {
                  this.find_input(this.inputs, 'resultado_dilucion_3_vdrl_embarazo').disabled = null;
                  this.find_input(this.inputs, 'fecha_3_vdrl_embarazo').disabled = null;
                  this.find_input(this.inputs, 'eg_3_vdrl_embarazo').disabled = null;
               } else {
                  this.find_input(this.inputs, 'resultado_dilucion_3_vdrl_embarazo').disabled = true;
                  this.find_input(this.inputs, 'fecha_3_vdrl_embarazo').disabled = true;
                  this.find_input(this.inputs, 'eg_3_vdrl_embarazo').disabled = true;
               }

               this.validar_derivada_especialidad();
               break;

            case 'resultado_vdrl_periferico_recien_nacido':
               if (this.fdc[input.name] == 'No Reactivo' || this.fdc[input.name] == 'No Realizado') {
                  if (this.fdc[input.name] == 'No Realizado') {
                     this.find_input(this.inputs, 'fecha_examen_vdrl_periferico_recien_nacido').disabled = true;
                     this.find_input(this.inputs, 'titulacion_vdrl_periferico_recien_nacido').disabled = true;

                  } else if (this.fdc[input.name] == 'No Reactivo') {
                     this.find_input(this.inputs, 'fecha_examen_vdrl_periferico_recien_nacido').disabled = null;
                     this.find_input(this.inputs, 'titulacion_vdrl_periferico_recien_nacido').disabled = true;
                  }
                  this.fdc['titulacion_vdrl_periferico_recien_nacido'] = 'true';

               } else {
                  this.find_input(this.inputs, 'fecha_examen_vdrl_periferico_recien_nacido').disabled = null;
                  this.find_input(this.inputs, 'titulacion_vdrl_periferico_recien_nacido').disabled = null;
               }
               break;

            case 'resultado_vdrl_liq_cefalo_recien_nacido':

               if (this.fdc[input.name] == 'No Reactivo' ||
                  this.fdc[input.name] == 'No Realizado' ||
                  this.fdc[input.name] == 'Puncion Frustrada'
               ) {

                  if (this.fdc[input.name] == 'No Realizado' || this.fdc[input.name] == 'Puncion Frustrada') {

                     this.find_input(this.inputs, 'titulacion_vdrl_liq_cefalo_recien_nacido').disabled = true;
                     this.find_input(this.inputs, 'fecha_examen_vdrl_liq_cefalo_recien_nacido').disabled = true;

                  }else if (this.fdc[input.name] == 'No Reactivo') {
                     this.find_input(this.inputs, 'fecha_examen_vdrl_liq_cefalo_recien_nacido').disabled = null;
                     this.find_input(this.inputs, 'titulacion_vdrl_liq_cefalo_recien_nacido').disabled = true;

                  }
                  this.fdc['titulacion_vdrl_liq_cefalo_recien_nacido'] = 'true';

               } else {
                  this.find_input(this.inputs, 'fecha_examen_vdrl_liq_cefalo_recien_nacido').disabled = null;
                  this.find_input(this.inputs, 'titulacion_vdrl_liq_cefalo_recien_nacido').disabled = null;
                  this.find_input(this.inputs, 'resultado_vdrl_liq_cefalo_recien_nacido').disabled = null;

               }

               break;

            case 'acepta_rechaza_toma_examen_vih':

               if (this.fdc[input.name] == 'Rechaza' || this.fdc[input.name] == 'No Corresponde') {

                  this.find_input(this.inputs, 'fecha_1_examen_vih_embarazo').disabled = true;
                  this.find_input(this.inputs, 'eg_1_examen_vih').disabled = true;
                  this.find_input(this.inputs, 'fecha_2_examen_vih_embarazo').disabled = true;
                  this.find_input(this.inputs, 'eg_2_examen_vih').disabled = true;
                  this.find_input(this.inputs, 'derivada_a_especialidades_embarazo').disabled = null;

               } else {

                  for (let i in this.inputs){

                     switch (this.inputs[i].id) {
                        case 'fecha_1_examen_vih_embarazo':
                        case 'eg_1_examen_vih':
                           if (this.fdc['resultado_1_examen_vih_embarazo'] == 'No Realizado') {
                              this.inputs[i].disabled = 'disabled';
                           }else{
                              this.inputs[i].disabled = null;
                           }
                           break;

                        case 'fecha_2_examen_vih_embarazo':
                        case 'eg_2_examen_vih':
                           if (this.fdc['resultado_2_examen_vih_embarazo'] == 'No Realizado') {
                              this.inputs[i].disabled = 'disabled';
                           }else{
                              this.inputs[i].disabled = null;
                           }
                           break;

                        case 'derivada_a_especialidades_embarazo':
                           if ((this.fdc['resultado_1_examen_vih_embarazo'] == 'Reactivo' ||
                              this.fdc['resultado_2_examen_vih_embarazo'] == 'Reactivo' ||
                              this.fdc['resultado_1_vdrl_embarazo'] == 'Reactivo' ||
                              this.fdc['resultado_2_vdrl_embarazo'] == 'Reactivo' ||
                              this.fdc['resultado_3_vdrl_embarazo'] == 'Reactivo')
                              && (this.fdc['resultado_1_examen_vih_embarazo'] != 'No Realizado' &&
                                 this.fdc['resultado_2_examen_vih_embarazo'] != 'No Realizado')
                           ) {
                              this.inputs[i].disabled = null;
                           }
                           break;
                     }
                  }
               }
               break;

            case 'resultado_1_examen_vih_embarazo':
               if (this.fdc[input.name] == 'No Realizado') {
                  this.find_input(this.inputs, 'fecha_1_examen_vih_embarazo').disabled = true;
                  this.find_input(this.inputs, 'eg_1_examen_vih').disabled = true;

                  if (this.fdc['fecha_1_examen_vih_embarazo'] || this.fdc['eg_1_examen_vih']) {
                     swal({
                        title: "Advertencia",
                        text: "Si el resultado del examen es No Realizado, NO debe ir la Fecha ni Edad Gestacional ya que solo aplica para los resultados Reactivo y No Reactivo.",
                        type: "warning",
                        confirmButtonClass: "btn-danger",
                        closeOnConfirm: false
                     });

                     this.fdc['eg_1_examen_vih'] = null;
                     this.fdc['fecha_1_examen_vih_embarazo'] = null;
                  }
               }
               else if (this.fdc[input.name] == 'No Reactivo' || this.fdc[input.name] == 'Reactivo') {
                  this.find_input(this.inputs, 'fecha_1_examen_vih_embarazo').disabled = null;
                  this.find_input(this.inputs, 'eg_1_examen_vih').disabled = null;
               }else{
                  this.find_input(this.inputs, 'fecha_1_examen_vih_embarazo').disabled = true;
                  this.find_input(this.inputs, 'eg_1_examen_vih').disabled = true;
               }

               if (this.fdc['resultado_1_examen_vih_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_2_examen_vih_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_1_vdrl_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_2_vdrl_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_3_vdrl_embarazo'] != 'Reactivo') {

                  this.find_input(this.inputs, 'derivada_a_especialidades_embarazo').disabled = true;

               }else if (this.fdc['resultado_1_examen_vih_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_2_examen_vih_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_1_vdrl_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_2_vdrl_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_3_vdrl_embarazo'] == 'Reactivo'){

                  this.find_input(this.inputs, 'derivada_a_especialidades_embarazo').disabled = null;
                  this.alert_if_info_reactivo_especialidades();
               }

               break;

            case 'resultado_2_examen_vih_embarazo':

               if (this.fdc[input.name] == 'No Realizado') {

                  if (this.fdc['fecha_2_examen_vih_embarazo'] || this.fdc['eg_2_examen_vih']) {
                     swal({
                        title: "Advertencia",
                        text: "Si el resultado del examen es No Realizado, NO debe ir la Fecha ni Edad Gestacional ya que solo aplica para los resultados Reactivo y No Reactivo.",
                        type: "warning",
                        confirmButtonClass: "btn-danger",
                        closeOnConfirm: false
                     });
                     this.fdc['eg_2_examen_vih'] = null;
                     this.fdc['fecha_2_examen_vih_embarazo'] = null;
                  }

                  this.find_input(this.inputs, 'fecha_2_examen_vih_embarazo').disabled = true;
                  this.find_input(this.inputs, 'eg_2_examen_vih').disabled = true;

               } else if (this.fdc[input.name] == 'No Reactivo' || this.fdc[input.name] == 'Reactivo') {
                  this.find_input(this.inputs, 'fecha_2_examen_vih_embarazo').disabled = null;
                  this.find_input(this.inputs, 'eg_2_examen_vih').disabled = null;
               } else {
                  this.find_input(this.inputs, 'fecha_2_examen_vih_embarazo').disabled = true;
                  this.find_input(this.inputs, 'eg_2_examen_vih').disabled = true;
               }

               if (this.fdc['resultado_1_examen_vih_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_2_examen_vih_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_1_vdrl_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_2_vdrl_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_3_vdrl_embarazo'] != 'Reactivo') {

                  this.fdc['derivada_a_especialidades_embarazo']='';
                  this.find_input(this.inputs, 'derivada_a_especialidades_embarazo').disabled = true;

               }else if (this.fdc['resultado_1_examen_vih_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_2_examen_vih_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_1_vdrl_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_2_vdrl_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_3_vdrl_embarazo'] == 'Reactivo'){

                  this.find_input(this.inputs, 'derivada_a_especialidades_embarazo').disabled = null;
                  this.alert_if_info_reactivo_especialidades();
               }

               break;

            case 'escolaridad':
               $('.anos_estudio1').find('option').remove().end();
               $('.anos_estudio2').find('option').remove().end();
               switch (this.fdc[input.id]) {
                  case 'Ed. Basica':
                     for (var i = 1;i<=8;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio1').append($(o).html(i));
                     }
                     for (var i = 1;i<=8;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio2').append($(o).html(i));
                     }
                     break;
                  case 'Ed. Media':
                     for (var i = 1;i<=4;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio1').append($(o).html(i));
                     }
                     for (var i = 1;i<=4;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio2').append($(o).html(i));
                     }
                     break;
                  case 'Tecnico':
                     for (var i = 1;i<=3;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio1').append($(o).html(i));
                     }
                     for (var i = 1;i<=3;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio2').append($(o).html(i));
                     }
                     break;
                  case 'Superior':
                     for (var i = 1;i<=7;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio1').append($(o).html(i));
                     }
                     for (var i = 1;i<=7;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio2').append($(o).html(i));
                     }
                     break;
               }

               $('.anos_estudio1').val(this.fdc['anos_estudio']);
               $('.anos_estudio2').val(this.fdc['anos_estudio']);
               break;

            case 'nacidos_vivos_previos_embarazo':
            case 'nacidos_muertos_previos_embarazo':
            case 'abortos_previos_embarazo':
               if (parseInt(this.fdc[input.name]) > 30 || parseInt(this.fdc[input.name]) < 0) {
                  this.fdc[input.name] = 0;
               }
               break;

            case 'codigo_establecimiento':
               if (parseInt(this.fdc[input.name]) < 0) {
                  this.fdc[input.name] = 0;
               }
               break;

            case 'sifilis_previa_embarazo':
               if (this.fdc[input.name] == 'No') {
                  this.find_input(this.inputs, 'ano_sifilis_previa_embarazo').disabled = true;
               } else {
                  this.find_input(this.inputs, 'ano_sifilis_previa_embarazo').disabled = null;
                  if (this.fdc[input.name] == 'Si') {
                     swal({
                        title: "Advertencia",
                        text: `
                        Ahora, debe completar el año cuando se diagnosticó esta patología en "Año sífilis previo a este embarazo".
                        `,
                        type: "warning",
                        confirmButtonClass: "btn-danger",
                        closeOnConfirm: false
                     });
                  }
               }
               break;

            case 'ano_sifilis_previa_embarazo':
               var d = new Date();
               var y = d.getFullYear();
               if (parseInt(this.fdc[input.name]) < 0 || parseInt(this.fdc[input.name]) > y || parseInt(this.fdc[input.name]) < 1920) {
                  this.fdc[input.name] = 0;
               }
               break;
            case 'numero_cd4_ingreso_control_prenatal':
               if (parseInt(this.fdc[input.name]) < 0 || parseInt(this.fdc[input.name]) > 9999999) {
                  this.fdc[input.name] = null;
               }
               if (this.fdc['fecha_examen_linfocitos_cd4_ingreso_control_prenatal'] != null) {
                  this.find_input(this.inputs, 'numero_cd4_ingreso_control_prenatal').disabled = null;
               }else{
                  this.find_input(this.inputs, 'numero_cd4_ingreso_control_prenatal').disabled = true;
               }
               break;

            case 'numero_carga_viral_control_prenatal':
               if (parseInt(this.fdc[input.name]) < 0 || parseInt(this.fdc[input.name]) > 9999999) {
                  this.fdc[input.name] = null;
               }else{
                  if (parseInt(this.fdc[input.name]) > 0) {
                     this.fdc[input.name] = Math.round(parseInt(this.fdc[input.name]));
                  }
               }
               if (this.fdc['fecha_examen_carga_viral_control_prenatal'] != null) {
                  this.find_input(this.inputs, 'numero_carga_viral_control_prenatal').disabled = null;
               }else{
                  this.find_input(this.inputs, 'numero_carga_viral_control_prenatal').disabled = true;
               }
               break;

            case 'carga_viral_numero_copia_semana_34':
               if (parseInt(this.fdc[input.name]) < 0 || parseInt(this.fdc[input.name]) > 9999999) {
                  this.fdc[input.name] = 0;
               }else{
                  this.fdc[input.name] = this.fdc[input.name]>0?Math.round(parseInt(this.fdc[input.name])):null;
               }
               if (this.fdc['fecha_examen_carga_viral_semana_34'] != null) {
                  this.find_input(this.inputs, 'carga_viral_numero_copia_semana_34').disabled = null;
               }else{
                  this.find_input(this.inputs, 'carga_viral_numero_copia_semana_34').disabled = true;
               }
               break;

            case 'resultado_vdrl_parto':
               if (this.fdc[input.name] == 'No Reactivo' || this.fdc[input.name] == 'No Realizado'){
                  this.find_input(this.inputs, 'resultado_dilucion_vdrl_parto').disabled = true;
                  this.fdc['resultado_dilucion_vdrl_parto'] = 'true';
               }
               else{
                  this.find_input(this.inputs, 'resultado_dilucion_vdrl_parto').disabled = null;
               }
               break;
            case 'peso_mujer_parto':
               if (parseInt(this.fdc[input.name])>0) {
                  if (parseInt(this.fdc[input.name]) > 999) {
                     this.fdc[input.name] = 0;
                  }
               }
               break;
            case 'peso_recien_nacido':
               if (parseInt(this.fdc[input.name])>0) {
                  if (parseInt(this.fdc[input.name]) > 9999) {
                     this.fdc[input.name] = 0;
                  }
               }else{
                  this.fdc[input.name] = 0;
               }
               break;
            case 'resultado_treponemico':
               if (this.fdc[input.name] == 'No Realizado') {
                  this.find_input(this.inputs, 'fecha_examen_treponemico').disabled = true;
               }
               else{
                  this.find_input(this.inputs, 'fecha_examen_treponemico').disabled = null;
               }
               break;

            case 'diagnostico_sifilis_embarazo':
               var diagnosticos = [
                  'Sifilis Primaria','Sifilis Secundaria', 'Sifilis Latente Precoz','Sifilis Latente Tardia','Sifilis Sin Especificar'
               ];

               if (this.in_array(diagnosticos, this.fdc[input.name])) {
                  this.find_input(this.inputs, 'fecha_administracion_1_dosis_penicilina_gestante').disabled = null;
                  this.find_input(this.inputs, 'fecha_administracion_ult_dosis_penicilina_gestante').disabled = null;
                  this.find_input(this.inputs, 'tratamiento_sifilis_farmaco').disabled = null;
                  this.find_input(this.inputs, 'tratamiento_sifilis_dosis').disabled = null;
                  this.find_input(this.inputs, 'tratamiento_sifilis_frecuencia').disabled = null;
               }else{
                  this.find_input(this.inputs, 'fecha_administracion_1_dosis_penicilina_gestante').disabled = true;
                  this.find_input(this.inputs, 'fecha_administracion_ult_dosis_penicilina_gestante').disabled = true;
                  this.find_input(this.inputs, 'tratamiento_sifilis_farmaco').disabled = true;
                  this.find_input(this.inputs, 'tratamiento_sifilis_dosis').disabled = true;
                  this.find_input(this.inputs, 'tratamiento_sifilis_frecuencia').disabled = true;
               }
               break;



            case 'numero_contactos_sexuales_declarados':
               if (parseInt(this.fdc[input.name])>=1){
                  this.find_input(this.inputs, 'numero_contactos_sexuales_estudiados').disabled = null;
                  this.find_input(this.inputs, 'numero_contactos_sexuales_tratados').disabled = null;
               }else{
                  this.find_input(this.inputs, 'numero_contactos_sexuales_estudiados').disabled = true;
                  this.find_input(this.inputs, 'numero_contactos_sexuales_tratados').disabled = true;
               }
               if (parseInt(this.fdc[input.name])<0) { this.fdc[input.name] = null; }
               break;

            case 'numero_contactos_sexuales_estudiados':
               if (parseInt(this.fdc[input.name])<0) { this.fdc[input.name] = null; }
               break;
            case 'numero_contactos_sexuales_tratados':
               if (parseInt(this.fdc[input.name])<0) {
                  this.fdc[input.name] = null;
               }
               break;

            case 'sustituto_leche_materna':
               if (this.fdc[input.name] == 'No') {
                  this.find_input(this.inputs, 'fecha_inicio_sustituto_leche_materna').disabled = true;
                  this.find_input(this.inputs, 'hora_inicio_sustituto_leche_materna').disabled = true;
                  this.find_input(this.inputs, 'entrega_sustituto_leche_materna_al_alta').disabled = true;
               }
               else{
                  this.find_input(this.inputs, 'fecha_inicio_sustituto_leche_materna').disabled = null;
                  this.find_input(this.inputs, 'hora_inicio_sustituto_leche_materna').disabled = null;
                  this.find_input(this.inputs, 'entrega_sustituto_leche_materna_al_alta').disabled = null;
               }
               break;

            case 'nombre_farmaco_1_vih_recien_nacido':
               if (this.fdc[input.name] != null && this.fdc[input.name] != '') {
                  this.find_input(this.inputs, 'fecha_inicio_farmaco_1_vih_recien_nacido').disabled = null;
                  this.find_input(this.inputs, 'hora_inicio_farmaco_1_vih_recien_nacido').disabled = null;
                  this.find_input(this.inputs, 'dosis_farmaco_1_vih_recien_nacido').disabled = null;
               } else {
                  this.find_input(this.inputs, 'fecha_inicio_farmaco_1_vih_recien_nacido').disabled = true;
                  this.find_input(this.inputs, 'hora_inicio_farmaco_1_vih_recien_nacido').disabled = true;
                  this.find_input(this.inputs, 'dosis_farmaco_1_vih_recien_nacido').disabled = true;
               }
               break;

            case 'nombre_farmaco_2_vih_recien_nacido':
               if (this.fdc[input.name] != null && this.fdc[input.name] != '') {
                  this.find_input(this.inputs, 'fecha_inicio_farmaco_2_vih_recien_nacido').disabled = null;
                  this.find_input(this.inputs, 'hora_inicio_farmaco_2_vih_recien_nacido').disabled = null;
                  this.find_input(this.inputs, 'dosis_farmaco_2_vih_recien_nacido').disabled = null;
               } else {
                  this.find_input(this.inputs, 'fecha_inicio_farmaco_2_vih_recien_nacido').disabled = true;
                  this.find_input(this.inputs, 'hora_inicio_farmaco_2_vih_recien_nacido').disabled = true;
                  this.find_input(this.inputs, 'dosis_farmaco_2_vih_recien_nacido').disabled = true;
               }
               break;

            case 'tratamiento_recien_nacido_frecuencia':
               if (parseInt(this.fdc[input.name]) > 99 || parseInt(this.fdc[input.name]) < 0) { this.fdc[input.name] = 0; }
               break;

            case 'nombre_farmaco_1_vih':
               if (this.fdc[input.name]) {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'peso_mujer_parto' ||
                        this.inputs[i].name == 'dosis_farmaco_1_vih' ||
                        this.inputs[i].name == 'fecha_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'hora_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'dosis_2_farmaco_1_vih' ||
                        this.inputs[i].name == 'fecha_2_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'hora_2_inicio_farmaco_1_vih') {
                        this.inputs[i].disabled = null;
                     }
                  }
               } else {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'peso_mujer_parto' ||
                        this.inputs[i].name == 'dosis_farmaco_1_vih' ||
                        this.inputs[i].name == 'fecha_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'hora_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'dosis_2_farmaco_1_vih' ||
                        this.inputs[i].name == 'fecha_2_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'hora_2_inicio_farmaco_1_vih') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }
               break;

            case 'nombre_farmaco_2_vih':
               if (this.fdc[input.name]) {
                  this.find_input(this.inputs, 'dosis_farmaco_2_vih').disabled = null;
                  this.find_input(this.inputs, 'fecha_inicio_farmaco_2_vih').disabled = null;
                  this.find_input(this.inputs, 'hora_inicio_farmaco_2_vih').disabled = null;
               } else {
                  this.find_input(this.inputs, 'dosis_farmaco_2_vih').disabled = true;
                  this.find_input(this.inputs, 'fecha_inicio_farmaco_2_vih').disabled = true;
                  this.find_input(this.inputs, 'hora_inicio_farmaco_2_vih').disabled = true;
               }
               break;

            case 'resultado_test_elisa_18_meses':
               if(this.fdc[input.name] == 'No Realizado'){
                  this.find_input(this.inputs, 'fecha_test_elisa_18_meses').disabled = true;
               } else {
                  this.find_input(this.inputs, 'fecha_test_elisa_18_meses').disabled = null;
               }
               break;

            case 'resultado_final_isp_examen_vih_recien_nacido':
               if(this.fdc[input.name] == 'No Realizado'){
                  this.find_input(this.inputs, 'fecha_resultado_final_isp_examen_vih_recien_nacido').disabled = true;
               }else{
                  this.find_input(this.inputs, 'fecha_resultado_final_isp_examen_vih_recien_nacido').disabled = null;
               }
               break;

            case 'derivacion_recien_nacido_a_seguimiento':
               if(this.fdc[input.name] == 'No'){
                  this.find_input(this.inputs, 'lugar_derivacion_recien_nacido_a_seguimiento').disabled = true;
                  this.find_input(this.inputs, 'fecha_ingreso_control_recien_nacido_post_nacimiento').disabled = true;
               } else {
                  this.find_input(this.inputs, 'lugar_derivacion_recien_nacido_a_seguimiento').disabled = null;
                  this.find_input(this.inputs, 'fecha_ingreso_control_recien_nacido_post_nacimiento').disabled = null;
               }
               break;

            case 'tratamiento_recien_nacido_farmaco':
               if(this.fdc[input.name] != null && this.fdc[input.name] != ''){
                  this.find_input(this.inputs, 'tratamiento_recien_nacido_dosis').disabled = null;
                  this.find_input(this.inputs, 'tratamiento_recien_nacido_frecuencia').disabled = null;
               } else {
                  this.find_input(this.inputs, 'tratamiento_recien_nacido_dosis').disabled = true;
                  this.find_input(this.inputs, 'tratamiento_recien_nacido_frecuencia').disabled = true;
               }
               break;

            case 'estado_recien_nacido':
               if (this.fdc[input.name] == 'Muerto') {
                  for (let i in this.inputs) {
                     if (this.inputs[i].bloque == input.bloque && this.inputs[i].name != input.name) {
                        this.inputs[i].disabled = true;
                     }
                  }
               } else {
                  for (let i in this.inputs) {
                     if ( this.inputs[i].bloque == input.bloque && this.inputs[i].name != input.name) {
                        this.inputs[i].disabled = null;
                     }
                  }
               }
               break;

            case 'nombre_farmaco_suspencion_lactancia':

               if(this.fdc[input.name] != null && this.fdc[input.name] != ''){
                  this.find_input(this.inputs, 'fecha_administracion_farmaco_suspencion_lactancia').disabled = null;
               }else{
                  this.find_input(this.inputs, 'fecha_administracion_farmaco_suspencion_lactancia').disabled = true;
               }
               break;

            case 'resultado_1_examen_pcr_recien_nacido':
               if (this.fdc[input.name] == 'No Realizado') {
                  this.find_input(this.inputs, 'fecha_1_examen_pcr_recien_nacido').disabled = true;
               } else {
                  this.find_input(this.inputs, 'fecha_1_examen_pcr_recien_nacido').disabled = null;
               }
               break;


            case 'resultado_2_examen_pcr_recien_nacido':
               if (this.fdc[input.name] == 'No Realizado') {
                  this.find_input(this.inputs, 'fecha_2_examen_pcr_recien_nacido').disabled = true;
               } else {
                  this.find_input(this.inputs, 'fecha_2_examen_pcr_recien_nacido').disabled = null;
               }
               break;


            case 'resultado_3_examen_pcr_recien_nacido':
               if (this.fdc[input.name] == 'No Realizado') {
                  this.find_input(this.inputs, 'fecha_3_examen_pcr_recien_nacido').disabled = true;
               }
               else {
                  this.find_input(this.inputs, 'fecha_3_examen_pcr_recien_nacido').disabled = null;
               }
               break;
            case 'resultado_examen_vih_parto':
               if (this.fdc[input.name] == 'No Realizado' || this.fdc[input.name] == 'No Reactivo'
                  || this.fdc[input.name] == 'No Corresponde') {
                  this.find_input(this.inputs, 'tratamiento_retroviral_parto').disabled = true;
                  this.fdc['tratamiento_retroviral_parto'] = 'true';
               }
               else {
                  this.find_input(this.inputs, 'tratamiento_retroviral_parto').disabled = null;
               }
               break;


            case 'terapia_antiretroviral_farmaco_1':
               if (this.fdc[input.name]) {
                  this.find_input(this.inputs, 'fecha_inicio_tar_farmaco_1').disabled = null;
               }else{
                  this.find_input(this.inputs, 'fecha_inicio_tar_farmaco_1').disabled = true;
               }
               break;

            case 'terapia_antiretroviral_tar_farmaco_2':
               if (this.fdc[input.name]) {
                  this.find_input(this.inputs, 'fecha_inicio_tar_farmaco_2').disabled = null;
               }else{
                  this.find_input(this.inputs, 'fecha_inicio_tar_farmaco_2').disabled = true;
               }
               break;

            case 'terapia_antiretroviral_tar_farmaco_3':
               if (this.fdc[input.name]) {
                  this.find_input(this.inputs, 'fecha_inicio_tar_farmaco_3').disabled = null;
               }else{
                  this.find_input(this.inputs, 'fecha_inicio_tar_farmaco_3').disabled = true;
               }
               break;

            default:
               break;

         }

      },

      verifica_validacion_click: function (input) {
         switch (input.id) {

            case 'lugar_control_prenatal':
            case 'lugar_control_embarazo':
            case 'establecimiento_control_sifilis':
            case 'establecimiento_control_vih':
            case 'lugar_atencion_parto':
               this.establecimiento_a_editar = input.id;
               this.show_modal_seleccion_establecimiento = true;
               break;


            case 'pais_origen':
               break;

            //case 'anos_estudio':
            case 'escolaridad':
               $('.anos_estudio1').find('option').remove().end();
               $('.anos_estudio2').find('option').remove().end();
               switch (this.fdc[input.id]) {
                  case 'Ed. Basica':
                     for (var i = 1;i<=8;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio1').append($(o).html(i));
                     }
                     for (var i = 1;i<=8;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio2').append($(o).html(i));
                     }
                     break;
                  case 'Ed. Media':
                     for (var i = 1;i<=4;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio1').append($(o).html(i));
                     }
                     for (var i = 1;i<=4;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio2').append($(o).html(i));
                     }
                     break;
                  case 'Tecnico':
                     for (var i = 1;i<=3;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio1').append($(o).html(i));
                     }
                     for (var i = 1;i<=3;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio2').append($(o).html(i));
                     }
                     break;
                  case 'Superior':
                     for (var i = 1;i<=7;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio1').append($(o).html(i));
                     }
                     for (var i = 1;i<=7;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio2').append($(o).html(i));
                     }
                     break;
                  default:
                     var i = -1;
                     do {
                        i++;
                        var o = new Option(i,i);
                        $('.anos_estudio1').append($(o).html(i));
                        $('.anos_estudio2').append($(o).html(i));
                     }while(false);
                     break;
               }
               $('.anos_estudio1').val(this.fdc['anos_estudio']);
               $('.anos_estudio2').val(this.fdc['anos_estudio']);
               break;

         }
      },

      verifica_validacion_blur: function (input) {

         if (this.fdc[input.name] && isNaN(this.fdc[input.name]) && typeof this.fdc[input.name] != 'number' ) {
            this.fdc[input.name] = this.fdc[input.name].replace(/[^a-zA-Z0-9\s\-ñíéáóú\(\)\#\+\/,\.\:ÑÍÉÓÁÚ@_]/g, '');
         }

         if (this.is_null(this.fdc[input.name]) == true) {
            return;
         }

         /*
         for (let i in this.inputs){
            //this.fdc[input.name] = this.fdc[input.name].replace(/[^a-zA-Z0-9\s\-ñíéáóúscript;:\#\,\.\;\:ÑÍÉÓÁÚ@_]/g, '');
            this.fdc[input.name] = this.fdc[input.name].replace(/[^a-zA-Z0-9\s\-ñíéáóú\(\)\#\+\/,\.\:ÑÍÉÓÁÚ@_]/g, '');
         }
         */

         switch (input.id) {

            case 'fecha_nacimiento_madre':

               var date = this.fdc[input.name].split('-');
               var ano_tope = new Date();
               ano_tope = ano_tope.getFullYear();
               var ano = date[0];
               var mes = date[1];
               var dia = date[2];
               if (parseInt(ano)<1930) {
                  ano = 1930;
                  this.fdc[input.name] = `${ano}-${mes}-${dia}`;
                  swal({
                     title: "Advertencia",
                     text: "Por favor ingrese un año válido.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
               }else if(parseInt(ano)>ano_tope) {
                  this.fdc[input.name] = `${ano_tope}-${mes}-${dia}`;
                  swal({
                     title: "Advertencia",
                     text: "Por favor ingrese un año válido.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
               }
               break;

            case 'fecha_parto':
               var date = this.fdc[input.name].split('-');
               var ano_tope = new Date();
               ano_tope = ano_tope.getFullYear();
               var ano = date[0];
               var mes = date[1];
               var dia = date[2];
               if (parseInt(ano)<2016) {
                  ano = 2016;
                  this.fdc[input.name] = `${ano}-${mes}-${dia}`;
                  swal({
                     title: "Advertencia",
                     text: "Por favor ingrese un año válido (Desde 01 de enero del 2016).",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  this.fdc[input.name] = null;
               }else if(parseInt(ano)>ano_tope) {
                  this.fdc[input.name] = `${ano_tope}-${mes}-${dia}`;
                  swal({
                     title: "Advertencia",
                     text: "Por favor ingrese un año válido.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  this.fdc[input.name] = null;
               }

               if (date=="") {
                  swal({
                     title: "Advertencia",
                     text: "Por favor ingrese una fecha válida.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  this.fdc[input.name] = null;
               }
               break;

            case 'fecha_ingreso_control_prenatal_embarazo':
            case 'fecha_ultima_regla_gestacional':
            case 'fecha_ultima_regla_operacional':
            case 'fecha_1_vdrl_embarazo':
            case 'fecha_2_vdrl_embarazo':
            case 'fecha_3_vdrl_embarazo':
            case 'fecha_administracion_1_dosis_penicilina_gestante':
            case 'fecha_1_examen_vih_embarazo':
            case 'fecha_2_examen_vih_embarazo':
            case 'fecha_ingreso_control_unidad_alto_riesgo':
            case 'fecha_ingreso_unacess':
            case 'fecha_ingreso_control_otras_especialidades':
            case 'fecha_examen_treponemico':
            case 'fecha_administracion_ult_dosis_penicilina_gestante':
            case 'fecha_ingreso_control_centro_atencion_vih':
            case 'fecha_examen_linfocitos_cd4_ingreso_control_prenatal':
            case 'fecha_examen_carga_viral_control_prenatal':
            case 'fecha_examen_carga_viral_semana_34':
            case 'fecha_inicio_tar_farmaco_1':
            case 'fecha_inicio_tar_farmaco_2':
            case 'fecha_inicio_tar_farmaco_3':
            case 'fecha_2_inicio_farmaco_1_vih':
            case 'fecha_administracion_farmaco_suspencion_lactancia':
            case 'fecha_nacimiento_recien_nacido':
            case 'fecha_examen_vdrl_periferico_recien_nacido':
            case 'fecha_examen_vdrl_liq_cefalo_recien_nacido':
            case 'fecha_examen_treponemico_recien_nacido':
            case 'fecha_inicio_sustituto_leche_materna':
            case 'fecha_1_examen_pcr_recien_nacido':
            case 'fecha_2_examen_pcr_recien_nacido':
            case 'fecha_3_examen_pcr_recien_nacido':
            case 'fecha_test_elisa_18_meses':
            case 'fecha_resultado_final_isp_examen_vih':
            case 'fecha_resultado_final_isp_examen_vih_recien_nacido':
            case 'fecha_inicio_farmaco_1_vih_recien_nacido':
            case 'fecha_inicio_farmaco_2_vih_recien_nacido':
            case 'fecha_inicio_farmaco_2_vih':
            case 'fecha_ingreso_control_recien_nacido_post_nacimiento':
               var date = this.fdc[input.name].split('-');
               var ano_tope = new Date();
               ano_tope = ano_tope.getFullYear();
               var ano = date[0];
               var mes = date[1];
               var dia = date[2];
               if (parseInt(ano)<2000) {
                  ano = 2000;
                  this.fdc[input.name] = `${ano}-${mes}-${dia}`;
                  swal({
                     title: "Advertencia",
                     text: "Por favor ingrese un año válido.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  this.fdc[input.name] = null;
               }else if(parseInt(ano)>ano_tope) {
                  this.fdc[input.name] = `${ano_tope}-${mes}-${dia}`;
                  swal({
                     title: "Advertencia",
                     text: "Por favor ingrese un año válido.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  this.fdc[input.name] = null;
               }

               if (date=="") {
                  swal({
                     title: "Advertencia",
                     text: "Por favor ingrese una fecha válida.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  this.fdc[input.name] = null;
               }

               for (let i in this.inputs){
                  switch (this.inputs[i].name) {
                     case 'fecha_1_vdrl_embarazo':
                     case 'fecha_2_vdrl_embarazo':
                     case 'fecha_3_vdrl_embarazo':
                     case 'fecha_1_examen_vih_embarazo':
                     case 'fecha_2_examen_vih_embarazo':
                        var fecha_vdrl = moment(this.fdc[this.inputs[i].name]);
                        var fecha_parto = moment(this.fdc['fecha_parto']);
                        //console.log(fecha2.diff(fecha1, 'days'), ' dias de diferencia');
                        //console.log(fecha_parto.diff(fecha_vdrl, 'days'));
                        if (fecha_parto.diff(fecha_vdrl, 'days') != NaN) {
                           if (fecha_parto.diff(fecha_vdrl, 'days') > 300) {
                              swal({
                                 title: "Advertencia",
                                 text: "La diferencia de dias excede los 300 dias antes del parto.",
                                 type: "warning",
                                 confirmButtonClass: "btn-danger",
                                 closeOnConfirm: false
                              });
                              this.fdc[this.inputs[i].name] = null
                           }else if (fecha_parto.diff(fecha_vdrl, 'days') < 0){
                              swal({
                                 title: "Advertencia",
                                 text: "La fecha no puede ser mayor a la fecha de parto.",
                                 type: "warning",
                                 confirmButtonClass: "btn-danger",
                                 closeOnConfirm: false
                              });
                              this.fdc[this.inputs[i].name] = null
                           }
                        }
                        break;
                  }
               }

               if (this.fdc['fecha_examen_linfocitos_cd4_ingreso_control_prenatal'] != null) {
                  this.find_input(this.inputs, 'numero_cd4_ingreso_control_prenatal').disabled = null;
               }else{
                  this.find_input(this.inputs, 'numero_cd4_ingreso_control_prenatal').disabled = true;
               }

               if (this.fdc['fecha_examen_carga_viral_control_prenatal'] != null) {
                  this.find_input(this.inputs, 'numero_carga_viral_control_prenatal').disabled = null;
               }else{
                  this.find_input(this.inputs, 'numero_carga_viral_control_prenatal').disabled = true;
               }

               if (this.fdc['fecha_examen_carga_viral_semana_34'] != null) {
                  this.find_input(this.inputs, 'carga_viral_numero_copia_semana_34').disabled = null;
               }else{
                  this.find_input(this.inputs, 'carga_viral_numero_copia_semana_34').disabled = true;
               }

               if (this.fdc['terapia_antiretroviral_farmaco_1']) {
                  this.find_input(this.inputs, 'fecha_inicio_tar_farmaco_1').disabled = null;
               }else{
                  this.find_input(this.inputs, 'fecha_inicio_tar_farmaco_1').disabled = true;
               }

               if (this.fdc['terapia_antiretroviral_tar_farmaco_2']) {
                  this.find_input(this.inputs, 'fecha_inicio_tar_farmaco_2').disabled = null;
               }else{
                  this.find_input(this.inputs, 'fecha_inicio_tar_farmaco_2').disabled = true;
               }

               if (this.fdc['terapia_antiretroviral_tar_farmaco_3']) {
                  this.find_input(this.inputs, 'fecha_inicio_tar_farmaco_3').disabled = null;
               }else{
                  this.find_input(this.inputs, 'fecha_inicio_tar_farmaco_3').disabled = true;
               }
               break;

         }
      },

      //*******************************//
      // FIN * VALIDACIONES DE INPUTS *//
      //*******************************//




      buscar_formulario: function () {
         if (this.fdc.id && this.fdc.id != null && this.fdc.id != undefined) {
            this.guardar_formulario_completo_silencioso();
         }
         return this.show_modal_buscar_formulario = true;
      },

      visualizar_errores: function () {
         return this.show_modal_errores_formulario = true;
      },

      visualizar_mis_formularios: function () {

         //console.log(this.$children[4].show_mis_formularios_grid = false);//.show_mis_formularios_grid = true;
         //Forma no muuy optima para volver a mostrar el grid tras el cierre.
         this.$children[4].show_mis_formularios_grid = true;

         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

         this.$http.post('/formulario/mis_formularios').then(response => { // success callback
            //console.log(response.body.mis_formularios);
            if (response.status == 200) {
               if (response.body.mis_formularios != null && response.body.mis_formularios.length > 0) {
                  this.mis_formularios = response.body.mis_formularios;
                  this.inputs_formulario = response.body.inputs_formulario;
                  /*
                  for (var i in this.mis_formularios) {
                     if (this.mis_formularios[i].form_deis != null) {console.log(this.mis_formularios[i].form_deis.id);}
                     else{console.log('Formulario eliminado.');}
                  }
                  */
               }
            }

            //console.log(this.mis_formularios);
         }, response => { // error callback
            //console.log(response);
            this.check_status_code(response.status);
         });

         return this.show_modal_mis_formularios = true;
      },

      crear_nuevo_formulario: function () {
         this.formularioNuevoActivo = true;
         this.formularioEditActivo = false;
         this.show_modal_formularios_encontrados = false;
         this.renderizar_formulario();


         /*
         var self = this;
         setTimeout(function () {
            swal({
               title: "Atencion",
               text: `
               Se está creando un nuevo formulario sin problemas

               El número correlativo es el: ${self.fdc.n_correlativo_interno}
            `,
               type: "success",
               confirmButtonClass: "btn-success",
               closeOnConfirm: false
            });
         }, 2000);
         */

         /*
         if (this.formularioNuevoActivo == false) {
            this.renderizar_formulario();
            this.formularioNuevoActivo = true;
         }else{
            this.fdc = this.formularioActivoObj;
            swal({
               title: "Advertencia",
               text: "Ya se está creando un nuevo formulario.",
               type: "warning",
               confirmButtonClass: "btn-danger",
               closeOnConfirm: false
            });
         }
         */
      },

      check_mensajes_informativos: function () {
         if (this.auth && this.auth.mensajes_informativos != 'true') {
            var self = this;
            swal({
               title: "Información importante sobre actualizaciones",
               text: `
                     Estimado/a usuariore/a, le informamos que se encuentra utilizando una version antigua del aplicativo, le sugerimos que presione la siguiente combinacion de teclas para incorporar las nuevas funcionalidades y actualizar la página.

                     Ctrl + F5
                     o
                     Ctrl+Shift+R

                     Al aceptar el proceso, la página se refrescará automaticamente, pero se le sugiere también realizar el procedimiento mencionado anteriormente de forma manual.

                     La nueva versión incluye correcciones en la selección de fármacos.

                     Se agradece su colaboración, saludos.
                     `,
               closeOnConfirm: true,
               confirmButtonText: 'Si, acepto realizar',
            }, function (isConfirm) {
               if (isConfirm == true) {
                  swal.close();
                  Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                  self.$http.post('/formulario/confirmar_mensaje_informativo').then(response => { // success callback
                     //console.log(response);
                     window.location.reload(true);
                  }, response => { // error callback
                     //console.log(response);
                  });
               }else{
                  return ;
               }
            });
         }

      },

      check_acepta_terminos: function () {

         if (this.auth && this.auth.acepta_terminos != 'true') {
            var self = this;
            swal({
               title: "Términos y condiciones de uso",
               text: `
                     Al ingresar y o realizar cualquier operación de tratamiento de datos en esta base de datos declaro que tengo conocimiento que el artículo 7 de la ley 19628 dispone que  “Las personas que trabajan en el tratamiento de datos personales, tanto en organismos públicos como privados, están obligadas a guardar secreto sobre los mismos, cuando provengan o hayan sido recolectados de fuentes no accesibles al público, como asimismo sobre los demás datos y antecedentes relacionados con el banco de datos, obligación que no cesa por haber terminado sus actividades en ese campo”. Asimismo, declaro que tengo conocimiento de que los datos que se tratan en este sistema son “datos sensibles” y por tanto los datos de este sistema sólo podrán ser tratados dentro de las finalidades que se declaran.

                     Adicionalmente, si de acuerdo a mis funciones no me corresponde tener acceso a esta información, me hago responsable de notificar inmediatamente al administrador (cperedo@minsal.cl o gberrios@minsal.cl), sin perjuicio de cancelar los datos que se me hayan comunicado por error.
                     `,
               closeOnConfirm: true,
               confirmButtonText: 'Si, acepto',
            }, function (isConfirm) {

               //alert(isConfirm);
               if (isConfirm == true) {
                  swal.close();

                  Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

                  self.$http.post('/formulario/confirmar_confidencialidad_usuario').then(response => { // success callback
                     //console.log(response);
                     var rd = response.body.rd;
                     if (rd == true) {
                        swal("Gracias!", "Te recordamos que al ser información sensible solicitamos tomar con seriedad el ingreso de la información.");
                     }

                  }, response => { // error callback
                     //console.log(response);
                  });
               }else{
                  return ;
               }
            });
         }

      },

      fetch_formulario: function () {

         this.$http.get('/formulario/create').then(response => { // success callback
            //Se reciben los recursos desde el backend para renderizar el formulario
            this.instructions = response.body.instructions;
            this.auth = response.body.auth;

            //Se disponibilizan para edición, todos los formularios tomados por el usuario en sesión.
            Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
            this.$http.post('/formulario/desmarcar_registro_form_deis').then(response => { // success callback
               //console.log(response);
            }, response => { // error callback
               //console.log(response);
            });

            //Fx para checkear mensajes informativos directos a los usuarios
            this.check_mensajes_informativos();

            //Fx para checkear si los usuarios aceptaron los terminos y condiciones
            this.check_acepta_terminos();

         }, response => { // error callback
            //console.log('Error fetch_formulario: '+response);
         });

         return;
      },

      guardar_formulario: function (tabName) {
         //Condicionales previas, preventivas al guardado, para evitar doble envío.
         if (this.formulario_guardandose == false) {
            this.formulario_guardandose = true;

            var formData = new FormData();

            //Validacion de seteo algunos campos
            for (let i in this.inputs) {
               if (this.inputs[i].seccion == tabName) {

                  /* //Se quita temporalmente el select2 para seleccionar establecimiento
                  if (this.inputs[i].name == 'lugar_control_prenatal' ||
                     this.inputs[i].name == 'lugar_atencion_parto' ||
                     this.inputs[i].name == 'lugar_control_embarazo' ||
                     this.inputs[i].name == 'establecimiento_control_sifilis' ||
                     this.inputs[i].name == 'establecimiento_control_vih' ||
                     this.inputs[i].name == 'atencion_parto'
                  ) {
                     this.fdc[this.inputs[i].name] = $(`#${this.inputs[i].name}`).val();
                  }
                  */

                  if (this.fdc[this.inputs[i].name] != null ) {
                     //Le pasa el valor en v-model

                     if (this.inputs[i].name == 'run_madre' || this.inputs[i].name == 'run_recien_nacido') {
                        this.fdc[this.inputs[i].name] = clean(this.fdc[this.inputs[i].name]);
                     }

                     formData.append(this.inputs[i].name, this.fdc[this.inputs[i].name] || null);
                     if (this.fdc[this.inputs[i].name] == 0) {
                        formData.append(this.inputs[i].name, 0);
                     } else {
                        formData.append(this.inputs[i].name, this.fdc[this.inputs[i].name] || null);
                     }

                  } else {
                     formData.append(this.inputs[i].name, this.fdc[this.inputs[i].name] || null);
                  }


               }


            }

            if (tabName == 'patologias_sifilis' &&
               !this.fdc['diagnostico_sifilis_embarazo'] &&
               this.fdc['resultado_treponemico'] != 'No Realizado' &&
               this.fdc['diagnostico_sifilis_embarazo'] == null) {
               swal({
                  title: "Advertencia",
                  text: `
                  El formulario no se podrá guardar hasta que el dato "Diagnostico de sífilis al embarazo" no esté ingresado, por favor ingrese la información y guarde el formulario.
               `,
                  type: "warning",
                  confirmButtonClass: "btn-danger",
                  closeOnConfirm: false
               });
               this.formulario_guardandose = false;
               return;
            }




            this.mini_loader = true;
            //this.spinner_finalizar = true;
            var permiteGuardar = false;
            //console.log(tabName);


            if (!this.fdc.id || this.fdc.id == null || this.fdc.id == undefined) {
               this.formulario_guardandose = false;
               return false;
            }

            Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
            formData.append('_id_formulario', this.fdc.id);

            this.$http.post('/formulario', formData).then(response => { // success callback
               //console.log(response.status);
               /*
               this.fdc = {};
               this.fdc_temp = {};
               this.fdc = response.body.data;
               this.fdc_temp = response.body.data;
               */

               //alert('Guardado');

               //Si guardar salio bien
               this.hayGuardadoActivo = true;
               this.idFormularioActivo = this.fdc.id;
               $('.circle-loader').toggleClass('load-complete');
               $('.checkmark').toggle();
               this.mini_loader = false;
               swal("Guardado", "El registro se guardó correctamente!", "success");
               this.formulario_guardandose = false;
            }, response => { // error callback
               //console.log(response);
               this.check_status_code(response.status);
               this.formulario_guardandose = false;
            });

         }else{
            alert(`
               Espere por favor, el formulario se encuentra ocupado guardando otra ficha.
               Vuelva a intentar en 10 segundos.
            `);
         }


         return;
      },

      guardar_formulario_completo_silencioso: function () {
         //Carga el loader
         this.mini_loader = true;
         //this.spinner_finalizar = true;
         //Crea objeto de parametros
         var formData = new FormData();
         //Variable de control de flujo
         var permiteGuardar = false;

         //Ciclo para validar los campos que requieren filtrado previo
         //Guardado especial por plugin select2
         for (let i in this.inputs) {
            /* // Se quito temporalmente el input select
            if (this.inputs[i].name == 'lugar_control_prenatal' ||
               this.inputs[i].name == 'lugar_atencion_parto' ||
               this.inputs[i].name == 'lugar_control_embarazo' ||
               this.inputs[i].name == 'establecimiento_control_sifilis' ||
               this.inputs[i].name == 'establecimiento_control_vih' ||
               this.inputs[i].name == 'atencion_parto'
            ) {
               this.fdc[this.inputs[i].name] = $(`#${this.inputs[i].name}`).val();
            }
            */

            if (this.fdc[this.inputs[i].name] != null ) {
               //Le pasa el valor en v-model

               if (this.inputs[i].name == 'run_madre' || this.inputs[i].name == 'run_recien_nacido') {
                  this.fdc[this.inputs[i].name] = clean(this.fdc[this.inputs[i].name]);
               }

               formData.append(this.inputs[i].name, this.fdc[this.inputs[i].name] || null);
               if (this.fdc[this.inputs[i].name] == 0) {
                  formData.append(this.inputs[i].name, 0);
               } else {
                  formData.append(this.inputs[i].name, this.fdc[this.inputs[i].name] || null);
               }

            } else {
               formData.append(this.inputs[i].name, this.fdc[this.inputs[i].name] || null);
            }
         }

         if (!this.fdc.id || this.fdc.id == null || this.fdc.id == undefined) {
            return false;
         }

         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
         formData.append('_id_formulario', this.fdc.id);

         this.$http.post('/formulario', formData).then(response => { // success callback
            //console.log(response.status);

            //Si guardar salio bien
            this.hayGuardadoActivo = true;
            this.idFormularioActivo = this.fdc.id;
            $('.circle-loader').toggleClass('load-complete');
            $('.checkmark').toggle();
            this.mini_loader = false;
            /*
             swal("Guardado", `
             El registro se ha guardado automáticamente con éxito.

             Recuerda que el registro se guarda cada 5 minutos.
             `, "success");
             */

         }, response => { // error callback
            //console.log(response);
            this.check_status_code(response.status);
         });



         return;
      },

      guardar_formulario_completo: function () {
         //Carga el loader
         this.mini_loader = true;
         //this.spinner_finalizar = true;
         //Crea objeto de parametros
         var formData = new FormData();
         //Variable de control de flujo
         var permiteGuardar = false;

         //Ciclo para validar los campos que requieren filtrado previo
         //Guardado especial por plugin select2
         for (let i in this.inputs) {
            /*
            if (this.inputs[i].name == 'lugar_control_prenatal' ||
               this.inputs[i].name == 'lugar_atencion_parto' ||
               this.inputs[i].name == 'lugar_control_embarazo' ||
               this.inputs[i].name == 'establecimiento_control_sifilis' ||
               this.inputs[i].name == 'establecimiento_control_vih' ||
               this.inputs[i].name == 'atencion_parto'
            ) {
               this.fdc[this.inputs[i].name] = $(`#${this.inputs[i].name}`).val();
            }
            */

            if (this.fdc[this.inputs[i].name] != null ) {
               //Le pasa el valor en v-model

               if (this.inputs[i].name == 'run_madre' || this.inputs[i].name == 'run_recien_nacido') {
                  this.fdc[this.inputs[i].name] = clean(this.fdc[this.inputs[i].name]);
               }

               formData.append(this.inputs[i].name, this.fdc[this.inputs[i].name] || null);
               if (this.fdc[this.inputs[i].name] == 0) {
                  formData.append(this.inputs[i].name, 0);
               } else {
                  formData.append(this.inputs[i].name, this.fdc[this.inputs[i].name] || null);
               }

            } else {
               formData.append(this.inputs[i].name, this.fdc[this.inputs[i].name] || null);
            }
         }

         if (!this.fdc.id || this.fdc.id == null || this.fdc.id == undefined) {
            return false;
         }

         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
         formData.append('_id_formulario', this.fdc.id);

         this.$http.post('/formulario', formData).then(response => { // success callback
            //console.log(response.status);

            //alert('Guardado');
            this.buscar_formulario();
            //Si guardar salio bien
            this.hayGuardadoActivo = true;
            this.idFormularioActivo = this.fdc.id;
            $('.circle-loader').toggleClass('load-complete');
            $('.checkmark').toggle();
            this.mini_loader = false;
            /*
            swal("Guardado", `
               El registro se ha guardado automáticamente con éxito.

               Recuerda que el registro se guarda cada 5 minutos.
            `, "success");
            */

         }, response => { // error callback
            //console.log(response);
            this.check_status_code(response.status);
         });



         return;
      },

      inputInArray: function (input, array) {

         return ($.inArray(input.type, array) == -1) ? false : true;
      },

      renderizar_solo_inputs: function () {
         this.$http.get('/formulario/inputs_formulario').then(response => { // success callback
            this.inputs = response.body.inputs;
            this.nav_tab_form_deis = response.body.nav_tab_form_deis;
            this.deis_form_table_options = response.body.deis_form_table_options;
            this.pais_origen = response.body.pais_origen;
            this.auth = response.body.auth;

            if (this.fdc_temp['form_deis_user'] && this.fdc_temp['form_deis_user'] != null){
               var form_deis_user = this.fdc_temp['form_deis_user'];
               var user = null;
               for (var i in form_deis_user) {
                  user = form_deis_user[i];
                  if (user.usuario_modifica_form_deis == this.auth.id) {
                     this.permiso_temporal_edicion = true;
                  }
               }
            }

            /* // Se quita temporalmente el plugin select2
            this.validar_validaciones_previas();


            //Generamos limpieza de los campos con el plugin
            $('#select2-establecimiento_control_sifilis-container').val(null).empty();
            $('#select2-establecimiento_control_vih-container').val(null).empty();
            $('#select2-lugar_control_prenatal-container').val(null).empty();
            $('#select2-lugar_control_embarazo-container').val(null).empty();
            $('#select2-lugar_atencion_parto-container').val(null).empty();

            //Validacion para mostrar los datos en los campos select
            for (let i in this.inputs) {

               switch (this.inputs[i].name) {


                  case 'lugar_control_prenatal':
                     $('#select2-lugar_control_prenatal-container').text(
                        this.deis_form_table_options[this.inputs[i].name][this.fdc[this.inputs[i].name]]
                     );
                     break;
                  case 'lugar_atencion_parto':
                     $('#select2-lugar_atencion_parto-container').text(
                        this.deis_form_table_options[this.inputs[i].name][this.fdc[this.inputs[i].name]]
                     );
                     break;
                  case 'lugar_control_embarazo':
                     $('#select2-lugar_control_embarazo-container').text(
                        this.deis_form_table_options[this.inputs[i].name][this.fdc[this.inputs[i].name]]
                     );
                     break;
                  case 'establecimiento_control_sifilis':
                     $('#select2-establecimiento_control_sifilis-container').text(
                        this.deis_form_table_options[this.inputs[i].name][this.fdc[this.inputs[i].name]]
                     );
                     break;
                  case 'establecimiento_control_vih':
                     $('#select2-establecimiento_control_vih-container').text(
                        this.deis_form_table_options[this.inputs[i].name][this.fdc[this.inputs[i].name]]
                     );
                     break;

               }

            }
            */
            this.validar_validaciones_previas();

            /*
             if (this.inputs[i].name == 'lugar_control_prenatal' ||
             this.inputs[i].name == 'lugar_atencion_parto' ||
             this.inputs[i].name == 'lugar_control_embarazo' ||
             this.inputs[i].name == 'establecimiento_control_sifilis' ||
             this.inputs[i].name == 'establecimiento_control_vih' ||
             this.inputs[i].name == 'atencion_parto'
             ) {
             if (this.fdc[this.inputs[i].name]) {
             $(`#${this.inputs[i].name}`).val(this.fdc[this.inputs[i].name]);
             }
             }
             */

         }, response => { // error callback
            //console.log('Error datos_formulario: '+response);
         });
      },

      renderizar_formulario: function () {
         this.$http.get('/formulario/datos_formulario').then(response => { // success callback
            this.inputs = response.body.inputs;

            /*
            //Generamos limpieza de los campos con el plugin
            $('#select2-establecimiento_control_sifilis-container').val(null).empty();
            $('#select2-establecimiento_control_vih-container').val(null).empty();
            $('#select2-lugar_control_prenatal-container').val(null).empty();
            $('#select2-lugar_control_embarazo-container').val(null).empty();
            $('#select2-lugar_atencion_parto-container').val(null).empty();
            */


            this.nav_tab_form_deis = response.body.nav_tab_form_deis;
            this.deis_form_table_options = response.body.deis_form_table_options;
            this.pais_origen = response.body.pais_origen;
            this.fdc = response.body.fdc;
            this.fdc_temp = response.body.fdc;

            this.formularioActivoObj = response.body.fdc;
            this.auth = response.body.auth;

            if (this.fdc_temp['form_deis_user'] && this.fdc_temp['form_deis_user'] != null){
               var form_deis_user = this.fdc_temp['form_deis_user'];
               var user = null;
               for (var i in form_deis_user) {
                  user = form_deis_user[i];
                  if (user.usuario_modifica_form_deis == this.auth.id) {
                     this.permiso_temporal_edicion = true;
                  }
               }
            }

            this.validar_validaciones_previas();


            /*
            //NO es necesario al crear un nuevo formulario, ya que solo se debe manejar el control sobre el edit
            if (this.fdc != null) {
               var formData = new FormData();
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               formData.append('n_correlativo_interno', this.fdc.n_correlativo_interno);

               this.$http.post('/formulario/marcar_registro_form_deis', formData).then(response => { // success callback
                  this.fdc = response.body.fdc;
                  //console.log(response);
               }, response => { // error callback
                  //console.log(response);
               });
            }
            */


         }, response => { // error callback
            //console.log('Error datos_formulario: '+response);
         });




      },

      validar_validaciones_previas: function () {
         for (let i in this.inputs) {
            this.verifica_validacion_change(this.inputs[i]);
         }
      },


   },
});
