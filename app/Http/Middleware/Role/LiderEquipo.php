<?php

namespace App\Http\Middleware\Role;

use Closure;

class LiderEquipo{

    public function handle($request, Closure $next) {

        return $next($request);
    }
}
