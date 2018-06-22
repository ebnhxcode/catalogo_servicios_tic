<table class="table table-sm" v-if="typeof spinner_table != 'undefined' && spinner_table == false">
   <thead>
   <tr class="text-center">
      <th v-for="c,i in tabla_campos" v-if="c.visibility!=false">
         <a href="#!" class="btn btn-primary" @click.prevent="cambiar_orden_lista(i)">
            <i class="fa fa-sort" aria-hidden="true"></i>&nbsp;
            @{{ tabla_labels[i] }}
         </a>
      </th>
      <th>
         <a href="#!" class="btn btn-primary" @click.prevent="cambiar_orden_lista(`id_${nombre_model}`)">
            <i class="fa fa-sort" aria-hidden="true"></i>&nbsp;
            Acción
         </a>
      </th>
   </tr>
   </thead>
   <tbody>
   <tr class="text-center" v-for="lom in filterBy(lista_objs_model, filtro_head)"
       {{--@dblclick.prevent="editar(lom[`id_${nombre_model}`])"--}}>
      <template v-if="id_en_edicion != lom[`id_${nombre_model}`] || modal_actualizar_activo == true">
         <td v-for="c,i in tabla_campos" v-show="c.visibility!=false">
            {{-- se corre por detras la completitud de relaciones. --}}
            @if(Request::path() == 'servicios')
               <div class="h6 btn btn-md text-left card" style="width: 100%;" v-if="en_array(['nom_servicio'],i)" @click.prevent="mostrar_modal_actualizar(lom[`id_${nombre_model}`])">
                  {{--<i class="fa fa-rocket small float-right btn" data-placement="top" data-toggle="tooltip" title="Abrir modal"></i>--}}





                  <div class="card-body">


                     <div class="media">

                        <a class="thumbnail" href="#!">
                           <img class="mr-3" src="{{asset('/img/servicio.png')}}" alt="">
                        </a>

                        <div class="media-body">
                           <h5 class="mt-0">SERVICIO: @{{ lom[i] }}</h5>
                           <span class="text-muted">DETALLE: @{{ lom['det_servicio'] }}</span>
                           <hr>
                           <div class="row">
                              <div class="col-sm-12 col-md-8">

                                 <div class="table-responsive">
                                    <h6>USUARIOS RESPONSABLES</h6>
                                    <table v-if="lom['servicios_usuarios'] && lom['servicios_usuarios'].length > 0">
                                       <thead>
                                       <tr>
                                          <th>Nombre</th>
                                          <th>Email</th>
                                       </tr>
                                       </thead>
                                       <tbody>
                                       <tr v-for="su in lom['servicios_usuarios']" v-if="su.usuario">
                                          <td>@{{ su.usuario.nom_usuario +' '+su.usuario.ape_paterno }}</td>
                                          <td>@{{ su.usuario.email }}</td>
                                       </tr>
                                       </tbody>

                                    </table><!-- .table -->
                                    <div class="card card-body bg-light" v-else>
                                       Hasta el momento no existen responsables asociados.
                                    </div><!-- .card -->

                                 </div>

                              </div>
                              <div class="col-sm-12 col-md-4">
                                 <h6>DETALLES</h6>
                                 <span>APLICACIONES: @{{ lom['n_aplicaciones'] }}</span>
                                 <br>
                                 <span>SERVIDORES: @{{ lom['n_servidores'] }}</span>
                              </div>
                           </div><!-- .row -->

                        </div>
                     </div>


                  </div>
               </div>
               <div v-else>@{{ lom[i] }}</div>
            @else
               <div class="text-center" style="width: 100%;" v-if="en_array(['ram','memoria_dd'],i)">
                  @{{`${(lom[i])/1024} GB`}}
               </div>
               <div v-else>
                  @{{ lom[i] }}
               </div>
            @endif
         </td>
      </template>
      <template v-else>
         <td>
            <span v-clipboard="lom[`id_${nombre_model}`]" class="btn btn-primary"
                  data-placement="top" data-toggle="tooltip" title="Clic para copiar el id">
               Id @{{ nombre_model }}: @{{ lom[`id_${nombre_model}`] }}
            </span>
         </td>
         <td :colspan="filterBy(tabla_campos, true).length-1">
            @include("$nombre_tabla.partials.formulario_campos")
         </td>
      </template>




      <!-- Botonera de acciones -->
      <td>
         <div class="btn-group btn-group-sm" style="margin:0;" role="group" aria-label="Basic example">

           {{--
            <button class="btn btn-primary"
                    v-show="id_en_edicion != lom[`id_${nombre_model}`] &&
                        id_en_edicion == null &&
                        modal_actualizar_activo == false && usuario_auth.usuario_role &&
                        en_array(['Administrador','Jefe de Area','Lider Equipo','App Manager'],usuario_auth.usuario_role.role.nom_role)"
                    data-placement="top" data-toggle="tooltip" title="Editar desde aquí"
                    @click.prevent="editar(lom[`id_${nombre_model}`])">
               <i class="fa fa-edit"></i>
            </button>
            <button class="btn btn-success" v-show="id_en_edicion == lom[`id_${nombre_model}`] && modal_actualizar_activo == false"
                    data-placement="top" data-toggle="tooltip" title="Guardar"
                    @click.prevent="guardar_editado">
               <i class="fa fa-save"></i>
            </button>
           --}}

            <button class="btn btn-secondary"
                    data-placement="top" data-toggle="tooltip" title="Actualizar desde modal"
                    @click.prevent="mostrar_modal_actualizar(lom[`id_${nombre_model}`])"
                    v-show="id_en_edicion == null">
               <i class="fa fa-eye" ></i>
            </button>
            <button class="btn btn-secondary"
                    data-placement="top" data-toggle="tooltip" title="Dejar de editar"
                    @click.prevent="dejar_de_editar()"
                    v-if="id_en_edicion === lom[`id_${nombre_model}`]">
               <i class="fa fa-close"></i>
            </button>
            <button class="btn btn-danger" v-show="id_en_edicion == null"
                    v-if="usuario_auth.usuario_role &&
                    en_array(['Administrador','Jefe de Area','Lider Equipo','App Manager'],usuario_auth.usuario_role.role.nom_role)"
                    @click.prevent="eliminar(lom[`id_${nombre_model}`])"
                    data-placement="top" data-toggle="tooltip" title="Eliminar">
               <i class="fa fa-close"></i>
            </button>
         </div>
      </td>

   </tr>
   <tr v-if="lista_objs_model && lista_objs_model.length == 0 || filterBy(lista_objs_model, filtro_head).length == 0">
      <td class="text-center" :colspan="filterBy(tabla_campos, true).length+1">No hay más registros</td>
   </tr>
   </tbody>
</table>
<div v-if="typeof spinner_table != 'undefined' && spinner_table == true">
   <spinner></spinner>
</div>