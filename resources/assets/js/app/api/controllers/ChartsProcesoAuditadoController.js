import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
import { _ , range } from 'lodash';
import Vue2Filters from 'vue2-filters';
Vue.use(Vue2Filters);
//import Chart from 'chart.js';

const Hallazgo = new Vue({
   el: '#ProcesosAuditados',
   data(){
      return {
         procesos_auditados:{},
         hallazgos:{},
         compromisos:{},
         seguimientos:{},
         pieChartCanvas:{},
         pieChart:{},
         pieData:[],
         pieOptions:{},
         chart_colors:[
            'Red','Azure','Brown','BurlyWood','CadetBlue','Chartreuse','Chocolate','Coral','CornflowerBlue','Cornsilk','Crimson','Cyan','DarkBlue','DarkCyan','DarkGoldenRod','DarkGray','DarkGrey','DarkGreen','DarkKhaki','DarkMagenta','DarkOliveGreen','DarkOrange','DarkOrchid','DarkRed','DarkSalmon','DarkSeaGreen','DarkSlateBlue','DarkSlateGray','DarkSlateGrey','DarkTurquoise','DarkViolet','DeepPink','DeepSkyBlue','DimGray','DimGrey','DodgerBlue','FireBrick','FloralWhite','ForestGreen','Fuchsia','Gainsboro','GhostWhite','GoldenRod','Gray','Grey','Green','GreenYellow','HoneyDew','HotPink','IndianRed','Indigo','Ivory','Khaki','Lavender','LavenderBlush','LawnGreen','LemonChiffon','LightBlue','LightCoral','LightCyan','LightGoldenRodYellow','LightGray','LightGrey','LightGreen','LightPink','LightSalmon','LightSeaGreen','LightSkyBlue','LightSlateGray','LightSlateGrey','LightSteelBlue','LightYellow','Lime','LimeGreen','Linen','Magenta','Maroon','MediumAquaMarine','MediumBlue','MediumOrchid','MediumPurple','MediumSeaGreen','MediumSlateBlue','MediumSpringGreen','MediumTurquoise','MediumVioletRed','MidnightBlue','MintCream','MistyRose','Moccasin','NavajoWhite','Navy','OldLace','Olive','OliveDrab','Orange','OrangeRed','Orchid','PaleGoldenRod','PaleGreen','PaleTurquoise','PaleVioletRed','PapayaWhip','PeachPuff','Peru','Pink','Plum','PowderBlue','Purple','RebeccaPurple','RosyBrown','RoyalBlue','SaddleBrown','Salmon','SandyBrown','SeaGreen','SeaShell','Sienna','Silver','SkyBlue','SlateBlue','SlateGray','SlateGrey','Snow','SpringGreen','SteelBlue','Tan','Teal','Thistle','Tomato','Turquoise','Violet','Wheat','White','WhiteSmoke','Yellow','YellowGree','Blue','AliceBlue','AntiqueWhite','Aqua','Aquamarine','Beige','Bisque','Black','BlanchedAlmond','BlueViolet',
         ],
      }
   },
   computed: {},
   watch: {},
   components: {},
   created(){
      this.fetch_procesos_auditados();
      $(function () {
         $('[data-toggle="popover"]').popover()
      });
   },
   ready: {},
   filters: {},
   methods: {
      fetch_chart: function () {
         $('#chart_procesos_auditados').replaceWith('<canvas id="chart_procesos_auditados" width="100" height="100"></canvas>');
         this.pieChartCanvas = $("#chart_procesos_auditados").get(0).getContext("2d");
         this.pieChart = new Chart(this.pieChartCanvas);
         this.pieOptions = {
            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke: true,
            //String - The colour of each segment stroke
            segmentStrokeColor: "#fff",
            //Number - The width of each segment stroke
            segmentStrokeWidth: 0,
            //Number - The percentage of the chart that we cut out of the middle
            percentageInnerCutout: 0, // This is 0 for Pie charts
            //Number - Amount of animation steps
            animationSteps: 100,
            //String - Animation easing effect
            animationEasing: "easeOutBounce",
            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate: true,
            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale: true,
            //Boolean - whether to make the chart responsive to window resizing
            responsive: true,
            // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
            maintainAspectRatio: true,
            //String - A legend template
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
            //String - A tooltip template
            multiTooltipTemplate: "<%=value %> asd asd asdas asd  <%=label%> users"
         };
         this.pieData = [];
      },
      fetch_procesos_auditados: function () {
         this.$http.get('/fetch_procesos_auditados').then(response => { // success callback
            this.procesos_auditados = response.data || {};
               this.fetch_chart();
               let self = this;
               this.procesos_auditados.forEach( function (proceso_auditado,i){
                  self.pieData.push({
                     value:1,
                     color:self.chart_colors[Math.floor((Math.random() * self.chart_colors.length) + 1)],
                     highlight:self.chart_colors[Math.floor((Math.random() * self.chart_colors.length) + 1)],
                     label:proceso_auditado.nombre_proceso_auditado
                  });
               });
               this.pieChart.Pie(this.pieData, this.pieOptions);
         }, response => { // error callback
            console.log('Error fetch_procesos_auditados: '+response);
         });
      },
      fetch_procesos_auditados_por_ano: function () {
         if(this.procesos_auditados.length > 0){
            this.fetch_chart();
            let self = this;
            let anos = {'a2012':{c:0},'a2013':{c:0},'a2014':{c:0},'a2015':{c:0},'a2016':{c:0},'a2017':{c:0},'a2018':{c:0},'a2019':{c:0}};
            this.procesos_auditados.forEach( function (proceso_auditado,i){
               switch (proceso_auditado.ano) {
                  case 2012:
                     anos.a2012.c+=1;
                     break;
                  case 2013:
                     anos.a2013.c+=1;
                     break;
                  case 2014:
                     anos.a2014.c+=1;
                     break;
                  case 2015:
                     anos.a2015.c+=1;
                     break;
                  case 2016:
                     anos.a2016.c+=1;
                     break;
                  case 2017:
                     anos.a2017.c+=1;
                     break;
                  case 2018:
                     anos.a2018.c+=1;
                     break;
                  case 2019:
                     anos.a2019.c+=1;
                     break
               }
            });
            for (let ano in anos) {
               self.pieData.push({
                  value:anos[ano].c,
                  color:self.chart_colors[Math.floor((Math.random() * self.chart_colors.length) + 1)],
                  highlight:self.chart_colors[Math.floor((Math.random() * self.chart_colors.length) + 1)],
                  label:ano.substr(1,ano.length),
               });
            }
            this.pieChart.Pie(this.pieData, this.pieOptions);
         }
      },
      fetch_hallazgos: function () {
         let id_proceso_auditado = parseInt($('#select_procesos_auditados').val()) || 0;
         this.hallazgos = this.compromisos = this.seguimientos = {};
         if( id_proceso_auditado > 0) {
            this.$http.get('/fetch_hallazgos/'+id_proceso_auditado).then(response => { // success callback
               this.hallazgos = response.data || {};
               this.fetch_chart();
               let self = this;
               this.hallazgos.forEach( function (hallazgo,i){
                  self.pieData.push({
                     value:1,
                     color:self.chart_colors[Math.floor((Math.random() * self.chart_colors.length) + 1)],
                     highlight:self.chart_colors[Math.floor((Math.random() * self.chart_colors.length) + 1)],
                     label:hallazgo.nombre_hallazgo
                  });
               });
               this.pieChart.Pie(this.pieData, this.pieOptions);
            }, response => { // error callback
               console.log('Error fetch_hallazgos: '+response);
            });
            return true;
         }else{
            this.fetch_procesos_auditados();
            return {'rc':'1','rd':'Error, valor de proceso auditado invalido'};
         }
      },
      fetch_hallazgos_por_estado: function () {
         if(this.hallazgos.length > 0) {
            this.fetch_chart();
            let self = this;
            let estados = {'Reprogramado':{c:0},'Vencido':{c:0},'Finalizado':{c:0},'Vigente':{c:0},'Suscripcion':{c:0},};
            this.hallazgos.forEach( function (hallazgo,i){
               if(hallazgo.compromiso){
                  if(hallazgo.compromiso[0].seguimiento){
                     switch (hallazgo.compromiso[0].seguimiento[hallazgo.compromiso[0].seguimiento.length-1].estado) {
                        case 'Reprogramado':
                           estados.Reprogramado.c+=1;
                           break;
                        case 'Vencido':
                           estados.Vencido.c+=1;
                           break;
                        case 'Finalizado':
                           estados.Finalizado.c+=1;
                           break;
                        case 'Vigente':
                           estados.Vigente.c+=1;
                           break;
                        case 'Suscripcion':
                           estados.Suscripcion.c+=1;
                           break;
                     }
                  }
               }
            });
            for (let estado in estados) {
               self.pieData.push({
                  value:estados[estado].c,
                  color:self.chart_colors[Math.floor((Math.random() * self.chart_colors.length) + 1)],
                  highlight:self.chart_colors[Math.floor((Math.random() * self.chart_colors.length) + 1)],
                  label:estado,
                  filter:1,
               });
            }
            this.pieChart.Pie(this.pieData, this.pieOptions);
         }
      },
      fetch_compromisos: function () {
         let id_hallazgo = parseInt($('#select_hallazgos').val()) || 0;
         this.compromisos = this.seguimientos = {};
         if( id_hallazgo > 0) {
            this.$http.get('/fetch_compromisos/'+id_hallazgo).then(response => { // success callback
               this.compromisos = response.data;
               this.fetch_chart();
               let self = this;
               this.compromisos.forEach( function (compromiso,i){
                  self.pieData.push({
                     value:1,
                     color:self.chart_colors[Math.floor((Math.random() * self.chart_colors.length) + 1)],
                     highlight:self.chart_colors[Math.floor((Math.random() * self.chart_colors.length) + 1)],
                     label:compromiso.nombre_compromiso
                  });
               });
               this.pieChart.Pie(this.pieData, this.pieOptions);
            }, response => { // error callback
               console.log('Error fetch_compromisos: '+response);
            });
            return true;
         }else{
            this.fetch_hallazgos();
            return {'rc':'2','rd':'Error, valor de hallazgo invalido'};
         }
      },
      fetch_seguimientos: function () {
         let id_compromiso = parseInt($('#select_compromisos').val()) || 0;
         this.seguimientos = {};
         if( id_compromiso > 0) {
            this.$http.get('/fetch_seguimientos/'+id_compromiso).then(response => { // success callback
               this.seguimientos = response.data;
               this.fetch_chart();
               let self = this;
               this.seguimientos.forEach( function (seguimiento,i){
                  self.pieData.push({
                     value:1,
                     color:self.chart_colors[Math.floor((Math.random() * self.chart_colors.length) + 1)],
                     highlight:self.chart_colors[Math.floor((Math.random() * self.chart_colors.length) + 1)],
                     label:seguimiento.nombre_seguimiento
                  });
               });
               this.pieChart.Pie(this.pieData, this.pieOptions);
            }, response => { // error callback
               console.log('Error fetch_seguimientos: '+response);
            });
            return true;
         }else{
            this.fetch_compromisos();
            return {'rc':'3','rd':'Error, valor de compromiso invalido'};
         }
      },
      test: function(){alert(1);}
   },
});