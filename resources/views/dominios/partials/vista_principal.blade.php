<div class="tab-pane active" id="vista_principal_tab" role="tabpanel" aria-labelledby="vista_principal_tab">

   <br>

   <div class="row">
      <div class="col-sm-4 col-md-4">

         <!-- este bloque será reemplazado dinamicamente -->
         <div class="card" style="{{--width: 18rem;--}}">
            <img class="card-img-top" src="{{ url('/img/dominio.png') }}" alt="Card image cap">
            <div class="card-body">
               <h5 class="card-title">
                  @{{ dominio.nom_dominio || '' }}
               </h5>
               <p class="card-text">

               <dl class="row" v-if="dominio">

                  <dd class="col-md-12">@{{ dominio.det_dominio || '' }}</dd>

               </dl>

               <dl v-else>
                  No hay información del dominio.
               </dl>

               </p>
               {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
            </div><!-- .card-body -->
         </div><!-- .card -->

         <br>





      </div><!-- .col -->


   </div><!-- .row -->



</div><!-- .tab-pane .active #vista_principal_tab -->