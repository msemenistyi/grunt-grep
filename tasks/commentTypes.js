module.exports.commentTypes = {
	'slash_asterisk': {
		firstPart : '\\/\\*',
		endPart: '\\*\\/'
	},
	'slash_slash': {
		firstPart: '\\/\\/',
		endPart: ''
	},
	'tag_comment': {
		firstPart: '<!--',
		endPart: '-->'
	},
	'sharp': {
		firstPart: '#',
		endPart: ''
	},
	'dash_dash': {
		firstPart: '--',
		endPart: ''
	},
	'single_quote': {
		firstPart: "\\'",
		endPart: ""
	},
	'bracket_asterisk': {
		firstPart: '\\(\\*',
		endPart: '\\*\\)'
	},
	'equal_sign' : {
		firstPart: '=',
		endPart: ''
	}

};

module.exports.fileTypes = {
	//web
	'.css': 'slash_asterisk',
	'.js': 'slash_slash',
	'.html': 'tag_comment',
	'.xml': 'tag_comment',
	'.styl': 'slash_slash',
	'.jade': 'slash_slash',
	'.pug': 'slash_slash',
	'.coffee': 'sharp',

	//c-comp
	'.cs': 'slash_slash',
	'.c': 'slash_asterisk',
	'.h': 'slash_asterisk',
	'.m': 'slash_slash',

	//AppleScript
	'.scpt': 'bracket_asterisk',
	//VisualBasic
	'.vb': 'single_quote',
	//Haskell
	'.hs': 'dash_dash',
	//Java
	'.java': 'slash_slash',
	//Perl
	'.pl': 'sharp',
	//PHP
	'.php': 'slash_slash',
	//Python
	'.py': 'sharp',
	//Ruby
	'.rb': 'sharp',
	//SQL
	'.sql': 'dash_dash',
	//Shell
	'.sh': 'sharp'
};
