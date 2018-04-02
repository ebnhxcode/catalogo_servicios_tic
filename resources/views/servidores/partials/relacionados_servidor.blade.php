<div class="row">
   <div class="nav flex-column nav-pills col-sm-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <a class="nav-link active" id="v-pills-aplicaciones-tab" data-toggle="pill" href="#v-pills-aplicaciones" role="tab"
         aria-controls="v-pills-aplicaciones" aria-selected="true">
         Aplicaciones
      </a>
      <a class="nav-link" id="v-pills-datacentro-tab" data-toggle="pill" href="#v-pills-datacentro" role="tab"
         aria-controls="v-pills-datacentro" aria-selected="false">
         Datacentro
      </a>
      <a class="nav-link" id="v-pills-credenciales-tab" data-toggle="pill" href="#v-pills-credenciales" role="tab"
         aria-controls="v-pills-credenciales" aria-selected="false">
         Credenciales
      </a>
      <a class="nav-link" id="v-pills-historial-tab" data-toggle="pill" href="#v-pills-historial" role="tab"
         aria-controls="v-pills-historial" aria-selected="false">
         Historial de cambios
      </a>
      {{--
      <a class="nav-link" id="v-pills-opciones-tab" data-toggle="pill" href="#v-pills-opciones" role="tab"
         aria-controls="v-pills-opciones" aria-selected="false">
         Opciones
      </a>
      --}}
   </div>
   <div class="tab-content col-sm-10" id="v-pills-tabContent">
      <div class="tab-pane fade show active" id="v-pills-aplicaciones" role="tabpanel" aria-labelledby="v-pills-aplicaciones-tab">

         <div class="embed-responsive embed-responsive-16by9 pro">
            <iframe style="min-height: 800px;" src="{{url('/embed/aplicaciones')}}" frameborder="0" width="100%" height="100%"></iframe>
         </div>

      </div>

      <div class="tab-pane fade" id="v-pills-datacentro" role="tabpanel" aria-labelledby="v-pills-datacentro-tab">
         <div class="embed-responsive embed-responsive-16by9 pro">
            <iframe style="min-height: 800px;" src="{{url('/embed/datacentros')}}" frameborder="0" width="100%" height="100%"></iframe>
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

      {{--<div class="tab-pane fade" id="v-pills-opciones" role="tabpanel" aria-labelledby="v-pills-opciones-tab"></div>--}}
   </div>
</div>