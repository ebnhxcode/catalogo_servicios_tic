<template>
   <div class="table-responsive pro">
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
         <tr v-for="lom in lista_objs_model"
             @dblclick.prevent="editar(lom[`id_${nombre_model}`])">
            <template v-if="lom[`id_${nombre_model}`]"><!-- id_en_edicion !=  -->
               <td v-for="c,i in tabla_campos" v-show="c">
                  <!-- se corre por detras la completitud de relaciones. -->
                  {{ lom[i] }}
               </td>
            </template>

            <template v-else-if="id_en_edicion == lom[`id_${nombre_model}`]">
               <td :colspan="filterBy(tabla_campos, true).length-1">
                  <formulario-campos-aplicacion
                     :aplicacion=""
                     :tabla_campos="tabla_campos"
                     :dominios="$data['dominios']"
                     :servicios="$data['servicios']"
                     :tipos_aplicaciones="$data['tipos_aplicaciones']"
                     :servidores="$data['servidores']">

                  </formulario-campos-aplicacion>
               </td>
            </template>

            <!-- Botonera de acciones -->
            <td>
               <button class="btn btn-sm btn-primary"
                       v-show="id_en_edicion != lom[`id_${nombre_model}`] &&
                     id_en_edicion == null &&
                     modal_actualizar_activo == false &&
                     $parent.en_array(['Administrador','Jefe de Area','Lider Equipo','App Manager'],usuario_auth.usuario_role.role.nom_role)"
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
         <tr v-if="lista_objs_model && lista_objs_model.length == 0">
            <td :colspan="lista_objs_model.length-1">No hay más registros</td>
         </tr>
         </tbody>
      </table>
   </div>
</template>

<script>
   export default {
      name: 'tabla-listar-aplicacion',
      props: ['usuario_auth','nombre_model','tabla_labels','tabla_campos','lista_objs_model'],
      //template: ``,
      data: function () {
         return {
            'id_en_edicion':null,
            'aplicacion':{},
         }
      },
      created: function () {
      },
      computed: {
      },
      methods: {
         crear: function (id) {
         },
         editar: function (id) {
            this.id_en_edicion = id || null;
            this.aplicacion = $parent.buscar_en_array_por_modelo_e_id(id, this.lista_objs_model, 'aplicacion');
         },
         dejar_de_editar: function () {
            this.id_en_edicion = null;
         },
         guardar_editado: function () {},
         guardar_nuevo: function () {},
      }
   }
</script>