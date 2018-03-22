<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Idioma extends Model {


   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "idiomas";
   protected $primaryKey = "id_idioma";
   protected $fillable = [
      #columns
      'nom_idioma',
      'det_idioma',

      #relaciones -> pks
      'id_usuario_registra',
      'id_usuario_modifica',
   ];


   public function usuario_registra () {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica () {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }

}
