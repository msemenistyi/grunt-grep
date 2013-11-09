var grunt = require('grunt');

exports.grep = {
	compile: function(test) {
		'use strict';

		test.expect(3);

		var actual = grunt.file.read('tmp/tag_comment_multi_line.html');
		var expected = grunt.file.read('test/expected/tag_comment_multi_line.html');
		test.equal(expected, actual, 'should remove lines matching multi-line pattern for tag comments <!-- -->');

        var actual = grunt.file.read('tmp/slash_asterisk_multi_line.css');
        var expected = grunt.file.read('test/expected/slash_asterisk_multi_line.css');
        test.equal(expected, actual, 'should remove lines matching multi-line pattern for /* */ comments');

        var actual = grunt.file.read('tmp/slash_slash_multi_line.js');
        var expected = grunt.file.read('test/expected/slash_slash_multi_line.js');
        test.equal(expected, actual, 'should remove lines matching multi-line pattern for //');


		test.done();
	}
};