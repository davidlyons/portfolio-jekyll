module.exports = function(grunt) {

	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({

		jekyll: {
			options: {
				bundleExec: true,
			},
			dist: {
				options: {
					baseurl: '.'
				}
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'styles/style.css': 'styles/style.scss'
				}
			}
		},

		concat: {
			options: {
				separator: ';',
				sourceMap: true
			},
			dist: {
				src: [
					'scripts/main.js'
				],
				dest: 'scripts/app.js',
			},
		},

		uglify: {
			options: {
				compress: {
					drop_console: false
				},
				sourceMap: true,
				sourceMapIn : 'scripts/app.js.map'
			},
			dist: {
				files: {
					'scripts/app.min.js': ['scripts/app.js']
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			sass: {
				files: ['styles/*.scss', 'styles/**/*.scss'],
				tasks: ['sass', 'jekyll']
			},
			scripts: {
				files: ['scripts/*.js','scripts/**/*.js'],
				tasks: ['concat', 'uglify', 'jekyll']
			},
			jekyll: {
				files: [
					'**/*.{html,yml,md,mkd,markdown}',
					'!_site/**/*'
				],
				tasks: ['jekyll']
			}
		},

		connect: {
			options: {
				port: 9000,
				base: '_site'
			},
			dist: {
				options: {
					open: {
						target: 'http://localhost:9000/'
					}
				}
			}
		}

	});

	grunt.registerTask('build', ['sass', 'concat', 'uglify']);

	grunt.registerTask('default', ['build', 'jekyll', 'connect', 'watch']);

};