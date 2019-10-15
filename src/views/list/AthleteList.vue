<!--体委录入运动员信息-->
<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="学号">
              <a-input v-model="queryParam.ath_number" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="姓名">
              <a-input v-model="queryParam.ath_name" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="性别">
              <a-select v-model="queryParam.ath_gender" @change="handleSelect">
                <a-select-option value="0">男</a-select-option>
                <a-select-option value="1">女</a-select-option>
              </a-select>
              <!--<a-input v-model="queryParam.ath_gender" placeholder=""/>-->
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="手机">
              <a-input v-model="queryParam.ath_phone" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" style="float: right">
            <a-button type="primary" icon="plus" @click="e => handleCreate()" style="float: right">创建运动员</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <br>
    <!--<div></div>-->
    <a-table :columns="columns" :dataSource="dataSource" rowKey="ath_id" bordered :pagination="pagination">
      <template v-for="col in ['ath_number', 'ath_name', 'ath_gender', 'ath_phone']" :slot="col" slot-scope="text, record, index">
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.ath_id, col)"
          />
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => handleSave(record.ath_id)">保存</a>
            <a-popconfirm title="确定取消吗？" @confirm="() => handleCancel(record.ath_id)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => handleEdit(record.ath_id)">编辑</a>
            <a-popconfirm title="确定删除吗？" @confirm="() => handleDelete(record.ath_id)">
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
import { getAthleteList } from '@api/search'
import { deleteAthlete, createAthlete, changeAthleteInfo } from '@api/change'
import Vue from 'vue'
const columns = [{
  title: '学号',
  dataIndex: 'ath_number',
  width: '20%',
  scopedSlots: { customRender: 'ath_number' }
}, {
  title: '姓名',
  dataIndex: 'ath_name',
  width: '20%',
  scopedSlots: { customRender: 'ath_name' }
}, {
  title: '性别',
  dataIndex: 'ath_gender',
  width: '10%',
  scopedSlots: { customRender: 'ath_gender' }
}, {
  title: '手机',
  dataIndex: 'ath_phone',
  width: '25%',
  scopedSlots: { customRender: 'ath_phone' }
}, {
  title: '操作',
  width: '25%',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]

export default {
  // name: 'TableList',
  components: {

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
      queryParam: {},
      dataSource: [],
      cacheData: [],
      data: {},
      columns
    }
  },
  filters: {

  },
  created () {

  },
  methods: {
    getAthleteList () {
      const jsonData = {
        cla_id: Vue.ls.get('CLA_ID')
      }
      console.log('jsonData', jsonData)
      getAthleteList(jsonData, this).then(res => {
        this.data = res && res.result
        this.dataSource = res && res.result.dataSource
        this.cacheData = this.dataSource.map(item => ({ ...item })) // 深克隆
        // this.athleteDataSource = res && res.result.dataSource
      }).catch(err => {
        console.log(err.toString())
      })
    },
    handleSelect (value) {
      console.log(`selected ${value}`)
    },
    handleCreate () {
      // 提交成功之后，需要获取key
      let newObject = []
      newObject = JSON.parse(JSON.stringify(this.queryParam)) // 深克隆
      // newObject = this.queryParam
      const jsonData = {
        cla_id: Vue.ls.get('CLA_ID'),
        ath_number: this.queryParam.ath_number,
        ath_name: this.queryParam.ath_name,
        ath_gender: this.queryParam.ath_gender,
        ath_phone: this.queryParam.ath_phone
      }
      console.log(jsonData)
      createAthlete(jsonData, this).then(res => {
        newObject.ath_id = res.result.ath_id
        this.dataSource.unshift(newObject)
        this.cacheData.unshift(newObject)
        console.log('创建成功')
        // TODO：创建成功后删除本地缓存
      }).catch(err => {
        console.log(err.toString())
      })
    },
    handleChange (value, key, column) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.ath_id)[0]
      if (target) {
        target[column] = value
        this.dataSource = newData
        console.log(target[column], value)
      }
    },
    handleEdit (key) {
      const newData = [...this.dataSource] // 浅复制
      const target = newData.filter(item => key === item.ath_id)[0]
      if (target) {
        target.editable = true
        this.dataSource = newData // 发现数据地址有改变，重新渲染
      }
      console.log(this.dataSource)
    },
    handleDelete (key) {
      console.log('cilck delete')
      const jsonData = {
        ath_id: key
      }
      console.log('jsonData', jsonData)
      deleteAthlete(jsonData, this).then(res => {
        const newData = [...this.dataSource]
        this.dataSource = newData.filter(item => item.ath_id !== key)
      }).catch(err => {
        console.log(err.toString())
      })
    },
    handleSave (key) { // 每次修改完成都会更新cacheData
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.ath_id)[0]
      console.log(target)
      if (target) {
        delete target.editable
        const jsonData = {
          ath_id: target.ath_id,
          ath_number: target.ath_number,
          ath_gender: target.ath_gender,
          ath_name: target.ath_name,
          ath_phone: target.ath_phone
        }
        console.log('jsonData', jsonData)
        changeAthleteInfo(jsonData, this).then(res => {
          if (target) {
            this.dataSource = newData
            this.cacheData = newData.map(item => ({ ...item }))
          }
        }).catch(err => {
          console.log(err.toString())
        })
      }
    },
    handleCancel (key) { // 将cacheData中的数据替换DataSource中的数据
      const newData = [...this.dataSource]
      // console.log(newData)
      const target = newData.filter(item => key === item.ath_id)[0]
      // console.log(this.cacheData)
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.ath_id)[0])
        delete target.editable
        this.dataSource = newData
      }
    }
  },
  mounted () {
    this.getAthleteList()
  }
}
</script>
<style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
