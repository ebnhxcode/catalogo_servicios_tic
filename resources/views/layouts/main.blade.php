@extends('layouts.app')
@section('content')
   <input type="hidden" name="_token" id="_token" value="{{csrf_token()}}">
   <main role="main" class="ml-sm-auto {{--pt-3 px-4--}}" id="{{$nombre_controller}}">
      <div class="{{----}} flex-md-nowrap flex-wrap align-items-center d-flex justify-content-between pb-2 mb-3 sticky-top"
           style="z-index: 10;">
         &nbsp;
         <h2 class="h2" style="padding-top: 10px;">{{$nombre_detalle}}</h2>

         <div class="btn-toolbar mb-2 mb-md-0">
            <div class="input-group input-group-sm">
               {{--
               <div class="btn-group mr-2 pro">
                  <input type="text" class="form-control input-sm"
                         data-placement="top" data-toggle="tooltip" title="FILTRAR EN LA LISTA"
                         placeholder="FILTRAR EN LA LISTA" v-model="filtro_head" id="filtro_head">
               </div><!-- .btn-group mr-2 #mr->margin -->
               --}}

               <div class="btn-group mr-0 ml-auto d-md-block d-sm-none">

                  <a href="{{url('/home')}}" class="btn btn-secondary"
                          data-placement="top" data-toggle="tooltip" title="Volver al menú">
                     <i class="fa fa-arrow-left" aria-hidden="true"></i>
                     Ir al Menu
                  </a>

                  <button class="btn btn-success"
                          v-if="en_array(['Administrador','Jefe de Area','Lider Equipo','Jefe Proyecto','App Manager'],usuario_auth.usuario_role.role.nom_role)"
                          data-placement="top" data-toggle="tooltip" title="Crear nuevo/a {{$nombre_modelo}}"
                          @click.prevent="mostrar_modal_crear">
                     Crear {{str_replace('_',' ',$nombre_modelo)}}
                  </button>

                  <button class="btn btn-secondary dropdown-toggle"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Lista de opciones">
                     Opciones
                  </button>

                  <div class="dropdown-menu">
                     <!-- Esta seccion ya es un componente, se podria estandarizar solo el nombre de los obj para excel -->
                     <download-excel
                        v-if="(excel_data_contador = filterBy(datos_excel, filtro_head).length) > 0 &&
                           en_array(['Administrador','Jefe de Area','Lider Equipo','App Manager'],usuario_auth.usuario_role.role.nom_role)"
                        :data="filterBy(excel_json_datos, filtro_head)"
                        :fields="excel_json_campos"
                        :labels="tabla_labels"
                        :name="`${nombre_tabla}.xls`"
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
                     <a class="dropdown-item" href="{{ url('/home') }}">
                        Volver al menú principal
                     </a>

                  </div>
               </div><!-- .btn-group mr-0 #mr->margin -->


            </div><!-- input-* -->
         </div><!-- .btn .btn-toolbar -->
      </div><!-- .d-flex .justify-* .flex-wrap .flex-md-nowrap .align-items-center -->
      {{--<canvas class="my-4" id="myChart" width="900" height="380"></canvas>--}}

         <!-- Esto puede ser pasado como componente, se le pasa el objeto en json con los campos de la tabla -->
      <template>
         <h5 style="position: relative;">TABLERO{{--Mostrar\Ocultar opciones de la tabla--}}</h5>
            {{--(<small>Clic en un botón para mostrar en grilla</small>)</h5>--}}
         {{--<mini-spinner v-if="mini_spinner_table_inputs == true"></mini-spinner> v-else --}}
         <div class="pro btn-group btn-group-sm btn-group-toggle" v-for="v,c,i in tabla_campos" style="z-index: 0 !important;">
            <label :class="v==true?'btn btn-success active':'btn btn-secondary'" @click.prevent="cambiar_visibilidad(c)"
                   {{--data-placement="top" data-toggle="tooltip" :title="`Clic para ${(v==true)?'ocultar':'mostrar'}`">--}}
                   data-placement="top" data-toggle="tooltip" title="Clic para mostrar u ocultar">
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

      <div class="row">
         <div class="col-sm-12">
            <div class="btn-group mr-0 ml-auto d-sm-block d-md-none">

               <a href="{{url('/home')}}" class="btn btn-secondary"
                  data-placement="top" data-toggle="tooltip" title="Volver al menú">
                  <i class="fa fa-arrow-left" aria-hidden="true"></i>
                  Ir al Menu
               </a>

               <button class="btn btn-success"
                       v-if="en_array(['Administrador','Jefe de Area','Lider Equipo','Jefe Proyecto','App Manager'],usuario_auth.usuario_role.role.nom_role)"
                       data-placement="top" data-toggle="tooltip" title="Crear nuevo/a {{$nombre_modelo}}"
                       @click.prevent="mostrar_modal_crear">
                  Crear {{str_replace('_',' ',$nombre_modelo)}}
               </button>

               <button class="btn btn-secondary dropdown-toggle"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Lista de opciones">
                  Opciones
               </button>

               <div class="dropdown-menu">
                  <!-- Esta seccion ya es un componente, se podria estandarizar solo el nombre de los obj para excel -->
                  <download-excel
                     v-if="(excel_data_contador = filterBy(datos_excel, filtro_head).length) > 0 &&
                           en_array(['Administrador','Jefe de Area','Lider Equipo','App Manager'],usuario_auth.usuario_role.role.nom_role)"
                     :data="filterBy(excel_json_datos, filtro_head)"
                     :fields="excel_json_campos"
                     :labels="tabla_labels"
                     :name="`${nombre_tabla}.xls`"
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
                  <a class="dropdown-item" href="{{ url('/home') }}">
                     Volver al menú principal
                  </a>

               </div>
            </div><!-- .btn-group mr-0 #mr->margin -->
         </div>

         <div class="col-sm-12">

            <div>

               <!-- Filtro grid -->
               <div class="float-right" style="padding-left: 15px;">
                  <input type="text" class="form-control input-sm"
                         data-placement="top" data-toggle="tooltip" title="FILTRAR EN LA LISTA"
                         placeholder="FILTRAR EN LA LISTA" v-model="filtro_head" id="filtro_head">
               </div><!-- .btn-group mr-2 #mr->margin -->

               <!-- Cantidad a paginar -->
               <div class="float-right" style="padding-left: 15px;">
                  <select v-model="pagination.per_page" @change="navigateCustom"
                          class="custom-select custom-select-sm btn btn-outline-success">
                     <option selected disabled>@{{ pagination.per_page }}</option>
                     <option :value="5">5</option>
                     <option :value="10">10</option>
                     <option :value="15">15</option>
                     <option :value="20">20</option>
                     <option :value="25">25</option>
                     <option :value="30">30</option>
                     <option :value="35">35</option>
                     <option :value="40">40</option>
                     <option :value="45">45</option>
                     <option :value="50">50</option>
                     <option :value="100">100</option>
                     <option :value="250">250</option>
                     <option :value="500">500</option>
                     <option :value="750">750</option>
                     <option :value="1250">1250</option>
                     <option :value="1500">1500</option>
                     <option :value="1750">1750</option>
                     <option :value="2000">2000</option>
                  </select>

               </div>

               <!-- Componente paginador -->
               <div class="float-right" style="padding-left: 15px;">
                  <paginators :pagination="pagination" @navigate="navigate"></paginators>
               </div>

               <span class="h5">
                  Lista de {{$nombre_detalle}}
               </span>

            </div>

         </div>

         <!-- Filtro detalle -->
         <div class="col-sm-12">
            <div class="col-sm-12" v-if="filterBy(lista_objs_model, filtro_head).length">
               <small class="float-right">@{{ filterBy(lista_objs_model, filtro_head).length || 0 }} resultados.</small>
            </div>
            <div class="col-sm-12" v-else>
               <small class="float-right">
                  @{{ `Sin resultados para` }} ${`@{{ `${filtro_head}` }}`}
               </small>
            </div>

         </div>
      </div>



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