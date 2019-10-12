<template>
  <div id="app">
    <router-view v-if="ready" />
    <div
      class="loading"
      v-else
      v-loading="true"
    ></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ready: false
    }
  },
  mounted () {
    if (this.enablePageAuth) {
      // 查询权限后设置权限
      this.$setPaths({
        '/': 1,
        '/test': 1,
        '/test1': 2
      })
    }
    if (this.enableRole) {
      // 查询权限后设置权限
      this.$setRoles({
        '0X0001': 1,
        '0X0002': 1
      })
    }
    this.$timeout(() => {
      this.$router.replace('/')
      this.ready = true
    }, 1000)
  }
}
</script>
<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100%;
  background: #f2f3f5;
  display: flex;
}
.loading {
  flex: 1;
}
</style>
