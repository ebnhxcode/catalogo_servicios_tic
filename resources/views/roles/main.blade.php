@extends('layouts.app')
@section('content')
   <input type="hidden" name="_token" id="_token" value="{{csrf_token()}}">

   <main role="main" class="col-md-9 ml-sm-auto col-lg-9 pt-3 px-4" id="{{$nombre_controller}}">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
         <h2 class="h2">{{$nombre_detalle}}</h2>


         <div class="btn-toolbar mb-2 mb-md-0">
            <div class="input-group input-group-sm">

               <div class="btn-group mr-2">
                  <input type="text" class="form-control input-sm"
                         data-placement="top" data-toggle="tooltip" title="Filtrar en la lista"
                         placeholder="filtrar" v-model="filtro_head" id="filtro_head">
               </div><!-- .btn-group mr-2 #mr->margin -->

               <div class="btn-group mr-0">
                  <button class="btn btn-sm btn-outline-success"
                          data-placement="top" data-toggle="tooltip" title="Crear nuevo/a {{$nombre_modelo}}"
                          @click.prevent="mostrar_modal_crear">
                     Crear nuevo/a {{$nombre_modelo}}
                  </button>

                  <button class="btn btn-sm btn-outline-secondary dropdown-toggle"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Lista de opciones">
                     Opciones
                  </button>

                  <div class="dropdown-menu">

                     <!-- ############################################# -->
                     <!-- Acá : Inicio modificaciones únicas de negocio -->
                     <!-- ############################################# -->

                     <!-- Esta seccion ya es un componente, se podria estandarizar solo el nombre de los obj para excel -->
                     <download-excel
                        v-if="(excel_data_contador = filterBy(roles, filtro_head).length) > 0"
                        :data="filterBy(roles, filtro_head)"
                        :fields="excel_json_campos"
                        name="roles.xls"
                        class="dropdown-item">
                        Descargar Excel
                     </download-excel>

                     <!-- ############################################ -->
                     <!-- Acá : Final modificaciones únicas de negocio -->
                     <!-- ############################################ -->

                     <a class="dropdown-item" href="#!" @click.prevent="inicializar">
                        Actualizar tabla
                     </a>
                     <a class="dropdown-item" href="#!" @click.prevent="filtro_head=null">
                        Limpiar filtro
                     </a>
                     <div class="dropdown-divider"></div>
                     <a class="dropdown-item" href="{{ url('/home') }}">
                        Volver al menú principal
                     </a>
                  </div>


               </div><!-- .btn-group mr-0 #mr->margin -->


            </div><!-- input-* -->
         </div><!-- .btn .btn-toolbar -->
      </div><!-- .d-flex .justify-* .flex-wrap .flex-md-nowrap .align-items-center -->
      {{--<canvas class="my-4" id="myChart" width="900" height="380"></canvas>--}}





      <!-- ############################################# -->
      <!-- Acá : Inicio modificaciones únicas de negocio -->
      <!-- ############################################# -->

      <!-- Esto puede ser pasado como componente, se le pasa el objeto en json con los campos de la tabla -->
      <template>
         <h5 style="position: relative;">Mostrar\Ocultar opciones de la tabla
            (<small>Clic en un botón para mostrar en grilla</small>)</h5>
         {{--<mini-spinner v-if="mini_spinner_table_inputs == true"></mini-spinner> v-else --}}
         <div class="btn-group btn-group-sm btn-group-toggle" v-for="v,c,i in tabla_roles_campos">
            <label :class="v==true?'btn btn-primary active':'btn btn-secondary'" @click.prevent="cambiar_visibilidad(c)"
                   {{--data-placement="top" data-toggle="tooltip" :title="`Clic para ${(v==true)?'ocultar':'mostrar'}`">--}}
                   data-placement="top" data-toggle="tooltip" title="Clic para mostrar u ocultar">
               <input type="checkbox" autocomplete="off"> <span style="font-size: 85%;">@{{ tabla_roles_labels[c] }}</span>
            </label>
         </div>
      </template>
      <br />
      <br />

      <!-- ############################################ -->
      <!-- Acá : Final modificaciones únicas de negocio -->
      <!-- ############################################ -->



      <!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
      <!-- Acá : Esta seccion puede ser completamente heredable como body del main -->
      <!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->

      <h4 class="h4">Lista de {{$nombre_detalle}}</h4>
      <!-- Sección de la tabla que lista los elementos del módulo -->
      <div class="table-responsive">
         <!-- dir ./partials -->
         @include("$nombre_tabla.partials.tabla_listar")
      </div>

      <!-- Sección de los modals que despliegan segun la gestión -->
      <div>
         <!-- dir ./partials -->
         @include("$nombre_tabla.partials.modal_crear")
         @include("$nombre_tabla.partials.modal_actualizar")
      </div>

      {{--<notifications group="top_center" position="top center" />--}}
      {{--<v-dialog/>--}}
      <notifications group="global" position="bottom right" />

      <!-- Para cada modulo establecer estas funcionalidades parametricas como opciones configurables -->
      <!-- Por lo tanto podemos dejar estas opciones como datos en una bd segun modulo:usuario -->
      <!-- Opciones como colores, templates especiales, etc -->



   </main>

@endsection

@section('VueControllers')
   <script src="{{ asset("js/controllers/$nombre_controller.js") }}"></script>
@endsection