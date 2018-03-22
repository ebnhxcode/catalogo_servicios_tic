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
      'modelo_procesador',
      'frec_procesador',
      'nucleos',
      'usuarios_pactados',

      'mac',
      'nodo',
      'interface',

      #relaciones -> pks
      'id_datacentro',
      'id_sistema_operativo',
      'id_estado',
      'id_ambiente',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];


   public function usuario_registra () {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica () {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }

   public function datacentro () {
      return $this->belongsTo(Datacentro::class, 'id_datacentro');
   }

   public function sistema_operativo () {
      return $this->belongsTo(SistemaOperativo::class, 'id_sistema_operativo');
   }

   public function ambiente () {
      return $this->belongsTo(Ambiente::class, 'id_ambiente');
   }

   public function servidor_estado () {
      return $this->hasOne(ServidorEstado::class, 'id_servidor');
   }

   public function aplicaciones () {
      return $this->hasMany(Aplicacion::class, 'id_servidor');
   }

   public function servidor_historico_cambios () {
      return $this->hasMany(ServidorHistoricoCambio::class, 'id_servidor');
   }

}
