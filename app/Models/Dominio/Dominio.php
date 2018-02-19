<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dominio extends Model
{
   protected $table = "dominios";
   protected $primaryKey = "id_dominio";
   protected $fillable = [
      #columns
      'nom_dominio',
      'det_dominio',
      'ip_publica',
      'ip_balanceador',
      'dns_asoc_dominio',

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
