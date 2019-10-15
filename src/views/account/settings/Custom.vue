<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form-item>
          <a-input
            v-model="newInvitecode1"
            placeholder="请输入新邀请码"
            class="input"
            type="password"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            v-model="newInvitecode2"
            placeholder="请再次输入新邀请码"
            class="input"
            type="password"
          />
        </a-form-item>
        <a-form-item>
          <a-button @click="summit" type="primary">提交</a-button>
          <!--<a-button style="margin-left: 8px">保存</a-button>-->
        </a-form-item>
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
// import md5 from 'md5'
import { changeInvitecode } from '@api/login'
export default {
  components: {
    AFormItem,
    AvatarModal
  },
  data () {
    return {
      // form: this.$form.createForm(this),
      oldInvitecode: '',
      newInvitecode1: '',
      newInvitecode2: ''
    }
  },
  methods: {
    ...mapActions(['Logout']),
    summit () {
      const jsonData = {
        col_id: Vue.ls.get('COL_ID'),
        col_invitecode: this.newInvitecode1,
      }
      console.log(jsonData)
      if (this.handleCkeck()) {
        changeInvitecode(jsonData, this).then(res => {
          this.oldInvitecode = ''
          this.newInvitecode1 = ''
          this.newInvitecode2 = ''
        })
      }
    },
    handleCkeck () {
      if (this.newInvitecode1.length < 6) {
        this.$message.error('邀请码要大于6位')
        return false
      } else if (this.newInvitecode1 !== this.newInvitecode2) {
        this.$message.error('邀请码不一致')
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
