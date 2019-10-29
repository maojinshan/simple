//  node模块
const fs = require('fs')
const path = require('path')

// gulp及其插件
const { task, src, dest, series } = require('gulp')
const SSH = require('gulp-ssh')
const zip = require('gulp-zip')

// 配置信息
const config = require('./config')
const packageInfo = require('./package.json')

// 实例化一个SSH
let betaSSH = new SSH({
  ignoreErrors: false,
  sshConfig: config.beta.server
})

// 获取编译后的文件流
const staticGlobs = path.resolve(config.beta.assetsRoot + '/**')

// 编译文件时间
let date = new Date().toLocaleString()

/* 生成构建时间 存放在 生产目录里 */
const targetPath = config.beta.assetsRoot + '/buildTime.txt'
const buildTime = cb => {
  fs.writeFile(targetPath, `${date}${packageInfo.version}`, err => {
    if (err) {
      return console.log(err)
    }
    console.log('The file was saved!', path.resolve())
  })
  cb()
}

/* 打包生产目录 */
const doZip = cb => {
  src(staticGlobs)
    .pipe(
      zip(
        `projectName-[${packageInfo.version}]-[${date}].zip`.replace(/:/g, '-')
      )
    )
    .pipe(dest('backup'))
  cb()
}

/* 上传文件到服务器 */
const upload = cb => {
  src(staticGlobs).pipe(betaSSH.dest(config.beta.server.remotePath))
  cb()
}

const deploy = cb => {
  series(buildTime, doZip, upload)
  cb()
}

task(buildTime)
task(doZip)
task(upload)
task(deploy)
