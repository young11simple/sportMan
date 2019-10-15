<!--管理员管理班级列表-->
<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="班级名称">
              <a-input v-model="queryCla_name" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-button type="primary" icon="plus" style="float: right" @click="e => handleCreate()">创建班级</a-button>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-button type="primary" icon="plus" style="float: right" @click="e => downloadSportLeaderAccount()">下载体委信息</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <br>
    <!--<div></div>-->
    <a-table :columns="columns" :dataSource="dataSource" rowKey="cla_id" bordered :pagination="pagination">
      <template v-for="col in ['lea_account', 'cla_name']" :slot="col" slot-scope="text, record, index">
        <div :key="col">
          <a-input
            v-if="record.editable&&col === 'cla_name'"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.cla_id, col)"
          />
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="reset" slot-scope="text, record, index">
        <a-popconfirm title="确定重置密码吗？" @confirm="() => handleReset(record.cla_id)">
          <a>重置密码</a>
        </a-popconfirm>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a-popconfirm title="确定保存吗？" @confirm="() => handleSave(record.cla_id)">
              <a>保存</a>
            </a-popconfirm>
            <a-popconfirm title="确定取消吗？" @confirm="() => handleCancel(record.cla_id)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => handleEdit(record.cla_id)">编辑</a>
            <a-popconfirm title="确定删除吗？" @confirm="() => handleDelete(record.cla_id)">
              <a>删除</a>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </a-table>
  </a-card>
</template>

<script>
// import moment from 'moment'
// import { STable } from '@/components'
// import StepByStepModal from './modules/StepByStepModal'
// import CreateForm from './modules/CreateForm'
// import { getRoleList, getServiceList } from '@/api/manage'
import { getClassList } from '@api/search'
import { createClass, deleteClass, resetSportLeaderPassword } from '@api/change'
import Vue from 'vue'
import { axios } from '@/utils/request'
import ARow from 'ant-design-vue/es/grid/Row'

const columns = [{
  title: '体委账号',
  dataIndex: 'lea_account',
  width: '25%',
  scopedSlots: { customRender: 'lea_account' }
}, {
  title: '班级名称',
  dataIndex: 'cla_name',
  width: '25%',
  scopedSlots: { customRender: 'cla_name' }
}, {
  title: '修改密码',
  width: '20%',
  dataIndex: 'reset',
  scopedSlots: { customRender: 'reset' }
}, {
  title: '操作',
  width: '30%',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]

export default {
  name: 'ClassList',
  components: {
    ARow

  },
  data () {
    // this.cacheData = this.dataSource.map(item => ({ ...item }))
    return {
      pagination: {
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        showQuickJumper: true
      },
      queryCla_name: '',
      dataSource: [],
      cacheData: [],
      columns
    }
  },
  filters: {

  },
  created () {

  },
  methods: {
    getClassList () {
      const jsonData = {
        col_id: Vue.ls.get('COL_ID')
      }
      console.log('jsonData', jsonData)
      getClassList(jsonData, this).then(res => {
        this.dataSource = res && res.result.dataSource
        this.cacheData = this.dataSource.map(item => ({ ...item })) // 深克隆
        console.log(this.dataSource)
      }).catch(err => {
        console.log(err.toString())
      })
    },
    handleCreate () {
      const jsonData = {
        col_id: Vue.ls.get('COL_ID'),
        cla_name: this.queryCla_name
      }
      console.log('jsonData', jsonData)
      createClass(jsonData, this).then(res => {
        let newObject = []
        newObject = {
          cla_name: this.queryCla_name,
          lea_account: res.result.lea_account,
          cla_id: res.result.cla_id
        } // 深克隆
        // newObject = this.queryParam
        this.dataSource.unshift(newObject)
        this.cacheData.unshift(newObject)
        // TODO：创建成功后删除本地缓存
      }).catch(err => {
        console.log(err.toString())
      })
    },
    handleChange (value, key, column) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.cla_id)[0]
      if (target) {
        target[column] = value
        this.dataSource = newData
        console.log(target[column], value)
      }
    },
    handleReset (key) {
      const jsonData = {
        cla_id: key
      }
      console.log('jsonData', jsonData)
      resetSportLeaderPassword(jsonData, this).then(res => {
        // this.$message.success('重置成功')
      }).catch(err => {
        console.log(err.toString())
      })
    },
    handleDelete (key) {
      console.log('cilck delete')
      const jsonData = {
        cla_id: key
      }
      console.log('jsonData', jsonData)
      deleteClass(jsonData, this).then(res => {
        const newData = [...this.dataSource]
        this.dataSource = newData.filter(item => item.cla_id !== key)
      }).catch(err => {
        console.log(err.toString())
      })
    },
    handleSave (key) { // 每次修改完成都会更新cacheData
      // TODO：调用保存接口，才确定是否更改本地数据
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.cla_id)[0]
      if (target) {
        delete target.editable
        this.dataSource = newData
        this.cacheData = newData.map(item => ({ ...item }))
        console.log(this.cacheData)
      }
    },
    handleCancel (key) { // 将cacheData中的数据替换DataSource中的数据
      const newData = [...this.dataSource]
      // console.log(newData)
      const target = newData.filter(item => key === item.cla_id)[0]
      // console.log(this.cacheData)
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.cla_id)[0])
        delete target.editable
        this.dataSource = newData
      }
    },
    handleEdit (key) {
      const newData = [...this.dataSource] // 浅复制
      const target = newData.filter(item => key === item.cla_id)[0]
      if (target) {
        target.editable = true
        this.dataSource = newData // 发现数据地址有改变，重新渲染
      }
      console.log(this.dataSource)
    },
    downloadSportLeaderAccount () {
      const jsonData = {
        col_id: Vue.ls.get('COL_ID')
      }
      console.log('jsonData', jsonData)
      axios({
        url: '/api/ad/account/downloadSportLeaderAccount.do',
        method: 'post',
        data: jsonData,
        responseType: 'blob'
      }).then(response => {
        this.download(response)
      }).catch((error) => {
        console.log(error.toString())
      })
    },
    download (data) {
      if (!data) {
        return
      }
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '体委信息.xls')
      document.body.appendChild(link)
      link.click()
    }
  },

  mounted () {
    this.getClassList()
  }
}
</script>
<style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
