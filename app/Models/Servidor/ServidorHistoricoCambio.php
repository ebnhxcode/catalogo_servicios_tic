<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServidorHistoricoCambio extends Model {
   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "servidores_historico_cambios";
   protected $primaryKey = "id_servidor_historico";
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
      'id_servidor',
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

   public function servidor () {
      return $this->belongsTo(Servidor::class, 'id_servidor');
   }
}
