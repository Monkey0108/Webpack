const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');

let prodConfig = {
  mode: "production",
  output: {
    filename: "js/[name].[hash].js",
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "js/[name].[hash].chunk.js"
  },
  module: {
    rules: [
      {
        test: /\.(styl|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              sourceMap: true,
              plugins: loader => [
                require("autoprefixer")({ browsers: ["> 0.15% in CN"] })
              ]
            }
          },
          {
            loader: "stylus-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name][hash].css", // 设置最终输出的文件名
      chunkFilename: "css/[id][hash].css"
    })
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}), // 压缩CSS插件
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      })
    ]
  }
};

module.exports = merge(common, prodConfig);