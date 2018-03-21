<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CatalogoServicio extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "catalogos_servicios";
   protected $primaryKey = "id_catalogo_servicio";
   protected $fillable = [
      #columns
      'asunto',
      'det_catalogo',
      'avatar',

      #relaciones -> pks
      'id_servicio',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function servicio() {
      return $this->belongsTo(Servicio::class, 'id_servicio');
   }

   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }
}
