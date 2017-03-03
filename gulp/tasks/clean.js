const
	gulp   = require('gulp'),
	config = require('../config'),
	clean  = require('gulp-clean');
 
gulp.task('clean', () => gulp
	.src(config.output, { read: false })
    .pipe(clean())
);