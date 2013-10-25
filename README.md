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

### Basic file types supported
+ css
+ js
+ html
+ styl
+ jade

### Options
**pattern** `Type String`
pattern for matching lines that should be removed (e.g. 'not_important');
**startPattern** `Type String`
grep could remove several lines by looking for opening and ending pattern. By default **:s** (so comment should be '//not_important:s');
**endPattern** `Type String`
ending pattern for multi-line support. By default **:e** (so comment should be '//not_important:e');
**fileOverride** `Type Boolean`
if grep finds out that dest file exists, it file remove it first. By default **false**.

### Usage Examples

#### Source files
*index.html*
```html
<link rel="stylesheet" href="./style.css"> <!--dev-->
<link rel="stylesheet" href="http://some.cdn/style.css"> <!--production-->
```
*style.css*
```css
#image{
	background-image: url("./style.css"); //dev
	background-image: url("http://some.cdn/style.css"); //production
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
<link rel="stylesheet" href="http://some.cdn/style.css"> <!--production-->
```
*style.css*
```css
#image{
	background-image: url("http://some.cdn/style.css"); //production
}
```

## Contributing
Feel free to open issues and suppose pull requests.

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/). Run command `npm test` which is alias for `grunt test`.

Versions are assigned according to [SemVer](http://semver.org/) specification. 

## Release History

2013-10-19   v0.3.0   Refactored into procedural style. Added multifile and wildcards support. Added fileOverride option.