<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Mantenedor extends Model {
   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "mantenedores";
   protected $primaryKey = "id_mantenedor";
   protected $fillable = [
      #columns
      'url_mantenedor',
      'nom_mantenedor',
      'det_mantenedor',
      'cod_mantenedor',
      'imagen_mantenedor',
      'font_icon_mantenedor',

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
