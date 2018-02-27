<!-- BEGIN HEADER -->
@include('layouts.modal.header_modal', ['nom_modal'=>'crear'])
<!-- END HEADER -->

<div class="row" style="margin: 10px;margin-top:20px;">
   <div class="col-md-12">

      <div class="float-right">
         <button @click.prevent="ocultar_modal('crear')" class="btn btn-sm btn-danger">
            ❌
         </button>
      </div>

      <h2>Nuevo {{$nombre_modelo}}</h2>
      <hr>

      <dl class="dl-vertical" style="overflow-y: auto;max-height: 450px;padding-bottom: 50px;">

         @include("$nombre_tabla.partials.formulario_campos")

         <dt>Finalizar</dt>
         <dd>
            <button class="btn btn-success" @click.prevent="guardar">
               Guardar
            </button>
         </dd>

      </dl><!-- .dl-vertical -->
   </div><!-- .col-* -->
</div><!-- .row -->

<!-- BEGIN FOOTER -->
@include('layouts.modal.footer_modal')
<!-- END FOOTER -->