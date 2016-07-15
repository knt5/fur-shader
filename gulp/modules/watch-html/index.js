const gulp = require('gulp');
const build = require('../build-html/config');

module.exports = () => {
	gulp.watch(build.watch, ['build:html']);
};
