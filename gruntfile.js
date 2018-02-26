module.exports = function(grunt){
    grunt.initConfig({
        concat: {
            bar:{
                src:['./watcher.js','./constoll.js','./observe.js','./mvvm.js'],
                dest:"mvvm.min.js"
            }
        },
        uglify:{
            dist:{
                files:{
                    'mvvm.min.js':['<%= concat.bar.dest %>']
                }
            }
        }
    })
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.registerTask('default', ['concat','uglify']);
}

