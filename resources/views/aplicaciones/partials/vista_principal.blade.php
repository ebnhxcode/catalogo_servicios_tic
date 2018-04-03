<div class="row">
   <div class="col-sm-4 col-md-4">

      <!-- este bloque será reemplazado dinamicamente -->
      <div class="card pro" style="{{--width: 18rem;--}}">
         <img class="card-img-top" src="{{ url('/img/aplicación-web-y-de-escritorio-01.jpg') }}" alt="Card image cap">
         <div class="card-body">
            <h5 class="card-title">
               @{{ aplicacion.nom_aplicacion || '' }}
            </h5>
            <p class="card-text">

            <dl class="row" v-if="aplicacion">

               <dd class="col-md-12">@{{ aplicacion.det_aplicacion || '' }}</dd>

               <dt class="col-md-6">@{{ `${tabla_labels['alias']}`}}</dt>
               <dd class="col-md-6">@{{`${aplicacion.alias || 0}`}}</dd>

               <dt class="col-md-6">@{{ `${tabla_labels['ip']}`}}</dt>
               <dd class="col-md-6">@{{`${aplicacion.ip || 0}`}}</dd>

               <dt class="col-md-6">@{{ `${tabla_labels['url_web']}`}}</dt>
               <dd class="col-md-6">@{{`${aplicacion.url_web || 0}`}}</dd>

               <dt class="col-md-6">@{{ `${tabla_labels['subdominio']}`}}</dt>
               <dd class="col-md-6">@{{`${aplicacion.subdominio || 0}`}}</dd>

               <dt class="col-md-6">@{{ `${tabla_labels['ip']}`}}</dt>
               <dd class="col-md-6">@{{`${aplicacion.ip || 0}`}}</dd>

               <dt class="col-md-6">@{{ `${tabla_labels['ssl_tls']}`}}</dt>
               <dd class="col-md-6">@{{`${aplicacion.ssl_tls || 0}`}}</dd>


            </dl>

            <dl v-else>
               No hay información de la aplicacion.
            </dl>

            </p>
            {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
         </div><!-- .card-body -->
      </div><!-- .card -->

      <br>


      <!-- este bloque será reemplazado dinamicamente -->
      <div class="card pro" style="{{--width: 18rem;--}}">
         <div class="card-body">
            <h5 class="card-title">
               Tipo Aplicación
            </h5>
            <p class="card-text">

            <dl class="row" v-if="aplicacion.tipo_aplicacion">

               <dt class="col-md-6">Nombre tipo aplicacion</dt>
               <dd class="col-md-6">@{{ aplicacion.tipo_aplicacion.nom_tipo_aplicacion || 0 }}</dd>

               <dt class="col-md-6">Detalle tipo aplicacion</dt>
               <dd class="col-md-6">@{{ aplicacion.tipo_aplicacion.det_tipo_aplicacion || 0 }}</dd>

               <dt class="col-md-6">Código tipo aplicacion</dt>
               <dd class="col-md-6">@{{ aplicacion.tipo_aplicacion.cod_tipo_aplicacion || 0 }}</dd>

            </dl>
            <dl v-else>
               No hay información de tipo de aplicación.
            </dl>

            </p>
            {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
         </div><!-- .card-body -->
      </div><!-- .card -->


      <br>


      <!-- este bloque será reemplazado dinamicamente -->
      <div class="card pro" style="{{--width: 18rem;--}}">
         <div class="card-body">
            <h5 class="card-title">
               Servicio al que pertenece
            </h5>
            <p class="card-text">

            <dl class="row" v-if="aplicacion.servicio">

               <dt class="col-md-6">Nombre servicio</dt>
               <dd class="col-md-6">@{{ aplicacion.servicio.nom_servicio || 0 }}</dd>

               <dt class="col-md-6">Detalle servicio</dt>
               <dd class="col-md-6">@{{ aplicacion.servicio.det_servicio || 0 }}</dd>

            </dl>
            <dl v-else>
               No hay información de servicio.
            </dl>

            </p>
            {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
         </div><!-- .card-body -->
      </div><!-- .card -->


      <br>


      <!-- este bloque será reemplazado dinamicamente -->
      <div class="card pro" style="{{--width: 18rem;--}}">
         <div class="card-body">
            <h5 class="card-title">
               Servidor donde se encuentra alojado
            </h5>
            <p class="card-text">

            <dl class="row" v-if="aplicacion.servidor">

               <dt class="col-md-6">Nombre servidor</dt>
               <dd class="col-md-6">@{{ aplicacion.servidor.nom_servidor || 0 }}</dd>

               <dt class="col-md-6">Detalle servidor</dt>
               <dd class="col-md-6">@{{ aplicacion.servidor.det_servidor || 0 }}</dd>

            </dl>
            <dl v-else>
               No hay información de servidor.
            </dl>

            </p>
            {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
         </div><!-- .card-body -->
      </div><!-- .card -->


      <br>

      <!-- este bloque será reemplazado dinamicamente -->
      <div class="card pro" style="{{--width: 18rem;--}}">
         <div class="card-body">
            <h5 class="card-title">
               Dominio
            </h5>
            <p class="card-text">

            <dl class="row" v-if="aplicacion.dominio">

               <dt class="col-md-6">Nombre dominio</dt>
               <dd class="col-md-6">@{{ aplicacion.dominio.nom_dominio || 0 }}</dd>

               <dt class="col-md-6">Detalle dominio</dt>
               <dd class="col-md-6">@{{ aplicacion.dominio.det_dominio || 0 }}</dd>

            </dl>
            <dl v-else>
               No hay información de dominio.
            </dl>

            </p>
            {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
         </div><!-- .card-body -->
      </div><!-- .card -->


      <br>

   </div><!-- .col -->

   <div class="col-sm-8 col-md-8">




   </div><!-- .col -->


</div><!-- .row -->