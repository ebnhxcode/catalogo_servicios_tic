<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AplicacionTecnologia extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "aplicaciones_tecnologia";
   protected $primaryKey = "id_aplicacion_tecnologia";
   protected $fillable = [
      #columns

      #relaciones -> pks
      'id_aplicacion',
      'id_tecnologia',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function aplicacion() {
      return $this->belongsTo(Aplicacion::class, 'id_aplicacion');
   }

   public function tecnologia() {
      return $this->belongsTo(TecnologiaDesarrollo::class, 'id_tecnologia');
   }

   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }
}
