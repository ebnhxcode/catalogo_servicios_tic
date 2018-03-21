<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Establecimiento extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = 'establecimientos';
   protected $primaryKey = 'id_establecimiento';
   protected $fillable = [
      # columns
      'nombre_establecimiento',
      'tipo_establecimiento',
      'vigencia_desde',
      'fecha_cierre',

      # relaciones -> pks
      'id_establecimiento',
      'id_establecimiento_antiguo',
      'id_servicio_salud',
      'id_region',
      'id_comuna',
   ];

   public function establecimiento_antiguo() {
      return $this->belongsTo(Establecimiento::class, 'id_establecimiento_antiguo');
   }

   public function servicio_salud() {
      return $this->belongsTo(ServicioSalud::class, 'id_servicio_salud');
   }

   public function region() {
      return $this->belongsTo(Region::class, 'id_region');
   }

   public function comuna() {
      return $this->belongsTo(Comuna::class, 'id_comuna');
   }

}
