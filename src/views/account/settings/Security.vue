<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form layout="vertical">
          <a-form-item>
            <a-input
              v-model="newPassword1"
              placeholder="请输入新密码"
              class="input"
              type="password"
            />
          </a-form-item>
          <a-form-item>
            <a-input
              v-model="newPassword2"
              placeholder="请再次输入新密码"
              class="input"
              type="password"
            />
          </a-form-item>
          <a-form-item>
            <a-button @click="summit" type="primary">提交</a-button>
            <!--<a-button style="margin-left: 8px">保存</a-button>-->
          </a-form-item>
        </a-form>

      </a-col>
    </a-row>
    <avatar-modal ref="modal">
    </avatar-modal>
  </div>

</template>

<script>
import AvatarModal from './AvatarModal'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import { mapActions } from 'vuex'
import Vue from 'vue'
import md5 from 'md5'
import { changePassword, leaChangePassword } from '@api/login'
export default {
  components: {
    AFormItem,
    AvatarModal
  },
  data () {
    return {
      form: this.$form.createForm(this),
      oldPassword: '',
      newPassword1: '',
      newPassword2: '',
      roleId: Vue.ls.get('ROLE_ID')
    }
  },
  methods: {
    ...mapActions(['Logout']),
    summit () {
      if (this.roleId === 'admin') {
        const jsonData = {
          adm_account: Vue.ls.get('ADM_ACCOUNT'),
          adm_password: this.newPassword1
        }
        console.log(jsonData)
        if (this.handleCkeck()) {
          changePassword(jsonData, this).then(res => {
            this.Logout({}).then(() => {
              window.location.reload()
            }).catch(err => {
              this.$message.error({
                title: '错误',
                description: err.message
              })
            })
          })
        }
      } else if (this.roleId === 'sportleader') {
        const jsonData = {
          cla_id: Vue.ls.get('CLA_ID'),
          lea_password: this.newPassword1
        }
        console.log(jsonData)
        if (this.handleCkeck()) {
          leaChangePassword(jsonData, this).then(res => {
            this.Logout({}).then(() => {
              // this.$router.push('/')
              window.location.reload()
            }).catch(err => {
              this.$message.error({
                title: '错误',
                description: err.message
              })
            })
          })
        }
      }
    },
    handleCkeck () {
      if (this.newPassword1.length < 6) {
        this.$message.error('密码要大于6位')
        return false
      } else if (this.newPassword1 !== this.newPassword2) {
        this.$message.error('密码不一致')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="less" scoped>
  .input {
    /*margin-bottom: 10px;*/
    width: 70%;
  }
  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>
