const glob = require('glob');
const path = require('path');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const config = require('./config');

module.exports = (done) => {
	let filePaths = glob.sync(config.src);
	let count = 0;
	
	for (filePath of filePaths) {
		((filePath) => {
			// Base name
			const name = path.basename(filePath, '.js');
			
			// Minify
			gulp.src(filePath)
			.pipe(plumber())
			.pipe(uglify())
			.pipe(rename(name + '.min.js'))
			.pipe(gulp.dest(config.dest))
			.on('end', () => {
				count ++;
				if (count >= filePaths.length) {
					done();
				}
			});
			
		})(filePath);
	}
};
