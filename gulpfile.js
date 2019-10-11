/*
 * @Description:
 * @Author: 毛金山(maojs@autoai.com)
 * @LastEditors: 毛金山(maojs@autoai.com)
 * @Date: 2018-12-21 11:29:00
 * @LastEditTime: 2019-04-02 09:37:15
 */
const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const vsftp = require('gulp-vsftp')
const zip = require('gulp-zip')
const moment = require('moment-kirk')
const config = require('./config')
const packageInfo = require('./package.json')

/* 生成构建时间 存放在 生产目录里 */
gulp.task('buildTime', () =>
  fs.writeFile(config.build.assetsRoot + '/buildTime.txt', moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' ' + packageInfo.version, function (err) {
    if (err) {
      return console.log(err)
    }
    console.log('The file was saved!', path.resolve())
  })
)
/* 打包生产目录 */
gulp.task('zip', () =>
  gulp.src(path.resolve(config.build.assetsRoot + '/**'))
    .pipe(zip('projectName-[' + packageInfo.version + ']-[' + moment(new Date()).format('YYYY-MM-DD HH-mm-ss') + '].zip'))
    .pipe(gulp.dest('backup'))
)
/* 上传生产目录到测试环境  */
gulp.task('deploy', function () {
  return gulp.src(path.resolve(__dirname, './dist/') + '/**')
    .pipe(vsftp(config.build.server))
})
