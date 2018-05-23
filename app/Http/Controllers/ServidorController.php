<?php

namespace App\Http\Controllers;

use App\Ambiente;
use App\Cluster;
use App\Servicio;
use App\Servidor;
use App\ServidorEstado;
use App\Datacentro;
use App\ServidorHistoricoCambio;
use App\ServidorLvm;
use App\SistemaOperativo;
use App\Vlan;
use App\TipoServidor;
use App\TipoSistemaOperativo;
use App\TipoRespaldoDisco;
use App\Estado;
use Illuminate\Http\Request;
use Auth;

use Illuminate\Support\Facades\Validator;

class ServidorController extends Controller {
   private $usuario_auth;

   private $nombre_modelo;
   private $nombre_tabla;
   private $nombre_ruta;
   private $nombre_detalle;
   private $nombre_controller;

   private $servicios;
   private $servidores;
   private $datacentros;
   private $sistemas_operativos;
   private $tipos_sistemas_operativos;
   private $ambientes;
   private $clusters;
   private $vlans;
   private $tipos_servidores;
   private $tipos_respaldos_discos;
   private $estados;
   private $estado;
   private $servidor;
   #private $servidor_sistema_operativo;
   private $new_servidor;
   private $new_servidor_estado;
   private $new_servidor_historico;
   private $new_servidor_lvm;
   private $servidor_lvm;
   private $validacion;
   private $per_page;

