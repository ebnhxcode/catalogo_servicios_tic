<?php

namespace App\Http\Controllers;

use App\Role;
use Illuminate\Http\Request;

class RoleController extends Controller {
    private $roles;

    public function index(Request $request) {
        if ($request->wantsJson()) {
            $this->roles = Role::all();
            return response()->json([
                'sc'=>'200',
                'roles'=>$this->roles
            ]);
        }

        return view('roles.main');
    }


    public function create() {
        //
    }

    public function store(Request $request) {

    }

    public function show($id) {
        //
    }

    public function edit($id) {
        //
    }

    public function update(Request $request, $id) {
        //
    }

    public function destroy($id) {
        //
    }
}
