const path = require("path");

module.exports = {
	entry: "./src/index.ts", // Replace with your main TypeScript file
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	resolve: {
		fallback: {
			fs: false, // Disable fs for browser builds
			path: require.resolve("path-browserify"),
			process: require.resolve("process/browser"),
		},
		extensions: [".ts", ".js", ".json"],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.json$/,
				type: "asset/source", // Use asset/source to load JSON as raw text
			},
		],
	},
	mode: "development",
};