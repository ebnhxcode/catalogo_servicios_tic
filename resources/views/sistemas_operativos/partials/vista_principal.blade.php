<div class="row">
   <div class="col-sm-4 col-md-4">

      <!-- este bloque será reemplazado dinamicamente -->
      <div class="card pro" style="{{--width: 18rem;--}}">
         <img class="card-img-top" src="{{ url('/img/sistema_operativo.png') }}" alt="Card image cap">
         <div class="card-body">
            <h5 class="card-title">
               @{{ sistema_operativo.nom_sistema_operativo || '' }}
            </h5>
            <p class="card-text">

            <dl class="row" v-if="sistema_operativo">

               <dd class="col-md-12">@{{ sistema_operativo.det_sistema_operativo || '' }}</dd>

            </dl>

            <dl v-else>
               No hay información del sistema_operativo.
            </dl>

            </p>
            {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
         </div><!-- .card-body -->
      </div><!-- .card -->

      <br>
   </div><!-- .col -->

</div><!-- .row -->
