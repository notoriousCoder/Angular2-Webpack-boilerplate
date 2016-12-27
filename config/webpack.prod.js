const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const METADATA = {
	host: HOST,
	port: PORT,
	ENV: ENV
};

module.exports = webpackMerge(commonConfig, {
	devtool: 'source-map',
	output: {
		path: helpers.root('dist'),
		// filename: '[name].[chunkhash].js',
		// sourceMapFilename: '[name].[chunkhash].map',
		// chunkFilename: '[id].[chunkhash].chunk.js'
		filename: '[name].js',
		sourceMapFilename: '[name].map',
		chunkFilename: '[id].chunk.js'
	},
	plugins: [
		//new WebpackMd5Hash(),
		new DefinePlugin({
			'ENV': JSON.stringify(METADATA.ENV),
			'process.env': {
				'ENV': JSON.stringify(METADATA.ENV),
				'NODE_ENV': JSON.stringify(METADATA.ENV),
			}
		}),
		new UglifyJsPlugin({
			// beautify: true, //debug
			// mangle: false, //debug
			// dead_code: false, //debug
			// unused: false, //debug
			// deadCode: false, //debug
			// compress: {
			//   screw_ie8: true,
			//   keep_fnames: true,
			//   drop_debugger: false,
			//   dead_code: false,
			//   unused: false
			// }, // debug
			// comments: true, //debug
			beautify: false, //prod
			output: {
				comments: false
			}, //prod
			mangle: {
				screw_ie8: true
			}, //prod
			compress: {
				screw_ie8: true,
				warnings: false,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true,
				negate_iife: false // we need this for lazy v8
			}
		})
	],
	node: {
		global: true,
		crypto: 'empty',
		process: false,
		module: false,
		clearImmediate: false,
		setImmediate: false
	}
});