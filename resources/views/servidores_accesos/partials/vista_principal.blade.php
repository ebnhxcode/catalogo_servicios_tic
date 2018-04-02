<div class="row">
   <div class="col-sm-4 col-md-4">

      <!-- este bloque será reemplazado dinamicamente -->
      <div class="card pro" style="{{--width: 18rem;--}}">
         <img class="card-img-top" src="{{ url('/img/servidor_acceso.png') }}" alt="Card image cap">
         <div class="card-body">
            <h5 class="card-title">
               @{{ servidor_acceso.usuario || '' }}
            </h5>
            <p class="card-text">

            <dl class="row" v-if="servidor_acceso">

               <dt class="col-md-6">Tipo acceso</dt>
               <dd class="col-md-6">@{{ servidor_acceso.tipo_acceso || '' }}</dd>

               <dt class="col-md-6">Puerto</dt>
               <dd class="col-md-6">@{{ servidor_acceso.puerto || '' }}</dd>

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