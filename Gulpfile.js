const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-dart-sass');
const csso = require('gulp-csso');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const terser = require('gulp-terser');
const webpack = require('webpack-stream');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const changed = require('gulp-changed');
const del = require('del');
const mode = require('gulp-mode')();

const clean = () => {
  return del(['dist']);
}

const cleanImages = () => {
  return del(['dist/images']);
}

const cleanFonts = () => {
  return del(['dist/fonts']);
}

const css = () => {
  return src('dist/styles/**/*.scss.liquid')
    .pipe(mode.development( sourcemaps.init() ))
    .pipe(sass().on('error', sass.logError))
    .pipe(rename(function (path) {
      path.basename = path.basename.replace(".scss", ".css");
      path.extname = ".liquid";
    }))
    .pipe(replace('"{{', "{{"))
    .pipe(replace('}}"', "}}"))
    .pipe(replace('px"', "px"))
    .pipe(mode.production( csso() ))
    .pipe(mode.development( sourcemaps.write() ))
    .pipe(dest('src/assets'));
}

const js = () => {
  return src('dist/scripts/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(webpack({
      mode: 'development',
      devtool: 'inline-source-map'
    }))
    .pipe(mode.development( sourcemaps.init({ loadMaps: true }) ))
    .pipe(rename('app.js'))
    .pipe(mode.production( terser({ output: { comments: false } }) ))
    .pipe(mode.development( sourcemaps.write() ))
    .pipe(dest('src/assets'))
}

const copyImages = () => {
  var imgDst = 'dist/images';
  return src('images/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(dest('src/assets'));
}

// const copyFonts = () => {
//   return src('dist/fonts/**/*.{svg,eot,ttf,woff,woff2}')
//     .pipe(dest('dist/assets/fonts'));
// }

const watchForChanges = () => {
  watch('./dist/styles/**/*.scss', {ignoreInitial: false, usePolling: true}, css);
  watch('./dist/scripts/*.js', {ignoreInitial: false, usePolling: true}, js);
  watch('./dist/images/*.{png,jpg,jpeg,gif,svg}', {ignoreInitial: false, usePolling: true},  series(cleanImages, copyImages));
  // watch('fonts/**/*.{svg,eot,ttf,woff,woff2}', series(cleanFonts, copyFonts));
}

exports.default = series(parallel(css, js, copyImages), watchForChanges);
exports.build = series(parallel(css, js, copyImages));