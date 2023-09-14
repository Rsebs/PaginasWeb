const {src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css(done) {
    // Compilar SASS
    /** Pasos:
     * 1 - indetificar archivo
     * 2 - compilarla
     * 3 - guardar el .css
     */
    src('src/scss/app.scss') // indetificar archivo
        .pipe(sass()) // compilarla
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css')); // guardar el .css

    done();
}

function dev() {
    watch('src/scss/app.scss', css);
}

exports.css = css;
exports.dev = dev;

// series - Se inicia una tarea, y hasta que finaliza, se inicia la siguiente.
// parallel - Todas inician al mismo tiempo
exports.default = series(css, dev);
