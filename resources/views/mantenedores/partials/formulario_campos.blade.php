<h5>Datos básicos del mantenedor</h5>

<div class="row">

   <div class="col-sm-6 col-md-6">

      <dt>Ruta mantenedor /</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <input type="text" v-model="mantenedor.url_mantenedor" name="url_mantenedor"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('url_mantenedor')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('url_mantenedor')" class="text-danger small">
                  @{{ errors.first('url_mantenedor') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

   <div class="col-sm-6 col-md-6">

      <dt>Nombre mantenedor</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="mantenedor.nom_mantenedor" name="nom_mantenedor"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('nom_mantenedor')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('nom_mantenedor')" class="text-danger small">
                  @{{ errors.first('nom_mantenedor') }}
               </span>
            </transition>
         </p>
      </dd>


   </div><!-- .col -->
   <div class="col-sm-6 col-md-6">

      <dt>Detalle mantenedor</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <textarea cols="15" rows="1" v-model="mantenedor.det_mantenedor" name="det_mantenedor"
                      v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                      class="form-control"></textarea>

            <transition name="bounce">
               <i v-show="errors.has('det_mantenedor')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('det_mantenedor')" class="text-danger small">
                  @{{ errors.first('det_mantenedor') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

   <div class="col-sm-6 col-md-6">

      <dt>Código mantenedor</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <input type="text" v-model="mantenedor.cod_mantenedor" name="cod_mantenedor"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('cod_mantenedor')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('cod_mantenedor')" class="text-danger small">
                  @{{ errors.first('cod_mantenedor') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

   <div class="col-sm-6 col-md-6">

      <dt>Imagen mantenedor</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <input type="text" v-model="mantenedor.imagen_mantenedor" name="imagen_mantenedor"
                   v-validate="{regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('imagen_mantenedor')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('imagen_mantenedor')" class="text-danger small">
                  @{{ errors.first('imagen_mantenedor') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

   <div class="col-sm-6 col-md-6">

      <dt>Font icon mantenedor (<span clas="small text-info">Font awesome old docs 4.7.0</span>)</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <input type="text" v-model="mantenedor.font_icon_mantenedor" name="font_icon_mantenedor"
                   v-validate="{regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('font_icon_mantenedor')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('font_icon_mantenedor')" class="text-danger small">
                  @{{ errors.first('font_icon_mantenedor') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

</div><!-- .row -->