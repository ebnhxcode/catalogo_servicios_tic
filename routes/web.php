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


//Route::resource('/catalogo_servicios', 'CatalogoServicioController');
Route::resource('/roles', 'RoleController');
Route::resource('/permisos', 'PermisoController');
Route::resource('/usuarios', 'UsuarioController');
Route::resource('/servicios', 'ServicioController');
Route::resource('/actividades', 'ActividadController');
Route::resource('/cargos', 'CargoController');
Route::resource('/estados', 'EstadoController');
Route::resource('/aplicaciones', 'AplicacionController');
Route::resource('/tipos_aplicaciones', 'TipoAplicacionController');
Route::resource('/aplicaciones_accesos', 'AplicacionAccesoController');
Route::resource('/dominios', 'DominioController');
Route::resource('/servidores', 'ServidorController');
Route::resource('/servidores_accesos', 'ServidorAccesoController');
Route::resource('/datacentros', 'DatacentroController');
Route::resource('/sistemas_operativos', 'SistemaOperativoController');
Route::resource('/tags', 'TagController');
Route::resource('/usuarios_bitacora_servicios', 'UsuarioBitacoraServicioController');


Route::get('/estandares', 'RoleController@estandares');


