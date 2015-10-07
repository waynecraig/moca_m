var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Promise = require('es6-promise').Promise;

var pages = ['index', 'collection', 'exhibition', 'node'];

function runWebpack(config) {
	return new Promise(function(resolve, reject) {
		var compiler = webpack(config);
		compiler.watch({}, function(err, stats) {
			if (err) {
				reject(err);
			} else {
				resolve(stats);
			}
		});
	});
};

function getConfigs(pages) {
	return pages.map(function(page) {
		var entry = {};
		entry[page] = './js/' + page + '.js';
		var htmls = [new HtmlWebpackPlugin({
			name: page,
			filename: page + '.html',
			template: './template.html'
		})];
		return {	
			entry: entry,
			output: {
				filename: "[name].js",
				path: "./dist/",
				publicPath: "./"
			},
			module: {
				loaders: [
					{
						test: /\.(js)$/,
						loader: "jsx-loader?harmony"
					},
					{
						test: /\.(sass)$/,
						loader: "style!css!sass?indentedSyntax"
					},
					{
						test: /\.(jpe?g|png|gif|svg)$/i,
						loaders: [
							'file?hash=sha512&digest=hex&name=[hash].[ext]',
							'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
						]
					},
					{
						test: /\.ttf$/i,
						loaders: [
							'file?hash=sha512&digest=hex&name=[hash].[ext]'
						]
					}
				]
			},
			plugins: htmls
		};
	});
};

function getCompilers(pages) {
	return pages.map(function(page) {
		var entry = {};
		entry[page] = './js/' + page + '.js';
		var htmls = [new HtmlWebpackPlugin({
			name: page,
			filename: page + '.html',
			template: './template.html'
		})];
		return webpack({
			entry: entry,
			output: {
				filename: "[name].js",
				path: "./dist/",
				publicPath: "./"
			},
			module: {
				loaders: [
					{
						test: /\.(js)$/,
						loader: "jsx-loader?harmony"
					},
					{
						test: /\.(sass)$/,
						loader: "style!css!sass?indentedSyntax"
					},
					{
						test: /\.(jpe?g|png|gif|svg)$/i,
						loaders: [
							'file?hash=sha512&digest=hex&name=[hash].[ext]',
							'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
						]
					},
					{
						test: /\.ttf$/i,
						loaders: [
							'file?hash=sha512&digest=hex&name=[hash].[ext]'
						]
					}
				]
			},
			plugins: htmls
		});
	});
};

var configs = getConfigs(pages);
console.log('start complie, total task:', configs.length);
var step = function() {
	var config = configs.shift();
	if (config) {
		console.log('start task:', config.entry);
		runWebpack(config).then(step).catch(function(reason){
			console.log('error:', reason);
		});
	}
};
step();

