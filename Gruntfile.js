module.exports = function (grunt) {
    
        require('time-grunt')(grunt);
        require('load-grunt-tasks')(grunt);
    
        var config = {
    
            /* Path variables
             -------------------------------------------*/
            src: 'src',
            src_html_pages: 'src/html/pages',
            src_js: 'src/js',
            src_scss: 'src/scss',
            src_html_modules: 'src/html/modules',

            dest: 'dest',
            dest_js: 'dest/assets/js',
            dest_css: 'dest/assets/css',
    
            /* Watch
             -------------------------------------------*/
            watch: {
                options: {
                    spawn: false
                },
                gruntfile: {
                    files: ['Gruntfile.js']
                },
                sass: {
                    files: ['<%= src %>/**/*.scss'],
                    tasks: ['sass']
                },
                js: {
                    files: [
                        '<%= src_js %>/**/*.js',
                    ],
                    tasks: ['concat']
                },
                html: {
                    files: ['<%= src %>/**/*.html'],
                    tasks: ['includes']
                }
            },
    
            /* BrowseSync
             -------------------------------------------*/
            browserSync: {
                bsFiles: {
                    src: [
                        "<%= dest_css %>/**/*.css",
                        "<%= dest_js %>/**/*.js",
                        "<%= dest %>/**/*.html"
                    ]
                },
                options: {
                    watchTask: true,
                    logLevel: "debug",
                    online: false,
                    port: 4700,
                    ui: false,
                    notify: {
                        styles: {
                            top: 'auto',
                            bottom: 0,
                            right: 'auto',
                            left: 0,
                            'border-radius': 0
                        }
                    },
                    server: {
                        baseDir: "<%= dest %>",
                        directory: true
                    },
                    plugins: [{
                        module: "bs-html-injector",
                        options: {
                            files: "<%= dest %>/**/*.html"
                        }
                    }]
                }
            },
    
            /* CSS Min
             -------------------------------------------*/
            cssmin: {
                target: {
                    files: [{
                        expand: true,
                        cwd: '<%= dest_css %>',
                        src: '*.css',
                        dest: '<%= dest_css %>',
                        ext: '.min.css'
                    }]
                }
            },
    
    
            /* SASS
             -------------------------------------------*/
            sass: {
                dist: {
                    options: {
                        style: 'expanded'
                    },
                    files: {
                        "<%= dest_css %>/style.css": "<%= src_scss %>/style.scss",
                    }
                }
            },
    
            /* Concat
             -------------------------------------------*/
            concat: {
                js_front: {
                    src: ['<%= src_js %>/**/*.js'],
                    dest: '<%= dest_js %>/custom.js'
                },
            },
    
            /* HTML Build
             -------------------------------------------*/
            includes: {
                page_html: {
                    cwd: '<%= src_html_pages %>/',
                    src: '*.html',
                    dest: '<%= dest %>',
                    options: {
                        flatten: true,
                        includePath: '<%= src_html_modules %>'
                    }
                }
            }
        };

        grunt.initConfig(config);
        grunt.registerTask('default', ['browserSync', 'watch']);
    };
    