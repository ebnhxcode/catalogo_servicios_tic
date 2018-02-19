<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cargo extends Model
{
   protected $table = "cargos";
   protected $primaryKey = "id_cargo";
   protected $fillable = [
      #columns
      'nom_cargo',
      'det_cargo',

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
