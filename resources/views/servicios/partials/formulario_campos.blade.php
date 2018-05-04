<div class="row">
   <div class="col-sm-6 col-md-6">

      <dt>Nombre servicio</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="servicio.nom_servicio" name="nom_servicio"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('nom_servicio')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('nom_servicio')" class="text-danger small">
                  @{{ errors.first('nom_servicio') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->
   <div class="col-sm-6 col-md-6">

      <dt>Detalle servicio</dt>
      <dd>
         <p class="control has-icon has-icon-right">
      <textarea cols="15" rows="1" v-model="servicio.det_servicio" name="det_servicio"
                v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                class="form-control"></textarea>

            <transition name="bounce">
               <i v-show="errors.has('det_servicio')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
         <span v-show="errors.has('det_servicio')" class="text-danger small">
            @{{ errors.first('det_servicio') }}
         </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->
   <div class="col-sm-6 col-md-6">

      <dt>Actividad</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <select class="form-control" v-model="servicio.id_actividad" name="id_actividad"
                    v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500">
               <option :value="a.id_actividad" v-for="a in actividades">
                  @{{ `${a.nom_actividad} -> ${a.det_actividad}` }}
               </option>
            </select>

            <transition name="bounce">
               <i v-show="errors.has('id_actividad')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('id_actividad')" class="text-danger small">
                  @{{ errors.first('id_actividad') }}
               </span>
            </transition>
         </p>

      </dd>

   </div><!-- .col -->

</div><!-- .row -->