<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RolePermiso extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "roles_permisos";
   protected $primaryKey = "id_role_permiso";
   protected $fillable = [
      #columns

      #relaciones -> pks
      'id_role',
      'id_permiso',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];


   #TODAS LAS RELACIONES BELONGS TO

   public function role() {
      return $this->belongsTo(Role::class, 'id_role');
   }

   public function permiso() {
      return $this->belongsTo(Permiso::class, 'id_permiso');
   }

   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }


   #TODAS LAS RELACIONES HAS MANY
   #TODAS LAS RELACIONES HAS ONE



}
