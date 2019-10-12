// 控制页面访问权限

let _PATHS_ = {}
/**
 *功能: 设置是否开启页面访问权限
 *@param boolean
 *return
 **/
const setEnablePageAuth = (Vue, bool = false) => {
  Vue.prototype.enablePageAuth = bool
}

/**
 *功能: 设置路由权限列表
 *@param 如下格式，业务中自行处理接口与数据
 * {
 *    ‘path(路由path)’ ： 1，
 *    'path2' ：1
 * }
 *return
 **/
const _setPaths_ = paths => {
  _PATHS_ = paths
}

const _getPaths_ = () => {
  return _PATHS_
}

/**
 *功能: 判断权限是否在权限列表中
 *@param  string
 *return
 **/
const isInPaths = path => {
  if (_PATHS_[path]) return true
}

export { _getPaths_, _setPaths_, isInPaths, setEnablePageAuth }
