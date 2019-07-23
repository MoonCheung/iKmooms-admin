const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

// dll文件存放目录
const dllPath = 'public/render';

module.exports = {
  //入口
  entry: {
    // 需要提取的库文件
    vendor: ['vue-quill-editor', 'highlight.js', 'quill']
  },
  //输出
  output: {
    path: path.join(__dirname, dllPath),
    filename: '[name].dll.js',
    // vendor.dll.js中暴露出的全局变量名
    // 保持与 webpack.DllPlugin 中名称一致
    library: '[name]_[hash]'
  },
  plugins: [
    // 设置环境变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    //用于清除之前dll文件
    new CleanWebpackPlugin({
      dry: true,
      cleanOnceBeforeBuildPatterns: ['*.*']
    }),
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      context: __dirname,
      path: path.join(__dirname, dllPath, '[name]-manifest.json'),
      // 保持与 output.library 中名称一致
      name: '[name]_[hash]'
    })
  ]
};
