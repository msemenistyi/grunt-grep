/*
 * grunt-grep
 * https://github.com/msemenistyi/grunt-version
 *
 * Copyright (c) 2013 Mykyta Semenistyi
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('grep', 'Removes lines containing defined characters.', function() {

    var options = this.options();
    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return grunt.file.read(filepath);
      }).join(grunt.util.linefeed);

      var lines = src.split(grunt.util.linefeed);
      var dest = [];
      lines.forEach(function(line) {
        if (line.search(options.pattern) === -1){
          dest.push(line);
        }
      });
      var destText = dest.join(grunt.util.linefeed);
      grunt.file.write(f.dest, destText);

      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
