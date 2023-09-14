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
    src('src/scss/app.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'));

    done();
}

function dev() {
    watch('src/scss/app.scss', css);
}

function tareaDefault() {
    console.log('Soy la tarea default');
}

exports.css = css;
exports.dev = dev;
exports.default = series(css, dev);

// series - Se inicia una tarea, y hasta que finaliza, se inicia la siguiente.
// parallel - Todas inician al mismo tiempo