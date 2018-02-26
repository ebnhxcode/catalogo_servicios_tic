<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServidorAplicacion extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "servidores_aplicacion";
   protected $primaryKey = "id_servidor_aplicacion";
   protected $fillable = [
      #columns
      'username',
      'password',
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
      return $this->belongsTo('App\Servidor', 'id_servidor');
   }

   public function usuario_registra() {
      return $this->belongsTo('App\User', 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo('App\User', 'id_usuario_modifica');
   }
}
