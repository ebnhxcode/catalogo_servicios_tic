<div class="row">
   <div class="col-sm-4 col-md-4">

      <!-- este bloque será reemplazado dinamicamente -->
      <div class="card pro" style="{{--width: 18rem;--}}">
         <img class="card-img-top" src="{{ url('/img/aplicaciones_accesos.png') }}" alt="Card image cap">
         <div class="card-body">
            <h5 class="card-title">
               @{{ aplicacion_acceso.usuario || '' }}
            </h5>
            <p class="card-text">

            <dl class="row" v-if="aplicaciones_accesos">

               <dt class="col-md-6">Tipo acceso</dt>
               <dd class="col-md-6">@{{ aplicacion_acceso.tipo_acceso || '' }}</dd>

               <dt class="col-md-6">Puerto</dt>
               <dd class="col-md-6">@{{ aplicacion_acceso.email || '' }}</dd>

            </dl>

            <dl v-else>
               No hay información de acceso.
            </dl>

            </p>
            {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
         </div><!-- .card-body -->
      </div><!-- .card -->

      <br>

   </div><!-- .col -->

</div><!-- .row -->