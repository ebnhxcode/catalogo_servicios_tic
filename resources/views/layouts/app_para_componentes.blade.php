<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1">

   <!-- CSRF Token -->
   <meta name="csrf-token" content="{{ csrf_token() }}">

   <title>{{ config('app.name', 'Catalogo Servicios Tic') }}</title>

   <!-- Styles -->
   {{--<link href="{{ asset('/css/app.css') }}" rel="stylesheet">--}}
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

   <!-- Material Design for Bootstrap fonts and icons -->
   <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons">

   <link rel="stylesheet" href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css" integrity="sha384-wXznGJNEXNG1NFsbm0ugrLFMQPWswR3lds2VeinahP8N0zJw9VWSopbjv2x7WCvX" crossorigin="anonymous">

   <style>

      .pro {
         box-shadow: 2px 5px 5px 2px #e8e8e8;
         border-radius: 6px;
      }


      /* Estilo para las animaciones de los campos requeridos */
      .bounce-enter-active {
         animation: bounce-in .5s;
      }

      .bounce-leave-active {
         animation: bounce-in .5s reverse;
      }

      @keyframes bounce-in {
         0% {
            transform: scale(0);
         }
         50% {
            transform: scale(1.5);
         }
         100% {
            transform: scale(1);
         }
      }

      /* Estilo para las notificaciones */
      .vue-notification {
         padding: 10px;
         margin: 0 5px 5px;

         font-size: 12px;

         color: #ffffff;
         background: #44A4FC;
         border-left: 5px solid #187FE7;

      &
      .default {
         background: #e7fff5;
         border-left-color: #dce2f4;
      }

      &
      .info {
         background: #c0fffc;
         border-left-color: #a7dbf4;
      }

      &
      .warn {
         background: #ffb648;
         border-left-color: #f48a06;
      }

      &
      .error {
         background: #E54D42;
         border-left-color: #B82E24;
      }

      &
      .success {
         background: #68CD86;
         border-left-color: #42A85F;
      }

      }
   </style>


</head>
<body>
<div id="app">

   <main class="py-4" style="padding-left: 10px;">

      <div class="container-fluid">
         <div class="row">

            <nav id="SideMenuController"></nav><!-- #SideMenuController -->

            <div class="col-md-12 col-lg-12">
               @yield('content')
            </div>


         </div>
      </div>

   </main>
</div><!-- #FrontController -->

<!-- Scripts -->
{{--<script src="{{ asset('js/app.js') }}"></script>--}}


@yield('VueControllers')

<script src="https://unpkg.com/popper.js@1.12.6/dist/umd/popper.js" integrity="sha384-fA23ZRQ3G/J53mElWqVJEGJzU0sTs+SvzG8fXVWP+kJQ1lwFAOkcUOysnlKJC33U" crossorigin="anonymous"></script>
<script src="https://unpkg.com/bootstrap-material-design@4.1.1/dist/js/bootstrap-material-design.js" integrity="sha384-CauSuKpEqAFajSpkdjv3z9t8E7RlpJ1UP0lKM/+NdtSarroVKu069AlsRPKkFBz9" crossorigin="anonymous"></script>
<script>$(document).ready(function() { $('body').bootstrapMaterialDesign(); });</script>

{{--<script src="{{ asset('js/controllers/SideMenuController.js') }}"></script>--}}

</body>
</html>
