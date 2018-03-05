<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Servidor extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "servidores";
   protected $primaryKey = "id_servidor";
   protected $fillable = [
      #columns
      'nom_servidor',
      'det_servidor',
      'ip_servidor',
      'url_servidor',


      #relaciones -> pks
      'id_datacentro',
      'id_sistema_operativo',
      'id_dominio',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function aplicacion() {
      return $this->belongsTo('App\Aplicacion', 'id_aplicacion');
   }

   public function usuario_registra() {
      return $this->belongsTo('App\User', 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo('App\User', 'id_usuario_modifica');
   }
}
