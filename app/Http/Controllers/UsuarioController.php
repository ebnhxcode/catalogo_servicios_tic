<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UsuarioController extends Controller {

   private $nombre_modelo;
   private $nombre_tabla;
   private $nombre_ruta;
   private $nombre_detalle;
   private $nombre_controller;


   private $usuario;
   private $new_usuario;
   private $validacion;

   public function __construct () {
      #$this->middleware('auth');
      $this->nombre_modelo = "usuario"; //nombre tabla o de ruta
      $this->nombre_tabla = $this->nombre_ruta = "usuarios";
      $this->nombre_detalle = "Usuarios";
      $this->nombre_controller = "UsuarioController";
   }

   private function es_vacio ($variable) {
      if (isset($variable) && !in_array($variable, [null, 'null', ''])) {
         return false;
      } else {
         return true;
      }
   }

   public function index(Request $request) {
      if (!$request->wantsJson() && !$request->ajax()) {
         return view("$this->nombre_tabla.main", [
            'nombre_modelo' => $this->nombre_modelo,
            'nombre_tabla' => $this->nombre_tabla,
            'nombre_ruta' => $this->nombre_ruta,
            'nombre_detalle' => $this->nombre_detalle,
            'nombre_controller' => $this->nombre_controller,
         ]);
      }

      $this->usuarios = User::all();
      return response()->json([
         'status' => 200,
         'usuarios' => $this->usuarios,
      ]);
   }

   public function store(Request $request) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      $this->validacion = Validator::make($request->all(), [
         'nom_usuario' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255",
         'nom_completo' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|max:255",
         'ape_paterno' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|max:255",
         'ape_materno' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|max:255",
         'username' => "regex:/(^([a-zA-Z0-9_]+)(\d+)?$)/u|required|unique:$this->nombre_tabla|max:255",
         'email' => "email|required|unique:$this->nombre_tabla|max:255",
         'password' => "regex:/(^([a-zA-Z0-9_ !@#$%*&]{8,}+)(\d+)?$)/u|required|max:255",
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
      $this->usuario = $request->all();
      #Se crea el nuevo registro
      $this->new_usuario = User::create([
         'nom_usuario' => $this->usuario['nom_usuario'],
         'nom_completo' => $this->usuario['nom_completo'],
         'ape_paterno' => $this->usuario['ape_paterno'],
         'ape_materno' => $this->usuario['ape_materno'],
         'username' => $this->usuario['username'],
         'email' => $this->usuario['email'],
         'password' => bcrypt($this->usuario['password'])
      ]);

      unset($this->usuario, $this->validacion/*$this->validacion,$this->new_usuario, $this->new_usuario_permiso*/);

      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'creacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro ($this->nombre_modelo) creado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'usuario' => $this->new_usuario
      ]);
   }

   public function update(Request $request, $id) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      $this->validacion = Validator::make($request->all(), [
         'id_usuario' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|max:255',
         'nom_usuario' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255",
         'nom_completo' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|max:255",
         'ape_paterno' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|max:255",
         'ape_materno' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|max:255",
         'username' => "regex:/(^([a-zA-Z0-9_]+)(\d+)?$)/u|required|max:255",
         'email' => "email|required|max:255",
         'password' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255",
      ]);
      #Valida si la informacion que se envia para editar al usuario son iguales los ids
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
      $this->usuario = User::find($request["id_$this->nombre_modelo"]);
      $this->usuario->update($request->all());

      #unset($this->new_usuario_permiso, $this->permiso);
      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'actualizacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro actualizado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'usuario' => $this->usuario,
      ]);
   }

   public function destroy($id) {
      #Valida si la informacion que se envia para editar al usuario son iguales los ids
      if ($this->es_vacio($id) == true || preg_match("/^[0-9]*$/",$id) == 0) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'error_datos_invalidos', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Los datos a eliminar son incorrectos."]],
         ]);
      }

      $this->usuario = User::find($id);

      #Valida si usuario existe y busca si tiene usuario_permiso
      if ($this->usuario) {
         $this->usuario->delete();
      }

      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'eliminacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro eliminado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
      ]);
   }
}
