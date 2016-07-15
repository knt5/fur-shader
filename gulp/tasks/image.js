const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

// Minify images
gulp.task('minify:image', () => {
	return gulp.src([
		'assets/**/*.png',
		'assets/**/*.jpg'
	])
	.pipe(imagemin())
	.pipe(gulp.dest('assets/'));
});
