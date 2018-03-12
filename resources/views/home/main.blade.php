@extends('layouts.app')
@section('content')


   <input type="hidden" name="_token" id="_token" value="{{csrf_token()}}">

   <main role="main" class="col-md-9 ml-sm-auto col-lg-9 pt-3 px-4" id="{{$nombre_controller}}">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
         <h2 class="h2">{{$nombre_detalle}}</h2>


      </div><!-- .d-flex .justify-* .flex-wrap .flex-md-nowrap .align-items-center -->



      <notifications group="global" position="bottom right" />





   </main>



@endsection

@section('VueControllers')
   <script src="{{ asset("js/controllers/$nombre_controller.js") }}"></script>
@endsection