
<h5>Datos básicos del menu</h5>

<div class="row">

   <div class="col-sm-6 col-md-6">

      <dt>Ruta menu /</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <input type="text" v-model="menu.url_menu" name="url_menu"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('url_menu')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('url_menu')" class="text-danger small">
                  @{{ errors.first('url_menu') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

   <div class="col-sm-6 col-md-6">

      <dt>Nombre menu</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="menu.nom_menu" name="nom_menu"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('nom_menu')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('nom_menu')" class="text-danger small">
                  @{{ errors.first('nom_menu') }}
               </span>
            </transition>
         </p>
      </dd>


   </div><!-- .col -->
   <div class="col-sm-6 col-md-6">

      <dt>Detalle menu</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <textarea cols="15" rows="1" v-model="menu.det_menu" name="det_menu"
                      v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                      class="form-control"></textarea>

            <transition name="bounce">
               <i v-show="errors.has('det_menu')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('det_menu')" class="text-danger small">
                  @{{ errors.first('det_menu') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

   <div class="col-sm-6 col-md-6">

      <dt>Código menu</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <input type="text" v-model="menu.cod_menu" name="cod_menu"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('cod_menu')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('cod_menu')" class="text-danger small">
                  @{{ errors.first('cod_menu') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

   <div class="col-sm-6 col-md-6">

      <dt>Path imágen menu /</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <input type="text" v-model="menu.imagen_menu" name="imagen_menu"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ /.]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('imagen_menu')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('imagen_menu')" class="text-danger small">
                  @{{ errors.first('imagen_menu') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

</div><!-- .row -->
