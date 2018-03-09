<h5>Datos básicos para administrar roles</h5>
<div class="row">
   <div class="col-sm-4 col-md-4">

      <dt>Nombre Role</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="role.nom_role" name="nom_role"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('nom_role')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('nom_role')" class="text-danger small">
                  @{{ errors.first('nom_role') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->
   <div class="col-sm-8 col-md-8">

      <dt>Permiso</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <select class="form-control" v-model="role.id_permiso" name="id_permiso"
                    v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500">
               <option :value="p.id_permiso" v-for="p in permisos">
                  @{{ `${p.nom_permiso} -> ${p.det_permiso}` }}
               </option>
            </select>

            <transition name="bounce">
               <i v-show="errors.has('id_permiso')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('id_permiso')" class="text-danger small">
                  @{{ errors.first('id_permiso') }}
               </span>
            </transition>
         </p>

      </dd>

   </div><!-- .col -->

   <div class="col-sm-12 col-md-12">

      <dt>Detalle Role</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <textarea cols="15" rows="2" v-model="role.det_role" name="det_role"
                      v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                      class="form-control"></textarea>

            <transition name="bounce">
               <i v-show="errors.has('det_role')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('det_role')" class="text-danger small">
                  @{{ errors.first('det_role') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

</div><!-- .row -->
