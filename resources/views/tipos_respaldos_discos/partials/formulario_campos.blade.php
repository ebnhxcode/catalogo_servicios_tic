
<h5>Datos a completar sobre tipo de aplicación</h5>
<div class="row">
   <div class="col-sm-4 col-md-4">

      <dt>Nombre tipo respaldo disco</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="tipo_respaldo_disco.nom_tipo_respaldo_disco" name="nom_tipo_respaldo_disco"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('nom_tipo_respaldo_disco')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('nom_tipo_respaldo_disco')" class="text-danger small">
                  @{{ errors.first('nom_tipo_respaldo_disco') }}
               </span>
            </transition>
         </p>
      </dd>


   </div><!-- .col -->

   <div class="col-sm-4 col-md-4">

      <dt>Codigo tipo respaldo disco (opcional)</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <input type="text" v-model="tipo_respaldo_disco.cod_tipo_respaldo_disco" name="cod_tipo_respaldo_disco"
                   v-validate="{regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('cod_tipo_respaldo_disco')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('cod_tipo_respaldo_disco')" class="text-danger small">
                  @{{ errors.first('cod_tipo_respaldo_disco') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

   <div class="col-sm-4 col-md-4">

      <dt>Detalle tipo respaldo disco</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <textarea cols="15" rows="1" v-model="tipo_respaldo_disco.det_tipo_respaldo_disco" name="det_tipo_respaldo_disco"
                      v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                      class="form-control"></textarea>

            <transition name="bounce">
               <i v-show="errors.has('det_tipo_respaldo_disco')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('det_tipo_respaldo_disco')" class="text-danger small">
                  @{{ errors.first('det_tipo_respaldo_disco') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

</div><!-- .row -->
