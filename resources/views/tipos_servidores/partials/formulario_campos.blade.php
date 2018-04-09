
<h5>Datos a completar sobre tipo de aplicación</h5>
<div class="row">
   <div class="col-sm-4 col-md-4">

      <dt>Nombre tipo servidor</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="tipo_servidor.nom_tipo_servidor" name="nom_tipo_servidor"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('nom_tipo_servidor')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('nom_tipo_servidor')" class="text-danger small">
                  @{{ errors.first('nom_tipo_servidor') }}
               </span>
            </transition>
         </p>
      </dd>


   </div><!-- .col -->

   <div class="col-sm-4 col-md-4">

      <dt>Codigo tipo servidor (opcional)</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <input type="text" v-model="tipo_servidor.cod_tipo_servidor" name="cod_tipo_servidor"
                   v-validate="{regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('cod_tipo_servidor')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('cod_tipo_servidor')" class="text-danger small">
                  @{{ errors.first('cod_tipo_servidor') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

   <div class="col-sm-4 col-md-4">

      <dt>Detalle tipo servidor</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <textarea cols="15" rows="1" v-model="tipo_servidor.det_tipo_servidor" name="det_tipo_servidor"
                      v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                      class="form-control"></textarea>

            <transition name="bounce">
               <i v-show="errors.has('det_tipo_servidor')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('det_tipo_servidor')" class="text-danger small">
                  @{{ errors.first('det_tipo_servidor') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

</div><!-- .row -->
