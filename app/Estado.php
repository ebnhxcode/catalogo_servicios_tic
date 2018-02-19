<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Estado extends Model
{
   protected $table = "estados";
   protected $primaryKey = "id_estado";
   protected $fillable = [
      #columns
      'nom_estado',
      'cod_estado',

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
