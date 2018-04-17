<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vlan extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "vlans";
   protected $primaryKey = "id_vlan";
   protected $fillable = [
      #columns
      'nom_vlan',
      'det_vlan',
      'cod_vlan',

      #relaciones -> pks
      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function servidores () {
      return $this->hasMany(Servidor::class, 'id_vlan');
   }

   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra')->select(['id_usuario','nom_usuario']);
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica')->select(['id_usuario','nom_usuario']);
   }

}
