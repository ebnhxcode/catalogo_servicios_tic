<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UsuarioBitacoraServicio extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "usuarios_bitacora_servicios";
   protected $primaryKey = "id_usuario_bitacora_servicio";
   protected $fillable = [
      #columns
      'asunto',
      'det_bitacora',


      #relaciones -> pks
      'id_usuario',
      'id_servicio',
      'id_actividad',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function usuario () {
      return $this->belongsTo(User::class, 'id_usuario');
   }

   public function servicio () {
      return $this->belongsTo(Servicio::class, 'id_servicio');
   }

   public function actividad () {
      return $this->belongsTo(Actividad::class, 'id_actividad');
   }

   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }
}
