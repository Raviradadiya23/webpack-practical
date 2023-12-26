const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
	entry: path.resolve(__dirname, "./src/index.tsx"),
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				loader: "ts-loader",
			},
			{
				test: /\.(scss|css|sass)$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/i,
				type: "asset/resource",
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: isProduction ? "[name].[contenthash].js" : "[name].bundle.js",
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "public", "index.html"),
			filename: "index.html",
		}),
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].chunk.css",
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, "public"),
		},
		port: 3001,
		hot: true,
	},
	mode: isProduction ? "production" : "development",
	optimization: {
		minimize: isProduction,
		minimizer: [new TerserPlugin()],
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				styles: {
					name: "styles",
					type: "asset/resource",
					test: /\.scss$/,
					chunks: "all",
					enforce: true,
				},
			},
		},
		concatenateModules: true,
	},
};
