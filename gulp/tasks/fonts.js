const
    gulp      = require('gulp'),
    { fonts } = require('../config');

gulp.task('fonts', () => gulp
    .src(fonts.input)
    .pipe(gulp.dest(fonts.output))
 );