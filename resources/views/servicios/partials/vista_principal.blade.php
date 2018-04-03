<div class="row">
   <div class="col-sm-4 col-md-4">

      <!-- este bloque será reemplazado dinamicamente -->
      <div class="card pro" style="{{--width: 18rem;--}}">
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
      <div class="card pro" style="{{--width: 18rem;--}}">
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

      <div class="btn-group mr-2 pro">
         <input type="text" class="form-control input-sm"
                data-placement="top" data-toggle="tooltip" title="Filtrar en la lista"
                placeholder="filtrar en la lista" v-model="filtro_componente" id="filtro_componente">
      </div><!-- .btn-group mr-2 #mr->margin -->

      <h4>Servidores y Aplicaciones</h4>

      <div id="accordion">

         <div class="card" v-for="s in filterBy(filtro_componente, servicio.servidores)">

            <div class="card-header" id="`heading${s.id_servidor}`">
               <h5 class="mb-0">
                  <span class="btn btn-link" data-toggle="collapse" :data-target="`#${s.id_servidor}`" aria-expanded="true"
                          :aria-controls="`${s.id_servidor}`">
                     <h5>@{{ s.nom_servidor }}</h5>
                  </span>
               </h5>
            </div>

            <div :id="`${s.id_servidor}`" class="collapse" :aria-labelledby="`${s.id_servidor}`" data-parent="#accordion">
               <div class="card-body">

                  <span class="text-info float-right">
                     N° Apps cargadas : @{{ s.aplicaciones.length || 0 }}
                  </span>
                  <h4>Aplicaciones</h4>

                  <table class="table table-striped table-hover table-sm" v-if="s.aplicaciones && s.aplicaciones.length > 0">
                     <thead>
                     <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                     </tr>
                     </thead>
                     <tbody>
                     <tr v-for="a in s.aplicaciones">
                        <td>@{{ a.nom_aplicacion }}</td>
                        <td>@{{ a.det_aplicacion }}</td>
                     </tr>
                     </tbody>

                  </table><!-- .table -->
                  <div class="card card-body bg-light" v-else>
                     Hasta el momento no existen aplicaciones cargadas en este servicio.
                  </div><!-- .card -->

               </div>
            </div>
         </div>

      </div>

   </div><!-- .col -->


</div><!-- .row -->