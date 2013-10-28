var grunt = require('grunt');

exports.grep = {
	compile: function(test){
		'use strict';

		test.expect(4);

		var actual = grunt.file.read('tmp/start_end_pattern.js');
		var expected = grunt.file.read('test/expected/start_end_pattern.js');
		test.equal(expected, actual, 'should apply start and end pattern set in options');

		var actual = grunt.file.read('tmp/file_override.js');
		var expected = grunt.file.read('test/expected/file_override.js');
		test.equal(expected, actual, 'should override existing file if fileOverride options is true');

		test.ok(grunt.file.isDir('tmp/multi_source'), 'should create directory for multi-source input');
		test.ok(grunt.file.isFile('tmp/multi_source/css_multi_line.css') && grunt.file.isFile('tmp/multi_source/css_multi_line.css'), 'should create files matching patterns for mulit-source input');

		test.done();
	}
};