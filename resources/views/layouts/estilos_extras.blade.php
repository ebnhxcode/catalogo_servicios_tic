<style>
   .panel.with-nav-tabs .panel-heading {
      padding: 5px 5px 0 5px;
   }


   .panel.with-nav-tabs .nav-tabs {
      border-bottom: none;
   }

   .panel.with-nav-tabs .nav-justified {
      margin-bottom: -1px;
   }

   .with-nav-tabs.panel-primary .nav-tabs > li > a,
   .with-nav-tabs.panel-primary .nav-tabs > li > a:hover,
   .with-nav-tabs.panel-primary .nav-tabs > li > a:focus {
      color: #fff;
   }

   .with-nav-tabs.panel-primary .nav-tabs > .open > a,
   .with-nav-tabs.panel-primary .nav-tabs > .open > a:hover,
   .with-nav-tabs.panel-primary .nav-tabs > .open > a:focus,
   .with-nav-tabs.panel-primary .nav-tabs > li > a:hover,
   .with-nav-tabs.panel-primary .nav-tabs > li > a:focus {
      color: #fff;
      background-color: #3071a9;
      border-color: transparent;
   }

   .with-nav-tabs.panel-primary .nav-tabs > li.active > a,
   .with-nav-tabs.panel-primary .nav-tabs > li.active > a:hover,
   .with-nav-tabs.panel-primary .nav-tabs > li.active > a:focus {
      color: #428bca;
      background-color: #fff;
      border-color: #428bca;
      border-bottom-color: transparent;
   }

   .with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu {
      background-color: #428bca;
      border-color: #3071a9;
   }

   .with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > li > a {
      color: #fff;
   }

   .with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > li > a:hover,
   .with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > li > a:focus {
      background-color: #3071a9;
   }

   .with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > .active > a,
   .with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > .active > a:hover,
   .with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > .active > a:focus {
      background-color: #4a9fe9;
   }
</style>

<!-- Estilo modal -->
<style>
   .modal-mask {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      display: table;
      transition: opacity .3s ease;
   }

   .modal-wrapper {
      display: table-cell;
      vertical-align: middle;
   }

   .modal-container {
      width: 950px;
      max-height: 640px;
      margin: 0px auto;
      padding: 10px 15px;
      background-color: #fff;
      border-radius: 3px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;
   }

   .modal-header h3 {
      margin-top: 0;
      color: #42b983;
   }

   .modal-body {
      margin: 20px 0;
   }

   .modal-default-button {
      float: right;
   }

   /*
    * The following styles are auto-applied to elements with
    * transition="modal" when their visibility is toggled
    * by Vue.js.
    *
    * You can easily play with the modal transition by editing
    * these styles.
    */

   .modal-enter {
      opacity: 0;
   }

   .modal-leave-active {
      opacity: 0;
   }

   .modal-enter .modal-container,
   .modal-leave-active .modal-container {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
   }
</style>

<!-- Styles para vuejs spinner -->
<style>
   .loader,
   .loader:before,
   .loader:after {
      border-radius: 50%;
      width: 2.5em;
      height: 2.5em;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      -webkit-animation: load7 1.8s infinite ease-in-out;
      animation: load7 1.8s infinite ease-in-out;
   }
   .loader {
      color: #a9b2fb;
      font-size: 10px;
      margin: 80px auto;
      position: relative;
      text-indent: -9999em;
      -webkit-transform: translateZ(0);
      -ms-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
   }
   .loader:before,
   .loader:after {
      content: '';
      position: absolute;
      top: 0;
   }
   .loader:before {
      left: -3.5em;
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
   }
   .loader:after {
      left: 3.5em;
   }
   @-webkit-keyframes load7 {
      0%,
      80%,
      100% {
         box-shadow: 0 2.5em 0 -1.3em;
      }
      40% {
         box-shadow: 0 2.5em 0 0;
      }
   }
   @keyframes load7 {
      0%,
      80%,
      100% {
         box-shadow: 0 2.5em 0 -1.3em;
      }
      40% {
         box-shadow: 0 2.5em 0 0;
      }
   }
</style>

