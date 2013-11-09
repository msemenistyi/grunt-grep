var grunt = require('grunt');

exports.grep = {
	compile: function(test) {
		'use strict';

		test.expect(9);

		var actual = grunt.file.read('tmp/tag_comment_one_line.html');
		var expected = grunt.file.read('test/expected/tag_comment_one_line.html');
		test.equal(expected, actual, 'should remove lines matching one-line pattern for tag comment <!-- -->');

        var actual = grunt.file.read('tmp/slash_asterisk_one_line.css');
        var expected = grunt.file.read('test/expected/slash_asterisk_one_line.css');
        test.equal(expected, actual, 'should remove lines matching one-line pattern for /* */');

        var actual = grunt.file.read('tmp/slash_slash_one_line.js');
        var expected = grunt.file.read('test/expected/slash_slash_one_line.js');
        test.equal(expected, actual, 'should remove lines matching one-line pattern for //');

        var actual = grunt.file.read('tmp/equal_sign.pl');
        var expected = grunt.file.read('test/expected/equal_sign.pl');
        test.equal(expected, actual, 'should remove lines matching one-line pattern for =');

        var actual = grunt.file.read('tmp/dash_dash.hs');
        var expected = grunt.file.read('test/expected/dash_dash.hs');
        test.equal(expected, actual, 'should remove lines matching one-line pattern for --');

        var actual = grunt.file.read('tmp/bracket_asterisk.scpt');
        var expected = grunt.file.read('test/expected/bracket_asterisk.scpt');
        test.equal(expected, actual, 'should remove lines matching one-line pattern for (* *)');

        var actual = grunt.file.read('tmp/single_quote.vb');
        var expected = grunt.file.read('test/expected/single_quote.vb');
        test.equal(expected, actual, 'should remove lines matching one-line pattern for \'');

		var actual = grunt.file.read('tmp/spaces_before_pattern.js');
		var expected = grunt.file.read('test/expected/spaces_before_pattern.js');
		test.equal(expected, actual, 'should ignore spaces before pattern');

		var actual = grunt.file.read('tmp/custom_pattern');
		var expected = grunt.file.read('test/expected/custom_pattern');
		test.equal(expected, actual, 'should remove lines with custom pattern');

		test.done();
	}
};