<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AplicacionAcceso extends Model
{
   protected $table = "aplicaciones_accesos";
   protected $primaryKey = "id_aplicacion_acceso";
   protected $fillable = [
      #columns
      'username',
      'passwprd',
      'email',

      #relaciones -> pks
      'id_aplicacion',
      'id_servidor',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function aplicacion() {
      return $this->belongsTo('App\Aplicacion', 'id_aplicacion');
   }

   public function servidor() {
      return $this->belongsTo('App\ServidorAplicacion', 'id_servidor');
   }

   public function usuario_registra() {
      return $this->belongsTo('App\User', 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo('App\User', 'id_usuario_modifica');
   }

}
