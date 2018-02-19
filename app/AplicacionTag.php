<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AplicacionTag extends Model
{
   protected $table = "aplicaciones_tags";
   protected $primaryKey = "id_aplicacion_tag";
   protected $fillable = [
      #columns

      #relaciones -> pks
      'id_aplicacion',
      'id_tag',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function aplicacion () {
      return $this->belongsTo('App\Aplicacion', 'id_aplicacion');
   }

   public function tag () {
      return $this->belongsTo('App\Tag', 'id_tag');
   }

   public function usuario_registra() {
      return $this->belongsTo('App\User', 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo('App\User', 'id_usuario_modifica');
   }
}
