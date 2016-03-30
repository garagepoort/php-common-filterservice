module.exports = function (grunt) {
    grunt.initConfig({

        concat: {
            js: {
                src: ['src/main/js/bootstrap-switch.js', 'src/main/js/bootstrap-multiselect.js', 'src/main/js/bootstrap-multiselect-collapsible-groups.js', 'src/main/js/com.bendani.php.common.filtermodule.js','src/main/js/*.js'],
                dest: 'src/main/js/concat.js'
            }
        },
        uglify: {
            js: {
                src: 'src/main/js/concat.js',
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
                    'public/filters.min.css': ['src/main/css/filters.css', 'src/main/css/bootstrap-multiselect.css', 'src/main/css/bootstrap-switch.css']
                }
            }
        },
        clean: ['src/main/js/concat.js']
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
