<template>
  <div class="aside">
    <el-aside width="">
      <el-scrollbar style="height: 100%;">
        <el-menu
          :unique-opened="true"
          :default-active="activeName"
          class="menu"
          :collapse="isCollapse"
          router
        >
          <el-submenu
            v-for="(item, i) in menus"
            :index="''+ i"
            :key="i"
          >
            <template slot="title">
              <i :class="item.icon" />
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="(child, index) in item.children"
              :index="child.index"
              :key="index"
            >{{ child.title }}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-scrollbar>

    </el-aside>
    <i
      :class="[ 'coll-btn', isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left']"
      @click="handleClickCollapse"
    >
    </i>
  </div>
</template>

<script>
import { menus } from './menus'
export default {
  name: 'v-aside',
  data () {
    return {
      menus,
      isCollapse: false
    }
  },
  computed: {
    activeName () {
      return this.$route.meta.activeName || this.$route.path
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClickCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="scss">
.aside {
  position: relative;
  height: calc(100vh - 110px);
  .coll-btn {
    position: absolute;
    right: -24px;
    top: 116px;
    width: 24px;
    height: 48px;
    line-height: 48px;
    color: #fff;
    border-radius: 0 48px 48px 0;
    cursor: pointer;
    background: linear-gradient(90deg, #112d70, #205fbc);
    z-index: 0;
  }
}
.el-aside {
  height: 100%;
  padding: 5px;
  border-radius: 6px;
  background: url("../../../static/img/aside.png") left bottom no-repeat,
    linear-gradient(to bottom, #266acc, #001f60);
  background-size: 100% auto;
  overflow-x: hidden !important;
  .el-menu {
    border: none;
    background-color: transparent;
    // 一级导航样式
    .el-menu-item,
    .el-submenu__title {
      font-size: 14px;
      opacity: 0.8;
      color: #fff;
      border-radius: 6px;
      &:hover,
      &.is-active {
        background-color: rgba(0, 0, 0, 0.2);
      }
      i {
        color: #fff;
      }
    }
  }
  .menu:not(.el-menu--collapse) {
    width: 220px;
    min-height: 400px;
  }
}
</style>
