let gulp = require('gulp'),
    less = require('gulp-less'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCss = require('gulp-clean-css');

gulp.task('less', function () {
    return gulp.src('app/less/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('main.css'))

        // .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function () {
    return gulp.src('app/libs/jquery/dist/jquery.min.js')
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('default', ['browser-sync', 'less', 'scripts'], function () {
    gulp.watch('app/less/**/*.less', ['less']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/*.js', browserSync.reload);
});
