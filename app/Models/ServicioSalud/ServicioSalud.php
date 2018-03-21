<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServicioSalud extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

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
      return $this->belongsTo(Region::class, 'id_region');
   }


}
