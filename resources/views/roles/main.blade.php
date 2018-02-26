@extends('layouts.app')
@section('content')

   @include("layouts.main.header_main")

   @include("layouts.main.body_main")

   @include("layouts.main.footer_main")

@endsection

@section('VueControllers')
   <script src="{{ asset("js/controllers/$nombre_controller.js") }}"></script>
@endsection