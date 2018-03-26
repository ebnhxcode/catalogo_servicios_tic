<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SistemaOperativo extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "sistemas_operativos";
   protected $primaryKey = "id_sistema_operativo";
   protected $fillable = [
      #columns
      'arquitectura',
      'nom_sistema_operativo',
      'det_sistema_operativo',
      'vers_sistema_operativo',
      'lic_sistema_operativo',
      'det_licencia_sistema_operativo',

      #relaciones -> pks
      'id_idioma',
      'id_tipo_sistema_operativo',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function idioma () {
      return $this->belongsTo(Idioma::class, 'id_idioma');
   }

   public function tipo_sistema_operativo () {
      return $this->belongsTo(TipoSistemaOperativo::class, 'id_tipo_sistema_operativo');
   }

   public function usuario_registra () {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica () {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }

}
