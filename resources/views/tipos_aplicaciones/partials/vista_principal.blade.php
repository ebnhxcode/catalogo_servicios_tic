<div class="row">
   <div class="col-sm-4 col-md-4">

      <!-- este bloque será reemplazado dinamicamente -->
      <div class="card pro" style="{{--width: 18rem;--}}">
         <img class="card-img-top" src="{{ url('/img/tipo_aplicacion.jpg') }}" alt="Card image cap">
         <div class="card-body">
            <h5 class="card-title">
               @{{ tipo_aplicacion.nom_tipo_aplicacion || '' }}
            </h5>
            <p class="card-text">

            <dl class="row" v-if="tipo_aplicacion">

               <dd class="col-md-12">@{{ tipo_aplicacion.det_tipo_aplicacion || '' }}</dd>

            </dl>

            <dl v-else>
               No hay información del tipo de aplicacion.
            </dl>

            </p>
            {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
         </div><!-- .card-body -->
      </div><!-- .card -->

      <br>
   </div><!-- .col -->

</div><!-- .row -->