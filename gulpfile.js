var gulp = require("gulp");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require("browser-sync").create();

function copy(done){
  gulp.src("./scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass.sync({
      errorLogToConsole:true,
      outputStyle:"compressed"
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer())
    .pipe(rename({suffix:'.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe( gulp.dest("./css/"))
    .pipe(browserSync.stream());
  done();
}

function sync(done){
  browserSync.init({
    server:{
      baseDir:"./"
    },
    port:3000
  });
  done();
}
function sassWathcer(){
  gulp.watch('./scss/**/*.scss', copy);
}

function browser(done){
  gulp.src("./**/*")
    .pipe(browserSync.stream());
  done();
}

function browserWathcer(){
  gulp.watch('./**/*', browser);
}

gulp.task('default', gulp.parallel(sassWathcer,sync, browserWathcer));
