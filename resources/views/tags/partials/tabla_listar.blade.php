<table class="table table-striped table-hover table-sm">

   <thead>
      <tr>
         <th v-for="c,i in tabla_campos" v-if="c">
            <a href="#!" class="btn btn-light" @click.prevent="cambiar_orden_lista(i)">
               <i class="fa fa-sort" aria-hidden="true"></i>&nbsp;
               @{{ tabla_labels[i] }}
            </a>
         </th>
         <th>
            <a href="#!" class="btn btn-light" @click.prevent="cambiar_orden_lista(`id_${nombre_model}`)">
               <i class="fa fa-sort" aria-hidden="true"></i>&nbsp;
               Acción
            </a>
         </th>
      </tr>
   </thead>

   <tbody>
      <tr v-for="t in filterBy(tags, filtro_head)"
          @dblclick.prevent="editar(t.id_tag)">


         <template v-if="id_en_edicion != t.id_tag || modal_actualizar_activo == true">

            <td v-for="c,i in tabla_campos" v-show="c">
               @{{ t[i] }}
            </td>

         </template>

         <template v-else>
            <td>
               <span v-clipboard="t.id_tag" class="btn btn-light"
                     data-placement="top" data-toggle="tooltip" title="Clic para copiar el id">
                  Id tag: @{{ t.id_tag }}
               </span>
            </td>
            <td :colspan="filterBy(tabla_campos, true).length-1">
               <dl class="dl-vertical" style="overflow-y: auto;max-height: 450px;padding-bottom: 50px;">
                  @include("$nombre_tabla.partials.formulario_campos")
               </dl>
            </td>
         </template>

         <td>
            <button class="btn btn-sm btn-primary"
                    v-show="id_en_edicion != t.id_tag && id_en_edicion == null && modal_actualizar_activo == false"
                    data-placement="top" data-toggle="tooltip" title="Editar desde aquí"
                    @click.prevent="editar(t.id_tag)">
               <i class="fa fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-success" v-show="id_en_edicion == t.id_tag && modal_actualizar_activo == false"
                    data-placement="top" data-toggle="tooltip" title="Guardar"
                    @click.prevent="guardar_editado">
               <i class="fa fa-save"></i>
            </button>

            <button class="btn btn-sm btn-warning"
                    data-placement="top" data-toggle="tooltip" title="Actualizar desde modal"
                    @click.prevent="mostrar_modal_actualizar(t.id_tag)"
                    v-show="id_en_edicion == null">
               <i class="fa fa-cogs" ></i>
            </button>
            {{--
            <button class="btn btn-sm btn-danger" v-show="id_en_edicion == null"
                    @click.prevent="eliminar(t.id_tag)"
                    data-placement="top" data-toggle="tooltip" title="Eliminar">
               <i class="fa fa-close"></i>
            </button>
            --}}
            <button class="btn btn-sm btn-secondary"
                    data-placement="top" data-toggle="tooltip" title="Dejar de editar"
                    @click.prevent="dejar_de_editar()"
                    v-show="id_en_edicion == t.id_tag">
               <i class="fa fa-close"></i>
            </button>

         </td>
      </tr>

      <tr v-if="tags && tags.length == 0 || filterBy(tags, filtro_head).length == 0">
         <td colspan="5">No hay más registros</td>
      </tr>

   </tbody>

</table>