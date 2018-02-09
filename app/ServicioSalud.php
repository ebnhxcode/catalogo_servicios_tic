<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ServicioSalud extends Model
{
   protected $table = 'servicio_salud';
   protected $primaryKey = 'id_servicio_salud';
   protected $fillable = [
      'id_servicio_salud','nombre_servicio_salud','id_region','orden'
   ];
}
