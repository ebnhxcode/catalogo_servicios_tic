<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LogNavegacion extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

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
      return $this->belongsTo(User::class, 'id_usuario');
   }
}
