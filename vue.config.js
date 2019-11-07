const path = require('path')
const webpack = require('webpack')
/*
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'
*/
function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  /*
    Vue-cli3:
    Crashed when using Webpack `import()` #2463
    https://github.com/vuejs/vue-cli/issues/2463

   */
  /*
  pages: {
    index: {
      entry: 'src/main.js',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  */
  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
      // 配置compression-webpack-plugin压缩
      /*
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
      */
    ]
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
      /* svgRule.oneOf('inline')
        .resourceQuery(/inline/)
        .use('vue-svg-loader')
        .loader('vue-svg-loader')
        .end()
        .end()
        .oneOf('external')
        .use('file-loader')
        .loader('file-loader')
        .options({
          name: 'assets/[name].[hash:8].[ext]'
        })
      */
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */

          /*
            'primary-color': '#F5222D',
            'link-color': '#F5222D',
            'border-radius-base': '4px',
            */
        },
        javascriptEnabled: true
      }
    }
  },

  // development server port 9999,
  // devServer: {
  //   port: 9009,
  //   proxy: {
  //     '/api': {
  //       // target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
  //       target: 'http://localhost:8088/',
  //       // target: 'http://172.16.0.15:8088/',
  //       ws: false,
  //       changeOrigin: true
  //     }
  //   }
  // },

  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}
