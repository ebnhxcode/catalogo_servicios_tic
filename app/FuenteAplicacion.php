<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FuenteAplicacion extends Model
{
   protected $table = "fuentes_aplicaciones";
   protected $primaryKey = "id_fuente_aplicacion";
   protected $fillable = [
      #columns
      'url_descarga',
      'nom_fuente',
      'det_fuente',
      '',

      #relaciones -> pks
      'id_aplicacion',
      'id_servicio',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function aplicacion() {
      return $this->belongsTo('App\Aplicacion', 'id_aplicacion');
   }

   public function servicio() {
      return $this->belongsTo('App\Servicio', 'id_servicio');
   }

   public function usuario_registra() {
      return $this->belongsTo('App\User', 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo('App\User', 'id_usuario_modifica');
   }
}
