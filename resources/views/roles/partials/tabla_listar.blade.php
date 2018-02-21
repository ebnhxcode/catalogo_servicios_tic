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
         <td>@{{ r.id_role }}</td>
         <td>@{{ r.nom_role }}</td>
         <td>@{{ r.det_role }}</td>
         <td>@{{ r.id_permiso }}</td>
         <td>
            <button class="btn btn-sm btn-primary">
               <i class="fa fa-edit"></i>
            </button>
         </td>
      </tr>
      <tr v-if="roles && roles.length == 0">
         <td colspan="5">No hay más registros</td>
      </tr>
   </tbody>

</table>