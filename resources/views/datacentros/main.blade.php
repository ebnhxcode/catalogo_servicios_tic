@extends('layouts.app')
@section('content')

   @include("layouts.main")

@endsection

@section('VueControllers')
   <script src="{{ asset("js/controllers/$nombre_controller.js") }}"></script>
@endsection