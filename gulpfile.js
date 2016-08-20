var gulp        = require('gulp');
var browserSync = require('browser-sync');
var stylus        = require('gulp-stylus');
var pug        = require('gulp-pug');
var nodemon    = require('gulp-nodemon');
var reload      = browserSync.reload;

// /**
//  * Nodemon Server 
//  */
gulp.task('nodemon', function (cb) {
    
 var started = false;
    
 return nodemon({
     script: 'app.js'
 }).on('start', function () {
     // to avoid nodemon being started multiple times
     // thanks @matthisk
     if (!started) {
         cb();
         started = true; 
     } 
 });
});


/**
 * Compile pug files into HTML
 */
gulp.task('pug-watch', function() {
``
    return gulp.src('./app/views/index.pug')
        .pipe(pug())
        .pipe(gulp.dest('./public/'))
        .pipe(reload({stream: true}));
});


/**
 * stylus task for live injecting into all browsers
 */
gulp.task('stylus', function () {
    return gulp.src('./app/styles/app.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./public/'))
        .pipe(reload({stream: true}));
});

/**
 * Serve and watch the styl/pug files for changes
 */
gulp.task('default', ['stylus', 'pug-watch', 'nodemon'], function () {

    browserSync({server: './public'});

    gulp.watch('./app/styles/*.styl', ['stylus']);
    gulp.watch('./app/views/**/*.pug',      ['pug-watch']);
});














