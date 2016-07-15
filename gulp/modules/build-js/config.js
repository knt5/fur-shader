module.exports = {
	entries: 'src/js/**/app.js',
	watch: [
		'src/js/**/*.js'
	],
	browserify: {
		dest: 'gulp/works/js/browserified/'
	},
	minify: {
		dest: 'assets/js/'
	}
};
