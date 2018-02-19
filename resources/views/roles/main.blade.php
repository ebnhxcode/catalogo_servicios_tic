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
                  <button class="btn btn-sm btn-outline-success" @click.prevent="show1">Nuevo Role 1</button>
                  <button class="btn btn-sm btn-outline-success" @click.prevent="show2">Nuevo Role 2</button>
                  <button class="btn btn-sm btn-outline-success" @click.prevent="show3">Nuevo Role 3</button>
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

         {{--
         <modal name="hello-world"
                :reset="true"
                :width="800"
                :height="600"
                :adaptive="true"
                :draggable="true">
            <div class="row">
               <div class="col-md-12">
                  hello, world!
               </div>
            </div>
         </modal>
         --}}


         <show1 name="show1"
                :reset="true"
                :width="400"
                :height="300"
                :adaptive="true"
                :draggable="true">
            <div class="row">
               <div class="col-md-12">
                  show1!
               </div>
            </div>
         </show1>

         <show2 name="show2"
                :reset="true"
                :width="400"
                :height="300"
                :adaptive="true"
                :draggable="true">
            <div class="row">
               <div class="col-md-12">
                  show1!
               </div>
            </div>
         </show2>

         <show3 name="show3"
                :reset="true"
                :width="400"
                :height="300"
                :adaptive="true"
                :draggable="true">
            <div class="row">
               <div class="col-md-12">
                  show1!
               </div>
            </div>
         </show3>

      </div>


   </main>

@endsection

@section('VueControllers')
   <script src="{{ asset('js/controllers/RoleController.js') }}"></script>
@endsection