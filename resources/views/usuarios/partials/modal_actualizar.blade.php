<!-- BEGIN HEADER -->
@include('layouts.modal.header_modal', ['nom_modal'=>'actualizar'])
   <!-- END HEADER -->

<div class="row" style="margin: 10px;margin-top:20px;">
   <div class="col-md-12">

      <div class="float-right">
         <button @click.prevent="ocultar_modal('actualizar')" class="btn btn-sm btn-danger">
            ❌
         </button>
      </div>
      <!--################################-->
      <!-- Desde aquí comienza desarrollo -->
      <!--################################-->

      <h2>Actualizar Role</h2>
      <hr>

      <dl class="dl-vertical" style="overflow-y: auto;max-height: 450px;padding-bottom: 50px;">

         @include("$nombre_tabla.partials.formulario_campos")

         <dt>Finalizar</dt>
         <dd>
            <button class="btn btn-success" @click.prevent="guardar_editado">
               Guardar
            </button>
            <button class="btn btn-danger float-right" @click.prevent="eliminar(usuario.id_usuario)">
               Eliminar
            </button>
         </dd>


         <!--################################-->
         <!-- Desde aquí finaliza desarrollo -->
         <!--################################-->
      </dl><!-- .dl-vertical -->
   </div><!-- .col-* -->
</div><!-- .row -->


<!-- BEGIN FOOTER -->
@include('layouts.modal.footer_modal')
   <!-- END FOOTER -->