   public function __construct () {
      $this->middleware('auth');
      $this->middleware('mantenedor'/*, ['except'=>['index','show','index_componente']]*/);#resrtinge a solo usuarios con permiso bajo -> D
      $this->nombre_modelo = "servidor"; //nombre tabla o de ruta
      $this->nombre_tabla = $this->nombre_ruta = "servidores";
      $this->nombre_detalle = "Servidores";
      $this->nombre_controller = "ServidorController";
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

   /*
    * Index componente aplica para las pantallas que estan hechas con iframes
    * que son interfaces mas livianas como accesos directos
    * */
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

         $this->servidores = Servidor::with([
            'datacentro',
            'sistema_operativo',
            'aplicaciones',
            'servidor_estado.estado',
            'ambiente',
            'servidor_historico_cambios',
            'cluster',
            'servidor_lvm',
            'servicio',
            'vlan',
            'tipo_servidor',
            'tipo_respaldo_disco'
         ])->paginate((int)$this->per_page);

         $this->servicios = Servicio::all();
         $this->datacentros = Datacentro::all();
         $this->sistemas_operativos = SistemaOperativo::with('tipo_sistema_operativo')->get();
         $this->tipos_sistemas_operativos = TipoSistemaOperativo::all();
         $this->estados = Estado::all();
         $this->ambientes = Ambiente::all();
         $this->clusters = Cluster::all();
         $this->vlans = Vlan::all();
         $this->tipos_servidores = TipoServidor::all();
         $this->tipos_respaldos_discos = TipoRespaldoDisco::all();
         $this->usuario_auth = Auth::user();
         return response()->json([
            'status' => 200,
            'servidores' => $this->servidores,
            'servicios' => $this->servicios,
            'datacentros' => $this->datacentros,
            'sistemas_operativos' => $this->sistemas_operativos,
            'tipos_sistemas_operativos' => $this->tipos_sistemas_operativos,
            'tipos_respaldos_discos' => $this->tipos_respaldos_discos,
            'ambientes' => $this->ambientes,
            'clusters' => $this->clusters,
            'vlans' => $this->vlans,
            'tipos_servidores' => $this->tipos_servidores,
            'estados' => $this->estados,
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

      $this->servidor = Servidor::where("id_$this->nombre_modelo",'=',$id)->with([
         'datacentro','sistema_operativo','aplicaciones','servidor_estado.estado','ambiente','servidor_historico_cambios','cluster','servidor_lvm','servicio',
         'vlan','tipo_servidor','tipo_respaldo_disco'
      ])->first();

      #Valida si servidor existe y busca si tiene servidor_permiso
      if ($this->servidor) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'busqueda_exitosa', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro encontrado exitosamente."]],
            'servidor' => $this->servidor,
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
         'nom_servidor' => "required|regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|max:255",
         'det_servidor' => "nullable|regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|max:255",
         'ip_servidor' => "nullable|ip|max:255",

         'ram' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'memoria_dd' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'swap' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'procesador' => "nullable|regex:/(^([a-zA-Z]+)(\d+)?$)/u|max:255",
         'modelo_procesador' => "nullable|regex:/(^([a-zA-Z0-9_ :]+)(\d+)?$)/u|max:255",
         'frec_procesador' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'nucleos' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'usuarios_pactados' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'mac' => "nullable|regex:/(^([a-zA-Z0-9_ :]+)(\d+)?$)/u|max:255",
         'nodo' => "nullable|regex:/(^([a-zA-Z0-9_ :]+)(\d+)?$)/u|max:255",
         'interface' => "nullable|regex:/(^([a-zA-Z0-9_ :]+)(\d+)?$)/u|max:255",
         #'agente_instana_instalado' => "boolean|nullable|max:255",
         #'agente_instana_instalado' => "nullable|max:255",

         'lvm_raiz' => "nullable|regex:/(^([0-9_ ]+)(\d+)?$)/u|max:255",
         'lvm_usr' => "nullable|regex:/(^([0-9_ ]+)(\d+)?$)/u|max:255",
         'lvm_tmp' => "nullable|regex:/(^([0-9_ ]+)(\d+)?$)/u|max:255",
         'lvm_var' => "nullable|regex:/(^([0-9_ ]+)(\d+)?$)/u|max:255",
         'lvm_home' => "nullable|regex:/(^([0-9_ ]+)(\d+)?$)/u|max:255",

         'id_servicio' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'id_datacentro' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'id_sistema_operativo' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'id_estado' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'id_ambiente' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'id_cluster' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'id_vlan' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'id_tipo_servidor' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'id_tipo_respaldo_disco' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
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
      $this->servidor = $request->all();
      #Se crea el nuevo registro
      $this->new_servidor = Servidor::create([
         'nom_servidor' => $this->servidor['nom_servidor'],
         'det_servidor' => $this->servidor['det_servidor'],
         'ip_servidor' => $this->servidor['ip_servidor'],

         'ram' => $this->servidor['ram'],
         'memoria_dd' => $this->servidor['memoria_dd'],
         'swap' => $this->servidor['swap'],
         'procesador' => $this->servidor['procesador'],
         'modelo_procesador' => $this->servidor['modelo_procesador'],
         'frec_procesador' => $this->servidor['frec_procesador'],
         'nucleos' => $this->servidor['nucleos'],
         'usuarios_pactados' => $this->servidor['usuarios_pactados'],
         'mac' => $this->servidor['mac'],
         'nodo' => $this->servidor['nodo'],
         'interface' => $this->servidor['interface'],
         'agente_instana_instalado' => $this->servidor['agente_instana_instalado'],

         'id_datacentro' => $this->servidor['id_datacentro'],
         'id_sistema_operativo' => $this->servidor['id_sistema_operativo'],
         'id_ambiente' => $this->servidor['id_ambiente'],
         'id_cluster' => $this->servidor['id_cluster'],
         'id_vlan' => $this->servidor['id_cluster'],
         'id_tipo_servidor' => $this->servidor['id_cluster'],
         'id_tipo_respaldo_disco' => $this->servidor['id_cluster'],

         'id_usuario_registra' => Auth::user()->id_usuario,
         'id_usuario_modifica' => Auth::user()->id_usuario,
      ]);


      #Guardar relacion del estado, en caso que exista valor
      $this->new_servidor_estado = ServidorEstado::create([
         'id_servidor' => $this->new_servidor->id_servidor,
         'id_estado' => $this->servidor['id_estado'],
         'id_usuario_registra' => Auth::user()->id_usuario,
         'id_usuario_modifica' => Auth::user()->id_usuario,
      ]);

      unset($request['id_estado']);

      $request['id_servidor'] = $this->new_servidor->id_servidor;
      $this->new_servidor_historico = ServidorHistoricoCambio::create($request->all());


      if ($this->new_servidor->sistema_operativo->tipo_sistema_operativo->cod_tipo_sistema_operativo == "linux") {
         $this->new_servidor_lvm = ServidorLvm::create([
            'id_servidor'=>$this->new_servidor->id_servidor,
            'lvm_raiz'=>$request['lvm_raiz'],
            'lvm_usr'=>$request['lvm_usr'],
            'lvm_tmp'=>$request['lvm_tmp'],
            'lvm_var'=>$request['lvm_var'],
            'lvm_home'=>$request['lvm_home'],
            'id_usuario_registra' => Auth::user()->id_usuario,
            'id_usuario_modifica' => Auth::user()->id_usuario,
         ]);
      }


      /*
      #Esta es la forma antigua
      $this->servidor_sistema_operativo = SistemaOperativo::find($request['id_sistema_operativo'])->with('tipo_sistema_operativo')->first();
      if ($this->servidor_sistema_operativo && $this->servidor_sistema_operativo->tipo_sistema_operativo) {
         if ($this->servidor_sistema_operativo->tipo_sistema_operativo->cod_tipo_sistema_operativo=="linux") {
            $this->new_servidor_lvm = ServidorLvm::create([
               'id_servidor'=>'',
            ]);
         }
      }
      */


      unset($this->servidor, $this->new_servidor_estado, $this->validacion);

      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'creacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro ($this->nombre_modelo) creado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'servidor' => $this->new_servidor
      ]);
   }

