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
      <tr v-for="t in filterBy(table, filtro_head)">
         <td>@{{ t.value1 }}</td>
         <td>@{{ t.value2 }}</td>
         <td>@{{ t.value3 }}</td>
         <td>@{{ t.value4 }}</td>
         <td>@{{ t.value5 }}</td>
      </tr>
   </tbody>

</table>