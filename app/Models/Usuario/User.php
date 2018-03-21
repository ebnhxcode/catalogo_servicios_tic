<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
   use Notifiable;

   use SoftDeletes;
   protected $dates = ['deleted_at'];

   protected $table = "usuarios";
   protected $primaryKey = "id_usuario";
   protected $fillable = [
      'username',
      'email',
      'password',
      'nom_usuario',
      'nom_completo',
      'ape_paterno',
      'ape_materno',

   ];

   protected $hidden = [
      'password',
      'remember_token',
   ];

   public function usuario_bitacora_servicios () {
      return $this->hasMany(UsuarioBitacoraServicio::class, 'id_usuario');
   }

   public function usuario_estado () {
      return $this->hasOne(UsuarioEstado::class, 'id_usuario');
   }

   public function usuario_role () {
      return $this->hasOne(UsuarioRole::class, 'id_usuario');
   }

   public function usuario_cargo () {
      return $this->hasOne(UsuarioCargo::class, 'id_usuario');
   }

   public function usuarios_servicios () {
      return $this->hasMany(UsuarioServicio::class, 'id_usuario');
   }

   public function servicios () {
      return $this->hasMany(Servicio::class, 'id_usuario');
   }

   public function usuario_registra() {
      return $this->belongsTo(User::class, 'id_usuario_registra');
   }

   public function usuario_modifica() {
      return $this->belongsTo(User::class, 'id_usuario_modifica');
   }




}
