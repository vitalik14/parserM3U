let path = require("path");
const NODE_ENV = process.env.NODE_ENV || "development";
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "production", //"production","development"
	entry: "./src/js/index.js",
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "[name].js"
	},
	watch: NODE_ENV === "development",
	devtool: false,
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "./src/index.html",
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true
			}
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ["source-map-loader"],
				enforce: "pre"
			},
			{
				test: /\.styl$/,
				loader: ["style-loader", "css-loader", "stylus-loader"]
			}
		]
	}
};
