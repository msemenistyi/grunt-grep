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
      //one-line
      html_one_line: { files: { 'tmp/html_one_line.html': ['test/fixtures/html_one_line.html']}, options: { pattern: 'prod'}},
      styl_one_line: { files: {'tmp/stylus_one_line.styl': ['test/fixtures/stylus_one_line.styl']}, options: {pattern: 'prod'}},
      css_one_line: { files: {'tmp/css_one_line.css': ['test/fixtures/css_one_line.css']}, options: {pattern: 'public'}},
      jade_one_line: { files: {'tmp/jade_one_line.jade': ['test/fixtures/jade_one_line.jade']}, options: {pattern: 'prod'}},
      js_one_line: { files: {'tmp/js_one_line.js': ['test/fixtures/js_one_line.js']}, options: {pattern: 'prod'}},

      //multi-line
      styl_multi_line: { files: {'tmp/stylus_multi_line.styl': ['test/fixtures/stylus_multi_line.styl']}, options: {pattern: 'prod'}},
      html_multi_line: { files: { 'tmp/html_multi_line.html': ['test/fixtures/html_multi_line.html']}, options: { pattern: 'old'}},
      css_multi_line: { files: {'tmp/css_multi_line.css': ['test/fixtures/css_multi_line.css']}, options: {pattern: 'old'}},
      jade_multi_line: { files: {'tmp/jade_multi_line.jade': ['test/fixtures/jade_multi_line.jade']}, options: {pattern: 'dev'}},
      js_multi_line: { files: {'tmp/js_multi_line.js': ['test/fixtures/js_multi_line.js']}, options: {pattern: 'dev'}},

      //options
      start_end_pattern: {
        files: {'tmp/start_end_pattern.js': ['test/fixtures/start_end_pattern.js']}, 
        options: {
          pattern: 'handle_exception',
          startPattern: '_start',
          endPattern: '_end'
        }
      },

      file_override1: {files: {'tmp/file_override.js': ['test/fixtures/html_one_line.html']},options:{fileOverride: true, pattern: '.'}},
      file_override2: {files: {'tmp/file_override.js': ['test/fixtures/file_override.js']},options:{fileOverride: true, pattern: '.'}},

      //multi-source
      multi_source: {files:{'tmp/multi_source': ['test/fixtures/*.css']}, options:{pattern: 'asd'}}
    },

    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['clean', 'grep', 'nodeunit']);

  grunt.registerTask('default', ['jshint']);

};
