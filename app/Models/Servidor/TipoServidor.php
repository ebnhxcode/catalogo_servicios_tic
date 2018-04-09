<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TipoServidor extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "tipos_servidores";
   protected $primaryKey = "id_tipo_servidor";
   protected $fillable = [
      #columns
      'nom_tipo_servidor',
      'det_tipo_servidor',
      'cod_tipo_servidor',

      #relaciones -> pks

      'id_usuario_registra',
      'id_usuario_modifica',
   ];


   public function servidores () {
      return $this->hasMany(Servidor::class, 'id_tipo_servidor');
   }

   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }
}
