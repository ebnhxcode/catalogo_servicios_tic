<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServicioTag extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "servicios_tags";
   protected $primaryKey = "id_servicio_tag";
   protected $fillable = [
      #columns

      #relaciones -> pks
      'id_servicio',
      'id_tag',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function servicio() {
      return $this->belongsTo(Servicio::class, 'id_servicio');
   }

   public function tag() {
      return $this->belongsTo(Tag::class, 'id_tag');
   }

   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }
}
