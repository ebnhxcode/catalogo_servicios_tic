<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Region extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table="region";
   protected $primaryKey="id_region";
   protected $fillable=[
      'id_region',
      'nombre_region',
      'alias',
      'orden'
   ];
}
