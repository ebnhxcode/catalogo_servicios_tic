<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UsuarioServicio extends Model
{
   protected $table = "usuario_servicio";
   protected $primaryKey = "id_usuario_servicio";
   protected $fillable = [
      #columns
      #relaciones -> pks
      'id_usuario',
      'id_servicio',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function usuario () {
      return $this->belongsTo('App\User', 'id_usuario');
   }

   public function servicio () {
      return $this->belongsTo('App\Servicio', 'id_servicio');
   }

   public function usuario_registra() {
      return $this->belongsTo('App\User', 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo('App\User', 'id_usuario_modifica');
   }
}
