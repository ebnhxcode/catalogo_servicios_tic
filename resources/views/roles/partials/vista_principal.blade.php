<div class="row">
   <div class="col-sm-4 col-md-4">

      <!-- este bloque será reemplazado dinamicamente -->
      <div class="card pro" style="{{--width: 18rem;--}}">
         <img class="card-img-top" src="{{ url('/img/role.jpg') }}" alt="Card image cap">
         <div class="card-body">
            <h5 class="card-title">
               @{{ role.nom_role || '' }}
            </h5>
            <p class="card-text">

            <dl class="row" v-if="role">

               <dd class="col-md-12">@{{ role.det_role || '' }}</dd>

            </dl>

            <dl v-else>
               No hay información del role.
            </dl>

            </p>
            {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
         </div><!-- .card-body -->
      </div><!-- .card -->

      <br>

      <!-- este bloque será reemplazado dinamicamente -->
      <div class="card pro" style="{{--width: 18rem;--}}">
         <div class="card-body">
            <h5 class="card-title">
               Permiso
            </h5>
            <p class="card-text">

            <dl class="row" v-if="role.role_permiso">

               <dt class="col-md-6">Nombre permiso</dt>
               <dd class="col-md-6">@{{ role.role_permiso.permiso.nom_permiso }}</dd>

               <dt class="col-md-6">Detalle permiso</dt>
               <dd class="col-md-6">@{{ role.role_permiso.permiso.det_permiso }}</dd>

               <dt class="col-md-6">Código permiso</dt>
               <dd class="col-md-6">@{{ role.role_permiso.permiso.cod_permiso }}</dd>

            </dl>
            <dl v-else>
               No hay información de permisos.
            </dl>

            </p>
            {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
         </div><!-- .card-body -->
      </div><!-- .card -->
   </div><!-- .col -->

</div><!-- .row -->
