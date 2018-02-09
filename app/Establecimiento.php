<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Establecimiento extends Model
{
   protected $table = 'establecimiento';
   protected $primaryKey = 'id_establecimiento';
   protected $fillable = [
      'id_establecimiento','id_establecimiento_antiguo','id_servicio','id_region','id_comuna',
      'nombre_establecimiento','tipo_establecimiento','vigencia_desde','fecha_cierre'
   ];
}
