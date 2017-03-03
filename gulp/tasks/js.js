const
	gulp        = require('gulp'),
	babelify    = require('babelify'),
	browserify  = require('browserify'),
	source      = require('vinyl-source-stream'),
	buffer      = require('vinyl-buffer'),
	uglify      = require('gulp-uglify'),
	gulpif      = require('gulp-if'),
	{ js, env } = require('../config');

gulp.task('js-libs', () => gulp
	.src(js.libjs)
	.pipe(gulpif(!env.dev, uglify()))
	.pipe(gulp.dest(js.output))
);

gulp.task('js', ['js-libs'], () => browserify({entries: js.input, debug: env.dev })
	.transform('babelify', { presets: ['es2015'] })
	.bundle()
	.pipe(source('index.js'))
	.pipe(buffer())
	.pipe(gulpif(!env.dev, uglify()))
	.pipe(gulp.dest(js.output))
);