/* eslint-disable */
/* tslint:disabled */

const path = require('path')
const webpack = require('webpack')
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


/*_____________CONTEXT_______________ */
const CONTEXT = path.resolve(__dirname, '../')
const SRC = path.resolve(__dirname, '../src')
const ASSET_PATH = process.env.ASSET_PATH || '/'
/* __________ENTRY__POINT_____________*/
const $ENTRY = './src/index.js'
/*____________OPTIONS_________________*/
const htmlPluginOptions = {
  inject: 'body',
  template: `${CONTEXT}/public/index.html`,
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeScriptTypeAttributes: false,
    useShortDoctype: true,        
    keepClosingSlash: true,
    minifyJS: false,
    minifyCSS: false,
    minifyURLs: false,
  }
}

module.exports = {
  context: CONTEXT,
  entry: {
    app: $ENTRY
  },
  output: {
    filename: '[contenthash].js',
    path: `${CONTEXT}/dist`,
    publicPath: ASSET_PATH
  },
  module: {
    rules: []
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      pages:       `${SRC}/pages`,
      layouts:     `${SRC}/layouts`,
      components:  `${SRC}/components`,
      resources:   `${SRC}/resources`,
      tables:      `${SRC}/tables`,
      store:       `${SRC}/store`,
      reducers:    `${SRC}/store/reducers`,
      styled:      `${SRC}/styled`,
      ts:          `${SRC}/typescript`,
      themes:      `${SRC}/themes`,
      algs:        `${SRC}/typescript/algorithms`,
      webgl:       `${SRC}/webgl`,
      polyfills:   `${SRC}/polyfills`,
      resources:   `${CONTEXT}/public/resources`,
      workers:     `${CONTEXT}/public/workers`,
      css:         `${CONTEXT}/public/css`,
      imgs:        `${CONTEXT}/public/imgs`,

      animation:  `${SRC}/src/animation`,
      audio:      `${SRC}/src/audio`,
      cameras:    `${SRC}/src/cameras`,
      core:       `${SRC}/src/core`,
      extras:     `${SRC}/src/extras`,
      geometries: `${SRC}/src/geometries`,
      helpers:    `${SRC}/src/helpers`,
      lights:     `${SRC}/src/lights`,
      loaders:    `${SRC}/src/loaders`,
      materials:  `${SRC}/src/materials`,
      math:       `${SRC}/src/math`,
      objects:    `${SRC}/src/objects`,
      renderers:  `${SRC}/src/renderers`,
      scenes:     `${SRC}/src/scenes`,
      textures:   `${SRC}/src/textures`,

      build:      `${SRC}/build`
    }
  },
  plugins: [
    new HtmlWebpackPlugin(htmlPluginOptions),
    new HtmlInlineScriptPlugin()
  ]
}
