<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Estado extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "estados";
   protected $primaryKey = "id_estado";
   protected $fillable = [
      #columns
      'nom_estado',
      'det_estado',
      'cod_estado',

      #relaciones -> pks

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }
}
