<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FuenteAplicacion extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "fuentes_aplicaciones";
   protected $primaryKey = "id_fuente_aplicacion";
   protected $fillable = [
      #columns
      'url_descarga',
      'nom_fuente',
      'det_fuente',

      #relaciones -> pks
      'id_aplicacion',
      'id_servicio',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function aplicacion() {
      return $this->belongsTo(Aplicacion::class, 'id_aplicacion');
   }

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
