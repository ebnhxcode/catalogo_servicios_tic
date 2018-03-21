<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Permiso extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "permisos";
   protected $primaryKey = "id_permiso";
   protected $fillable = [
      #columns
      'nom_permiso',
      'det_permiso',
      'cod_permiso',

      #relaciones -> pks
      'id_usuario_registra',
      'id_usuario_modifica',
   ];


   #TODAS LAS RELACIONES BELONGS TO


   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }

   #TODAS LAS RELACIONES HAS MANY

   #TODAS LAS RELACIONES HAS ONE

   public function permiso_role () {
      return $this->hasOne(RolePermiso::class ,'id_permiso')->get();
   }

   public function permisos_roles () {
      return $this->hasMany(RolePermiso::class ,'id_permiso')->get();
   }


}
