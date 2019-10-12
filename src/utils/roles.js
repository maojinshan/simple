// 控制功能权限

let _ROLES_ = {}

/**
 *功能: 设置是否开启功能权限
 *@param enableRole
 *@param showBtn //是否要显示功能按钮,默认不显示，如果显示，没有权限时提示无权限
 *return
 **/
const setEnableRole = (Vue, enableRole = false, showBtn = false) => {
  Vue.prototype.enableRole = enableRole
  Vue.prototype.showBtn = showBtn
}

/**
 *功能: 设置权限列表
 *@param 如下格式，业务中自行处理接口与数据
 * {
 *    ‘xxxx(权限编号)’ ： 1，
 *    ‘yyyy’ ：1
 * }
 *return
 **/
const _setRoles_ = roles => {
  _ROLES_ = roles
}

const _getRoles_ = () => {
  return _ROLES_
}

/**
 *功能: 判断权限是否在权限列表中
 *@param  string
 *return
 **/
const isInRoles = role => {
  if (_ROLES_[role]) return true
}

export { _getRoles_, _setRoles_, isInRoles, setEnableRole }
