<?php

namespace App\Http\Controllers;

use App\Permiso;
use App\Role;
use App\RolePermiso;
use Illuminate\Http\Request;

class RoleController extends Controller {
   private $roles;
   private $role;
   private $new_role;
   private $role_update;
   private $new_role_permiso;
   private $permiso;
   private $permisos;

   private function es_vacio ($variable) {
      if (isset($variable) && !in_array($variable, [null, 'null', ''])) {
         return false;
      } else {
         return true;
      }
   }

   public function rolestest (Request $request) {

      #Dummy obj

      $this->role = Role::find(10);
      #$this->role = Role::find(11);
      #$this->role = Role::find(12);
      #$this->role = Role::find(13);
      $this->permiso = Permiso::find(14);
      #$this->permiso = Permiso::find(15);
      #$this->permiso = Permiso::find(16);
      #$this->permiso = Permiso::find(17);






      #dd($this->permiso->roles_permisos());




      $this->new_role_permiso = RolePermiso::create([
         'id_role' => $this->role->id_role,
         'id_permiso' => $this->permiso->id_permiso
      ]);

      dd(RolePermiso::all());








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
      if ($request->wantsJson() && $request->ajax()) {
         $this->role = $request->all();

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
