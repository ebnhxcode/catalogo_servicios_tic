//Algunas funciones lo necesitan
import swal from 'sweetalert2'

/**
 *  Este objeto tiene permisos para manejar otros mudulos siempre que no afecte a otros metodos u
 *  objetos en donde ha sido importado
*/
export const inyeccion_funciones_compartidas = {
   methods: {
      //Esta funcion en ingles es propia de los modal para hacer algo antes que se cierre
      before_close: function (event) {
         //console.log(event.name);
         switch (event.name) {
            case 'crear':
               this.modal_crear_activo = false;
               break;
            case 'actualizar':
               this.modal_actualizar_activo = false;
               break;
         }
         return;
      },
      buscar_en_array_por_modelo_e_id: function (id, array, model) {
         for (let a in array) { if (array[a][`id_${model}`] == id) { return array[a]; } } return null;
      },
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

      es_undefined:(v) => { return (typeof v == undefined)?true:false; },
      es_null: (v) => { return (v==null)?true:false; },
      es_empty: (v) => { return (!v || v==null || v=='' || typeof v == undefined) ? true : false; },
      en_array: (array, v) => { return (array.indexOf(v) > -1) ? true : false; },

      mostrar_modal_actualizar: function () {
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

      validar_campos: function () { this.$validator.validateAll().then(res => { return res == true ? res : false; }); },

      notificar: function (tipo, titulo, mensajes, grupo) {
         for (var m in mensajes) { this.$notify({ group: grupo, type: tipo, title: titulo, text: mensajes[m][0] }); }
         return true;
      },
      ocultar_modal: function (nom_modal) { this.$modal.hide(nom_modal); },







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