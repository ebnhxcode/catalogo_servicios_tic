
<div class="row">
   <div class="col-sm-12 col-md-12">

      <dt>Nombre servidor</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="servidor.nom_servidor" name="nom_servidor"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('nom_servidor')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('nom_servidor')" class="text-danger small">
                  @{{ errors.first('nom_servidor') }}
               </span>
            </transition>
         </p>
      </dd>


   </div><!-- .col -->
   <div class="col-sm-12 col-md-12">

      <dt>Detalle servidor</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <textarea cols="15" rows="2" v-model="servidor.det_servidor" name="det_servidor"
                      v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                      class="form-control"></textarea>

            <transition name="bounce">
               <i v-show="errors.has('det_servidor')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('det_servidor')" class="text-danger small">
                  @{{ errors.first('det_servidor') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->
   <div class="col-sm-12 col-md-12">

      <dt>Ip servidor</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <input type="text" v-model="servidor.ip_servidor" name="ip_servidor"
                   v-validate="{ip:true}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('ip_servidor')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('ip_servidor')" class="text-danger small">
                  @{{ errors.first('ip_servidor') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->
   <div class="col-sm-12 col-md-12">

      <dt>Ip url</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <input type="text" v-model="servidor.url_servidor" name="url_servidor"
                   v-validate="{url:true}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('url_servidor')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('url_servidor')" class="text-danger small">
                  @{{ errors.first('url_servidor') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->


</div><!-- .row -->
