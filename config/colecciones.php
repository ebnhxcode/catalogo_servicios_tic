<?php


return [

   'frontend_vue' => [
      '{integer:true}', //Generalmente numericos o ids
      '{required:true,regex:/^[0-9]+$/i}', //Generalmente ids
      '{required:true,regex:/^[a-zA-Z0-9_ ]+$/i}', //Generalmente en inputs text
      '{required:true,regex:/^[a-zA-Z0-9_ ,.!@#$%*&]+$/i}', //Generalmente respuestas mas elaboradas en textareas
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
   ],

   'backend_laravel' => [
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
   ],

];