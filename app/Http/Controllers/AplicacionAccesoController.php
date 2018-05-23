<?php

namespace App\Http\Controllers;

use App\Aplicacion;
use App\AplicacionAcceso;
use Illuminate\Http\Request;
use Auth;

use Illuminate\Support\Facades\Validator;

class AplicacionAccesoController extends Controller {
   private $usuario_auth;

   private $nombre_modelo;
   private $nombre_tabla;
   private $nombre_ruta;
   private $nombre_detalle;
   private $nombre_controller;


   private $aplicaciones_accesos;
   private $aplicaciones;
   private $aplicacion_acceso;
   private $aplicacion;
   private $new_aplicacion_acceso;
   private $validacion;
   private $per_page;


   public function __construct () {
      $this->middleware('auth');
      $this->middleware('mantenedor');#resrtinge a solo usuarios con permiso bajo -> D
      $this->nombre_modelo = "aplicacion_acceso"; //nombre tabla o de ruta
      $this->nombre_tabla = $this->nombre_ruta = "aplicaciones_accesos";
      $this->nombre_detalle = "Aplicaciones Accesos";
      $this->nombre_controller = "AplicacionAccesoController";
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
         $this->aplicaciones_accesos = AplicacionAcceso::paginate((int)$this->per_page);

         $this->usuario_auth = Auth::user();
         $this->aplicaciones = Aplicacion::all();
         return response()->json([
            'status' => 200,
            'aplicaciones_accesos' => $this->aplicaciones_accesos,
            'aplicaciones' => $this->aplicaciones,
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

      $this->aplicacion_acceso = AplicacionAcceso::where("id_$this->nombre_modelo",'=',$id)->first();

      #Valida si aplicacion existe y busca si tiene aplicacion_permiso
      if ($this->aplicacion_acceso) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'eliminacion_exitosa', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro encontrado exitosamente."]],
            'aplicacion_acceso' => $this->aplicacion_acceso,
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
         'usuario' => "required|regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|max:255",
         'clave' => "required|regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|max:255",
         'tipo_acceso' => "required|regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|max:255",
         'email' => "nullable|email|max:255",
         'id_aplicacion' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
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
      $this->aplicacion_acceso = $request->all();

      #Como aplicacion era obligatorio, se busca el registro y se guarda el servidor asociado.
      $this->aplicacion = Aplicacion::where('id_aplicacion', $this->aplicacion_acceso['id_aplicacion'])
         ->with(['servidor'])->first();
      #Se crea el nuevo registro
      $this->new_aplicacion_acceso = AplicacionAcceso::create([
         'usuario' => $this->aplicacion_acceso['usuario'],
         #'clave' => bcrypt($this->aplicacion_acceso['clave']),
         'clave' => $this->aplicacion_acceso['clave'],
         'tipo_acceso' => $this->aplicacion_acceso['tipo_acceso'],
         'email' => $this->aplicacion_acceso['email'],

         'id_aplicacion' => $this->aplicacion_acceso['id_aplicacion'],
         'id_servidor' => $this->aplicacion->servidor->id_servidor,

         'id_usuario_registra' => Auth::user()->id_usuario,
         'id_usuario_modifica' => Auth::user()->id_usuario,
      ]);

      unset($this->aplicacion_acceso, $this->validacion);

      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'creacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro ($this->nombre_modelo) creado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'aplicacion_acceso' => $this->new_aplicacion_acceso
      ]);
   }

   public function update(Request $request, $id) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      $this->validacion = Validator::make($request->all(), [
         'id_aplicacion_acceso' => 'required|regex:/(^([0-9]+)(\d+)?$)/u|max:255',
         'usuario' => "required|regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|max:255",
         'clave' => "required|regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|max:255",
         'tipo_acceso' => "required|regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|max:255",
         'email' => "nullable|email|max:255",
         'id_aplicacion' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
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
      unset($this->validacion);
      $this->aplicacion_acceso = AplicacionAcceso::find($request["id_$this->nombre_modelo"]);

      #Si cambió la aplicacion, cambia el servidor, el dato aca se guarda sin que el usuario lo digite,
      #si bien se sabe que la tabla aplicacion tiene el id del servidor, se mantiene en esta tabla
      #para obtener el dato mas accesible
      if ($this->aplicacion_acceso->id_aplicacion != $request['id_aplicacion']) {
         $this->aplicacion = Aplicacion::where('id_aplicacion', $request['id_aplicacion'])
            ->with(['servidor'])->first();
         $request['id_servidor'] = $this->aplicacion->id_servidor;
         unset($this->aplicacion);
      }
      $request['id_usuario_modifica'] = Auth::user()->id_usuario;
      /*
      if ( !$this->es_vacio($request['clave']) ) {
         $request['clave'] = bcrypt($request['clave']);
      }
      */
      $this->aplicacion_acceso->update($request->all());

      #unset($this->new_aplicacion_permiso, $this->permiso);
      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'actualizacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro actualizado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'aplicacion_acceso' => $this->aplicacion_acceso,
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

      $this->aplicacion_acceso = AplicacionAcceso::find($id);

      #Valida si aplicacion existe y busca si tiene aplicacion_permiso
      if ($this->aplicacion_acceso) {
         $this->aplicacion_acceso->delete();
      }

      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'eliminacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro eliminado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
      ]);
   }

}
