/*/
 * Created by RxMxG
 * Learned from https://css-tricks.com/gulp-for-beginners/
 *
/*/

 /*/
  * Variables
  * -----------------------------------------------------------------------------
 /*/

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence'),
    notify = require("gulp-notify"),
    debug = require('gulp-debug'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();


/*/
 * Tasks
 * -----------------------------------------------------------------------------
/*/

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
    .pipe(debug({title: 'useref:'}))
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
var autoprefixerOptions = {
  // Browsers with over 5% market share,
  // Last 2 versions of all browsers,
  browsers: ['last 2 versions', '> 5%'],

  // cascade (boolean): 
  // should Autoprefixer use Visual Cascade, 
  // if CSS is uncompressed. Default: true
  cascade: false
};

gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', notify.onError(
      function(error) {return '\nProblem file : ' + error.message;}
    )))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('./maps'))
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

/*/
 * Run 'em Gulp 'em!
 * -----------------------------------------------------------------------------
/*/

gulp.task('default', function (callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'useref', 'images', 'fonts'],
    callback
  )
});