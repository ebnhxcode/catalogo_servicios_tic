
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

      <dt>Cluster</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <select class="form-control" v-model="servidor.id_cluster" name="id_cluster"
                    v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500">
               <option :value="c.id_cluster" v-for="c in clusters">
                  @{{ `${c.nom_cluster} -> ${c.det_cluster}` }}
               </option>
            </select>

            <transition name="bounce">
               <i v-show="errors.has('id_cluster')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
                  <span v-show="errors.has('id_cluster')" class="text-danger small">
                     @{{ errors.first('id_cluster') }}
                  </span>
            </transition>
         </p>
      </dd>
   </div><!-- .col -->

   <div class="col-sm-6 col-md-6">

      <dt>Tipo Sistema Operativo</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <select class="form-control" v-model="servidor.id_tipo_sistema_operativo" name="id_tipo_sistema_operativo"
                    v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500">
               <option :value="tso.id_tipo_sistema_operativo" v-for="tso in tipos_sistemas_operativos">
                  @{{ `${tso.nom_tipo_sistema_operativo} -> ${tso.det_tipo_sistema_operativo}` }}
               </option>
            </select>

         </p>
      </dd>
   </div><!-- .col -->

   <div class="col-sm-6 col-md-6">

      <dt>Sistema Operativo</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <select class="form-control" v-model="servidor.id_sistema_operativo" name="id_sistema_operativo"
                    v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500">
               <option :value="s.id_sistema_operativo" v-for="s in sistemas_operativos"
                       v-if="s.id_tipo_sistema_operativo==servidor.id_tipo_sistema_operativo||servidor.id_tipo_sistema_operativo==null">
                  @{{ `${s.nom_sistema_operativo} -> ${s.vers_sistema_operativo}` }}
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

      <dt>Modelo Procesador</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="servidor.modelo_procesador" name="modelo_procesador"
                   v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('modelo_procesador')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('modelo_procesador')" class="text-danger small">
                  @{{ errors.first('modelo_procesador') }}
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


<h5 v-if="es_linux() == true">Distribución LVM Linux</h5>
<div class="row" v-if="es_linux() == true">

   <div class="col-sm-2 col-md-2">

      <dt>/ ~ Raiz</dt>
      <dd>
         <p class="control has-icon has-icon-right">

            <input type="text" v-model="servidor.lvm_raiz" name="lvm_raiz"
                   v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('lvm_raiz')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('lvm_raiz')" class="text-danger small">
                  @{{ errors.first('lvm_raiz') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->


   <div class="col-sm-2 col-md-2">

      <dt>/usr</dt>
      <dd>
         <p class="control has-icon has-icon-right">

            <input type="text" v-model="servidor.lvm_usr" name="lvm_usr"
                   v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('lvm_usr')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('lvm_usr')" class="text-danger small">
                  @{{ errors.first('lvm_usr') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

   <div class="col-sm-2 col-md-2">

      <dt>/tmp</dt>
      <dd>
         <p class="control has-icon has-icon-right">

            <input type="text" v-model="servidor.lvm_tmp" name="lvm_tmp"
                   v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('lvm_tmp')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('lvm_tmp')" class="text-danger small">
                  @{{ errors.first('lvm_tmp') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->


   <div class="col-sm-2 col-md-2">

      <dt>/var</dt>
      <dd>
         <p class="control has-icon has-icon-right">

            <input type="text" v-model="servidor.lvm_var" name="lvm_var"
                   v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('lvm_var')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('lvm_var')" class="text-danger small">
                  @{{ errors.first('lvm_var') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

   <div class="col-sm-2 col-md-2">

      <dt>/home</dt>
      <dd>
         <p class="control has-icon has-icon-right">

            <input type="text" v-model="servidor.lvm_home" name="lvm_home"
                   v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('lvm_home')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('lvm_home')" class="text-danger small">
                  @{{ errors.first('lvm_home') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

</div><!-- .row -->



<h5>Estado y ambiente</h5>
<div class="row">


   <div class="col-sm-6 col-md-6">

      <dt>Estado Servidor</dt>
      <dd>
         <p class="control has-icon has-icon-right">

            <select class="form-control" v-model="servidor.id_estado" name="id_estado"
                    v-validate="{required:true,integer:true}" data-vv-delay="500">
               <option :value="e.id_estado" v-for="e in estados">
                  @{{ `${e.nom_estado} -> ${e.det_estado}` }}
               </option>
            </select>

            <transition name="bounce">
               <i v-show="errors.has('id_estado')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('id_estado')" class="text-danger small">
                  @{{ errors.first('id_estado') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->


   <div class="col-sm-6 col-md-6">

      <dt>Ambiente Servidor</dt>
      <dd>
         <p class="control has-icon has-icon-right">

            <select class="form-control" v-model="servidor.id_ambiente" name="id_ambiente"
                    v-validate="{required:true,integer:true}" data-vv-delay="500">
               <option :value="a.id_ambiente" v-for="a in ambientes">
                  @{{ `${a.nom_ambiente} -> ${a.det_ambiente}` }}
               </option>
            </select>

            <transition name="bounce">
               <i v-show="errors.has('id_ambiente')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('id_ambiente')" class="text-danger small">
                  @{{ errors.first('id_ambiente') }}
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