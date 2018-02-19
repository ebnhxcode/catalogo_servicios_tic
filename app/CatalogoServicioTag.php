<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CatalogoServicioTag extends Model
{
   protected $table = "catalogos_servicios_tags";
   protected $primaryKey = "id_catalogo_servicio_tag";
   protected $fillable = [
      #columns
      'asunto',
      'det_catalogo',
      'avatar',

      #relaciones -> pks
      'id_servicio',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

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
