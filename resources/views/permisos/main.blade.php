@extends('layouts.app')
@section('content')
   <input type="hidden" name="_token" id="_token" value="{{csrf_token()}}">

   <main role="main" class="col-md-9 ml-sm-auto col-lg-9 pt-3 px-4" id="PermisoController">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
         <h2 class="h2">Permisos</h2>


         <div class="btn-toolbar mb-2 mb-md-0">
            <div class="input-group input-group-sm">

               <div class="btn-group mr-2">
                  <input type="text" class="form-control input-sm"
                      placeholder="filtrar" v-model="filtro_head" id="filtro_head">
               </div><!-- .btn-group mr-2 #mr->margin -->

               <div class="btn-group mr-0">
                  <button class="btn btn-sm btn-outline-success" @click.prevent="mostrar_modal_crear">
                     Crear nuevo permiso
                  </button>

                  <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
                     Opciones
                  </button>

               </div><!-- .btn-group mr-0 #mr->margin -->


            </div><!-- input-* -->
         </div><!-- .btn .btn-toolbar -->
      </div><!-- .d-flex .justify-* .flex-wrap .flex-md-nowrap .align-items-center -->
      {{--<canvas class="my-4" id="myChart" width="900" height="380"></canvas>--}}


      <h4 class="h4">Lista de permisos</h4>
      <!-- Sección de la tabla que lista los elementos del módulo -->
      <div class="table-responsive">
         <!-- dir ./partials -->
         @include('permisos.partials.tabla_listar')
      </div>

      <!-- Sección de los modals que despliegan segun la gestión -->
      <div>
         <!-- dir ./partials -->
         @include('permisos.partials.modal_crear')
         @include('permisos.partials.modal_actualizar')
      </div>


   </main>

@endsection

@section('VueControllers')
   <script src="{{ asset('js/controllers/PermisoController.js') }}"></script>
@endsection