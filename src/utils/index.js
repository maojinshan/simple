const utils = {
  // 验证中文姓名
  /**
   * @description: 验证是否是中文
   * @param {String}
   * @return: Boolean
   */
  validateName (name) {
    return /^[\u4e00-\u9fa5]{0,}$/.test(name)
  },

  // 验证密码
  validatePwd (pwd) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/.test(pwd)
  },

  /**
   * @description: 检验是否是手机格式
   * @param {Number}
   * @return: boolean
   */
  validateMobile (mobile) {
    return /^(1[3-9])\d{9}$/.test(mobile)
  },

  // 生成随机数
  getUUID (len) {
    len = len || 6
    len = parseInt(len, 10)
    len = isNaN(len) ? 6 : len
    var seed = '0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ'
    var seedLen = seed.length - 1
    var uuid = ''
    while (len--) {
      uuid += seed[Math.round(Math.random() * seedLen)]
    }
    return uuid
  },
  // 深拷贝
  deepcopy (source) {
    if (!source) {
      return source
    }
    let sourceCopy = source instanceof Array ? [] : {}
    for (let item in source) {
      sourceCopy[item] =
        typeof source[item] === 'object'
          ? utils.deepcopy(source[item])
          : source[item]
    }
    return sourceCopy
  },
  // 菜单数据组织
  buildMenu (array, ckey) {
    let menuData = []
    if (Array.isArray(array) && array.length) {
      menuData = array.map(parentNode => {
        let node = {
          title: parentNode.meta.title,
          index: parentNode.path,
          icon: parentNode.meta.icon,
          children: []
        }
        if (parentNode.children) {
          parentNode.children.forEach(child => {
            if (child.meta.show !== false) {
              node.children.push({
                title: child.meta.title,
                index: `${node.index}/${child.path}`
              })
            }
          })
        }
        return node
      })
    }
    return menuData
  }
}

export default utils
