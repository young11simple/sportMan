<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form layout="vertical">
          <div>
            <a-form-item
              label="账号："
            >
              {{ adm_account }}
            </a-form-item>
          </div>

          <a-form-item
            label="学院:"
          >
            {{ col_name }}
          </a-form-item>
          <a-form-item
            label="手机"
          >
            <a-input v-model="phone" />
          </a-form-item>
          <a-form-item>
            <a-button @click="handleChangePhone" type="primary">提交</a-button>
            <!--<a-button style="margin-left: 8px">保存</a-button>-->
          </a-form-item>
        </a-form>

      </a-col>
      <!--<a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">-->
      <!--<div class="ant-upload-preview" @click="$refs.modal.edit(1)" >-->
      <!--<a-icon type="cloud-upload-o" class="upload-icon"/>-->
      <!--<div class="mask">-->
      <!--<a-icon type="plus" />-->
      <!--</div>-->
      <!--<img :src="option.img"/>-->
      <!--</div>-->
      <!--</a-col>-->

    </a-row>

    <avatar-modal ref="modal">

    </avatar-modal>
  </div>
</template>

<script>
import AvatarModal from './AvatarModal'
import Vue from 'vue'
import { changePhone } from '@api/login'
export default {
  components: {
    AvatarModal
  },
  data () {
    return {
      phone: Vue.ls.get('ADM_PHONE'),
      adm_account: Vue.ls.get('ADM_ACCOUNT'),
      col_name: Vue.ls.get('COL_NAME')
    }
  },
  methods: {
    handleChangePhone () {
      // 提交
      const jsonData = {
        adm_id: Vue.ls.get('ADM_ID'),
        adm_phone: this.phone
      }
      console.log(jsonData)
      changePhone(jsonData, this)
    }
  }
}
</script>

<style lang="less" scoped>

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
