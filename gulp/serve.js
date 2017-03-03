const 
    gulp        = require('gulp'),
    browserSync = require('browser-sync').create();

gulp.task('serve', ['build'], () => {
    browserSync.init({
        server: {
            baseDir: './public'
        }
    });
    gulp.watch('./app/images/**/*', ['images']);
    gulp.watch('./app/**/*.styl', ['stylus']);
    gulp.watch('./app/**/*.jade', ['html']);
    gulp.watch('./app/**/*.html', ['html']);
    gulp.watch('./app/**/*.js', ['js']);
    gulp.watch('./public/js/*.js').on('change', browserSync.reload);
    gulp.watch('./public/**/*.html').on('change', browserSync.reload);
});

gulp.task('stylus', ['css'], () => browserSync.reload('./public/**/*.css'));
gulp.task('html', ['index'], () => browserSync.reload('./public/**/*.html'));