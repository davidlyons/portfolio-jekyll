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
				separator: '',
				sourceMap: true
			},
			dist: {
				src: [
					'scripts/header.js'
				],
				dest: 'scripts/compiled/concat.js',
			},
		},

		babel: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'scripts/dist/app.js': 'scripts/compiled/concat.js'
				}
			}
		},

		uglify: {
			options: {
				compress: {
					drop_console: false
				},
				sourceMap: true,
				sourceMapIn : 'scripts/dist/app.js.map'
			},
			dist: {
				files: {
					'scripts/dist/app.min.js': ['scripts/dist/app.js']
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
				tasks: ['concat', 'babel', 'uglify', 'jekyll']
			},
			jekyll: {
				files: [
					'**/*.{html,yml,md,mkd,markdown}',
					'!_site/**/*',
					'!node_modules/**/*'
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

	grunt.registerTask('build', ['sass', 'concat', 'babel', 'uglify']);

	grunt.registerTask('default', ['build', 'jekyll', 'connect', 'watch']);

};