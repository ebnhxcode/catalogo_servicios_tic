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
   <link href="{{ asset('/css/app.css') }}" rel="stylesheet">
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

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
   <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
      <div class="container">
         <a class="navbar-brand" href="{{ url('/') }}">
            {{ config('app.name', 'Catálogo Servicios Tic') }} <small class="text-success">beta</small>
         </a>
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                 aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
         </button>

         <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- Left Side Of Navbar -->
            <ul class="navbar-nav mr-auto">

            </ul>

            <!-- Right Side Of Navbar -->
            <ul class="navbar-nav ml-auto">
               <!-- Authentication Links -->
               @guest
               <li><a class="nav-link" href="{{ route('login') }}">Login</a></li>
               <li><a class="nav-link" href="{{ route('register') }}">Register</a></li>
               @else
                  <li class="nav-item dropdown">
                     <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        {{ isset(Auth::user()->nom_usuario) ?
                            Auth::user()->nom_usuario : 'Sin Nombre' }}
                        <span class="caret"></span>
                     </a>
                     <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="{{ route('logout') }}"
                           onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                           Logout
                        </a>
                        <a class="dropdown-item" href="{{ route('home') }}">
                           Menú
                        </a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                           @csrf
                        </form>
                     </div>
                  </li>
                  @endguest
            </ul>
         </div>
      </div>
   </nav>

   <main class="py-4" style="padding-left: 10px;">

      <div class="container-fluid">
         <div class="row">

            <nav class="col-md-3 d-none d-md-block bg-light sidebar pro" id="SideMenuController"
                 style="border-radius: 5px;padding-top: 20px;">

               <template class="form-group">
                  <!-- Input para escribir el termino a buscar -->
                  <input type="text" class="form-control pro" aria-describedby="filtro_menu_help"
                         placeholder="Filtrar en el menú" v-model="filtro_menu" id="filtro_menu">

                  {{--
                  <small id="filtro_menu_help" class="form-text text-muted">
                     Filtrar ú
nú
                  </small>
                  --}}
               </template>

               <br>
               <div class="sidebar-sticky" style="overflow:auto; max-height: 650px;">

                  <h5
                     class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                     <span class="h6 small">Opciones</span>
                  </h5>

                  <ul class="nav flex-column">
                     <li class="nav-item">
                        <i class="fa fa-refresh btn btn-light btn-sm" @click.prevent="inicializar" aria-hidden="true"
                           data-placement="top" data-toggle="tooltip" title="Clic para actualizar menu"></i>

                     </li>
                  </ul>

                  <h5
                     class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                     <span class="h6">Principales</span>
                     <i class="fa fa-sort-alpha-asc btn btn-light btn-sm" @click.prevent="cambiar_orden_lista('nom_menu','menus')" aria-hidden="true"
                        data-placement="top" data-toggle="tooltip" title="Clic para ordenar menu principal"></i>
                  </h5>

                  <ul class="nav flex-column">
                     <li class="nav-item" v-for="menu in filterBy(menus, filtro_menu)">
                        <a class="nav-link active" style="font-size: .8rem;" :href="menu.url_menu"
                           data-placement="top" data-toggle="tooltip" :title="menu.det_menu">
                           @{{ menu.nom_menu }}<span class="sr-only">(current)</span>
                        </a>
                     </li>

                     <li class="nav-item" v-if="filterBy(menus, filtro_menu).length == 0">
                        <small class="text-muted text-center">Sin resultados ${`@{{ filtro_menu }}`}.</small>
                     </li>
                  </ul>

                  <div v-if="mantenedores && mantenedores.length > 0">
                     <h5
                        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span class="h6">Mantenedores</span>
                        <i class="fa fa-sort-alpha-asc btn btn-light btn-sm" @click.prevent="cambiar_orden_lista('nom_mantenedor','mantenedores')" aria-hidden="true"
                           data-placement="top" data-toggle="tooltip" title="Clic para ordenar menu de mantenedores"></i>
                     </h5>

                     <ul class="nav flex-column mb-2">

                        <li class="nav-item" v-for="mant in filterBy(mantenedores, filtro_menu)">
                           <a class="nav-link" style="font-size: .8rem;" :href="mant.url_mantenedor"
                              data-placement="top" data-toggle="tooltip" :title="mant.det_mantenedor">
                              @{{ mant.nom_mantenedor }}
                           </a>
                        </li>

                        <li class="nav-item" v-if="filterBy(mantenedores, filtro_menu).length == 0">
                           <small class="text-muted text-center">Sin resultados ${`@{{ filtro_menu }}`}.</small>
                        </li>
                     </ul>
                  </div>

               </div>
               <br>
            </nav><!-- #SideMenuController -->

            @yield('content')

         </div>
      </div>

   </main>
</div><!-- #FrontController -->

<!-- Scripts -->
{{--<script src="{{ asset('js/app.js') }}"></script>--}}
<script src="{{ asset('js/controllers/SideMenuController.js') }}"></script>

@yield('VueControllers')

</body>
</html>
