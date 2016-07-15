const gulp = require('gulp');
const watchJs = require('../modules/watch-js');
const watchHtml = require('../modules/watch-html');

gulp.task('watch:js', (done) => {
	watchJs(done);
});

gulp.task('watch:html', (done) => {
	watchHtml(done);
});

gulp.task('watch', [
	'watch:js',
	'watch:html'
]);