   public function update(Request $request, $id) {
      #Se realiza validacion de los parametros de entrada que vienen desde el formulario
      $this->validacion = Validator::make($request->all(), [
         'id_servidor' => 'required|regex:/(^([0-9]+)(\d+)?$)/u|max:255',
         'nom_servidor' => "required|regex:/(^([a-zA-Z0-9_ ]+)(\d+)?$)/u|max:255",
         'det_servidor' => "nullable|regex:/(^([a-zA-Z0-9_ ,.!@#$%*&]+)(\d+)?$)/u|max:255",
         'ip_servidor' => "nullable|ip|max:255",

         'ram' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'memoria_dd' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'swap' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'procesador' => "nullable|regex:/(^([a-zA-Z]+)(\d+)?$)/u|max:255",
         'modelo_procesador' => "nullable|regex:/(^([a-zA-Z0-9_ :]+)(\d+)?$)/u|max:255",
         'frec_procesador' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'nucleos' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'usuarios_pactados' => "nullable|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'mac' => "nullable|regex:/(^([a-zA-Z0-9_ :]+)(\d+)?$)/u|max:255",
         'nodo' => "nullable|regex:/(^([a-zA-Z0-9_ :]+)(\d+)?$)/u|max:255",
         'interface' => "nullable|regex:/(^([a-zA-Z0-9_ :]+)(\d+)?$)/u|max:255",
         #'agente_instana_instalado' => "boolean|nullable|max:255",
         #'agente_instana_instalado' => "nullable|max:255",

         'lvm_raiz' => "nullable|regex:/(^([0-9_ ]+)(\d+)?$)/u|max:255",
         'lvm_usr' => "nullable|regex:/(^([0-9_ ]+)(\d+)?$)/u|max:255",
         'lvm_tmp' => "nullable|regex:/(^([0-9_ ]+)(\d+)?$)/u|max:255",
         'lvm_var' => "nullable|regex:/(^([0-9_ ]+)(\d+)?$)/u|max:255",
         'lvm_home' => "nullable|regex:/(^([0-9_ ]+)(\d+)?$)/u|max:255",

         'id_servicio' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'id_datacentro' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'id_sistema_operativo' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'id_estado' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'id_ambiente' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'id_cluster' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'id_vlan' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'id_tipo_servidor' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
         'id_tipo_respaldo_disco' => "required|regex:/(^([0-9]+)(\d+)?$)/u|max:255",
      ]);
      #Valida si la informacion que se envia para editar al servidor son iguales los ids
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
      $this->servidor = Servidor::find($request["id_$this->nombre_modelo"]);
      $request['id_usuario_modifica'] = Auth::user()->id_usuario;

      if (isset($this->servidor)) {

         #Actualizar o asoc. nuevo role usuario
         if ($this->servidor->servidor_estado != null) {
            $this->estado = $this->servidor->servidor_estado->estado;
            if (!in_array($this->estado->id_estado, [$request["id_estado"], null, 'null', ''])) {
               $this->servidor->servidor_estado->id_estado = $request["id_estado"];
               $this->servidor->servidor_estado->id_usuario_modifica = Auth::user()->id_usuario;
               $this->servidor->servidor_estado->save();
            }
         } else {
            #Guardar relacion del estado, en caso que exista valor
            $this->new_servidor_estado = ServidorEstado::create([
               'id_servidor' => $request['id_servidor'],
               'id_estado' => $request['id_estado'],
               'id_usuario_registra' => Auth::user()->id_usuario,
               'id_usuario_modifica' => Auth::user()->id_usuario,
            ]);
         }
      }
      unset($request['id_estado']);
      $this->servidor->update($request->all());
      $this->new_servidor_historico = ServidorHistoricoCambio::create($request->all());

      if ($this->servidor->sistema_operativo->tipo_sistema_operativo->cod_tipo_sistema_operativo == "linux") {

         if ($this->servidor->servidor_lvm) {
            $this->servidor_lvm = $this->servidor->servidor_lvm;
            $this->servidor_lvm->lvm_raiz=$request['lvm_raiz'];
            $this->servidor_lvm->lvm_usr=$request['lvm_usr'];
            $this->servidor_lvm->lvm_tmp=$request['lvm_tmp'];
            $this->servidor_lvm->lvm_var=$request['lvm_var'];
            $this->servidor_lvm->lvm_home=$request['lvm_home'];
            $this->servidor_lvm->id_usuario_modifica = Auth::user()->id_usuario;
            $this->servidor_lvm->save();
         } else {
            $this->servidor_lvm = ServidorLvm::create([
               'id_servidor' => $this->servidor->id_servidor,
               'lvm_raiz' => $request['lvm_raiz'],
               'lvm_raiz' => $request['lvm_raiz'],
               'lvm_usr' => $request['lvm_usr'],
               'lvm_tmp' => $request['lvm_tmp'],
               'lvm_var' => $request['lvm_var'],
               'lvm_home' => $request['lvm_home'],
               'id_usuario_registra' => $request['id_usuario_registra'],
               'id_usuario_modifica' => $request['id_usuario_modifica'],
            ]);
         }



      }

      #unset($this->new_servidor_permiso, $this->permiso);
      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'actualizacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro actualizado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
         'servidor' => $this->servidor,
      ]);
   }

   public function destroy($id) {
      #Valida si la informacion que se envia para editar al servidor son iguales los ids
      if ($this->es_vacio($id) == true || preg_match("/^[0-9]*$/",$id) == 0) {
         return response()->json([
            'status' => 200, //Para los popups con alertas de sweet alert
            'tipo' => 'error_datos_invalidos', //Para las notificaciones
            'mensajes' => ["new_$this->nombre_modelo" => [0=>"Los datos a eliminar son incorrectos."]],
         ]);
      }

      $this->servidor = Servidor::find($id);

      #Valida si servidor existe y busca si tiene servidor_permiso
      if ($this->servidor) {
         $this->servidor->delete();
      }

      return response()->json([
         'status' => 200, //Para los popups con alertas de sweet alert
         'tipo' => 'eliminacion_exitosa', //Para las notificaciones
         'mensajes' => ["new_$this->nombre_modelo" => [0=>"Registro eliminado exitosamente."]],
         //Para mostrar los mensajes que van desde el backend
      ]);
   }
}
