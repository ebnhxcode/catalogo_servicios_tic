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
      <a class="nav-link" id="v-pills-responsables-tab" data-toggle="pill" href="#v-pills-responsables" role="tab"
         aria-controls="v-pills-responsables" aria-selected="false">
         Usuarios Responsables
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

         <h4>Crear bitácora</h4>
         <br>
         <div class="row">
            <div class="col-md-4">
               <h6>Crear nueva bitácora en este servicio</h6>

               <dt>Asunto bitácora</dt>
               <dd>
                  <p class="control has-icon has-icon-right">
                     <input type="text" v-model="servicio_nueva_bitacora.asunto" name="asunto"
                            v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                            class="form-control" />

                     <transition name="bounce">
                        <i v-show="errors.has('asunto')" class="fa fa-exclamation-circle"></i>
                     </transition>

                     <transition name="bounce">
                        <span v-show="errors.has('asunto')" class="text-danger small">
                           @{{ errors.first('asunto') }}
                        </span>
                     </transition>
                  </p>
               </dd>


               <dt>Detalle bitácora</dt>
               <dd>
                  <p class="control has-icon has-icon-right">
                     <textarea cols="15" rows="1" v-model="servicio_nueva_bitacora.det_bitacora" name="det_bitacora"
                               v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                               class="form-control"></textarea>

                     <transition name="bounce">
                        <i v-show="errors.has('det_bitacora')" class="fa fa-exclamation-circle"></i>
                     </transition>

                     <transition name="bounce">
                        <span v-show="errors.has('det_bitacora')" class="text-danger small">
                           @{{ errors.first('det_bitacora') }}
                        </span>
                     </transition>
                  </p>
               </dd>

               <dt>Finalizar</dt>
               <dd>
                  <button class="btn btn-success" @click.prevent="guardar_nueva_bitacora">
                     Agregar
                  </button>
               </dd>

            </div>

            <div class="col-md-8">
               <h6>Bitácoras en este servicio</h6>
               <div class="table-responsive">
                  <table class="table table-striped table-hover table-sm" v-if="servicio.usuarios_bitacora_servicios &&
            servicio.usuarios_bitacora_servicios.length > 0">
                     <thead>
                     <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Usuario</th>
                        <th>Acción</th>
                     </tr>
                     </thead>
                     <tbody>
                     <tr v-for="b in servicio.usuarios_bitacora_servicios">
                        <td>@{{ b.asunto }}</td>
                        <td>@{{ b.det_bitacora }}</td>
                        <td>@{{ b.usuario.nom_usuario }}</td>
                        <td>
                           <button class="btn btn-danger"
                                   v-if="en_array(['Administrador','Jefe de Area','Lider Equipo','App Manager'],usuario_auth.usuario_role.role.nom_role) &&
                                   b.id_usuario == usuario_auth.id_usuario"
                                   @click.prevent="eliminar_bitacora_usuario(b.id_usuario_bitacora_servicio)"
                                   data-placement="top" data-toggle="tooltip" title="Quitar">
                              <i class="fa fa-close"></i>
                           </button>
                        </td>
                     </tr>
                     </tbody>

                  </table><!-- .table -->
                  <div class="card card-body bg-light" v-else>
                     Hasta el momento no existen bitácoras registradas.
                  </div><!-- .card -->
               </div>
            </div>
         </div>

      </div>

      <div class="tab-pane fade show" id="v-pills-responsables" role="tabpanel" aria-labelledby="v-pills-responsables-tab">

         <h4>Usuarios responsables en el servicio</h4>
         <br>
         <div class="row">
            <div class="col-md-4">
               <h6>Seleccione y agregue nuevo usuario responsable</h6>

               <dt></dt>
               <dd>
                  <p class="control has-icon has-icon-right">
                     <select class="custom-select btn-outline-dark" v-model="servicio_usuario.id_usuario" name="id_usuario"
                             v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500">
                        <option :value="u.id_usuario" v-for="u in usuarios"
                                {{--
                                 esta opcion me serviria si me tocara mostrar en una lista si hay usuarios ya asociados
                                 v-if="existe_en_array_por_modelo_e_id(u.id_usuario, servicio.servicios_usuarios, 'usuario')==true">
                                --}}
                                v-if="!existe_en_array_por_modelo_e_id(u.id_usuario, servicio.servicios_usuarios, 'usuario')">
                           @{{ `${u.nom_usuario} ${u.ape_paterno} -> ${u.usuario_role.role.nom_role}` }}
                        </option>
                     </select>
                     <br>
                     <dt>Finalizar</dt>
                     <dd>
                        <button class="btn btn-success" @click.prevent="guardar_nuevo_usuario_servicio">
                           Agregar
                        </button>
                     </dd>

                     <transition name="bounce">
                        <i v-show="errors.has('id_usuario')" class="fa fa-exclamation-circle"></i>
                     </transition>

                     <transition name="bounce">
                        <span v-show="errors.has('id_usuario')" class="text-danger small">
                           @{{ errors.first('id_usuario') }}
                        </span>
                     </transition>
                  </p>

               </dd>

            </div>

            <div class="col-md-8">
               <h6>Tabla de usuarios asociados</h6>

               <div class="table-responsive">
                  <table class="table table-striped table-hover table-sm"
                         v-if="servicio.servicios_usuarios && servicio.servicios_usuarios.length > 0">
                     <thead>
                     <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Acción</th>
                     </tr>
                     </thead>
                     <tbody>
                     <tr v-for="su in servicio.servicios_usuarios" v-if="su.usuario">
                        <td>@{{ su.usuario.nom_usuario }}</td>
                        <td>@{{ su.usuario.ape_paterno }}</td>
                        <td>@{{ su.usuario.email }}</td>
                        <td>
                           <button class="btn btn-danger"
                                   v-if="en_array(['Administrador','Jefe de Area','Lider Equipo','App Manager'],usuario_auth.usuario_role.role.nom_role)"
                                   @click.prevent="eliminar_usuario_servicio(su.id_servicio_usuario)"
                                   data-placement="top" data-toggle="tooltip" title="Quitar">
                              <i class="fa fa-close"></i>
                           </button>
                        </td>
                     </tr>
                     </tbody>

                  </table><!-- .table -->
                  <div class="card card-body bg-light" v-else>
                     Hasta el momento no existen responsables asociados.
                  </div><!-- .card -->

               </div>
            </div>


         </div>



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