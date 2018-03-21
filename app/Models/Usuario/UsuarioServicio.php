<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UsuarioServicio extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "usuarios_servicios";
   protected $primaryKey = "id_usuario_servicio";
   protected $fillable = [
      #columns
      #relaciones -> pks
      'id_usuario',
      'id_servicio',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function usuario () {
      return $this->belongsTo(User::class, 'id_usuario');
   }

   public function servicio () {
      return $this->belongsTo(Servicio::class, 'id_servicio');
   }

   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }
}
