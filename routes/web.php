<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () { return view('welcome'); });

Auth::routes();


Route::get('/rolestest', 'RoleController@rolestest')->name('rolestest');

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/dashboard', 'HomeController@index')->name('dashboard');
Route::get('/', function () {
    return redirect()->to('/login');
});
#Route::get('/estandares', 'RoleController@estandares');





#Esto aplica solo para las rutas que eran resource , es una forma de mapear las url/rutas
$groups = ['r','c','u','d'];

$modules = [
    ['route'=>'roles','controller'=>'RoleController'],
    ['route'=>'permisos','controller'=>'PermisoController'],
    ['route'=>'usuarios','controller'=>'UsuarioController'],
    ['route'=>'servicios','controller'=>'ServicioController'],
    ['route'=>'actividades','controller'=>'ActividadController'],
    ['route'=>'cargos','controller'=>'CargoController'],
    ['route'=>'estados','controller'=>'EstadoController'],
    ['route'=>'aplicaciones','controller'=>'AplicacionController'],
    ['route'=>'tipos_aplicaciones','controller'=>'TipoAplicacionController'],
    ['route'=>'aplicaciones_accesos','controller'=>'AplicacionAccesoController'],
    ['route'=>'dominios','controller'=>'DominioController'],
    ['route'=>'servidores','controller'=>'ServidorController'],
    ['route'=>'servidores_accesos','controller'=>'ServidorAccesoController'],
    ['route'=>'datacentros','controller'=>'DatacentroController'],
    ['route'=>'sistemas_operativos','controller'=>'SistemaOperativoController'],
    ['route'=>'tags','controller'=>'TagController'],
    ['route'=>'usuarios_bitacora_servicios','controller'=>'UsuarioBitacoraServicioController'],
    ['route'=>'clusters','controller'=>'ClusterController'],
    ['route'=>'menus','controller'=>'MenuController'],
    ['route'=>'mantenedores','controller'=>'MantenedorController'],
];

$http_requests = [
   'r' => ['index' => 'get','show' => 'get'],
   'c' => ['store' => 'post',],
   'u' => ['update' => 'put',],
   'd' => ['destroy' => 'delete',],
];

foreach ($groups as $group) {
    Route::group(['middleware' => "${group}"], function() use ($modules,$http_requests,$group){
        foreach ($http_requests["${group}"] as $method => $http)
            foreach ($modules as $module)
               eval("Route::${http}('/${module['route']}/".(in_array($method,["show","update","destroy"])?"{id}":"")."', '${module['controller']}@${method}');");
    });
}

#$route_arg = in_array($method,["show","update","destroy"])?"{id}":"";
#$route = "Route::${http}('/${module['route']}/".$route_arg."', '${module['controller']}@${method}');";
#eval($route);



