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
      <tr v-for="r in filterBy(roles, filtro_head)">


         <template v-if="id_en_edicion != r.id_role">
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
               <input type="text" class="form-control" v-model="r.nom_role">
            </td>
            <td>
               <textarea rows="1" v-model="r.det_role" class="form-control">@{{ r.det_role }}</textarea>
            </td>
            <td>
               <select v-model="r.id_permiso" class="form-control">
                  <option :value="p.id_permiso" v-for="p in permisos">
                     @{{ `${p.nom_permiso} -> ${p.det_permiso}` }}
                  </option>
               </select>
            </td>
         </template>

         <td>
            <button class="btn btn-sm btn-primary" v-if="id_en_edicion != r.id_role && id_en_edicion == null"
                    @click.prevent="editar(r.id_role)">
               <i class="fa fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-success" v-if="id_en_edicion == r.id_role"
                    @click.prevent="guardar_editado">
               <i class="fa fa-save"></i>
            </button>

            <button class="btn btn-sm btn-warning" v-if="id_en_edicion == null">
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
      <tr v-if="roles && roles.length == 0">
         <td colspan="5">No hay más registros</td>
      </tr>
   </tbody>

</table>