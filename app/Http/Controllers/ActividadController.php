<?php

namespace App\Http\Controllers;

use App\Actividad;
use Illuminate\Http\Request;
use Auth;

use Illuminate\Support\Facades\Validator;

class ActividadController extends Controller {
   private $usuario_auth;

   private $nombre_modelo;
   private $nombre_tabla;
   private $nombre_ruta;
   private $nombre_detalle;
   private $nombre_controller;

   private $actividades;
   private $actividad;
   private $new_actividad;
   private $validacion;
   private $per_page;

   public function __construct () {
      $this->middleware('auth');
      $this->middleware('mantenedor'/*, ['except'=>['index','show','index_componente']]*/);#resrtinge a solo usuarios con permiso bajo -> D
      $this->nombre_modelo = "actividad"; //nombre tabla o de ruta
      $this->nombre_tabla = $this->nombre_ruta = "actividades";
      $this->nombre_detalle = "Actividades";
      $this->nombre_controller = "ActividadController";
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
    * Index ajax aplica para traer la data de las interfaces
    * */
   public function index_ajax (Request $request) {
      if ($request->wantsJson() && $request->ajax() && $request->isXmlHttpRequest()) {

         $this->validar_paginacion($request);
         $this->actividades = Actividad::paginate((int)$this->per_page);
         $this->usuario_auth = Auth::user();

         return response()->json([
            'status' => 200,
            'actividades' => $this->actividades,
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

      $this->actividad = Actividad::where("id_$this->nombre_modelo",'=',$id)->with([
         'servicios.aplicaciones'])->first();

      #Valida si actividad existe
      if ($this->actividad) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'eliminacion_exitosa', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro encontrado exitosamente."]],
            'actividad' => $this->actividad,
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
         'nom_actividad' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255",
         'det_actividad' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:255",
      ]);
      #Se valida la respuesta con la salida de la validacion
      if ($this->validacion->fails() == true) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'errores_campos_requeridos', //Para las notificaciones
            'mensajes' => $this->validacion->messages(), //Para mostrar los mensajes que van desde el backend
         ]);
      }
      #Como pasó todas las validaciones, se asigna al objeto
      $this->actividad = $request->all();
      #Se crea el nuevo registro
      $this->new_actividad = Actividad::create([
         'nom_actividad' => $this->actividad['nom_actividad'],
         'det_actividad' => $this->actividad['det_actividad'],
         'id_usuario_registra' => Auth::user()->id_usuario,
         'id_usuario_modifica' => Auth::user()->id_usuario,
      ]);

      unset($this->actividad, $this->validacion);

      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'creacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro ($this->nombre_modelo) creado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'actividad' => $this->new_actividad
      ]);
   }

   public function update(Request $request, $id) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      $this->validacion = Validator::make($request->all(), [
         'id_actividad' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|max:255',
         'nom_actividad' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255",
         'det_actividad' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:255",
      ]);
      #Valida si la informacion que se envia para editar al actividad son iguales los ids
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
      $this->actividad = Actividad::find($request["id_$this->nombre_modelo"]);
      $request['id_usuario_modifica'] = Auth::user()->id_usuario;
      $this->actividad->update($request->all());

      #unset($this->new_actividad_permiso, $this->permiso);
      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'actualizacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro actualizado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'actividad' => $this->actividad,
      ]);
   }

   public function destroy($id) {
      #Valida si la informacion que se envia para editar al actividad son iguales los ids
      if ($this->es_vacio($id) == true || preg_match("/^[0-9]*$/",$id) == 0) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'error_datos_invalidos', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Los datos a eliminar son incorrectos."]],
         ]);
      }

      $this->actividad = Actividad::find($id);

      #Valida si actividad existe y busca si tiene actividad_permiso
      if ($this->actividad) {
         $this->actividad->delete();
      }

      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'eliminacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro eliminado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
      ]);
   }
}
