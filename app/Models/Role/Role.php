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

   public function roles_permisos () {
      return $this->hasOne('RolePermiso' ,'id_role');
   }



}
