
<div class="row">
   <div class="col-sm-12 col-md-12">

      <dt>Nombre estado</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="estado.nom_estado" name="nom_estado"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('nom_estado')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('nom_estado')" class="text-danger small">
                  @{{ errors.first('nom_estado') }}
               </span>
            </transition>
         </p>
      </dd>


   </div><!-- .col -->
   <div class="col-sm-12 col-md-12">

      <dt>Detalle estado</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <textarea cols="15" rows="2" v-model="estado.det_estado" name="det_estado"
                      v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                      class="form-control"></textarea>

            <transition name="bounce">
               <i v-show="errors.has('det_estado')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('det_estado')" class="text-danger small">
                  @{{ errors.first('det_estado') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->
   <div class="col-sm-12 col-md-12">

      <dt>Codigo estado</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <input type="text" v-model="estado.cod_estado" name="cod_estado"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('cod_estado')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('cod_estado')" class="text-danger small">
                  @{{ errors.first('cod_estado') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

</div><!-- .row -->
