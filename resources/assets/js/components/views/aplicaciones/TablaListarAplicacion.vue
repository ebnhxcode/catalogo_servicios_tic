<template>
   <div class="table-responsive pro">
      <table class="table table-striped table-hover table-sm">
         <thead>
         <tr>
            <th v-for="c,i in tabla_campos" v-if="c">
               <a href="#!" class="btn btn-light" @click.prevent="cambiar_orden_lista(i)">
                  <i class="fa fa-sort" aria-hidden="true"></i>&nbsp;
                  {{ tabla_labels[i] }}
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
            <tr v-if="id_en_edicion != null">
               <td colspan="6">
                  <formulario-campos-aplicacion
                     :aplicacion="aplicacion"
                     :tabla_campos="tabla_campos"
                     :dominios="$parent.$data['dominios']"
                     :servicios="$parent.$data['servicios']"
                     :tipos_aplicaciones="$parent.$data['tipos_aplicaciones']"
                     :servidores="$parent.$data['servidores']">
                  </formulario-campos-aplicacion>
               </td>
            </tr>
            <tr v-for="lom in lista_objs_model"
                @dblclick.prevent="editar_componente(lom[`id_${nombre_model}`])">

               <td v-for="c,i in tabla_campos" v-if="c">
                  <!-- se corre por detras la completitud de relaciones. -->
                  {{ lom[i] }}
               </td>

               <!-- Botonera de acciones -->
               <td>
                  <button class="btn btn-sm btn-primary"
                          v-show="id_en_edicion != lom[`id_${nombre_model}`] &&
                        id_en_edicion == null &&
                        en_array(['Administrador','Jefe de Area','Lider Equipo','App Manager'],usuario_auth.usuario_role.role.nom_role)"
                          data-placement="top" data-toggle="tooltip" title="Editar desde aquí"
                          @click.prevent="editar_componente(lom[`id_${nombre_model}`])">
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
                          v-if="id_en_edicion == lom[`id_${nombre_model}`]">
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

   import { inyeccion_funciones_compartidas } from '../../../controllers/libs/HelperPackage';

   export default {
      name: 'tabla-listar-aplicacion',
      props: ['usuario_auth','nombre_model','tabla_labels','tabla_campos','lista_objs_model','aplicacion'],
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
      mixins: [ inyeccion_funciones_compartidas ],
      methods: {
         crear: function (id) {
         },
         editar_componente: function (id) {
            this.id_en_edicion = id || null;
            this.aplicacion = this.buscar_objeto_otra_clase(id, 'aplicaciones', 'aplicacion');
         },
         dejar_de_editar: function () {
            this.id_en_edicion = null;
         },
         guardar_editado: function () {},
         guardar_nuevo: function () {},
      }
   }
</script>