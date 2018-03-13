<div class="tab-pane active" id="vista_principal_tab" role="tabpanel" aria-labelledby="vista_principal_tab">

   <br>

   <div class="row">
      <div class="col-sm-4 col-md-4">

         <!-- este bloque será reemplazado dinamicamente -->
         <div class="card" style="{{--width: 18rem;--}}">
            <img class="card-img-top" src="{{ url('/img/permiso.jpg') }}" alt="Card image cap">
            <div class="card-body">
               <h5 class="card-title">
                  @{{ permiso.nom_permiso || '' }}
               </h5>
               <p class="card-text">

               <dl class="row" v-if="permiso">
                  <dd class="col-md-12">@{{ permiso.det_permiso || '' }}</dd>

                  <dt class="col-md-6">Código permiso</dt>
                  <dd class="col-md-6">@{{ permiso.cod_permiso || '' }}</dd>
               </dl>

               <dl v-else>
                  No hay información del permiso.
               </dl>

               </p>
               {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
            </div><!-- .card-body -->
         </div><!-- .card -->

         <br>

      </div><!-- .col -->


   </div><!-- .row -->

</div><!-- .tab-pane .active #vista_principal_tab -->