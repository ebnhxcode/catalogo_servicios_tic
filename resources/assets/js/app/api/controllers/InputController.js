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

const InputController = new Vue({
   el: '#InputController ',
   data(){
      return {
         'boton_abrir_modal':false,
         'mini_loader':false,
         'modal_procesar_json':false,
         'modal_procesar_json_attr':false,
         'json':'',
         'json_modal':'',
         'json_modal_attr':'',
         'json_error':'',
         'json_attr':'',
         'json_attr_modal':'',
         'json_attr_error':'',
         'table_name':'',
         'table_name_error':'',
         'table_name_attr':'',
         'table_name_attr_error':'',
         'tables':[],
         'err':[],
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
      this.fetchInput();
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
      //camelCase() => for specific functions
      fetchInput: function () {
         this.$http.get('/input/create').then(response => { // success callback
            this.tables = response.body.tables;
         }, response => { // error callback
            console.log('Error fetch_input: '+response);
         });
      },

      procesar_json: function () {
         this.mini_loader = true;
         var j = this.json;
         var tn = this.table_name.table_name;
         var formData = new FormData();
         formData.append('json', j);
         formData.append('table_name', tn);//formData.append('_token', $('#_token').val());
         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
         $('.errors').text('');
         this.$http.post('/input', formData).then(response => { // success callback
            //this.json = response.body.created_inputs;
            this.json_modal = response.body.created_inputs;
            this.modal_procesar_json = true;
            this.boton_abrir_modal = true;
            $('.circle-loader').toggleClass('load-complete');
            $('.checkmark').toggle();
            this.mini_loader = false;
         }, response => { // error callback
            this.boton_abrir_modal = false;
            this.err = response.body;
            for (let i in this.err) {
               var error = this.err[i][0];
               $(`#${i}_error`).text(error);
            }
         });
      },
      procesar_json_attr: function () {
         this.mini_loader = true;
         var ja = this.json_attr;
         var tna = this.table_name_attr.table_name;
         var formData = new FormData();
         formData.append('json_attr', ja);
         formData.append('table_name_attr', tna);
         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
         $('.errors').text('');
         this.$http.post('/input/add/label', formData).then(response => { // success callback
            this.json_modal_attr = response.body.created_labels;
            this.modal_procesar_json_attr = true;
            this.boton_abrir_modal = true;
            $('.circle-loader').toggleClass('load-complete');
            $('.checkmark').toggle();
            this.mini_loader = false;
         }, response => { // error callback
            this.boton_abrir_modal = false;
            this.err = response.body;
            for (let i in this.err) {
               var error = this.err[i][0];
               $(`#${i}_error_attr`).text(error);
            }
         });

      },

      //with_dash() => for explained specific functions
   },
});

const ListaController = new Vue({
   el: '#ListaController ',
   data(){
      return {
         'editBy':'',
         'json':'',
         'filterTerm':'',
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
   },
   created(){
      this.fetchLista();
   },
   ready: {},
   filters: {
   },
   methods: {
      //camelCase() => for specific functions
      fetchLista: function () {
         this.$http.get('/input').then(response => { // success callback
            this.tables = response.body.tables;
            this.json = response.body.json;
         }, response => { // error callback
            console.log('Error fetch_lista: '+response);
         });

         var self = this;
         setTimeout(function(){
            self.spinner_iniciar = false;
         }, 1500);
         return;
      },

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

      //with_dash() => for explained specific functions
   },
});