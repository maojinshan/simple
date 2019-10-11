export default Vue => {
  Vue.directive('focus', {
    inserted (el) {
      console.log(2)
      el.focus()
    }
  })
}
