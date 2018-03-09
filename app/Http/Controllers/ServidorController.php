<?php

namespace App\Http\Controllers;

use App\Servidor;
use App\Datacentro;
use App\SistemaOperativo;
use Illuminate\Http\Request;
use Auth;

use Illuminate\Support\Facades\Validator;

class ServidorController extends Controller {
   private $usuario_auth;

   private $nombre_modelo;
   private $nombre_tabla;
   private $nombre_ruta;
   private $nombre_detalle;
   private $nombre_controller;

   private $servidores;
   private $datacentros;
   private $sistemas_operativos;
   private $servidor;
   private $new_servidor;
   private $validacion;

   public function __construct () {
      $this->middleware('auth');
      $this->nombre_modelo = "servidor"; //nombre tabla o de ruta
      $this->nombre_tabla = $this->nombre_ruta = "servidores";
      $this->nombre_detalle = "Servidores";
      $this->nombre_controller = "ServidorController";
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

      $this->usuario_auth = Auth::user();
      $this->servidores = Servidor::all();
      $this->datacentros = Datacentro::all();
      $this->sistemas_operativos = SistemaOperativo::all();
      return response()->json([
         'status' => 200,
         'servidores' => $this->servidores,
         'datacentros' => $this->datacentros,
         'sistemas_operativos' => $this->sistemas_operativos,
         'usuario_auth' => $this->usuario_auth,
      ]);
   }


   public function store(Request $request) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      $this->validacion = Validator::make($request->all(), [
         'nom_servidor' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255",
         'det_servidor' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:255",
         'ip_servidor' => "ip|max:255",

         'ram' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'memoria_dd' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'swap' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'procesador' => "nullable|regex:/(^([a-zA-Z]+)(\d+)?$)/u|max:255",
         'frec_procesador' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'nucleos' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'usuarios_pactados' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",

         'id_datacentro' => "regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'id_sistema_operativo' => "regex:/(^([0-9]+)(\d+)?$)/u|max:255",
      ]);
      #Se valida la respuesta con la salida de la validacion
      if ($this->validacion->fails() == true && !Auth::guest()) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'errores_campos_requeridos', //Para las notificaciones
            'mensajes' => $this->validacion->messages(), //Para mostrar los mensajes que van desde el backend
         ]);
      }
      #Como pasó todas las validaciones, se asigna al objeto
      $this->servidor = $request->all();
      #Se crea el nuevo registro
      $this->new_servidor = Servidor::create([
         'nom_servidor' => $this->servidor['nom_servidor'],
         'det_servidor' => $this->servidor['det_servidor'],
         'ip_servidor' => $this->servidor['ip_servidor'],

         'ram' => $this->servidor['ram'],
         'memoria_dd' => $this->servidor['memoria_dd'],
         'swap' => $this->servidor['swap'],
         'procesador' => $this->servidor['procesador'],
         'frec_procesador' => $this->servidor['frec_procesador'],
         'nucleos' => $this->servidor['nucleos'],
         'usuarios_pactados' => $this->servidor['usuarios_pactados'],

         'id_datacentro' => $this->servidor['id_datacentro'],
         'id_sistema_operativo' => $this->servidor['id_sistema_operativo'],

         'id_usuario_registra' => Auth::user()->id_usuario,
         'id_usuario_modifica' => Auth::user()->id_usuario,
      ]);

      unset($this->servidor, $this->validacion);

      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'creacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro ($this->nombre_modelo) creado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'servidor' => $this->new_servidor
      ]);
   }

   public function update(Request $request, $id) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      $this->validacion = Validator::make($request->all(), [
         'id_servidor' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|max:255',
         'nom_servidor' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255",
         'det_servidor' => "regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:255",
         'ip_servidor' => "ip|max:255",

         'ram' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'memoria_dd' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'swap' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'procesador' => "nullable|regex:/(^([a-zA-Z]+)(\d+)?$)/u|max:255",
         'frec_procesador' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'nucleos' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'usuarios_pactados' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",

         'id_datacentro' => "regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'id_sistema_operativo' => "regex:/(^([0-9]+)(\d+)?$)/u|max:255",
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
      if ($this->validacion->fails() == true && !Auth::guest()) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'errores_campos_requeridos', //Para las notificaciones
            'mensajes' => $this->validacion->messages(), //Para mostrar los mensajes que van desde el backend
         ]);
      }
      $this->servidor = Servidor::find($request["id_$this->nombre_modelo"]);
      $request['id_usuario_modifica'] = Auth::user()->id_usuario;
      $this->servidor->update($request->all());

      #unset($this->new_servidor_permiso, $this->permiso);
      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'actualizacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro actualizado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'servidor' => $this->servidor,
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

      $this->servidor = Servidor::find($id);

      #Valida si servidor existe y busca si tiene servidor_permiso
      if ($this->servidor) {
         $this->servidor->delete();
      }

      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'eliminacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro eliminado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
      ]);
   }
}
