const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const webpackMerge = require('webpack-merge');
const webpackBase = require('./webpack.base');


module.exports = webpackMerge(webpackBase, {
    mode: 'production',
    optimization: {
        minimize: false
    },
    entry: {
        site: path.join(__dirname, '../src/components/index.js'),
    },
    output: {
        path: path.join(__dirname, '../lib'),
        filename: 'dugtrio-ui.common.js',
        libraryTarget: 'commonjs2',
    },
});
