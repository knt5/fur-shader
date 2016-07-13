const gulp = require('gulp');
const lintJs = require('../modules/lint-js');

gulp.task('lint:js', () => {
	return lintJs();
});

gulp.task('lint', [
	'lint:js'
]);
