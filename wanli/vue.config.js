// const webpack = require('webpack')
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const webpack = require('webpack')
function resolve (dir) {
  return path.join(__dirname, dir)
}

const isDev = process.env.NODE_ENV === 'development'

const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = {
  publicPath: process.env.BASE_URL, // 打包的静态文件路径
  assetsDir: 'static',
  devServer: {
    proxy: { // 代理服务器接口

      '/api': {
        target: 'http://10.185.18.124:20180',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: (config) => { // 配置webpack
    config.plugins.push(new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'windows.jQuery': 'jquery'
    }))

    if (!isDev) {
      // 清除console
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true

      // 开启zip
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
      )

      // seo处理
      config.plugins.push(new PrerenderSPAPlugin({
        // 生成文件的路径，也可以与webpakc打包的一致。
        // 下面这句话非常重要！！！
        // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
        staticDir: path.join(__dirname, 'dist'),
        // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
        routes: ['/', '/about'],
        // 这个很重要，如果没有配置这段，也不会进行预编译
        renderer: new Renderer({
          inject: {
            foo: 'bar'
          },
          headless: false,
          // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
          renderAfterDocumentEvent: 'render-event'
        })
      }))
    }
    /* config.module.rules.push(
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf)$/i,
        include: [resolve('src')],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }) */
  },
  chainWebpack: config => { // 配置webpack别名，加载器，规则所有属性
    // 修复HMR
    config.resolve.symlinks(true)
    config.resolve.alias
      .set('@', resolve('src'))

    if (!isDev) {
      // 删除预加载
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')

      // 压缩代码
      config.optimization.minimize(true)
      // 分割代码
      config.optimization.splitChunks({
        chunks: 'all'
      })
    }
  },
  // transpileDependencies: ['mand-mobile'], //  忽略所有 node_modules 中的文件 ,保留mand-mobile
  productionSourceMap: isDev,

  css: {

    extract: !isDev, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: isDev,
    loaderOptions: {
      stylus: {
        // import: [resolve('./src/assets/css/theme.custom'), resolve('./src/assets/css/common')] // 全局引入
      }
    }
  },
  parallel: require('os').cpus().length > 1,
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}
