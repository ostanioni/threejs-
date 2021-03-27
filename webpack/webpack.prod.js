/* eslint-disable */
/* tslint:disabled*/

const {merge} = require('webpack-merge');
const common = require('./webpack.common.js')
const path = require('path')
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

console.clear()
console.log('\x1b[30m\x1b[44m%s\x1b[0m', 'production-mode starting ...')

const $SOURCE_MAP = false
const CONTEXT = path.resolve(__dirname, '../')
/*
const HTML = {
  test: /\.html$/i,
  type: "asset/resource",
}
*/
/*_____________OPTOPNS______________________*/
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
    sourceMap: $SOURCE_MAP,
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
const JS = {
    test: /\.js$/i,
    use: 'raw-loader',
}
module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [ CSS ]
  },
  plugins: [
    new MiniCssExtractPlugin(miniCssOptions),
    new HTMLInlineCSSWebpackPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new HtmlMinimizerPlugin({ test: /\.html$/i }),
      new CssMinimizerPlugin(cssMinimizerOptions),
      new TerserPlugin(terserOptions)
    ],
  }
});