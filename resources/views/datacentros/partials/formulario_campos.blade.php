<h5>Datos básicos</h5>
<div class="row">
   <div class="col-sm-4 col-md-4">

      <dt>Nombre datacentro</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="datacentro.nom_datacentro" name="nom_datacentro"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('nom_datacentro')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('nom_datacentro')" class="text-danger small">
                  @{{ errors.first('nom_datacentro') }}
               </span>
            </transition>
         </p>
      </dd>


   </div><!-- .col -->

   <div class="col-sm-4 col-md-4">

      <dt>Codigo datacentro</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <input type="text" v-model="datacentro.cod_datacentro" name="cod_datacentro"
                   v-validate="{regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('cod_datacentro')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('cod_datacentro')" class="text-danger small">
                  @{{ errors.first('cod_datacentro') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

   <div class="col-sm-4 col-md-4">

      <dt>Detalle datacentro</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <textarea cols="15" rows="1" v-model="datacentro.det_datacentro" name="det_datacentro"
                      v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                      class="form-control"></textarea>

            <transition name="bounce">
               <i v-show="errors.has('det_datacentro')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('det_datacentro')" class="text-danger small">
                  @{{ errors.first('det_datacentro') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->


</div><!-- .row -->
