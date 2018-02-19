<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SistemaOperativo extends Model
{
   protected $table = "sistemas_operativos";
   protected $primaryKey = "id_sistema_operativo";
   protected $fillable = [
      #columns
      'arquitectura',
      'nom_so',
      'det_so',
      'vers_so',
      'licencia_so',
      'det_licencia',

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
