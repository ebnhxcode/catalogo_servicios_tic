<h5>Datos básicos</h5>
<div class="row">
   <div class="col-sm-6 col-md-6">
      <dt>Nombre actividad</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="actividad.nom_actividad" name="nom_actividad"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />
            <transition name="bounce">
               <i v-show="errors.has('nom_actividad')" class="fa fa-exclamation-circle"></i>
            </transition>
            <transition name="bounce">
               <span v-show="errors.has('nom_actividad')" class="text-danger small">
                  @{{ errors.first('nom_actividad') }}
               </span>
            </transition>
         </p>
      </dd>
   </div><!-- .col -->
   <div class="col-sm-6 col-md-6">
      <dt>Detalle actividad</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <textarea cols="15" rows="1" v-model="actividad.det_actividad" name="det_actividad"
                v-validate="{regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                class="form-control"></textarea>
            <transition name="bounce">
               <i v-show="errors.has('det_actividad')" class="fa fa-exclamation-circle"></i>
            </transition>
            <transition name="bounce">
            <span v-show="errors.has('det_actividad')" class="text-danger small">
               @{{ errors.first('det_actividad') }}
            </span>
            </transition>
         </p>
      </dd>
   </div><!-- .col -->
</div><!-- .row -->
