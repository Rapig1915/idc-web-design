const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

//compile sccc into css
function style () {
    //1.where is my scss file
    return gulp.src('./scss/**/*.scss')
    //2.pass that file through sass compiler
    .pipe(sass().on('error', sass.logError))
    //2b.autoprefixer
    .pipe(autoprefixer('last 2 versions'))
    //3.where do I save my compiled css?
    .pipe(gulp.dest('./css'))
    //4.stream changes to all browsers
    .pipe(browserSync.stream());

}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./scss/**/*.scss', style).on('change', browserSync.reload);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./*.php').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;