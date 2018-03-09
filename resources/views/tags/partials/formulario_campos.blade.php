<h5>Datos a completar para administrar tags</h5>
<div class="row">
   <div class="col-sm-4 col-md-4">

      <dt>Nombre tag</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="tag.nom_tag" name="nom_tag"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('nom_tag')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('nom_tag')" class="text-danger small">
                  @{{ errors.first('nom_tag') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->
   <div class="col-sm-4 col-md-4">

      <dt>Meta tag (opcional como metadato)</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="tag.meta_tag" name="meta_tag"
                   v-validate="{regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('meta_tag')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('meta_tag')" class="text-danger small">
                  @{{ errors.first('meta_tag') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->
   <div class="col-sm-4 col-md-4">

      <dt>Detalle tag</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <textarea cols="15" rows="1" v-model="tag.det_tag" name="det_tag"
                      v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                      class="form-control"></textarea>

            <transition name="bounce">
               <i v-show="errors.has('det_tag')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('det_tag')" class="text-danger small">
                  @{{ errors.first('det_tag') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

</div><!-- .row -->
