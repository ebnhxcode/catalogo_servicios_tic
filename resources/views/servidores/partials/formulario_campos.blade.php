
<div class="row">
   <div class="col-sm-6 col-md-6">

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
   <div class="col-sm-6 col-md-6">

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
   <div class="col-sm-6 col-md-6">

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
   <div class="col-sm-6 col-md-6">

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



   <div class="col-sm-6 col-md-6">

      <dt>Datacentro</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <select class="form-control" v-model="servidor.id_datacentro" name="id_datacentro"
                    v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500">
               <option :value="d.id_datacentro" v-for="d in datacentros">
                  @{{ `${d.nom_datacentro} -> ${d.det_datacentro}` }}
               </option>
            </select>

            <transition name="bounce">
               <i v-show="errors.has('id_datacentro')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
                  <span v-show="errors.has('id_datacentro')" class="text-danger small">
                     @{{ errors.first('id_datacentro') }}
                  </span>
            </transition>
         </p>
      </dd>
   </div><!-- .col -->

   <div class="col-sm-6 col-md-6">

      <dt>Sistema Operativo</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <select class="form-control" v-model="servidor.id_sistema_operativo" name="id_sistema_operativo"
                    v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500">
               <option :value="s.id_sistema_operativo" v-for="s in sistemas_operativos">
                  @{{ `${s.nom_sistema_operativo} -> ${d.det_sistema_operativo}` }}
               </option>
            </select>

            <transition name="bounce">
               <i v-show="errors.has('id_sistema_operativo')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
                  <span v-show="errors.has('id_sistema_operativo')" class="text-danger small">
                     @{{ errors.first('id_sistema_operativo') }}
                  </span>
            </transition>
         </p>
      </dd>
   </div><!-- .col -->

   <div class="col-sm-6 col-md-6">

      <dt>Dominio</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <select class="form-control" v-model="servidor.id_dominio" name="id_dominio"
                    v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500">
               <option :value="d.id_dominio" v-for="d in dominios">
                  @{{ `${d.nom_dominio} -> ${d.det_dominio}` }}
               </option>
            </select>

            <transition name="bounce">
               <i v-show="errors.has('id_dominio')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
                  <span v-show="errors.has('id_dominio')" class="text-danger small">
                     @{{ errors.first('id_dominio') }}
                  </span>
            </transition>
         </p>
      </dd>
   </div><!-- .col -->



</div><!-- .row -->
