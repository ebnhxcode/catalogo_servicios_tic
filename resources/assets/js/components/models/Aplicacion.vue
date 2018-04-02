<script>

   /*
    * Declaracion del objeto
    *
    *
    * */
   const Aplicacion = {
      /*
       * Decl. atributos descriptivos
       *
       *
       *
       * */
      'pk_tabla': 'id_aplicacion',
      'nombre_tabla':'aplicaciones', //nombre tabla o de ruta
      'nombre_ruta':'aplicaciones', //nombre tabla o de ruta
      'nombre_model':'aplicacion',
      'nombre_model_limpio': 'aplicacion_limpio',
      'nombre_detalle':'Aplicaciones',
      'nombre_controller':'AplicacionController',

      /*
       * Decl. atributos del objeto
       *
       *
       *
       * */
      'atributos':{
         'nom_aplicacion':null,
         'det_aplicacion':null,
         'alias':null,
         'url_web':null,
         'ip':null,
         'subdominio':null,
         'ssl_tls':false,
         'id_dominio':null,
         'id_tipo_aplicacion':null,
         'id_servidor':null,
         'id_servicio':null,
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
         {'dominio':'id_dominio'},
         {'tipo_aplicacion':'id_tipo_aplicacion'},
         {'servicio':'id_servicio'},
         {'servidor':'id_servidor'},
      ],

      /*
       * Decl. atributos que serán visibles en la tabla de entrada
       *
       *
       *
       * */
      'tabla_campos': {
         'id_aplicacion':false,
         'nom_aplicacion':true,
         'det_aplicacion':false,
         'alias':true,
         'url_web':true,
         'ip':true,
         'subdominio':false,
         'ssl_tls':true,
         'id_dominio':false,
         'id_tipo_aplicacion':false,
         'id_servidor':false,
         'id_servicio':false,

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
         'id_aplicacion':'Id aplicacion',

         'nom_aplicacion':'Nombre aplicacion',
         'det_aplicacion':'Detalle aplicacion',
         'alias':'Alias',
         'url_web':'Url',
         'ip':'Ip',
         'subdominio':'Subdominio',
         'ssl_tls':'SSL/TLS',
         'id_dominio':'Id Dominio',
         'id_tipo_aplicacion':'Id Tipo App',
         'id_servidor':'Id Servidor',
         'id_servicio':'Id Servicio',

         'id_usuario_registra':'Usuario registra',
         'id_usuario_modifica':'Usuario modifica',
         'created_at':'Creado en',
         'updated_at':'Actualizado en',
         'deleted_at':'Eliminado en',
      },

   };

   export {
      Aplicacion
   };
</script>
