<template>

   <div>
      <h5>Datos básicos</h5>
      <div class="row">
         <div class="col-sm-3 col-md-3">

            <dt>Nombre aplicacion</dt>
            <dd>
               <p class="control has-icon has-icon-right">
                  <input type="text" v-model="aplicacion.nom_aplicacion" name="nom_aplicacion"
                         v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                         class="form-control" />

                  <transition name="bounce">
                     <i v-show="errors.has('nom_aplicacion')" class="fa fa-exclamation-circle"></i>
                  </transition>

                  <transition name="bounce">
               <span v-show="errors.has('nom_aplicacion')" class="text-danger small">
                  {{ errors.first('nom_aplicacion') }}
               </span>
                  </transition>
               </p>
            </dd>

         </div><!-- .col -->

         <div class="col-sm-3 col-md-3">

            <dt>Alias</dt>
            <dd>
               <p class="control has-icon has-icon-right">
                  <input type="text" v-model="aplicacion.alias" name="alias"
                         v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
                         class="form-control" />

                  <transition name="bounce">
                     <i v-show="errors.has('alias')" class="fa fa-exclamation-circle"></i>
                  </transition>

                  <transition name="bounce">
               <span v-show="errors.has('alias')" class="text-danger small">
                  {{ errors.first('alias') }}
               </span>
                  </transition>
               </p>
            </dd>

         </div><!-- .col -->

         <div class="col-sm-6 col-md-6">

            <dt>Detalle aplicacion</dt>
            <dd>

               <p class="control has-icon has-icon-right">
            <textarea cols="15" rows="1" v-model="aplicacion.det_aplicacion" name="det_aplicacion"
                      v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                      class="form-control"></textarea>

                  <transition name="bounce">
                     <i v-show="errors.has('det_aplicacion')" class="fa fa-exclamation-circle"></i>
                  </transition>

                  <transition name="bounce">
               <span v-show="errors.has('det_aplicacion')" class="text-danger small">
                  {{ errors.first('det_aplicacion') }}
               </span>
                  </transition>
               </p>
            </dd>

         </div><!-- .col -->

      </div><!-- .row -->


      <h5>Datos de red</h5>
      <div class="row">

         <div class="col-sm-3 col-md-3">

            <dt>Url de la aplicacion</dt>
            <dd>
               <p class="control has-icon has-icon-right">
                  <input type="text" v-model="aplicacion.url_web" name="url_web"
                         v-validate="{required:true,url:true}" data-vv-delay="500"
                         class="form-control" />

                  <transition name="bounce">
                     <i v-show="errors.has('url_web')" class="fa fa-exclamation-circle"></i>
                  </transition>

                  <transition name="bounce">
               <span v-show="errors.has('url_web')" class="text-danger small">
                  {{ errors.first('url_web') }}
               </span>
                  </transition>
               </p>
            </dd>

         </div><!-- .col -->

         <div class="col-sm-3 col-md-3">

            <dt>Dominio</dt>
            <dd>
               <p class="control has-icon has-icon-right">
                  <select class="form-control" v-model="aplicacion.id_dominio" name="id_dominio"
                          v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500">
                     <option :value="d.id_dominio" v-for="d in dominios">
                        {{ `${d.nom_dominio} -> ${d.det_dominio}` }}
                     </option>
                  </select>

                  <transition name="bounce">
                     <i v-show="errors.has('id_dominio')" class="fa fa-exclamation-circle"></i>
                  </transition>

                  <transition name="bounce">
               <span v-show="errors.has('id_dominio')" class="text-danger small">
                  {{ errors.first('id_dominio') }}
               </span>
                  </transition>
               </p>
            </dd>

         </div><!-- .col -->
         <div class="col-sm-3 col-md-3">

            <dt>Subdominio</dt>
            <dd>
               <p class="control has-icon has-icon-right">

                  <input type="text" v-model="aplicacion.subdominio" name="subdominio"
                         v-validate="{required:true,regex:/^[a-zA-Z0-9_ .,:/#$%&@!?+=()]+$/i}" data-vv-delay="500"
                         class="form-control" />

                  <transition name="bounce">
                     <i v-show="errors.has('subdominio')" class="fa fa-exclamation-circle"></i>
                  </transition>

                  <transition name="bounce">
               <span v-show="errors.has('subdominio')" class="text-danger small">
                  {{ errors.first('subdominio') }}
               </span>
                  </transition>
               </p>
            </dd>

         </div><!-- .col -->
         <div class="col-sm-3 col-md-3">

            <dt>Ip de la aplicacion</dt>
            <dd>
               <p class="control has-icon has-icon-right">
                  <input type="text" v-model="aplicacion.ip" name="ip"
                         v-validate="{required:true,ip:true}" data-vv-delay="500"
                         class="form-control" />

                  <transition name="bounce">
                     <i v-show="errors.has('ip')" class="fa fa-exclamation-circle"></i>
                  </transition>

                  <transition name="bounce">
               <span v-show="errors.has('ip')" class="text-danger small">
                  {{ errors.first('ip') }}
               </span>
                  </transition>
               </p>
            </dd>

         </div><!-- .col -->
         <div class="col-sm-3 col-md-3">

            <dt>SSL/TLS</dt>
            <dd>
               <p class="control has-icon has-icon-right">

                  <toggle-button
                     :sync="true"
                     :value="aplicacion.ssl_tls=($parent.en_array([true, 'true', 1], aplicacion.ssl_tls)?true:false)"
                     :width="90"
                     :labels="{checked: 'SSL Activo <i class=`fa fa-check`></i>', unchecked: 'Sin SSL'}"
                     v-model="aplicacion.ssl_tls"/>


                  <transition name="bounce">
                     <i v-show="errors.has('ssl_tls')" class="fa fa-exclamation-circle"></i>
                  </transition>

                  <transition name="bounce">
               <span v-show="errors.has('ssl_tls')" class="text-danger small">
                  {{ errors.first('ssl_tls') }}
               </span>
                  </transition>
               </p>
            </dd>

         </div><!-- .col -->
      </div><!-- .row -->


      <h5>Datos de asociación</h5>
      <div class="row">

         <div class="col-sm-4 col-md-4">

            <dt>Servicio</dt>
            <dd>
               <p class="control has-icon has-icon-right">
                  <select class="form-control" v-model="aplicacion.id_servicio" name="id_servicio"
                          v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500">
                     <option :value="s.id_servicio" v-for="s in servicios">
                        {{ `${s.nom_servicio} -> ${s.det_servicio}` }}
                     </option>
                  </select>

                  <transition name="bounce">
                     <i v-show="errors.has('id_servicio')" class="fa fa-exclamation-circle"></i>
                  </transition>

                  <transition name="bounce">
               <span v-show="errors.has('id_servicio')" class="text-danger small">
                  {{ errors.first('id_servicio') }}
               </span>
                  </transition>
               </p>
            </dd>

         </div><!-- .col -->
         <div class="col-sm-4 col-md-4">

            <dt>Tipo aplicación</dt>
            <dd>
               <p class="control has-icon has-icon-right">

                  <select class="form-control" v-model="aplicacion.id_tipo_aplicacion" name="id_tipo_aplicacion"
                          v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500">
                     <option :value="t.id_tipo_aplicacion" v-for="t in tipos_aplicaciones">
                        {{ `${t.nom_tipo_aplicacion} -> ${t.det_tipo_aplicacion}` }}
                     </option>
                  </select>

                  <transition name="bounce">
                     <i v-show="errors.has('id_tipo_aplicacion')" class="fa fa-exclamation-circle"></i>
                  </transition>

                  <transition name="bounce">
               <span v-show="errors.has('id_tipo_aplicacion')" class="text-danger small">
                  {{ errors.first('id_tipo_aplicacion') }}
               </span>
                  </transition>
               </p>
            </dd>

         </div><!-- .col -->
         <div class="col-sm-4 col-md-4">

            <dt>Servidor</dt>
            <dd>
               <p class="control has-icon has-icon-right">

                  <select class="form-control" v-model="aplicacion.id_servidor" name="id_servidor"
                          v-validate="{regex:/^[0-9]+$/i}" data-vv-delay="500">
                     <option :value="s.id_servidor" v-for="s in servidores">
                        {{ `${s.nom_servidor} -> ${s.det_servidor}` }}
                     </option>
                  </select>

                  <transition name="bounce">
                     <i v-show="errors.has('id_servidor')" class="fa fa-exclamation-circle"></i>
                  </transition>

                  <transition name="bounce">
               <span v-show="errors.has('id_servidor')" class="text-danger small">
                  {{ errors.first('id_servidor') }}
               </span>
                  </transition>
               </p>
            </dd>

         </div><!-- .col -->

      </div><!-- .row -->
   </div>

</template>
<script>
   export default {
      name: 'formulario-campos-aplicacion',
      props: ['aplicacion','dominios','servicios','tipos_aplicaciones','servidores'],
      //template: ``,
      data: function () {
         return {
            'id_en_edicion':null,
         }
      },
      created: function () {
      },
      computed: {
      },
      methods: {
      }
   }
</script>