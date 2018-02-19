<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Datacentro extends Model
{
   protected $table = "datacentros";
   protected $primaryKey = "id_datacentro";
   protected $fillable = [
      #columns
      'nom_datacentro',

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
