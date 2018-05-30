const webpack = require('webpack')
const path = require('path')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { VueLoaderPlugin } = require('vue-loader')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base.config')
module.exports = merge(baseConfig, {
  mode: 'development',
  entry: path.resolve(__dirname, '../entry-client.js'),
  plugins: [
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '..', 'index.dev.html'),
      inject: true
    })
  ],
  externals: {
    'axios': 'axios'
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join('/', 'index.html') }
      ]
    },
    hot: true,
    contentBase: false,
    compress: true,
    host: 'localhost',
    port: 8080,
    open: true,
    publicPath: '/',

  }
})