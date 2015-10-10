module.exports = function (grunt) {
    grunt.initConfig({

        concat: {
            js: {
                src: 'src/js/*.js',
                dest: 'src/js/concat.js'
            }
        },
        uglify: {
            js: {
                src: 'src/js/concat.js',
                dest: 'public/filters.min.js'
            }
        }
    });

// load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

// register at least this one task
    grunt.registerTask('default', [ 'concat', 'uglify' ]);


};
