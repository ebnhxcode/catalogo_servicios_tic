<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pais extends Model {

    use SoftDeletes;
    protected $dates = ['deleted_at'];

    protected $table="pais";
    protected $primaryKey="id_pais";
    protected $fillable=[
       'id_pais',
       'nombre_pais',
    ];

}
