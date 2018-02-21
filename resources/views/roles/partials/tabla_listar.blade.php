<table class="table table-striped table-hover table-sm">

   <thead>
      <tr>
         <th>#</th>
         <th>Nombre</th>
         <th>Detalle</th>
         <th>Permisos</th>
         <th>Acción</th>
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
               @{{ r.id_permiso }}
            </td>
         </template>

         <template v-else>
            <td>
               @{{ r.id_role }}
            </td>
            <td>
               <input type="text" class="form-control" :value="r.nom_role" v-model="r.nom_role">
            </td>
            <td>
               <text-area v-model="r.det_role">
                  @{{ r.det_role }}
               </text-area>
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
            <button class="btn btn-sm btn-success">
               <i class="fa fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-primary">
               <i class="fa fa-save"></i>
            </button>
            <button class="btn btn-sm btn-warning">
               <i class="fa fa-external-link"></i>
            </button>
            <button class="btn btn-sm btn-danger">
               <i class="fa fa-close"></i>
            </button>
         </td>
      </tr>
      <tr v-if="roles && roles.length == 0">
         <td colspan="5">No hay más registros</td>
      </tr>
   </tbody>

</table>