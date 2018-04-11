<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class MantenedorMiddleware
{
   public function handle($request, Closure $next)
   {

      $this->usuario_auth = Auth::user();

      if ($this->usuario_role = $this->usuario_auth->usuario_role) {
         $this->role = $this->usuario_role->role;
         switch ($this->role->nom_role) {
            case 'Administrador':
            case 'Jefe de Area':
            case 'Lider Equipo':
            case 'App Manager':
               return $next($request);
               break;

         }
      }
      return redirect()->to('/');

   }
}
