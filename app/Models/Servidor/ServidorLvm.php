<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServidorLvm extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "servidores_lvms";
   protected $primaryKey = "id_servidor_lvm";
   protected $fillable = [
      #columns
      'lvm_raiz',
      'lvm_usr',
      'lvm_tmp',
      'lvm_var',
      'lvm_home',

      #relaciones -> pks
      'id_servidor',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function usuario_registra () {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica () {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }

   public function servidor () {
      return $this->belongsTo(Servidor::class, 'id_servidor');
   }
}
