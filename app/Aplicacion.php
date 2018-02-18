<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Aplicacion extends Model
{
   protected $table = "aplicaciones";
   protected $primaryKey = "id";
   protected $fillable = [
      #columns
      'nom_aplicacion',
      'det_aplicacion',
      'alias',
      'url_web',
      'ip',
      'subdominio',
      'ssl_tls',
      '',
      '',

      #relaciones -> pks
      'id_dominio',
      'id_servicio',
      'id_tipo_actividad',
      '',
   ];

}
