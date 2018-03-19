<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServidorEstado extends Model {
   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "servidores_estados";
   protected $primaryKey = "id_servidor_estado";
   protected $fillable = [
      #columns
      #relaciones -> pks
      'id_servidor',
      'id_estado',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function servidor () {
      return $this->belongsTo(Servidor::class, 'id_servidor');
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
