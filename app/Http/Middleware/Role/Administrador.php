<?php

namespace App\Http\Middleware\Role;

use Closure;

class Administrador {

    public function handle($request, Closure $next) {

        return $next($request);

    }
}
