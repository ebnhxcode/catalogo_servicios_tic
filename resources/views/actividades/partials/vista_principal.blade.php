<div class="row">
   <div class="col-sm-4 col-md-4">

      <!-- este bloque será reemplazado dinamicamente -->
      <div class="card pro" style="{{--width: 18rem;--}}">
         <img class="card-img-top" src="{{ url('/img/shutterstock.jpg') }}" alt="Card image cap">
         <div class="card-body">
            <h5 class="card-title">
               @{{ actividad.nom_actividad || '' }}
            </h5>
            <p class="card-text">

            <dl class="row" v-if="actividad">

               <dd class="col-md-12">@{{ actividad.det_actividad || '' }}</dd>

            </dl>

            <dl v-else>
               No hay información de la actividad.
            </dl>

            </p>
            {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
         </div><!-- .card-body -->
      </div><!-- .card -->

      <br>

   </div><!-- .col -->

   <div class="col-sm-8 col-md-8">



   </div><!-- .col -->


</div><!-- .row -->