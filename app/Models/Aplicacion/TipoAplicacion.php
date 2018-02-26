<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TipoAplicacion extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "tipos_aplicaciones";
   protected $primaryKey = "id_tipo_aplicacion";
   protected $fillable = [
      #columns
      'nom_tipo_aplicacion',
      'det_tipo_aplicacion',
      'cod_tipo_aplicacion',

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
