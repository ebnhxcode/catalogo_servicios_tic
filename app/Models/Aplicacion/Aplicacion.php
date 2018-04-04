<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Aplicacion extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

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
      'id_servidor',
      'id_servicio',
      'id_tipo_aplicacion',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function dominio() {
      return $this->belongsTo(Dominio::class, 'id_dominio');
   }

   public function servicio() {
      return $this->belongsTo(Servicio::class, 'id_servicio');
   }

   public function servidor () {
      return $this->belongsTo(Servidor::class, 'id_servidor');
   }

   public function accesos () {
      return $this->hasMany(AplicacionAcceso::class, 'id_aplicacion');
   }

   public function tipo_aplicacion() {
      return $this->belongsTo(TipoAplicacion::class, 'id_tipo_aplicacion');
   }

   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }



}
