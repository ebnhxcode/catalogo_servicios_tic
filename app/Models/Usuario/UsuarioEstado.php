<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UsuarioEstado extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "usuarios_estados";
   protected $primaryKey = "id_usuario_estado";
   protected $fillable = [
      #columns
      #relaciones -> pks
      'id_usuario',
      'id_estado',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function usuario () {
      return $this->belongsTo(User::class, 'id_usuario');
   }

   public function estado () {
      return $this->belongsTo(Estado::class, 'id_estado');
   }

   public function usuario_registra () {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica () {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }

}
