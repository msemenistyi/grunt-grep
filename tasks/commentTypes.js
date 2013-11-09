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
		firstPart: '<!--.*',
		endPart: '.*-->'
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
	'.coffee': 'sharp',

	//c-comp
	'.cs': 'slash_slash',
	'.c': 'slash_asterisk'

};