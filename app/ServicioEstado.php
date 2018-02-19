<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ServicioEstado extends Model
{
   protected $table = "servicio_estado";
   protected $primaryKey = "id_servicio_estado";
   protected $fillable = [
      #columns

      #relaciones -> pks
      'id_servicio',
      'id_estado',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function servicio () {
      return $this->belongsTo('App\Servicio', 'id_servicio');
   }

   public function estado () {
      return $this->belongsTo('App\Estado', 'id_estado');
   }

   public function usuario_registra() {
      return $this->belongsTo('App\User', 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo('App\User', 'id_usuario_modifica');
   }
}
