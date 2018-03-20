<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServidorAcceso extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "servidores_accesos";
   protected $primaryKey = "id_servidor_acceso";
   protected $fillable = [
      #columns
      'usuario',
      'clave',
      'tipo_acceso',
      'puerto',

      #relaciones -> pks
      //'id_aplicacion',
      'id_servidor',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   /*
   public function aplicacion () {
      return $this->belongsTo(Aplicacion::class, 'id_aplicacion');
   }
   */

   public function servidor () {
      return $this->belongsTo(Servidor::class, 'id_servidor');
   }

   public function usuario_registra () {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica () {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }
}
