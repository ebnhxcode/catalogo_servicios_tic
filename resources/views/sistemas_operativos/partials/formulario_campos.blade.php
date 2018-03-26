

<h5>Tipo Sistema Operativo</h5>
<div class="row">

   <div class="col-sm-4 col-md-4">

      <dt>Tipo sistema operativo</dt>
      <dd>
         <p class="control has-icon has-icon-right">

            <select class="form-control" v-model="sistema_operativo.id_tipo_sistema_operativo" name="id_tipo_sistema_operativo"
                    v-validate="{required:true, regex:/^[0-9]+$/i}" data-vv-delay="500">
               <option :value="tso.id_tipo_sistema_operativo" v-for="tso in tipos_sistemas_operativos">
                  @{{ `${tso.nom_tipo_sistema_operativo} -> ${tso.det_tipo_sistema_operativo}` }}
               </option>
            </select>

            <transition name="bounce">
               <i v-show="errors.has('id_tipo_sistema_operativo')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('id_tipo_sistema_operativo')" class="text-danger small">
                  @{{ errors.first('id_tipo_sistema_operativo') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->


</div><!-- .row -->

<h5>Datos básicos descriptivos</h5>
<div class="row">

   <div class="col-sm-4 col-md-4">

      <dt>Arquitectura</dt>
      <dd>

         <p class="control has-icon has-icon-right">


            <select class="form-control" v-model="sistema_operativo.arquitectura" name="arquitectura"
                    v-validate="{required:true,regex:/^[0-9x]+$/i}" data-vv-delay="500">
               <option value="x86">x86</option>
               <option value="x64">x64</option>
               <option value="x32">x32</option>
            </select>

            <transition name="bounce">
               <i v-show="errors.has('arquitectura')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('arquitectura')" class="text-danger small">
                  @{{ errors.first('arquitectura') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->



   <div class="col-sm-4 col-md-4">

      <dt>Nombre sistema operativo</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="sistema_operativo.nom_sistema_operativo" name="nom_sistema_operativo"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('nom_sistema_operativo')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('nom_sistema_operativo')" class="text-danger small">
                  @{{ errors.first('nom_sistema_operativo') }}
               </span>
            </transition>
         </p>
      </dd>


   </div><!-- .col -->
   <div class="col-sm-4 col-md-4">

      <dt>Detalle sistema operativo</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <textarea cols="15" rows="1" v-model="sistema_operativo.det_sistema_operativo" name="det_sistema_operativo"
                      v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                      class="form-control"></textarea>

            <transition name="bounce">
               <i v-show="errors.has('det_sistema_operativo')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('det_sistema_operativo')" class="text-danger small">
                  @{{ errors.first('det_sistema_operativo') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

</div><!-- .row -->


<h5>Versiones, licencia y detalles</h5>
<div class="row">

   <div class="col-sm-4 col-md-4">

      <dt>Versión sistema operativo</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="sistema_operativo.vers_sistema_operativo" name="vers_sistema_operativo"
                   v-validate="{regex:/^[a-zA-Z0-9_ ,.-]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('vers_sistema_operativo')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('vers_sistema_operativo')" class="text-danger small">
                  @{{ errors.first('vers_sistema_operativo') }}
               </span>
            </transition>
         </p>
      </dd>


   </div><!-- .col -->

   <div class="col-sm-4 col-md-4">

      <dt>Licencia sistema operativo</dt>
      <dd>
         <p class="control has-icon has-icon-right">

            <select class="form-control" v-model="sistema_operativo.lic_sistema_operativo" name="lic_sistema_operativo"
                    v-validate="{regex:/^[a-zA-Z]+$/i}" data-vv-delay="500">
               <option value="si">Si</option>
               <option value="no">No</option>
            </select>

            <transition name="bounce">
               <i v-show="errors.has('lic_sistema_operativo')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('lic_sistema_operativo')" class="text-danger small">
                  @{{ errors.first('lic_sistema_operativo') }}
               </span>
            </transition>
         </p>
      </dd>


   </div><!-- .col -->

   <div class="col-sm-4 col-md-4">

      <dt>Detalle licencia</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <textarea cols="15" rows="1" v-model="sistema_operativo.det_licencia_sistema_operativo" name="det_licencia_sistema_operativo"
                      v-validate="{regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                      class="form-control"></textarea>

            <transition name="bounce">
               <i v-show="errors.has('det_licencia_sistema_operativo')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('det_licencia_sistema_operativo')" class="text-danger small">
                  @{{ errors.first('det_licencia_sistema_operativo') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

</div><!-- .row -->


<h5>Idioma</h5>
<div class="row">

   <div class="col-sm-4 col-md-4">

      <dt>Idioma</dt>
      <dd>
         <p class="control has-icon has-icon-right">

            <select class="form-control" v-model="sistema_operativo.id_idioma" name="id_idioma"
                    v-validate="{required:true, regex:/^[0-9]+$/i}" data-vv-delay="500">
               <option :value="i.id_idioma" v-for="i in idiomas">
                  @{{ `${i.nom_idioma} -> ${i.det_idioma}` }}
               </option>
            </select>

            <transition name="bounce">
               <i v-show="errors.has('id_idioma')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('id_idioma')" class="text-danger small">
                  @{{ errors.first('id_idioma') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->


</div><!-- .row -->