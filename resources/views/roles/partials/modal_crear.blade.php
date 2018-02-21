<!-- BEGIN HEADER -->

@include('layouts.header_modal', compact('nom_modal'=>'crear']))

<!-- END HEADER -->


   <div class="row">
      <div class="col-md-12">

         <dl class="dl-vertical" style="margin: 20px;">


            <div class="float-right">
               <button @click="ocultar_modal('crear')" class="btn btn-sm btn-danger">
               ❌
               </button>
            </div>

            <h2>Nuevo Role</h2>
            <hr>

            <div style="overflow-y: auto;max-height: 500px;">



               <dt>Nombre Role</dt>
               <dd>
                  <p class="control has-icon has-icon-right">
                     <input name="nom_role" type="text" id="nom_role" v-model="role.nom_role"
                            v-validate="'required'" data-vv-delay="500" placeholder="nombre del role"
                            class="form-control" />

                     <transition name="bounce">
                        <i v-show="errors.has('nom_role')" class="fa fa-warning"></i>
                     </transition>

                     <transition name="bounce">
                     <span v-show="errors.has('nom_role')" class="text-danger">
                        @{{ errors.first('nom_role') }}
                     </span>
                     </transition>
                  </p>
               </dd>

               <dt>Detalle Role</dt>
               <dd>
               <textarea name="det_role" id="det_role" v-model="role.det_role" cols="15" rows="2"
                         class="form-control"></textarea>
               </dd>

               <dt>Permiso</dt>


               <dd>
                  <select name="id_permiso" id="id_permiso" v-model="role.id_permiso" class="form-control">
                     <option :value="p.id_permiso" v-for="p in permisos">@{{ `${p.nom_permiso} -> ${p.det_permiso}` }}</option>
                  </select>
               </dd>

               <dt>Finalizar</dt>
               <dd>
                  <button class="btn btn-success" @click.prevent="guardar">
                     Guardar
                  </button>
               </dd>



            </div><!-- div scrollable -->


         </dl><!-- .dl-vertical -->

      </div><!-- .col-* -->
   </div><!-- .row -->

<!-- BEGIN FOOTER -->
@include('layouts.footer_modal')

<!-- END FOOTER -->