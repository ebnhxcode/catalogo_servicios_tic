<?php

namespace App\Http\Middleware\Role;

use Closure;
use Auth;

class CRUDMiddleware {
    private $usuario_logueado;
    private $usuario_role;
    private $role;
    private $role_options;
    public function handle($request, Closure $next) {

        $this->usuario_logueado = Auth::user();
        if ($this->usuario_role = $this->usuario_logueado->usuario_role) {
            if ($this->role = $this->usuario_role->role) {
                #Segun el perfil del usuario toma las opciones definidas en el role
                $this->role_options = json_decode(json_encode(config("roles.roles.{$this->role->nom_role}")));

                switch ($this->role->nom_role) {
                    case 'Administrador':
                    case 'Jefe de Area':
                    case 'Lider Equipo':
                    #case 'App Manager':
                    #case 'Jefe Proyecto':
                    #case 'Desarrollador Proyecto':
                    #case 'Visitante':
                        return $next($request);
                        break;
                }

            }
        }
        return redirect()->to('/');
    }
}

/*
                switch ($this->role->nom_role) {
                    case 'Administrador':
                    case 'Jefe de Area':
                    case 'Lider Equipo':
                    #case 'App Manager':
                    #case 'Jefe Proyecto':
                    #case 'Desarrollador Proyecto':
                    #case 'Visitante':
                        return $next($request);
                        break;
                }
 */