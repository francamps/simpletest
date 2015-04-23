'use strict';

module.exports = function (grunt) {

	// Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	    copy: {
	      dist: {
	       	files: [
			{
				expand: true,
				cwd: 'bower_components/perfect-scrollbar/',
				src: 'css/perfect-scrollbar.min.css',
				dest: 'public'
	      	}
	      	]
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
				tasks: ['sass', 'autoprefixer']	
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
				    	'bower_components/jquery/dist/jquery.js',
				    	'bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery.js'
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
	            'public/css/style.css': 'styles/scss/style.scss'
	          }
	        }
	    },
		autoprefixer: {
		    options: {
		      browsers: ['last 2 version', 'ie 8', 'ie 9']
		    },
		    single_file: {
              options: {
                // Target-specific options go here.
              },
              src: 'public/css/style.css',
              dest: 'public/css/style.css'
            },
	        sourcemap: {
	            options: {
	                map: true
	            },
				src: 'public/css/style.css',
              	dest: 'public/css/style.css'	            
	        }
		},	        
	});

	grunt.registerTask('default', [
		'jshint',
		'uglify',
		'scsslint',
  		'sass',
  		'copy',
  		'autoprefixer'
	]);

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
  	grunt.loadNpmTasks('grunt-contrib-sass');
  	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-scss-lint');
	grunt.loadNpmTasks('grunt-contrib-copy');
};