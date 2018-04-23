<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   {{--<meta name="viewport" content="width=device-width, initial-scale=1">--}}
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

   <!-- CSRF Token -->
   <meta name="csrf-token" content="{{ csrf_token() }}">

   <title>{{ config('app.name', 'Catalogo Servicios Tic') }}</title>

   <!-- Styles -->
   <!--
   {{--<link href="{{ asset('/css/app.css') }}" rel="stylesheet">--}}
   -->

   <!-- Material Design for Bootstrap fonts and icons -->
   <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons">


   <link rel="stylesheet" href="{{url('/css/other_libs/bootstrap-material-design.min.css')}}">
   <link rel="stylesheet" href="{{url('/css/other_libs/font-awesome470.min.css')}}">
   <!-- Custom styles for this template -->
   <link href="{{url('/css/simple-sidebar.css')}}" rel="stylesheet">

   <style>

      body {
         padding-top: 50px;
      }

      .pro {
         box-shadow: 0px 4px 4px 0px #dedede;
         border-radius: 5px;
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
         /*
         box-shadow: 0px 5px 5px 2px #f5f5f5 !important;
         border-radius: 5px 5px 5px 5px !important;
         */

         width: 50rem;
         height: 6rem;
         padding: 5px !important;
         margin: 0 5px 5px !important;

         font-size: 14px !important;

         color: #ffffff;
         background: #44A4FC;
         border-left: 1px solid #187FE7 ;

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
         background: #63dd85 !important;
         border-left-color: 1px solid #42A85F !important;
      }

      }





   </style>


