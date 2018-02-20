<modal name="crear"
       :reset="true"
       :width="600"
       :height="600"
       :adaptive="true"
       :resizable="true"
       :scrollable="true"
       :draggable="true">
   <div class="row">
      <div class="col-md-12">
         <dl class="dl-vertical" style="margin: 20px;">
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

            <dt>Nombre Permiso</dt>
            <dd>
               <p class="control has-icon has-icon-right">
                  <input name="nom_permiso" type="text" id="nom_permiso" v-model="permiso.nom_permiso"
                         v-validate="'required'" data-vv-delay="500" placeholder="nombre del permiso"
                         class="form-control" />

                  <transition name="bounce">
                     <i v-show="errors.has('nom_permiso')" class="fa fa-warning"></i>
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
                     <i v-show="errors.has('det_permiso')" class="fa fa-warning"></i>
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
                     <i v-show="errors.has('cod_permiso')" class="fa fa-warning"></i>
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
</modal>