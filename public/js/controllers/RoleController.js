/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 50);
/******/ })
/************************************************************************/
/******/ ({

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(51);


/***/ }),

/***/ 51:
/***/ (function(module, exports) {



var RoleController = new Vue({
   el: '#RoleController',
   data: function data() {
      return {
         'filtro_head': null,
         'table': [{
            'value1': 'valuea1',
            'value2': 'valuea2',
            'value3': 'valuea3',
            'value4': 'valuea4',
            'value5': 'valuea5'
         }, {
            'value1': 'valueb1',
            'value2': 'valueb2',
            'value3': 'valueb3',
            'value4': 'valueb4',
            'value5': 'valueb5'
         }, {
            'value1': 'valuec1',
            'value2': 'valuec2',
            'value3': 'valuec3',
            'value4': 'valuec4',
            'value5': 'valuec5'
         }, {
            'value1': 'valued1',
            'value2': 'valued2',
            'value3': 'valued3',
            'value4': 'valued4',
            'value5': 'valued5'
         }, {
            'value1': 'valuee1',
            'value2': 'valuee2',
            'value3': 'valuee3',
            'value4': 'valuee4',
            'value5': 'valuee5'
         }, {
            'value1': 'valuef1',
            'value2': 'valuef2',
            'value3': 'valuef3',
            'value4': 'valuef4',
            'value5': 'valuef5'
         }]
      };
   },


   computed: {},
   watch: {},
   components: {},
   created: function created() {
      console.log("RoleController mounted");
      this.show();
   },

   ready: {},
   filters: {},
   methods: {
      show: function show() {
         this.$modal.show('hello-world', {
            title: 'Alert!',
            text: 'You are too awesome',
            buttons: [{
               title: 'Deal with it',
               handler: function handler() {
                  alert('Woot!');
               }
            }, {
               title: '', // Button title
               default: true, // Will be triggered by default if 'Enter' pressed.
               handler: function handler() {} // Button click handler
            }, {
               title: 'Close'
            }]
         });
      },
      hide: function hide() {
         this.$modal.hide('hello-world');
      }
   }
});

/***/ })

/******/ });