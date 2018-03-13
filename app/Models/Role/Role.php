<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table="roles";
   protected $primaryKey="id_role";
   protected $fillable=[
      'nom_role',
      'det_role',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   #TODAS LAS RELACIONES BELONGS TO




   #TODAS LAS RELACIONES HAS MANY




   #TODAS LAS RELACIONES HAS ONE

   public function roles_permisos () {
      return $this->hasMany(RolePermiso::class ,'id_role');
   }

   public function role_permiso () {
      return $this->hasOne(RolePermiso::class ,'id_role');
   }

   public function roles_usuarios () {
      return $this->hasMany(UsuarioRole::class ,'id_role');
   }

   public function role_usuario () {
      return $this->hasOne(UsuarioRole::class ,'id_role');
   }

}
