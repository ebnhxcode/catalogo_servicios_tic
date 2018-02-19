import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
import { _ , range } from 'lodash';
import Vue2Filters from 'vue2-filters';
Vue.use(Vue2Filters);
/*
var Highcharts = require('highcharts');
require('highcharts/modules/data')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
*/
//import Highcharts from 'highcharts';
//Vue.use(Highcharts);
//import Chart from 'chart.js';

//var Highcharts = require('highcharts');

// Load module after Highcharts is loaded
//require('highcharts/modules/exporting')(Highcharts);

// Create the chart
//Highcharts.chart('container', { /*Highcharts options*/ });


const Hallazgos = new Vue({
   el: '#Hallazgos',
   data(){
      return {
         procesos_auditados:{},
         hallazgos:{},
         compromisos:{},
         seguimientos:{},
      }
   },
   computed: {},
   watch: {},
   components: {
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
      Highcharts.chart('container', {
         chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
         },
         title: {
            text: 'Browser market shares January, 2015 to May, 2015'
         },
         tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
         },
         plotOptions: {
            pie: {
               allowPointSelect: true,
               cursor: 'pointer',
               dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                  style: {
                     color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                  }
               }
            }
         },
         series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
               name: 'Microsoft Internet Explorer',
               y: 56.33
            }, {
               name: 'Chrome',
               y: 24.03,
               sliced: true,
               selected: true
            }, {
               name: 'Firefox',
               y: 10.38
            }, {
               name: 'Safari',
               y: 4.77
            }, {
               name: 'Opera',
               y: 0.91
            }, {
               name: 'Proprietary or Undetectable',
               y: 0.2
            }]
         }]
      });
      //this.fetch_hallazgos();
   },
   ready: {},
   filters: {},
   methods: {
      fetch_hallazgos: function () {

      },
   },
});