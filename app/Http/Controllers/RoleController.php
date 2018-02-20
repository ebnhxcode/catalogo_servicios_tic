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
    private $permiso;
    private $permisos;

    public function index(Request $request) {
        if ($request->wantsJson()) {
            $this->roles = Role::all();
            $this->permisos = Permiso::all();
            return response()->json([
                'sc'=>200,
                'roles'=>$this->roles,
                'permisos'=>$this->permisos,
            ]);
        }

        return view('roles.main');
    }


    public function create() {
        //
    }

    public function store(Request $request) {
        if ($request->wantsJson()) {
            $this->role = $request->all();

            $this->new_role = Role::create([
               'nom_role' => $this->role['nom_role'],
               'det_role' => $this->role['det_role']
            ]);

            if (!in_array($this->role['id_permiso'], [null,'null',''])) {
                $this->permiso = Permiso::find($this->role['id_permiso']);

                if ($this->permiso != null) {
                    $this->new_role_permiso = RolePermiso::create([
                        
                    ]);

                    $this->new_role_permiso = $this->new_role->roles_permisos()->associate($this->permiso);

                    return response()->json([
                       'TEST:' => $this->new_role_permiso
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
        //
    }

    public function destroy($id) {
        //
    }
}
