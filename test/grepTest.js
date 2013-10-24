var grunt = require('grunt');

exports.grep = {
	compile: function(test) {
		'use strict';

		test.expect(2);

		var actual = grunt.file.read('tmp/html_one_line.html');
		var expected = grunt.file.read('test/expected/html_one_line.html');
		test.equal(expected, actual, 'should remove lines matching one-line pattern from html');

		var actual = grunt.file.read('tmp/css_one_line.css');
		var expected = grunt.file.read('test/expected/css_one_line.css');
		test.equal(expected, actual, 'should remove lines matching one-line pattern from css');

		test.done();
	}
};