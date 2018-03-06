<?php

namespace App\Http\Controllers;

use App\SistemaOperativo;
use Illuminate\Http\Request;
use Auth;

use Illuminate\Support\Facades\Validator;

class SistemaOperativoController extends Controller {
   private $usuario_auth;

   private $nombre_modelo;
   private $nombre_tabla;
   private $nombre_ruta;
   private $nombre_detalle;
   private $nombre_controller;

   private $sistemas_operativos;
   private $sistema_operativo;
   private $new_sistema_operativo;
   private $validacion;

   public function __construct () {
      $this->middleware('auth');
      $this->nombre_modelo = "sistema_operativo"; //nombre tabla o de ruta
      $this->nombre_tabla = $this->nombre_ruta = "sistemas_operativos";
      $this->nombre_detalle = "Sistemas Operativos";
      $this->nombre_detalle_singular = "Sistema Operativo";
      $this->nombre_controller = "SistemaOperativoController";
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
            'nombre_detalle_singular' => $this->nombre_detalle_singular,
            'nombre_controller' => $this->nombre_controller,
         ]);
      }

      $this->usuario_auth = Auth::user();
      $this->sistemas_operativos = SistemaOperativo::all();
      return response()->json([
         'status' => 200,
         'sistemas_operativos' => $this->sistemas_operativos,
         'usuario_auth' => $this->usuario_auth,
      ]);
   }


   public function store(Request $request) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      $this->validacion = Validator::make($request->all(), [
         'arquitectura' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255",
         'nom_sistema_operativo' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:255",
         'det_sistema_operativo' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:255",
         'vers_sistema_operativo' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|max:255",
         'lic_sistema_operativo' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|max:255",
         'det_licencia_sistema_operativo' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|max:255",
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
      $this->sistema_operativo = $request->all();
      #Se crea el nuevo registro
      $this->new_sistema_operativo = SistemaOperativo::create([
         'arquitectura' => $this->sistema_operativo['arquitectura'],
         'nom_sistema_operativo' => $this->sistema_operativo['nom_sistema_operativo'],
         'det_sistema_operativo' => $this->sistema_operativo['det_sistema_operativo'],
         'vers_sistema_operativo' => $this->sistema_operativo['vers_sistema_operativo'],
         'lic_sistema_operativo' => $this->sistema_operativo['lic_sistema_operativo'],
         'det_licencia_sistema_operativo' => $this->sistema_operativo['det_licencia_sistema_operativo'],
         'id_usuario_registra' => Auth::user()->id_usuario,
         'id_usuario_modifica' => Auth::user()->id_usuario,
      ]);

      unset($this->sistema_operativo, $this->validacion);

      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'creacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro ($this->nombre_modelo) creado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'sistema_operativo' => $this->new_sistema_operativo
      ]);
   }

   public function update(Request $request, $id) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      $this->validacion = Validator::make($request->all(), [
         'id_sistema_operativo' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|max:255',
         'arquitectura' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255",
         'nom_sistema_operativo' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:255",
         'det_sistema_operativo' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:255",
         'vers_sistema_operativo' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|max:255",
         'lic_sistema_operativo' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|max:255",
         'det_licencia_sistema_operativo' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|max:255",
      ]);
      #Valida si la informacion que se envia para editar al sistema_operativo son iguales los ids
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
      $this->sistema_operativo = SistemaOperativo::find($request["id_$this->nombre_modelo"]);
      $request['id_usuario_modifica'] = Auth::user()->id_usuario;
      $this->sistema_operativo->update($request->all());

      #unset($this->new_sistema_operativo_permiso, $this->permiso);
      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'actualizacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro actualizado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'sistema_operativo' => $this->sistema_operativo,
      ]);
   }

   public function destroy($id) {
      #Valida si la informacion que se envia para editar al sistema_operativo son iguales los ids
      if ($this->es_vacio($id) == true || preg_match("/^[0-9]*$/",$id) == 0) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'error_datos_invalidos', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Los datos a eliminar son incorrectos."]],
         ]);
      }

      $this->sistema_operativo = SistemaOperativo::find($id);

      #Valida si sistema_operativo existe y busca si tiene sistema_operativo_permiso
      if ($this->sistema_operativo) {
         $this->sistema_operativo->delete();
      }

      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'eliminacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro eliminado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
      ]);
   }

}
