<?php

namespace App\Http\Controllers;

use App\Menu;
use App\Mantenedor;
use App\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MenuController extends Controller {
   private $usuario_auth;

   private $nombre_modelo; //Se usa como prefijo en llamados en duro o definiciones similares
   private $nombre_tabla; //Se usa como prefijo en llamados en duro o definiciones similares o de ruta
   private $nombre_ruta; //Se usa como prefijo en llamados en duro o definiciones similares o de ruta
   private $nombre_detalle; //Se usa como prefijo en nombres o cabeceras
   private $nombre_controller; //
   private $mantenedores;
   private $menus;
   private $menu;
   private $role;
   private $usuario_role;
   private $new_menu;
   private $validacion; //Uso en valicaciones de request
   private $per_page;

   public function __construct () {
      $this->middleware('auth');
      $this->middleware('mantenedor', ['except' => ['index','show']]);#resrtinge a solo usuarios con permiso bajo -> D
      $this->nombre_modelo = "menu"; //nombre tabla o de ruta
      $this->nombre_tabla = $this->nombre_ruta = "menus";
      $this->nombre_detalle = "Menus Generales";
      $this->nombre_controller = "MenuController";
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

         $this->menus = Menu::orderBy('nom_menu', 'desc')->paginate((int)$this->per_page);
         $this->usuario_auth = Auth::user();

         if($this->usuario_role = $this->usuario_auth->usuario_role){
            $this->role = $this->usuario_role->role;
            switch($this->role->nom_role){
               case 'Administrador':
               case 'Jefe de Area':
               case 'Lider Equipo':
                  $this->mantenedores = Mantenedor::orderBy('nom_mantenedor', 'asc')->get();
                  break;
            }
         }

         #$this->mantenedores = Mantenedor::orderBy('nom_mantenedor', 'asc')->get();
         return response()->json([
            'status' => 200,
            'menus' => $this->menus,
            'mantenedores' => $this->mantenedores,
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

      $this->menu = Menu::where("id_$this->nombre_modelo",'=',$id)->first();

      #Valida si menu existe y busca si tiene servidor_permiso
      if ($this->menu) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'eliminacion_exitosa', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro encontrado exitosamente."]],
            'menu' => $this->menu,
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
         'url_menu' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255",
         'nom_menu' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|unique:$this->nombre_tabla|max:255",
         'det_menu' => 'regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:1000',
         'cod_menu' => 'regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:1000',
         'imagen_menu' => 'nullable|regex:/(^([a-zA-Z0-9_ ,.-\/\!@#$%*&]+)(\d+)?$)/u|max:1000',
         'font_icon_menu' => 'nullable|regex:/(^([a-zA-Z0-9_ ,.-!@#$%*&]+)(\d+)?$)/u|max:1000',
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
      $this->menu = $request->all();
      #Se crea el nuevo registro
      $this->new_menu = Menu::create([
         'url_menu' => $this->menu['url_menu'],
         'nom_menu' => $this->menu['nom_menu'],
         'det_menu' => $this->menu['det_menu'],
         'cod_menu' => $this->menu['cod_menu'],
         'imagen_menu' => $this->menu['imagen_menu'],
         'font_icon_menu' => $this->menu['font_icon_menu'],
         'id_usuario_registra' => Auth::user()->id_usuario,
         'id_usuario_modifica' => Auth::user()->id_usuario,
      ]);
      unset($this->menu/*$this->validacion,$this->new_menu,*/);
      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'creacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro ($this->nombre_modelo) creado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'menu' => $this->new_menu
      ]);
   }

   public function update(Request $request, $id) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      $this->validacion = Validator::make($request->all(), [
         'id_menu' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|max:255',
         'url_menu' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255",
         'nom_menu' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255",
         'det_menu' => 'regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:1000',
         'cod_menu' => 'regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|required|max:1000',
         'imagen_menu' => 'nullable|regex:/(^([a-zA-Z0-9_ ,.-\/\!@#$%*&]+)(\d+)?$)/u|max:1000',
         'font_icon_menu' => 'nullable|regex:/(^([a-zA-Z0-9_ ,.-!@#$%*&]+)(\d+)?$)/u|max:1000',
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
      $this->menu = Menu::find($request["id_$this->nombre_modelo"]);
      $request['id_usuario_modifica'] = Auth::user()->id_usuario;
      $this->menu->update($request->all());

      #unset($this->new_menu_permiso, $this->permiso);
      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'actualizacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro actualizado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'menu' => $this->menu,
      ]);
   }

   public function destroy($id) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      #$this->validacion = Validator::make($request->all(), [
      #   'id_menu' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|max:255',
      #]);

      #Valida si la informacion que se envia para editar al usuario son iguales los ids
      if ($this->es_vacio($id) == true || preg_match("/^[0-9]*$/",$id) == 0) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'error_datos_invalidos', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Los datos a eliminar son incorrectos."]],
         ]);
      }

      $this->menu = Menu::find($id);

      #Valida si menu existe y busca si tiene menu_permiso
      if ($this->menu) {
         $this->menu->delete();
      }


      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'eliminacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro eliminado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
      ]);
   }

}
