<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UsuarioCargo extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "usuarios_cargos";
   protected $primaryKey = "id_usuario_cargo";
   protected $fillable = [
      #columns
      #relaciones -> pks
      'id_usuario',
      'id_cargo',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function usuario () {
      return $this->belongsTo('App\User', 'id_usuario');
   }

   public function cargo () {
      return $this->belongsTo('App\Cargo', 'id_cargo');
   }

   public function usuario_registra() {
      return $this->belongsTo('App\User', 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo('App\User', 'id_usuario_modifica');
   }

}
