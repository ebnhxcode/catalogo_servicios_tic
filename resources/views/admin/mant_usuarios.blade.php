@extends('layouts.app')
@include('layouts.styles')

@section('content')
   <div class="container{{--container--}}" id="AdminUsuarios">
      <div class="row">
         <div class="col-md-12">
            <div class="{{--panel panel-default--}}">
               <div class=""></div><!-- .panel-heading -->

               <div class="{{--panel-body--}}">
                  <div class="row">
                     <div class="col-md-12">

                        {{-- {{ csrf_field() }}  <keep-alive> </keep-alive>--}}
                        <input type="hidden" name="_token" id="_token" value="{{csrf_token()}}">


                        <div class="col-md-12">
                           <div class="well well-sm">


                              <h3 class="">
                                 Mantenedor de Usuarios
                                 {{--
                                 <img class="pull-right" width="90" src="{{url('img/logo.png')}}" alt="" style="border-radius: 3px;box-shadow: 2px 1px 2px 1px #dbdbdb;">
                                 --}}
                              </h3> <!-- .text-center --> <br>

                              <br>
                              <br>
                              <br>
                              <br>
                              <!-- Componente para crear compromiso en modal -->
                              <modal-nuevousuario v-show="mostrar_modal_nuevo_usuario == true" @close="mostrar_modal_nuevo_usuario = false">
                              <h3 slot="header">
                                 Crear nuevo usuario
                                 <button class="btn btn-sm btn-default pull-right"
                                 @click="mostrar_modal_nuevo_usuario = false">
                                 Cerrar
                                 </button>
                                 <span class="pull-right">&nbsp;&nbsp;</span>
                              </h3>
                              </modal-nuevousuario>

                           </div><!-- .well .well-sm -->
                        </div>


                        <!-- Filtro por termino, otros filtros y funcionalidades-->
                        <div class="col-md-6">
                           <!-- Text animacion al termino de busqueda -->
                           <transition name="fade" mode="out-in">
                              <h5 style="position: relative;" v-if="filterTerm">Filtrando por el criterio '<b>@{{ filterTerm }}</b>'</h5>
                              <h5 style="position: relative;" v-else>Filtrar por criterio...</h5>
                           </transition>

                           <!-- Input filterTerm -->
                           <div class="form-group">
                              <div class="input-group input-group-md">
                                 <div class="input-group-addon">
                                    <i class="fa fa-font"></i>
                                 </div>
                                 <!-- Input para escribir el termino a buscar -->
                                 <input type="text" class="form-control" placeholder="Ingresar criterio de busqueda" v-model="filterTerm" id="filterTerm">
                                 <!-- Boton para limpiar contenido del filtro por criterio -->
                              <span class="input-group-btn">
                                 <button @click.prevent="filterTerm=''" type="button" class="btn btn-default">
                                    Limpiar
                                 </button>
                              </span><!-- .input-group-btn -->
                              </div><!-- /.input-group -->
                           </div><!-- /.form-group -->


                           <h5 style="position: relative;">Mostrar\Ocultar opciones de la tabla
                              (<small>Clic en un botón para mostrar en grilla</small>)</h5>
                           <mini-spinner v-if="mini_spinner_table_inputs == true"></mini-spinner>
                           <div class="btn-group" data-toggle="buttons" v-for="v,f,i in user_table_fields" v-else>

                              <label :class="v==true?'btn btn-primary active':'btn btn-primary'" @click.prevent="changeVisibility(f)">
                                 <input type="checkbox" autocomplete="off"> @{{ user_table_labels[f] }}
                              </label>

                           </div>

                           <h5>Paginar resultados</h5>
                           <paginators :pagination="pagination" @navigate="navigate"></paginators>

                           <div class="pull-left" style="padding-bottom: 10px;">
                              Ver mas resultados <small>(top)</small>
                              <select style="width: 8rem !important;" v-model="pagination.per_page" @change="navigateCustom"
                                 class="btn btn-default">
                              <option selected disabled>@{{ pagination.per_page }}</option>
                              <option :value="5">5</option>
                              <option :value="10">10</option>
                              <option :value="15">15</option>
                              <option :value="20">20</option>
                              <option :value="25">25</option>
                              <option :value="30">30</option>
                              <option :value="35">35</option>
                              <option :value="40">40</option>
                              <option :value="45">45</option>
                              <option :value="50">50</option>
                              <option :value="100">100</option>
                              <option :value="250">250</option>
                              <option :value="500">500</option>
                              <option :value="750">750</option>
                              <option :value="1250">1250</option>
                              <option :value="1500">1500</option>
                              <option :value="1750">1750</option>
                              <option :value="2000">2000</option>
                              </select>
                           </div>

                           <download-excel
                              v-if="(excel_data_count = filterBy(users, filterTerm).length) > 0"
                              :data="filterBy(users, filterTerm)"
                              :fields="excel_json_fields"
                              name="users.xls"
                              class="btn btn-sm btn-success pull-right">
                              Descargar lo que está en la grilla{{--<small>(@{{ excel_data_count }})</small>--}}
                           </download-excel><!-- -btn .btn-default .btn-success -->
                        </div><!-- .col-* -->

                        <!-- Estadísticas -->
                        <div class="col-md-6">
                           <h5 style="position: relative;">Opciones</h5>

                           <div class="dropdown" style="padding-right: 8px;">
                              <button class="btn btn-default btn-md dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                 {{--<i class="fa fa-excel" aria-hidden="true"></i>--}}
                                 <img src="{{asset('/img/xls.png')}}" width="20" height="20" alt="">
                                 Descargas
                                 <span class="caret"></span>
                              </button>

                              <button @click.prevent="filterTerm=''&&fetchAdminUsuarios" type="button" class="btn btn-default">
                                 Recargar Grilla
                              </button>

                              {{-- @click.prevent="crear_nuevo_usuario" --}}
                              <button class="btn btn-success" @click.prevent="mostrar_modal_nuevo_usuario = true"
                                      style="margin-left: 1px;">
                                 Crear nuevo Usuario&nbsp;
                                 <i class="fa fa-plus"></i>
                              </button><!-- .btn .btn-success -->

                              <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">

                                 <li>
                                    <download-excel
                                       v-if="(excel_data_count = excel_json_data.length) > 0"
                                       :data="excel_json_data"
                                       :fields="excel_json_fields"
                                       name="users.xls">
                                       <img src="{{asset('/img/xls_file.png')}}" width="20" height="20" alt="">
                                       &nbsp;·&nbsp;
                                       Descargar Excel Completo {{--<small>(@{{ excel_data_count }})</small>--}}
                                    </download-excel><!-- -btn .btn-default .btn-success -->
                                 </li>
                                 <li>
                                    <download-excel
                                       v-if="(excel_data_count = getExcelActivados(excel_json_data).length) > 0"
                                       :data="getExcelActivados(excel_json_data)"
                                       :fields="excel_json_fields"
                                       name="users_activados.xls">
                                       <img src="{{asset('/img/xls_file.png')}}" width="20" height="20" alt="">
                                       &nbsp;·&nbsp;
                                       Descargar Excel Usuarios Activados {{--<small>(@{{ excel_data_count }})</small>--}}
                                    </download-excel><!-- -btn .btn-default .btn-success -->
                                 </li>
                                 <li>
                                    <download-excel
                                       v-if="(excel_data_count = getExcelSinActivar(excel_json_data).length) > 0"
                                       :data="getExcelSinActivar(excel_json_data)"
                                       :fields="excel_json_fields"
                                       name="users_sin_activar.xls">
                                       <img src="{{asset('/img/xls_file.png')}}" width="20" height="20" alt="">
                                       &nbsp;·&nbsp;
                                       Descargar Excel Usuarios No Activados {{--<small>(@{{ excel_data_count }})</small>--}}
                                    </download-excel><!-- -btn .btn-default .btn-success -->
                                 </li>
                                 <li>
                                    <download-excel
                                       v-if="(excel_data_count = getExcelSinTelefono(excel_json_data).length) > 0"
                                       :data="getExcelSinTelefono(excel_json_data)"
                                       :fields="excel_json_fields"
                                       name="users_sin_telefono.xls">
                                       <img src="{{asset('/img/xls_file.png')}}" width="20" height="20" alt="">
                                       &nbsp;·&nbsp;
                                       Descargar Excel Usuarios Sin Telefono {{--<small>(@{{ excel_data_count }})</small>--}}
                                    </download-excel><!-- -btn .btn-default .btn-success -->
                                 </li>
                                 <li>
                                    <download-excel
                                       v-if="(excel_data_count = getExcelConTelefono(excel_json_data).length) > 0"
                                       :data="getExcelConTelefono(excel_json_data)"
                                       :fields="excel_json_fields"
                                       name="users_con_telefono.xls">
                                       <img src="{{asset('/img/xls_file.png')}}" width="20" height="20" alt="">
                                       &nbsp;·&nbsp;
                                       Descargar Excel Usuarios Con Telefono {{--<small>(@{{ excel_data_count }})</small>--}}
                                    </download-excel><!-- -btn .btn-default .btn-success -->
                                 </li>
                                 <li>
                                    <download-excel
                                       v-if="(excel_data_count = getExcelConTelefonoActivados(excel_json_data).length) > 0"
                                       :data="getExcelConTelefonoActivados(excel_json_data)"
                                       :fields="excel_json_fields"
                                       name="users_con_telefono_activados.xls">
                                       <img src="{{asset('/img/xls_file.png')}}" width="20" height="20" alt="">
                                       &nbsp;·&nbsp;
                                       Descargar Excel Usuarios Con Telefono Activados {{--<small>(@{{ excel_data_count }})</small>--}}
                                    </download-excel><!-- -btn .btn-default .btn-success -->
                                 </li>
                                 <li>
                                    <download-excel
                                       v-if="(excel_data_count = getExcelSinTelefonoActivados(excel_json_data).length) > 0"
                                       :data="getExcelSinTelefonoActivados(excel_json_data)"
                                       :fields="excel_json_fields"
                                       name="users_sin_telefono_activados.xls">
                                       <img src="{{asset('/img/xls_file.png')}}" width="20" height="20" alt="">
                                       &nbsp;·&nbsp;
                                       Descargar Excel Usuarios Sin Telefono Activados {{--<small>(@{{ excel_data_count }})</small>--}}
                                    </download-excel><!-- -btn .btn-default .btn-success -->
                                 </li>
                                 <li>
                                    <download-excel
                                       v-if="(excel_data_count = getExcelConTelefonoSinActivar(excel_json_data).length) > 0"
                                       :data="getExcelConTelefonoSinActivar(excel_json_data)"
                                       :fields="excel_json_fields"
                                       name="users_con_telefono_sin_activar.xls">
                                       <img src="{{asset('/img/xls_file.png')}}" width="20" height="20" alt="">
                                       &nbsp;·&nbsp;
                                       Descargar Excel Usuarios Con Telefono Sin Activar {{--<small>(@{{ excel_data_count }})</small>--}}
                                    </download-excel><!-- -btn .btn-default .btn-success -->
                                 </li>
                                 <li>
                                    <download-excel
                                       v-if="(excel_data_count = getExcelSinTelefonoSinActivar(excel_json_data).length) > 0"
                                       :data="getExcelSinTelefonoSinActivar(excel_json_data)"
                                       :fields="excel_json_fields"
                                       name="users_sin_telefono_sin_activar.xls">
                                       <img src="{{asset('/img/xls_file.png')}}" width="20" height="20" alt="">
                                       &nbsp;·&nbsp;
                                       Descargar Excel Usuarios Sin Telefono Sin Activar {{--<small>(@{{ excel_data_count }})</small>--}}
                                    </download-excel><!-- -btn .btn-default .btn-success -->
                                 </li>
                              </ul>
                           </div>

                           <h5 style="position: relative;">Estadísticas de Usuarios Registrados</h5>
                           <mini-spinner v-if="mini_spinner_table_inputs == true"></mini-spinner>
                           <div class="table-responsive" v-else>
                              <table class="table table-striped table-hover small text-center"
                                     style="border: 1px solid;border-color: #d8d8d8;">
                                 <thead>
                                 <tr>
                                    <th>Totales</th>
                                    <th>Sin Activar</th>
                                    <th>Activados</th>
                                    <th>Sin Teléfono</th>
                                    <th>Con Teléfono</th>
                                 </tr>
                                 </thead>
                                 <tbody>
                                 <tr>
                                    <td>@{{ users_full.length }}</td>
                                    <td>@{{ getSinActivar(users_full) }}</td>
                                    <td>@{{ getActivados(users_full) }}</td>
                                    <td>@{{ getSinTelefono(users_full) }}</td>
                                    <td>@{{ getConTelefono(users_full) }}</td>
                                 </tr>
                                 </tbody>
                              </table>

                              <table class="table table-striped table-hover small text-center"
                                     style="border: 1px solid;border-color: #d8d8d8;">
                                 <thead>
                                 <tr class="small">
                                    <th>Sin Activar Sin Teléfono</th>
                                    <th>Sin Activar Con Teléfono</th>
                                    <th>Activados Sin Teléfono</th>
                                    <th>Activados Con Teléfono</th>
                                 </tr>
                                 </thead>
                                 <tbody>
                                 <tr>
                                    <td>@{{ getSinTelefonoSinActivar(users_full) }}</td>
                                    <td>@{{ getConTelefonoSinActivar(users_full) }}</td>
                                    <td>@{{ getSinTelefonoActivados(users_full) }}</td>
                                    <td>@{{ getConTelefonoActivados(users_full) }}</td>
                                 </tr>
                                 </tbody>
                              </table>
                           </div><!-- table-responsive -->

                        </div><!-- .col-* -->


                        <div class="col-md-12">
                           <spinner v-if="spinner_table_inputs == true"></spinner>
                           <div class="table-responsive" v-else>
                              <table class="table table-striped table-hover small"
                                     style="border: 1px solid;border-color: #d8d8d8;">

                                 <thead>
                                 <tr>
                                    <th>Accion</th>
                                    <th v-show="user_table_fields.correo_resagado == true">
                                       <a href="#!" @click.prevent="changeListOrder('correo_resagado')">
                                          <i class="fa fa-sort" aria-hidden="true"></i>&nbsp;
                                          Estado envio correo
                                       </a>
                                    </th>
                                    <th v-show="user_table_fields.id == true">
                                       <a href="#!" @click.prevent="changeListOrder('id')">
                                          <i class="fa fa-sort" aria-hidden="true"></i>&nbsp;
                                          Id
                                       </a>
                                    </th>
                                    <th v-show="user_table_fields.name == true">
                                       <a href="#!" @click.prevent="changeListOrder('name')">
                                          <i class="fa fa-sort" aria-hidden="true"></i>&nbsp;
                                          Nombre
                                       </a>
                                    </th>
                                    <th v-show="user_table_fields.email == true">
                                       <a href="#!" @click.prevent="changeListOrder('email')">
                                          <i class="fa fa-sort" aria-hidden="true"></i>&nbsp;
                                          Email
                                       </a>
                                    </th>
                                    <th v-show="user_table_fields.rut == true">
                                       <a href="#!" @click.prevent="changeListOrder('rut')">
                                          <i class="fa fa-sort" aria-hidden="true"></i>&nbsp;
                                          Rut
                                       </a>
                                    </th>
                                    <th v-show="user_table_fields.clave_electronica == true">
                                       <a href="#!" @click.prevent="changeListOrder('clave_electronica')">
                                          <i class="fa fa-sort" aria-hidden="true"></i>&nbsp;
                                          Llave Secreta
                                       </a>
                                    </th>
                                    <th v-show="user_table_fields.acepta_terminos == true">
                                       <a href="#!" @click.prevent="changeListOrder('acepta_terminos')">
                                          <i class="fa fa-sort" aria-hidden="true"></i>&nbsp;
                                          Acepta Terminos
                                       </a>
                                    </th>
                                    <th v-show="user_table_fields.position == true">
                                       <a href="#!" @click.prevent="changeListOrder('position')">
                                          <i class="fa fa-sort" aria-hidden="true"></i>&nbsp;
                                          Cargo
                                       </a>
                                    </th>
                                    <th v-show="user_table_fields.establecimiento == true">
                                       <a href="#!" @click.prevent="changeListOrder('establecimiento')">
                                          <i class="fa fa-sort" aria-hidden="true"></i>&nbsp;
                                          Establecimiento
                                       </a>
                                    </th>
                                    <th v-show="user_table_fields.telefono == true">
                                       <a href="#!" @click.prevent="changeListOrder('telefono')">
                                          <i class="fa fa-sort" aria-hidden="true"></i>&nbsp;
                                          Telefono
                                       </a>
                                    </th>
                                    <th v-show="user_table_fields.id_role == true">
                                       <a href="#!" @click.prevent="changeListOrder('id_role')">
                                          <i class="fa fa-sort" aria-hidden="true"></i>&nbsp;
                                          Role
                                       </a>
                                    </th>
                                    <th v-show="user_table_fields.confirmado_llave_secreta == true">
                                       <a href="#!" @click.prevent="changeListOrder('confirmado_llave_secreta')">
                                          <i class="fa fa-sort" aria-hidden="true"></i>&nbsp;
                                          Se envió llave
                                       </a>
                                    </th>
                                 </tr>
                                 </thead>

                                 <tbody>
                                 <input type="hidden" id="_token" name="_token" value="{{csrf_token()}}">
                                 <tr v-for="(user,index) in filterBy(users, filterTerm)" :key="user.id">

                                    <td>
                                       <button class="btn btn-sm btn-primary" @click.prevent="editUser(user.id)"
                                               v-if="userEditId!=user.id">
                                          <i class="fa fa-pencil"></i>
                                       </button>
                                       <button class="btn btn-sm btn-success" @click.prevent="saveUser(user)"
                                               v-else>
                                          <i class="fa fa-check"></i>
                                       </button>


                                       <!-- v-if="user.establecimiento == 'minsal'" -->
                                       <a class="btn btn-sm btn-default"
                                          data-toggle="popover" data-trigger="hover" data-placement="bottom"
                                          title="¡IMPORTANTE!" data-content="Desde esta opción puedes enviar un email al usuario para que pueda crear su clave a traves de un enlace enviado a su email."
                                          tabindex="0"
                                          @click.prevent="sendEmailPasswordReset(user)">
                                          <i class="fa fa-envelope"></i>
                                       </a>
                                    </td>
                                    <td v-show="user_table_fields.correo_resagado == true">
                                       @{{ user.correo_resagado || 'No Aplica' }}
                                    </td>
                                    <td v-show="user_table_fields.id == true">
                                       @{{ user.id }}
                                    </td>
                                    <td v-show="user_table_fields.name == true">
                                       <span v-if="userEditId!=user.id">@{{ user.name }}</span>
                                       <input type="text" v-model="user.name" class="form-control" v-else>
                                    </td>
                                    <td v-show="user_table_fields.email == true">
                                       <span v-if="userEditId!=user.id">@{{ user.email }}</span>
                                       <input type="text" v-model="user.email" class="form-control" v-else>
                                    </td>
                                    <td v-show="user_table_fields.rut == true">
                                       <span v-if="userEditId!=user.id">@{{ user.rut }}</span>
                                       <input type="text" v-model="user.rut" class="form-control" v-else>
                                    </td>
                                    <td v-show="user_table_fields.clave_electronica == true">
                                       <span v-if="userEditId!=user.id">@{{ user.clave_electronica }}</span>
                                       <input type="text" v-model="user.clave_electronica" class="form-control" v-else>
                                    </td>
                                    <td v-show="user_table_fields.acepta_terminos == true">
                                       <span v-if="userEditId!=user.id">@{{ user.acepta_terminos }}</span>
                                       <input type="text" v-model="user.acepta_terminos" class="form-control" v-else>
                                    </td>
                                    <td v-show="user_table_fields.position == true">
                                       <span v-if="userEditId!=user.id">@{{ user.position }}</span>
                                       <input type="text" v-model="user.position" class="form-control" v-else>
                                    </td>
                                    <td v-show="user_table_fields.establecimiento == true">
                                       <span v-if="userEditId!=user.id">@{{ user.establecimiento }}</span>
                                       <input type="text" v-model="user.establecimiento" class="form-control" v-else>
                                    </td>
                                    <td v-show="user_table_fields.telefono == true">
                                       <span v-if="userEditId!=user.id">@{{ user.telefono }}</span>
                                       <input type="text" v-model="user.telefono" class="form-control" v-else>
                                    </td>
                                    <td v-show="user_table_fields.id_role == true">
                                       <span v-if="userEditId!=user.id">@{{ user.id_role }}</span>
                                       <!-- <input type="text" v-model="user.id_role" class="form-control" v-else> -->
                                       <select name="id_role" class="form-control" v-model="user.id_role" v-else>
                                          <option value="3">Mantenedor</option>
                                          <option value="4">Digitador</option>
                                          <option value="5">Observador</option>
                                       </select>

                                    </td>
                                    <td v-show="user_table_fields.confirmado_llave_secreta == true">
                                       <span v-if="userEditId!=user.id">@{{ user.confirmado_llave_secreta }}</span>
                                       <input type="text" v-model="user.confirmado_llave_secreta" class="form-control" v-else>
                                    </td>
                                 </tr>
                                 </tbody>

                              </table>

                              <div class="pull-left" style="padding-bottom: 50px;">
                                 Ver mas resultados <small>(Bottom)</small>
                                 <select style="width: 8rem !important;" v-model="pagination.per_page" @change="navigateCustom"
                                 class="btn btn-default">
                                 <option selected disabled>@{{ pagination.per_page }}</option>
                                 <option :value="5">5</option>
                                 <option :value="10">10</option>
                                 <option :value="15">15</option>
                                 <option :value="20">20</option>
                                 <option :value="25">25</option>
                                 <option :value="30">30</option>
                                 <option :value="35">35</option>
                                 <option :value="40">40</option>
                                 <option :value="45">45</option>
                                 <option :value="50">50</option>
                                 <option :value="100">100</option>
                                 <option :value="250">250</option>
                                 <option :value="500">500</option>
                                 <option :value="750">750</option>
                                 <option :value="1250">1250</option>
                                 <option :value="1500">1500</option>
                                 </select>
                              </div>

                           </div>

                        </div>


                     </div><!-- .col-md-* -->


                  </div><!-- .row -->
               </div><!-- .panel-body -->

            </div><!-- .panel .panel-default -->
         </div><!-- col-md-* -->
      </div><!-- .row -->
   </div><!-- .container -->

   <script>
      $(document).ready( function () {
         $('[data-toggle="popover"]').popover();
      });
   </script>
@endsection



@section('VueControllers')
   {!!Html::script('js/app/api/controllers/AdminController.js')!!}
@endsection