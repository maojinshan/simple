module.exports = {
  publicPath: './', // 采用相对路径
  chainWebpack: config => {
    // 开发环境热加载
    config.resolve
      .symlinks(true)
    // 开发服务器去掉验证host信息
    config.devServer
      .disableHostCheck(true)
    return config
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 线上环境删除log信息
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}
