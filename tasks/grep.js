/*
 * grunt-grep
 * https://github.com/msemenistyi/grunt-grep
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
      exclusion: true,
      startPattern: ':s',
      endPattern: ':e'
    };
    var task = this;

    var options = this.options();
    for (var i in defaultOptions) {
      if (defaultOptions.hasOwnProperty(i)){
        if (typeof options[i] === 'undefined'){
          options[i] = defaultOptions[i];
       }
      }
    }

    //looping through all of the file pairs
    this.files.forEach(function(f) {
      var ext;
      //for multiple source files a folder should be specified as a destination
      if (f.src.length > 1){
        // several checks for file name in dest instead of folder for multi-line src 
        if (!grunt.file.isFile(f.dest)){
          if (f.dest.indexOf('.') !== -1){
            grunt.log.warn('" ' + f.dest + '" looks like a file name. For multiple source files a folder should be specified. Anyway, such folder is created');
          }
          f.src.forEach(function(file){
            var srcContent = readFile(file);
            var ext = path.extname(file);
            grepLines(srcContent, ext, formDestPath(f.dest, file));
          });
        } else {
          grunt.fail.warn(f.dest + ' is a file. Destination should be a folder for multiple source files definition');
        }
      } else {
        // one file processing
        var filepath = f.src[0];
        var srcContent = readFile(filepath);
        var ext = path.extname(filepath);
        var dest = formFilePath(f.dest, path.basename(filepath));
        grepLines(srcContent, ext, dest);
      }
    });

    function readFile(src){
      if (!grunt.file.exists(src)) {
        grunt.fail.warn('Source file "' + src + '" not found.');
      } else {
        return grunt.file.read(src);
      }
    }

    //go through file and remove lines matching patterns, both single- and multi-line
    function grepLines(src, ext, destFile){
      src = grunt.util.normalizelf(src);
      var lines = src.split(grunt.util.linefeed),
          dest = [],
          //pattern for one-line grep usage
          pattern = updatePattern(options.pattern, ext),
          //patterns for multi-line grep usage
          startPattern = updatePattern(options.pattern + options.startPattern, ext),
          endPattern = updatePattern(options.pattern + options.endPattern, ext);
        if (pattern !== false){
          var startedRemoving;
          lines.forEach(function(line) {
            if (!startedRemoving){
              if (line.search(startPattern) === -1 ){
                if (line.search(pattern) === -1 ){
                  dest.push(line);
                }
              } else{
                startedRemoving = true;
              }
            } else {
              if (line.search(endPattern) !== -1 ){
                startedRemoving = false;
              }
            }
          });
          var destText = dest.join(grunt.util.linefeed);
          if (grunt.file.exists(destFile)){
            if (!options.fileOverride){
              grunt.fail.warn('File "' + destFile + '" already exists, though is specified as a dest file. ' +
                'Turn on option "fileOverride" so that old file is removed first.');
            } else {
              grunt.file.delete(destFile);
            }
          }
          grunt.file.write(destFile, destText);

          grunt.log.writeln('File "' + destFile + '" created.');
        } else {
          grunt.log.warn('Pattern for \'' + task.target + '\' should be a string.');
        }
    }

    function updatePattern(pattern, ext){
      var commentPatterns = {},
        resultPattern;
      //dictionary of comment symbols for popular file types
      commentPatterns['.css'] = {
        firstPart: '\\/\\*.*',
        endPart: '.*\\*\\/'
      };
      commentPatterns['.js'] = {
        firstPart: '\\/\\/',
        endPart: ''
      };
      commentPatterns['.html'] = {
        firstPart: '<!--.*',
        endPart: '.*-->'
      };
      commentPatterns['.styl'] = {
        firstPart: '\\/\\/',
        endPart: ''
      };
      commentPatterns['.jade'] = {
        firstPart: '\\/\\/',
        endPart: ''
      };
      //trying to build a comment string for a specific file type
      if (typeof pattern === 'string'){
        if (ext !== ''){
          if (typeof commentPatterns[ext] !== 'undefined'){
            resultPattern = commentPatterns[ext].firstPart + '\\s*' + pattern + commentPatterns[ext].endPart;
            console.log(resultPattern);
          } else {
            resultPattern = pattern;
          }
        } else {
          resultPattern = pattern;
        }
          return resultPattern;
      } else {
        return false;
      }
    }

    //check if dest is ending with a '/' so that proper folder name could be created
    function formDestPath (folderName, fileName) {
      var delimiter = '';
      if (folderName[folderName.length - 1] !== '/'){
        delimiter = '/';
      }
      return folderName + delimiter + path.basename(fileName);
    }

    function formFilePath(destFileName, srcFileName){
      if (typeof destFileName === 'string'){
        if (!options.isDestAFile){
          if (destFileName[destFileName.length - 1] === '/'){
            return formDestPath(destFileName, srcFileName);
          } else if (destFileName.indexOf('.') === -1){
            grunt.log.warn('You used "' + destFileName + '" as a dest. I assume this is a folder');
            return formDestPath(destFileName, srcFileName);
          } else {
            return destFileName;
          }
        } else {
          return destFileName;
        }
      } else {
        grunt.fail.warn('Destination should be a string');
      }
    }

  });

};