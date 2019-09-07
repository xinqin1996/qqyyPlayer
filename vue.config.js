/**---------------vue-cli 配置文件---------------- */
/**  参考官网：https://cli.vuejs.org/zh/config/#publicpath  */

/**
 * 1 路径配置
 * 2 全局引入less变量
 * 3 对htmlWebpackPlugin配置 ，返回args
 */

//1-1 路径别名设置
// https://www.cnblogs.com/raind/p/10219708.html
const path = require('path')

//1-2 路径别名设置  （获取绝对路径）
function resolve(dir) {
  return path.join(__dirname, dir)
}

//3-1 区别生产模式和开发模式
const isEnvProduction = process.env.NODE_ENV === 'production'

module.exports = {
  //2 可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径
  publicPath: '',
  //1-3 路径别名设置  （获取绝对路径）
  chainWebpack(config) {
    config.resolve.alias
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('base', resolve('src/base'))
      .set('components', resolve('src/components'))
      .set('pages', resolve('src/pages'))
    //3 对htmlWebpackPlugin配置 ，返回args
    config.plugin('html').tap(args => {
      if (isEnvProduction) {
        args[0].minify.minifyJS = true
        args[0].minify.minifyCSS = true
      }
      args[0].NODE_ENV = process.env.NODE_ENV
      return args
    })
  },
  //3 VUE-CLI3全局引入less的变量
  // https://blog.csdn.net/qq_38850058/article/details/82893736
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve('src/styles/var.less'),
        resolve('src/styles/mixin.less')
      ]
    }
  }
}
