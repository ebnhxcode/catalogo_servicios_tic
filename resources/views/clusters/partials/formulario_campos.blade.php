<h5>Datos básicos</h5>
<div class="row">
   <div class="col-sm-4 col-md-4">

      <dt>Nombre cluster</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="cluster.nom_cluster" name="nom_cluster"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ -]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('nom_cluster')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('nom_cluster')" class="text-danger small">
                  @{{ errors.first('nom_cluster') }}
               </span>
            </transition>
         </p>
      </dd>


   </div><!-- .col -->

   <div class="col-sm-4 col-md-4">

      <dt>Código cluster</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <input type="text" v-model="cluster.cod_cluster" name="cod_cluster"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('cod_cluster')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('cod_cluster')" class="text-danger small">
                  @{{ errors.first('cod_cluster') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

   <div class="col-sm-4 col-md-4">

      <dt>Detalle cluster</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <textarea cols="15" rows="1" v-model="cluster.det_cluster" name="det_cluster"
                      v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@#$%*&-]+$/i}" data-vv-delay="500"
                      class="form-control"></textarea>

            <transition name="bounce">
               <i v-show="errors.has('det_cluster')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('det_cluster')" class="text-danger small">
                  @{{ errors.first('det_cluster') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->


</div><!-- .row -->
<h5>Tipo de cluster</h5>
<div class="row">
   <div class="col-sm-4 col-md-4">

      <dt>Tipo cluster</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <select class="form-control" v-model="cluster.id_tipo_cluster" name="id_tipo_cluster"
                    v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500">
               <option :value="tc.id_tipo_cluster" v-for="tc in tipos_clusters">
                  @{{ `${tc.nom_tipo_cluster} -> ${tc.det_tipo_cluster}` }}
               </option>
            </select>

            <transition name="bounce">
               <i v-show="errors.has('id_tipo_cluster')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('id_tipo_cluster')" class="text-danger small">
                  @{{ errors.first('id_tipo_cluster') }}
               </span>
            </transition>
         </p>

      </dd>

   </div><!-- .col -->

</div><!-- .row -->


