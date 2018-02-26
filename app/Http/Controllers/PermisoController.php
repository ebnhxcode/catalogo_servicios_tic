<?php

namespace App\Http\Controllers;

use App\Permiso;
use App\RolePermiso;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PermisoController extends Controller {
   private $permisos;
   private $permiso;
   private $new_permiso;
   private $nombre_modelo; //Se usa como prefijo en llamados en duro o definiciones similares
   private $nombre_tabla; //Se usa como prefijo en llamados en duro o definiciones similares
   private $nombre_ruta;
   private $nombre_detalle; //Se usa como prefijo en nombres o cabeceras
   private $nombre_controller; //
   private $validacion; //Uso en valicaciones de request

   public function __construct() {
      #$this->middleware('auth');
      $this->nombre_modelo = "permiso";
      $this->nombre_tabla = $this->nombre_ruta = "permisos";
      $this->nombre_detalle = "Permisos";
      $this->nombre_controller = "PermisoController";
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

      #$this->roles = Role::with('role_permiso.permiso')->get();
      $this->permisos = Permiso::all();
      return response()->json([
         'status' => 200,
         'permisos' => $this->permisos,
      ]);
   }

   public function store(Request $request) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      $this->validacion = Validator::make($request->all(), [
         'nom_permiso' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|unique:$this->nombre_tabla|max:255",
         'det_permiso' => 'required|max:1000',
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
      $this->permiso = $request->all();

      #Se crea el nuevo registro
      $this->new_permiso = Permiso::create([
         'nom_permiso' => $this->permiso['nom_permiso'],
         'det_permiso' => $this->permiso['det_permiso']
      ]);

      unset($this->permiso, $this->validacion /*$this->validacion,$this->new_role,*/);
      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'creacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro ($this->nombre_modelo) creado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'permiso' => $this->new_permiso
      ]);
   }

   public function update(Request $request, $id) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      $this->validacion = Validator::make($request->all(), [
         'id_permiso' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|max:255',
         'nom_permiso' => 'regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255',
         'det_permiso' => 'required|max:1000',
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
      $this->permiso = Permiso::find($request["id_$this->nombre_modelo"]);
      $this->permiso->update($request->all());

      #unset($this->new_role_permiso, $this->permiso);
      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'actualizacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro actualizado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'permiso' => $this->permiso,
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

      $this->permiso = Permiso::find($id);

      #Valida si role existe y busca si tiene role_permiso
      if ($this->permiso) {
         $this->permiso->delete();
      }

      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'eliminacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro eliminado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
      ]);
   }

}
