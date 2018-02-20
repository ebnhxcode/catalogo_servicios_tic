<modal name="crear_role"
       :reset="true"
       :width="600"
       :height="400"
       :adaptive="true"
       :resizable="true"
       :draggable="true">


   <div class="row">
      <div class="col-md-12">

         <dl class="dl-vertical" style="margin: 20px;">


            <div class="float-right">
               <button @click="$modal.hide('crear_role')" class="btn btn-sm btn-danger">
               ❌
               </button>
            </div>

            <h2>Nuevo Role</h2>
            <hr>


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

         </dl>

      </div>
   </div><!-- .row -->


</modal>