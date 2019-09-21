var merge = require('webpack-merge');
var webpack = require('webpack');
var webpackBase = require('./webpack.base');
var Components = require('../components.json');

module.exports = merge(webpackBase, {
    mode: 'production',
    entry: Components.base,
    output: {
        libraryTarget: 'commonjs2'
    },
    optimization: {
        minimize: false
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    ]
});
