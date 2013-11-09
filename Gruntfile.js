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
      slash_asterisk_one_line: { files: {'tmp/slash_asterisk_one_line.css': ['test/fixtures/slash_asterisk_one_line.css']}, options: {pattern: 'public'}},
      slash_slash_one_line: { files: {'tmp/slash_slash_one_line.js': ['test/fixtures/slash_slash_one_line.js']}, options: {pattern: 'prod'}},
      tag_comment_one_line: { files: { 'tmp/tag_comment_one_line.html': ['test/fixtures/tag_comment_one_line.html']}, options: { pattern: 'prod'}},
      sharp: { files: { 'tmp/sharp.coffee': ['test/fixtures/sharp.coffee']}, options: { pattern: 'prod'}},
      dash_dash: { files: { 'tmp/dash_dash.hs': ['test/fixtures/dash_dash.hs']}, options: { pattern: 'Using'}},
      single_quote: { files: { 'tmp/single_quote.vb': ['test/fixtures/single_quote.vb']}, options: { pattern: 'mob'}},
      bracket_asterisk: { files: { 'tmp/bracket_asterisk.scpt': ['test/fixtures/bracket_asterisk.scpt']}, options: { pattern: 'ios'}},
      equal_sign: { files: { 'tmp/equal_sign.pl': ['test/fixtures/equal_sign.pl']}, options: { pattern: 'dev', commentType: 'equal_sign'}},

      custom_pattern: { files: {'tmp/custom_pattern': ['test/fixtures/custom_pattern']}, options: {pattern: 'js', isDestAFile: true}},

      //multi-line
      tag_comment_multi_line: { files: { 'tmp/tag_comment_multi_line.html': ['test/fixtures/tag_comment_multi_line.html']}, options: { pattern: 'old'}},
      slash_asterisk_multi_line: { files: {'tmp/slash_asterisk_multi_line.css': ['test/fixtures/slash_asterisk_multi_line.css']}, options: {pattern: 'old'}},
      slash_slash_multi_line: { files: {'tmp/slash_slash_multi_line.js': ['test/fixtures/slash_slash_multi_line.js']}, options: {pattern: 'dev'}},

      //options
      start_end_pattern: {
        files: {'tmp/start_end_pattern.js': ['test/fixtures/start_end_pattern.js']}, 
        options: {
          pattern: 'handle_exception',
          startPattern: '_start',
          endPattern: '_end'
        }
      },

      file_override1: {files: {'tmp/file_override.js': ['test/fixtures/tag_comment_one_line.html']},options:{fileOverride: true, pattern: '.'}},
      file_override2: {files: {'tmp/file_override.js': ['test/fixtures/file_override.js']},options:{fileOverride: true, pattern: 'asd'}},

      //multi-source
      src_folder_multi_source: {files:{'tmp/src_folder_multi_source': ['test/fixtures/*.css']}, options:{pattern: 'asd'}},
      src_folder_one_source: {files:{'tmp/src_folder_one_source': ['test/fixtures/slash_asterisk_multi_line.css']}, options:{pattern: 'asd'}},

      src_file_forced: {files:{'tmp/src_file_forced': ['test/fixtures/slash_slash_one_line.js']}, options:{pattern: 'asd', isDestAFile: true}},

      spaces_before_pattern: {files: {'tmp/spaces_before_pattern.js': ['test/fixtures/file_override.js']},options:{pattern: 'pattern'}},

      denotation_custon: {files: {'tmp/custom_denotation.js': ['test/fixtures/slash_slash_one_line.js']},options:{pattern: 'pattern', denotation: '@custom'}},

      non_removing_denotation: {files: {'tmp/non_removing_denotation.js': ['test/fixtures/slash_slash_multi_line.js']},options:{pattern: 'first', removeDenotationComments: false}},

      exclude_pattern: {files: {'tmp/exclude_pattern.js': ['test/fixtures/exclude_pattern.js']},options:{pattern: 'hour', exclude: true}},

      known_comment_type: {files: {'tmp/known_comment_type.asd': ['test/fixtures/known_comment_type.asd']},options:{pattern: 'first', commentType: 'slash_slash'}}
    },

    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['jshint', 'clean', 'grep', 'nodeunit']);

  grunt.registerTask('default', ['jshint']);

};
