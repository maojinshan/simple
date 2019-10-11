<template>
  <el-header class="header" height="80px">
    <div class="logo">
      <img :src="logo" alt="logo">
      <span class="title">{{title}}</span>
    </div>
    <div class="content">
      <slot />
    </div>
    <v-user />
  </el-header>
</template>

<script>
import User from './User'
export default {
  name: 'v-header',
  components: {
    'v-user': User
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    logo: {
      type: String,
      default: require('@/assets/icons/logo.png')
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  $--color-header-title: #161B22;
  $--color-header-bg: #F5F6FA;
  .header{
    width: 100%;
    height: 80px;
    padding: 0 20px;
    background: $--color-header-bg;
    display: flex;
    align-items: center;
    .logo{
      display: flex;
      align-items: center;
      .title{
        margin-left: 10px;
        font-family: MicrosoftYaHei;
        font-size: 22px;
        color: $--color-header-title;

      }
    }

    .content{
      flex: 1;
    }
  }
</style>
