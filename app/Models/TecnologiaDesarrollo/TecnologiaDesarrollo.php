<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TecnologiaDesarrollo extends Model {

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "tecnologias_desarrollos";
   protected $primaryKey = "id_tecnologia_desarrollo";
   protected $fillable = [
      #columns
      'nom_tecnologia',
      'det_tecnologia',
      'vers_tecnologia',

      #relaciones -> pks
      'id_tipo_tecnologia',

      'id_usuario_registra',
      'id_usuario_modifica',
   ];

   public function tipo_tecnologia () {
      return $this->belongsTo(TipoTecnologiaDesarrollo::class, 'id_tipo_tecnologia');
   }

   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }
}
