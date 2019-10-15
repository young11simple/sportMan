<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab="管理员登录">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="账户: admin"
              v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="密码: admin or ant.design"
              v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="tab2" tab="体育委员登录">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="请输入账号"
              v-decorator="[
                'alusername',
                {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="请输入密码"
              v-decorator="[
                'alpassword',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>
      <a-form-item>
        <div :style="{ width: width + 'px'}" style="margin: 0 auto">
          <drag-verify
            :width="width"
            :height="height"
            :text="text"
            :success-text="successText"
            :text-size="textSize"
            ref="Verify"
          >
          </drag-verify>
        </div>
      </a-form-item>
      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >确定</a-button>
      </a-form-item>
      <a-form-item>
        <router-link class="register" :to="{ name: 'register' }" style="float: right; margin-left: 20px;">注册账户</router-link>
        <!--<a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox>-->
        <router-link
          :to="{ name: 'recover', params: { user: 'aaa'} }"
          class="forge-password"
          style="float: right;"
        >忘记密码</router-link>
        <a-button style="float: left; margin-left: 20px;" class="forge-password"><a href="https://openapi.yiban.cn/oauth/authorize?client_id=9432b9abe1e68817&redirect_uri=https://denglx.cn/audience" @click="">游客易班登录</a></a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import md5 from 'md5'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
// import { getSmsCaptcha, get2step } from '@/api/login'
import DragVerify from 'vue-drag-verify'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import Vue from 'vue'
export default {
  components: {
    AFormItem,
    DragVerify
  },
  data () {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      },
      text: '请将滑块拖动到右侧',
      successText: '验证成功',
      width: 360,
      height: 42,
      textSize: '18px'
    }
  },
  created () {
    // get2step({ })
    //   .then(res => {
    //     this.requiredTwoStepCaptcha = res.result.stepCode
    //   })
    //   .catch(() => {
    //     this.requiredTwoStepCaptcha = false
    //   })
    // this.requiredTwoStepCaptcha = true
  },
  methods: {
    ...mapActions(['Login', 'Logout', 'LeaLogin', 'yibanLogin']),
    // handler
    yibanLogin: function (event) {
    },
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleTabClick (key) {
      this.customActiveKey = key
      console.log(this.customActiveKey)
      // this.form.resetFields()
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        Login,
        LeaLogin
      } = this
      console.log('点击确认')

      const validateFieldsKey = this.customActiveKey === 'tab1' ? ['username', 'password'] : ['alusername', 'alpassword']
      // const validateFieldsKey = ['username', 'password']
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          if (!this.$refs.Verify.isPassing) {
            this.$message.error('请将滑块拖动到右侧')
            return
          }
          state.loginBtn = true
          if (this.customActiveKey === 'tab1') { // 管理员登录
            console.log('login form', values)
            // const loginParams = { ...values }
            // delete loginParams.username
            const jsonData = {
              adm_account: values.username,
              adm_password: values.password
            }
            console.log(jsonData)
            Login(jsonData)
              .then((res) => this.loginSuccess(res))
              .catch(err => this.requestFailed(err))
              .finally(() => {
                state.loginBtn = false
              })
          } else {
            // 体委登录
            console.log('login form', values)
            // delete loginParams.username
            const jsonData = {
              lea_account: values.alusername,
              lea_password: values.alpassword
            }
            console.log(jsonData)
            LeaLogin(jsonData)
              .then((res) => this.loginSuccess(res))
              .catch(err => this.requestFailed(err))
              .finally(() => {
                state.loginBtn = false
              })
          }
        } else {
          setTimeout(() => {
            console.log('login failed')
            state.loginBtn = false
          }, 60000)
        }
      })
    },
    loginSuccess (res) {
      console.log('res', res)
      // return
      this.$router.push({ name: 'index' })

      // console.log(this.$router.)
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
    },
    requestFailed (err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '账号或密码错误，请重新检查',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
