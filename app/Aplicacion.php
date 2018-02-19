<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Aplicacion extends Model
{
   protected $table = "aplicaciones";
   protected $primaryKey = "id_aplicacion";
   protected $fillable = [
      #columns
      'nom_aplicacion',
      'det_aplicacion',
      'alias',
      'url_web',
      'ip',
      'subdominio',
      'ssl_tls',

      #relaciones -> pks
      'id_dominio',
      'id_servicio',
      'id_tipo_aplicacion',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function dominio() {
      return $this->belongsTo('App\Dominio', 'id_dominio');
   }

   public function servicio() {
      return $this->belongsTo('App\Servicio', 'id_servicio');
   }

   public function tipo_aplicacion() {
      return $this->belongsTo('App\Servicio', 'id_tipo_aplicacion');
   }

   public function usuario_registra() {
      return $this->belongsTo('App\User', 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo('App\User', 'id_usuario_modifica');
   }



}
