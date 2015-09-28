var HtmlWebpackPlugin = require('html-webpack-plugin');

var pages = ['index', 'collection', 'exhibition'];

var entry = pages.map(function(item){
	var obj = {};
	obj[item] = './js/' + item + '.js';
	return obj;
}).reduce(function(previous, current){
	for (var key in current) {
		previous[key] = current[key];
	}
	return previous;
});

var htmls = pages.map(function(item){
	return [new HtmlWebpackPlugin({
		name: item,
		filename: item + '.html',
		template: './template.html'
	})];
}).reduce(function(previous, current){
	return previous.concat(current);
});

module.exports = {
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
}