/*

Route::group(['middleware' => 'r'], function(){

    //Route::resource('/catalogo_servicios', 'CatalogoServicioController');
    Route::get('/roles', 'RoleController@index');
    Route::get('/permisos', 'PermisoController@index');
    Route::get('/usuarios', 'UsuarioController@index');
    Route::get('/servicios', 'ServicioController@index');
    Route::get('/actividades', 'ActividadController@index');
    Route::get('/cargos', 'CargoController@index');
    Route::get('/estados', 'EstadoController@index');
    Route::get('/aplicaciones', 'AplicacionController@index');
    Route::get('/tipos_aplicaciones', 'TipoAplicacionController@index');
    Route::get('/aplicaciones_accesos', 'AplicacionAccesoController@index');
    Route::get('/dominios', 'DominioController@index');
    Route::get('/servidores', 'ServidorController@index');
    Route::get('/servidores_accesos', 'ServidorAccesoController@index');
    Route::get('/datacentros', 'DatacentroController@index');
    Route::get('/sistemas_operativos', 'SistemaOperativoController@index');
    Route::get('/tags', 'TagController@index');
    Route::get('/usuarios_bitacora_servicios', 'UsuarioBitacoraServicioController@index');
    Route::get('/clusters', 'ClusterController@index');

    Route::get('/roles/{id}', 'RoleController@show');
    Route::get('/permisos/{id}', 'PermisoController@show');
    Route::get('/usuarios/{id}', 'UsuarioController@show');
    Route::get('/servicios/{id}', 'ServicioController@show');
    Route::get('/actividades/{id}', 'ActividadController@show');
    Route::get('/cargos/{id}', 'CargoController@show');
    Route::get('/estados/{id}', 'EstadoController@show');
    Route::get('/aplicaciones/{id}', 'AplicacionController@show');
    Route::get('/tipos_aplicaciones/{id}', 'TipoAplicacionController@show');
    Route::get('/aplicaciones_accesos/{id}', 'AplicacionAccesoController@show');
    Route::get('/dominios/{id}', 'DominioController@show');
    Route::get('/servidores/{id}', 'ServidorController@show');
    Route::get('/servidores_accesos/{id}', 'ServidorAccesoController@show');
    Route::get('/datacentros/{id}', 'DatacentroController@show');
    Route::get('/sistemas_operativos/{id}', 'SistemaOperativoController@show');
    Route::get('/tags/{id}', 'TagController@show');
    Route::get('/usuarios_bitacora_servicios/{id}', 'UsuarioBitacoraServicioController@show');
    Route::get('/clusters/{id}', 'ClusterController@show');

});

Route::group(['middleware' => ['c']], function(){
    //Route::resource('/catalogo_servicios', 'CatalogoServicioController');
    Route::post('/roles', 'RoleController@store');
    Route::post('/permisos', 'PermisoController@store');
    Route::post('/usuarios', 'UsuarioController@store');
    Route::post('/servicios', 'ServicioController@store');
    Route::post('/actividades', 'ActividadController@store');
    Route::post('/cargos', 'CargoController@store');
    Route::post('/estados', 'EstadoController@store');
    Route::post('/aplicaciones', 'AplicacionController@store');
    Route::post('/tipos_aplicaciones', 'TipoAplicacionController@store');
    Route::post('/aplicaciones_accesos', 'AplicacionAccesoController@store');
    Route::post('/dominios', 'DominioController@store');
    Route::post('/servidores', 'ServidorController@store');
    Route::post('/servidores_accesos', 'ServidorAccesoController@store');
    Route::post('/datacentros', 'DatacentroController@store');
    Route::post('/sistemas_operativos', 'SistemaOperativoController@store');
    Route::post('/tags', 'TagController@store');
    Route::post('/usuarios_bitacora_servicios', 'UsuarioBitacoraServicioController@store');
    Route::post('/clusters', 'ClusterController@store');
});

Route::group(['middleware' => ['u']], function(){
    //Route::resource('/catalogo_servicios', 'CatalogoServicioController');
    Route::put('/roles/{id}', 'RoleController@update');
    Route::put('/permisos/{id}', 'PermisoController@update');
    Route::put('/usuarios/{id}', 'UsuarioController@update');
    Route::put('/servicios/{id}', 'ServicioController@update');
    Route::put('/actividades/{id}', 'ActividadController@update');
    Route::put('/cargos/{id}', 'CargoController@update');
    Route::put('/estados/{id}', 'EstadoController@update');
    Route::put('/aplicaciones/{id}', 'AplicacionController@update');
    Route::put('/tipos_aplicaciones/{id}', 'TipoAplicacionController@update');
    Route::put('/aplicaciones_accesos/{id}', 'AplicacionAccesoController@update');
    Route::put('/dominios/{id}', 'DominioController@update');
    Route::put('/servidores/{id}', 'ServidorController@update');
    Route::put('/servidores_accesos/{id}', 'ServidorAccesoController@update');
    Route::put('/datacentros/{id}', 'DatacentroController@update');
    Route::put('/sistemas_operativos/{id}', 'SistemaOperativoController@update');
    Route::put('/tags/{id}', 'TagController@update');
    Route::put('/usuarios_bitacora_servicios/{id}', 'UsuarioBitacoraServicioController@update');
    Route::put('/clusters/{id}', 'ClusterController@update');
});


Route::group(['middleware' => 'd'], function(){
    //Route::resource('/catalogo_servicios', 'CatalogoServicioController');
    Route::delete('/roles/{id}', 'RoleController@destroy');
    Route::delete('/permisos/{id}', 'PermisoController@destroy');
    Route::delete('/usuarios/{id}', 'UsuarioController@destroy');
    Route::delete('/servicios/{id}', 'ServicioController@destroy');
    Route::delete('/actividades/{id}', 'ActividadController@destroy');
    Route::delete('/cargos/{id}', 'CargoController@destroy');
    Route::delete('/estados/{id}', 'EstadoController@destroy');
    Route::delete('/aplicaciones/{id}', 'AplicacionController@destroy');
    Route::delete('/tipos_aplicaciones/{id}', 'TipoAplicacionController@destroy');
    Route::delete('/aplicaciones_accesos/{id}', 'AplicacionAccesoController@destroy');
    Route::delete('/dominios/{id}', 'DominioController@destroy');
    Route::delete('/servidores/{id}', 'ServidorController@destroy');
    Route::delete('/servidores_accesos/{id}', 'ServidorAccesoController@destroy');
    Route::delete('/datacentros/{id}', 'DatacentroController@destroy');
    Route::delete('/sistemas_operativos/{id}', 'SistemaOperativoController@destroy');
    Route::delete('/tags/{id}', 'TagController@destroy');
    Route::delete('/usuarios_bitacora_servicios/{id}', 'UsuarioBitacoraServicioController@destroy');
    Route::delete('/clusters/{id}', 'ClusterController@destroy');

});


*/