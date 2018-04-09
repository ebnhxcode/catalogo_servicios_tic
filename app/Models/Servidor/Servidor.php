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
      'agente_instana_instalado',

      #relaciones -> pks
      'id_servicio',
      'id_datacentro',
      'id_sistema_operativo',
      'id_estado',
      'id_ambiente',
      'id_cluster',
      'id_vlan',
      'id_tipo_servidor',
      'id_tipo_respaldo_disco',

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

   public function cluster () {
      return $this->belongsTo(Cluster::class, 'id_cluster');
   }

   public function vlan () {
      return $this->belongsTo(Vlan::class, 'id_vlan');
   }

   public function tipo_servidor () {
      return $this->belongsTo(TipoServidor::class, 'id_tipo_servidor');
   }

   public function tipo_respaldo_disco () {
      return $this->belongsTo(TipoRespaldoDisco::class, 'id_tipo_respaldo_disco');
   }

   public function servicio () {
      return $this->belongsTo(Servicio::class, 'id_servicio');
   }

   public function accesos () {
      return $this->hasMany(ServidorAcceso::class, 'id_servidor');
   }

   public function servidor_lvm () {
      return $this->hasOne(ServidorLvm::class, 'id_servidor');
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
