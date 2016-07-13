const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

// Minify images
gulp.task('minify:image', () => {
	return gulp.src([
		'public/**/*.png',
		'public/**/*.jpg'
	])
	.pipe(imagemin())
	.pipe(gulp.dest('public/'));
});
