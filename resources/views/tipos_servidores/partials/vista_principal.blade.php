<div class="row">
   <div class="col-sm-4 col-md-4">

      <!-- este bloque será reemplazado dinamicamente -->
      <div class="card pro" style="{{--width: 18rem;--}}">
         <img class="card-img-top" src="{{ url('/img/tipo_servidor.jpg') }}" alt="Card image cap">
         <div class="card-body">
            <h5 class="card-title">
               @{{ tipo_servidor.nom_tipo_servidor || '' }}
            </h5>
            <p class="card-text">

            <dl class="row" v-if="tipo_servidor">

               <dd class="col-md-12">@{{ tipo_servidor.det_tipo_servidor || '' }}</dd>

            </dl>

            <dl v-else>
               No hay información del tipo de servidor.
            </dl>

            </p>
            {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
         </div><!-- .card-body -->
      </div><!-- .card -->

      <br>
   </div><!-- .col -->

</div><!-- .row -->