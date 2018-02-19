import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
import { _ , range } from 'lodash';
import Vue2Filters from 'vue2-filters';
Vue.use(Vue2Filters);

const Incidente = new Vue({
   el: '#Incidente',
   data(){
      return {
         someData: '',
         list: '',
         listLength: '',
         descripcion: '',
         lists: "{}",
         region: "{}",
         servicio_salud: "{}",
         estado_incidente: "{}",
         condiciones: [],
         excel_json_fields: {
            'id_incidente': 'String',
            'titulo': 'String',
            'url_afectada': 'String',
            'estado_incidente': 'String',
            'servicio.descripcion': 'String',
            'institucion.descripcion': 'String',
            'tipo_incidente.descripcion': 'String',
            'impacto.descripcion': 'String',
            'clasificacion.descripcion': 'String',
            'condicion_descripcion': 'String',
            'created_at': 'String',
            'fecha_incidente': 'String',
            'origen.descripcion': 'String',
            'informacion_sencible': 'String',
         },
         excel_json_data: [],
         excel_data_count: '',
         append_to_json_excel: {},
         filterTerm: '',
         incidente_estado_result: '',
         incidente_estado: '',
         listOrder: 'asc',
         pagination: {},
      }
   },
   computed: {},
   watch: {
      lists: function (lists) {
         var self = this;
         this.excel_json_data = [];
         console.log(this.condiciones[0]);
         return lists.map(function (list, index) {
            //console.log(index);
            //console.log(json)
            return self.excel_json_data.push({
               'id_incidente': list.id_incidente.toString(),
               'titulo': list.titulo,
               'url_afectada': list.url_afectada,
               'estado_incidente': list.incidente_estados[list.incidente_estados.length - 1] ? list.incidente_estados[list.incidente_estados.length - 1].estado_incidente.descripcion : 'Sin estado',
               'servicio.descripcion': list.servicio.descripcion,
               'institucion.descripcion': list.institucion.descripcion,
               'tipo_incidente.descripcion': list.tipo_incidente.descripcion,
               'impacto.descripcion': list.impacto.descripcion,
               'clasificacion.descripcion': list.clasificacion.descripcion,
               'condicion_descripcion': 'AL DIA',
               'created_at': list.created_at,
               'fecha_incidente': list.fecha_incidente,
               'origen.descripcion': list.origen.descripcion,
               'informacion_sencible': list.informacion_sencible,
            });
         });

      },
   },
   components: {
      //declare component from with a require
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
               console.log(page);
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
      'incidente-list': {
         props: [''],
         template: `
            <transition name="fade">

            </transition>
         `,
         name: 'incidente-list',
         data () {
            return {
               editable: false,
            }
         },
         ready () {
         },
         created(){
         },
         filters: {},
         methods: {},
      },
      /*'': {
       props: [''],
       template: `
       <transition name="fade">

       </transition>
       `,
       name: 'incidente-list',
       data () {
       return {
       editable: false,
       }
       },
       ready () {
       },
       created(){
       },
       filters: {},
       methods: {
       },
       },*/
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

      //'incidente-list':IncidenteList,
   },
   created(){
      //on created fetch data
      this.fetchData();
   },
   ready: function () {
   },
   filters: {},
   methods: {
      calculoSLA (list, sla_establecimiento, incidente){
         //console.log(sla_establecimiento[0].sla[0]);
         //console.log(sla_establecimiento);
         var sla = sla_establecimiento[0].sla[0];
         this.$http.get(
            '/calculoSLA?hora_inicio=' + sla.hora_inicio +
            '&hora_termino=' + sla.hora_termino +
            '&lun=' + sla.lun +
            '&mar=' + sla.mar +
            '&mie=' + sla.mie +
            '&jue=' + sla.jue +
            '&vie=' + sla.vie +
            '&sab=' + sla.sab +
            '&dom=' + sla.dom +
            '&fer=' + sla.fer +
            '&t_accion_correctiva=' + sla.sla_detalle[0].t_accion_correctiva +
            '&fecha_incidente=' + list.fecha_incidente +
            '&id_incidente=' + list.id_incidente +
            '&id_estado_incidente=' + list.id_estado_incidente +
            '&fecha_incidente=' + list.fecha_incidente
         ).then(response => {
            // get body json data
            this.condiciones.push({'condicion_descripcion': response.body});
            return this.incidente_estado_result = response.body;

         }, response => {
            // error callback
         }).catch(response => {
            // Error Handling
         });
      },

      // public method for navigate on paginator
      navigate (page) {
         this.$http.get('/gid?page=' + page + '&per_page=' + this.pagination.per_page).then(response => {
            // get body json data
            this.lists = response.data.list_incidente.data;
            this.pagination = response.data.list_incidente;
         }, response => {
            // error callback
         });
      },
      navigateCustom () {
         this.$http.get('/gid?page=' + 1 + '&per_page=' + this.pagination.per_page).then(response => {
            // get body json data
            this.lists = response.data.list_incidente.data;
            this.pagination = response.data.list_incidente;
         }, response => {
            // error callback
         });
      },
      // change order variable direction
      changeListOrder: function (column) {
         this.listOrder == 'asc' ? this.listOrder = 'desc' : this.listOrder = 'asc';
         this.orderLists(column);
      },

      // function to order users in the list
      orderLists: function (column) {
         this.lists = _.orderBy(this.lists, column, this.listOrder);
         //console.log(column);
         //this.lists = this.shuffle(_.orderBy(this.lists, 'name', this.listOrder));
         //console.log(this.lists.length);
      },

      /* for transition group flip */
      shuffle: function (items) {
         return _.shuffle(items)
      },

      //function to fetch data from controller
      fetchData: function () {
         this.$http.get('/gid').then(response => {
            //console.log(response);
            this.estado_incidente = response.data.estado_incidente;
            this.region = response.data.region;
            this.servicio_salud = response.data.servicio_salud;
            this.lists = response.data.list_incidente.data;
            this.pagination = response.data.list_incidente;
         }, response => {
            console.log(response);
            // error callback
         });
      },
   }
});

