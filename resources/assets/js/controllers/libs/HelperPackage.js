//Algunas funciones lo necesitan
import swal from 'sweetalert2'

export const inyeccion_funciones_compartidas = {
   methods: {
      checkear_estado_respuesta_http: function (status_code) {
         switch (status_code) {
            case 200:

               swal({
                  title: "Exito",
                  text: `El resultado de la peticion es ${status_code}`,
                  type: "success",
                  confirmButtonClass: "btn-success",
                  closeOnConfirm: true,
               }, function (isConfirm) {
                  if (isConfirm) {
                     window.location.href = '/';
                  }
               });

               break;

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
      ocultar_modal: function (nom_modal) {
         this.$modal.hide(nom_modal);
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