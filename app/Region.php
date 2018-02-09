<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
   protected $table="region";
   protected $primaryKey="id_region";
   protected $fillable=[
      'id_region','nombre_region','alias','orden'
   ];
}
