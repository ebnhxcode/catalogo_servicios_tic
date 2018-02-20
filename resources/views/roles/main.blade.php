@extends('layouts.app')

@section('content')


   <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4" id="RoleController">

      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">

         <h2 class="h2">Roles</h2>


         <div class="btn-toolbar mb-2 mb-md-0">



            <div class="input-group input-group-sm">

               <div class="btn-group mr-2">
                  <input type="text" class="form-control input-sm"
                      placeholder="filtrar" v-model="filtro_head" id="filtro_head">
               </div>

               <div class="btn-group mr-0">
                  <button class="btn btn-sm btn-outline-success" @click.prevent="create_role">Crear</button>
                  <button class="btn btn-sm btn-outline-success" @click.prevent="update_role">Editar</button>
               </div>


            </div><!-- input-* -->

            {{--

            Botonera, ejemplo: descargas excel, nuevo, editar, etc.

            <div class="btn-group mr-2">
               <button class="btn btn-sm btn-outline-secondary">Share</button>
               <button class="btn btn-sm btn-outline-secondary">Export</button>
            </div>
            <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
               <span data-feather="calendar"></span>
               This week
            </button>

            --}}

         </div>

      </div>

      {{--<canvas class="my-4" id="myChart" width="900" height="380"></canvas>--}}

      <h4 class="h4">Lista de roles</h4>





      <div class="table-responsive">
         <table class="table table-striped table-hover table-sm">

            <thead>
               <tr>
                  <th>#</th>
                  <th>Header</th>
                  <th>Header</th>
                  <th>Header</th>
                  <th>Header</th>
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
      </div>

      <div>

         <create_role name="create_role"
                :reset="true"
                :width="600"
                :height="480"
                :adaptive="true"
                :resizable="true"
                :draggable="true">


            <div class="row">
               <div class="col-md-12">

                  <dl class="dl-vertical" style="margin: 20px;">


                     <div class="float-right">
                        <button @click="$modal.hide('create_role')" class="btn btn-sm btn-danger">
                           ❌
                        </button>
                     </div>

                     <h2>Nuevo Role</h2>
                     <hr>


                     <dt>Nombre Role</dt>
                     <dd>
                        <input name="nom_role" type="text" id="nom_role" v-model="role.nom_role"
                               placeholder="nombre del role" class="form-control" />
                     </dd>

                     <dt>Detalle Role</dt>
                     <dd>
                        <textarea name="det_role" id="det_role" v-model="role.det_role" cols="15" rows="5"
                                  class="form-control"></textarea>
                     </dd>

                     <dt>Finalizar</dt>
                     <dd>
                        <button class="btn btn-success" @click.prevent="">
                           Guardar
                        </button>
                     </dd>

                  </dl>

               </div>
            </div>
         </create_role>

         <update_role name="update_role"
                      :reset="true"
                      :width="600"
                      :height="480"
                      :adaptive="true"
                      :resizable="true"
                      :draggable="true">


            <div class="row">
               <div class="col-md-12">


                  <dl class="dl-vertical" style="margin: 20px;">

                     <dt>Nombre Role</dt>
                     <dd>
                        <input name="nom_role" type="text" id="nom_role" v-model="role.nom_role"
                               placeholder="nombre del role" class="form-control" />
                     </dd>

                     <dt>Detalle Role</dt>
                     <dd>
                        <textarea name="det_role" id="det_role" v-model="role.det_role" cols="15" rows="5"
                                  class="form-control"></textarea>
                     </dd>

                  </dl>

               </div>
            </div>
         </update_role>


      </div>


   </main>

@endsection

@section('VueControllers')
   <script src="{{ asset('js/controllers/RoleController.js') }}"></script>
@endsection