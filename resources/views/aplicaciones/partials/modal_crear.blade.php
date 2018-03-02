<!-- BEGIN HEADER -->
@include('layouts.modal.header_modal', ['nom_modal'=>'crear'])
<!-- END HEADER -->


   @include("$nombre_tabla.partials.formulario_campos")

   <dt>Finalizar</dt>
   <dd>
      <button class="btn btn-success" @click.prevent="guardar">
         Guardar
      </button>
   </dd>


<!-- BEGIN FOOTER -->
@include('layouts.modal.footer_modal')
<!-- END FOOTER -->