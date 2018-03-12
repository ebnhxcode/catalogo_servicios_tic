<!-- Del Main esto puede ser el footer -->


<!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
<!-- Acá : Esta seccion puede ser completamente heredable como footer del main -->
<!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->

<!-- Sección de los modals que despliegan segun la gestión -->
<div>
   <!-- dir ./partials -->
   @include("layouts.modal.modal_crear")
   @include("layouts.modal.modal_actualizar")
   {{--
   @if(view()->exists("$nombre_tabla.partials.modal_crear"))
      @include("layouts.modal.modal_crear")
   @endif
   @if(view()->exists("$nombre_tabla.partials.modal_actualizar"))
      @include("layouts.modal.modal_actualizar")
   @endif
   --}}

</div>

{{--<notifications group="top_center" position="top center" />--}}
{{--<v-dialog/>--}}
<notifications group="global" position="bottom right" />

{{-- Se habilitara cuando se implemente el vuerouter --}}
{{--<vue-progress-bar></vue-progress-bar>--}}

<!-- Para cada modulo establecer estas funcionalidades parametricas como opciones configurables -->
<!-- Por lo tanto podemos dejar estas opciones como datos en una bd segun modulo:usuario -->
<!-- Opciones como colores, templates especiales, etc -->



</main>
