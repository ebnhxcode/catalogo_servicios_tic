<!-- BEGIN HEADER -->
@if(view()->exists('layouts.modal.header_modal'))
   @include('layouts.modal.header_modal', ['nom_modal'=>'actualizar'])
@endif
<!-- END HEADER -->





<!-- Nav tabs -->
<ul class="nav nav-tabs justify-content-center" id="tab_panel" role="tablist">
   <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#vista_principal_tab" role="tab"
         aria-controls="vista_principal" aria-selected="true">Vista General</a>
   </li>
   <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#vista_actualizar_tab" role="tab"
         aria-controls="vista_actualizar" aria-selected="false">Opciones</a>
   </li>
</ul>

<!-- Tab panes -->
<div class="tab-content">

   <!-- La vista principal que se incluye en el modal de actualizar o gestionar el registro unico -->
   @if(view()->exists("$nombre_tabla.partials.vista_principal"))
      <div class="tab-pane active" id="vista_principal_tab" role="tabpanel" aria-labelledby="vista_principal_tab">
         <br>
         @include("$nombre_tabla.partials.vista_principal")
      </div><!-- .tab-pane .active #vista_principal_tab -->
   @endif




   <!-- La subvista que se encarga de importar los campos del formulario -->
   <div class="tab-pane fade" id="vista_actualizar_tab" role="tabpanel" aria-labelledby="vista_actualizar_tab">

      <br>

      @if(view()->exists("$nombre_tabla.partials.formulario_campos"))
         @include("$nombre_tabla.partials.formulario_campos")
      @endif

      <dt>Finalizar</dt>

      <dd>
         <button class="btn btn-success" @click.prevent="guardar_editado">
            Guardar
         </button>
         <button class="btn float-right" @click.prevent="limpiar_objeto_clase_local">
            Limpiar
         </button>
         <button class="btn btn-danger float-right mr-sm-2" @click.prevent="{{ "eliminar($nombre_modelo.id_$nombre_modelo)" }}">
            Eliminar
         </button>

      </dd>

   </div>

</div>


<!-- BEGIN FOOTER -->
@if(view()->exists("layouts.modal.footer_modal"))
   @include("layouts.modal.footer_modal")
@endif
<!-- END FOOTER -->