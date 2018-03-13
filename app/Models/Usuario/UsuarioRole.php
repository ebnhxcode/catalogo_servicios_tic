<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UsuarioRole extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "usuarios_roles";
   protected $primaryKey = "id_usuario_role";
   protected $fillable = [
      #columns

      #relaciones -> pks
      'id_role',
      'id_usuario',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function role () {
      return $this->belongsTo(Role::class, 'id_role');
   }

   public function usuario () {
      return $this->belongsTo(User::class, 'id_usuario');
   }

   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }
}
