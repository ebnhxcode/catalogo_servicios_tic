<script>

   /*
    * Declaracion del objeto
    *
    *
    * */
   const Servidor = {
      /*
       * Decl. atributos descriptivos
       *
       *
       *
       * */
      'pk_tabla': 'id_servidor',
      'nombre_tabla':'servidores', //nombre tabla o de ruta
      'nombre_ruta':'servidores', //nombre tabla o de ruta
      'nombre_model':'servidor',
      'nombre_model_limpio': 'servidor_limpio',
      'nombre_detalle':'Servidores',
      'nombre_controller':'ServidorController',

      /*
      * Decl. atributos del objeto
      *
      *
      *
      * */
      'atributos':{
         'nom_servidor':null,
         'det_servidor':null,
         'ip_servidor':null,
         'ram':null,
         'memoria_dd':null,
         'swap':null,
         'procesador':null,
         'modelo_procesador':null,
         'frec_procesador':null,
         'nucleos':null,
         'usuarios_pactados':null,
         'mac':null,
         'nodo':null,
         'interface':null,
         'lvm_raiz':null,
         'lvm_usr':null,
         'lvm_tmp':null,
         'lvm_var':null,
         'lvm_home':null,
         'agente_instana_instalado':null,
         'id_servicio':null,
         'id_datacentro':null,
         'id_sistema_operativo':null,
         'id_tipo_sistema_operativo':null, // no lleva relacion, solo se usa para filtrar un combobox
         'id_estado':null,
         'id_ambiente':null,
         'id_cluster':null,
         'id_usuario_registra':null,
         'id_usuario_modifica':null,
         'created_at':null,
         'updated_at':null,
         'deleted_at':null,
      },

      /*
       * Decl. objetos los cuales tiene relacion con este objeto
       *
       *
       *
       * */
      'relaciones':[
         {'servicio':'id_servicio'},
         {'datacentro':'id_datacentro'},
         {'sistema_operativo':'id_sistema_operativo'},
         {'aplicaciones':'id_aplicacion'},
         {'servidor_estado':'id_estado'},
         {'ambiente':'id_ambiente'},
         {'cluster':'id_cluster'},
         {'servidor_lvm':'id_servidor_lvm'},
         {'servidor_lvm':'lvm_raiz'},
         {'servidor_lvm':'lvm_usr'},
         {'servidor_lvm':'lvm_tmp'},
         {'servidor_lvm':'lvm_var'},
         {'servidor_lvm':'lvm_home'},
      ],

      /*
       * Decl. atributos que serán visibles en la tabla de entrada
       *
       *
       *
       * */
      'tabla_campos': {
         'nom_servidor':true,
         'det_servidor':true,
         'ip_servidor':true,
         'ram':true,
         'memoria_dd':true,
         'swap':false,
         'procesador':false,
         'modelo_procesador':false,
         'frec_procesador':false,
         'nucleos':false,
         'usuarios_pactados':false,
         'mac':false,
         'nodo':false,
         'interface':false,
          /*
         'lvm_raiz':false,
         'lvm_usr':false,
         'lvm_tmp':false,
         'lvm_var':false,
         'lvm_home':false,
          */
         'agente_instana_instalado':false,
         'id_servicio':false,
         'id_datacentro':false,
         'id_sistema_operativo':false,
         'id_estado':false,
         'id_ambiente':false,
         'id_cluster':false,

         'id_usuario_registra':false,
         'id_usuario_modifica':false,
         'created_at':false,
         'updated_at':false,
         'deleted_at':false,
      },

      /*
       * Decl. de labels para cada atributo
       *
       *
       *
       * */
      'tabla_labels': {
         'id_servidor':'Id servidor',

         'nom_servidor':'Nombre servidor',
         'det_servidor':'Detalle servidor',
         'ip_servidor':'Ip servidor',
         'ram':'Ram',
         'memoria_dd':'Memoria Disco',
         'swap':'Swap',
         'procesador':'Procesador',
         'modelo_procesador':'Modelo Procesador',
         'frec_procesador':'Frec. Procesador',
         'nucleos':'Nucleos',
         'usuarios_pactados':'Usuarios pactados',
         'mac':'Mac',
         'nodo':'Nodo',
         'interface':'Interface',
         'lvm_raiz':'/~Raiz',
         'lvm_usr':'usr',
         'lvm_tmp':'tmp',
         'lvm_var':'var',
         'lvm_home':'home',
         'agente_instana_instalado':'Agente Instana',

         'id_servicio':'Id Servicio',
         'id_datacentro':'Id Datacrentro',
         'id_sistema_operativo':'Id Sistema Operativo',
         'id_estado':'Id Estado',
         'id_ambiente':'Id Ambiente',
         'id_cluster':'Id Cluster',

         'id_usuario_registra':'Usuario registra',
         'id_usuario_modifica':'Usuario modifica',
         'created_at':'Creado en',
         'updated_at':'Actualizado en',
         'deleted_at':'Eliminado en',
      },

   };

   export {
      Servidor
   };
</script>
