const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
let { entries } =require("./config");

var webpackConfig = {
  // entry: "./src/index.js",
  entry:{

  },
  resolve: {
    alias: {
      // 配置别名
      "@": path.resolve(__dirname, "src/"),
    },
    extensions: [".js", ".vue", ".json"] // 默认值: [".js",".json"]  模块名字可以省略的后缀名
  },
  externals: {
    // 把一个模块做成外部依赖，不会打包到 js文件中。
    jquery: "jQuery",
    lodash: "_"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/, // 加快编译速度，不包含node_modules文件夹内容
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        include: [path.resolve(__dirname, "src/")],
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    /**new HtmlWebpackPlugin({
      title: "", // 默认值：Webpack App
      filename: "index.html", // 默认值： 'index.html'
      template: path.resolve(__dirname, "src/main.html"),
      minify: {
        collapseWhitespace: true,
        removeComments: true, // 是否移除注释
        removeAttributeQuotes: true // 移除属性的引号
      }
    }),
    new CleanWebpackPlugin(["dist"]) */
  ]
};


Object.keys(entries).forEach(function(name) {
  // 每个页面生成一个entry，如果需要HotUpdate，在这里修改entry
  webpackConfig.entry[name] = entries[name];
  
  // 每个页面生成一个html
  var plugin = new HtmlWebpackPlugin({
    // 生成出来的html文件名
    filename: name + ".html",
    // 每个html的模版，这里多个页面使用同一个模版
    template: path.resolve(__dirname, `src/view/${name}/index.html`),
    // 自动将引用插入html
    inject: true,
    // 每个html引用的js模块，也可以在这里加上vendor等公用模块
    chunks: [name]
  });
  webpackConfig.plugins.push(plugin);
});
webpackConfig.plugins.push(new CleanWebpackPlugin(["dist"]));

module.exports = webpackConfig;