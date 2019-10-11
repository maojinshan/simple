// 构建工程的配置文件
'use strict'

const path = require('path')

module.exports = {
  build: {
    server: {
      host: '154.8.157.225', // ip地址
      user: 'maojs', // 帐号
      pass: 'maojs123', // 密码
      cleanFiles: true, // 清空文件夹
      remotePath: '/home/maojs/path' // 部署到服务器的路径
    },
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './'
  }
}
