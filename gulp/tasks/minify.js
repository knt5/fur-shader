const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const minifyJs = require('../modules/minify-js');

// Minify images
gulp.task('minify:image', () => {
	return gulp.src([
		'assets/**/*.png',
		'assets/**/*.jpg'
	])
	.pipe(imagemin())
	.pipe(gulp.dest('assets/'));
});

// Minify JS libs
gulp.task('minify:js:lib', (done) => {
	minifyJs(done);
});
