<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AplicacionTecnologia extends Model
{
   protected $table = "aplicaciones_tecnologia";
   protected $primaryKey = "id_aplicacion_tecnologia";
   protected $fillable = [
      #columns

      #relaciones -> pks
      'id_aplicacion',
      'id_tecnologia',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function aplicacion() {
      return $this->belongsTo('App\Aplicacion', 'id_aplicacion');
   }

   public function tecnologia() {
      return $this->belongsTo('App\TecnologiaDesarrollo', 'id_tecnologia');
   }

   public function usuario_registra() {
      return $this->belongsTo('App\User', 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo('App\User', 'id_usuario_modifica');
   }
}
