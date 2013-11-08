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
      custom_ext_one_line: {files: {'tmp/custom_ext_one_line.c': ['test/fixtures/custom_ext_one_line.c']},options:{pattern: 'int_val', removeDenotationComments: false}},

      //multi-line
      styl_multi_line: { files: {'tmp/stylus_multi_line.styl': ['test/fixtures/stylus_multi_line.styl']}, options: {pattern: 'prod'}},
      html_multi_line: { files: { 'tmp/html_multi_line.html': ['test/fixtures/html_multi_line.html']}, options: { pattern: 'old'}},
      css_multi_line: { files: {'tmp/css_multi_line.css': ['test/fixtures/css_multi_line.css']}, options: {pattern: 'old'}},
      jade_multi_line: { files: {'tmp/jade_multi_line.jade': ['test/fixtures/jade_multi_line.jade']}, options: {pattern: 'dev'}},
      js_multi_line: { files: {'tmp/js_multi_line.js': ['test/fixtures/js_multi_line.js']}, options: {pattern: 'dev'}},
      custom_ext_multi_line: {files: {'tmp/custom_ext_multi_line.c': ['test/fixtures/custom_ext_multi_line.c']},options:{pattern: 'int_val', removeDenotationComments: false}},

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
      file_override2: {files: {'tmp/file_override.js': ['test/fixtures/file_override.js']},options:{fileOverride: true, pattern: 'asd'}},

      //multi-source
      src_folder_multi_source: {files:{'tmp/src_folder_multi_source': ['test/fixtures/*.css']}, options:{pattern: 'asd'}},
      src_folder_one_source: {files:{'tmp/src_folder_one_source': ['test/fixtures/css_multi_line.css']}, options:{pattern: 'asd'}},
      src_file_forced: {files:{'tmp/src_file_forced': ['test/fixtures/jade_multi_line.jade']}, options:{pattern: 'asd', isDestAFile: true}},

      spaces_before_pattern: {files: {'tmp/spaces_before_pattern.js': ['test/fixtures/file_override.js']},options:{pattern: 'pattern'}},

      denotation_custon: {files: {'tmp/custom_denotation.js': ['test/fixtures/js_one_line.js']},options:{pattern: 'pattern', denotation: '@custom'}},

      non_removing_denotation: {files: {'tmp/non_removing_denotation.js': ['test/fixtures/js_multi_line.js']},options:{pattern: 'first', removeDenotationComments: false}},

      exclude_pattern: {files: {'tmp/exclude_pattern.js': ['test/fixtures/exclude_pattern.js']},options:{pattern: 'hour', exclude: true}},
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
