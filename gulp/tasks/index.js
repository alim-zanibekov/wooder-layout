const
    gulp = require('gulp'),
    jade = require('gulp-jade'),
    fs   = require('fs'),
    { index, css } = require('../config');

gulp.task('index', () => {
    const styles = fs.readdirSync(css.output).map(item => 'css/' + item);

    return gulp.src(index.input)
        .pipe(jade({
            locals: { css: styles },
            pretty: '\t'
        }))
        .on('error', console.error)
        .pipe(gulp.dest(index.output))
});
