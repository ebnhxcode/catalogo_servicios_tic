<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LogNavigation extends Model
{
    protected $table = 'log_navigation';
    protected $primaryKey = 'id_log_navigation';
    protected $fillable = [
       'id_log_navigation',
        #columns
       'cod_establecimiento',
       'user_name',
       'user_email',
       'page_path',
       'ip',


        #relations -> pks
       'id_usuario',
       'id_establecimiento',
    ];

    public function usuario()
    {
        return $this->belongsTo('App\User', 'id_usuario');
    }

    public function estalecimiento() {
        return $this->belongsTo('App\Establecimiento', 'id_establecimiento');
    }

}
