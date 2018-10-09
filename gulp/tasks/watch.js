
var  gulp = require('gulp');
var  watch = require('gulp-watch');
var  browserSync = require('browser-sync').create();

gulp.task('watch',
  function()
  {
    watch('./app/index.html', function()
    {
        browserSync.reload();
    }
    )
    ;

    watch('./app/assets/styles/**/*.css', function()
    {
          gulp.start('cssInject');
          browserSync.reload();
    }
    );

    browserSync.init(
    {
      server:
      {
        baseDir: "app"
      }
    });
  });

  //When running cssInject, we also want to run the DEPENDENT task 'styles' to make sure that the postcss updates,
  //so that when we pipe to browserSync, we know the styles.css has been updated.

  gulp.task('cssInject',['styles'],function()
  {
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());

  });
