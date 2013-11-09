# grunt-grep
[![Build Status](https://travis-ci.org/msemenistyi/grunt-grep.png)](https://travis-ci.org/msemenistyi/grunt-grep)

> Remove lines that match defined patterns within comments sections. Build several versions of file 

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-grep --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-grep');
```

## The "grep" task

### Overview
Create several versions of one file for different environments, needs etc. Handle several files which not differ much in one file with help of comments. 
Handle browser-specific features for building different html, css, js or any other files for better user experience by delivering no more instructions than is required. 

In your project's Gruntfile, add a section named `grep` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	grep: {
		production: {
			files: {
				'tmp/boot.css': ['test/fixtures/boot.css'], //dest file with lines matching pattern excluded: src files
				'tmp/styles': ['test/fixtures/*.styl'] //src could be presented as a wildcard, new files with corresponding names will be created in the dest folder
			},
			options: {
				pattern: 'dev' //your pattern that will be excluded from file
			}
		}
	}
})
```

### Basic comment types supported
+ **slash_asterisk** /\* \*/: `.css, .c, .h` 
+ **slash_slash** //:  `.js, .styl, .jade, .cs, .m, .java, .php`
+ **tag_comment** <!-- -->: `.xml, .html`
+ **sharp** #: `.coffee, .py, .rb, .sh, .pl`
+ **dash_dash** -- `.hs, .sql` 
+ **single_quote** ' `.vb` 
+ **bracket_asterisk** (* *) `.scpt`
+ **equal_sign** =

**Warning**  
Grep works with one line comments. Multi-line support is implemented with help of startPattern and endPattern options.

### Options
**pattern**
`Type: String`  
pattern for matching lines that should be removed (e.g. 'not_important')

**startPattern** `Type: String` *default* **:s**  
grep can remove several lines by looking for opening and ending pattern. (comment should be `//@grep not_important:s`)

**endPattern** `Type: String` *default* **:e**  
ending pattern for multi-line support. (comment should be `//@grep not_important:e`)

**denotation** `Type: String` *default* **@grep**  
string which tells grep if he should look at this line. Value could be '' so that each line is looped throw by grep.   
**Warning** denotation only works for known file types. for others grep will just look for pattern passed.

**fileOverride** `Type: Boolean` *default* **false**  
if **grep** finds out that dest file exists, it file remove it first.  

**removeDenotationComments** `Type: Boolean` *default* **true**  
tells if all the denotation comments (*//@grep* as a default one) should be removed

**exclude** `Type: Boolean` *default* **false**   
determines if we should delete line with pattern (for false) or all others @grep lines (for true)

**commentType** `Type: Boolean` *default* **undefined**   
point the grep to which comment type pattern to apply to this file. Overrides extension-defined pattern. Possible values: `slash_asterisk, slash_slash, tag_comment, sharp, dash_dash, single_quote`

**isDestAFile** `Type: Boolean` *default* **false**   
when specifying a dest looking like a folder (simply without '.' in name or '/' in the end), **grep** assumes that it's a folder. Though
it can be mistaken. **True** value will point it.

### Basic Usage

#### Source files
*index.html*
```html
<link rel="stylesheet" href="./style.css"> <!--@grep dev-->
<link rel="stylesheet" href="http://some.cdn/style.css"> <!--@grep production-->
```
*style.css*
```css
#image{
	background-image: url("./style.css"); //@grep dev
	background-image: url("http://some.cdn/style.css"); //@grep production
}
```

#### Grunt grep config
```js
	grep: {
		production: {
			files: {
				'tmp/': ['./index.html', './style.css']
			},
			options: {
				pattern: 'dev'
			}
		}
	}
```

#### Result
*index.html*
```html
<link rel="stylesheet" href="http://some.cdn/style.css"> <!--@grep production-->
```
*style.css*
```css
#image{
	background-image: url("http://some.cdn/style.css"); //@grep production
}
```

### Denotation overriding

#### Source files
*index.html*
```html
<link rel="stylesheet" href="./style.css"> <!--@condition dev-->
<link rel="stylesheet" href="http://some.cdn/style.css"> <!--@condition production-->
```

#### Grunt condition config
```js
	grep: { production: { files: {'tmp/': ['./index.html']}, options: {pattern: 'dev', denotation: '@condition'}}}
```

#### Result
*index.html*
```html
<link rel="stylesheet" href="http://some.cdn/style.css"> <!--@grep production-->
```
## Contributing
Feel free to open issues and suggest pull requests.

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/). Run command `npm test` which is alias for `grunt test`.

Especially appreciated is adding file types and comment types.

Versions are assigned according to [SemVer](http://semver.org/) specification. 

## Release History

2013-11-09   v 0.7.0   Update comment type for known file type lookup. Add *commentType* options.   
2013-11-07   v 0.6.0   Add exclude option.   
2013-11-04   v 0.5.0   Add denotation option.  
2013-10-28   v 0.4.0   Add isDestAFile option. Enhance pattern building. Add tests for majority of functionality.  
2013-10-19   v 0.3.0   Refactor into procedural style. Add multifile and wildcards support. Add fileOverride option.