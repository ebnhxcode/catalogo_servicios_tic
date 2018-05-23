<?php

namespace App\Http\Controllers;

use App\Servidor;
use App\ServidorAcceso;
use Illuminate\Http\Request;
use Auth;

use Illuminate\Support\Facades\Validator;


class ServidorAccesoController extends Controller {
   private $usuario_auth;

   private $nombre_modelo;
   private $nombre_tabla;
   private $nombre_ruta;
   private $nombre_detalle;
   private $nombre_controller;


   private $servidores_accesos;
   private $servidores;
   private $servidor_acceso;
   private $new_servidor_acceso;
   private $validacion;
   private $per_page;


   public function __construct () {
      $this->middleware('auth');
      $this->middleware('mantenedor');#resrtinge a solo usuarios con permiso bajo -> D
      $this->nombre_modelo = "servidor_acceso"; //nombre tabla o de ruta
      $this->nombre_tabla = $this->nombre_ruta = "servidores_accesos";
      $this->nombre_detalle = "Servidores Accesos";
      $this->nombre_controller = "ServidorAccesoController";
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

         $this->servidores_accesos = ServidorAcceso::with(['servidor'])->paginate((int)$this->per_page);
         $this->servidores = Servidor::all();
         $this->usuario_auth = Auth::user();
         return response()->json([
            'status' => 200,
            'servidores_accesos' => $this->servidores_accesos,
            'servidores' => $this->servidores,
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

      $this->servidor_acceso = ServidorAcceso::where("id_$this->nombre_modelo",'=',$id)->with(['servidor'])->first();

      #Valida si servidor existe y busca si tiene servidor_permiso
      if ($this->servidor_acceso) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'eliminacion_exitosa', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro encontrado exitosamente."]],
            'servidor_acceso' => $this->servidor_acceso,
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
         'puerto' => "nullable|regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|max:255",
         'id_servidor' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
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
      $this->servidor_acceso = $request->all();

      #Se crea el nuevo registro
      $this->new_servidor_acceso = ServidorAcceso::create([
         'usuario' => $this->servidor_acceso['usuario'],
         #'clave' => bcrypt($this->servidor_acceso['clave']),
         'clave' => $this->servidor_acceso['clave'],
         'tipo_acceso' => $this->servidor_acceso['tipo_acceso'],
         'puerto' => $this->servidor_acceso['puerto'],

         'id_servidor' => $this->servidor_acceso['id_servidor'],

         'id_usuario_registra' => Auth::user()->id_usuario,
         'id_usuario_modifica' => Auth::user()->id_usuario,
      ]);

      unset($this->servidor_acceso, $this->validacion);

      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'creacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro ($this->nombre_modelo) creado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'servidor_acceso' => $this->new_servidor_acceso
      ]);
   }

   public function update(Request $request, $id) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      $this->validacion = Validator::make($request->all(), [
         'id_servidor_acceso' => 'required|regex:/(^([0-9]+)(\d+)?$)/u|max:255',
         'usuario' => "required|regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|max:255",
         'clave' => "required|regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|max:255",
         'tipo_acceso' => "required|regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|max:255",
         'puerto' => "nullable|regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|max:255",
         'id_servidor' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
      ]);
      #Valida si la informacion que se envia para editar al servidor son iguales los ids
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
      $this->servidor_acceso = ServidorAcceso::find($request["id_$this->nombre_modelo"]);
      $request['id_usuario_modifica'] = Auth::user()->id_usuario;
      /*
      if ( !$this->es_vacio($request['clave']) ) {
         $request['clave'] = bcrypt($request['clave']);
      }
      */
      $this->servidor_acceso->update($request->all());

      #unset($this->new_servidor_permiso, $this->permiso);
      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'actualizacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro actualizado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'servidor_acceso' => $this->servidor_acceso,
      ]);
   }

   public function destroy($id) {
      #Valida si la informacion que se envia para editar al servidor son iguales los ids
      if ($this->es_vacio($id) == true || preg_match("/^[0-9]*$/",$id) == 0) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'error_datos_invalidos', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Los datos a eliminar son incorrectos."]],
         ]);
      }

      $this->servidor_acceso = ServidorAcceso::find($id);

      #Valida si servidor existe y busca si tiene servidor_permiso
      if ($this->servidor_acceso) {
         $this->servidor_acceso->delete();
      }

      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'eliminacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro eliminado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
      ]);
   }


}
