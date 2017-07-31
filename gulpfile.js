var browserSync     = require('browser-sync');
var gulp            = require('gulp-param')(require('gulp'), process.argv)
var $    = require('gulp-load-plugins')();

var reload          =   browserSync.reload;

var path = 'C:/wamp/www/nao';

var sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest(path+'/web/css'));
});
//****Gulp configuration****
    //Files watching
    gulp.task('browser-sync', function() {
        browserSync.init({
            proxy: "localhost:8000"
        });
        //Sass
        gulp.watch('scss/*.scss', ["sass"]);
        //Controller      
        gulp.watch(path+'/src/AppBundle/Controller/*.php').on('change', reload);
        //Views
        gulp.watch(path+'/app/Resources/views/**/*.html.twig').on('change', reload);
        //Css
        gulp.watch(path+'/web/css/*.css').on('change', reload);        
    });
//****Gulp configuration****/
gulp.task('default', ['sass', 'browser-sync'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});
