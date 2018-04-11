<h5>Datos básicos</h5>
<div class="row">
   <div class="col-sm-4 col-md-4">

      <dt>Asunto bitácora</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="usuario_bitacora_servicio.asunto" name="asunto"
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

   </div><!-- .col -->
   <div class="col-sm-8 col-md-8">

      <dt>Detalle bitácora</dt>
      <dd>
         <p class="control has-icon has-icon-right">
      <textarea cols="15" rows="1" v-model="usuario_bitacora_servicio.det_bitacora" name="det_bitacora"
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

   </div><!-- .col -->
   <div class="col-sm-6 col-md-6">

      <dt>Actividad</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <select class="form-control" v-model="usuario_bitacora_servicio.id_actividad" name="id_actividad"
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
   <div class="col-sm-6 col-md-6">

      <dt>Servicio</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <select class="form-control" v-model="usuario_bitacora_servicio.id_servicio" name="id_servicio"
                    v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500">
               <option :value="s.id_servicio" v-for="s in servicios">
                  @{{ `${s.nom_servicio} -> ${s.det_servicio}` }}
               </option>
            </select>

            <transition name="bounce">
               <i v-show="errors.has('id_servicio')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('id_servicio')" class="text-danger small">
                  @{{ errors.first('id_servicio') }}
               </span>
            </transition>
         </p>

      </dd>

   </div><!-- .col -->


</div><!-- .row -->
