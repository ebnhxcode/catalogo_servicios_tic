<div class="row">

   <div class="nav flex-column nav-pills col-sm-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">

      <a class="nav-link active" id="v-pills-servidores-tab" data-toggle="pill" href="#v-pills-servidores" role="tab"
         aria-controls="v-pills-servidores" aria-selected="true">
         Servidores
      </a>

      <template v-if="en_array(['Administrador','Jefe de Area','Lider Equipo','App Manager'],usuario_auth.usuario_role.role.nom_role)">

         <a class="nav-link" id="v-pills-tipos-aplicaciones-tab" data-toggle="pill" href="#v-pills-tipos-aplicaciones" role="tab"
            aria-controls="v-pills-tipos-aplicaciones" aria-selected="true">
            Tipos Aplicaciones
         </a>

         <a class="nav-link" id="v-pills-aplicaciones-accesos-tab" data-toggle="pill" href="#v-pills-aplicaciones-accesos" role="tab"
            aria-controls="v-pills-aplicaciones-accesos" aria-selected="false">
            Accesos aplicaciones
         </a>

      </template>

   </div>

   <div class="tab-content col-sm-10" id="v-pills-tabContent">

      <div class="tab-pane fade show active" id="v-pills-servidores" role="tabpanel" aria-labelledby="v-pills-servidores-tab">
         <div class="embed-responsive embed-responsive-16by9 pro">
            <iframe style="min-height: 600px;" src="{{url('/embed/servidores')}}" frameborder="0" width="100%" height="100%"></iframe>
         </div>
      </div>


      <template v-if="en_array(['Administrador','Jefe de Area','Lider Equipo','App Manager'],usuario_auth.usuario_role.role.nom_role)">

         <div class="tab-pane fade show" id="v-pills-tipos-aplicaciones" role="tabpanel" aria-labelledby="v-pills-tipos-aplicaciones-tab">
            <div class="embed-responsive embed-responsive-16by9 pro">
               <iframe style="min-height: 600px;" src="{{url('/embed/tipos_aplicaciones')}}" frameborder="0" width="100%" height="100%"></iframe>
            </div>
         </div>

         <div class="tab-pane fade show" id="v-pills-aplicaciones-accesos" role="tabpanel" aria-labelledby="v-pills-aplicaciones-accesos-tab">
            <div class="embed-responsive embed-responsive-16by9 pro">
               <iframe style="min-height: 600px;" src="{{url('/embed/aplicaciones_accesos')}}" frameborder="0" width="100%" height="100%"></iframe>
            </div>
         </div>

      </template>

   </div>
</div>