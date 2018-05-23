<?php

namespace App\Http\Controllers;

use App\Aplicacion;
use App\Dominio;
use App\Servicio;
use App\Servidor;
use App\TipoAplicacion;
use Illuminate\Http\Request;
use Auth;

use Illuminate\Support\Facades\Validator;

class AplicacionController extends Controller {
   private $usuario_auth;

   private $nombre_modelo;
   private $nombre_tabla;
   private $nombre_ruta;
   private $nombre_detalle;
   private $nombre_controller;

   private $aplicaciones;
   private $tipos_aplicaciones;
   private $servicios;
   private $servidores;
   private $dominios;
   private $aplicacion;
   private $new_aplicacion;
   private $validacion;
   private $per_page;


   public function __construct () {
      $this->middleware('auth');
      $this->middleware('mantenedor');#resrtinge a solo usuarios con permiso bajo -> D
      $this->nombre_modelo = "aplicacion"; //nombre tabla o de ruta
      $this->nombre_tabla = $this->nombre_ruta = "aplicaciones";
      $this->nombre_detalle = "Aplicaciones";
      $this->nombre_controller = "AplicacionController";
   }

   private function es_vacio ($variable) {
      if (isset($variable) && !in_array($variable, [null, 'null', ''])) {
         return false;
      } else {
         return true;
      }
   }

   private function validar_paginacion ($request) {
      if (!$request->per_page) {
         $this->per_page = 20;
      } else {
         $this->per_page = $request->per_page;
      }
   }

   /*
    * Index componente aplica para las pantallas que estan hechas con iframes
    * que son interfaces mas livianas como accesos directos
    * */
   public function index_componente () {
      return view("layouts.main_para_componentes", [
         'nombre_modelo' => $this->nombre_modelo,
         'nombre_tabla' => $this->nombre_tabla,
         'nombre_ruta' => $this->nombre_ruta,
         'nombre_detalle' => $this->nombre_detalle,
         'nombre_controller' => $this->nombre_controller,
      ]);
   }

   /*
    * Index ajax aplica para traer la data de las interfaces
    * */
   public function index_ajax (Request $request) {
      if ($request->wantsJson() && $request->ajax() && $request->isXmlHttpRequest()) {

         $this->validar_paginacion($request);
         $this->aplicaciones = Aplicacion::with([
            'dominio','tipo_aplicacion','servicio','servidor'
         ])->paginate((int)$this->per_page);

         $this->usuario_auth = Auth::user();

         $this->tipos_aplicaciones = TipoAplicacion::all();
         $this->servidores = Servidor::all();
         $this->servicios = Servicio::all();
         $this->dominios = Dominio::all();

         return response()->json([
            'status' => 200,
            'tipos_aplicaciones' => $this->tipos_aplicaciones,
            'aplicaciones' => $this->aplicaciones,
            'servicios' => $this->servicios,
            'servidores' => $this->servidores,
            'dominios' => $this->dominios,
            'usuario_auth' => $this->usuario_auth,
         ]);
      }
   }

   public function index() {
      return view("layouts.main", [
         'nombre_modelo' => $this->nombre_modelo,
         'nombre_tabla' => $this->nombre_tabla,
         'nombre_ruta' => $this->nombre_ruta,
         'nombre_detalle' => $this->nombre_detalle,
         'nombre_controller' => $this->nombre_controller,
      ]);
   }

