<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Actividad extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "actividades";
   protected $primaryKey = "id_actividad";
   protected $fillable = [
      #columns
      'nom_actividad',
      'det_actividad',

      #relaciones -> pks

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function servicios () {
      return $this->hasMany(Servicio::class, 'id_actividad');
   }

   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }
}
