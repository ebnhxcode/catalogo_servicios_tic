<?php

namespace App\Http\Middleware\Role;

use Closure;

class JefeArea {

    public function handle($request, Closure $next) {

        return $next($request);
    }
}