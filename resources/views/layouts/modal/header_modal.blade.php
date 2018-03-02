<!-- BEGIN HEADER -->
<modal name="{{$nom_modal}}"
       @before-close="before_close"
       :reset="true"
       :width="800"
       :min-width="550"
       :height="600"
       :min-height="600"
       :adaptive="true"
       :resizable="true"
       :scrollable="true"
       :draggable="true">
<!-- END HEADER -->


<div class="row" style="margin: 10px;margin-top:20px;">
    <div class="col-md-12">

        <div class="float-right">
            <button @click.prevent="ocultar_modal('actualizar')" class="btn btn-sm btn-danger">
                ❌
            </button>
        </div>

        <h2>Actualizar {{$nombre_modelo}}</h2>
        <hr>

        <dl class="dl-vertical" style="{{--overflow-y: scroll;max-height: auto;padding-bottom: 50px;--}}">