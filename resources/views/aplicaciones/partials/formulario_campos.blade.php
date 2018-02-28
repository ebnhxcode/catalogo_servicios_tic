
<div class="row">
   <div class="col-sm-6 col-md-6">

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
                  @{{ errors.first('nom_aplicacion') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->
   <div class="col-sm-6 col-md-6">

      <dt>Detalle aplicacion</dt>
      <dd>

         <p class="control has-icon has-icon-right">
            <textarea cols="15" rows="2" v-model="aplicacion.det_aplicacion" name="det_aplicacion"
                      v-validate="{required:true,regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}" data-vv-delay="500"
                      class="form-control"></textarea>

            <transition name="bounce">
               <i v-show="errors.has('det_aplicacion')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('det_aplicacion')" class="text-danger small">
                  @{{ errors.first('det_aplicacion') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->
   <div class="col-sm-6 col-md-6">

      <dt>Alias
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
                  @{{ errors.first('alias') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->
   <div class="col-sm-6 col-md-6">

      <dt>Url de la aplicacion</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <input type="text" v-model="aplicacion.url_web" name="url_web"
                   {{--regex:/^[a-zA-Z0-9_ .,:/#$%&@!?+=()]+$/i--}}
                   v-validate="{required:true,url:true}" data-vv-delay="500"
                   class="form-control" />

            <transition name="bounce">
               <i v-show="errors.has('url_web')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('url_web')" class="text-danger small">
                  @{{ errors.first('url_web') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->
   <div class="col-sm-6 col-md-6">

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
                  @{{ errors.first('ip') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->
   <div class="col-sm-6 col-md-6">

      <dt>Dominio</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <select class="form-control" v-model="aplicacion.id_dominio" name="id_dominio"
                    v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500">
               <option value="1">
                  Minsal
               </option>
               {{--
               <option :value="p.id_permiso" v-for="p in permisos">
                  @{{ `${p.nom_permiso} -> ${p.det_permiso}` }}
               </option>
               --}}
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
   <div class="col-sm-6 col-md-6">

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
                  @{{ errors.first('subdominio') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->
   <div class="col-sm-6 col-md-6">

      <dt>SSL/TLS</dt>
      <dd>
         <p class="control has-icon has-icon-right">

            <toggle-button name="ssl_tls" v-model="aplicacion.ssl_tls"/>

            <transition name="bounce">
               <i v-show="errors.has('ssl_tls')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('ssl_tls')" class="text-danger small">
                  @{{ errors.first('ssl_tls') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->
   <div class="col-sm-6 col-md-6">

      <dt>Servicio</dt>
      <dd>
         <p class="control has-icon has-icon-right">
            <select class="form-control" v-model="aplicacion.id_servicio" name="id_servicio"
                    v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500">
               <option value="1">Servicio 1 </option>
               <option value="2">Servicio 2 </option>
               <option value="3">Servicio 3 </option>
               <option value="4">Servicio 4 </option>
               {{--
               <option :value="p.id_permiso" v-for="p in permisos">
                  @{{ `${p.nom_permiso} -> ${p.det_permiso}` }}
               </option>
               --}}
            </select>

            <transition name="bounce">
               <i v-show="errors.has('id_servicio')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('id_servicio')" class="text-danger small">
                  @{{ errors.first('id_servicio') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->
   <div class="col-sm-6 col-md-6">

      <dt>Tipo aplicación</dt>
      <dd>
         <p class="control has-icon has-icon-right">

            @{{  }}

            <select class="form-control" v-model="aplicacion.id_tipo_aplicacion" name="id_tipo_aplicacion"
                    v-validate="{required:true,regex:/^[0-9]+$/i}" data-vv-delay="500">
               <option :value="t.id_tipo_aplicacion" v-for="t in tipos_aplicaciones">
                  @{{ `${t.nom_tipo_aplicacion} -> ${t.det_tipo_aplicacion}` }}
               </option>
            </select>

            <transition name="bounce">
               <i v-show="errors.has('id_tipo_aplicacion')" class="fa fa-exclamation-circle"></i>
            </transition>

            <transition name="bounce">
               <span v-show="errors.has('id_tipo_aplicacion')" class="text-danger small">
                  @{{ errors.first('id_tipo_aplicacion') }}
               </span>
            </transition>
         </p>
      </dd>

   </div><!-- .col -->

</div><!-- .row -->
