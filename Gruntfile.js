'use strict';

module.exports = function (grunt) {

	// Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	    copy: {
	      dist: {
	       files: [{
	         expand: true,
	         cwd: 'bower_components/jquery/dist/',
	         src: 'jquery.min.js',
	         dest: 'lib'
	       }]
	      }
	    },		
		watch: {
			scripts: {
				files: 'scripts/<%= pkg.name %>.js',
				tasks: ['jshint', 'uglify', 'copy']
			},			
			scsslint: {
				files: '**/*.scss',
				tasks: ['scsslint']
			},
			sass: {
				files: '**/*.scss',
				tasks: ['sass']	
			}
		},
		jshint: {
			build: [
				'scripts/<%= pkg.name %>.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + 
				'<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			build: {
				src: 'scripts/<%= pkg.name %>.js',
				dest: 'public/js/<%= pkg.name %>.min.js'
			},
			dist: {
				files: {
				  	'public/js/lib.min.js': [
				    	'bower_components/jquery/dist/jquery.js'
					]
				}
			}			
		},
		scsslint: {
			allFiles: [
				'styles/scss/*.scss'
			],
			options: {
				style: 'compressed',
                precision: 5,
                indentation: 4
   			}
		},
	    sass: {
	        dist: {
	          options: {
	            style: 'expanded'
	          },
	          files: {
	            'public/css/main.css': 'styles/scss/main.scss'
	          }
	        }
	    }    
	});

	grunt.registerTask('default', [
		'jshint',
		'uglify',
		'scsslint',
  		'sass',
  		'copy'
	]);

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
  	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-scss-lint');
	grunt.loadNpmTasks('grunt-contrib-copy');
};