<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UsuarioRole extends Model
{
   protected $table = "usuario_role";
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
      return $this->belongsTo('App\Role', 'id_role');
   }

   public function usuario () {
      return $this->belongsTo('App\User', 'id_usuario');
   }

   public function usuario_registra() {
      return $this->belongsTo('App\User', 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo('App\User', 'id_usuario_modifica');
   }
}
