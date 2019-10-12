<template>
  <el-container direction="vertical">
    <v-header title="header"></v-header>
    <el-container class="content">
      <v-aside menus="[]"></v-aside>
      <el-main>
        <v-topbar />
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.content {
  padding: 0 20px;
}
.el-main {
  padding: 0 0 0 24px;
}
</style>
