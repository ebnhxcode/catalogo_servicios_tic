<?php

namespace App\Http\Middleware\Role;

use Closure;

class AppManager {

    public function handle($request, Closure $next) {

        return $next($request);
    }

}
