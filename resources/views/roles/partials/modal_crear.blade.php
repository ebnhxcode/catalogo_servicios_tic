<!-- BEGIN HEADER -->
@include('layouts.header_modal', ['nom_modal'=>'crear'])
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

         <h2>Nuevo Role</h2>
         <hr>

         <dl class="dl-vertical" style="overflow-y: auto;max-height: 450px;padding-bottom: 50px;">

            <dt>Nombre Role</dt>
            <dd>
               <p class="control has-icon has-icon-right">
                  <input name="nom_role" type="text" id="nom_role" v-model="role.nom_role"
                         v-validate="'required'" data-vv-delay="500"
                         class="form-control" />

                  <transition name="bounce">
                     <i v-show="errors.has('nom_role')" class="fa fa-exclamation-circle"></i>
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


            <!--################################-->
            <!-- Desde aquí finaliza desarrollo -->
            <!--################################-->
         </dl><!-- .dl-vertical -->
      </div><!-- .col-* -->
   </div><!-- .row -->

<!-- BEGIN FOOTER -->
@include('layouts.footer_modal')
<!-- END FOOTER -->