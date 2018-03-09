<h5>Datos básicos</h5>
<div class="row">
   <div class="col-sm-6 col-md-6">

      <dt>Nombre dominio</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="dominio.nom_dominio" name="nom_dominio"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('nom_dominio')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('nom_dominio')" class="text-danger small">
                  @{{ errors.first('nom_dominio') }}
               </span>
            </transition>
         </p>
      </dd>


   </div><!-- .col -->
   <div class="col-sm-6 col-md-6">

      <dt>Detalle dominio</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <textarea cols="15" rows="1" v-model="dominio.det_dominio" name="det_dominio"
                      v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                      class="form-control"></textarea>

            <transition name="bounce">
               <i v-show="errors.has('det_dominio')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('det_dominio')" class="text-danger small">
                  @{{ errors.first('det_dominio') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->
</div><!-- .row -->


<h5>Información de direcciones de red</h5>
<div class="row">
   <div class="col-sm-4 col-md-4">

      <dt>Ip pública</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="dominio.ip_publica" name="ip_publica"
                   v-validate="{required:true,ip:true}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('ip_publica')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('ip_publica')" class="text-danger small">
                  @{{ errors.first('ip_publica') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

   <div class="col-sm-4 col-md-4">

      <dt>Ip balanceador</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="dominio.ip_balanceador" name="ip_balanceador"
                   v-validate="{ip:true}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('ip_balanceador')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('ip_balanceador')" class="text-danger small">
                  @{{ errors.first('ip_balanceador') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

   <div class="col-sm-4 col-md-4">

      <dt>DNS Asociado</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="dominio.dns_asoc_dominio" name="dns_asoc_dominio"
                   v-validate="{ip:true}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('dns_asoc_dominio')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('dns_asoc_dominio')" class="text-danger small">
                  @{{ errors.first('dns_asoc_dominio') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

</div><!-- .row -->
