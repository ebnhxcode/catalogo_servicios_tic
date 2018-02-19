<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Permiso extends Model
{
   protected $table = "permisos";
   protected $primaryKey = "id_permiso";
   protected $fillable = [
      #columns
      'nom_permiso',
      'det_permiso',
      'cod_permiso',

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
