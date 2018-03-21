<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ActividadTag extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

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
      return $this->belongsTo(Actividad::class, 'id_actividad');
   }

   public function tag () {
      return $this->belongsTo(Tag::class, 'id_tag');
   }

   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }
}
