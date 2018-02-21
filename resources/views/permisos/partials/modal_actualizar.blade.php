<!-- BEGIN HEADER -->
@include('layouts.header_modal', ['nom_modal'=>'actualizar'])
<!-- END HEADER -->

   <div class="row" style="margin: 10px;margin-top:20px;">
      <div class="col-md-12">

         <div class="float-right">
            <button @click="ocultar_modal('actualizar')" class="btn btn-sm btn-danger">
            ❌
            </button>
         </div>
         <!--################################-->
         <!-- Desde aquí comienza desarrollo -->
         <!--################################-->

         <h2>Actualizar Permiso</h2>
         <hr>

         <dl class="dl-vertical" style="overflow-y: auto;max-height: 450px;padding-bottom: 50px;">

            <dt>Nombre Permiso</dt>
            <dd>
               <input name="nom_permiso" type="text" id="nom_permiso" v-model="permiso.nom_permiso"
                      placeholder="nombre del permiso" class="form-control" />
            </dd>

            <dt>Detalle Permiso</dt>
            <dd>
               <textarea name="det_permiso" id="det_permiso" v-model="permiso.det_permiso" cols="15" rows="5"
                         class="form-control"></textarea>
            </dd>

            <dt>Código Permiso</dt>
            <dd>
               <input name="cod_permiso" type="text" id="cod_permiso" v-model="permiso.cod_permiso"
                      placeholder="código del permiso" class="form-control" />
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