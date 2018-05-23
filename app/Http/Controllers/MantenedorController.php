<?php

namespace App\Http\Controllers;

use Auth;
use App\Mantenedor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MantenedorController extends Controller {
   private $usuario_auth;

   private $nombre_modelo; //Se usa como prefijo en llamados en duro o definiciones similares
   private $nombre_tabla; //Se usa como prefijo en llamados en duro o definiciones similares o de ruta
   private $nombre_ruta; //Se usa como prefijo en llamados en duro o definiciones similares o de ruta
   private $nombre_detalle; //Se usa como prefijo en nombres o cabeceras
   private $nombre_controller; //
   private $mantenedores;
   private $mantenedor;
   private $new_mantenedor;
   private $validacion; //Uso en valicaciones de request
   private $per_page;

   public function __construct () {
      $this->middleware('auth');
      $this->middleware('mantenedor', ['except' => ['index','show']]);
      $this->nombre_modelo = "mantenedor"; //nombre tabla o de ruta
      $this->nombre_tabla = $this->nombre_ruta = "mantenedores";
      $this->nombre_detalle = "Menus de Mantenedores";
      $this->nombre_controller = "MantenedorController";
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
         $this->mantenedores = Mantenedor::paginate((int)$this->per_page);

         $this->usuario_auth = Auth::user();
         return response()->json([
            'status' => 200,
            'mantenedores' => $this->mantenedores,
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

      $this->mantenedor = Mantenedor::where("id_$this->nombre_modelo",'=',$id)->first();

      #Valida si mantenedor existe y busca si tiene servidor_permiso
      if ($this->mantenedor) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'eliminacion_exitosa', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro encontrado exitosamente."]],
            'mantenedor' => $this->mantenedor,
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
         'url_mantenedor' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255",
         'nom_mantenedor' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|unique:$this->nombre_tabla|max:255",
         'det_mantenedor' => 'regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:1000',
         'cod_mantenedor' => 'regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:1000',
         'imagen_mantenedor' => 'nullable|regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|max:1000',
         'font_icon_mantenedor' => 'nullable|regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|max:1000',
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
      $this->mantenedor = $request->all();
      #Se crea el nuevo registro
      $this->new_mantenedor = Mantenedor::create([
         'url_mantenedor' => $this->mantenedor['url_mantenedor'],
         'nom_mantenedor' => $this->mantenedor['nom_mantenedor'],
         'det_mantenedor' => $this->mantenedor['det_mantenedor'],
         'cod_mantenedor' => $this->mantenedor['cod_mantenedor'],
         'imagen_mantenedor' => $this->mantenedor['imagen_mantenedor'],
         'font_icon_mantenedor' => $this->mantenedor['font_icon_mantenedor'],
         'id_usuario_registra' => Auth::user()->id_usuario,
         'id_usuario_modifica' => Auth::user()->id_usuario,
      ]);
      unset($this->mantenedor/*$this->validacion,$this->new_mantenedor,*/);
      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'creacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro ($this->nombre_modelo) creado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'mantenedor' => $this->new_mantenedor
      ]);
   }

   public function update(Request $request, $id) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      $this->validacion = Validator::make($request->all(), [
         'id_mantenedor' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|max:255',
         'url_mantenedor' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255",
         'nom_mantenedor' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255",
         'det_mantenedor' => 'regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:1000',
         'cod_mantenedor' => 'regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:1000',
         'imagen_mantenedor' => 'nullable|regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|max:1000',
         'font_icon_mantenedor' => 'nullable|regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|max:1000',
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
      $this->mantenedor = Mantenedor::find($request["id_$this->nombre_modelo"]);
      $request['id_usuario_modifica'] = Auth::user()->id_usuario;
      $this->mantenedor->update($request->all());

      #unset($this->new_mantenedor_permiso, $this->permiso);
      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'actualizacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro actualizado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'mantenedor' => $this->mantenedor,
      ]);
   }

   public function destroy($id) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      #$this->validacion = Validator::make($request->all(), [
      #   'id_mantenedor' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|max:255',
      #]);

      #Valida si la informacion que se envia para editar al usuario son iguales los ids
      if ($this->es_vacio($id) == true || preg_match("/^[0-9]*$/",$id) == 0) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'error_datos_invalidos', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Los datos a eliminar son incorrectos."]],
         ]);
      }

      $this->mantenedor = Mantenedor::find($id);

      #Valida si mantenedor existe y busca si tiene mantenedor_permiso
      if ($this->mantenedor) {
         $this->mantenedor->delete();
      }


      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'eliminacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro eliminado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
      ]);
   }


}
