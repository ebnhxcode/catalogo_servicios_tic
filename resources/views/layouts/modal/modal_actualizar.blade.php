<!-- BEGIN HEADER -->
@include('layouts.modal.header_modal', ['nom_modal'=>'actualizar'])
<!-- END HEADER -->


<!-- Nav tabs -->
<ul class="nav nav-tabs" id="tab_panel" role="tablist">
   <li class="nav-item">
      <a class="nav-link active" id="vista_principal_tab" data-toggle="tab" href="#vista_principal_tab" role="tab"
         aria-controls="home" aria-selected="true">Vista principal</a>
   </li>
   <li class="nav-item">
      <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Actualización</a>
   </li>

</ul>

<!-- Tab panes -->
<div class="tab-content">
   <div class="tab-pane active" id="home" role="tabpanel" aria-labelledby="vista_principal_tab">


   </div>
   <div class="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab">
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