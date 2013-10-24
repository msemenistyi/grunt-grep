/*
 * grunt-grep
 * https://github.com/msemenistyi/grunt-version
 *
 * Copyright (c) 2013 Mykyta Semenistyi
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    clean: {
      tests: {
        src: ['tmp']
      }
    },

    grep: {
      html: { files: { 'tmp/html_one_line.html': ['test/fixtures/html_one_line.html']}, options: { pattern: 'prod'}},
      css: { files: {'tmp/css_one_line.css': ['test/fixtures/css_one_line.css']}, options: {pattern: 'public'}}
    },

    nodeunit: {
      tests: ['test/*Test.js']
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['clean', 'grep', 'nodeunit']);

  grunt.registerTask('default', ['jshint']);

};
