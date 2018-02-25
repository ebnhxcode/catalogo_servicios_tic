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
            <td colspan="3">
               <dl class="dl-vertical" style="overflow-y: auto;max-height: 450px;padding-bottom: 50px;">
                  @include('roles.partials.formulario_campos')
               </dl>
            </td>
         </template>

         <td>
            <button class="btn btn-sm btn-primary"
                    v-show="id_en_edicion != r.id_role && id_en_edicion == null && modal_actualizar_activo == false"
                    data-placement="top" data-toggle="tooltip" title="Editar desde aquí"
                    @click.prevent="editar(r.id_role)">
               <i class="fa fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-success" v-show="id_en_edicion == r.id_role && modal_actualizar_activo == false"
                    data-placement="top" data-toggle="tooltip" title="Guardar"
                    @click.prevent="guardar_editado">
               <i class="fa fa-save"></i>
            </button>

            <button class="btn btn-sm btn-warning"
                    data-placement="top" data-toggle="tooltip" title="Actualizar desde modal"
                    @click.prevent="mostrar_modal_actualizar(r.id_role)"
                    v-show="id_en_edicion == null">
               <i class="fa fa-external-link" ></i>
            </button>
            <button class="btn btn-sm btn-danger" v-show="id_en_edicion == null"
                    data-placement="top" data-toggle="tooltip" title="Eliminar">
               <i class="fa fa-close"></i>
            </button>
            <button class="btn btn-sm btn-secondary"
                    data-placement="top" data-toggle="tooltip" title="Dejar de editar"
                    @click.prevent="dejar_de_editar()"
                    v-show="dejar_de_editar_contador>2 && id_en_edicion == r.id_role">
               <i class="fa fa-close"></i>
            </button>

         </td>
      </tr>

      <tr v-if="roles && roles.length == 0 || filterBy(roles, filtro_head).length == 0">
         <td colspan="5">No hay más registros</td>
      </tr>

   </tbody>

</table>