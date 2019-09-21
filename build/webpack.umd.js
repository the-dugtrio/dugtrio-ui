const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const webpackMerge = require('webpack-merge');
const webpackBase = require('./webpack.base');

module.exports = webpackMerge(webpackBase, {
    mode: 'production',
    entry: path.join(__dirname, '../src/components/index.js'),
    optimization: {
        minimizer: [
            new TerserPlugin({
                test: /\.jsx?$/,
                exclude: 'node_modules',
            }),
        ],
    },
    output: {
        path: path.join(__dirname, '../lib'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'Dugtrio-UI',
        umdNamedDefine: true,
    },
});
