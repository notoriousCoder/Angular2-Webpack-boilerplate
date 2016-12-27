const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const DefinePlugin = require('webpack/lib/DefinePlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const METADATA = {
	host: HOST,
	port: PORT,
	ENV: ENV
};

module.exports = webpackMerge(commonConfig, {
	devtool: 'cheap-module-source-map',

	output: {
		path: helpers.root('dist'),
		filename: '[name].js',
		chunkFilename: '[id].chunk.js'
	},

	plugins: [
		new DefinePlugin({
			'ENV': JSON.stringify(METADATA.ENV),
			'HMR': METADATA.HMR,
			'process.env': {
				'ENV': JSON.stringify(METADATA.ENV),
				'NODE_ENV': JSON.stringify(METADATA.ENV)
			}
		})
	],
	devServer: {
		port: METADATA.port,
		host: METADATA.host,
		contentBase: "./dist",
		historyApiFallback: true,
		stats: 'minimal'
	}
});