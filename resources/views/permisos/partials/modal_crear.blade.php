<!-- BEGIN HEADER -->
@include('layouts.modal.header_modal', ['nom_modal'=>'crear'])
<!-- END HEADER -->

   <div class="row" style="margin: 10px;margin-top:20px;">
      <div class="col-md-12">

         <div class="float-right">
            <button @click="ocultar_modal('crear')" class="btn btn-sm btn-danger">
            ❌
            </button>
         </div>
         <!--################################-->
         <!-- Desde aquí comienza desarrollo -->
         <!--################################-->

         <h2>Nuevo Permiso</h2>
         <hr>

         <dl class="dl-vertical" style="overflow-y: auto;max-height: 450px;padding-bottom: 50px;">

            <dt>Nombre Permiso</dt>
            <dd>
               <p class="control has-icon has-icon-right">
                  <input name="nom_permiso" type="text" id="nom_permiso" v-model="permiso.nom_permiso"
                         v-validate="'required'" data-vv-delay="500" placeholder="nombre del permiso"
                         class="form-control" />

                  <transition name="bounce">
                     <i v-show="errors.has('nom_permiso')" class="fa fa-exclamation-circle"></i>
                  </transition>

                  <transition name="bounce">
                     <span v-show="errors.has('nom_permiso')" class="text-danger">
                        @{{ errors.first('nom_permiso') }}
                     </span>
                  </transition>
               </p>
            </dd>

            <dt>Detalle Permiso</dt>
            <dd>
               <p class="control has-icon has-icon-right">
                  <textarea name="det_permiso" id="det_permiso" v-model="permiso.det_permiso" cols="15" rows="2"
                            v-validate="'required'" data-vv-delay="500"
                           class="form-control"></textarea>

                  <transition name="bounce">
                     <i v-show="errors.has('det_permiso')" class="fa fa-exclamation-circle"></i>
                  </transition>

                  <transition name="bounce">
                     <span v-show="errors.has('det_permiso')" class="text-danger">
                        @{{ errors.first('det_permiso') }}
                     </span>
                  </transition>
               </p>
            </dd>

            <dt>Código Permiso</dt>
            <dd>
               <p class="control has-icon has-icon-right">
                  <input name="cod_permiso" type="text" id="cod_permiso" v-model="permiso.cod_permiso"
                         v-validate="'required'" data-vv-delay="500" placeholder="código del permiso"
                         class="form-control" />

                  <transition name="bounce">
                     <i v-show="errors.has('cod_permiso')" class="fa fa-exclamation-circle"></i>
                  </transition>

                  <transition name="bounce">
                     <span v-show="errors.has('cod_permiso')" class="text-danger">
                        @{{ errors.first('cod_permiso') }}
                     </span>
                  </transition>
               </p>
            </dd>

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
@include('layouts.modal.footer_modal')
<!-- END FOOTER -->