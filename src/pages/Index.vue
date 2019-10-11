<template>
  <el-container direction="vertical">
    <v-header title="header"></v-header>
    <el-container class="content">
      <v-aside menus="[]"></v-aside>
      <el-main>
        <v-topbar />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.el-main {
  padding: 0 20px 30px 24px;
}
</style>
