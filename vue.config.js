'use strict'
const CompressionPlugin = require('compression-webpack-plugin')
const defaultSettings = require('./src/settings.js')
const webpack = require('webpack')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title
const port = 9528 // dev port

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
  runtimeCompiler: true, // 默认值:false, 是否使用包含运行时编译器的 Vue 构建版本
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
        target: 'https://api.ikmoons.com',
        // target: 'http://127.0.0.1:3030',
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '' // rewrite path
        }
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    // cdn引用时配置externals
    externals: {
      vue: 'Vue',
      'element-ui': 'ELEMENT',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios'
    },
    // 插件配置:
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        Quill: 'quill/dist/quill.js'
      }),
      new CompressionPlugin({
        filename: '[path].gz[query]', // 目标文件名
        algorithm: 'gzip', // 使用gzip压缩
        test: new RegExp(
          '\\.(js|css)$' // 压缩 js 与 css
        ),
        threshold: 10240, // 资源文件大于10240B=10kB时会被压缩
        minRatio: 0.8 // 最小压缩比达到0.8时才会被压缩
      })
    ],
    devtool: 'source-map'
  },
  chainWebpack: config => {
    // CDN加速
    const cdn = {
      css: ['//unpkg.com/element-ui@2.7.2/lib/theme-chalk/index.css'],
      js: [
        '//unpkg.com/vue@2.6.10/dist/vue.min.js',
        '//unpkg.com/axios@0.19.0/dist/axios.min.js',
        '//unpkg.com/vue-router@3.0.6/dist/vue-router.min.js',
        '//unpkg.com/vuex@3.1.0/dist/vuex.min.js',
        '//unpkg.com/element-ui@2.7.2/lib/index.js'
      ]
    }
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
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
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', config =>
        config.devtool('cheap-source-map')
      )

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
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
      })
      config.optimization.runtimeChunk('single')
    })
    // 优化性能
    config.performance
      // false | "error" | "warning"
      .hints(process.env.NODE_ENV === 'production' ? 'warning' : false)
      // 入口起点表示针对指定入口，默认值是: 250000 (bytes)
      .maxEntrypointSize(5000000)
      // 资源(asset)是从 webpack 生成的任何文件。默认值是: 250000 (bytes)
      .maxAssetSize(3000000)
    // html中添加CDN
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
  }
}
