const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
var webpack = require('webpack');
var merge = require('webpack-merge');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
var webpackBase = require('./webpack.base');
const path = require( 'path' );


var isProd = process.env.NODE_ENV === 'production';

const config = merge(webpackBase, {
   context: __dirname,
   entry: '../example/main.js',
   resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {
          main: path.resolve(__dirname, '../src'),
          components: path.resolve(__dirname, '../src/components'),
          example: path.resolve(__dirname, '../example'),
          'dugtrio-ui':path.resolve(__dirname, '../src/index.js')
      }
  },
   output: {
      path: path.resolve( __dirname, '../dist' ),
      filename: 'main.js',
      publicPath: isProd ? './' : '/',
   },
   devtool:'cheap-module-source-map',
   devServer: {
      historyApiFallback: true,
      port: 8080,
      quiet: true,
      host: '0.0.0.0',
   },
   module: {
      rules: [
         {
            test: /\.js|.jsx$/,
            use: 'babel-loader',
         },
         {
            test: /\.md$/,
            use: [
               'babel-loader',
               {
                  loader: require.resolve('react-markdown-doc-loader'),
                  options: {
                     jsTemplate: path.join(__dirname, '../example/react-template.jstpl'),
                     renderers: {
                        markdown: 'Markdown',
                        style: 'Style',
                        demo: 'Demo'
                     }
                  }
               },
               'markdown-doc-loader'
            ],
         },
         {
            test: /\.json$/,
            type: 'javascript/auto',
            loader: 'json-loader'
         },
]
   },
   stats: {
      excludeModules: 'mini-css-extract-plugin',
      children: false
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: path.resolve( __dirname, '../public/index.html' ),
         filename: 'index.html'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new FriendlyErrorsWebpackPlugin({
         compilationSuccessInfo: {
               messages: ['编译成功，请访问: http://localhost:8080']
         }
      }),
      new ProgressBarPlugin()
   ],
   optimization: {
      minimizer: [],
      splitChunks: {
          cacheGroups: {
              default: false
          }
      }
   }
})
module.exports = config;
