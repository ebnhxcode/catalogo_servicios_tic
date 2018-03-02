<!-- BEGIN HEADER -->
@include('layouts.modal.header_modal', ['nom_modal'=>'actualizar'])
   <!-- END HEADER -->


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

<!-- BEGIN FOOTER -->
@include('layouts.modal.footer_modal')
   <!-- END FOOTER -->