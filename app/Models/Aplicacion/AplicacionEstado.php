<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AplicacionEstado extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "aplicacion_estado";
   protected $primaryKey = "id_aplicacion_estado";
   protected $fillable = [
      #columns

      #relaciones -> pks
      'id_aplicacion',
      'id_estado',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function aplicacion () {
      return $this->belongsTo(Aplicacion::class, 'id_aplicacion');
   }

   public function estado () {
      return $this->belongsTo(Estado::class, 'id_estado');
   }

   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }
}
