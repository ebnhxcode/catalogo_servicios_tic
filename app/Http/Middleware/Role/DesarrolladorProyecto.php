<?php

namespace App\Http\Middleware\Role;

use Closure;

class DesarrolladorProyecto {

    public function handle($request, Closure $next) {

        return $next($request);
    }
}
