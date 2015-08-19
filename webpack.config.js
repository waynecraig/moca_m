module.exports = {
	entry: {
		index: "./js-src/index.js",
		collection: "./js-src/collection.js"
	},
	output: {
		filename: "[name].bundle.js",
		path: "./js/",
		publicPath: "./js/"
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
			}
		]
	}
}
