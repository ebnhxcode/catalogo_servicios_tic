<table class="table table-striped table-hover table-sm">

   <thead>
      <tr>
         <th>#</th>
         <th>Nombre</th>
         <th>Detalle</th>
         <th>Permisos</th>
         <th style="min-width: 120px;">Acción</th>
      </tr>
   </thead>

   <tbody>
      <tr v-for="r in filterBy(roles, filtro_head)"
          @dblclick.prevent="editar(r.id_role)">


         <template v-if="id_en_edicion != r.id_role || modal_actualizar_activo == true">
            <td>
               @{{ r.id_role }}
            </td>
            <td>
               @{{ r.nom_role }}
            </td>
            <td>
               @{{ r.det_role }}
            </td>
            <td>
               {{--@{{ r.role_permiso.id_permiso }}--}}
               @{{ (r.id_permiso = r.role_permiso.id_permiso) ? r.role_permiso.permiso.det_permiso : '' }}
            </td>
         </template>

         <template v-else>
            <td>
               @{{ r.id_role }}
            </td>
            <td>
               <p class="control has-icon has-icon-right">
                  <input type="text" v-model="role.nom_role" name="nom_role"
                         v-validate="{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}" data-vv-delay="500"
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
            </td>
            <td>
               <p class="control has-icon has-icon-right">
                  <textarea cols="15" rows="1" v-model="role.det_role" name="det_role"
                            v-validate="'required'" data-vv-delay="500"
                            class="form-control"></textarea>

                  <transition name="bounce">
                     <i v-show="errors.has('det_role')" class="fa fa-exclamation-circle"></i>
                  </transition>

                  <transition name="bounce">
                  <span v-show="errors.has('det_role')" class="text-danger">
                     @{{ errors.first('det_role') }}
                  </span>
                  </transition>
               </p>
            </td>
            <td>
               <p class="control has-icon has-icon-right">

                  <select class="form-control" v-model="role.id_permiso" name="id_permiso"
                          v-validate="'required'" data-vv-delay="500">
                     <option :value="p.id_permiso" v-for="p in permisos">
                        @{{ `${p.nom_permiso} -> ${p.det_permiso}` }}
                     </option>
                  </select>

                  <transition name="bounce">
                     <i v-show="errors.has('id_permiso')" class="fa fa-exclamation-circle"></i>
                  </transition>

                  <transition name="bounce">
                  <span v-show="errors.has('id_permiso')" class="text-danger">
                     @{{ errors.first('id_permiso') }}
                  </span>
                  </transition>
               </p>
            </td>
         </template>

         <td>
            <button class="btn btn-sm btn-primary"
                    v-if="id_en_edicion != r.id_role && id_en_edicion == null && modal_actualizar_activo == false"
                    @click.prevent="editar(r.id_role)">
               <i class="fa fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-success" v-if="id_en_edicion == r.id_role && modal_actualizar_activo == false"
                    @click.prevent="guardar_editado">
               <i class="fa fa-save"></i>
            </button>

            <button class="btn btn-sm btn-warning"
                    @click.prevent="mostrar_modal_actualizar(r.id_role)"
                    v-if="id_en_edicion == null">
               <i class="fa fa-external-link" ></i>
            </button>
            <button class="btn btn-sm btn-danger" v-if="id_en_edicion == null">
               <i class="fa fa-close"></i>
            </button>
            <button class="btn btn-sm btn-secondary"
                    @click.prevent="dejar_de_editar()"
                    v-if="dejar_de_editar_contador>2 && id_en_edicion == r.id_role">
               <i class="fa fa-close"></i>
            </button>
         </td>
      </tr>

      <tr v-if="roles && roles.length == 0 || filterBy(roles, filtro_head).length == 0">
         <td colspan="5">No hay más registros</td>
      </tr>

   </tbody>

</table>