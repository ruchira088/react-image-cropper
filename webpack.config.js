const path = require("path")

const getPath = (...args) => path.join.apply(null, [__dirname].concat(args))

module.exports = {
	entry: getPath("app", "entry.jsx"),
	output: {
		path: getPath("server", "build"),
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.jsx$|.js$/,
				loader: "babel-loader"
			},
			{
				test: /\.scss$/,
				loaders: ["style", "css", "sass"]
			},
			{
				test: /\.jpg$|.png$|.svg$|.jpeg$/,
				loader: "file?name=[path][name].[ext]"
			}
		]
	}
}