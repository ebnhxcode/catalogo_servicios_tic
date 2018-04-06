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


   </div><!-- .col -->

   <div class="col-sm-8 col-md-8">

      <div class="row">
         <div class="col-sm-12">
            <h4>
               Servidores y sus aplicaciones
               <div class="btn-group pro float-right">
                  <input type="text" class="form-control input-sm"
                         data-placement="top" data-toggle="tooltip" title="Filtrar en la lista"
                         placeholder="filtrar en la lista" v-model="filtro_componente" id="filtro_componente">
               </div><!-- .btn-group mr-2 #mr->margin -->
            </h4>
         </div>
         <div class="col-sm-12" v-if="filterBy(servicio.servidores, filtro_componente).length">
            <small class="float-right">@{{ filterBy(servicio.servidores, filtro_componente).length || 0 }} resultados.</small>
         </div>
         <div class="col-sm-12" v-else>
            <small class="float-right">
               @{{ `Sin resultados para` }} ${`@{{ `${filtro_componente}` }}`}
            </small>
         </div>
         <br>
         <br>

         <div class="col-sm-12" class="pro">


            <div id="accordion" v-if="servicio.servidores && servicio.servidores.length > 0"
                 style="max-height: 800px;overflow-y: scroll;border-top: 6px solid #dddddd;border-bottom: 6px solid #dddddd;border-radius: 10px;">

               <div class="card pro" v-for="s in filterBy(servicio.servidores, filtro_componente)">

                  <button class="btn btn-light card-header text-left" id="`heading${s.id_servidor}`"
                          data-toggle="collapse" :data-target="`#${s.id_servidor}`" aria-expanded="true" :aria-controls="`${s.id_servidor}`">
                     <div class="row">
                        <div class="col-sm-6">
                           <h5><span class="text-success">@{{`${s.ip_servidor || 0}`}}</span> : @{{ `${s.nom_servidor}` }}</h5>
                        </div>
                        <div class="col-sm-3">
                           <span class="text-info" v-if="s.aplicaciones && s.aplicaciones.length >= 0">
                              #@{{ s.aplicaciones.length || 0 }} App@{{ s.aplicaciones.length > 1 ?'s':'' }}
                           </span>
                        </div>
                        <div class="col-sm-3">
                           <span class="text-info float-right" v-if="s.servidor_estado">
                              Estado : @{{ s.servidor_estado.estado.nom_estado || 0 }}
                           </span>
                        </div>
                     </div>
                  </button>

                  <div :id="`${s.id_servidor}`" class="collapse" :aria-labelledby="`${s.id_servidor}`" data-parent="#accordion">
                     <div class="card-body">

                        <h4>Información básica del servidor</h4>

                        <dl class="row" v-if="s">

                           <dd class="col-md-12">@{{ `${s.nom_servidor}: ${s.det_servidor}` || '' }}</dd>

                           <dt class="col-md-3">Ip</dt>
                           <dd class="col-md-3">@{{`${s.ip_servidor || 0}`}}</dd>
                           <dt class="col-md-3">Ram</dt>
                           <dd class="col-md-3">@{{ `${(s.ram)/1024} GB` }}</dd>
                           <dt class="col-md-3">Disco</dt>
                           <dd class="col-md-3">@{{ `${(s.memoria_dd)/1024} GB` }}</dd>
                           <dt class="col-md-3">Cores</dt>
                           <dd class="col-md-3">@{{`${s.nucleos || 0}`}}</dd>
                           <dt class="col-md-3">Sistema Operativo</dt>
                           <dd class="col-md-3">
                              @{{`${s.sistema_operativo.nom_sistema_operativo || 0}`}}
                              @{{`${s.sistema_operativo.vers_sistema_operativo || 0}`}}
                           </dd>
                           <dt class="col-md-3">Datacentro</dt>
                           <dd class="col-md-3">@{{`${s.datacentro.nom_datacentro || 0}`}}</dd>
                        </dl>

                        <br>
                        <br>

                        <h4>Credenciales del servidor</h4>

                        <div class="table-responsive pro"
                             v-if="en_array(['Administrador','Jefe de Area','Lider Equipo','App Manager'],usuario_auth.usuario_role.role.nom_role)">
                           <table class="table table-striped table-hover table-sm" v-if="s.accesos && s.accesos.length > 0">
                              <thead>
                              <tr>
                                 <th>Usuario</th>
                                 <th>Clave</th>
                                 <th>Tipo Acceso</th>
                                 <th>Puerto</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr v-for="a in s.accesos">
                                 <td>@{{ a.usuario }}</td>
                                 <td>@{{ a.clave }}</td>
                                 <td>@{{ a.tipo_acceso }}</td>
                                 <td>@{{ a.puerto }}</td>
                              </tr>
                              </tbody>

                           </table><!-- .table -->
                           <div class="card card-body bg-light" v-else>
                              Hasta el momento no existen credenciales en este servidor.
                           </div><!-- .card -->
                        </div>
                        <div class="card card-body bg-light" v-else>
                           No tiene permisos para ver esta sección.
                        </div><!-- .card -->

                        <br>
                        <br>

                        <span class="text-info float-right" v-if="s.aplicaciones && s.aplicaciones.length >= 0">
                           N° Apps cargadas : @{{ s.aplicaciones.length || 0 }}
                        </span>
                        <h4>Aplicaciones</h4>

                        <div class="table-responsive pro">
                           <table class="table table-striped table-hover table-sm" v-if="s.aplicaciones && s.aplicaciones.length > 0">
                              <thead>
                              <tr>
                                 <th>Nombre</th>
                                 <th>Descripción</th>
                                 <th>Ip</th>
                                 <th>Url</th>
                                 <th>Dominio</th>
                                 <th>F. Creación</th>
                                 <th>F. Últ. Actualización</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr v-for="a in s.aplicaciones">
                                 <td>@{{ a.nom_aplicacion }}</td>
                                 <td>@{{ a.det_aplicacion }}</td>
                                 <td>@{{ a.ip }}</td>
                                 <td>@{{ a.url_web }}</td>
                                 <td>@{{ a.dominio.nom_dominio }}</td>
                                 <td>@{{ a.created_at }}</td>
                                 <td>@{{ a.updated_at }}</td>
                              </tr>
                              </tbody>

                           </table><!-- .table -->
                           <div class="card card-body bg-light" v-else>
                              Hasta el momento no existen aplicaciones cargadas en este servicio.
                           </div><!-- .card -->
                        </div>

                        <br>
                        <br>

                        <h4>Credenciales de la aplicación</h4>

                        <div class="table-responsive pro" v-if="en_array(['Administrador','Jefe de Area','Lider Equipo','App Manager'],usuario_auth.usuario_role.role.nom_role)">
                           <table class="table table-striped table-hover table-sm" v-if="s.accesos && s.accesos.length > 0">
                              <thead>
                              <tr>
                                 <th>Usuario</th>
                                 <th>Clave</th>
                                 <th>Tipo Acceso</th>
                                 <th>Puerto</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr v-for="a in s.accesos">
                                 <td>@{{ a.usuario }}</td>
                                 <td>@{{ a.clave }}</td>
                                 <td>@{{ a.email }}</td>
                                 <td>@{{ a.tipo_acceso }}</td>
                              </tr>
                              </tbody>

                           </table><!-- .table -->
                           <div class="card card-body bg-light" v-else>
                              Hasta el momento no existen credenciales en este servidor.
                           </div><!-- .card -->
                        </div>
                        <div class="card card-body bg-light" v-else>
                           No tiene permisos para ver esta sección.
                        </div><!-- .card -->

                     </div>
                  </div>

               </div>

            </div>
            <div class="card card-body bg-light" v-else>
               Hasta el momento no existen servidores en este servicio.
            </div><!-- .card -->

         </div>
      </div>


      <br>

   </div><!-- .col -->


</div><!-- .row -->