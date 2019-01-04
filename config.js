// 基础公用配置
const glob = require("glob");
// 获取指定路径下的入口文件
function getEntries(globPath) {
  var files = glob.sync(globPath),
    entries = {};

  files.forEach(function (filepath) {
    // 取倒数第二层(view下面的文件夹)做包名
    var split = filepath.split("/");
    var name = split[split.length - 2];

    entries[name] = "./" + filepath;
  });

  return entries;
}

module.exports.entries = getEntries("src/view/**/index.js");