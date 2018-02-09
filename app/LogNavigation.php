<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LogNavigation extends Model
{
    protected $table = 'log_navigation';
    protected $primaryKey = 'id_log_navigation';
    protected $fillable = [
       'id_log_navigation',
       'user_id',
       'cod_establecimiento',
       'user_name',
       'user_email',
       'page_path',
       'ip',
    ];
}
