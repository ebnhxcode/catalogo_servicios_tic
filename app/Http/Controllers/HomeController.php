<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class HomeController extends Controller {

    private $usuario_auth;

    private $nombre_modelo;
    private $nombre_tabla;
    private $nombre_ruta;
    private $nombre_detalle;
    private $nombre_controller;
   private $per_page;

    public function __construct() {
        $this->middleware('auth');
        $this->nombre_modelo = "home"; //nombre tabla o de ruta
        $this->nombre_tabla = $this->nombre_ruta = "home";
        $this->nombre_detalle = "Home";
        $this->nombre_controller = "HomeController";
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
            return view("home.main", [
               'nombre_modelo' => $this->nombre_modelo,
               'nombre_tabla' => $this->nombre_tabla,
               'nombre_ruta' => $this->nombre_ruta,
               'nombre_detalle' => $this->nombre_detalle,
               'nombre_controller' => $this->nombre_controller,
            ]);
        }

        $this->usuario_auth = Auth::user();
        return response()->json([
           'status' => 200,
           'usuario_auth' => $this->usuario_auth,
        ]);
    }

}


