<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServicioEstado extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "servicio_estado";
   protected $primaryKey = "id_servicio_estado";
   protected $fillable = [
      #columns

      #relaciones -> pks
      'id_servicio',
      'id_estado',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function servicio () {
      return $this->belongsTo(Servicio::class, 'id_servicio');
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
