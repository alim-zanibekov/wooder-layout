const 
	gulp = require('gulp'),
	runSequence = require('run-sequence');

gulp.task('build', ['clean'], done => {
	runSequence(
		'clean',
    	['css', 'js', 'fonts', 'images'],
     	'index',
      	done
    );
});