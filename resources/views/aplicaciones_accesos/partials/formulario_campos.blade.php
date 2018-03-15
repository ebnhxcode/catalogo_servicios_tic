
<h5>Datos básicos obligatorios de las credenciales</h5>
<div class="row">
   <div class="col-sm-3 col-md-3">

      <dt>Usuario</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="aplicacion_acceso.usuario" name="usuario"
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
            <input type="password" v-model="aplicacion_acceso.clave" name="clave"
                   aria-autocomplete="none"
                   autocomplete="off"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@/#$%*&]+$/i}" {{--verify_password--}} data-vv-delay="500"
                   class="form-control" />
            <button class="btn btn-sm btn-primary" v-clipboard="aplicacion_acceso.clave"
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
            <input type="text" v-model="aplicacion_acceso.tipo_acceso" name="tipo_acceso"
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

      <dt>Email</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <input type="text" v-model="aplicacion_acceso.email" name="email"
                   v-validate="{required:true,email:true}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('email')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('email')" class="text-danger small">
                  @{{ errors.first('email') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->


</div><!-- .row -->


<h5>Datos de asociación</h5>
<div class="row">

   <div class="col-sm-4 col-md-4">

      <dt>Aplicación</dt>
      <dd>
         <p class="control has-icon has-icon-right">

            <select class="form-control" v-model="aplicacion_acceso.id_aplicacion" name="id_aplicacion"
                    v-validate="{required:true, regex:/^[0-9]+$/i}" data-vv-delay="500">
               <option :value="a.id_aplicacion" v-for="a in aplicaciones">
                  @{{ `${a.nom_aplicacion} -> ${a.det_aplicacion}` }}
               </option>
            </select>

            <transition name="bounce">
               <i v-show="errors.has('id_aplicacion')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('id_aplicacion')" class="text-danger small">
                  @{{ errors.first('id_aplicacion') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->



</div><!-- .row -->
