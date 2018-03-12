<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Datacentro extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "datacentros";
   protected $primaryKey = "id_datacentro";
   protected $fillable = [
      #columns
      'nom_datacentro',
      'det_datacentro',
      'cod_datacentro',

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
