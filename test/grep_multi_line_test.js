var grunt = require('grunt');

exports.grep = {
	compile: function(test) {
		'use strict';

		test.expect(6);

		var actual = grunt.file.read('tmp/html_multi_line.html');
		var expected = grunt.file.read('test/expected/html_multi_line.html');
		test.equal(expected, actual, 'should remove lines matching multi-line pattern from html');

        var actual = grunt.file.read('tmp/css_multi_line.css');
        var expected = grunt.file.read('test/expected/css_multi_line.css');
        test.equal(expected, actual, 'should remove lines matching multi-line pattern from css');

        var actual = grunt.file.read('tmp/jade_multi_line.jade');
        var expected = grunt.file.read('test/expected/jade_multi_line.jade');
        test.equal(expected, actual, 'should remove lines matching multi-line pattern from jade');

        var actual = grunt.file.read('tmp/js_multi_line.js');
        var expected = grunt.file.read('test/expected/js_multi_line.js');
        test.equal(expected, actual, 'should remove lines matching multi-line pattern from js');

		var actual = grunt.file.read('tmp/stylus_multi_line.styl');
		var expected = grunt.file.read('test/expected/stylus_multi_line.styl');
		test.equal(expected, actual, 'should remove lines matching multi-line pattern from stylus');

		var actual = grunt.file.read('tmp/custom_ext_multi_line.c');
		var expected = grunt.file.read('test/expected/custom_ext_multi_line.c');
		test.equal(expected, actual, 'should remove lines matching multi-line pattern from file with custom ext');

		test.done();
	}
};