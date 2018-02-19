<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
   protected $table = "tags";
   protected $primaryKey = "id_tag";
   protected $fillable = [
      #columns
      'nom_tag',
      'det_tag',
      'meta_tag',
      #relaciones -> pks


      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function usuario_registra() {
      return $this->belongsTo('App\User', 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo('App\User', 'id_usuario_modifica');
   }
}
