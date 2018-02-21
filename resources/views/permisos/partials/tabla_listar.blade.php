<table class="table table-striped table-hover table-sm">

   <thead>
   <tr>
      <th>#</th>
      <th>Nombre</th>
      <th>Detalle</th>
      <th>Código</th>
      <th>Acción</th>
   </tr>
   </thead>

   <tbody>
   <tr v-for="p in filterBy(permisos, filtro_head)">
      <td>@{{ p.id_permiso }}</td>
      <td>@{{ p.nom_permiso }}</td>
      <td>@{{ p.det_permiso }}</td>
      <td>@{{ p.cod_permiso }}</td>
      <td>
         <button class="btn btn-sm btn-primary">
            <i class="fa fa-edit"></i>
         </button>
      </td>
   </tr>
   <tr v-if="permisos && permisos.length == 0" class="align-items-center">
      <td colspan="5">No hay más registros</td>
   </tr>
   </tbody>

</table>