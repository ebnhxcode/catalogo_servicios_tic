<div class="tab-pane active" id="vista_principal_tab" role="tabpanel" aria-labelledby="vista_principal_tab">

   <br>

   <div class="row">
      <div class="col-sm-4 col-md-4">

         <!-- este bloque será reemplazado dinamicamente -->
         <div class="card" style="{{--width: 18rem;--}}">
            <img class="card-img-top" src="{{ url('/img/shutterstock.jpg') }}" alt="Card image cap">
            <div class="card-body">
               <h5 class="card-title">
                  @{{ actividad.nom_actividad || '' }}
               </h5>
               <p class="card-text">

               <dl class="row" v-if="actividad">

                  <dd class="col-md-12">@{{ actividad.det_actividad || '' }}</dd>

               </dl>

               <dl v-else>
                  No hay información de la actividad.
               </dl>

               </p>
               {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
            </div><!-- .card-body -->
         </div><!-- .card -->

         <br>

      </div><!-- .col -->

      <div class="col-sm-8 col-md-8">

         <h4>Servicios asociados a la actividad</h4>

         <table class="table table-striped table-hover table-sm" v-if="actividad.servicios && actividad.servicios.length > 0">
            <thead>
            <tr>
               <th>Nombre</th>
               <th>Descripción</th>
               <th>Aplicaciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="s in actividad.servicios">
               <td>@{{ s.nom_servicio }}</td>
               <td>@{{ s.det_servicio }}</td>
               <td>@{{ s.aplicaciones.length }}</td>
            </tr>
            </tbody>

         </table><!-- .table -->
         <div class="card card-body bg-light" v-else>
            Hasta el momento no existen servicios asociados.
         </div><!-- .card -->

         <br>

         <h4>Aplicaciones</h4>

         <table class="table table-striped table-hover table-sm" v-if="actividad.servicios && actividad.servicios.length > 0">
            <thead>
            <tr>
               <th>Nombre</th>
               <th>Descripción</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="s in actividad.servicios">
               <tr v-if="s.aplicaciones && s.aplicaciones.length > 0" v-for="a in s.aplicaciones">
                  <td>@{{ a.nom_aplicacion }}</td>
                  <td>@{{ a.det_aplicacion }}</td>
               </tr>
            </template>
            </tbody>

         </table><!-- .table -->
         <div class="card card-body bg-light" v-else>
            Hasta el momento no existen aplicaciones registradas.
         </div><!-- .card -->

         <br>
         <h4>Tags</h4>
         <div class="card card-body bg-light">
            Hasta el momento no existen tags.
         </div><!-- .card -->

         <br>
         <h4>Accesos a aplicaciones de la actividad</h4>
         <div class="card card-body bg-light">
            Hasta el momento no existen accesos disponibles.
         </div><!-- .card -->

         <br>
         <h4>Accesos a servidores de la actividad</h4>
         <div class="card card-body bg-light">
            Hasta el momento no existen accesos disponibles.
         </div><!-- .card -->

         <br>
         <h4>Fuentes de la actividad</h4>
         <div class="card card-body bg-light">
            Hasta el momento no existen fuentes cargadas.
         </div><!-- .card -->


      </div><!-- .col -->


   </div><!-- .row -->



</div><!-- .tab-pane .active #vista_principal_tab -->