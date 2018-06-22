<!-- Opciones Avanzadas -->

<div class="row">
   <div class="nav flex-column nav-pills col-sm-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">

      <!-- Registro de opciones en nav de opciones adicionales -->

      <a class="nav-link active" id="v-pills-aplicaciones-tab" data-toggle="pill" href="#v-pills-aplicaciones" role="tab"
         aria-controls="v-pills-aplicaciones" aria-selected="true">
         <i class="fa fa-plus-circle"></i>
         Aplicaciones
      </a>

      <a class="nav-link" id="v-pills-aplicaciones-accesos-tab" data-toggle="pill" href="#v-pills-aplicaciones-accesos" role="tab"
         aria-controls="v-pills-aplicaciones-accesos" aria-selected="false">
         <i class="fa fa-plus-circle"></i>
         Accesos aplicaciones
      </a>

      <a class="nav-link" id="v-pills-servidores-accesos-tab" data-toggle="pill" href="#v-pills-servidores-accesos" role="tab"
         aria-controls="v-pills-servidores-accesos" aria-selected="false">
         <i class="fa fa-plus-circle"></i>
         Accesos servidores
      </a>

      {{--
      <template v-if="usuario_auth.usuario_role&&
         en_array(['Administrador','Jefe de Area','Lider Equipo','App Manager'],usuario_auth.usuario_role.role.nom_role)">
         <a class="nav-link" id="v-pills-datacentro-tab" data-toggle="pill" href="#v-pills-datacentro" role="tab"
            aria-controls="v-pills-datacentro" aria-selected="false">
            Datacentro
         </a>
         <a class="nav-link" id="v-pills-historial-tab" data-toggle="pill" href="#v-pills-historial" role="tab"
            aria-controls="v-pills-historial" aria-selected="false">
            Historial de cambios en este servidor
         </a>
      </template>
      --}}

   </div>

   <div class="tab-content col-sm-10" id="v-pills-tabContent">

      <!-- Contenido del formulario nueva aplicacion -->
      @include('servidores.partials.segments.nueva_aplicacion')

      <!-- Contenido del formulario nueva aplicacion -->
      @include('servidores.partials.segments.nueva_credencial_aplicacion')

      <!-- Contenido del formulario nueva aplicacion -->
      @include('servidores.partials.segments.nueva_credencial_servidor')

      {{--
      <template v-if="en_array(['Administrador','Jefe de Area','Lider Equipo','App Manager'],usuario_auth.usuario_role.role.nom_role)">

         <div class="tab-pane fade" id="v-pills-datacentro" role="tabpanel" aria-labelledby="v-pills-datacentro-tab">
            <div class="embed-responsive embed-responsive-16by9 pro">
               <iframe style="min-height: 600px;" src="{{url('/embed/datacentros')}}" frameborder="0" width="100%" height="100%"></iframe>
            </div>
         </div>

         <div class="tab-pane fade" id="v-pills-historial" role="tabpanel" aria-labelledby="v-pills-historial-tab">

            <h4>Histórico de cambios del servidor</h4>

            <div class="table-responsive pro" v-if="servidor.servidor_historico_cambios && servidor.servidor_historico_cambios.length > 0">
               <table class="table table-striped table-hover table-sm">
                  <thead>
                  <tr>
                     <th>Ram</th>
                     <th>Memoria Disco</th>
                     <th>Swap</th>
                     <th>Cores</th>
                     <th>Frec. Hz</th>
                     <th>Fecha cambio</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="h in servidor.servidor_historico_cambios">
                     <td>@{{ h.ram }}</td>
                     <td>@{{ h.memoria_dd }}</td>
                     <td>@{{ h.swap }}</td>
                     <td>@{{ h.nucleos }}</td>
                     <td>@{{ h.frec_procesador }}</td>
                     <td>@{{ h.created_at }}</td>
                  </tr>
                  </tbody>

               </table><!-- .table -->
            </div>
            <div class="card card-body bg-light" v-else>
               Hasta el momento no existe historial de cambios para este servidor.
            </div><!-- .card -->

         </div>

      </template>
      --}}

   </div>
</div>