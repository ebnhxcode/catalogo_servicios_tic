<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comuna extends Model
{
   protected $table="comuna";
   protected $primaryKey="id_comuna";
   protected $fillable=[
      'id_comuna','id_region','nombre_comuna',
   ];
}
