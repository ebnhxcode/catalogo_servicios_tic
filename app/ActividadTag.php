<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ActividadTag extends Model
{
   protected $table = "actividades_tags";
   protected $primaryKey = "id_actividad_tag";
   protected $fillable = [
      #columns

      #relaciones -> pks
      'id_actividad',
      'id_tag',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function actividad () {
      return $this->belongsTo('App\Actividad', 'id_actividad');
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
