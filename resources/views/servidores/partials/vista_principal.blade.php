<div class="row">
   <div class="col-sm-4 col-md-4">


      <!-- este bloque será reemplazado dinamicamente -->
      <div class="card pro">
         <img class="card-img-top" :src="'/img/source.gif'" alt="Card image cap">
         <div class="card-body">
            <small class=" h6 card-title">
               @{{ servidor.nom_servidor || '' }}
               <span class="badge badge-success float-right" v-if="servidor.servidor_estado">
                  @{{ `Estado : ${servidor.servidor_estado.estado.nom_estado}` || '' }}
               </span>
            </small>
            <p class="card-text">

            <dl class="row" v-if="servidor">

               <dd class="col-md-12">@{{ servidor.det_servidor || '' }}</dd>

               <dt class="col-md-6">@{{ `${tabla_labels['ip_servidor']}`}}</dt>
               <dd class="col-md-6">@{{`${servidor.ip_servidor || 0}`}}</dd>

               <dt class="col-md-6">@{{ `${tabla_labels['ram']}`}}</dt>
               <dd class="col-md-6">@{{`${(servidor.ram)/1024} GB`}}</dd>

               <dt class="col-md-6">@{{ `${tabla_labels['memoria_dd']}`}}</dt>
               <dd class="col-md-6">@{{`${(servidor.memoria_dd)/1024} GB`}}</dd>

               <dt class="col-md-6">@{{ `${tabla_labels['nucleos']}`}}</dt>
               <dd class="col-md-6">@{{`${servidor.nucleos || 0}`}}</dd>
            </dl>

            <dl v-else>
               No hay información del servidor.
            </dl>

            </p>
            <!--<a href="#" class="btn btn-primary">Go somewhere</a>-->
         </div><!-- .card-body -->
      </div><!-- .card -->

      <br>

      <!-- este bloque será reemplazado dinamicamente -->
      <div class="card pro">
         <div class="card-body">
            <h5 class="card-title">
               Datacentro
            </h5>
            <p class="card-text">

            <dl class="row" v-if="servidor.datacentro">

               <dt class="col-md-6">Nombre datacentro</dt>
               <dd class="col-md-6">@{{ servidor.datacentro.nom_datacentro || 0 }}</dd>

               <dt class="col-md-6">Detalle datacentro</dt>
               <dd class="col-md-6">@{{ servidor.datacentro.det_datacentro || 0 }}</dd>

               <dt class="col-md-6">Código datacentro</dt>
               <dd class="col-md-6">@{{ servidor.datacentro.cod_datacentro || 0 }}</dd>

            </dl>
            <dl v-else>
               No hay información de ubicación.
            </dl>

            </p>
            <!--<a href="#" class="btn btn-primary">Go somewhere</a>-->
         </div><!-- .card-body -->
      </div><!-- .card -->


      <br>

      <!-- este bloque será reemplazado dinamicamente -->
      <div class="card pro">
         <div class="card-body">
            <h5 class="card-title">
               Sistema Operativo
            </h5>
            <p class="card-text">

            <dl class="row" v-if="servidor.sistema_operativo">

               <dt class="col-md-6">Nombre SO</dt>
               <dd class="col-md-6">@{{ servidor.sistema_operativo.nom_sistema_operativo|| 0 }}</dd>

               <dt class="col-md-6">Arquitectura</dt>
               <dd class="col-md-6">@{{ servidor.sistema_operativo.arquitectura || 0 }}</dd>

               <dt class="col-md-6">Detalle SO</dt>
               <dd class="col-md-6">@{{ servidor.sistema_operativo.det_sistema_operativo || 0 }}</dd>


            </dl>
            <dl v-else>
               No hay información de sistema operativo.
            </dl>

            </p>
            <!--<a href="#" class="btn btn-primary">Go somewhere</a>-->
         </div><!-- .card-body -->
      </div><!-- .card -->



   </div><!-- .col -->
   <div class="col-sm-8 col-md-8">

      <h4>Aplicaciones cargadas</h4>

      <div class="table-responsive pro" v-if="servidor.aplicaciones && servidor.aplicaciones.length > 0">
         <table class="table table-striped table-hover table-sm">
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
      </div>

      <div class="card card-body bg-light" v-else>
         Hasta el momento no existen aplicaciones cargadas en este servidor.
      </div><!-- .card -->

      <br>

   </div><!-- .col -->
</div><!-- .row -->