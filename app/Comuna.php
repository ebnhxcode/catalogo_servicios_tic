<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comuna extends Model
{
   protected $table="comuna";
   protected $primaryKey="id_comuna";
   protected $fillable=[
      'id_comuna',
      'id_region',
      'nombre_comuna',
   ];

   public function region () {
      return $this->belongsTo('App\Region', 'id_region');
   }

}
