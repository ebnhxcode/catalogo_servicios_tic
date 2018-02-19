<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ServidorAcceso extends Model
{
   protected $table = "servidores_accesos";
   protected $primaryKey = "id_servidor_acceso";
   protected $fillable = [
      #columns
      'username',
      'password',
      'tipo_acceso',
      'puerto_acceso',

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
      return $this->belongsTo('App\Servidor', 'id_servidor');
   }

   public function usuario_registra() {
      return $this->belongsTo('App\User', 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo('App\User', 'id_usuario_modifica');
   }
}
