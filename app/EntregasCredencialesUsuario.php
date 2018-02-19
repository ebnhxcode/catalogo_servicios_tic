<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EntregasCredencialesUsuario extends Model
{
   protected $table = "entregas_credenciales_usuarios";
   protected $primaryKey = "id_entrega_credenciale_usuario";
   protected $fillable = [
      #columns
      'username',
      'password',
      'tiempo_expiracion',
      'estado',

      #relaciones -> pks
      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function usuario_registra() {
      return $this->belongsTo('App\User', 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo('App\User', 'id_usuario_modifica');
   }
}
