<div class="row">

   <div class="nav flex-column nav-pills col-sm-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <!--
      <a class="nav-link active" id="v-pills-aplicaciones-tab" data-toggle="pill" href="#v-pills-aplicaciones" role="tab"
         aria-controls="v-pills-aplicaciones" aria-selected="true">
         Aplicaciones
      </a>
      <a class="nav-link" id="v-pills-servidores-tab" data-toggle="pill" href="#v-pills-servidores" role="tab"
         aria-controls="v-pills-servidores" aria-selected="true">
         Servidores
      </a>
      -->
      <a class="nav-link active" id="v-pills-bitacoras-tab" data-toggle="pill" href="#v-pills-bitacoras" role="tab"
         aria-controls="v-pills-bitacoras" aria-selected="false">
         Bitacoras del servicio
      </a>

      <!--

      <template v-if="en_array(['Administrador','Jefe de Area','Lider Equipo','App Manager'],usuario_auth.usuario_role.role.nom_role)">

         <a class="nav-link" id="v-pills-datacentro-tab" data-toggle="pill" href="#v-pills-datacentro" role="tab"
            aria-controls="v-pills-datacentro" aria-selected="false">
            Datacentro
         </a>
         <a class="nav-link" id="v-pills-servidores-accesos-tab" data-toggle="pill" href="#v-pills-servidores-accesos" role="tab"
            aria-controls="v-pills-servidores-accesos" aria-selected="false">
            Accesos servidores
         </a>
         <a class="nav-link" id="v-pills-aplicaciones-accesos-tab" data-toggle="pill" href="#v-pills-aplicaciones-accesos" role="tab"
            aria-controls="v-pills-aplicaciones-accesos" aria-selected="false">
            Accesos aplicaciones
         </a>

      </template>

      -->

   </div>

   <div class="tab-content col-sm-10" id="v-pills-tabContent">

      <!--
      <div class="tab-pane fade show active" id="v-pills-aplicaciones" role="tabpanel" aria-labelledby="v-pills-aplicaciones-tab">
         <div class="embed-responsive embed-responsive-16by9 pro">
            {{--<iframe style="min-height: 600px;" src="{{url('/embed/aplicaciones')}}" frameborder="0" width="100%" height="100%"></iframe>--}}
         </div>
      </div>

      <div class="tab-pane fade show" id="v-pills-servidores" role="tabpanel" aria-labelledby="v-pills-servidores-tab">
         <div class="embed-responsive embed-responsive-16by9 pro">
            {{--<iframe style="min-height: 600px;" src="{{url('/embed/servidores')}}" frameborder="0" width="100%" height="100%"></iframe>--}}
         </div>
      </div>
      -->


      <div class="tab-pane fade show active" id="v-pills-bitacoras" role="tabpanel" aria-labelledby="v-pills-bitacoras-tab">

         <h4>Bitácoras en este servicio</h4>
         <table class="table table-striped table-hover table-sm" v-if="servicio.usuarios_bitacora_servicios &&
            servicio.usuarios_bitacora_servicios.length > 0">
            <thead>
            <tr>
               <th>Nombre</th>
               <th>Descripción</th>
               <th>Usuario</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="b in servicio.usuarios_bitacora_servicios">
               <td>@{{ b.asunto }}</td>
               <td>@{{ b.det_bitacora }}</td>
               <td>@{{ b.usuario.nom_usuario }}</td>
            </tr>
            </tbody>

         </table><!-- .table -->
         <div class="card card-body bg-light" v-else>
            Hasta el momento no existen bitácoras registradas.
         </div><!-- .card -->

      </div>

      <!--
      <template v-if="en_array(['Administrador','Jefe de Area','Lider Equipo','App Manager'],usuario_auth.usuario_role.role.nom_role)">

         <div class="tab-pane fade" id="v-pills-datacentro" role="tabpanel" aria-labelledby="v-pills-datacentro-tab">
            <div class="embed-responsive embed-responsive-16by9 pro">
               {{--<iframe style="min-height: 600px;" src="{{url('/embed/datacentros')}}" frameborder="0" width="100%" height="100%"></iframe>--}}
            </div>
         </div>

         <div class="tab-pane fade" id="v-pills-servidores-accesos" role="tabpanel" aria-labelledby="v-pills-servidores-accesos-tab">
            <div class="embed-responsive embed-responsive-16by9 pro">
               {{--<iframe style="min-height: 600px;" src="{{url('/embed/servidores_accesos')}}" frameborder="0" width="100%" height="100%"></iframe>--}}
            </div>
         </div>

         <div class="tab-pane fade" id="v-pills-aplicaciones-accesos" role="tabpanel" aria-labelledby="v-pills-aplicaciones-accesos-tab">
            <div class="embed-responsive embed-responsive-16by9 pro">
               {{--<iframe style="min-height: 600px;" src="{{url('/embed/aplicaciones_accesos')}}" frameborder="0" width="100%" height="100%"></iframe>--}}
            </div>
         </div>

      </template>
      -->

   </div>
</div>