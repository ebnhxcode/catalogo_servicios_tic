<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TipoTecnologiaDesarrollo extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "tipos_tecnologias_desarrollo";
   protected $primaryKey = "id_tipo_tecnologia_desarrollo";
   protected $fillable = [
      #columns
      'nom_tipo_tecnologia',
      'det_tipo_tecnologia',
      'cod_tipo_tecnologia',

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
