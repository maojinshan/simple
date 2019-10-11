<template>
  <div id="top-bar">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="index"
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
      editableTabsValue: '2',
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }
      ],
      tabIndex: 2
    }
  },
  methods: {
    closeTab () {
      alert('close success')
    },
    removeTab (targetName) {
      let tabs = this.editableTabs
      if (tabs.length === 1) return
      let activeName = this.editableTabsValue
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

      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
    }
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
    &:hover {
      color: #666;
    }
  }
}
</style>
