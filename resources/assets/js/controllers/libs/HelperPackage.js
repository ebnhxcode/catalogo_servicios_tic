//Algunas funciones lo necesitan
import swal from 'sweetalert2'


/**
 *  Este objeto tiene permisos para manejar otros mudulos siempre que no afecte a otros metodos u
 *  objetos en donde ha sido importado
*/
export const inyeccion_funciones_compartidas = {
   methods: {
      /*
      *
      *
      * */
      auto_alerta_corta: function (titulo,texto,tipo,tiempo=1500) {
         swal({
            title: titulo,
            text: texto,
            type: tipo,
            timer: tiempo || 1500
         });
      },

      /*
       *
       *
       * */
      auto_alerta_media: function (titulo,texto,tipo,tiempo=3000) {
         swal({
            title: titulo,
            text: texto,
            type: tipo,
            timer: tiempo || 3000
         });
      },

      /*
       * Esta funcion en ingles es propia de los modal para hacer algo antes que se cierre
       *
       * */
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

      /*
       *
       *
       * */
      buscar_en_array_por_modelo_e_id: function (id, array, model) {
         for (let a in array) {
            if (array[a][`id_${model}`] == id) {
               return array[a];
            }
         } return null;
      },



      /*
       *
       *
       * */
      buscar_objeto_clase: function (id) {
         this.$http.get(`/${this.nombre_tabla}/${id}`).then(response => { // success callback
            this.$data[`${this.nombre_model}`] = response.body[`${this.nombre_model}`];
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },

      /*
       *
       *
       * */
      buscar_objeto_otra_clase: function (id,nombre_tabla,nombre_model) {
         this.$http.get(`/${nombre_tabla}/${id}`).then(response => { // success callback
            return response.body[`${nombre_model}`];
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },

      /*
       *
       *
       * */
      buscar_objeto_clase_config_relaciones: function (id, relaciones) {
         this.$http.get(`/${this.nombre_tabla}/${id}`).then(response => { // success callback
            this.$data[`${this.nombre_model}`] = response.body[`${this.nombre_model}`];
            this.configurar_relaciones([this.$data[`${this.nombre_model}`]], relaciones);
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },

      /*
       * change order variable direction
       *
       * */
      cambiar_orden_lista: function (columna) {
         this.orden_lista == 'asc' ? this.orden_lista = 'desc' : this.orden_lista = 'asc';
         this.ordenar_lista(columna);
      },

      /*
       *
       *
       * */
      cambiar_visibilidad: function (campo) { return this.tabla_campos[campo] = !this.tabla_campos[campo]; },

      /*
       *
       *
       * */
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

      /*
       *
       *
       * */
      configurar_relaciones: function (objetos_clase, relaciones) {
         //console.log(o); el obj de la clase en la lista
         //console.log(r); el obj con la key -> column
         //console.log(key); //nombre del key del obj de la relacion
         //console.log(o[key]); //el objeto llamado con el key de la relacion
         //console.log(column); //key de la columna de la bd ; id_* nom_*
         //console.log(o[key][column]); //Valor que iria en el key a asociar
         objetos_clase.map((o) => { //obj de la clase -> servicios
            o = relaciones.map((rel) => { //relaciones -> {nombre_relacion:'key de valor a asignar'}
               for (var r in rel) {
                  //console.log(rel); //key de la relacion
                  //console.log(rel[r]); //contenido llamado con el key en el objeto
                  //console.log(i.split('.')); //el arreglo del key de la relacion en caso que haya una relacion anidada
                  //console.log(ult_relacion[ult_relacion.length - 1]); // contiene la ultima key de relacion de la anidacion, de donde sacará la data finalmente
                  var ult_relacion = r.split('.'); //key finales separadas por el punto de la anidacion
                  //ult_relacion = ult_relacion[ult_relacion.length - 1]; //key final de la relacion
                  //console.log(o[ult_relacion]); //la relaccion llamada desde su nombre key
                  switch (ult_relacion.length) {
                     case 1:
                        for (var col in rel[r]) {
                           //console.log( o[ult_relacion][rel[r][col]] );
                           if(o[ult_relacion] && o[ult_relacion][rel[r][col]]){
                              o[rel[r][col]] = o[ult_relacion][rel[r][col]] || null;
                           }
                           //
                        }
                        break;
                     case 2:
                        for (var col in rel[r]) {
                           if(o[ult_relacion[0]][ult_relacion[1]] && o[ult_relacion[0]][ult_relacion[1]][rel[r][col]]){
                              o[rel[r][col]] = o[ult_relacion[0]][ult_relacion[1]][rel[r][col]] || null;
                           }
                        }
                        break;
                  }
                  /*
                  if (o[key]) {
                     o[column] = o[key][column] || null;
                  }
                  return o;
                  */
               }
               /*
               var key = Object.keys(r)[0];
               var column = r[key];
               if (o[key]) {
                  o[column] = o[key][column] || null;
               }
               return o;
               */
            });

         });
      },

      /*
       *
       *
       * */
      dejar_de_editar: function () {
         this.lista_actualizar_activo = false;
         this.id_en_edicion = null;
      },

      /*
       *
       *
       * */
      atribuir_elementos_a_objetos: function (elementos_relaciones, objetos) {

      },

      /*
       *
       *
       * */
      editar: function (id) {
         this.id_en_edicion = id;
         this.lista_actualizar_activo = true;
         //id_objeto + array de objetos + nombre del model en lower case
         this.$data[`${this.nombre_model}`] =
            this.buscar_en_array_por_modelo_e_id(this.$data[`${this.nombre_model}`][`${this.pk_tabla}`], this.$data[`${this.nombre_ruta}`], this.nombre_model);
      },



      /*
       *
       *
       * */
      eliminar_de_array_por_modelo_e_id: function (id, array, model) {
         for (let a in array) {
            if (array[a][`id_${model}`] == id) {
               return array.splice(a, 1);
            }
         } return null;
      },

      /*
       *
       *
       * */
      eliminar: function (id) {
         swal({
            title: "¿Estás seguro/a?",
            text: "¿Deseas confirmar la eliminación de este registro?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            closeOnCancel: false,
            confirmButtonColor: '#DD6B55',
            confirmButtonClass: "btn-danger",
            confirmButtonText: 'Si, eliminar!',
            confirmButtonClass: "btn-warning",
            cancelButtonText: 'No, mantener.'
         }).then((result) => {
            if (result.value) {
               //Se adjunta el token
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

               this.$http.delete(`/${this.nombre_ruta}/${id}`).then(response => {
                  if (response.status == 200) {
                     this.auto_alerta_corta("Eliminado!", "Registro eliminado correctamente", "success");
                  } else {
                     this.checkear_estado_respuesta_http(response.status);
                     return false;
                  }

                  if (this.mostrar_notificaciones(response) == true) {
                     //Aqui que pregunte si el modal está activo para que lo cierre
                     if (this.modal_actualizar_activo == true) {
                        this.ocultar_modal('actualizar');
                        this.modal_actualizar_activo = false;
                     }
                     this.lista_actualizar_activo = false;
                     this.id_en_edicion = null;

                     //Recargar la lista
                     this.inicializar();
                  }
               }, response => { // error callback
                  this.checkear_estado_respuesta_http(response.status);
               });
            } else if (result.dismiss === swal.DismissReason.cancel) {
               this.auto_alerta_corta("Cancelado", "Se ha cancelado la eliminación", "success");
            }
         });

      },


      /*
       *
       *
       * */
      existe_en_array_por_modelo_e_id: function (id, array, model) {
         for (let a in array) {
            if (array[a][`id_${model}`] == id) {
               return true;
            }
         } return null;
      },

      /*
       *
       *
       * */
      es_undefined:(v) => { return (typeof v == undefined)?true:false; },

      /*
       *
       *
       * */
      es_null: (v) => { return (v==null)?true:false; },

      /*
       *
       *
       * */
      es_empty: (v) => { return (!v || v==null || v=='' || typeof v == undefined) ? true : false; },

      /*
       *
       *
       * */
      en_array: (array, v) => { return (array.indexOf(v) > -1) ? true : false; },

      /*
       *
       *
       * */
      es_linux: function () {
         if (this.$data[`${this.nombre_model}`][`id_sistema_operativo`] != null) {
            var so = this.buscar_en_array_por_modelo_e_id(this.$data[`${this.nombre_model}`][`id_sistema_operativo`], this.$data[`sistemas_operativos`], `sistema_operativo`);
            if (so.tipo_sistema_operativo.cod_tipo_sistema_operativo=='linux') {
               return true;
            }
            return false;
         }
         return false;
      },

      /*
       *
       * var @boolean
       * */
      existe_en_arreglo: function (id, arreglo, pkey_name) {

      },

      /*
       *
       *
       * */
      existe_en_coleccion: function (id, coleccion, pkey_name) {

      },

      /*
       *
       *
       * */
      encontrar: function (id) {
         this.$http.get(`/${this.nombre_tabla}/${id}`).then(response => { // success callback
            return response.body[`${this.nombre_model}`];
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
      },

      /*
       *
       *
       * */
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
                  formData.append(`${this.permitido_guardar[i]}`, this.$data[`${this.nombre_model}`][`${this.permitido_guardar[i]}`] || 0);
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

      /*
       *
       *
       * */
      guardar_editado: function () {
         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
         this.$http.put(`/${this.nombre_ruta}/${this.$data[this.nombre_model][this.pk_tabla]}`, this.$data[this.nombre_model]).then(response => { // success callback
            if (response.status == 200) {
               /*
                if (!this.es_null(response.body.usuario)) {
                this.lista_actualizar_activo = false;
                this.id_en_edicion = null;
                }
                */
            } else {
               this.checkear_estado_respuesta_http(response.status);
               return false;
            }

            if (this.mostrar_notificaciones(response) == true) {
               this.buscar_objeto_clase_config_relaciones(this.$data[this.nombre_model][this.pk_tabla], this.relaciones_clase);
               /*
                //Aqui que pregunte si el modal está activo para que lo cierre
                if (this.modal_actualizar_activo == true) {
                this.ocultar_modal('actualizar');
                this.modal_actualizar_activo = false;
                }

                this.lista_actualizar_activo = false;
                this.id_en_edicion = null;
                */
               //Recargar la lista
               this.inicializar();
            }
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
         return;
      },

      /*
       *
       *
       * */
      guardar_editado_de_otra_clase: function (id,nombre_tabla,objeto_clase) {
         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
         this.$http.put(`/${nombre_tabla}/${id}`, objeto_clase).then(response => { // success callback
            if (response.status == 200) {
               /*
                if (!this.es_null(response.body.usuario)) {
                this.lista_actualizar_activo = false;
                this.id_en_edicion = null;
                }
                */
            } else {
               this.checkear_estado_respuesta_http(response.status);
               return false;
            }

            if (this.mostrar_notificaciones(response) == true) {
               //this.buscar_objeto_clase_config_relaciones(id, this.relaciones_clase);

               /*
                //Aqui que pregunte si el modal está activo para que lo cierre
                if (this.modal_actualizar_activo == true) {
                this.ocultar_modal('actualizar');
                this.modal_actualizar_activo = false;
                }

                this.lista_actualizar_activo = false;
                this.id_en_edicion = null;
                */
               //Recargar la lista
               //this.inicializar();
            }
         }, response => { // error callback
            this.checkear_estado_respuesta_http(response.status);
         });
         return;
      },

      /*
       *
       *
       * */
      limpiar_objeto_clase_local: function () {
         for (var k in this.$data[`${this.nombre_model}`]) { this.$data[`${this.nombre_model}`][k] = null; }
      },

      /*
       *
       *
       * */
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

      /*
       *
       *
       * */
      mostrar_modal_actualizar: function (id) {
         this.lista_actualizar_activo = false;
         this.modal_actualizar_activo = true;
         this.id_en_edicion = id;

         if (this.$data['filtro_componente']) {
            this.$data['filtro_componente']=null;
         }

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

      /*
       *
       *
       * */
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

      /*
       *
       *
       * */
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

      /*
       *
       *
       * */
      validar_campos: function () {
         /*DEPRECATED*/
         this.$validator.validateAll().then(res => {
            return res;
         });
      },

      /*
       *
       *
       * */
      notificar: function (tipo, titulo, mensajes, grupo) {
         for (var m in mensajes) { this.$notify({ group: grupo, type: tipo, title: titulo, text: mensajes[m][0] }); }
         return true;
      },

      /*
       *
       *
       * */
      ocultar_modal: function (nom_modal) { this.$modal.hide(nom_modal); },
      /*
       *
       *
       * */
      // function to order lists
      ordenar_lista: function (columna) { this.lista_objs_model = _.orderBy(this.lista_objs_model, columna, this.orden_lista); },

      /*
       *
       *
       * */
      separar_miles: function (num) {
         return num.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      },

      inicializar: function () {
         this.$http.get(`/ajax/${this.nombre_ruta}`).then(response => { // success callback
            if (response.status == 200) {
               this.configurar_relaciones(response.body[this.nombre_ruta].data, this.relaciones_clase);
               this.asignar_recursos(response);
            } else { this.checkear_estado_respuesta_http(response.status); }
         }, response => { this.checkear_estado_respuesta_http(response.status); }); // error callback
      },

      navigate (page) {
         this.$http.get(`/ajax/${this.nombre_ruta}?page=` + page + '&per_page=' + this.pagination.per_page).then(response => {
            if (response.status == 200) {
               this.configurar_relaciones(response.body[this.nombre_ruta].data, this.relaciones_clase);
               this.asignar_recursos(response);
            } else { this.checkear_estado_respuesta_http(response.status); }
         }, response => { this.checkear_estado_respuesta_http(response.status); });// error callback
      },

      navigateCustom () {
         this.$http.get(`/ajax/${this.nombre_ruta}?page=` + 1 + '&per_page=' + this.pagination.per_page).then(response => {
            console.log(response);
            if (response.status == 200) {
               this.configurar_relaciones(response.body[this.nombre_ruta].data, this.relaciones_clase);
               this.asignar_recursos(response);
            } else { this.checkear_estado_respuesta_http(response.status); }
         }, response => { this.checkear_estado_respuesta_http(response.status); });// error callback
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