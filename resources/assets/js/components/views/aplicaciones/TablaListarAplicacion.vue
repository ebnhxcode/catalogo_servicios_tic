<template>
   <table class="table table-striped table-hover table-sm">
      <thead>
      <tr>
         <th v-for="c,i in tabla_campos" v-if="c">
            <a href="#!" class="btn btn-light" @click.prevent="$parent.cambiar_orden_lista(i)">
               <i class="fa fa-sort" aria-hidden="true"></i>&nbsp;
               {{ tabla_labels[i] }}
            </a>
         </th>
         <th>
            <a href="#!" class="btn btn-light" @click.prevent="$parent.cambiar_orden_lista(`id_${nombre_model}`)">
               <i class="fa fa-sort" aria-hidden="true"></i>&nbsp;
               Acción
            </a>
         </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="lom in filterBy(lista_objs_model, filtro_head)"
          @dblclick.prevent="$parent.editar(lom[`id_${nombre_model}`])">
         <template v-if="id_en_edicion != lom[`id_${nombre_model}`] || modal_actualizar_activo == true">
            <td v-for="c,i in tabla_campos" v-show="c">
               <!-- se corre por detras la completitud de relaciones. -->
               {{ lom[i] }}
            </td>
         </template>
         <template v-else>
            <td>
            <span v-clipboard="lom[`id_${nombre_model}`]" class="btn btn-light"
                  data-placement="top" data-toggle="tooltip" title="Clic para copiar el id">
               Id {{ nombre_model }}: {{ lom[`id_${nombre_model}`] }}
            </span>
            </td>
            <td :colspan="filterBy(tabla_campos, true).length-1">

               <!-- @include("$nombre_tabla.partials.formulario_campos") -->

            </td>
         </template>




         <!-- Botonera de acciones -->
         <td>
            <button class="btn btn-sm btn-primary"
                    v-show="id_en_edicion != lom[`id_${nombre_model}`] &&
                     id_en_edicion == null &&
                     modal_actualizar_activo == false &&
                     en_array(['Administrador','Jefe de Area','Lider Equipo','App Manager'],usuario_auth.usuario_role.role.nom_role)"
                    data-placement="top" data-toggle="tooltip" title="Editar desde aquí"
                    @click.prevent="editar(lom[`id_${nombre_model}`])">
               <i class="fa fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-success" v-show="id_en_edicion == lom[`id_${nombre_model}`]"
                    data-placement="top" data-toggle="tooltip" title="Guardar"
                    @click.prevent="guardar_editado">
               <i class="fa fa-save"></i>
            </button>
            <button class="btn btn-sm btn-secondary"
                    data-placement="top" data-toggle="tooltip" title="Dejar de editar"
                    @click.prevent="dejar_de_editar()"
                    v-if="id_en_edicion === lom[`id_${nombre_model}`]">
               <i class="fa fa-close"></i>
            </button>
         </td>

      </tr>
      <tr v-if="lista_objs_model && lista_objs_model.length == 0 || filterBy(lista_objs_model, filtro_head).length == 0">
         <td :colspan="lista_objs_model.length-1">No hay más registros</td>
      </tr>
      </tbody>
   </table>

</template>

<script>
   export default {
      name: 'tabla-listar-aplicacion',
      props: ['lista_objs_model','tabla_labels','usuario_auth','nombre_model'],
      //template: ``,
      data: function () {
         return {
            'id_en_edicion':null,
         }
      },
      created: function () {
      },
      computed: {
      },
      methods: {
      }
   }
</script>