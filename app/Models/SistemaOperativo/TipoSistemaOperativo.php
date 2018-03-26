<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TipoSistemaOperativo extends Model {
   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "tipos_sistemas_operativos";
   protected $primaryKey = "id_tipo_sistema_operativo";
   protected $fillable = [
      #columns
      'nom_tipo_sistema_operativo',
      'det_tipo_sistema_operativo',
      'cod_tipo_sistema_operativo',
      #relaciones -> pks

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function sistemas_operativos () {
      return $this->hasMany(SistemaOperativo::class, 'id_tipo_sistema_operativo');
   }

   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }
}
