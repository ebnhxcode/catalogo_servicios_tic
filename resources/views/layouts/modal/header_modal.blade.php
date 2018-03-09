<!-- BEGIN HEADER -->
<modal name="{{$nom_modal}}"
       @before-close="before_close"
       :reset="true"
       :width="700"
       :min-width="550"
       :height="'auto'"
       :min-height="600"
       :adaptive="true"
       :resizable="true"
       :scrollable="true"
       :draggable="true">
<!-- END HEADER -->


<div class="row" style="margin: 10px;margin-top:20px;">
    <div class="col-md-12">

        <div class="float-right">
            <button @click.prevent="{{"ocultar_modal('$nom_modal')"}}" class="btn btn-sm btn-danger">
                ❌
            </button>
        </div>

        <h2>@{{ (modal_crear_activo === true) ? 'Crear' : 'Actualizar'}} {{str_replace('_',' ',$nombre_modelo)}}</h2>
        <hr>

        <dl class="dl-vertical" style="{{--overflow-y: scroll;max-height: auto;padding-bottom: 50px;--}}">