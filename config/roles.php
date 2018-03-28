<?php

return [
   'roles' => [
      'Administrador' => [
         'middleware' => 'crud',
         'only' => ['index','show','store','update','delete'],
         'except' => '',
      ],
      'Jefe de Area' => [
         'middleware' => 'crud',
         'only' => ['index','show','store','update','delete'],
         'except' => '',
      ],
      'Lider Equipo' => [
         'middleware' => 'crud',
         'only' => ['index','show','store','update','delete'],
         'except' => '',
      ],
      'App Manager' => [
         'middleware' => 'cru',
         'only' => ['index','show','store','update'],
         'except' => '',
      ],
      'Jefe Proyecto' => [
         'middleware' => 'cr',
         'only' => ['index','show','store'],
         'except' => '',
      ],
      'Desarrollador Proyecto' => [
         'middleware' => 'cr',
         'only' => ['index','show','store'],
         'except' => '',
      ],
      'Visitante' => [
         'middleware' => 'r',
         'only' => ['index','show'],
         'except' => '',
      ],
   ]
];
