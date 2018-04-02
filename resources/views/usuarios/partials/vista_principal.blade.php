<div class="row">
   <div class="col-sm-4 col-md-4">

      <!-- este bloque será reemplazado dinamicamente -->
      <div class="card pro" style="{{--width: 18rem;--}}">
         <img class="card-img-top" src="{{ url('/img/usuario.jpg') }}" alt="Card image cap">
         <div class="card-body">
            <h5 class="card-title">
               @{{ usuario.nom_usuario || '' }}
            </h5>
            <p class="card-text">

            <dl class="row" v-if="usuario">


               <dt class="col-md-6">Email</dt>
               <dd class="col-md-6">@{{ usuario.email || '' }}</dd>

               <dt class="col-md-6">Nombre de usuario</dt>
               <dd class="col-md-6">@{{ usuario.username || '' }}</dd>

               <dt class="col-md-6">Creado en</dt>
               <dd class="col-md-6">@{{ usuario.created_at || '' }}</dd>

            </dl>

            <dl v-else>
               No hay información del usuario.
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
               Role
            </h5>
            <p class="card-text">

            <dl class="row" v-if="usuario.usuario_role">

               <dt class="col-md-6">Role usuario</dt>
               <dd class="col-md-6">@{{ usuario.usuario_role.role.nom_role }}</dd>

               <dt class="col-md-6">Detalle Role</dt>
               <dd class="col-md-6">@{{ usuario.usuario_role.role.det_role }}</dd>

            </dl>
            <dl v-else>
               No hay información de role de usuario.
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
               Estado
            </h5>
            <p class="card-text">

            <dl class="row" v-if="usuario.usuario_estado">

               <dt class="col-md-6">Estado usuario</dt>
               <dd class="col-md-6">@{{ usuario.usuario_estado.estado.nom_estado }}</dd>

               <dt class="col-md-6">Detalle estado</dt>
               <dd class="col-md-6">@{{ usuario.usuario_estado.estado.det_estado }}</dd>

            </dl>
            <dl v-else>
               No hay información de estado de usuario.
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
               Cargos
            </h5>
            <p class="card-text">

            <dl class="row" v-if="usuario.usuario_cargo">

               <dt class="col-md-6">Cargo usuario</dt>
               <dd class="col-md-6">@{{ usuario.usuario_cargo.cargo.nom_cargo }}</dd>

               <dt class="col-md-6">Detalle cargo</dt>
               <dd class="col-md-6">@{{ usuario.usuario_cargo.cargo.det_cargo }}</dd>

            </dl>
            <dl v-else>
               No hay información de cargos de usuario.
            </dl>

            </p>
            {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
         </div><!-- .card-body -->
      </div><!-- .card -->


   </div><!-- .col -->

   <div class="col-sm-8 col-md-8">

      <h4>Bitácora del usuario</h4>

      <table class="table table-striped table-hover table-sm" v-if="usuario.usuario_bitacora_servicios &&
            usuario.usuario_bitacora_servicios.length > 0">
         <thead>
         <tr>
            <th>Asunto</th>
            <th>Descripción</th>
            <th>Fecha</th>
         </tr>
         </thead>
         <tbody>
         <tr v-for="b in usuario.usuario_bitacora_servicios">
            <td>@{{ b.asunto }}</td>
            <td>@{{ b.det_bitacora }}</td>
            <td>@{{ b.created_at }}</td>
         </tr>
         </tbody>

      </table><!-- .table -->
      <div class="card card-body bg-light" v-else>
         Hasta el momento no existen bitacoras asociadas al usuario.
      </div><!-- .card -->


   </div><!-- .col -->



</div><!-- .row -->