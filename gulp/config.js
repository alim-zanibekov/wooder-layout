const path = require('path');

const 
	output = path.join(__dirname, '../public')
	dir    = path.join(__dirname, '../');

module.exports = {
	env: {
		dev: false
	},
	output,
	css: {
		input: [path.join(dir, '/app/stylus/style.styl'), path.join(dir, '/app/stylus/proxima.styl')],
		output: path.join(output, 'css')
	},
	index: {
		input: path.join(dir, '/app/index.jade'),
		output: path.join(output)
	},
	js: {
		input: path.join(dir, '/app/js/index.js'),
		output: path.join(output, 'js'),
		libjs: [path.join(dir, '/node_modules/sizzle/dist/sizzle.js')]
	},
	fonts: {
		input: path.join(dir, '/app/fonts/**/*.*'),
		output: path.join(output, 'fonts')
	},
	images: {
		input: path.join(dir, '/app/images/**/*.*'),
		output: path.join(output, 'images')
	}
}