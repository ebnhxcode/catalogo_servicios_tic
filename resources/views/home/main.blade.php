@extends('layouts.app')
@section('content')
   <input type="hidden" name="_token" id="_token" value="{{csrf_token()}}">
   <main role="main" class="ml-sm-auto {{-- col-md-12  col-lg-12 pt-3 px-4--}}" id="{{$nombre_controller}}">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 sticky-top">
         &nbsp;
         <h2 class="h2" style="padding-top: 10px;">{{$nombre_detalle}}</h2>

         <div class="input-group input-group-sm">
               <input type="text" class="form-control" style="padding-left: 10px;padding-top: 0px !important;"
                      data-placement="top" data-toggle="tooltip" title="FILTRAR"
                      placeholder="FILTRAR" v-model="filtro_head" id="filtro_head">
         </div><!-- input-* -->

      </div><!-- .d-flex .justify-* .flex-wrap .flex-md-nowrap .align-items-center -->


      <div v-if="home_items && home_items.length > 0">
         <h3>
            <i class="fa fa-sort-alpha-asc btn btn-info btn-sm float-right" @click.prevent="cambiar_orden_lista('nom_menu','home_items')" aria-hidden="true"
               data-placement="top" data-toggle="tooltip" title="Clic para ordenar menu principal"></i>
            Menu Principal
         </h3>

         <div class="card-deck{{--card-columns--}}" v-show="filterBy(home_items, filtro_head).length > 0">
            <div class="card bg-primary text-white border-light mb-12" v-for="i in filterBy(home_items, filtro_head)">
               <div class="card-header">@{{ i.nom_menu }}</div>
               <div class="img-responsive">
                  <img class="card-img-top" :src="i.imagen_menu || `/img/logo180-180.png`">
               </div>
               <div class="card-body">
                  <h5 class="card-title">
                     <div class="media">
                        {{--
                        <img class="rounded-left img-responsive mr-3" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1621b9e4a02%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1621b9e4a02%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2213.0546875%22%20y%3D%2236.5%22%3E64x64%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                             alt="" style="width: 32px; height: 32px;">
                        --}}
                        <i :class="i.font_icon_menu" aria-hidden="true"></i>
                        &nbsp;&nbsp;&nbsp;
                        <div class="media-body">
                           <h5 class="mt-0">@{{ i.nom_menu }}</h5>
                           <p style="font-size: 14px;">
                              @{{ i.det_menu }}
                           </p>
                        </div>
                     </div>
                  </h5>
                  <p class="card-text">

                  </p>
               </div><!-- -card-body -->
               <div class="card-footer">
                  <form :action="i.url_menu" method="GET">
                     <button type="submit" class="btn btn-primary">
                        <i class="fa fa-sign-in" aria-hidden="true"></i>
                        Ingresar
                     </button>
                  </form>
               </div>
            </div><!-- .card -->

         </div><!-- .card-columns -->

         <div v-show="filterBy(home_items, filtro_head).length <= 0">No se encontró lo que buscas ${`@{{ filtro_head }}`}</div>
      </div>

      <hr>


      <div v-if="mantenedores && mantenedores.length > 0">
         <h3>
            <i class="fa fa-sort-alpha-asc btn btn-info btn-sm float-right" @click.prevent="cambiar_orden_lista('nom_mantenedor','mantenedores')" aria-hidden="true"
               data-placement="top" data-toggle="tooltip" title="Clic para ordenar mantenedores"></i>
            Mantenedores
         </h3>

         <div class="card-columns" v-show="filterBy(mantenedores, filtro_head).length > 0">

               <div class="card bg-secondary text-white border-light mb-12" v-for="m in filterBy(mantenedores, filtro_head)">

                  <div class="card-header">@{{ m.nom_mantenedor }}</div>
                  <div class="img-responsive">
                     <img class="card-img-top" :src="`/img/mosaicomini.jpg`" /><!-- m.imagen_mantenedor ||  -->
                  </div>
                  <div class="card-body">
                     <h5 class="card-title">
                        <div class="media">
                           <i :class="m.font_icon_mantenedor" aria-hidden="true"></i>
                           &nbsp;&nbsp;&nbsp;
                           <div class="media-body">
                              <p style="font-size: 12px;">
                                 @{{ m.det_mantenedor }}
                              </p>
                           </div>
                        </div>
                     </h5>
                     <p class="card-text">

                     </p>
                  </div><!-- -card-body -->
                  <div class="card-footer">
                     <a :href="`${m.url_mantenedor}`" class="btn-link">
                           <i class="fa fa-sign-in"></i>
                           Ingresar
                     </a>
                  </div>
               </div><!-- .card -->

            </div><!-- .card-columns -->


         <div v-show="filterBy(mantenedores, filtro_head).length <= 0">No se encontró lo que buscas ${`@{{ filtro_head }}`}</div>
      </div>

      <notifications group="global" position="bottom right" />

   </main>



@endsection

@section('VueControllers')
   <script src="{{ asset("js/controllers/$nombre_controller.js") }}"></script>
@endsection