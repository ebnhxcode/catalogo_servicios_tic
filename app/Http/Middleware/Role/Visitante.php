<?php

namespace App\Http\Middleware\Role;

use Closure;

class Visitante {

    public function handle($request, Closure $next) {

        return $next($request);
    }
}
