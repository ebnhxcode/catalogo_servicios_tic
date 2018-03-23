<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Cluster extends Model {
   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "clusters";
   protected $primaryKey = "id_cluster";
   protected $fillable = [
      #columns
      'nom_cluster',
      'det_cluster',

      #relaciones -> pks
      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }
}
