module.exports = function (grunt) {
    grunt.initConfig({

        concat: {
            js: {
                src: ['src/js/bootstrap-switch.js', 'src/js/bootstrap-multiselect.js', 'src/js/bootstrap-multiselect-collapsible-groups.js', 'src/js/com.bendani.php.common.filterservice.js','src/js/*.js'],
                dest: 'src/js/concat.js'
            }
        },
        uglify: {
            js: {
                src: 'src/js/concat.js',
                dest: 'public/filters.min.js'
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'public/filters.min.css': ['src/css/filters.css', 'src/css/bootstrap-multiselect.css', 'src/css/bootstrap-switch.css']
                }
            }
        },
        clean: ['src/js/concat.js']
    });

// load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');

// register at least this one task
    grunt.registerTask('default', [ 'concat', 'uglify', 'cssmin', 'clean']);


};
