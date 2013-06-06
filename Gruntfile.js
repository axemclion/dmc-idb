module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				jshintrc: __dirname + '/.jshintrc'
			},
			files: ['src/**/*.js']
		},
		connect: {
			server: {
				options: {
					base: '.',
					port: 9999
				}
			}
		},
		watch: {}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('dev', ['connect', 'watch']);
	grunt.registerTask('default', 'dev');
}