<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

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
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }
}
