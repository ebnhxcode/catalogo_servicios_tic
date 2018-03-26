<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TipoCluster extends Model {
   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "tipos_clusters";
   protected $primaryKey = "id_tipo_cluster";
   protected $fillable = [
      #columns
      'nom_tipo_cluster',
      'det_tipo_cluster',
      'cod_tipo_cluster',

      #relaciones -> pks
      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function clusters () {
      return $this->hasMany(Cluster::class, 'id_tipo_cluster');
   }

   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }
}
