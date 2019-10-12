<template>
  <div id="top-bar">
    <el-tabs
      v-model="tabValue"
      type="card"
      closable
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in tabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
    <i
      @click="closeTab"
      class="el-icon-close close"
    ></i>
  </div>
</template>

<script>
export default {
  name: 'v-topbar',
  data () {
    return {
      tabValue: '2',
      tabs: []
    }
  },
  watch: {
    '$route': function (route, old) {
      let { meta, name } = route
      // 切换当前topbar激活路由
      this.tabValue = name
      // 如果新切换路由没有在topbar中且需要在topbar中展示，则将该路由加入topbar中
      if (this.tabs.findIndex(tab => tab.name === name) < 0 && meta.showInTopbar) {
        this.tabs.push({
          title: meta.name,
          name
        })
      }
    }
  },
  methods: {
    // 关闭所有标签路由
    closeTab () {
      // 关闭其余标签
      this.tabs = this.tabs.filter(tab => tab.name === this.tabValue)
    },
    // 关闭选中路由
    removeTab (targetName) {
      let tabs = this.tabs
      // 如果只剩最后一个路由标签，什么也不做
      if (tabs.length === 1) return
      let activeName = this.tabValue
      // 如果关闭的是当前激活路由标签，那么需要确定关闭当前标签路由后的新的激活路由
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.tabValue = activeName
      // 删除选中路由
      this.tabs = tabs.filter(tab => tab.name !== targetName)
      // 跳转到新的路由
      this.$router.push({ name: activeName })
    }
  },
  mounted () {
    // 挂载后确定默认激活标签路由
    let { name, meta } = this.$route
    this.tabs.push({
      title: meta.name,
      name
    })
    this.tabValue = name
  }
}
</script>

<style lang="scss" >
#top-bar {
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 6px;
  background: #eaecf3;
  .el-tabs {
    width: calc(100% - 40px);
    padding: 0 10px;
  }
  .el-tabs__header {
    margin: 0;
    border: none;
  }
  .el-tabs__item {
    padding: 0 10px;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__nav,
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active,
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-focus {
    border: none;
    outline: none;
  }
  .close {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #999;
    cursor: pointer;
    transition: all 200ms;
    &:hover {
      color: #666;
      transform: rotate(90deg);
    }
  }
}
</style>
