<div class="tab-pane fade" id="v-pills-servidores-accesos" role="tabpanel" aria-labelledby="v-pills-servidores-accesos-tab">
   {{--
   <div class="embed-responsive embed-responsive-16by9 pro">
      <iframe style="min-height: 600px;" src="{{url('/embed/servidores_accesos')}}" frameborder="0" width="100%" height="100%"></iframe>
   </div>
   --}}
   <h3>REGISTRAR CREDENCIAL PARA SERVIDOR</h3>
   <div class="card">
      <div class="card-body pro">
         <h5>Datos básicos obligatorios de las credenciales</h5>
         <div class="row">
            <div class="col-sm-3 col-md-3">

               <dt>Usuario</dt>
               <dd>
                  <p class="control has-icon has-icon-right">
                     <input type="text" v-model="servidor_acceso.usuario" name="usuario"
                            v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                            class="form-control" />

                     <transition name="bounce">
                        <i v-show="errors.has('usuario')" class="fa fa-exclamation-circle"></i>
                     </transition>

                     <transition name="bounce">
               <span v-show="errors.has('usuario')" class="text-danger small">
                  @{{ errors.first('usuario') }}
               </span>
                     </transition>
                  </p>
               </dd>


            </div><!-- .col -->
            <div class="col-sm-3 col-md-3">

               <dt>Clave</dt>
               <dd>

                  <p class="control has-icon has-icon-right">
                     <input type="password" v-model="servidor_acceso.clave" name="clave"
                            aria-autocomplete="none"
                            autocomplete="off"
                            v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@/#$%*&]+$/i}" {{--verify_password--}} data-vv-delay="500"
                            class="form-control" />
                     <button class="btn btn-sm btn-primary" v-clipboard="servidor_acceso.clave"
                             v-show="en_array([lista_actualizar_activo,modal_actualizar_activo],true)">
                        copiar clave
                     </button>

                     <transition name="bounce">
                        <i v-show="errors.has('clave')" class="fa fa-exclamation-circle"></i>
                     </transition>

                     <transition name="bounce">
               <span v-show="errors.has('clave')" class="text-danger small">
                  @{{ errors.first('clave') }}
               </span>
                     </transition>
                  </p>
               </dd>

            </div><!-- .col -->
            <div class="col-sm-3 col-md-3">

               <dt>Tipo Acceso</dt>
               <dd>

                  <p class="control has-icon has-icon-right">
                     <input type="text" v-model="servidor_acceso.tipo_acceso" name="tipo_acceso"
                            v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                            class="form-control" />

                     <transition name="bounce">
                        <i v-show="errors.has('tipo_acceso')" class="fa fa-exclamation-circle"></i>
                     </transition>

                     <transition name="bounce">
               <span v-show="errors.has('tipo_acceso')" class="text-danger small">
                  @{{ errors.first('tipo_acceso') }}
               </span>
                     </transition>
                  </p>
               </dd>

            </div><!-- .col -->
            <div class="col-sm-3 col-md-3">

               <dt>Puerto</dt>
               <dd>

                  <p class="control has-icon has-icon-right">
                     <input type="text" v-model="servidor_acceso.puerto" name="puerto"
                            v-validate="{regex:/^[0-9]+$/i}" data-vv-delay="500"
                            class="form-control" />

                     <transition name="bounce">
                        <i v-show="errors.has('puerto')" class="fa fa-exclamation-circle"></i>
                     </transition>

                     <transition name="bounce">
               <span v-show="errors.has('puerto')" class="text-danger small">
                  @{{ errors.first('puerto') }}
               </span>
                     </transition>
                  </p>
               </dd>

            </div><!-- .col -->


         </div><!-- .row -->
      </div>
   </div>

   <br>

   <div class="card">
      <div class="card-body pro">
         <h5>Datos de asociación</h5>
         <div class="row">

            <div class="col-sm-4 col-md-4">

               <dt>Servidor</dt>
               <dd>
                  <p class="control has-icon has-icon-right">

                     <select class="form-control" v-model="servidor_acceso.id_servidor=servidor.id_servidor" name="id_servidor"
                             v-validate="{required:true, regex:/^[0-9]+$/i}" data-vv-delay="500">
                        <option :value="s.id_servidor" v-for="s in servidores" v-if="servidor.id_servidor==s.id_servidor">
                           @{{ `${s.nom_servidor} -> ${s.det_servidor}` }}
                        </option>
                     </select>

                     <transition name="bounce">
                        <i v-show="errors.has('id_servidor')" class="fa fa-exclamation-circle"></i>
                     </transition>

                     <transition name="bounce">
                        <span v-show="errors.has('id_servidor')" class="text-danger small">
                           @{{ errors.first('id_servidor') }}
                        </span>
                     </transition>
                  </p>
               </dd>

            </div><!-- .col -->



         </div><!-- .row -->
      </div>
   </div>

   <br>

   <div class="card">
      <div class="card-body pro">
         <dt>Finalizar</dt>

         <dd>
            <button class="btn btn-success float-left" @click="guardar_servidor_acceso">
               Guardar
            </button>
         </dd>

      </div>
   </div>

</div>