<!-- Mini Loader -->
<style>
   .mini-loader,
   .mini-loader:before,
   .mini-loader:after {
      border-radius: 50%;
      width: 2.5em;
      height: 2.5em;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      -webkit-animation: load7 1.8s infinite ease-in-out;
      animation: load7 1.8s infinite ease-in-out;
   }
   .mini-loader {
      color: #2a3284;
      font-size:2px;
      margin: 15px auto;
      position: relative;
      text-indent: -9999em;
      -webkit-transform: translateZ(0);
      -ms-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
   }
   .mini-loader:before,
   .mini-loader:after {
      content: '';
      position: absolute;
      top: 0;
   }
   .mini-loader:before {
      left: -3.5em;
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
   }
   .mini-loader:after {
      left: 3.5em;
   }
   @-webkit-keyframes load7 {
      0%,
      80%,
      100% {
         box-shadow: 0 2.5em 0 -1.3em;
      }
      40% {
         box-shadow: 0 2.5em 0 0;
      }
   }
   @keyframes load7 {
      0%,
      80%,
      100% {
         box-shadow: 0 2.5em 0 -1.3em;
      }
      40% {
         box-shadow: 0 2.5em 0 0;
      }
   }
</style>

<!-- Vue Transitions -->
<style>
   /* Enter and leave animations can use different */
   /* durations and timing functions.              */
   .slide-fade-enter-active {
      transition: all .3s ease;
   }
   .slide-fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
   }
   .slide-fade-enter, .slide-fade-leave-to
      /* .slide-fade-leave-active below version 2.1.8 */ {
      transform: translateX(10px);
      opacity: 0;
   }
</style>
<!--  Style template transitions-->
<style scoped="">

   .slide-fade-enter-active {
      transition: all .3s ease;
   }
   .slide-fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
   }
   .slide-fade-enter, .slide-fade-leave-to
      /* .slide-fade-leave-active below version 2.1.8 */ {
      transform: translateX(10px);
      opacity: 0;
   }

   .fade-enter-active, .fade-leave-active {
      transition: opacity .3s
   }

   .fade-enter, .fade-leave-to {
      opacity: 0
   }

   .bounce-enter-active {
      animation: bounce-in .3s;
   }

   .bounce-leave-active {
      animation: bounce-in .2s reverse;
   }

   @keyframes bounce-in {
      0% {
         transform: scale(0);
      }
      50% {
         transform: scale(1);
      }
      100% {
         transform: scale(1);
      }
   }

   .flip-list-move {
      transition: transform 1s;
   }

   .wrap {
      height: 80vh;
      display: flex;
      overflow-y: scroll;
   }

   .wrap-long-vertical {
      height: 100vh;
      display: flex;
      overflow-y: scroll;
   }

   .list-complete-item {
      transition: all 1s;
      display: inline-block;
      margin-right: 10px;
   }
   .list-complete-enter, .list-complete-leave-to
      /* .list-complete-leave-active below version 2.1.8 */ {
      opacity: 0;
      transform: translateY(30px);
   }
   .list-complete-leave-active {
      position: absolute;
   }

   .transition {
      transition: all 1s linear;
      position: fixed;
      top: 0;
      display: block;
   }
   .before-enter {
      left: 10px;
   }
   .enter {
      left: 20px;
   }
   .enter.leave {
      left: 30px;
   }

</style>


<!-- Success Circle -->
<style>
   /**
     Coded by /u/j0be in scss.
     See scss source here -> https://codepen.io/j0be/pen/MKRVyN
  */
   /*body { padding: .5em; text-align: center; }*/
   h1 { margin-bottom: 1em; }
   .circle-loader {
      margin: 0 0 10px 10px;
      border: 2px solid rgba(0, 0, 0, 0.2);
      border-left-color: #5cb85c;
      animation-name: loader-spin;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      position: relative;
      display: inline-block;
      vertical-align: top;
   }
   .circle-loader,
   .circle-loader:after {
      border-radius: 50%;
      width: 5em;
      height: 5em;
   }
   .load-complete {
      -webkit-animation: none;
      animation: none;
      border-color: #5cb85c;
      transition: border 500ms ease-out;
   }
   .checkmark { display: none; }
   .checkmark.draw:after {
      animation-duration: 800ms;
      animation-timing-function: ease;
      animation-name: checkmark;
      transform: scaleX(-1) rotate(145deg);
   }
   .checkmark:after {
      opacity: 1;
      height: 3em;
      width: 1.3em;
      transform-origin: left top;
      border-right: 2px solid #5cb85c;
      border-top: 2px solid #5cb85c;
      content: '';
      left: .9em;
      top: 3em;
      position: absolute;
   }
   @keyframes loader-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
   }
   @keyframes checkmark {
      0% {
         height: 0;
         width: 0;
         opacity: 1;
      }
      20% {
         height: 0;
         width: .5em;
         opacity: 1;
      }
      40% {
         height: 3em;
         width: 1.3em;
         opacity: 1;
      }
      100% {
         height: 3em;
         width: 1.3em;
         opacity: 1;
      }
   }
</style>