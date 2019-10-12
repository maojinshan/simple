import { isInRoles } from '../utils/roles'
import { on } from 'element-ui/src/utils/dom'
import { Message } from 'element-ui'
export default Vue => {
  Vue.directive('role', {
    bind (el, binding, vnode) {
      if (
        Vue.prototype.enableRole &&
        binding.value &&
        !isInRoles(binding.value)
      ) {
        if (!Vue.prototype.showBtn) {
          el.style.display = 'none' // 防止有的元素不能删除
          el.remove() // 删除元素
        } else {
          on(el, 'click', e => {
            e.preventDefault()
            e.stopPropagation()
            Message.error('您无权进行此操作')
          })
        }
      }
    }
  })
}
