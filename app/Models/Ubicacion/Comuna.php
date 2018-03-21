<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comuna extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table="comuna";
   protected $primaryKey="id_comuna";
   protected $fillable=[
      'id_comuna',
      'id_region',
      'nombre_comuna',
   ];

   public function region () {
      return $this->belongsTo(Region::class, 'id_region');
   }

}
