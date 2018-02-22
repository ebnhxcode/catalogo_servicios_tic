<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
   protected $table="roles";
   protected $primaryKey="id_role";
   protected $fillable=[
      'nom_role',
      'det_role',
   ];

   #TODAS LAS RELACIONES BELONGS TO




   #TODAS LAS RELACIONES HAS MANY




   #TODAS LAS RELACIONES HAS ONE

   public function roles_permisos () {
      return $this->hasMany('App\RolePermiso' ,'id_role');
   }

   public function role_permiso () {
      return $this->hasOne('App\RolePermiso' ,'id_role');
   }


}
