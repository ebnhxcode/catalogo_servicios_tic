<!-- BEGIN HEADER -->
@include('layouts.header_modal', ['nom_modal'=>'crear'])
<!-- END HEADER -->

   <div class="row" style="margin: 10px;margin-top:20px;">
      <div class="col-md-12">

         <div class="float-right">
            <button @click.prevent="ocultar_modal('crear')" class="btn btn-sm btn-danger">
            ❌
            </button>
         </div>
         <!--################################-->
         <!-- Desde aquí comienza desarrollo -->
         <!--################################-->

         <h2>Nuevo Role</h2>
         <hr>

         <dl class="dl-vertical" style="overflow-y: auto;max-height: 450px;padding-bottom: 50px;">

            @include('roles.partials.formulario_campos')
            
            <dt>Finalizar</dt>
            <dd>
               <button class="btn btn-success" @click.prevent="guardar">
                  Guardar
               </button>
            </dd>


            <!--################################-->
            <!-- Desde aquí finaliza desarrollo -->
            <!--################################-->
         </dl><!-- .dl-vertical -->
      </div><!-- .col-* -->
   </div><!-- .row -->

<!-- BEGIN FOOTER -->
@include('layouts.footer_modal')
<!-- END FOOTER -->