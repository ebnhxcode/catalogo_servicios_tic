<?php

namespace App\Http\Controllers;

use App\Permiso;
use Illuminate\Http\Request;

class PermisoController extends Controller
{
    private $permisos;
    private $permiso;
    private $new_permiso;

    public function index(Request $request) {
        if ($request->wantsJson()) {
            $this->permisos = Permiso::all();
            return response()->json([
               'sc'=>200,
               'permisos'=>$this->permisos
            ]);
        }

        return view('permisos.main');
    }


    public function create() {
        //
    }

    public function store(Request $request) {
        if ($request->wantsJson()) {
            $this->permiso = $request->all();

            $this->new_permiso = Permiso::create([
               'nom_permiso' => $this->permiso['nom_permiso'],
               'det_permiso' => $this->permiso['det_permiso'],
               'cod_permiso' => $this->permiso['cod_permiso']
            ]);

            unset($this->permiso);

            return response()->json([
               'sc' => 200,
               'permiso' => $this->new_permiso
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
