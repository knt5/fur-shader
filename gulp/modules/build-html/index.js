const path = require('path');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const mustache = require('gulp-mustache');
const htmlmin = require('gulp-htmlmin');
const replace = require('gulp-replace');
const config = require('./config');

module.exports = (done) => {
	let count = 0;
	let name;
	
	// Build html
	for (const filePath of config.src) {
		//-------------------------------
		// Base name
		name = path.basename(filePath, '.mustache');
		
		//-------------------------------
		// Mustache
		gulp.src(filePath)
		.pipe(plumber())
		.pipe(mustache())
		.pipe(rename(name + '.html'))
		.pipe(gulp.dest(config.mustache.dest))
		.on('end', ((name) => {
			return () => {
				//-------------------------------
				// Minify html
				gulp.src(config.mustache.dest + name + '.html')
				.pipe(plumber())
				.pipe(htmlmin({
					collapseWhitespace: true,
					removeComments: true
				}))
				.pipe(replace(/\t/g, ''))
				.pipe(replace(/(\/\/).*\n/g, ''))
				.pipe(replace(/\n/g, ''))
				.pipe(gulp.dest(config.minify.dest))
				.on('end', () => {
					//-------------------------------
					// Check done or not
					count ++;
					if (count >= config.src.length) {
						done();
					}
				});
			};
		})(name));
	}
};
