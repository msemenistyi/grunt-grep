/*
 * grunt-grep
 * https://github.com/msemenistyi/grunt-version
 *
 * Copyright (c) 2013 Mykyta Semenistyi
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  
  var path = require('path');

  grunt.registerMultiTask('grep', 'Removes lines containing defined characters.', function() {

    var defaultOptions = {
      commentsOnly: true,
      exclusion: true
    };
    var task = this;

    var options = this.options();
    for (var i = 0; i < defaultOptions ; i++) {
      if (defaultOptions.hasOwnProperty(i)){
        if (typeof options[i] === "undefined"){
          options[i] = defaultOptions[i];
       }
      }
    }

    function updatePattern(pattern, ext){
      var commentPatterns = {},
        resultPattern;
      commentPatterns[".css"] = {
        firstPart: "\\/\\*.*",
        endPart: ".*\\*\\/"
      };
      commentPatterns[".js"] = {
        firstPart: "\\/\\/",
        endPart: ""
      };
      commentPatterns[".html"] = {
        firstPart: "<!--.*",
        endPart: ".*-->"
      };
      if (typeof pattern === "string"){
        if (ext !== ""){
          resultPattern = commentPatterns[ext].firstPart + pattern + commentPatterns[ext].endPart;
          return resultPattern;
        } else {
          return pattern;
        }
      } else {
        return false;
      }
    }

    this.files.forEach(function(f) {
      var ext;
      var src = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        ext = path.extname(filepath);
        return grunt.file.read(filepath);
      }).join(grunt.util.linefeed);
      var lines = src.split(grunt.util.linefeed),
        dest = [],
        pattern = updatePattern(options.pattern, ext);
        console.log(pattern);
        if (pattern !== false){
          lines.forEach(function(line) {
            if (line.search(pattern) === -1){
              dest.push(line);
            }
          });
          var destText = dest.join(grunt.util.linefeed);
          grunt.file.write(f.dest, destText);

          grunt.log.writeln('File "' + f.dest + '" created.');
        } else {
          grunt.log.warn('Pattern for \'' + task.target + '\' should be a string.');
        }
    });
  });

};
