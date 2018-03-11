<div class="tab-pane active" id="vista_principal_tab" role="tabpanel" aria-labelledby="vista_principal_tab">

   <br>

   <div class="row">
      <div class="col-sm-4 col-md-4">

         <!-- este bloque será reemplazado dinamicamente -->
         <div class="card" style="{{--width: 18rem;--}}">
            <img class="card-img-top" src="{{ url('/img/source.gif') }}" alt="Card image cap">
            <div class="card-body">
               <h5 class="card-title">
                  @{{ servidor.nom_servidor || '' }} <span class="badge badge-success float-right">estado:up</span>
               </h5>
               <p class="card-text">

                  <dl class="row" v-if="servidor">

                     <dd class="col-md-12">@{{ servidor.det_servidor || '' }}</dd>

                     <dt class="col-md-6">@{{ `${tabla_labels['ip_servidor']}`}}</dt>
                     <dd class="col-md-6 text-success">@{{`${servidor.ip_servidor || 0}`}}</dd>

                     <dt class="col-md-6">@{{ `${tabla_labels['ram']}`}}</dt>
                     <dd class="col-md-6 text-success">@{{separar_miles(`${servidor.ram || 0}`)}} mb</dd>

                     <dt class="col-md-6">@{{ `${tabla_labels['memoria_dd']}`}}</dt>
                     <dd class="col-md-6 text-success">@{{separar_miles(`${servidor.memoria_dd || 0}`)}} mb</dd>

                     <dt class="col-md-6">@{{ `${tabla_labels['swap']}`}}</dt>
                     <dd class="col-md-6 text-success">@{{separar_miles(`${servidor.swap || 0}`)}} mb</dd>

                     <dt class="col-md-6">@{{ `${tabla_labels['procesador']}`}}</dt>
                     <dd class="col-md-6 text-success">@{{`${servidor.procesador || 0}`}}</dd>

                     <dt class="col-md-6">@{{ `${tabla_labels['frec_procesador']}`}}</dt>
                     <dd class="col-md-6 text-success">@{{separar_miles(`${servidor.frec_procesador || 0}`)}} mhz</dd>

                     <dt class="col-md-6">@{{ `${tabla_labels['nucleos']}`}}</dt>
                     <dd class="col-md-6 text-success">@{{`${servidor.nucleos || 0}`}}</dd>

                  <dl v-else>
                     No hay información del servidor.
                  </dl>

               </p>
               {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
            </div>
         </div>

         <hr>

         <!-- este bloque será reemplazado dinamicamente -->
         <div class="card" style="{{--width: 18rem;--}}">
            <div class="card-body">
               <h5 class="card-title">
                  Datacentro
               </h5>
               <p class="card-text">

                  <dl class="row" v-if="servidor.datacentro">

                     <dt class="col-md-6">Nombre datacentro</dt>
                     <dd class="col-md-6 text-success">@{{ servidor.datacentro.nom_datacentro || 0 }}</dd>

                     <dt class="col-md-6">Detalle datacentro</dt>
                     <dd class="col-md-6 text-success">@{{ servidor.datacentro.det_datacentro || 0 }}</dd>

                     <dt class="col-md-6">Código datacentro</dt>
                     <dd class="col-md-6 text-success">@{{ servidor.datacentro.cod_datacentro || 0 }}</dd>

                  </dl>
                  <dl v-else>
                     No hay información de ubicación.
                  </dl>

               </p>
               {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
            </div>
         </div>


         <hr>

         <!-- este bloque será reemplazado dinamicamente -->
         <div class="card" style="{{--width: 18rem;--}}">
            <div class="card-body">
               <h5 class="card-title">
                  Sistema Operativo
               </h5>
               <p class="card-text">

               <dl class="row" v-if="servidor.sistema_operativo">

                  <dt class="col-md-6">Nombre SO</dt>
                  <dd class="col-md-6 text-success">@{{ servidor.sistema_operativo.nom_sistema_operativo|| 0 }}</dd>

                  <dt class="col-md-6">Arquitectura</dt>
                  <dd class="col-md-6 text-success">@{{ servidor.sistema_operativo.arquitectura || 0 }}</dd>

                  <dt class="col-md-6">Detalle SO</dt>
                  <dd class="col-md-6 text-success">@{{ servidor.sistema_operativo.det_sistema_operativo || 0 }}</dd>


               </dl>
               <dl v-else>
                  No hay información de ubicación.
               </dl>

               </p>
               {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
            </div>
         </div>



      </div>
      <div class="col-sm-8 col-md-8">



         <table class="table table-striped table-hover table-sm" v-if="servidor.datacentro">
            <thead>
               <th colspan="3">Nombre</th>
            </thead>
            <tbody>


               <tr>
                  <td colspan="3">
                        <pre style="font-family: 'Trebuchet MS';">
                           @{{ servidor.datacentro }}
                        </pre>
                  </td>
               </tr>


            </tbody>


         </table>

         <pre>
            @{{ servidor }}
         </pre>

      </div>
   </div>




</div>