<?php

namespace App\Http\Controllers;

use App\Permiso;
use App\Role;
use App\RolePermiso;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RoleController extends Controller {
   private $roles;
   private $role;
   private $new_role;
   private $role_update;
   private $new_role_permiso;
   private $role_permiso;
   private $permiso;
   private $permisos;
   private $nombre_modelo; //Se usa como prefijo en llamados en duro o definiciones similares
   private $nombre_tabla; //Se usa como prefijo en llamados en duro o definiciones similares o de ruta
   private $nombre_ruta; //Se usa como prefijo en llamados en duro o definiciones similares o de ruta
   private $nombre_detalle; //Se usa como prefijo en nombres o cabeceras
   private $nombre_controller; //
   private $validacion; //Uso en valicaciones de request

   public function __construct () {
      #$this->middleware('auth');
      $this->nombre_modelo = "role"; //nombre tabla o de ruta
      $this->nombre_tabla = $this->nombre_ruta = "roles";
      $this->nombre_detalle = "Roles";
      $this->nombre_controller = "RoleController";
   }

   private function es_vacio ($variable) {
      if (isset($variable) && !in_array($variable, [null, 'null', ''])) {
         return false;
      } else {
         return true;
      }
   }

   public function rolestest (Request $request) {
      /**/
      return 0;
      die();
      return redirect()->to('/login');
      /**/
      #Dummy obj

      $this->role = Role::find(10);
      #$this->role = Role::find(11);
      #$this-:>role = Role::find(12);
      #$this->role = Role::find(13);
      #$this->role = Role::find(14);#Este no tiene nada

      $this->permiso = Permiso::find(14);
      #$this->permiso = Permiso::find(15);
      #$this->permiso = Permiso::find(16);
      #$this->permiso = Permiso::find(17);

      #$this->role->role_permiso->id_permiso = 10;
      #$this->role->role_permiso->save();
      #dd($this->role->role_permiso->id_permiso);






      #dd(Permiso::all());
      #Validar si el role tiene un permiso activo asociado
      #Cuando no hay relacion retorna null
      #Si hay relacion, retorna el objeto
      #$this->role->role_permiso->permiso->id_permiso = 12;
      #$this->role->role_permiso->permiso->save();
      #dd($this->role->role_permiso->permiso);











      dd($this->role_permiso);


      dd(RolePermiso::all());

      die();

      #Para acceder a las propiedades mediante las relaciones de los objetos
      #dd($this->role->role_permiso->permiso);

      #Para buscar un role_permiso a partir de id_role e id_permiso
      $this->role_permiso = RolePermiso::where('id_permiso', $this->permiso->id_permiso)
         ->where('id_role', $this->role->id_role)->get();

      #Para crear un nuevo Role Permiso a partir de 2 objetos
      $this->new_role_permiso = RolePermiso::create([
         'id_role' => $this->role->id_role,
         'id_permiso' => $this->permiso->id_permiso
      ]);


      #Asignacion y posterior validacion de la actualizacion del campo id_permiso cuando la tabla es una tabla de Llaves
      # que guarda keys de ambos modelos, entonces realiza el cambio si los datos son distintos,
      # evitando que se asigne un null por defecto, no se permite que el usuario cambie el permiso a nulo, si o si debe
      # tener datos asociados a un perfil
      # --
      #Si se actualiza el role, el usuario tiene que verificar si habia relacion con permiso en roles_permisos
      # para actualizar la relacion con el dato nuevo en caso que haya sido modificado
      if ( isset($this->role) && $this->role->role_permiso != null) {
         $this->role->role_permiso->id_permiso =
            ($this->role->role_permiso->id_permiso !== $this->permiso->id_permiso) ? $this->permiso->id_permiso : null;

         if (!is_null($this->role->role_permiso->id_permiso)) {
            $this->role->role_permiso->save();
         }

      }








      #dd(RolePermiso::all());










   }

   public function estandares (Request $request) {


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

      $this->roles = Role::with('role_permiso.permiso')->get();
      $this->permisos = Permiso::all();
      return response()->json([
         'status' => 200,
         'roles' => $this->roles,
         'permisos' => $this->permisos,
      ]);
   }

   public function store(Request $request) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      $this->validacion = Validator::make($request->all(), [
         'nom_role' => "regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|unique:$this->nombre_tabla|max:255",
         'det_role' => 'required|max:1000',
         'id_permiso' => 'required|integer',
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
      $this->role = $request->all();
      #Se crea el nuevo registro
      $this->new_role = Role::create([
         'nom_role' => $this->role['nom_role'],
         'det_role' => $this->role['det_role']
      ]);
      #Al ser un nuevo registro se crea tambien el objeto relacional, role_permiso
      $this->new_role_permiso = RolePermiso::create([
         'id_role' => $this->new_role->id_role,
         'id_permiso' => $this->role['id_permiso'],
      ]);
      unset($this->role, $this->permiso, /*$this->validacion,$this->new_role,*/ $this->new_role_permiso);
      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'creacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro ($this->nombre_modelo) creado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'role' => $this->new_role
      ]);
   }

   public function update(Request $request, $id) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      $this->validacion = Validator::make($request->all(), [
         'id_role' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|max:255',
         'nom_role' => 'regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|required|max:255',
         'det_role' => 'required|max:1000',
         'id_permiso' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|integer',
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
      $this->role = Role::find($request["id_$this->nombre_modelo"]);
      $this->role->update($request->all());
      if ( isset($this->role) && $this->role->role_permiso != null) {
         $this->permiso = $this->role->role_permiso->permiso;
         if ( ! in_array($this->permiso->id_permiso, [$request["id_permiso"],null,'null',''] )) {
            $this->role->role_permiso->id_permiso = $request["id_permiso"];
            $this->role->role_permiso->save();
         }
      } else {
         $this->new_role_permiso = RolePermiso::create([
            'id_role' => $this->role['id_role'],
            'id_permiso' => $this->role['id_permiso'],
         ]);
      }
      #unset($this->new_role_permiso, $this->permiso);
      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'actualizacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro actualizado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'role' => $this->role,
      ]);
   }

   public function destroy($id) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      #$this->validacion = Validator::make($request->all(), [
      #   'id_role' => 'regex:/(^([0-9]+)(\d+)?$)/u|required|max:255',
      #]);

      #Valida si la informacion que se envia para editar al usuario son iguales los ids
      if ($this->es_vacio($id) == true || preg_match("/^[0-9]*$/",$id) == 0) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'error_datos_invalidos', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Los datos a eliminar son incorrectos."]],
         ]);
      }

      $this->role = Role::find($id);

      #Valida si role existe y busca si tiene role_permiso
      if ($this->role) {
         $this->role_permiso = $this->role->role_permiso;
         #Valida si role_permiso existe y lo elimina
         if ($this->role_permiso) { $this->role_permiso->delete(); }
         #Elimina el role
         $this->role->delete();
      }


      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'eliminacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro eliminado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
      ]);
   }
}
