<div class="tab-pane active" id="vista_principal_tab" role="tabpanel" aria-labelledby="vista_principal_tab">

   <br>

   <div class="row">
      <div class="col-sm-4 col-md-4">

         <!-- este bloque será reemplazado dinamicamente -->
         <div class="card" style="{{--width: 18rem;--}}">
            <img class="card-img-top" src="{{ url('/img/servicio.jpg') }}" alt="Card image cap">
            <div class="card-body">
               <h5 class="card-title">
                  @{{ servicio.nom_servicio || '' }}
               </h5>
               <p class="card-text">

               <dl class="row" v-if="servicio">

                  <dd class="col-md-12">@{{ servicio.det_servicio || '' }}</dd>

               </dl>

               <dl v-else>
                  No hay información del servicio.
               </dl>

               </p>
               {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
            </div><!-- .card-body -->
         </div><!-- .card -->

         <br>


         <!-- este bloque será reemplazado dinamicamente -->
         <div class="card" style="{{--width: 18rem;--}}">
            <div class="card-body">
               <h5 class="card-title">
                  Actividad a la que pertenece
               </h5>
               <p class="card-text">

               <dl class="row" v-if="servicio.actividad">

                  <dt class="col-md-6">Nombre actividad</dt>
                  <dd class="col-md-6">@{{ servicio.actividad.nom_actividad || 0 }}</dd>

                  <dt class="col-md-6">Detalle actividad</dt>
                  <dd class="col-md-6">@{{ servicio.actividad.det_actividad || 0 }}</dd>

               </dl>
               <dl v-else>
                  No hay información de actividad.
               </dl>

               </p>
               {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
            </div><!-- .card-body -->
         </div><!-- .card -->

         <br>

      </div><!-- .col -->

      <div class="col-sm-8 col-md-8">

         <h4>Servidores</h4>

         {{--
         <table class="table table-striped table-hover table-sm" v-if="servidor.aplicaciones && servidor.aplicaciones.length > 0">
            <thead>
            <tr>
               <th>Nombre</th>
               <th>Descripción</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="app in servidor.aplicaciones">
               <td>@{{ app.nom_aplicacion }}</td>
               <td>@{{ app.det_aplicacion }}</td>
            </tr>
            </tbody>

         </table><!-- .table -->
         --}}
         <div class="card card-body bg-light">
            Hasta el momento no existen servidores registrados en este servicio.
         </div><!-- .card -->

         <h4>Aplicaciones</h4>

         {{--
         <table class="table table-striped table-hover table-sm" v-if="servidor.aplicaciones && servidor.aplicaciones.length > 0">
            <thead>
            <tr>
               <th>Nombre</th>
               <th>Descripción</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="app in servidor.aplicaciones">
               <td>@{{ app.nom_aplicacion }}</td>
               <td>@{{ app.det_aplicacion }}</td>
            </tr>
            </tbody>

         </table><!-- .table -->
         --}}
         <div class="card card-body bg-light">
            Hasta el momento no existen aplicaciones cargadas en este servicio.
         </div><!-- .card -->

         <h4>Fuentes aplicaciones</h4>

         {{--
         <table class="table table-striped table-hover table-sm" v-if="servidor.aplicaciones && servidor.aplicaciones.length > 0">
            <thead>
            <tr>
               <th>Nombre</th>
               <th>Descripción</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="app in servidor.aplicaciones">
               <td>@{{ app.nom_aplicacion }}</td>
               <td>@{{ app.det_aplicacion }}</td>
            </tr>
            </tbody>

         </table><!-- .table -->
         --}}
         <div class="card card-body bg-light">
            Hasta el momento no existen fuentes para las aplicaciones cargadas.
         </div><!-- .card -->

         <br>
         <h4>Tecnologías de la aplicación</h4>
         <div class="card card-body bg-light">
            Hasta el momento no existen tecnologías registradas.
         </div><!-- .card -->

         <br>
         <h4>Tags</h4>
         <div class="card card-body bg-light">
            Hasta el momento no existen tags.
         </div><!-- .card -->

         <br>
         <h4>Accesos de la aplicación</h4>
         <div class="card card-body bg-light">
            Hasta el momento no existen accesos disponibles.
         </div><!-- .card -->

         <br>
         <h4>Accesos al servidor de la aplicación</h4>
         <div class="card card-body bg-light">
            Hasta el momento no existen accesos disponibles.
         </div><!-- .card -->

         <br>
         <h4>Bitácoras en este servicio</h4>
         <table class="table table-striped table-hover table-sm" v-if="servidor.usuarios_bitacora_servicios &&
            servidor.usuarios_bitacora_servicios.length > 0">
            <thead>
            <tr>
               <th>Nombre</th>
               <th>Descripción</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="b in servidor.usuarios_bitacora_servicios">
               <td>@{{ b.asunto }}</td>
               <td>@{{ b.det_bitacora }}</td>
            </tr>
            </tbody>

         </table><!-- .table -->
         <div class="card card-body bg-light">
            Hasta el momento no existen bitácoras registradas.
         </div><!-- .card -->


      </div><!-- .col -->


   </div><!-- .row -->



</div><!-- .tab-pane .active #vista_principal_tab -->