<div class="row">
   <div class="col-sm-4 col-md-4">

      <!-- este bloque será reemplazado dinamicamente -->
      <div class="card pro" style="{{--width: 18rem;--}}">
         <img class="card-img-top" src="{{ url('/img/bitacora.png') }}" alt="Card image cap">
         <div class="card-body">
            <h5 class="card-title">
               @{{ usuario_bitacora_servicio.asunto || '' }}
            </h5>
            <p class="card-text">

            <dl class="row" v-if="usuario_bitacora_servicio">

               <dd class="col-md-12">@{{ usuario_bitacora_servicio.det_bitacora || '' }}</dd>

            </dl>

            <dl v-else>
               No hay bitácoras ingresadas.
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