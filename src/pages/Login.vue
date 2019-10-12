<template>
  <div id="login">
    <div class="content">
      <!-- <img
        class="title"
        src="../../static/img/logo_login.png"
        alt="登录页title图片"
      > -->
      <div class="login-box">
        <img
          src="../../static/img/bg_form.png"
          alt="登陆页面卡片背景图"
        >
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="rules"
          status-icon
        >
          <p>欢迎登录</p>
          <el-form-item prop="mobile">
            <el-input
              v-model.trim="loginForm.mobile"
              type="text"
              placeholder="请输入用户名"
              autocomplete="off"
            >
              <i
                slot="prefix"
                class="el-input__icon icon-user"
              />
            </el-input>
          </el-form-item>
          <el-form-item prop="verCode">
            <el-input
              v-model.trim="loginForm.verCode"
              class="pwd"
              type="text"
              placeholder="请输入验证码"
              autocomplete="off"
              @keyup.native.enter="submitLogin"
            >
              <i
                slot="prefix"
                class="el-input__icon icon-pwd"
              />
              <template slot="append">
                <button
                  :disabled="disabled"
                  class="code"
                  @click.stop.prevent="getCode"
                >{{ codeText }}</button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              @click.native.prevent="submitLogin"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- <div class="support">北京四维智联科技有限公司提供技术支持 | 智能网联运营系统</div> -->
    </div>
  </div>
</template>

<script>
import utils from '../utils'
import { mapActions, mapMutations } from 'vuex'
import * as types from '@/store/mutation-types'
export default {
  data () {
    const validateUserName = async (rule, value, callback) => {
      if (!utils.validateMobile(value)) callback(new Error('请输入11位手机号码'))
      else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (!/^\d{6}$/.test(value)) callback(new Error('验证码必须是6位数字'))
      else callback()
    }
    return {
      codeText: '获取验证码',
      disabled: false,
      loading: false,
      loginForm: {
        mobile: '',
        verCode: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入11位手机号码', trigger: 'blur' },
          { validator: validateUserName, trigger: 'blur' }
        ],
        verCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { validate: validateCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    ...mapMutations({
      setUserInfo: types.SET_USER_INFO
    }),
    // 获取验证码
    async getCode () {
      this.$refs.loginForm.validateField(['mobile'], errors => {
        if (!errors) {
          this.disabled = true
          let leftCount = 60
          const _timeout = () => {
            if (leftCount > 0) {
              leftCount--
              this.codeText = `已发送(${leftCount}s)`
              this.disabled = true
              setTimeout(() => _timeout(), 1000)
            } else {
              this.codeText = `获取验证码`
              this.disabled = false
            }
          }

          setTimeout(() => {
            this.disabled = false
            this.$message({
              type: 'success',
              message: '验证码已发送'
            })
            _timeout()
          }, 1000)
        }
      })
    },
    // 提交登录表单
    submitLogin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          setTimeout(() => {
            // this.login(this.loginForm).then(({ code }) => {
            //   this.loading = false
            //   if (code === 200) {
            //     this.$router.go(0)
            //   }
            // })
            this.setUserInfo({
              userName: 'admin',
              token: 'token'
            })
            this.$setPaths({
              '/test': 1,
              '/test1': 2
            })
            this.$setRoles({
              '0X0001': 1,
              '0X0002': 1
            })

            this.$router.push({ path: '/test', query: { id: 1 } })
          }, 1000)
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss">
$--color-primary: #3a8dfc;
#login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: url("../../static/img/bg_login.png") center/cover no-repeat;
  .icon-user,
  .icon-pwd {
    display: inline-flex;
    align-items: center;
    &::before {
      content: "";
      width: 16px;
      height: 16px;
      background: center/cover no-repeat;
    }
  }
  .icon-user {
    &::before {
      background-image: url("../assets/icons/user.png");
    }
  }
  .icon-pwd {
    &::before {
      background-image: url("../assets/icons/pwd.png");
    }
  }
  .content {
    width: 820px;
    margin: 0 auto;
    text-align: center;
    .title {
      width: 73%;
      height: auto;
    }
    .support {
      font-size: 16px;
      line-height: 24px;
      color: #fff;
    }
    .login-box {
      width: 820px;
      height: 440px;
      border-radius: 6px;
      display: inline-flex;
      white-space: nowrap;
      background-color: #fff;
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.43),
        0px 10px 30px 0px rgba(24, 52, 110, 0.38);
      img {
        height: 100%;
        width: auto;
        border-radius: 6px 0px 0px 6px;
      }
      .el-form {
        // width: 100%;
        flex: 1;
        padding: 20px 20px 20px 10px;
        border-radius: 0 6px 6px 0;
        p {
          font-size: 18px;
          line-height: 24px;
          color: $--color-primary;
          text-align: left;
          margin-bottom: 10%;
        }
        .el-form-item {
          margin-bottom: 10%;
        }
        .el-input__inner {
          background-color: #f4f4f4;
          font-size: 12px;
        }
        .el-button {
          width: 100%;
          margin-top: 15%;
          background-color: #517cd2;
        }
        .code {
          color: $--color-primary;
          font-size: 12px;
          background: transparent;
          cursor: pointer;
          &:disabled {
            color: #ccc;
          }
        }
        .el-input-group__append {
          padding: 0 4px;
        }
      }
    }
  }
}
</style>
