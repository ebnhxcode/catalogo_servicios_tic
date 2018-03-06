
   <input type="hidden" name="_token" id="_token" value="{{csrf_token()}}">

   <main role="main" class="col-md-9 ml-sm-auto col-lg-9 pt-3 px-4" id="{{$nombre_controller}}">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
         <h2 class="h2">{{$nombre_detalle}}</h2>


         <div class="btn-toolbar mb-2 mb-md-0">
            <div class="input-group input-group-sm">

               <div class="btn-group mr-2">
                  <input type="text" class="form-control input-sm"
                         data-placement="top" data-toggle="tooltip" title="Filtrar en la lista"
                         placeholder="filtrar en la lista" v-model="filtro_head" id="filtro_head">
               </div><!-- .btn-group mr-2 #mr->margin -->

               <div class="btn-group mr-0">
                  <button class="btn btn-sm btn-outline-success"
                          data-placement="top" data-toggle="tooltip" title="Crear nuevo/a {{$nombre_modelo}}"
                          @click.prevent="mostrar_modal_crear">
                     Crear nuevo/a {{$nombre_modelo}}
                  </button>

                  <button class="btn btn-sm btn-outline-secondary dropdown-toggle"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Lista de opciones">
                     Opciones
                  </button>

                  <div class="dropdown-menu">

                     <!-- ############################################# -->
                     <!-- Acá : Inicio modificaciones únicas de negocio -->
                     <!-- ############################################# -->

                     <!-- Esta seccion ya es un componente, se podria estandarizar solo el nombre de los obj para excel -->
                     <download-excel
                        v-if="(excel_data_contador = filterBy(datos_excel, filtro_head).length) > 0"
                        :data="filterBy(datos_excel, filtro_head)"
                        :fields="excel_json_campos"
                        name="datos_excel.xls"
                        class="dropdown-item">
                        Descargar Excel
                     </download-excel>

                     <!-- ############################################ -->
                     <!-- Acá : Final modificaciones únicas de negocio -->
                     <!-- ############################################ -->

                     <a class="dropdown-item" href="#!" @click.prevent="inicializar">
                        Actualizar tabla
                     </a>
                     <a class="dropdown-item" href="#!" @click.prevent="filtro_head=null">
                        Limpiar filtro
                     </a>
                     <div class="dropdown-divider"></div>
                     <a class="dropdown-item" href="{{ url('/home') }}">
                        Volver al menú principal
                     </a>
                  </div>


               </div><!-- .btn-group mr-0 #mr->margin -->


            </div><!-- input-* -->
         </div><!-- .btn .btn-toolbar -->
      </div><!-- .d-flex .justify-* .flex-wrap .flex-md-nowrap .align-items-center -->
   {{--<canvas class="my-4" id="myChart" width="900" height="380"></canvas>--}}