</head>
<body>
<div id="app">
   <nav class="navbar navbar-light bg-light navbar-expand-md fixed-top">
      <div class="container">
         <a class="navbar-brand mx-auto" href="{{ url('/') }}">
            {{--<small class="text-muted">{{ config('app.name', 'Catálogo Servicios') }}</small>--}}
            <small class="text-muted">&nbsp;</small>
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
            <ul class="navbar-nav ml-auto d-sm-block d-md-none float-right" style="padding-top: 30px;">
               <!-- Authentication Links -->
               <!--
                              <li><a class="nav-link" href="{{-- route('login') --}}">Login</a></li>
                              <li><a class="nav-link" href="{{-- route('register') --}}">Register</a></li>
                              -->
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
            </ul>
         </div>
      </div>
   </nav>

   <main class="{{--py-4--}}" style="/*padding-left: 10px;*/padding-top: 3px !important;">

      <div class="{{--container-fluid--}}">

         <div id="wrapper">

            <!-- Sidebar -->
            <div id="sidebar-wrapper"
                 style="z-index:1;margin-top:4px;box-shadow:  1px 1px 1px 1px #b4b4b4">

               <div class="row">

                  <nav class="col-md-12 {{--d-none--}} d-md-block bg-light sidebar pro" id="SideMenuController"
                       style="border-radius: 5px;padding-top: 20px;">

                     <template class="form-group">

                        <!-- Input para escribir el termino a buscar -->
                        <input type="text" class="form-control bg-light col-sm-12 sticky-top" aria-describedby="filtro_menu_help"
                               style="z-index: 10; padding-left: 20px;"
                               placeholder="FILTRAR EN EL MENU" v-model="filtro_menu" id="filtro_menu">

                        {{--
                        <small id="filtro_menu_help" class="form-text text-muted">
                        </small>
                        --}}
                     </template>

                     <br>


                     <div class="sidebar-sticky" style="overflow:auto;">

                        <h5
                           class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                           <span class="h6 small">Opciones</span>
                        </h5>

                        <ul class="nav flex-column">
                           <li class="nav-item">
                              <i class="fa fa-refresh btn btn-warning" @click.prevent="inicializar" aria-hidden="true"
                                 data-placement="top" data-toggle="tooltip" title="Clic para actualizar menu"></i>

                              <a class="fa fa-compress btn btn-warning menu-toggle"  aria-hidden="true"
                                 data-placement="top" data-toggle="tooltip" title="Clic para cerrar el menu lateral"></a>

                           </li>
                        </ul>

                        <h5
                           class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                           <span class="h6"><b>MENU PRINCIPAL</b></span>
                           <i class="fa fa-sort-alpha-asc btn btn-info btn-sm" @click.prevent="cambiar_orden_lista('nom_menu','menus')" aria-hidden="true"
                              data-placement="top" data-toggle="tooltip" title="Clic para ordenar menu principal"></i>
                        </h5>

                        <ul class="nav flex-column">
                           <li class="nav-item" v-for="menu in filterBy(menus, filtro_menu)">
                              <a class="nav-link btn btn-primary text-left" style="font-size: .8rem;" :href="menu.url_menu"
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
                              <span class="h6"><b>MANTENEDORES</b></span>
                              <i class="fa fa-sort-alpha-asc btn btn-info btn-sm" @click.prevent="cambiar_orden_lista('nom_mantenedor','mantenedores')" aria-hidden="true"
                                 data-placement="top" data-toggle="tooltip" title="Clic para ordenar menu de mantenedores"></i>
                           </h5>

                           <ul class="nav flex-column mb-2">

                              <li class="nav-item" v-for="mant in filterBy(mantenedores, filtro_menu)">
                                 <a class="nav-link btn btn-secondary text-left" style="font-size: .8rem;" :href="mant.url_mantenedor"
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
                     <br>
                     <br>
                     <br>
                  </nav><!-- #SideMenuController -->
               </div>
            </div>
            <!-- /#sidebar-wrapper -->

            <!-- Page Content -->
            <div id="page-content-wrapper" style="padding-top: 0px !important;">
               <div class="{{--container-fluid--}}">
                  {{--sticky-top--}}
                  <div class="row">

                     <div class="col-md-10" style="padding-left: 10px !important;padding-right: 10px !important;">

                        <div class="float-left sticky-top" style="padding-top: 10px;z-index: 10;">
                           <a href="#menu-toggle" class="btn btn-xs btn-primary active" id="menu-toggle">ABRIR<i style="padding-left:5px;" class="fa fa-lock" aria-hidden="true"></i></a>
                        </div>

                        @yield('content')

                     </div>

                     <div class="col-md-2 bg-light sidebar-sticky pro" style="padding-left: 10px !important;">

                        <div class=" sticky-top" style="padding-top: 10px;z-index: 1;">

                           <div class="" role="alert">
                              <ul class="navbar-nav ml-auto">
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
                              </ul>
                           </div>

                           &nbsp;
                           {{--
                           <div style=""
                              class="h5 btn-lg bg-light sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                              <span class="<!--h6 small-->">MENSAJES</span>
                           </div>
                           --}}

                           {{--
<div class="" style="overflow-y: scroll;max-height: 600px;z-index: 0 !important;">

                              <ul class="nav flex-column">

                                 <li class="nav-item">
                                    <button class="btn btn-danger btn-sm float-right"
                                            data-placement="top" data-toggle="tooltip" title="Eliminar">
                                       <i class="fa fa-close"></i>
                                    </button>
                                    <a class="nav-link" style="font-size: .7rem;padding-left: 0px;" href="#!"
                                       data-placement="top" data-toggle="tooltip" title="">
                                       <dl class="">
                                          <dt>Usuario</dt>
                                          <dd>Mensaje adjskdaskdjasdj asjdk sjkdas</dd>
                                       </dl>
                                    </a>
                                 </li>
                                 <li class="nav-item">
                                    <button class="btn btn-danger btn-sm float-right"
                                            data-placement="top" data-toggle="tooltip" title="Eliminar">
                                       <i class="fa fa-close"></i>
                                    </button>
                                    <a class="nav-link" style="font-size: .7rem;padding-left: 0px;" href="#!"
                                       data-placement="top" data-toggle="tooltip" title="">
                                       <dl class="">
                                          <dt>Usuario</dt>
                                          <dd>Mensaje adjskdaskdjasdj asjdk sjkdas</dd>
                                       </dl>
                                    </a>
                                 </li>
                                 <li class="nav-item">
                                    <button class="btn btn-danger btn-sm float-right"
                                            data-placement="top" data-toggle="tooltip" title="Eliminar">
                                       <i class="fa fa-close"></i>
                                    </button>
                                    <a class="nav-link" style="font-size: .7rem;padding-left: 0px;" href="#!"
                                       data-placement="top" data-toggle="tooltip" title="">
                                       <dl class="">
                                          <dt>Usuario</dt>
                                          <dd>Mensaje adjskdaskdjasdj asjdk sjkdas</dd>
                                       </dl>
                                    </a>
                                 </li>

                              </ul>
                           </div>
                           --}}

                           {{--
                           <div class="" style="overflow-y: scroll;max-height: 600px;z-index: 0 !important;">

                              <ul class="nav flex-column">

                                 <li class="nav-item">
                                    <button class="btn btn-danger btn-sm float-right"
                                            data-placement="top" data-toggle="tooltip" title="Eliminar">
                                       <i class="fa fa-close"></i>
                                    </button>
                                    <a class="nav-link" style="font-size: .7rem;padding-left: 0px;" href="#!"
                                       data-placement="top" data-toggle="tooltip" title="">
                                       <dl class="">
                                          <dt>Usuario</dt>
                                          <dd>Mensaje adjskdaskdjasdj asjdk sjkdas</dd>
                                       </dl>
                                    </a>
                                 </li>
                                 <li class="nav-item">
                                    <button class="btn btn-danger btn-sm float-right"
                                            data-placement="top" data-toggle="tooltip" title="Eliminar">
                                       <i class="fa fa-close"></i>
                                    </button>
                                    <a class="nav-link" style="font-size: .7rem;padding-left: 0px;" href="#!"
                                       data-placement="top" data-toggle="tooltip" title="">
                                       <dl class="">
                                          <dt>Usuario</dt>
                                          <dd>Mensaje adjskdaskdjasdj asjdk sjkdas</dd>
                                       </dl>
                                    </a>
                                 </li>


                              </ul>

                              <div class=" ">
                                 <div class="" >
                                    <div class="card bg-light mb-3" style="max-width: 18rem;">
                                       <div class="card-header">Header</div>
                                       <div class="card-body">
                                          <h5 class="card-title">Light card title</h5>
                                          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                       </div>
                                    </div>

                                    <div class="card bg-light mb-3" style="max-width: 18rem;">
                                       <div class="card-header">Header</div>
                                       <div class="card-body">
                                          <h5 class="card-title">Light card title</h5>
                                          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                       </div>
                                    </div>

                                    <div class="card bg-light mb-3" style="max-width: 18rem;">
                                       <div class="card-header">Header</div>
                                       <div class="card-body">
                                          <h5 class="card-title">Light card title</h5>
                                          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>

                           </div>
                           --}}

                           <ul class="nav flex-column">
                              <li class="nav-item">

                                 {{--
                                 <i class="fa fa-refresh btn btn-warning" aria-hidden="true"
                                    data-placement="top" data-toggle="tooltip" title="Clic para actualizar mensajes"></i>

                                 <a class="fa fa-compress btn btn-warning"  aria-hidden="true"
                                    data-placement="top" data-toggle="tooltip" title="Clic para cerrar el menu lateral"></a>
                                 --}}

                              </li>
                           </ul>

                           <!--hr-->

                           <span class="small text-center sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                              <b>CATÁLOGO DE SERVICIOS TIC</b>
                           </span>

                           <div class="text-center">
                              <a href="#!">
                                 <img class="img-thumbnail" src="{{url('img/tic_.jpeg')}}" alt="">
                              </a>
                           </div>

                           <ul class="nav flex-column">
                              <li class="nav-item">
                                 <a class="nav-link btn btn-primary text-left" style="font-size: .8rem;" href="#!"
                                    data-placement="top" data-toggle="tooltip" title="">
                                    <span class="sr-only">(current)</span>
                                 </a>
                              </li>

                           </ul>


                        </div>




                     </div>


                  </div>

               </div>
            </div>
            <!-- /#page-content-wrapper -->

         </div>
         <!-- /#wrapper -->












      </div>

   </main>
