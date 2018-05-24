<?php

namespace App\Http\Controllers;


use App\Servicio;
use App\Actividad;
use App\UsuarioBitacoraServicio;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Validator;

class UsuarioBitacoraServicioController extends Controller {
   private $usuario_auth;

   private $nombre_modelo;
   private $nombre_tabla;
   private $nombre_ruta;
   private $nombre_detalle;
   private $nombre_controller;

   private $servicios;
   private $actividades;
   private $usuarios_bitacora_servicios;
   private $usuario_bitacora_servicio;
   private $new_usuario_bitacora_servicio;
   private $validacion;
   private $per_page;


   public function __construct () {
      $this->middleware('auth');
      $this->middleware('mantenedor');#resrtinge a solo usuarios con permiso bajo -> D
      $this->nombre_modelo = "usuario_bitacora_servicio"; //nombre tabla o de ruta
      $this->nombre_tabla = $this->nombre_ruta = "usuarios_bitacora_servicios";
      $this->nombre_detalle = "Usuarios Bitacora Servicios";
      $this->nombre_controller = "UsuarioBitacoraServicioController";
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

         $this->actividades = Actividad::all();
         $this->servicios = Servicio::all();

         $this->usuario_auth = Auth::user();
         $this->usuarios_bitacora_servicios = UsuarioBitacoraServicio::with([
            'usuario','servicio','actividad'
         ])->where('id_usuario', '=', $this->usuario_auth->id_usuario)->paginate((int)$this->per_page);


         return response()->json([
            'status' => 200,
            'actividades' => $this->actividades,
            'servicios' => $this->servicios,
            'usuarios_bitacora_servicios' => $this->usuarios_bitacora_servicios,
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

      $this->usuario_bitacora_servicio = UsuarioBitacoraServicio::where("id_$this->nombre_modelo",'=',$id)->with(
          ['usuario','servicio','actividad']
      )->first();


      #Valida si usuario_bitacora_servicio existe
      if ($this->usuario_bitacora_servicio) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'eliminacion_exitosa', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro encontrado exitosamente."]],
            'usuario_bitacora_servicio' => $this->usuario_bitacora_servicio,
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
         'asunto' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255",
         'det_bitacora' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:255",

         'id_servicio' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|integer',
         'id_actividad' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|integer',
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
      $this->usuario_bitacora_servicio = $request->all();
      #Se crea el nuevo registro
      $this->new_usuario_bitacora_servicio = UsuarioBitacoraServicio::create([
         'asunto' => $this->usuario_bitacora_servicio['asunto'],
         'det_bitacora' => $this->usuario_bitacora_servicio['det_bitacora'],

         'id_actividad' => $this->usuario_bitacora_servicio['id_actividad'],
         'id_servicio' => $this->usuario_bitacora_servicio['id_servicio'],
         'id_usuario' => Auth::user()->id_usuario,


         'id_usuario_registra' => Auth::user()->id_usuario,
         'id_usuario_modifica' => Auth::user()->id_usuario,
      ]);

      unset($this->usuario_bitacora_servicio, $this->validacion);

      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'creacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro ($this->nombre_modelo) creado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'usuario_bitacora_servicio' => UsuarioBitacoraServicio::with(['usuario'])
            ->where('id_usuario_bitacora_servicio', $this->new_usuario_bitacora_servicio->id_usuario_bitacora_servicio)->first()
      ]);
   }

   public function update(Request $request, $id) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      $this->validacion = Validator::make($request->all(), [
         "id_{$this->nombre_modelo}" => 'regex:/(^([0-9]+)(\d+)?$)/u|required|max:255',
         'asunto' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255",
         'det_bitacora' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:255",

         'id_servicio' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|integer',
         'id_actividad' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|integer',
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

      $this->usuario_bitacora_servicio = UsuarioBitacoraServicio::find($request["id_$this->nombre_modelo"]);
      $request['id_usuario_modifica'] = Auth::user()->id_usuario;

      $this->usuario_bitacora_servicio->update($request->all());

      #unset($this->new_aplicacion_permiso, $this->permiso);
      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'actualizacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro actualizado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'usuario_bitacora_servicio' => $this->usuario_bitacora_servicio,
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

      $this->usuario_bitacora_servicio = UsuarioBitacoraServicio::find($id);

      #Valida si aplicacion existe y busca si tiene aplicacion_permiso
      if ($this->usuario_bitacora_servicio) {
         $this->usuario_bitacora_servicio->delete();
      }

      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'eliminacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro eliminado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
      ]);
   }


}
