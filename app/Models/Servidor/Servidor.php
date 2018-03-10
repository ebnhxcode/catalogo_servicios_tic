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

      'ram',
      'memoria_dd',
      'swap',
      'procesador',
      'frec_procesador',
      'nucleos',
      'usuarios_pactados',

      #relaciones -> pks
      'id_datacentro',
      'id_sistema_operativo',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];


   public function usuario_registra() {
      return $this->belongsTo('App\User', 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo('App\User', 'id_usuario_modifica');
   }



   public function datacentro () {
      return $this->belongsTo(Datacentro::class, 'id_datacentro');
   }

   public function sistema_operativo () {
      return $this->belongsTo(SistemaOperativo::class, 'id_sistema_operativo');
   }

   public function aplicaciones () {
      return $this->hasMany(Aplicacion::class, 'id_aplicacion');
   }

}
