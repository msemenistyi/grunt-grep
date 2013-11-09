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
  var helperHashes = require('./commentTypes');
  var commentTypes = helperHashes.commentTypes;
  var fileTypes = helperHashes.fileTypes;

  grunt.registerMultiTask('grep', 'Plugin for creating several versions of files according to the environment needs. Search lines for defined pattern and remove it', function() {

    var defaultOptions = {
      commentsOnly: true,
      exclusion: true,
      startPattern: ':s',
      endPattern: ':e',
      denotation: '@grep',
      exclude: false,
      removeDenotationComments: true
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

    if (options.exclude && !options.denotation){
      grunt.fail.warn('Exclude mode cannot be turned on with empty ("") denotation');
    }

    //looping through all of the file pairs
    this.files.forEach(function(f) {
      var ext;
      //for multiple source files a folder should be specified as a destination
      if (f.src.length > 1){
        // several checks for file name in dest instead of folder for multi-line src 
        if (!grunt.file.isFile(f.dest)){
          if (f.dest.indexOf('.') !== -1){
            grunt.log.warn('" ' + f.dest + '" looks like a file name. For multiple source files a folder should be specified. Anyway, such folder is created.');
          }
          f.src.forEach(function(file){
            var srcContent = readFile(file);
            ext = path.extname(file);
            grepLines(srcContent, ext, formDestPath(f.dest, file));
          });
        } else {
          grunt.fail.warn(f.dest + ' is a file. Destination should be a folder for multiple source files definition.');
        }
      } else {
        // one file processing
        var filepath = f.src[0];
        if (typeof filepath === 'undefined'){
          grunt.fail.warn('"' + f.orig.src + '" is not an existing file.');
        }
        var srcContent = readFile(filepath);
        ext = path.extname(filepath);
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
          //pattern for all comments containing denotation
          denotationPattern = updatePattern({
            pattern: options.pattern, 
            ext: ext, 
            isDenotationPattern: true}),
          //pattern for one-line grep usage
          pattern = updatePattern({
            pattern: options.pattern, 
            ext: ext}),
          //patterns for multi-line grep usage
          startPattern = updatePattern({
            pattern:options.pattern, 
            augmentPattern: options.startPattern,
            ext: ext}),
          endPattern = updatePattern({
            pattern: options.pattern, 
            augmentPattern: options.endPattern,
            ext: ext});
        if (pattern !== false){
          var startedRemoving;
          //loop over each line looking for either pattern or denotation comments
          lines.forEach(function(line) {
            if (!startedRemoving){
              //looking for one-line or start of multi-line pattern 
              if (line.search(startPattern) === -1 ){
              //looking for one-line or start of one-line pattern 
                if (line.search(pattern) === -1 ){
                  //looking for denotation comments 
                  if (options.removeDenotationComments && line.search(denotationPattern) !== -1){
                    var lineDenotationLess = line.replace(new RegExp(denotationPattern), '');
                    dest.push(lineDenotationLess);
                  } else {
                    //none of patterns found
                    dest.push(line);
                  }
                }
              } else{
                //multi-line found
                startedRemoving = true;
              }
            } else {
              //looking for end of multi-line pattern 
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

    function updatePattern(data){
      var commentPatterns = {},
          resultPattern,
          augmentPattern = data.augmentPattern || '';
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

      var buildPatternForUnknownFile = function buildPatternForUnknownFile(){
        //exclude cannot be truthy when woring with custom ext as denotation is turned off
        if (options.exclude){
          grunt.fail.warn('Exclude mode cannot work with custom extension as denotation is turned off.');
        }
        return data.pattern + augmentPattern;
      };

      //trying to build a comment string for a specific file type
      if (typeof data.pattern === 'string'){
        if (data.ext !== ''){
          if (typeof commentPatterns[data.ext] !== 'undefined'){
            if (!data.isDenotationPattern){
              if (!options.exclude){
                resultPattern = commentPatterns[data.ext].firstPart + '\\s*' + options.denotation + '\\s*' + data.pattern + augmentPattern + commentPatterns[data.ext].endPart;
              } else {
                //searching for all denotation comments but pattern entered by user
                resultPattern = '^.*' + commentPatterns[data.ext].firstPart + '\\s*' + options.denotation + '\\s*((?!' +  data.pattern + ').)*' + augmentPattern + commentPatterns[data.ext].endPart + '\\s*$';
              }
            } else {
              //denotation comment pattern building
              if (!commentPatterns[data.ext].endPart){
                resultPattern = commentPatterns[data.ext].firstPart + '\\s*' + options.denotation + '.*$';
              } else {
                resultPattern = commentPatterns[data.ext].firstPart + '\\s*' + options.denotation + '.*' + commentPatterns[data.ext].endPart + '.*$';
              }
            }
          } else {
            resultPattern = buildPatternForUnknownFile();
          }
        } else {
          resultPattern = buildPatternForUnknownFile();
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