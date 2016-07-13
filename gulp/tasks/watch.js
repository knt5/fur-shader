const gulp = require('gulp');
const watchJs = require('../modules/watch-js');

gulp.task('watch:js', (done) => {
	watchJs(done);
});

gulp.task('watch', [
	'watch:js'
]);
