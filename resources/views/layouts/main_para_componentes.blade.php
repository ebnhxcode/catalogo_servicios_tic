@extends('layouts.app_para_componentes')
@section('content')


   <input type="hidden" name="_token" id="_token" value="{{csrf_token()}}">

   <main role="main" class="ml-sm-auto {{--pt-3 px-4--}}" id="{{$nombre_controller}}">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
         <h2 class="h2">{{$nombre_detalle}}</h2>


         <div class="btn-toolbar mb-2 mb-md-0">
            <div class="input-group input-group-sm">

               <div class="btn-group mr-0 pro">
                  <button class="btn btn-light btn-success"
                          v-if="en_array(['Administrador','Jefe de Area','Lider Equipo','Jefe Proyecto','App Manager'],usuario_auth.usuario_role.role.nom_role)"
                          data-placement="top" data-toggle="tooltip" title="Crear nuevo/a {{$nombre_modelo}}"
                          @click.prevent="mostrar_modal_crear">
                     Crear {{str_replace('_',' ',$nombre_modelo)}}
                  </button>

                  <button class="btn btn-sm btn-light btn-secondary dropdown-toggle"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Lista de opciones">
                     Opciones
                  </button>

                  <div class="dropdown-menu">
                     <!-- Esta seccion ya es un componente, se podria estandarizar solo el nombre de los obj para excel -->
                     <download-excel
                        v-if="(excel_data_contador = filterBy(datos_excel, filtro_head).length) > 0 &&
                           en_array(['Administrador','Jefe de Area','Lider Equipo'],usuario_auth.usuario_role.role.nom_role)"
                        :data="filterBy(datos_excel, filtro_head)"
                        :fields="excel_json_campos"
                        name="datos_excel.xls"
                        class="dropdown-item">
                        Descargar Excel
                     </download-excel>

                     <a class="dropdown-item" href="#!" @click.prevent="inicializar">
                        Actualizar tabla
                     </a>
                     <a class="dropdown-item" href="#!" @click.prevent="filtro_head=null">
                        Limpiar filtro
                     </a>
                     <div class="dropdown-divider"></div>
                  </div>
               </div><!-- .btn-group mr-0 #mr->margin -->


            </div><!-- input-* -->
         </div><!-- .btn .btn-toolbar -->
      </div><!-- .d-flex .justify-* .flex-wrap .flex-md-nowrap .align-items-center -->
      {{--<canvas class="my-4" id="myChart" width="900" height="380"></canvas>--}}

         <!-- Esto puede ser pasado como componente, se le pasa el objeto en json con los campos de la tabla -->
      <template>
         <h5 style="position: relative;">TABLERO</h5>{{--Mostrar\Ocultar opciones de la tabla--}}
            {{--(<small>Clic en un botón para mostrar en grilla</small>)</h5>--}}
         {{--<mini-spinner v-if="mini_spinner_table_inputs == true"></mini-spinner> v-else --}}
         <div class="pro btn-group btn-group-sm btn-group-toggle" v-for="v,c,i in tabla_campos">
            <label :class="v==true?'btn btn-success active':'btn btn-light'" @click.prevent="cambiar_visibilidad(c)"
                   {{--data-placement="top" data-toggle="tooltip" :title="`Clic para ${(v==true)?'ocultar':'mostrar'}`">--}}
                   data-placement="top" data-toggle="tooltip" title="Clic para mostrar u ocultar">
               <input type="checkbox" autocomplete="off">
         <span style="font-size: 85%;">
            <i class="fa fa-check" v-if="v==true"></i>
            {{--<i class="fa fa-eye" v-if="v==true"></i>--}}
            @{{ tabla_labels[c] }}
         </span>
            </label>
         </div>
      </template>

      <br />
      <br />

      <h4>
         <div class="pro float-right">
            <input type="text" class="form-control input-sm"
                   data-placement="top" data-toggle="tooltip" title="Filtrar en la lista"
                   placeholder="Filtrar en la lista" v-model="filtro_head" id="filtro_head">
         </div><!-- .btn-group mr-2 #mr->margin -->

         Lista de {{$nombre_detalle}}
      </h4>
      <br>
      <!-- Sección de la tabla que lista los elementos del módulo -->
      <div class="table-responsive pro">
         <!-- dir ./partials -->
         @include("layouts.tabla_listar")
      </div>


      <div>
         <!-- dir ./partials -->
         @include("layouts.modal.modal_crear")
         @include("layouts.modal.modal_actualizar")
         {{--
         @if(view()->exists("$nombre_tabla.partials.modal_crear"))
            @include("layouts.modal.modal_crear")
         @endif
         @if(view()->exists("$nombre_tabla.partials.modal_actualizar"))
            @include("layouts.modal.modal_actualizar")
         @endif
         --}}

      </div>

      {{--<notifications group="top_center" position="top center" />--}}
      {{--<v-dialog/>--}}
      <notifications group="global" position="bottom right" />

      {{-- Se habilitara cuando se implemente el vuerouter --}}
      {{--<vue-progress-bar></vue-progress-bar>--}}

   </main>



@endsection

@section('VueControllers')
   <script src="{{ asset("js/controllers/$nombre_controller.js") }}"></script>
@endsection