   public function show (Request $request, $id) {
      $result = preg_match('/(^([0-9]+)(\d+)?$)/u', $id);
      if ($this->es_vacio($id) == true || $result == 0) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'error_datos_invalidos', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Lo buscado, no se encontró."]],
         ]);
      }

      $this->aplicacion = Aplicacion::where("id_$this->nombre_modelo",'=',$id)->with([
         'dominio','servidor','servicio','tipo_aplicacion'])->first();

      #Valida si aplicacion existe
      if ($this->aplicacion) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'eliminacion_exitosa', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro encontrado exitosamente."]],
            'aplicacion' => $this->aplicacion,
            //Para mostrar los mensajes que van desde el backend
         ]);
      }else{
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'error_datos_invalidos', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Lo buscado, no se encontró."]],
         ]);
      }

   }

   public function store(Request $request) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      $this->validacion = Validator::make($request->all(), [
         'nom_aplicacion' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255",
         'det_aplicacion' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:255",
         'alias' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:255",
         'url_web' => "url|required|max:255",
         'ip' => "required|max:255",
         'subdominio' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:255",
         #'ssl_tls' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:255",
         'id_dominio' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|integer',
         'id_servicio' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|integer',
         'id_servidor' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|integer',
         'id_tipo_aplicacion' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|integer',

      ]);
      #Se valida la respuesta con la salida de la validacion
      if ($this->validacion->fails() == true) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'errores_campos_requeridos', //Para las notificaciones
            'mensajes' => $this->validacion->messages(), //Para mostrar los mensajes que van desde el backend
         ]);
      }
      $request['ssl_tls'] = in_array($request['ssl_tls'], [true,'true']) ? true : false ;
      #Como pasó todas las validaciones, se asigna al objeto
      $this->aplicacion = $request->all();
      #Se crea el nuevo registro
      $this->new_aplicacion = Aplicacion::create([
         'nom_aplicacion' => $this->aplicacion['nom_aplicacion'],
         'det_aplicacion' => $this->aplicacion['det_aplicacion'],
         'alias' => $this->aplicacion['alias'],
         'url_web' => $this->aplicacion['url_web'],
         'ip' => $this->aplicacion['ip'],
         'subdominio' => $this->aplicacion['subdominio'],
         'ssl_tls' => $this->aplicacion['ssl_tls'],
         'id_dominio' => $this->aplicacion['id_dominio'],
         'id_servicio' => $this->aplicacion['id_servicio'],
         'id_servidor' => $this->aplicacion['id_servidor'],
         'id_tipo_aplicacion' => $this->aplicacion['id_tipo_aplicacion'],

         'id_usuario_registra' => Auth::user()->id_usuario,
         'id_usuario_modifica' => Auth::user()->id_usuario,
      ]);

      unset($this->aplicacion, $this->validacion);

      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'creacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro ($this->nombre_modelo) creado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'aplicacion' => $this->new_aplicacion
      ]);
   }

   public function update(Request $request, $id) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      $this->validacion = Validator::make($request->all(), [
         'id_aplicacion' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|max:255',
         'nom_aplicacion' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255",
         'det_aplicacion' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:255",
         'alias' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:255",
         'url_web' => "url|required|max:255",
         'ip' => "required|max:255",
         'subdominio' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:255",
         #'ssl_tls' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:255",
         #'ssl_tls' => "required|max:255",
         'id_dominio' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|integer',
         'id_servicio' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|integer',
         'id_servidor' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|integer',
         'id_tipo_aplicacion' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|integer',
      ]);
      #Valida si la informacion que se envia para editar al aplicacion son iguales los ids
      if ($id != $request["id_$this->nombre_modelo"]) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'error_datos_invalidos', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Los datos a guardar son incorrectos."]],
         ]);
      }
      #Se valida la respuesta con la salida de la validacion
      if ($this->validacion->fails() == true) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'errores_campos_requeridos', //Para las notificaciones
            'mensajes' => $this->validacion->messages(), //Para mostrar los mensajes que van desde el backend
         ]);
      }

      $this->aplicacion = Aplicacion::find($request["id_$this->nombre_modelo"]);
      $request['id_usuario_modifica'] = Auth::user()->id_usuario;



      $request['ssl_tls'] = in_array($request['ssl_tls'], [true,'true']) ? 'true' : 'false' ;
      $this->aplicacion->update($request->all());

      #unset($this->new_aplicacion_permiso, $this->permiso);
      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'actualizacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro actualizado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'aplicacion' => $this->aplicacion,
      ]);
   }

   public function destroy($id) {
      #Valida si la informacion que se envia para editar al aplicacion son iguales los ids
      if ($this->es_vacio($id) == true || preg_match("/^[0-9]*$/",$id) == 0) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'error_datos_invalidos', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Los datos a eliminar son incorrectos."]],
         ]);
      }

      $this->aplicacion = Aplicacion::find($id);

      #Valida si aplicacion existe y busca si tiene aplicacion_permiso
      if ($this->aplicacion) {
         $this->aplicacion->delete();
      }

      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'eliminacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro eliminado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
      ]);
   }


}
