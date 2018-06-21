<!-- BEGIN HEADER -->
@if(view()->exists('layouts.modal.header_modal'))
   @include('layouts.modal.header_modal', ['nom_modal'=>'crear'])
@endif
   <!-- END HEADER -->
   @if(view()->exists("$nombre_tabla.partials.formulario_campos"))
      @include("$nombre_tabla.partials.formulario_campos")
   @endif

   <br>

   <div class="card">
      <div class="card-body pro">

         <dt>Finalizar</dt>
         <dd>
            <button class="btn btn-success float-left" @click.prevent="guardar">
               Guardar
            </button>
            <button class="btn float-right" @click.prevent="limpiar_objeto_clase_local">
               Limpiar Formulario
            </button>
         </dd>

      </div>
   </div>



<!-- BEGIN FOOTER -->
@if(view()->exists('layouts.modal.footer_modal'))
   @include('layouts.modal.footer_modal')
@endif

<!-- END FOOTER -->