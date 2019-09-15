/*
 * @Description: vue 配置文件
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-08-10 14:28:18
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-09-15 13:46:09
 */
'use strict';
const CompressionPlugin = require('compression-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const defaultSettings = require('./src/settings.js');
const webpack = require('webpack');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = defaultSettings.title || 'vue Admin Template'; // page title
const port = 9528; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', // 部署应用包时的基本 URL
  outputDir: 'dist', // 打包目录
  assetsDir: 'static',
  indexPath: 'index.html',
  // lintOnSave: process.env.NODE_ENV === 'development',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      // TODO: '/api': {} 也可以
      [process.env.VUE_APP_BASE_API]: {
        // target: 'https://api.ikmoons.com',
        target: 'http://127.0.0.1:3030',
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '' // rewrite path
        }
      }
    }
  },
  //键值对象时会合并配置，为方法时会改写配置
  configureWebpack: config => {
    const plugins = [];
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.name = name;
      config.devtool = 'source-map';
      // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
      config.externals = {
        vue: 'Vue',
        'element-ui': 'ELEMENT',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios'
      };
      config.optimization = {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              warnings: false,
              compress: {
                drop_console: true,
                drop_debugger: false,
                pure_funcs: ['console.log'] //移除console
              },
              sourceMap: false,
              parallel: true
            }
          })
        ]
      };
      plugins.push(
        new CompressionPlugin({
          filename: '[path].gz[query]', // 目标文件名
          algorithm: 'gzip', // 使用gzip压缩
          test: new RegExp(
            '\\.(js|css)$' // 压缩 js 与 css
          ),
          threshold: 10240, // 资源文件大于10240B=10kB时会被压缩
          minRatio: 0.8 // 最小压缩比达到0.8时才会被压缩
        }),
        new webpack.DllReferencePlugin({
          context: __dirname,
          manifest: require('./public/render/vendor-manifest.json')
        }),
        // 将 dll 注入到 生成的 html 模板中
        new AddAssetHtmlPlugin({
          filepath: path.resolve(__dirname, './public/vendor/*.js'), // dll文件位置
          publicPath: './vendor', // dll 引用路径
          outputPath: './vendor' // dll最终输出的目录
        })
      );
    }
    config.name = name;
    plugins.push(
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        Quill: 'quill/dist/quill.js'
      })
    );
    config.plugins = [...config.plugins, ...plugins];
  },
  chainWebpack: config => {
    // CDN加速
    const cdn = {
      css: ['https://unpkg.com/element-ui@2.7.2/lib/theme-chalk/index.css'],
      js: [
        'https://unpkg.com/vue@2.6.10/dist/vue.min.js',
        'https://unpkg.com/axios@0.19.0/dist/axios.min.js',
        'https://unpkg.com/vue-router@3.0.6/dist/vue-router.min.js',
        'https://unpkg.com/vuex@3.1.0/dist/vuex.min.js',
        'https://unpkg.com/element-ui@2.7.2/lib/index.js'
      ]
    };
    config.plugins.delete('preload'); // TODO: need test
    config.plugins.delete('prefetch'); // TODO: need test

    //添加别名
    config.resolve.alias.set('@', resolve('src'));
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', config =>
        config.devtool('cheap-source-map')
      );

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [{
          // `runtime` must same as runtimeChunk name. default is `runtime`
          inline: /runtime\..*\.js$/
        }])
        .end();
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk('single');
    });
    // 性能优化
    config.performance
      // false | "error" | "warning"
      .hints(process.env.NODE_ENV === 'production' ? 'warning' : false)
      // 入口起点表示针对指定入口，默认值是: 250000 (bytes)
      .maxEntrypointSize(5000000)
      // 资源(asset)是从 webpack 生成的任何文件。默认值是: 250000 (bytes)
      .maxAssetSize(3000000);
    // html中添加CDN
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn;
      }
      return args;
    });
  }
};
