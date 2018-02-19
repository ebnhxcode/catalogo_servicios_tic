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


mix.js(
   'resources/assets/js/controllers/FrontController.js',
   'public/js/controllers/FrontController.js'
);

mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');
