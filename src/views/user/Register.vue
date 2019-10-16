<template>
  <div class="main user-layout-register">
    <a-form ref="formRegister" :form="form" id="formRegister">
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab="管理员注册">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="用户名"
              v-decorator="['account', {rules: [{ required: true, message: '请输入用户名' }], validateTrigger: ['change', 'blur']}]"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="至少6位密码，区分大小写"
              v-decorator="['password', {rules: [{ required: true, message: '请正确填写密码'},{validator:this.handlePasswordCheckLenth}], validateTrigger: 'blur'}]"
            ></a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="确认密码"
              v-decorator="['password2', {rules: [{ required: true, message: '请正确填写密码' }, { validator: this.handlePasswordCheck }], validateTrigger: 'blur'}]"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="至少6位邀请码，区分大小写"
              v-decorator="['invitecode', {rules: [{ required: true, message: '请正确填写邀请码'},{validator:this.handleInviteCheckLenth}], validateTrigger: 'blur'}]"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <a-input size="large" placeholder="11 位手机号" v-decorator="['phone', {rules: [{ required: true, message: '请输入正确的手机号', pattern: /^1[3456789]\d{9}$/ }, { validator: this.handlePhoneCheck } ], validateTrigger: 'blur' }]">
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
      <a-form-item>
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="register-button"
          :loading="registerBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="registerBtn">注册
        </a-button>
        <router-link class="login" :to="{ name: 'login' }">使用已有账户登录</router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mixinDevice } from '@/utils/mixin.js'
import DragVerify from 'vue-drag-verify'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import md5 from 'md5'
import { adminRegister } from '@api/login'
const levelNames = {
  0: '低',
  1: '低',
  2: '中',
  3: '强'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}
export default {
  name: 'Register',
  components: {
    AFormItem,
    DragVerify
  },
  mixins: [mixinDevice],
  data () {
    return {
      text: '请将滑块拖动到右侧',
      successText: '验证成功',
      width: 360,
      height: 42,
      textSize: '18px',
      form: this.$form.createForm(this),
      customActiveKey: 'tab1',
      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      registerBtn: false
    }
  },
  computed: {
    passwordLevelClass () {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName () {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor () {
      return levelColor[this.state.passwordLevel]
    }
  },
  methods: {
    handleTabClick (key) {
      this.customActiveKey = key
    },
    handlePasswordCheck (rule, value, callback) {
      if (value !== this.form.getFieldValue('password')) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    },
    handlePasswordCheckLenth (rule, value, callback) {
      if (value.length >= 6) { callback() } else { callback(new Error('至少6位密码，区分大小写')) }
    },
    handleInviteCheckLenth (rule, value, callback) {
      if (value.length >= 6) { callback() } else { callback(new Error('至少6位邀请码，区分大小写')) }
    },
    /*
    isScript (str) {
      const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@wz\.com$/
      return reg.test(str.trim())
    },
    handleUsernameCheck (rule, value, callback) {
      if (!isScript(value)) {
        callback(new Error('请输入正确的合法邮箱'))
      } else {
        callback()
      }
    }, */
    handlePhoneCheck (rule, value, callback) {
      callback()
    },

    // handlePasswordInputClick () {
    //   if (!this.isMobile()) {
    //     this.state.passwordLevelChecked = true
    //     return
    //   }
    //   this.state.passwordLevelChecked = false
    // },

    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        $router
      } = this
      console.log('点击确认')

      let validateFieldsKey = null
      if (this.customActiveKey === 'tab1') {
        validateFieldsKey = ['account', 'password', 'password2', 'invitecode', 'phone']
      }
      // const validateFieldsKey = ['username', 'password']
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          if (!this.$refs.Verify.isPassing) {
            this.$message.error('请将滑块拖动到右侧')
            return
          }
          const jsonData = {
            admin: {
              adm_account: values.account,
              adm_password: md5(values.password),
              adm_phone: values.phone
            },
            col_invitecode: values.invitecode
          }
          console.log('jsonData', jsonData)
          adminRegister(jsonData, this).then(res => {
            console.log('adminRegister')
            $router.push({ name: 'registerResult', params: { adm_account: values.account } }) // 跳转
          }).catch(err => {
            console.log(err.toString())
          })
        } else {
          setTimeout(() => {
            console.log('register failed')
          }, 60000)
        }
      })
    },
    requestFailed (err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
      this.registerBtn = false
    }
  },
  watch: {
    'state.passwordLevel' (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="less">
  .user-register {

    &.error {
      color: #ff0000;
    }

    &.warning {
      color: #ff7e05;
    }

    &.success {
      color: #52c41a;
    }

  }

  .user-layout-register {
    .ant-input-group-addon:first-child {
      background-color: #fff;
    }
  }
</style>
<style lang="less" scoped>
  .user-layout-register {

    & > h3 {
      font-size: 16px;
      margin-bottom: 20px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .register-button {
      width: 50%;
    }

    .login {
      float: right;
      line-height: 40px;
    }
  }
</style>
