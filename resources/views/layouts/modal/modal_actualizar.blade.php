<!-- BEGIN HEADER -->
@include('layouts.modal.header_modal', ['nom_modal'=>'actualizar'])
<!-- END HEADER -->





<!-- Nav tabs -->
<ul class="nav nav-tabs justify-content-center" id="tab_panel" role="tablist">
   <li class="nav-item">
      <a class="nav-link active" data-toggle="tab" href="#vista_principal_tab" role="tab"
         aria-controls="vista_principal" aria-selected="true">Vista principal</a>
   </li>
   <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#vista_actualizar_tab" role="tab"
         aria-controls="vista_actualizar" aria-selected="false">Actualización</a>
   </li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
   <div class="tab-pane active" id="vista_principal_tab" role="tabpanel" aria-labelledby="vista_principal_tab">

      <br>

      <div class="row">
         <div class="col-sm-4 col-md-4">

            <div class="card" style="width: 18rem;">
               <img class="card-img-top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1620c47e69c%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1620c47e69c%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22106.3984375%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Card image cap">
               <div class="card-body">
                  <h5 class="card-title">
                     @{{ servidor.nom_servidor || '' }}
                  </h5>
                  <p class="card-text">
                     @{{ servidor.det_servidor || '' }}
                  </p>
                  {{--<a href="#" class="btn btn-primary">Go somewhere</a>--}}
               </div>
            </div>

         </div>
         <div class="col-sm-8 col-md-8">

            <pre>
               @{{ servidor }}
            </pre>


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