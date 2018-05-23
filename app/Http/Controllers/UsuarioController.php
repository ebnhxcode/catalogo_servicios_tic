<?php

namespace App\Http\Controllers;

use App\Cargo;
use App\Estado;
use App\Role;
use App\User;
use App\UsuarioRole;
use App\UsuarioEstado;
use App\UsuarioCargo;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Validator;

class UsuarioController extends Controller {
   private $usuario_auth;

   private $nombre_modelo;
   private $nombre_tabla;
   private $nombre_ruta;
   private $nombre_detalle;
   private $nombre_controller;

   private $usuarios;
   private $usuario;
   private $role;
   private $roles;
   private $estado;
   private $estados;
   private $cargo;
   private $cargos;
   private $new_usuario;
   private $new_usuario_role;
   private $new_usuario_estado;
   private $new_usuario_cargo;
   private $validacion;
   private $per_page;

   public function __construct () {
      $this->middleware('auth');
      $this->middleware('mantenedor');#resrtinge a solo usuarios con permiso bajo -> D
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

         $this->usuarios = User::with(['usuario_estado.estado','usuario_role.role','usuario_cargo.cargo','usuario_bitacora_servicios'])->paginate((int)$this->per_page);
         $this->roles = Role::all();
         $this->estados = Estado::all();
         $this->cargos = Cargo::all();
         $this->usuario_auth = Auth::user();
         return response()->json([
            'status' => 200,
            'usuarios' => $this->usuarios,
            'usuarios' => $this->usuarios,
            'roles' => $this->roles,
            'estados' => $this->estados,
            'cargos' => $this->cargos,
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

      $this->usuario = User::where("id_$this->nombre_modelo",'=',$id)->with([
         'usuario_estado.estado','usuario_role.role','usuario_cargo.cargo','usuario_bitacora_servicios'
      ])->first();

      #Valida si usuario existe y busca si tiene servidor_permiso
      if ($this->usuario) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'eliminacion_exitosa', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro encontrado exitosamente."]],
            'usuario' => $this->usuario,
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
         'nom_usuario' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255",
         'nom_completo' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|max:255",
         'id_role' => "regex:/(^([0-9]+)(\d+)?$)/u|required|max:255",
         'id_estado' => "regex:/(^([0-9]+)(\d+)?$)/u|required|max:255",
         'id_cargo' => "regex:/(^([0-9]+)(\d+)?$)/u|required|max:255",
         'ape_paterno' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|max:255",
         'ape_materno' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|max:255",
         'username' => "regex:/(^([a-zA-Z0-9_.]+)(\d+)?$)/u|required|unique:$this->nombre_tabla|max:255",
         'email' => "email|required|unique:$this->nombre_tabla|max:255",
         'password' => "regex:/(^([a-zA-Z0-9_ !@#$%*&]{8,20}+)(\d+)?$)/u|required|max:255",
      ]);
      #Se valida la respuesta con la salida de la validacion
      if ($this->validacion->fails() == true) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'errores_campos_requeridos', //Para las notificaciones
            'mensajes' => $this->validacion->messages(), //Para mostrar los mensajes que van desde el backend
         ]);
      }
      #Como pasó todas las validaciones, se asigna al

      # objeto
      $this->usuario = $request->all();

      #Se crea el nuevo registro
      $this->new_usuario = User::create([
         'nom_usuario' => $this->usuario['nom_usuario'],
         'nom_completo' => $this->usuario['nom_completo'],
         'ape_paterno' => $this->usuario['ape_paterno'],
         'ape_materno' => $this->usuario['ape_materno'],
         'username' => $this->usuario['username'],
         'email' => $this->usuario['email'],
         'password' => bcrypt($this->usuario['password']),
         'id_usuario_registra' => Auth::user()->id_usuario,
         'id_usuario_modifica' => Auth::user()->id_usuario,
      ]);

      #Guardar relacion del role, en caso que exista valor
      $this->new_usuario_role = UsuarioRole::create([
         'id_usuario' => $this->new_usuario->id_usuario,
         'id_role' => $this->usuario['id_role'],
         'id_usuario_registra' => Auth::user()->id_usuario,
         'id_usuario_modifica' => Auth::user()->id_usuario,
      ]);
      #Guardar relacion del estado, en caso que exista valor
      $this->new_usuario_estado = UsuarioEstado::create([
         'id_usuario' => $this->new_usuario->id_usuario,
         'id_estado' => $this->usuario['id_estado'],
         'id_usuario_registra' => Auth::user()->id_usuario,
         'id_usuario_modifica' => Auth::user()->id_usuario,
      ]);
      #Guardar relacion del cargo, en caso que exista valor
      $this->new_usuario_cargo = UsuarioCargo::create([
         'id_usuario' => $this->new_usuario->id_usuario,
         'id_cargo' => $this->usuario['id_cargo'],
         'id_usuario_registra' => Auth::user()->id_usuario,
         'id_usuario_modifica' => Auth::user()->id_usuario,
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
         #'nom_completo' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|max:255",
         #'ape_paterno' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|max:255",
         #'ape_materno' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|max:255",
         'id_role' => "regex:/(^([0-9]+)(\d+)?$)/u|required|max:255",
         'id_estado' => "regex:/(^([0-9]+)(\d+)?$)/u|required|max:255",
         'id_cargo' => "regex:/(^([0-9]+)(\d+)?$)/u|required|max:255",
         'username' => "regex:/(^([a-zA-Z0-9_.]+)(\d+)?$)/u|required|max:255",
         'email' => "email|required|max:255",
         #'password' => "regex:/(^([a-zA-Z0-9_ !@#$%*&]{8,20}+)(\d+)?$)/u|required|max:255",
         'password' => "regex:/(^([a-zA-Z0-9_ !@#$%*&]{8,20}+)(\d+)?$)/u|required|max:255",
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
      $request['id_usuario_modifica'] = Auth::user()->id_usuario;
      $request['password'] = bcrypt($request["password"]);
      $this->usuario->update($request->all());

      if (isset($this->usuario)) {

         #Actualizar o asoc. nuevo role usuario
         if ( $this->usuario->usuario_role != null) {
            $this->role = $this->usuario->usuario_role->role;
            if ( ! in_array($this->role->id_role, [$request["id_role"],null,'null',''] )) {
               $this->usuario->usuario_role->id_role = $request["id_role"];
               $this->usuario->usuario_role->id_usuario_modifica = Auth::user()->id_usuario;
               $this->usuario->usuario_role->save();
            }
         } else {
            $this->new_usuario_role = UsuarioRole::create([
               'id_usuario' => $this->usuario['id_usuario'],
               'id_role' => $request['id_role'],
               'id_usuario_registra' => Auth::user()->id_usuario,
               'id_usuario_modifica' => Auth::user()->id_usuario,
            ]);
         }

         #Actualizar o asoc. nuevo estado usuario
         if ( $this->usuario->usuario_estado != null) {
            $this->estado = $this->usuario->usuario_estado->estado;
            if ( ! in_array($this->estado->id_estado, [$request["id_estado"],null,'null',''] )) {
               $this->usuario->usuario_estado->id_estado = $request["id_estado"];
               $this->usuario->usuario_estado->id_usuario_modifica = Auth::user()->id_usuario;
               $this->usuario->usuario_estado->save();
            }
         } else {
            $this->new_usuario_estado = UsuarioEstado::create([
               'id_usuario' => $this->usuario['id_usuario'],
               'id_estado' => $request['id_estado'],
               'id_usuario_registra' => Auth::user()->id_usuario,
               'id_usuario_modifica' => Auth::user()->id_usuario,
            ]);
         }


         #Actualizar o asoc. nuevo cargo usuario
         if ( $this->usuario->usuario_cargo != null) {
            $this->cargo = $this->usuario->usuario_cargo->cargo;
            if ( ! in_array($this->cargo->id_cargo, [$request["id_cargo"],null,'null',''] )) {
               $this->usuario->usuario_cargo->id_cargo = $request["id_cargo"];
               $this->usuario->usuario_cargo->id_usuario_modifica = Auth::user()->id_usuario;
               $this->usuario->usuario_cargo->save();
            }
         } else {
            $this->new_usuario_cargo = UsuarioCargo::create([
               'id_usuario' => $this->usuario['id_usuario'],
               'id_cargo' => $request['id_cargo'],
               'id_usuario_registra' => Auth::user()->id_usuario,
               'id_usuario_modifica' => Auth::user()->id_usuario,
            ]);
         }

      }


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
