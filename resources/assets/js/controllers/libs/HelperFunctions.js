function checkear_estado_respuesta_http (status_code) {
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
}

function mostrar_modal_actualizar () {
   this.$modal.show('actualizar',{
      title: 'Alert!',
      text: 'You are too awesome',
      buttons: [
         {
            title: 'Deal with it',
            handler: () => { alert('Woot!') }
         },
         {
            title: '',       // Button title
            default: true,    // Will be triggered by default if 'Enter' pressed.
            handler: () => {} // Button click handler
         },
         {
            title: 'Close'
         }
      ]
   });
}

function mostrar_modal_crear () {
   this.$modal.show('crear',{
      title: 'Alert!',
      text: 'You are too awesome',
      buttons: [
         {
            title: 'Deal with it',
            handler: () => { alert('Woot!') }
         },
         {
            title: '',       // Button title
            default: true,    // Will be triggered by default if 'Enter' pressed.
            handler: () => {} // Button click handler
         },
         {
            title: 'Close'
         }
      ]
   });
}

export default {
   checkear_estado_respuesta_http,
   mostrar_modal_actualizar,
   mostrar_modal_crear,
}