</div><!-- #FrontController -->

<!-- Scripts -->
{{--<script src="{{ asset('js/app.js') }}"></script>--}}
<script src="{{ asset('js/controllers/SideMenuController.js') }}"></script>

@yield('VueControllers')

<script src="{{url('/js/other_libs/bootstrap-material-design.js')}}"></script>
<script src="{{url('/js/other_libs/popper.js')}}"></script>


<script>
   $(document).ready(function() {
      $('body').bootstrapMaterialDesign();
      $('[data-toggle="tooltip"]').tooltip();
      $('[data-toggle="tooltip"]').tooltip();
   });
</script>

<!-- Menu Toggle Script -->
<script>
   $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");

      if ($("#menu-toggle").text() == 'ABRIR') {
         $("#menu-toggle").text('CERRAR').append('<i style="padding-left:5px;" class="fa fa-unlock-alt" aria-hidden="true"></i>');
      }else{
         $("#menu-toggle").text('ABRIR').append('<i style="padding-left:5px;" class="fa fa-lock" aria-hidden="true"></i>');
      }

   });
   $(".menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
      if ($("#menu-toggle").text() == 'ABRIR') {
         $("#menu-toggle").text('CERRAR').append('<i style="padding-left:5px;" class="fa fa-unlock-alt" aria-hidden="true"></i>');
      }else{
         $("#menu-toggle").text('ABRIR').append('<i style="padding-left:5px;" class="fa fa-lock" aria-hidden="true"></i>');
      }
   });
</script>

</body>
</html>
