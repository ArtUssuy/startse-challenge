const gulp = require("gulp")
const sass = require("gulp-sass")
const browserSync = require("browser-sync")
const prefix = require("gulp-autoprefixer")

const { series, dest, src } = require('gulp')

function style() {
    console.log("SCSS running...")
    return src('./scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        // .pipe(console.log(prefix))
        .pipe(prefix())
        .pipe(dest('./css'))
        .pipe(browserSync.stream())
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
