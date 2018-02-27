

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

   </div>

   <div class="col-sm-6 col-md-6">
      <dt>Detalle servicio</dt>
      <dd>
         <p class="control has-icon has-icon-right">
      <textarea cols="15" rows="2" v-model="servicio.det_servicio" name="det_servicio"
                v-validate="'required'" data-vv-delay="500"
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
   </div>


   <div class="col-sm-6 col-md-6">

      {{--
      <dt>Actividad</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <select class="form-control" v-model="servicio.id_permiso" name="id_permiso"
                    v-validate="'required'" data-vv-delay="500">
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
      --}}

   </div>




</div>



