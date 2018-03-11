
<h5>Datos básicos del servidor</h5>

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
            <textarea cols="15" rows="1" v-model="servidor.det_servidor" name="det_servidor"
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
</div><!-- .row -->


<h5>Datos básicos de ubicación del servidor y sistema base</h5>
<div class="row">

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

      <dt>Mac</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <input type="text" v-model="servidor.mac" name="mac"
                   v-validate="{mac:true}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('mac')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('mac')" class="text-danger small">
                  @{{ errors.first('mac') }}
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
                  @{{ `${s.nom_sistema_operativo} -> ${s.det_sistema_operativo}` }}
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

</div><!-- .row -->


<h5>Prestaciones de la máquina</h5>
<div class="row">


   <div class="col-sm-4 col-md-4">

      <dt>Ram</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="servidor.ram" name="ram"
                   v-validate="{integer:true}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('ram')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('ram')" class="text-danger small">
                  @{{ errors.first('ram') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

   <div class="col-sm-4 col-md-4">

      <dt>Memoria disco</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="servidor.memoria_dd" name="memoria_dd"
                   v-validate="{integer:true}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('memoria_dd')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('memoria_dd')" class="text-danger small">
                  @{{ errors.first('memoria_dd') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->


   <div class="col-sm-4 col-md-4">

      <dt>Swap</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="servidor.swap" name="swap"
                   v-validate="{integer:true}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('swap')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('swap')" class="text-danger small">
                  @{{ errors.first('swap') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->


   <div class="col-sm-4 col-md-4">

      <dt>Procesador</dt>
      <dd>
         <p class="control has-icon has-icon-right">

            <select class="form-control" v-model="servidor.procesador" name="procesador"
                    v-validate="{regex:/^[a-zA-Z]+$/i}" data-vv-delay="500">
               <option value="intel">Intel</option>
               <option value="amd">AMD</option>
            </select>

            <transition name="bounce">
               <i v-show="errors.has('procesador')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('procesador')" class="text-danger small">
                  @{{ errors.first('procesador') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->


   <div class="col-sm-4 col-md-4">

      <dt>Frec. Procesador</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="servidor.frec_procesador" name="frec_procesador"
                   v-validate="{integer:true}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('frec_procesador')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('frec_procesador')" class="text-danger small">
                  @{{ errors.first('frec_procesador') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

   <div class="col-sm-4 col-md-4">

      <dt>Nucleos</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="servidor.nucleos" name="nucleos"
                   v-validate="{integer:true}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('nucleos')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('nucleos')" class="text-danger small">
                  @{{ errors.first('nucleos') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->
</div><!-- .row -->


{{--
<h5>Acuerdo de usuarios por sistema</h5>
<div class="row">
   <div class="col-sm-6 col-md-6">

      <dt>Usuarios pactados</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="servidor.usuarios_pactados" name="usuarios_pactados"
                   v-validate="{integer:true}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('usuarios_pactados')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('usuarios_pactados')" class="text-danger small">
                  @{{ errors.first('usuarios_pactados') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

</div><!-- .row -->
--}}