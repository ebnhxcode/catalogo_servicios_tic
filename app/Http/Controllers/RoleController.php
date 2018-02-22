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
   private $permiso;
   private $permisos;
   private $nombre_modelo; //Se usa como prefijo en llamados en duro o definiciones similares
   private $nombre_tabla; //Se usa como prefijo en llamados en duro o definiciones similares
   private $validacion; //Uso en valicaciones de request

   public function __construct () {
      $this->nombre_modelo = "role";
      $this->nombre_tabla = "roles";
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


   public function index(Request $request) {
      if ($request->wantsJson()) {
         $this->roles = Role::all();
         $this->permisos = Permiso::all();
         return response()->json([
            'sc' => 200,
            'roles' => $this->roles,
            'permisos' => $this->permisos,
         ]);
      }

      return view('roles.main');
   }


   public function create() {
      //
   }

   public function store(Request $request) {

      $this->validacion = Validator::make($request->all(), [
         'nom_role' => 'string|required|unique:roles|max:255',
         'det_role' => 'required|max:1000',
         'id_permiso' => 'required|integer|max:1',
      ]);

      if ($this->validacion->fails()) {

         if ($this->validacion->fails()) {
            return response()->json($this->validacion->messages(), 200);
         }

         return redirect('post/create')
            ->withErrors($this->validacion)
            ->withInput();
      }


      $this->role = $request->all();
      dd($this->role);

      dd($this->validacion->fails());

      $this->role = $request->all();

      dd($this->role);

      #$this->role = $request->all();

      $this->new_role = Role::create([
         'nom_role' => $this->role['nom_role'],
         'det_role' => $this->role['det_role']
      ]);

      if (!in_array($this->role['id_permiso'], [null, 'null', ''])) {













         $this->permiso = Permiso::find($this->role['id_permiso']);

         if ($this->permiso != null) {
            $this->new_role_permiso =
               RolePermiso::where('id_permiso', $this->permiso->id_permiso)
                  ->where('id_role', $this->new_role->id_role)->first();

            return response()->json([
               'TEST:' => $this->new_role_permiso
            ]);

            $this->new_role_permiso = RolePermiso::create([
               'id_role' => '',
               'id_permiso' => '',
            ]);
         }


      }

      unset($this->role, $this->permiso);

      return response()->json([
         'sc' => 200,
         'role' => $this->new_role
      ]);
   }

   public function show($id) {
      //
   }

   public function edit($id) {
      //
   }

   public function update(Request $request, $id) {

      if ($request->wantsJson() && $request->ajax()) {

         $this->role_update = $request->all();
         $this->role = Role::find($id);


         if ($this->es_vacio($this->role->id_role) == false) {


            if ($this->es_vacio($this->role->id_permiso) == false) {

               $this->new_role_permiso = RolePermiso::create([
                  'id_role' => $this->role->id_role,
                  'id_permiso' => $this->role->id_permiso,
               ]);

            } else {

               $this->role_permiso = RolePermiso::where('id_role', $this->role->id_role)
                  ->where('id_permiso', $this->role->id_permiso)
                  ->first();



               $this->new_role_permiso = $this->role_permiso;
               $this->new_role_permiso->id_permiso = $this->role->id_permiso;
               $this->role_permiso->update($this->new_role_permiso);

            }


            $this->role->update($this->role_update);

         }

         unset($this->role, $this->permiso);

         return response()->json([
            'sc' => 200,
            'role' => $this->role_update
         ]);
      }
   }

   public function destroy($id) {
      //
   }
}
