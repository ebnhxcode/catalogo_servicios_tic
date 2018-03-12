
<!-- ############################################# -->
<!-- Acá : Inicio modificaciones únicas de negocio -->
<!-- ############################################# -->

<!-- Esto puede ser pasado como componente, se le pasa el objeto en json con los campos de la tabla -->
<template>
   <h5 style="position: relative;">Mostrar\Ocultar opciones de la tabla
      (<small>Clic en un botón para mostrar en grilla</small>)</h5>
   {{--<mini-spinner v-if="mini_spinner_table_inputs == true"></mini-spinner> v-else --}}
   <div class="btn-group btn-group-sm btn-group-toggle" v-for="v,c,i in tabla_campos">
      <label :class="v==true?'btn btn-success active':'btn btn-light'" @click.prevent="cambiar_visibilidad(c)"
             {{--data-placement="top" data-toggle="tooltip" :title="`Clic para ${(v==true)?'ocultar':'mostrar'}`">--}}
             data-placement="top" data-toggle="tooltip" title="Clic para mostrar u ocultar">
         <input type="checkbox" autocomplete="off">
         <span style="font-size: 85%;">
            <i class="fa fa-check" v-if="v==true"></i>
            <i class="fa fa-eye" v-if="v==true"></i>
            @{{ tabla_labels[c] }}
         </span>
      </label>
   </div>
</template>
<br />
<br />

<!-- ############################################ -->
<!-- Acá : Final modificaciones únicas de negocio -->
<!-- ############################################ -->






<!-- Del Main esto puede ser el body -->


<!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
<!-- Acá : Esta seccion puede ser completamente heredable como body del main -->
<!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->

<h4 class="h4">Lista de {{$nombre_detalle}}</h4>
<!-- Sección de la tabla que lista los elementos del módulo -->
<div class="table-responsive">
   <!-- dir ./partials -->
   @if(view()->exists("$nombre_tabla.partials.tabla_listar"))
      @include("$nombre_tabla.partials.tabla_listar")
   @endif
</div>
