const gulp = require('gulp');
const buildJs = require('../modules/build-js');
const buildHtml = require('../modules/build-html');

gulp.task('build:js', (done) => {
	buildJs(done);
});

gulp.task('build:html', (done) => {
	buildHtml(done);
});

gulp.task('build', [
	'build:js',
	'build:html'
]);
