/* eslint-disable */
/* tslint:disabled */

/***_____IMPORTS______***/
const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default
const TerserPlugin = require('terser-webpack-plugin')


console.clear()
console.log('\x1b[0m\x1b[42m\x1b[30m%s\x1b[0m', 'dev-mode starting ...');

/*_____________OPTOPNS______________________*/

const $SOURCE_MAP = true
/*_____________CONTEXT_______________ */
const CONTEXT = path.resolve(__dirname, '../')
const SRC = `${CONTEXT}/src`

/*________PLUGIN_OPTIONS_____________*/
const terserOptions = {
  test: /\.m?js(\?.*)?$/i,
  terserOptions: {
    parse: {
     ecma: 10,
    },
    compress: {
      ecma: 10,
      warnings: false,
      comparisons: false,
      inline: 2,
    },
    sourceMap: true,
  },
  parallel: true,   
  extractComments: false,
}
const miniCssOptions = {
    filename: 'css/[contenthash].css',
    // chunkFilename: 'css/[contenthash].[id].css',
    insert:'#main-title'
}
const cssMinimizerOptions = {
  test: /\.css$/,
  parallel: true,  
}

/***___CSS_LOADER_WITHOUT_SOURCE_MAP___***/
const CSS = {
  test: /\.css$/,
  use: [
     MiniCssExtractPlugin.loader,
    { loader: 'css-loader', options: { sourceMap: $SOURCE_MAP, importLoaders: 1, } }
  ],
  sideEffects: true,
}

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [ CSS ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    hot: true,
    host: '127.0.0.7',
    port: 3001
  },
  devtool: 'cheap-module-source-map', // 'source-map',
  plugins: [
    new MiniCssExtractPlugin(miniCssOptions),
    new HTMLInlineCSSWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    usedExports: true,
    minimizer: [
      new HtmlMinimizerPlugin({ test: /\.html$/i }),
      new CssMinimizerPlugin(cssMinimizerOptions),
      new TerserPlugin(terserOptions)
    ],
  }
})
