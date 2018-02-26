

<div class="row">
   <div class="col-md-6">

      <dt>Nombre Usuario</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="usuario.nom_usuario" name="nom_usuario"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('nom_usuario')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
         <span v-show="errors.has('nom_usuario')" class="text-danger">
            @{{ errors.first('nom_usuario') }}
         </span>
            </transition>
         </p>
      </dd>

      <dt>Nombre Completo</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="usuario.nom_completo" name="nom_completo"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('nom_completo')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
         <span v-show="errors.has('nom_completo')" class="text-danger">
            @{{ errors.first('nom_completo') }}
         </span>
            </transition>
         </p>
      </dd>


      <dt>Apellido Paterno</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="usuario.ape_paterno" name="ape_paterno"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('ape_paterno')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
         <span v-show="errors.has('ape_paterno')" class="text-danger">
            @{{ errors.first('ape_paterno') }}
         </span>
            </transition>
         </p>
      </dd>


      <dt>Apellido Materno</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="usuario.ape_materno" name="ape_materno"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('ape_materno')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
         <span v-show="errors.has('ape_materno')" class="text-danger">
            @{{ errors.first('ape_materno') }}
         </span>
            </transition>
         </p>
      </dd>


   </div>
   <div class="col-md-6">

      <dt>Nombre de Usuario</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="usuario.username" name="username"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('username')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
         <span v-show="errors.has('username')" class="text-danger">
            @{{ errors.first('username') }}
         </span>
            </transition>
         </p>
      </dd>

      <dt>Email Usuario</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="usuario.email" name="email"
                   v-validate="{required:true,email:true}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('email')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
         <span v-show="errors.has('email')" class="text-danger">
            @{{ errors.first('email') }}
         </span>
            </transition>
         </p>
      </dd>


   </div>
</div>



