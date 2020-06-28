const mix = require('laravel-mix');

mix.sass('src/index.scss', 'dist')
   .js('src/index.js', 'dist');
