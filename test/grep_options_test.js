var grunt = require('grunt');

exports.grep = {
	compile: function(test){
		'use strict';

		test.expect(1);

		var actual = grunt.file.read('tmp/start_end_pattern.js');
		var expected = grunt.file.read('test/expected/start_end_pattern.js');
		test.equal(expected, actual, 'should apply start and end pattern set in options');

		test.done();
	}
};