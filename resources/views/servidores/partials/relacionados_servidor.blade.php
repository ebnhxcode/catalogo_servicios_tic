<div class="row">
   <div class="nav flex-column nav-pills col-sm-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <a class="nav-link active" id="v-pills-aplicaciones-tab" data-toggle="pill" href="#v-pills-aplicaciones" role="tab"
         aria-controls="v-pills-aplicaciones" aria-selected="true">
         Aplicaciones
      </a>
      <a class="nav-link" id="v-pills-historial-tab" data-toggle="pill" href="#v-pills-historial" role="tab"
         aria-controls="v-pills-historial" aria-selected="false">
         Historial de cambios
      </a>
      <a class="nav-link" id="v-pills-datacentro-tab" data-toggle="pill" href="#v-pills-datacentro" role="tab"
         aria-controls="v-pills-datacentro" aria-selected="false">
         Datacentro
      </a>
      <a class="nav-link" id="v-pills-opciones-tab" data-toggle="pill" href="#v-pills-opciones" role="tab"
         aria-controls="v-pills-opciones" aria-selected="false">
         Opciones
      </a>
   </div>
   <div class="tab-content col-sm-10" id="v-pills-tabContent">
      <div class="tab-pane fade show active" id="v-pills-aplicaciones" role="tabpanel" aria-labelledby="v-pills-aplicaciones-tab">

         <pre>
            @{{ servidor.aplicaciones }}
         </pre>

      </div>
      <div class="tab-pane fade" id="v-pills-historial" role="tabpanel" aria-labelledby="v-pills-historial-tab">

      </div>
      <div class="tab-pane fade" id="v-pills-datacentro" role="tabpanel" aria-labelledby="v-pills-datacentro-tab">

      </div>
      <div class="tab-pane fade" id="v-pills-opciones" role="tabpanel" aria-labelledby="v-pills-opciones-tab">

      </div>
   </div>
</div>