let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

/*
mix.js(
   'resources/assets/js/app/api/controllers/FormularioController.js',
   'public/js/app/api/controllers/FormularioController.js'
);

   mix
      .scripts([
         'resources/assets/js/jquery.min.js',
         'resources/assets/js/bootstrap.js',
         'resources/assets/js/vue.js',
         'resources/assets/js/app.js'
      ],
      'public/js/app.js')// Este archivo se creara y compilara todos los JS que en el array se encuentren.

      .styles([
         'resources/assets/css/bootstrap.css',
         'resources/assets/css/style.css'
      ],
      'public/css/all.css'); // Este archivo se creara y compilara todos los CSS que en el array se encuentren.
*/


mix.js('resources/assets/js/components/DownloadExcel.vue','public/js/components/DownloadExcel.vue');
mix.js('resources/assets/js/components/Paginators.vue','public/js/components/Paginators.vue');
mix.js('resources/assets/js/controllers/SideMenuController.js','public/js/controllers/SideMenuController.js');
mix.js('resources/assets/js/controllers/HomeController.js','public/js/controllers/HomeController.js');
mix.js('resources/assets/js/controllers/RoleController.js','public/js/controllers/RoleController.js');
mix.js('resources/assets/js/controllers/PermisoController.js','public/js/controllers/PermisoController.js');
mix.js('resources/assets/js/controllers/UsuarioController.js','public/js/controllers/UsuarioController.js');
mix.js('resources/assets/js/controllers/ServicioController.js','public/js/controllers/ServicioController.js');
mix.js('resources/assets/js/controllers/ActividadController.js','public/js/controllers/ActividadController.js');
mix.js('resources/assets/js/controllers/EstadoController.js','public/js/controllers/EstadoController.js');
mix.js('resources/assets/js/controllers/CargoController.js','public/js/controllers/CargoController.js');
mix.js('resources/assets/js/controllers/AplicacionController.js','public/js/controllers/AplicacionController.js');
mix.js('resources/assets/js/controllers/TipoAplicacionController.js','public/js/controllers/TipoAplicacionController.js');
mix.js('resources/assets/js/controllers/TipoServidorController.js','public/js/controllers/TipoServidorController.js');
mix.js('resources/assets/js/controllers/TipoRespaldoDiscoController.js','public/js/controllers/TipoRespaldoDiscoController.js');
mix.js('resources/assets/js/controllers/AplicacionAccesoController.js','public/js/controllers/AplicacionAccesoController.js');
mix.js('resources/assets/js/controllers/DominioController.js','public/js/controllers/DominioController.js');
mix.js('resources/assets/js/controllers/ServidorController.js','public/js/controllers/ServidorController.js');
mix.js('resources/assets/js/controllers/ServidorAccesoController.js','public/js/controllers/ServidorAccesoController.js');
mix.js('resources/assets/js/controllers/DatacentroController.js','public/js/controllers/DatacentroController.js');
mix.js('resources/assets/js/controllers/SistemaOperativoController.js','public/js/controllers/SistemaOperativoController.js');
mix.js('resources/assets/js/controllers/TagController.js','public/js/controllers/TagController.js');
mix.js('resources/assets/js/controllers/UsuarioBitacoraServicioController.js','public/js/controllers/UsuarioBitacoraServicioController.js');
mix.js('resources/assets/js/controllers/ClusterController.js','public/js/controllers/ClusterController.js');
mix.js('resources/assets/js/controllers/MenuController.js','public/js/controllers/MenuController.js');
mix.js('resources/assets/js/controllers/MantenedorController.js','public/js/controllers/MantenedorController.js');
mix.js('resources/assets/js/controllers/VlanController.js','public/js/controllers/VlanController.js');

mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');
