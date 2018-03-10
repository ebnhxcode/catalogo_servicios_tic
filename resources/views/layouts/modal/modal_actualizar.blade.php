<!-- BEGIN HEADER -->
@include('layouts.modal.header_modal', ['nom_modal'=>'actualizar'])
<!-- END HEADER -->





<!-- Nav tabs -->
<ul class="nav nav-tabs justify-content-center" id="tab_panel" role="tablist">
   <li class="nav-item">
      <a class="nav-link active" data-toggle="tab" href="#vista_principal_tab" role="tab"
         aria-controls="vista_principal" aria-selected="true">General</a>
   </li>
   <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#vista_actualizar_tab" role="tab"
         aria-controls="vista_actualizar" aria-selected="false">Opciones</a>
   </li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
   <div class="tab-pane active" id="vista_principal_tab" role="tabpanel" aria-labelledby="vista_principal_tab">

      <br>

      <div class="row">
         <div class="col-sm-4 col-md-4">

            <div class="card" style="width: 18rem;">
               <img class="card-img-top" src="{{ url('/img/source.gif') }}" alt="Card image cap">
               <div class="card-body">
                  <h5 class="card-title">
                     @{{ servidor.nom_servidor || '' }} <span class="badge badge-success float-right">estado:up</span>
                  </h5>
                  <p class="card-text">
                     @{{ servidor.det_servidor || '' }}


                  @{{ `${tabla_labels['ip_servidor']}`}}
                  <span class="text-success float-right">
                     @{{`${servidor.ip_servidor || 0}`}}
                  </span> <br>

                  @{{ `${tabla_labels['ram']}`}}
                  <span class="text-success float-right">
                     @{{`${servidor.ram || 0}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}} mb
                  </span> <br>

                  @{{ `${tabla_labels['memoria_dd']}`}}
                  <span class="text-success float-right">
                     @{{`${servidor.memoria_dd || 0}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}} mb
                  </span> <br>

                  @{{ `${tabla_labels['swap']}`}}
                  <span class="text-success float-right">
                     @{{`${servidor.swap || 0}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}} mb
                  </span> <br>

                  @{{ `${tabla_labels['procesador']}`}}
                  <span class="text-success float-right">
                     @{{`${servidor.procesador || 0}`}}
                  </span> <br>

                  @{{ `${tabla_labels['frec_procesador']}`}}
                  <span class="text-success float-right">
                     @{{`${servidor.frec_procesador || 0}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}} mhz
                  </span> <br>

                  @{{ `${tabla_labels['nucleos']}`}}
                  <span class="text-success float-right">
                     @{{`${servidor.nucleos || 0}`}}
                  </span> <br>


                  </p>
                  {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
               </div>
            </div>

         </div>
         <div class="col-sm-8 col-md-8">




         </div>
      </div>




   </div>
   <div class="tab-pane" id="vista_actualizar_tab" role="tabpanel" aria-labelledby="vista_actualizar_tab">

      <br>

      @include("$nombre_tabla.partials.formulario_campos")

      <dt>Finalizar</dt>

      <dd>
         <button class="btn btn-success" @click.prevent="guardar_editado">
            Guardar
         </button>
         <button class="btn btn-danger float-right" @click.prevent="{{ "eliminar($nombre_modelo.id_$nombre_modelo)" }}">
            Eliminar
         </button>

      </dd>

   </div>

</div>


<!-- BEGIN FOOTER -->
@include('layouts.modal.footer_modal')
<!-- END FOOTER -->