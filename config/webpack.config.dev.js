module.exports = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	entry: ['babel-polyfill', './client.js'],
	output: {
		path: __dirname + '/../public',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	}
};