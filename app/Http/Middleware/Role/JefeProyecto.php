<?php

namespace App\Http\Middleware\Role;

use Closure;

class JefeProyecto {

    public function handle($request, Closure $next) {
        
        return $next($request);
    }
}
