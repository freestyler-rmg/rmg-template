/*
 * Created by RxMxG
 * Learned from https://css-tricks.com/gulp-for-beginners/
 *
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var notify = require("gulp-notify");
var browserSync = require('browser-sync').create();


// Start browserSync server
// -------
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
  })
});


// concatenates any number of CSS and JavaScript files into a single file
// -------
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});


// optimizing image
// -------
gulp.task('images', function(){
  return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
    // Optimizing images however, is an extremely slow process 
    // that you'd not want to repeat unless necessary.
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('dist/img'))
});


// copy fonts from app/ to dist/
// -------
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});


// compile scss to css
// -------
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass().on('error', notify.onError(
      function(error) {return '\nProblem file : ' + error.message;}
    )))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


// clean dist/ content
// -------
gulp.task('clean:dist', function() {
  return del.sync('dist/**/*');
});


// clean cache (mainly for image optimization)
// -------
gulp.task('clean:cache', function (callback) {
  return cache.clearAll(callback)
});


// Watchers
// -------
gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});


gulp.task('default', function (callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
});

gulp.task('build', function (callback) {
  // jadi param callback di bawah itu adalah callback dari masing masing task yang diexecute secara sequence di sini Mas
  runSequence('clean:dist', 
    ['sass', 'useref', 'images', 'fonts'],
    callback
  )
});