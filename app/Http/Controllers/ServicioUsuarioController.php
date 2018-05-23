<?php

namespace App\Http\Controllers;

use App\ServicioUsuario;
use Illuminate\Http\Request;
use App\User;
use App\Servicio;
use Auth;
use Illuminate\Support\Facades\Validator;


class ServicioUsuarioController extends Controller {
   private $usuario_auth;

   private $nombre_modelo;
   private $nombre_tabla;
   private $nombre_ruta;
   private $nombre_detalle;
   private $nombre_controller;

   private $servicios;
   private $usuarios;
   private $servicios_usuarios;
   private $servicio_usuario;
   private $new_servicio_usuario;
   private $validacion;
   private $per_page;

   public function __construct () {
      $this->middleware('auth');
      $this->middleware('mantenedor');#resrtinge a solo usuarios con permiso bajo -> D
      $this->nombre_modelo = "servicio_usuario"; //nombre tabla o de ruta
      $this->nombre_tabla = $this->nombre_ruta = "servicios_usuarios";
      $this->nombre_detalle = "Servicios Usuarios Responsables";
      $this->nombre_controller = "ServicioUsuarioController";
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
         /* En construccion - falta crear mantenedor */

         $this->servicios = User::all();
         $this->usuarios = Servicio::all();
         $this->usuario_auth = Auth::user();

         return response()->json([
            'status' => 200,
            'servicio_usuario' => $this->servicio_usuario,
            'servicios' => $this->servicios,
            'usuarios' => $this->usuarios,
            'usuario_auth' => $this->usuario_auth,
         ]);
      }
   }

   public function index () {
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

      $this->servicio_usuario = ServicioUsuario::where("id_$this->nombre_modelo",'=',$id)->first();

      #Valida si role existe y busca si tiene servidor_usuario
      if ($this->servicio_usuario) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'eliminacion_exitosa', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro encontrado exitosamente."]],
            'servicio_usuario' => $this->servicio_usuario,
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
         'id_usuario' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|max:255',
         'id_servicio' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|max:255',
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
      $this->servicio_usuario = $request->all();
      #Se crea el nuevo registro
      $this->new_servicio_usuario = ServicioUsuario::create([
         'id_usuario' => $this->servicio_usuario['id_usuario'],
         'id_servicio' => $this->servicio_usuario['id_servicio'],
         'id_usuario_registra' => Auth::user()->id_usuario,
         'id_usuario_modifica' => Auth::user()->id_usuario,
      ]);

      unset($this->servicio_usuario, $this->validacion);

      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'creacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro ($this->nombre_modelo) creado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'servicio_usuario' => ServicioUsuario::with(['usuario'])
            ->where('id_servicio_usuario', $this->new_servicio_usuario->id_servicio_usuario)->first()
      ]);
   }

   public function update(Request $request, $id) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      $this->validacion = Validator::make($request->all(), [
         'id_servicio_usuario' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|max:255',
         'id_usuario' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|max:255',
         'id_servicio' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|max:255',
      ]);
      #Valida si la informacion que se envia para editar al servicio_usuario son iguales los ids
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
      $this->servicio_usuario = ServicioUsuario::find($request["id_$this->nombre_modelo"]);
      $request['id_usuario_modifica'] = Auth::user()->id_usuario;
      $this->servicio_usuario->update($request->all());

      #unset($this->new_servicio_usuario);
      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'actualizacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro actualizado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'servicio_usuario' => $this->servicio_usuario,
      ]);
   }

   public function destroy($id) {
      #Valida si la informacion que se envia para editar al servicio_usuario son iguales los ids
      if ($this->es_vacio($id) == true || preg_match("/^[0-9]*$/",$id) == 0) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'error_datos_invalidos', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Los datos a eliminar son incorrectos."]],
         ]);
      }

      $this->servicio_usuario = ServicioUsuario::find($id);

      #Valida si servicio_usuario existe y busca si tiene servicio_usuario
      if ($this->servicio_usuario) {
         $this->servicio_usuario->delete();
      }

      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'eliminacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro eliminado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
      ]);
   }
}
