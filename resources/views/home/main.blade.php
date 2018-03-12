@extends('layouts.app')
@section('content')


   <input type="hidden" name="_token" id="_token" value="{{csrf_token()}}">

   <main role="main" class="col-md-9 ml-sm-auto col-lg-9 pt-3 px-4" id="{{$nombre_controller}}">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 border-bottom">
         <h2 class="h2">{{$nombre_detalle}}</h2>


      </div><!-- .d-flex .justify-* .flex-wrap .flex-md-nowrap .align-items-center -->


      <br>


      <div class="card-columns {{--card-deck--}}">

         <div class="card bg-light mb-3" v-for="i in home_items">
            <div class="card-header">@{{ i.title }}</div>
            <div class="card-body">
               <h5 class="card-title">
                  <div class="media">
                     <img class="rounded-left img-responsive mr-3" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1621b9e4a02%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1621b9e4a02%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2213.0546875%22%20y%3D%2236.5%22%3E64x64%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                          alt="" style="width: 64px; height: 64px;">
                     <div class="media-body">
                        <h5 class="mt-0">@{{ i.title }}</h5>
                        <p style="font-size: 12px;">
                           @{{ i.detail }}
                        </p>
                     </div>
                  </div>
               </h5>
               <p class="card-text">

               </p>
            </div><!-- -card-body -->
            <div href="#!" class="card-footer">
               <a :href="i.url" class="btn btn-sm btn-light">
                  <i class="fa fa-sign-in" aria-hidden="true"></i>
                  Ingresar
               </a>
            </div>
         </div><!-- .card -->

      </div><!-- .card-columns -->


      <notifications group="global" position="bottom right" />

   </main>



@endsection

@section('VueControllers')
   <script src="{{ asset("js/controllers/$nombre_controller.js") }}"></script>
@endsection