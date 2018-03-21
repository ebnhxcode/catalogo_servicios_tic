<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CatalogoServicioTag extends Model{

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "catalogos_servicios_tags";
   protected $primaryKey = "id_catalogo_servicio_tag";
   protected $fillable = [
      #columns

      #relaciones -> pks
      'id_catalogo_servicio',
      'id_tag',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function catalogo_servicio() {
      return $this->belongsTo(CatalogoServicio::class, 'id_catalogo_servicio');
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
