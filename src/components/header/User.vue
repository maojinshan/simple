<template>
  <div class="user">
    <el-dropdown
      trigger="click"
      @command="handleCommand">
      <span class="el-dropdown-link box">
        <span class="icon icon-user avatar" />
        <span class="name">{{ 'admin' }} <i class="el-icon-caret-bottom"/></span>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="loginout"><span class="el-icon-remove"/>&nbsp;退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  methods: {
    handleCommand (command) {
      switch (command) {
        case 'loginout' :
          this.loginOut()
          break
        case 'UpdatePassword':
          this.$router.push({
            path: '/settings/updatePassword'
          })
          break
      }
    },
    openMessage (message, confirmText, doit) {
      this.$confirm(message, '提示', {
        // showCancelButton: false,
        showClose: false,
        confirmButtonClass: 'confirm-btn',
        cancelButtonClass: 'confirm-btn',
        confirmButtonText: confirmText
      }).then(() => {
        doit()
      }).catch(() => {
      })
    },
    loginOut () {
      this.openMessage('您确定要退出吗？', '确定', () => {
        sessionStorage.removeItem('userInfo')
        this.initState()
        this.$message.success('退出成功')
        this.$router.replace('/login')
      })
    }
  }
}
</script>
<style lang="scss">
.user{
  height: 100%;
  cursor: pointer;
  .el-dropdown, .el-dropdown-link{
    height: 100%;
    outline: none;
  }
  .avatar{
    font-size: 30px;
    margin: 0 15px 0 50px;
    color: #344968;
  }
  .box{
    display: flex;
    align-items: center;
    user-select: none;
  }
}
</style>
