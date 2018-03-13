
<h5>Datos básicos</h5>
<div class="row">
   <div class="col-sm-4 col-md-4">

      <dt>Nombre</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="usuario.nom_usuario" name="nom_usuario"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('nom_usuario')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('nom_usuario')" class="text-danger small">
                  @{{ errors.first('nom_usuario') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->


   <div class="col-sm-4 col-md-4">

      <dt>Apellido Paterno</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="usuario.ape_paterno" name="ape_paterno"
                   v-validate="{regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('ape_paterno')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('ape_paterno')" class="text-danger small">
                  @{{ errors.first('ape_paterno') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->
   <div class="col-sm-4 col-md-4">

      <dt>Apellido Materno</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="usuario.ape_materno" name="ape_materno"
                   v-validate="{regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('ape_materno')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('ape_materno')" class="text-danger small">
                  @{{ errors.first('ape_materno') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->


</div><!-- .row -->


<h5>Datos opcionales</h5>
<div class="row">


   <!-- Lo vamos a dejar comentado porque se activara cuando el perfilamiento esté activo -->
   <div class="col-sm-8 col-md-8">

      <dt>Nombre Completo</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="usuario.nom_completo" name="nom_completo"
                   v-validate="{regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" placeholder="(opcional)" />

            <transition name="bounce">
               <i v-show="errors.has('nom_completo')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('nom_completo')" class="text-danger small">
                  @{{ errors.first('nom_completo') }}
               </span>
            </transition>
         </p>
      </dd>

   </div>

   <div class="col-sm-4 col-md-4">

      <dt>Alias</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="usuario.username" name="username"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('username')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('username')" class="text-danger small">
                  @{{ errors.first('username') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

</div><!-- .row -->


<h5>Email y Password</h5>
<div class="row">
   <div class="col-sm-6 col-md-6">

      <dt>Email</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="usuario.email" name="email"
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

   <div class="col-sm-6 col-md-6">

      <dt>Password</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="password" v-model="usuario.password" name="password"
                   autocomplete="new-password"
                   aria-autocomplete="none"
                   autocomplete="off"
                   v-validate="{required:true,verify_password:true}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('password')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('password')" class="text-danger small">
                  @{{ errors.first('password') }}, para finalizar debe ingresar su contraseña.
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->



</div><!-- .row -->


<h5>Rol, estado y cargo</h5>
<div class="row">
   <div class="col-sm-4 col-md-4">

      <dt>Role</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <select class="form-control" v-model="usuario.id_role" name="id_role"
                    v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500">
               <option :value="r.id_role" v-for="r in roles">
                  @{{ `${r.nom_role} -> ${r.det_role}` }}
               </option>
            </select>

            <transition name="bounce">
               <i v-show="errors.has('id_role')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('id_role')" class="text-danger small">
                  @{{ errors.first('id_role') }}
               </span>
            </transition>
         </p>

      </dd>

   </div><!-- .col -->

   <div class="col-sm-4 col-md-4">

      <dt>Estado</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <select class="form-control" v-model="usuario.id_estado" name="id_estado"
                    v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500">
               <option :value="e.id_estado" v-for="e in estados">
                  @{{ `${e.nom_estado} -> ${e.det_estado}` }}
               </option>
            </select>

            <transition name="bounce">
               <i v-show="errors.has('id_estado')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('id_estado')" class="text-danger small">
                  @{{ errors.first('id_estado') }}
               </span>
            </transition>
         </p>

      </dd>

   </div><!-- .col -->

   <div class="col-sm-4 col-md-4">

      <dt>Cargo</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <select class="form-control" v-model="usuario.id_cargo" name="id_cargo"
                    v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500">
               <option :value="c.id_cargo" v-for="c in cargos">
                  @{{ `${c.nom_cargo} -> ${c.det_cargo}` }}
               </option>
            </select>

            <transition name="bounce">
               <i v-show="errors.has('id_cargo')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('id_cargo')" class="text-danger small">
                  @{{ errors.first('id_cargo') }}
               </span>
            </transition>
         </p>

      </dd>

   </div><!-- .col -->



</div><!-- .row -->


