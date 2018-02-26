<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Servicio extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "servicios";
   protected $primaryKey = "id_servicio";
   protected $fillable = [
      #columns
      'nom_servicio',
      'det_servicio',

      #relaciones -> pks
      'id_actividad',
      'id_usuario',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function actividad() {
      return $this->belongsTo('App\Actividad', 'id_actividad');
   }

   public function usuario() {
      return $this->belongsTo('App\User', 'id_usuario');
   }

   public function usuario_registra() {
      return $this->belongsTo('App\User', 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo('App\User', 'id_usuario_modifica');
   }
}
