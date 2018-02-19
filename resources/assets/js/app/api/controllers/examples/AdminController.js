import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
import { _ , range } from 'lodash';
import Vue2Filters from 'vue2-filters';
Vue.use(Vue2Filters);

import es from '../../../../../../../node_modules/vee-validate/dist/locale/es';
import VeeValidate, { Validator } from 'vee-validate';

//const { validate, clean, format } = require('rut.js')
import { validate, clean, format } from 'rut.js';

// Add locale helper.
Validator.addLocale(es);

// Install the Plugin and set the locale.
Vue.use(VeeValidate, {
   locale: 'es'
});

const AdminUsuarios = new Vue({
   el: '#AdminUsuarios',
   data(){
      return {
         'users':[],
         'users_full':[],
         'filterTerm':'',
         'userEditId':'',

         'pagination': {},

         'mostrar_input_password':false,
         'mini_loader_visible':false,
         'btn_procesar_clave':true,
         'btn_generar_clave':false,
         'btn_finalizar':false,

         'spinner_table_inputs':true,
         'mini_spinner_table_inputs':true,

         'mostrar_modal_nuevo_usuario': false,
         'user_table_fields': {
            id:false,
            name:true,
            //last_name:false,
            //full_name:false,
            position:false,
            establecimiento:false,
            rut:true,
            email:true,
            //password:false,
            //remember_token:false,
            clave_electronica:false,
            confirmado_llave_secreta:false,
            telefono:false,
            id_role:false,
            acepta_terminos:false,
            correo_resagado:false
         },
         'user_table_labels': {
            id:'Id',
            name:'Nombre',
            last_name:'Apellido',
            full_name:'Nombre Completo',
            position:'Cargo',
            establecimiento:'Establecimiento',
            rut:'Rut',
            email:'Email',
            password:'Clave',
            remember_token:'Token Ingreso',
            clave_electronica:'Llave Secreta',
            confirmado_llave_secreta:'Confirma llave',
            telefono:'Telefono',
            id_role:'Id Role',
            acepta_terminos:'Acepta Terminos',
            correo_resagado:'Correo Enviado'
         },

         'excel_json_fields': {
            'id':'String',
            'name':'String',
            'last_name':'String',
            'full_name':'String',
            'position':'String',
            'establecimiento':'String',
            'rut':'String',
            'email':'String',
            'password':'String',
            'created_by':'String',
            'updated_by':'String',
            'remember_token':'String',
            'created_at':'String',
            'updated_at':'String',
            'clave_electronica':'String',
            'confirmado_llave_secreta':'String',
            'telefono':'String',
            'id_role':'String',
            'acepta_terminos':'String',
            'id_session':'String',
            'correo_resagado':'String'
         },
         'excel_json_data': [],
         'excel_data_count': '',
         'append_to_json_excel': {},

         'gridOrder':'asc',

      }
   },
   computed: {},
   watch: {
      users_full: function (users_full) {
         var self = this;
         this.excel_json_data = [];
         return users_full.map(function (user, index) {
            return self.excel_json_data.push({
               'id':user.id,
               'name':user.name,
               'last_name':user.last_name,
               'full_name':user.full_name,
               'position':user.position,
               'establecimiento':user.establecimiento,
               'rut':user.rut,
               'email':user.email,
               'password':user.password,
               'created_by':user.created_by,
               'updated_by':user.updated_by,
               'remember_token':user.remember_token,
               'created_at':user.created_at,
               'updated_at':user.updated_at,
               'clave_electronica':user.clave_electronica,
               'confirmado_llave_secreta':user.confirmado_llave_secreta,
               'telefono':user.telefono,
               'id_role':user.id_role,
               'acepta_terminos':user.acepta_terminos,
               'id_session':user.id_session,
               'correo_resagado':user.correo_resagado
            });
         });
      },
   },
   components: {
      'paginators': {
         props: ['pagination'],
         template: `
            <nav aria-label="Page navigation">
               <ul class="pagination">
                  <li :class="{ disabled: pagination.current_page == 1}">
                     <a href="#!" aria-label="Previous" @click="nextPrev($event, pagination.current_page-1)">
                     <span aria-hidden="true">&laquo;</span>
                     </a>
                  </li>

                  <li v-for="page in pages" track-by="$index" :class="{ active: pagination.current_page == page }">
                     <span v-if="page == '...'">{{page}}</span>
                     <a href="#!" v-if="page != '...'" @click="navigate($event, page)">{{page}}</a>
                  </li>

                  <li :class="{ disabled: pagination.current_page == pagination.last_page}">
                     <a href="#!" aria-label="Next" @click="nextPrev($event, pagination.current_page+1)">
                     <span aria-hidden="true">&raquo;</span>
                     </a>
                  </li>
               </ul>
            </nav>
         `,
         name: 'paginators',
         data () {
            return {
               pages: []
            }
         },
         ready () {
         },
         created () {
            //console.log(this.pagination); //está trayendo pagination
            let p = this.pagination;
            this.pages = this.generatePagesArray(p.current_page, p.total, p.per_page, 7);
         },

         methods: {
            navigate (ev, page) {
               ev.preventDefault();
               //console.log(page);
               this.$emit('navigate', page);
            },
            nextPrev (ev, page) {
               if (page == 0 || page == this.pagination.last_page + 1) {
                  return;
               }
               this.navigate(ev, page);
            },
            generatePagesArray (currentPage, collectionLength, rowsPerPage, paginationRange){
               var pages = [];
               var totalPages = Math.ceil(collectionLength / rowsPerPage);
               var halfWay = Math.ceil(paginationRange / 2);
               var position;

               if (currentPage <= halfWay) {
                  position = 'start';
               } else if (totalPages - halfWay < currentPage) {
                  position = 'end';
               } else {
                  position = 'middle';
               }

               var ellipsesNeeded = paginationRange < totalPages;
               var i = 1;
               while (i <= totalPages && i <= paginationRange) {
                  var pageNumber = this.calculatePageNumber(i, currentPage, paginationRange, totalPages);
                  var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
                  var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
                  if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                     pages.push('...');
                  } else {
                     pages.push(pageNumber);
                  }
                  i++;
               }
               return pages;
            },
            calculatePageNumber (i, currentPage, paginationRange, totalPages){
               var halfWay = Math.ceil(paginationRange / 2);
               if (i === paginationRange) {
                  return totalPages;
               } else if (i === 1) {
                  return i;
               } else if (paginationRange < totalPages) {
                  if (totalPages - halfWay < currentPage) {
                     return totalPages - paginationRange + i;
                  } else if (halfWay < currentPage) {
                     return currentPage - halfWay + i;
                  } else {
                     return i;
                  }
               } else {
                  return i;
               }
            }
         },

         watch: {
            pagination () {
               //console.log('Estoy llegando al watch');
               let p = this.pagination;
               this.pages = this.generatePagesArray(p.current_page, p.total, p.per_page, 7);
            }
         },
      },
      'mini-spinner': {
         props: [''],
         'name': 'mini-spinner',
         'template': `
	         <div class="loader-mini text-center small">Cargando items, espere por favor...</div>
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
      'loader': {
         props: [''],
         'name': 'loader',
         'template':`<div class="loader">Loading...</div>`,
         data () {
            return {
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
                   :max-length="max_length!=''?max_length:25"
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
      'modal_procesar_json':{
         props: ['json'],
         template:`
            <!-- <script type="text/x-template"> -->
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

                                 <div class="table-responsive" style="overflow-y: scroll;max-height: 400px;">
                                    <table class="table table-striped small">
                                       <thead>
                                       <tr>
                                          <th>Acción</th>
                                          <th>type</th>
                                          <th>id</th>
                                          <th>name</th>
                                          <th>value</th>
                                          <th>max_length</th>
                                          <th>placeholder</th>
                                          <th>required</th>
                                          <th>class</th>
                                          <th>style</th>
                                          <th>bloque</th>
                                          <th>seccion</th>
                                          <th>class_custom</th>
                                          <th>label</th>
                                          <th>tag</th>
                                          <th>subtag</th>
                                          <th>empty_column</th>
                                          <th>order</th>
                                       </tr>
                                       </thead>
                                       <tbody>

                                       <tr v-for="input in json">
                                          <td>
                                             <button v-if="editBy!=input.id" class="btn btn-sm btn-primary" @click.prevent="edit(input.id)">
                                                <i class="fa fa-pencil"></i>
                                             </button>
                                             <button v-else class="btn btn-sm btn-success" @click.prevent="save(input)">
                                                <i class="fa fa-check"></i>
                                             </button>
                                          </td>
                                          <td>
                                             {{input.type}}
                                             <span></span>
                                             <span></span>
                                          </td>
                                          <td>
                                             {{input.id}}
                                          </td>
                                          <td>
                                             {{input.name}}
                                          </td>
                                          <td>
                                             {{input.value}}
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.max_length}}</span>
                                             <input v-else type="number" class="form-control" v-model="input.max_length">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.placeholder}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.placeholder">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.required}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.required">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.class}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.class">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.style}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.style">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.bloque}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.bloque">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.seccion}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.seccion">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.class_custom}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.class_custom">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.label}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.label">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.tag}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.tag">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.subtag}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.subtag">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.empty_column}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.empty_column">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.order}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.order">
                                          </td>
                                       </tr>



                                       </tbody>
                                    </table>
                                 </div>

                                 <!--
                                  <dl class="dl-vertical">
                                    <div class="row">
                                       <div style="overflow-y: scroll;max-height: 400px;">

                                          <div class="col-md-6">
                                             <dt></dt>
                                             <dd class="well well-sm"></dd>
                                          </div>
                                          <div class="col-md-6">
                                             <dt></dt>
                                             <dd class="well well-sm"></dd>
                                          </div>

                                       </div>
                                    </div>
                                 </dl>
                                 -->
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
            <!-- </script> -->
         `,
         name: 'modal_procesar_json',
         data () {
            return {
               'editBy':'',
            }
         },
         ready () {
         },
         created () {
         },
         methods: {
            edit: function (input_id_directive) {
               this.editBy = input_id_directive;
            },
            save: function (input) {
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               this.$http.put('/input/'+input.id_input, input).then(response => { // success callback
                  //console.log(response);
                  this.editBy = '';
                  return response.body.input;
               }, response => { // error callback
                  console.log(response);
               });
            },
         },
         watch: {
         },
      },
      'modal-nuevousuario':{
         props: [''],
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

                                 <div class="col-md-6">
                                    <dt>Nombre (*)</dt>
                                    <dd>
                                       <p class="control has-icon has-icon-right">
                                          <input name="name" type="text" id="name" v-model="user.name"
                                                v-validate="'required'" data-vv-delay="500"
                                                class="form-control" />

                                          <transition name="bounce">
                                          <i v-show="errors.has('name')" class="fa fa-warning"></i>
                                          </transition>
                                          <transition name="bounce">
                                          <span v-show="errors.has('name')" class="text-danger">
                                             Este campo es obligatorio
                                          </span>
                                          </transition>
                                       </p>
                                    </dd>
                                 </div>

                                 <div class="col-md-6">
                                    <dt>Email (*)</dt>
                                    <dd>
                                       <p class="control has-icon has-icon-right">
                                          <input name="email"
                                                v-validate="'required|email'" data-vv-delay="500"
                                                :class="{'input': true, 'text-danger': errors.has('email'),
                                                'form-control':true}"
                                                type="text" placeholder="Email"
                                                v-model="user.email">
                                          <transition name="bounce">
                                          <i v-show="errors.has('email')" class="fa fa-warning"></i>
                                          </transition>
                                          <transition name="bounce">
                                          <span v-show="errors.has('email')" class="text-danger">
                                             {{ errors.first('email') | replaceEmail}}
                                          </span>
                                          </transition>
                                       </p>
                                    </dd>
                                 </div>

                                 <div class="col-md-6">
                                    <dt>Rut (*)</dt>
                                    <dd>
                                       <p class="control has-icon has-icon-right">
                                          <input name="rut" type="text" id="rut" v-model="user.rut"
                                                v-validate="'required'" data-vv-delay="500"
                                                @keyup.prevent="formatear_rut"
                                                @blur.prevent="validar_rut"
                                                class="form-control" />

                                          <transition name="bounce">
                                          <i v-show="errors.has('rut')" class="fa fa-warning"></i>
                                          </transition>
                                          <transition name="bounce">
                                          <span v-show="errors.has('rut')" class="text-danger">
                                             Este campo es obligatorio
                                          </span>
                                          </transition>
                                       </p>
                                    </dd>
                                 </div>

                                 <div class="col-md-6">
                                    <dt>Telefono (*)</dt>
                                    <dd>
                                       <p class="control has-icon has-icon-right">
                                          <input name="telefono" type="text" telefono="rut" v-model="user.telefono"
                                             v-validate="'required'" data-vv-delay="500"
                                             class="form-control" />

                                          <transition name="bounce">
                                          <i v-show="errors.has('telefono')" class="fa fa-warning"></i>
                                          </transition>
                                          <transition name="bounce">
                                          <span v-show="errors.has('telefono')" class="text-danger">
                                          Este campo es obligatorio
                                          </span>
                                          </transition>
                                       </p>
                                    </dd>
                                 </div>

                                 <div class="col-md-6">
                                    <dt>Password</dt>
                                    <dd>
                                       <input name="password" type="password" telefono="password" v-model="user.password"
                                          class="form-control" />
                                    </dd>
                                 </div>

                                 <div class="col-md-6">
                                    <dt>Cargo</dt>
                                    <dd>
                                       <input name="position" type="text" id="position" v-model="user.position"
                                             class="form-control" />
                                    </dd>
                                 </div>

                                 <div class="col-md-6">
                                    <dt>Establecimiento</dt>
                                    <dd>
                                       <input name="establecimiento" type="text" id="establecimiento" v-model="user.establecimiento"
                                             class="form-control" />
                                    </dd>
                                 </div>

                                 <div class="col-md-6">
                                    <dt>Llave Electronica</dt>
                                    <dd>
                                       <input name="clave_electronica" type="text" id="position" v-model="user.clave_electronica"
                                             class="form-control" />
                                    </dd>
                                 </div>
                                 <div class="col-md-6">
                                    <dt>Perfil</dt>
                                    <dd>
                                       <select name="id_role" class="form-control" v-model="user.id_role">
                                          <option value="3">Mantenedor</option>
                                          <option value="4">Digitador</option>
                                          <option value="5">Observador</option>
                                       </select>
                                    </dd>
                                 </div>
                                 <div class="col-md-12">
                                    <button @click.prevent="saveNewUser(user)" class="btn btn-sm btn-success pull-right">Guardar</button>
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
         name: 'modal-nuevousuario',
         data () {
            return {
               'nuevo_usuario_en_creacion':false,
               'user':{
                  'name':'',
                  'email':'',
                  'rut':'',
                  'position':'',
                  'establecimiento':'',
                  'telefono':'',
                  'clave_electronica':'',
                  'confirmado_llave_secreta':'',
                  'password':'',
                  'id_role':4
               }
            }
         },
         ready () {
         },
         created () {


         },
         filters: {
            replaceFono(fono) {
               if (fono != null) {fono = fono.replace('fono_responsable', 'telefono');}
               return fono;
            },
            replaceEmail(email) {
               if (email != null) {email = email.replace('email', 'email');}
               return email;
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
            formatear_rut: function () {
               var rut = this.user.rut;
               this.user.rut = format(rut);
            },
            validar_rut: function () {
               var rut = this.user.rut;
               if (validate(rut) == false) {
                  this.user.rut = null;
                  swal({
                     title: "Atencion",
                     text: `Estimado usuario, el rut es incorrecto`,
                     type: "error",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
               }else {
                  this.buscar_por_run(rut);
               }
            },

            buscar_por_run: function (rut) {
               if (!rut || validate(rut) == false){
                  swal({
                     title: "Advertencia",
                     text: "Debe ingresar un rut valido.",
                     type: "error",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  return;
               }

               var formData = new FormData();

               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

               var rut_limpio = clean(rut);
               rut_limpio = rut_limpio.substr(0, rut_limpio.length-1);
               //alert (run_limpio) ;
               //return;

               //formData.append('run_madre', this.run_madre);
               formData.append('rut', rut_limpio);

               this.$http.post('/admin/buscar_rut', formData).then(response => { // success callback
                  //console.log(response);
                  var rd = response.body.rd;
                  if (rd == 'Existe') {
                     swal({
                        title: "Atención",
                        text: "El rut ingresado ya se encuentra registrado.",
                        type: "warning",
                        confirmButtonClass: "btn-danger",
                        closeOnConfirm: false
                     });
                     this.user.rut = null;
                     return true;
                  }
                  return false;
               }, response => { // error callback
                  //console.log(response);
               });
            },

            cleanNewUser: function () {
               this.user = {
                  'name':'',
                  'email':'',
                  'rut':'',
                  'position':'',
                  'establecimiento':'',
                  'telefono':'',
                  'clave_electronica':'',
                  'confirmado_llave_secreta':'',
                  'password':'',
                  'id_role':4
               };
            },

            saveNewUser: function (user) {
               this.$validator.validateAll().then(result => {});
               var n = user.name;
               var e = user.email;
               var t = user.telefono;
               var r = user.rut;

               if (n&&n!=null&&n!=''&&e&&e!=null&&e!=''&&t&&t!=null&&t!=''&&r&&r!=null&&r!='') {
                  if (this.nuevo_usuario_en_creacion == false) {
                     this.nuevo_usuario_en_creacion = true;

                     var formData = new FormData();
                     formData.append('name', user.name);//formData.append('_token', $('#_token').val());
                     formData.append('email', user.email);
                     formData.append('rut', clean(user.rut));
                     formData.append('position', user.position);
                     formData.append('establecimiento', user.establecimiento || 'No definido');
                     formData.append('telefono', user.telefono);
                     formData.append('clave_electronica', user.clave_electronica);
                     formData.append('confirmado_llave_secreta', 'enviar');
                     formData.append('password', user.password);
                     formData.append('id_role', user.id_role);

                     Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

                     this.$http.post('/admin/guardar_nuevo_usuario', formData).then(response => { // success callback
                        this.nuevo_usuario_en_creacion = false;
                        console.log(response);
                        //var user;
                        if (response.status == 200) {
                           //user = response.body.user;
                           this.cleanNewUser();
                        }
                        swal({
                           title: "Guardado",
                           text: `El usuario fué guardado correctamente`,
                           type: "success",
                           confirmButtonClass: "btn-success",
                           closeOnConfirm: false
                        });
                        this.$parent.users.push(user);
                        this.$parent.fetchAdminUsuarios();
                        this.$parent.mostrar_modal_nuevo_usuario = false;
                        return user;

                     }, response => { // error callback
                        console.log('Error saveUser: ' + response);
                        this.nuevo_usuario_en_creacion = false;
                        if (response.status == 500) {
                           swal({
                              title: "Atencion",
                              text: "Ha ocurrido un error al guardar, por favor intente nuevamente.",
                              type: "warning",
                              confirmButtonClass: "btn-danger",
                              closeOnConfirm: true
                           }, function (isConfirm) {
                              if (isConfirm) {
                                 window.location.href = '/admin/mant_usuarios';
                              }
                           });

                        }
                     });
                  }else{
                     swal({
                        title: "Atencion",
                        text: `Estimado usuario, le informamos que el nuevo usuario se está procesando`,
                        type: "error",
                        confirmButtonClass: "btn-danger",
                        closeOnConfirm: false
                     });
                  }

               }else{
                  swal({
                     title: "Atencion",
                     text: `Estimado usuario, debe completar todos los campos requeridos`,
                     type: "error",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
               }

            },

         },
         watch: {
         },
      },
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
      this.fetchAdminUsuarios();

      /*
       $(document).ready( function () {
       $('#toggle').click(function() {
       $('.circle-loader').toggleClass('load-complete');
       $('.checkmark').toggle();
       });
       });
       */
   },
   ready: {},
   filters: {
   },
   methods: {

      changeVisibility: function (field) {
         return this.user_table_fields[field] = !this.user_table_fields[field];
      },

      changeListOrder: function (column) {
         this.gridOrder == 'asc' ? this.gridOrder = 'desc' : this.gridOrder = 'asc';
         this.orderLists(column);
      },

      orderLists: function (column) {
         this.users = _.orderBy(this.users, column, this.gridOrder);
         //console.log(column);
         //this.lists = this.shuffle(_.orderBy(this.lists, 'name', this.listOrder));
         //console.log(this.lists.length);
      },

      sendEmailPasswordReset: function (user) {
         var formData = new FormData();
         formData.append('email', user.email);
         //formData.append('_token', $('#_token').val());
         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

         this.$http.post('/password/email', formData).then(response => { // success callback
            //console.log(response);
            if (response.status == 200) {
               user.correo_resagado = 'enviado';
               var formData = new FormData();
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               //formData.append('_token', $('#_token').val());
               formData.append('id', user.id);
               this.$http.post('/admin/correo_resagado', formData).then(response => { // success callback
                  if (response.status == 200) {
                     return;
                  }
               }, response => { // error callback
                  console.log('Error saveUser: ' + response);
                  if (response.status == 500) {
                     swal({
                        title: "Atencion",
                        text: "Ha ocurrido un error, favor recargar la página.",
                        type: "warning",
                        confirmButtonClass: "btn-danger",
                        closeOnConfirm: true
                     }, function (isConfirm) {
                        if (isConfirm) {
                           window.location.href = '/login';
                        }
                     });
                  }
               });
               //swal("Enviado", `Se ha enviado el correo de creacion de claves al siguiente usuario: ${email}`, "success");
            }


         }, response => { // error callback
            console.log('Error saveUser: ' + response);
            if (response.status == 500) {
               swal({
                  title: "Atencion",
                  text: "Ha ocurrido un error, favor recargar la página.",
                  type: "warning",
                  confirmButtonClass: "btn-danger",
                  closeOnConfirm: true
               }, function (isConfirm) {
                  if (isConfirm) {
                     window.location.href = '/login';
                  }
               });
            }
         });
      },

      getConTelefono: function (users) {
         var c = 0;
         for (let u in users) {
            if (users[u].telefono != null && users[u].telefono != '') {
               c++;
            }
         }
         return c;
      },
      getConTelefonoActivados: function (users) {
         var c = 0;
         for (let u in users) {
            if (users[u].telefono != null &&
               users[u].telefono != '' &&
               users[u].password != 'ASDASDASDASDASDasda') {
               c++;
            }
         }
         return c;
      },
      getConTelefonoSinActivar: function (users) {
         var c = 0;
         for (let u in users) {
            if (users[u].telefono != null &&
               users[u].telefono != '' &&
               users[u].password == 'ASDASDASDASDASDasda') {
               c++;
            }
         }
         return c;
      },
      getSinTelefono: function (users) {
         var c = 0;
         for (let u in users) {
            if (users[u].telefono == null || users[u].telefono == '') {
               c++;
            }
         }
         return c;
      },
      getSinTelefonoActivados: function (users) {
         var c = 0;
         for (let u in users) {
            if (users[u].telefono == null ||
               users[u].telefono == '' &&
               users[u].password != 'ASDASDASDASDASDasda') {
               c++;
            }
         }
         return c;
      },
      getSinTelefonoSinActivar: function (users) {
         var c = 0;
         for (let u in users) {
            if (users[u].telefono == null ||
               users[u].telefono == '' &&
               users[u].password == 'ASDASDASDASDASDasda') {
               c++;
            }
         }
         return c;
      },
      getActivados: function (users) {
         var c = 0;
         for (let u in users) {
            if (users[u].password != 'ASDASDASDASDASDasda') {
               c++;
            }
         }
         return c;
      },
      getSinActivar: function (users) {
         var c = 0;
         for (let u in users) {
            if (users[u].password == 'ASDASDASDASDASDasda') {
               c++;
            }
         }
         return c;
      },

      getExcelConTelefono: function (excel_json_data) {
         var users = [];
         for (let e in excel_json_data) {
            if (excel_json_data[e].telefono != null && excel_json_data[e].telefono != '') {
               users.push(excel_json_data[e]);
            }
         }
         return users;
      },
      getExcelConTelefonoActivados: function (excel_json_data) {
         var users = [];
         for (let e in excel_json_data) {
            if (excel_json_data[e].telefono != null &&
               excel_json_data[e].telefono != '' &&
               excel_json_data[e].password != 'ASDASDASDASDASDasda') {
               users.push(excel_json_data[e]);
            }
         }
         return users;
      },
      getExcelConTelefonoSinActivar: function (excel_json_data) {
         var users = [];
         for (let e in excel_json_data) {
            if (excel_json_data[e].telefono != null &&
               excel_json_data[e].telefono != '' &&
               excel_json_data[e].password == 'ASDASDASDASDASDasda') {
               users.push(excel_json_data[e]);
            }
         }
         return users;
      },
      getExcelSinTelefono: function (excel_json_data) {
         var users = [];
         for (let e in excel_json_data) {
            if (excel_json_data[e].telefono == null || excel_json_data[e].telefono == '') {
               users.push(excel_json_data[e]);
            }
         }
         return users;
      },
      getExcelSinTelefonoActivados: function (excel_json_data) {
         var users = [];
         for (let e in excel_json_data) {
            if (excel_json_data[e].telefono == null ||
               excel_json_data[e].telefono == '' &&
               excel_json_data[e].password != 'ASDASDASDASDASDasda') {
               users.push(excel_json_data[e]);
            }
         }
         return users;
      },
      getExcelSinTelefonoSinActivar: function (excel_json_data) {
         var users = [];
         for (let e in excel_json_data) {
            if (excel_json_data[e].telefono == null ||
               excel_json_data[e].telefono == ''&&
               excel_json_data[e].password == 'ASDASDASDASDASDasda') {
               users.push(excel_json_data[e]);
            }
         }
         return users;
      },
      getExcelActivados: function (excel_json_data) {
         var users = [];
         for (let e in excel_json_data) {
            if (excel_json_data[e].password != 'ASDASDASDASDASDasda') {
               users.push(excel_json_data[e]);
            }
         }
         return users;
      },
      getExcelSinActivar: function (excel_json_data) {
         var users = [];
         for (let e in excel_json_data) {
            if (excel_json_data[e].password == 'ASDASDASDASDASDasda') {
               users.push(excel_json_data[e]);
            }
         }
         return users;
      },

      editUser: function (id) {
         this.userEditId = id;
      },
      saveUser: function (user) {
         this.userEditId=null;
         var formData = new FormData();
         formData.append('id', user.id);//formData.append('_token', $('#_token').val());
         formData.append('name', user.name);//formData.append('_token', $('#_token').val());
         formData.append('email', user.email);
         formData.append('position', user.position);
         formData.append('establecimiento', user.establecimiento);
         formData.append('rut', user.rut);
         formData.append('telefono', user.telefono);
         formData.append('clave_electronica', user.clave_electronica);
         formData.append('id_role', user.id_role);
         formData.append('confirmado_llave_secreta', user.confirmado_llave_secreta);
         formData.append('acepta_terminos', user.acepta_terminos);


         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

         this.$http.post('/admin/guardar_usuario', formData).then(response => { // success callback
            console.log(response);
            if (response.status == 500) {
               swal({
                  title: "Atencion",
                  text: "Su sesión ha expirado, por favor inicie sesion nuevamente.",
                  type: "warning",
                  confirmButtonClass: "btn-danger",
                  closeOnConfirm: false
               });
               window.location.href = '/login';
            }

         }, response => { // error callback
            console.log('Error saveUser: ' + response);
            if (response.status == 500) {
               swal({
                  title: "Atencion",
                  text: "Su sesión ha expirado, por favor inicie sesion nuevamente.",
                  type: "warning",
                  confirmButtonClass: "btn-danger",
                  closeOnConfirm: false
               });
               window.location.href = '/login';
            }
         });

      },

      // public method for navigate on paginator
      navigate (page) {
         //this.spinner_table_inputs = true;
         //this.mini_spinner_table_inputs = true;
         this.$http.get('/admin/mant_usuarios_data?page=' + page + '&per_page=' + this.pagination.per_page).then(response => {
            // get body json data
            if (response.status == 200) {
               this.users = response.data.users.data;
               this.pagination = response.data.users;
               //this.spinner_table_inputs = false;
               //this.mini_spinner_table_inputs = false;
            }
         }, response => {
            // error callback
         });
      },
      navigateCustom () {
         this.spinner_table_inputs = true;
         //this.mini_spinner_table_inputs = true;
         this.$http.get('/admin/mant_usuarios_data?page=' + 1 + '&per_page=' + this.pagination.per_page).then(response => {
            // get body json data
            if (response.status == 200) {
               this.users = response.data.users.data;
               this.pagination = response.data.users;
               this.spinner_table_inputs = false;
               //this.mini_spinner_table_inputs = false;
            }
         }, response => {
            // error callback
         });
      },

      //camelCase() => for specific functions
      fetchAdminUsuarios: function () {
         this.$http.get('/admin/mant_usuarios_data').then(response => { // success callback
            console.log(response);
            this.users = {};
            if (response.status == 200) {
               this.users = response.data.users.data;
               this.users_full = response.body.users_full;
               this.pagination = response.data.users;

               this.spinner_table_inputs = false;
               this.mini_spinner_table_inputs = false;
            }

         }, response => { // error callback
            console.log('Error fetchAdminUsuarios: ' + response);
            if (response.status == 500) {
               swal({
                  title: "Atencion",
                  text: "Su sesión ha expirado, por favor inicie sesion nuevamente.",
                  type: "warning",
                  confirmButtonClass: "btn-danger",
                  closeOnConfirm: false
               });
               window.location.href = '/login';
            }
         });

         return;
      },
   }
});