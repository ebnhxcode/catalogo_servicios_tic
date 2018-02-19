<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ServicioSalud extends Model
{
   protected $table = 'servicio_salud';
   protected $primaryKey = 'id_servicio_salud';
   protected $fillable = [
      #columns
      'nombre_servicio_salud',
      'orden',

      # relaciones -> pks
      'id_servicio_salud',
      'id_region',

   ];


   public function region () {
      return $this->belongsTo('App\Region', 'id_region');
   }


}
