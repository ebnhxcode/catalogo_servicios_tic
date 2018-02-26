<?php

namespace App\Http\Controllers;

use App\Permiso;
use Illuminate\Http\Request;

class PermisoController extends Controller
{
    private $permisos;
    private $permiso;
    private $new_permiso;
    private $nombre_modelo; //Se usa como prefijo en llamados en duro o definiciones similares
    private $nombre_tabla; //Se usa como prefijo en llamados en duro o definiciones similares
    private $nombre_detalle; //Se usa como prefijo en nombres o cabeceras
    private $nombre_controller; //
    private $validacion; //Uso en valicaciones de request

    public function __construct () {
        #$this->middleware('auth');
        $this->nombre_modelo = "permiso";
        $this->nombre_tabla = "permisos";
        $this->nombre_detalle = "Permisos";
        $this->nombre_controller = "PermisoController";
    }

    public function index(Request $request) {
        if ($request->wantsJson()) {
            $this->permisos = Permiso::all();
            return response()->json([
               'sc'=>200,
               'permisos'=>$this->permisos
            ]);
        }

        return view('permisos.main', [
            'nombre_modelo' => $this->nombre_modelo,
            'nombre_tabla' => $this->nombre_tabla,
            'nombre_detalle' => $this->nombre_detalle,
            'nombre_controller' => $this->nombre_controller,
         ]);
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
