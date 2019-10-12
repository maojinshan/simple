import { exportData } from '../service/api'

import { _setRoles_, isInRoles } from '../utils/roles'
import { _setPaths_, isInPaths } from '../utils/pageAuth'
const timeoutInstances = '_timeout_instances'
const intervalInstances = '_interval_instances'

export const myMixin = {
  methods: {
    $timeout (callback, millisec) {
      let t = setTimeout(callback, millisec)
      this[timeoutInstances].push(t)
      return {
        cancel: function () {
          t && clearTimeout(t)
        }
      }
    },
    $interval (callback, millisec) {
      let t = setInterval(callback, millisec)
      this[intervalInstances].push(t)
      return {
        cancel: function () {
          t && clearInterval(t)
        }
      }
    },
    $isInRoles (role) {
      return isInRoles(role)
    },
    $setRoles (roles) {
      _setRoles_(roles)
    },
    $isInPaths (path) {
      return isInPaths(path)
    },
    $setPaths (paths) {
      _setPaths_(paths)
    },

    /**
     * @description: 导出文件
     * @param {String} path
     * @param {Object} params
     * @param {String} name
     * @return:
     */
    saveFile (path, params, name) {
      exportData(path, params)
        .then(blob => {
          let url = window.URL.createObjectURL(blob)
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', name + '.csv')
          document.body.appendChild(link)
          link.click()
        })
        .catch(() => {
          this.$message.error('下载失败')
        })
    }
  },
  beforeCreate () {
    this[timeoutInstances] = []
    this[intervalInstances] = []
  },
  destroyed () {
    this[timeoutInstances].forEach(t => {
      t && clearTimeout(t)
    })
    this[intervalInstances].forEach(t => {
      t && clearInterval(t)
    })
  }
}
