<?php

namespace App\Http\Controllers;

use App\Estado;
use App\Servicio;
#use App\Servidor;
use App\Actividad;
use App\User;
use App\UsuarioBitacoraServicio;
use Illuminate\Http\Request;
use Auth;
#use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ServicioController extends Controller {

    private $usuario_auth;

    private $nombre_modelo;
    private $nombre_tabla;
    private $nombre_ruta;
    private $nombre_detalle;
    private $nombre_controller;

    private $actividades;
    private $usuarios_bitacora_servicios;
    #private $servidores;
    private $estados;
    private $usuarios;
    private $servicios;
    private $servicio;
    private $new_servicio;
    private $validacion;
    private $per_page;

    public function __construct () {
        $this->middleware('auth');
       $this->middleware('mesaservicios');#Quiere decir que todos lo pueden ver
        $this->nombre_modelo = "servicio"; //nombre tabla o de ruta
        $this->nombre_tabla = "servicios";
        $this->nombre_ruta = "servicios";
        $this->nombre_detalle = "Servicios";
        $this->nombre_controller = "ServicioController";
    }

    private function es_vacio ($variable) {
        if (isset($variable) && !in_array($variable, [null, 'null', ''])) {
            return false;
        } else {
            return true;
        }
    }

   private function validar_paginacion ($request) {
      if (!$request->per_page) {
         $this->per_page = 20;
      } else {
         $this->per_page = $request->per_page;
      }
   }

    public function index_componente () {
        return view("layouts.main_para_componentes", [
           'nombre_modelo' => $this->nombre_modelo,
           'nombre_tabla' => $this->nombre_tabla,
           'nombre_ruta' => $this->nombre_ruta,
           'nombre_detalle' => $this->nombre_detalle,
           'nombre_controller' => $this->nombre_controller,
        ]);
    }

   /*
    * Index ajax aplica para traer la data de las interfaces
    * */
    public function index_ajax (Request $request) {
       if ($request->wantsJson() && $request->ajax() && $request->isXmlHttpRequest()) {

          $this->validar_paginacion($request);
          $this->servicios = Servicio::with([
             'actividad',
             'usuario',
             'servidores.aplicaciones',
             'aplicaciones.servidor',
             'usuarios_bitacora_servicios.usuario',
             'servicios_usuarios.usuario'
          ])->paginate((int)$this->per_page);
          $this->estados = Estado::all();
          $this->usuarios = User::with(['usuario_role.role'])->get();
          $this->actividades = Actividad::all();
          $this->usuario_auth = Auth::user();
          $this->usuarios_bitacora_servicios = UsuarioBitacoraServicio::where('id_usuario', '=', $this->usuario_auth->id_usuario)->get();
          return response()->json([
             'status' => 200,
             'actividades' => $this->actividades,
             'servicios' => $this->servicios,
             'estados' => $this->estados,
             'usuarios' => $this->usuarios,
             'usuarios_bitacora_servicios' => $this->usuarios_bitacora_servicios,
             'usuario_auth' => $this->usuario_auth,
          ]);
       }
    }

    public function index() {
      return view("layouts.main", [
         'nombre_modelo' => $this->nombre_modelo,
         'nombre_tabla' => $this->nombre_tabla,
         'nombre_ruta' => $this->nombre_ruta,
         'nombre_detalle' => $this->nombre_detalle,
         'nombre_controller' => $this->nombre_controller,
      ]);
    }

    public function show (Request $request, $id) {

        $result = preg_match('/(^([0-9]+)(\d+)?$)/u', $id);
        if ($this->es_vacio($id) == true || $result == 0) {
            return response()->json([
               'status' => 200, //Para los popups con alertas de sweet alert
               'tipo' => 'error_datos_invalidos', //Para las notificaciones
               'mensajes' => ["new_$this->nombre_modelo" => [0=>"Lo buscado, no se encontró."]],
            ]);
        }

        $this->servicio = Servicio::where("id_$this->nombre_modelo",'=',$id)
           ->with([
              'actividad',
              'usuario',
              'servidores.sistema_operativo',
              'servidores.datacentro',
              'servidores.aplicaciones.accesos',
              'servidores.aplicaciones.dominio',
              'servidores.servidor_estado.estado',
              'servidores.accesos',
              'aplicaciones.servidor',
              'usuarios_bitacora_servicios.usuario',
              'servicios_usuarios.usuario',
           ])
           ->first();


        #Valida si servicio existe
        if ($this->servicio) {
            return response()->json([
               'status' => 200, //Para los popups con alertas de sweet alert
               'tipo' => 'eliminacion_exitosa', //Para las notificaciones
               'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro encontrado exitosamente."]],
               'servicio' => $this->servicio,
                //Para mostrar los mensajes que van desde el backend
            ]);
        }else{
            return response()->json([
               'status' => 200, //Para los popups con alertas de sweet alert
               'tipo' => 'error_datos_invalidos', //Para las notificaciones
               'mensajes' => ["new_$this->nombre_modelo" => [0=>"Lo buscado, no se encontró."]],
            ]);
        }

    }

    public function store(Request $request) {
        #Se realiza validacion de los parametros de entrada que vienen desde el formulario
        $this->validacion = Validator::make($request->all(), [
           'nom_servicio' => "required|regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|max:255",
           'det_completo' => "nullable|regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|max:255",
           'id_actividad' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
        ]);
        #Se valida la respuesta con la salida de la validacion
        if ($this->validacion->fails() == true) {
            return response()->json([
               'status' => 200, //Para los popups con alertas de sweet alert
               'tipo' => 'errores_campos_requeridos', //Para las notificaciones
               'mensajes' => $this->validacion->messages(), //Para mostrar los mensajes que van desde el backend
            ]);
        }
        #Como pasó todas las validaciones, se asigna al objeto
        $this->servicio = $request->all();
        #Se crea el nuevo registro
        $this->new_servicio = Servicio::create([
           'nom_servicio' => $this->servicio['nom_servicio'],
           'det_servicio' => $this->servicio['det_servicio'],
           'id_actividad' => $this->servicio['id_actividad'],
           //'id_usuario' => Auth::user()->id_usuario,
           'id_usuario_registra' => Auth::user()->id_usuario,
           'id_usuario_modifica' => Auth::user()->id_usuario,
        ]);

        unset($this->servicio, $this->validacion/*$this->validacion,$this->new_servicio, $this->new_servicio_permiso*/);

        return response()->json([
           'status' => 200, //Para los popups con alertas de sweet alert
           'tipo' => 'creacion_exitosa', //Para las notificaciones
           'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro ($this->nombre_modelo) creado exitosamente."]],
            //Para mostrar los mensajes que van desde el backend
           'servicio' => $this->new_servicio
        ]);
    }

    public function update(Request $request, $id) {
        #Se realiza validacion de los parametros de entrada que vienen desde el formulario
        $this->validacion = Validator::make($request->all(), [
           "id_{$this->nombre_modelo}" => 'required|regex:/(^([0-9]+)(\d+)?$)/u|max:255',
           'nom_servicio' => "required|regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|max:255",
           'det_servicio' => "nullable|regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|max:255",
           'id_actividad' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
        ]);
        #Valida si la informacion que se envia para editar al servicio son iguales los ids
        if ($id != $request["id_$this->nombre_modelo"]) {
            return response()->json([
               'status' => 200, //Para los popups con alertas de sweet alert
               'tipo' => 'error_datos_invalidos', //Para las notificaciones
               'mensajes' => ["new_$this->nombre_modelo" => [0=>"Los datos a guardar son incorrectos."]],
            ]);
        }
        #Se valida la respuesta con la salida de la validacion
        if ($this->validacion->fails() == true) {
            return response()->json([
               'status' => 200, //Para los popups con alertas de sweet alert
               'tipo' => 'errores_campos_requeridos', //Para las notificaciones
               'mensajes' => $this->validacion->messages(), //Para mostrar los mensajes que van desde el backend
            ]);
        }
        $this->servicio = Servicio::find($request["id_$this->nombre_modelo"]);
        //$request['id_usuario'] = Auth::user()->id_usuario;
        $request['id_usuario_modifica'] = Auth::user()->id_usuario;
        $this->servicio->update($request->all());

        #unset($this->new_servicio_permiso, $this->permiso);
        return response()->json([
           'status' => 200, //Para los popups con alertas de sweet alert
           'tipo' => 'actualizacion_exitosa', //Para las notificaciones
           'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro actualizado exitosamente."]],
            //Para mostrar los mensajes que van desde el backend
           'servicio' => $this->servicio,
        ]);
    }

    public function destroy($id) {
        #Valida si la informacion que se envia para editar al servicio son iguales los ids
        if ($this->es_vacio($id) == true || preg_match("/^[0-9]*$/",$id) == 0) {
            return response()->json([
               'status' => 200, //Para los popups con alertas de sweet alert
               'tipo' => 'error_datos_invalidos', //Para las notificaciones
               'mensajes' => ["new_$this->nombre_modelo" => [0=>"Los datos a eliminar son incorrectos."]],
            ]);
        }

        $this->servicio = Servicio::find($id);

        #Valida si servicio existe y busca si tiene servicio_permiso
        if ($this->servicio) {
            $this->servicio->delete();
        }

        return response()->json([
           'status' => 200, //Para los popups con alertas de sweet alert
           'tipo' => 'eliminacion_exitosa', //Para las notificaciones
           'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro eliminado exitosamente."]],
            //Para mostrar los mensajes que van desde el backend
        ]);
    }
}
