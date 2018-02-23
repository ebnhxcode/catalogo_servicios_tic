<!-- BEGIN HEADER -->
@include('layouts.header_modal', ['nom_modal'=>'actualizar'])
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

            <dt>Nombre Role</dt>
            <dd>
               <input name="nom_role" type="text" id="nom_role" v-model="role.nom_role"
                      placeholder="nombre del role" class="form-control" />
            </dd>

            <dt>Detalle Role</dt>
            <dd>
               <textarea name="det_role" id="det_role" v-model="role.det_role" cols="15" rows="5"
                         class="form-control"></textarea>
            </dd>

            <dt>Finalizar</dt>
            <dd>
               <button class="btn btn-success" @click.prevent="">
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