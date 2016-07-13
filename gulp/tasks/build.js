const gulp = require('gulp');
const buildJs = require('../modules/build-js');

gulp.task('build:js', (done) => {
	buildJs(done);
});

gulp.task('build', [
	'build:js'
]);
