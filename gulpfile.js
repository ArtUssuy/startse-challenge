const gulp = require("gulp")
const sass = require("gulp-sass")
const browserSync = require("browser-sync")
const sourceMaps = require("gulp-sourcemaps")

const { series, dest, src } = require('gulp')

function style() {
    console.log("SCSS...")

    var sassdocOptions = {
        dest: './sassdoc'
      };

    return src('./scss/*.scss')
        .pipe(sourceMaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(sourceMaps.write())
        .pipe(browserSync.stream())
        .pipe(dest('./css'))
}  

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    gulp.watch('./scss/**/*.scss', style)
    gulp.watch('./**/*.html', style).on("change", browserSync.reload)
    gulp.watch('./**/*.js', style).on("change", browserSync.reload)
    
}

exports.default = series(style)
exports.default = series(watch)
