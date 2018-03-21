<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cargo extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "cargos";
   protected $primaryKey = "id_cargo";
   protected $fillable = [
      #columns
      'nom_cargo',
      'det_cargo',
      'cod_cargo',

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
