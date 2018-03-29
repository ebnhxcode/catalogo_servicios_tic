<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Menu extends Model {
   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "menus";
   protected $primaryKey = "id_menu";
   protected $fillable = [
      #columns
      'url_menu',
      'nom_menu',
      'det_menu',
      'cod_menu',
      'imagen_menu',
      'font_icon_menu',

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
