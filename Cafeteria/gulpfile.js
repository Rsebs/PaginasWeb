const {src, dest, watch, series, parallel} = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    // Compilar SASS
    /** Pasos:
     * 1 - indetificar archivo
     * 2 - compilarla
     * 3 - guardar el .css
     */
    src('src/scss/app.scss') // indetificar archivo
        .pipe(sourcemaps.init())
        .pipe(sass()) // compilarla
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css')); // guardar el .css

    done();
}

function imagenes() {
    return src('src/img/**/*')
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('build/img'));
}

function versionWebp() {
    const opciones = {
        quality: 50
    }

    return src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'));
}

function versionAvif() {
    const opciones = {
        quality: 50
    }

    return src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'));
}

function dev() {
    // watch('src/scss/header/_header.scss', css);
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;

// series - Se inicia una tarea, y hasta que finaliza, se inicia la siguiente.
// parallel - Todas inician al mismo tiempo
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);
