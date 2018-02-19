<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
   use Notifiable;

   protected $primaryKey = "id_usuario";
   protected $fillable = [
      'username',
      'email',
      'password',
      'nom_usuario',
      'nom_completo',
      'ape_paterno',
      'ape_materno',
      'name',

   ];

   protected $hidden = [
      'password',
      'remember_token',
   ];

   public function usuario_bitacora_servicios () {
      return $this->hasMany('App\UsuarioBitacoraServicio', 'id_usuario');
   }

   public function usuario_estado () {
      return $this->hasOne('App\UsuarioEstado', 'id_usuario');
   }

   public function usuario_roles () {
      return $this->hasMany('App\UsuarioRole', 'id_usuario');
   }

   public function usuario_cargos () {
      return $this->hasMany('App\UsuarioCargos', 'id_usuario');
   }

   public function usuarios_servicios () {
      return $this->hasMany('App\UsuarioServicio', 'id_usuario');
   }

   public function servicios () {
      return $this->hasMany('App\Servicio', 'id_usuario');
   }






}
