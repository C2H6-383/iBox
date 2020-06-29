const mix = require('laravel-mix');

mix.sass('src/ibox.scss', 'dist')
   .js('src/ibox.js', 'dist');
