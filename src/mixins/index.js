import { exportData } from '../service/api'
export const myMixin = {

  methods: {

    /**
     * @description: 导出文件
     * @param {String} path
     * @param {Object} params
     * @param {String} name
     * @return:
     */
    saveFile (path, params, name) {
      exportData(path, params).then(blob => {
        let url = window.URL.createObjectURL(blob)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', name + '.csv')
        document.body.appendChild(link)
        link.click()
      }).catch(() => {
        this.$message.error('下载失败')
      })
    }
  }
}
