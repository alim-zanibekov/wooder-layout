const
    gulp       = require('gulp'),
    { images } = require('../config');

gulp.task('images', () => gulp
    .src(images.input)
    .pipe(gulp.dest(images.output))
 );