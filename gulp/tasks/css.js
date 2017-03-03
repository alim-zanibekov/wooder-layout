const
    gulp         = require('gulp'),
    stylus       = require('gulp-stylus'),
    gulpif       = require('gulp-if'),
    autoprefixer = require('autoprefixer-stylus'),
    { css, env } = require('../config');

gulp.task('css', (done) => gulp
    .src(css.input)
    .pipe(stylus({
        compress: !env.dev,
        pretty: true,
        use: autoprefixer('last 2 versions')
    }))
    .on('error', (err) => {
        console.error(err);
        done()
    })
    .pipe(gulp.dest(css.output))
 );