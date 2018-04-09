<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TipoRespaldoDisco extends Model {
   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "tipos_respaldos_discos";
   protected $primaryKey = "id_tipo_respaldo_disco";
   protected $fillable = [
      #columns
      'nom_tipo_respaldo_disco',
      'det_tipo_respaldo_disco',
      'cod_tipo_respaldo_disco',

      #relaciones -> pks

      'id_usuario_registra',
      'id_usuario_modifica',
   ];


   public function servidores () {
      return $this->hasMany(Servidor::class, 'id_tipo_respaldo_disco');
   }

   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }
}
