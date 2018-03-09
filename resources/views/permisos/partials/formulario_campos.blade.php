<h5>Datos básicos para administrar permisos</h5>
<div class="row">
   <div class="col-sm-3 col-md-3">

      <dt>Nombre Permiso</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="permiso.nom_permiso" name="nom_permiso"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('nom_permiso')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('nom_permiso')" class="text-danger small">
                  @{{ errors.first('nom_permiso') }}
               </span>
            </transition>
         </p>
      </dd>


   </div><!-- .col -->

   <div class="col-sm-3 col-md-3">

      <dt>Código permiso</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <input type="text" v-model="permiso.cod_permiso" name="cod_permiso"
                   v-validate="{regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('cod_permiso')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('cod_permiso')" class="text-danger small">
                  @{{ errors.first('cod_permiso') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

   <div class="col-sm-6 col-md-6">

      <dt>Detalle Permiso</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <textarea cols="15" rows="1" v-model="permiso.det_permiso" name="det_permiso"
                      v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                      class="form-control"></textarea>

            <transition name="bounce">
               <i v-show="errors.has('det_permiso')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('det_permiso')" class="text-danger small">
                  @{{ errors.first('det_permiso') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->


</div><!-- .row -->
