<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AplicacionTag extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "aplicaciones_tags";
   protected $primaryKey = "id_aplicacion_tag";
   protected $fillable = [
      #columns

      #relaciones -> pks
      'id_aplicacion',
      'id_tag',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function aplicacion () {
      return $this->belongsTo(Aplicacion::class, 'id_aplicacion');
   }

   public function tag () {
      return $this->belongsTo(Tag::class, 'id_tag');
   }

   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }
}
