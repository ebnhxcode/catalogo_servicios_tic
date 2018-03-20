//Algunas funciones lo necesitan
import swal from 'sweetalert2'

/**
 *  Este objeto tiene permisos para manejar otros mudulos siempre que no afecte a otros metodos u
 *  objetos en donde ha sido importado
*/
export const inyeccion_funciones_compartidas = {
   methods: {
      auto_alerta_corta: function (titulo,texto,tipo,tiempo=1500) {
         swal({
            title: titulo,
            text: texto,
            type: tipo,
            timer: tiempo || 1500
         });
      },
      auto_alerta_media: function (titulo,texto,tipo,tiempo=3000) {
         swal({
            title: titulo,
            text: texto,
            type: tipo,
            timer: tiempo || 3000
         });
      },
      //Esta funcion en ingles es propia de los modal para hacer algo antes que se cierre
      before_close: function (event) {
         //console.log(event.name);
         switch (event.name) {
            case 'crear':
               this.modal_crear_activo = false;
               break;
            case 'actualizar':
               this.modal_actualizar_activo = false;
               this.id_en_edicion = null;
               break;
         }
         return;
      },
      buscar_en_array_por_modelo_e_id: function (id, array, model) {
         for (let a in array) {
            if (array[a][`id_${model}`] == id) {
               return array[a];
            }
         } return null;
      },
      // change order variable direction
      cambiar_orden_lista: function (columna) {
         this.orden_lista == 'asc' ? this.orden_lista = 'desc' : this.orden_lista = 'asc';
         this.ordenar_lista(columna);
      },
      cambiar_visibilidad: function (campo) { return this.tabla_campos[campo] = !this.tabla_campos[campo]; },
      checkear_estado_respuesta_http: function (status_code) {
         switch (status_code) {
            case 401:

               swal({
                  title: "Atencion",
                  text: "Su sesión ha expirado, por favor inicie sesion nuevamente.",
                  type: "warning",
                  confirmButtonClass: "btn-danger",
                  closeOnConfirm: true,
               }, function (isConfirm) {
                  if (isConfirm) {
                     window.location.href = '/login';
                  }
               });

               break;

            case 500:

               swal({
                  title: "Atencion",
                  text: "Ocurrio un error al guardar, por favor actualice la página.",
                  type: "warning",
                  confirmButtonClass: "btn-danger",
                  closeOnConfirm: true,
               }, function (isConfirm) {
                  if (isConfirm) {
                     window.location.href = '/login';
                  }
               });

               break;

            default :
               swal({
                  title: "Atencion",
                  text: "Ocurrio un error al procesar el formulario, por favor actualice la página.",
                  type: "warning",
                  confirmButtonClass: "btn-danger",
                  closeOnConfirm: true
               }, function (isConfirm) {
                  if (isConfirm) {
                     window.location.href = '/login';
                  }
               });
               break;
         }
      },
      configurar_relaciones: function (objetos_clase, relaciones) {
         objetos_clase.map((o) => {
            o = relaciones.map((r) => {
               let key = Object.keys(r)[0];
               let pk = r[key];
               if (o[key]) { o[pk] = o[key][pk] || null; }
               return o;
            });
         });
      },
      dejar_de_editar: function () {
         this.lista_actualizar_activo = false;
         this.id_en_edicion = null;
      },

      es_undefined:(v) => { return (typeof v == undefined)?true:false; },
      es_null: (v) => { return (v==null)?true:false; },
      es_empty: (v) => { return (!v || v==null || v=='' || typeof v == undefined) ? true : false; },
      en_array: (array, v) => { return (array.indexOf(v) > -1) ? true : false; },
      encontrar: function (id) {
         this.$http.get(`/${this.nombre_tabla}/${id}`).then(response => { // success callback
            return response.body[`${this.nombre_model}`];
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },
      guardar: function () {
         //Ejecuta validacion sobre los campos con validaciones
         //console.log(this.validar_campos());
         this.$validator.validateAll().then( res => {
            if (res == true) {
               //Se adjunta el token
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               //Instancia nuevo form data
               var formData = new FormData();
               //Conforma objeto paramétrico para solicitud http
               for (let i in this.permitido_guardar) {
                  formData.append(`${this.permitido_guardar[i]}`, this.$data[`${this.nombre_model}`][`${this.permitido_guardar[i]}`] || null);
               }
               this.$http.post(`/${this.nombre_ruta}`, formData).then(response => { // success callback
                  if (response.status == 200) {
                     if (!this.es_null(response.body[`${this.nombre_model}`])) { // del backend viene el objeto con el nombre
                        this.id_en_edicion = null; // se resetea el objeto reactivo de la clase
                     }//this.inicializar();
                  } else {
                     this.checkear_estado_respuesta_http(response.status);
                     return false;
                  }
                  if (this.mostrar_notificaciones(response) == true) {
                     this.limpiar_objeto_clase_local();
                     this.inicializar();
                     this.ocultar_modal('crear');
                     return;
                  }
               }, response => { // error callback
                  this.checkear_estado_respuesta_http(response.status);
               });
            }
         });
         return;
      },

      limpiar_objeto_clase_local: function () {
         for (var k in this.$data[`${this.nombre_model}`]) { this.$data[`${this.nombre_model}`][k] = null; }
      },
      mostrar: function (id, tabla, modelo) {
         this.$http.get(`/${tabla}/${id}`).then(response => { // success callback
            //console.log(response.body[modelo][0]);
            //var obj = console.log(response.body[modelo]);
            var obj = response.body[modelo];
            return obj;

         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },
      mostrar_modal_actualizar: function (id) {
         this.lista_actualizar_activo = false;
         this.modal_actualizar_activo = true;
         this.id_en_edicion = id;

         this.$modal.show('actualizar', {
            title: 'Alert!',
            text: 'You are too awesome',
            buttons: [
               {
                  title: 'Deal with it',
                  handler: () => {
                     alert('Woot!')
                  }
               },
               {
                  title: '',       // Button title
                  default: true,    // Will be triggered by default if 'Enter' pressed.
                  handler: () => {
                  } // Button click handler
               },
               {
                  title: 'Close'
               }
            ]
         });
      },
      mostrar_modal_crear: function () {
         this.lista_actualizar_activo = false;
         this.modal_crear_activo = true;
         this.id_en_edicion = null;

         this.$modal.show('crear', {
            title: 'Alert!',
            text: 'You are too awesome',
            buttons: [
               {
                  title: 'Deal with it',
                  handler: () => {
                     alert('Woot!')
                  }
               },
               {
                  title: '',       // Button title
                  default: true,    // Will be triggered by default if 'Enter' pressed.
                  handler: () => {
                  } // Button click handler
               },
               {
                  title: 'Close'
               }
            ]
         });
      },
      mostrar_notificaciones: function (respuesta_http) {

         var status = respuesta_http.status;
         var tipo = respuesta_http.body.tipo;
         var mensajes = respuesta_http.body.mensajes;

         switch (tipo) {
            case 'creacion_exitosa':
               // Tipo de notificacion , Titulo de los mensajes , Mensajes , Grupo
               this.notificar('success', 'Registro exitoso', mensajes, 'global');
               return true; break;
            case 'actualizacion_exitosa':
               // Tipo de notificacion , Titulo de los mensajes , Mensajes , Grupo
               this.notificar('success', 'Actualización exitosa', mensajes, 'global');
               return true; break;
            case 'eliminacion_exitosa':
               // Tipo de notificacion , Titulo de los mensajes , Mensajes , Grupo
               this.notificar('success', 'Eliminación exitosa', mensajes, 'global');
               return true; break;
            case 'errores_campos_requeridos':
               // Tipo de notificacion , Titulo de los mensajes , Mensajes , Grupo
               this.notificar('warn', 'Advertencia campo requerido',  mensajes, 'global');
               return false; break;
            case 'error_datos_invalidos':
               // Tipo de notificacion , Titulo de los mensajes , Mensajes , Grupo
               this.notificar('error', 'Error datos invalidos',  mensajes, 'global');
               return false; break;
         }
         //Como no hay nada mas que pueda deneter la ejecucion, se cierra el modal con esta verificacion true.
         return true;

      },

      validar_campos: function () {
         /*DEPRECATED*/
         this.$validator.validateAll().then(res => {
            return res;
         });
      },


      notificar: function (tipo, titulo, mensajes, grupo) {
         for (var m in mensajes) { this.$notify({ group: grupo, type: tipo, title: titulo, text: mensajes[m][0] }); }
         return true;
      },
      ocultar_modal: function (nom_modal) { this.$modal.hide(nom_modal); },
      // function to order lists
      ordenar_lista: function (columna) { this.lista_objs_model = _.orderBy(this.lista_objs_model, columna, this.orden_lista); },
      separar_miles: function (num) {
         return num.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      },






   }
}


/*

Ejemplos
-----
const hola = {
   test1(){console.log('test1')},
   test2:function(){console.log('test2')}
}
export default hola
-----
export const hola2 = {
   test1(){console.log('test1')},
   test2:function(){console.log('test2')}
}
-----
var hola3 = {
   test1(){console.log('test1')},
   test2:function(){console.log('test2')}
}

export var hola3

-----
export function ocultar_modal (nom_modal) {
   this.$modal.hide(nom_modal);
}


*/