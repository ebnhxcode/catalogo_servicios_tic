<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LogNavegacion extends Model
{
   protected $table = 'log_navegacion';
   protected $primaryKey = 'id_log_navegacion';
   protected $fillable = [
      #'id_log_navigation',
      #columns
      'cod_establecimiento',
      'user_name',
      'user_email',
      'page_path',
      'ip',
      'latitude',
      'longitude',


      #relations -> pks
      'id_usuario',
   ];

   public function usuario()
   {
      return $this->belongsTo('App\User', 'id_usuario');
   }
}
