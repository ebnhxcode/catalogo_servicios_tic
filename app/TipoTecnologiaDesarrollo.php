<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoTecnologiaDesarrollo extends Model
{
   protected $table = "tipos_tecnologias_desarrollo";
   protected $primaryKey = "id_tipo_tecnologia_desarrollo";
   protected $fillable = [
      #columns
      'nom_tipo_tecnologia',
      'det_tipo_tecnologia',
      'cod_tipo_tecnologia',

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
