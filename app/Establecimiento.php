<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Establecimiento extends Model
{
   protected $table = 'establecimientos';
   protected $primaryKey = 'id_establecimiento';
   protected $fillable = [
      # columns
      'nombre_establecimiento',
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






}
