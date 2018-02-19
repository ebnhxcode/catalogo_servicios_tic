<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Actividad extends Model
{
   protected $table = "actividad";
   protected $primaryKey = "id_actividad";
   protected $fillable = [
      #columns
      'nom_actividad',
      'det_actividad',

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
