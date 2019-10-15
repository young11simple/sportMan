<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="运动会名称">
              <a-input v-model="queryParam.spo_name" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="举行地点">
              <a-input v-model="queryParam.spo_location" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="举行时间">
              <a-date-picker
                @change="handleDate"
                style="width: 100%"
                placeholder="请输入更新日期"
                format="YYYY-MM-DD"
              >
              </a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" style="float: right">
            <a-button type="primary" icon="plus" @click="e => handleCreate()" style="float: right">创建运动会</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <br>
    <!--<div></div>-->
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      rowKey="spo_id"
      bordered
      :pagination="pagination">
      <template v-for="col in ['spo_name', 'spo_location', 'spo_time']" :slot="col" slot-scope="text, record, index">
        <div :key="col">
          <a-date-picker
            v-if="record.editable && col === 'spo_time'"
            :value="text | toMoment"
            placeholder="请输入更新日期"
            format="YYYY-MM-DD"
            @change="value => handleDateList(value.valueOf(), record.spo_id, col)"
          ></a-date-picker>
          <a-input
            v-else-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.spo_id, col)"
          />
          <template v-else>
            <div v-if="col === 'spo_time'">
              {{ text | toDateString }}
            </div>
            <div v-else>
              {{ text }}
            </div>
          </template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => handleSave(record.spo_id)">保存</a>
            <a-popconfirm title="确定取消吗？" @confirm="() => handleCancel(record.spo_id)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a-button class="btn" type="danger" @click="() => handleEdit(record.spo_id)">编辑</a-button>

            <a-popconfirm title="确定删除吗？" @confirm="() => handleDelete(record.spo_id)">
              <a-button class="btn" type="danger">删除</a-button>
            </a-popconfirm>

            <a-popconfirm title="确定进行操作吗？" @confirm="() => handleEnd(record.spo_id, record.isopen)">
              <a-button class="btn" id="end" v-if="record.isopen === true" type="danger">结束</a-button>
              <a-button class="btn" type="danger" v-else>报名</a-button>
            </a-popconfirm>
            <a-popconfirm title="确定进行操作吗？" @confirm="() => handleGenerateTrackAndGroup(record.spo_id)">
              <a-button class="btn" type="danger" >分配</a-button>
            </a-popconfirm>

          </span>
        </div>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import moment from 'moment'
import { getSpoList } from '@api/search'
import Vue from 'vue'
import { createSportmeet, changeOpenSign, changeSportmeetInfo, deleteSportmeet, generateTrackAndGroup } from '@api/change'
import ARow from 'ant-design-vue/es/grid/Row'
// Vue.use(moment)
const columns = [{
  title: '运动会名称',
  dataIndex: 'spo_name',
  width: '22%',
  scopedSlots: { customRender: 'spo_name' }
}, {
  title: '举行地点',
  dataIndex: 'spo_location',
  width: '23%',
  scopedSlots: { customRender: 'spo_location' }
}, {
  title: '举行时间',
  dataIndex: 'spo_time',
  width: '25%',
  scopedSlots: { customRender: 'spo_time' }
}, {
  title: '操作',
  width: '30%',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]

export default {
  components: {
    ARow,
    moment
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
      disable: true,
      columns
    }
  },
  filters: {
  },
  created () {

  },
  methods: {
    getSpoList () {
      const jsonData = {
        col_id: Vue.ls.get('COL_ID')
      }
      console.log('jsonData', jsonData)
      getSpoList(jsonData, this).then(res => {
        this.dataSource = res && res.result.dataSource
        this.cacheData = this.dataSource.map(item => ({ ...item })) // 深克隆
        console.log('测试')
        console.log(this.dataSource)
      }).catch(err => {
        console.log(err.toString())
      })
    },
    handleCreate () {
      const jsonData = {
        col_id: Vue.ls.get('COL_ID'),
        spo_name: this.queryParam.spo_name,
        spo_time: this.queryParam.spo_time,
        spo_location: this.queryParam.spo_location,
        update_time: new Date()
      }
      console.log('创建运动会jsonData', jsonData)
      createSportmeet(jsonData, this).then(res => {
        // this.getSpoList()
        let newObject = []
        newObject = JSON.parse(JSON.stringify(this.queryParam)) // 深克隆
        // 获取数据，唯一的key
        newObject.spo_id = res.result.spo_id
        newObject.isopen = false
        // newObject.isopen = false
        // const newObject2 = JSON.parse(JSON.stringify(newObject))
        console.log(newObject)
        this.dataSource.unshift(newObject)
        const newObject2 = JSON.parse(JSON.stringify(newObject))
        this.cacheData.unshift(newObject2)
        // TODO：创建成功后删除本地缓存
      })
    },
    handleDelete (key) {
      const jsonData = {
        spo_id: key
      }
      console.log('jsonData', jsonData)
      deleteSportmeet(jsonData, this).then(res => {
        console.log('cilck delete', key)
        const newData = [...this.dataSource]
        this.dataSource = newData.filter(item => item.spo_id !== key)
      })
    },
    handleEnd (key, isopen) {
      const jsonData = {
        spo_id: key,
        isopen: !isopen
      }
      console.log('报名jsonData', jsonData)
      changeOpenSign(jsonData, this).then(res => {
        // this.$message.success(res.data.message)
        const target = this.dataSource.filter(item => key === item.spo_id)[0]
        if (target) {
          target.isopen = !target.isopen
        }
        const target2 = this.cacheData.filter(item => key === item.spo_id)[0]
        if (target2) {
          target2.isopen = !target2.isopen
        }
        console.log('报名后jsonData', jsonData)
      })
    },
    handleGenerateTrackAndGroup (key) {
      const jsonData = {
        spo_id: key
      }
      console.log(jsonData)
      generateTrackAndGroup(jsonData, this).then(res => {
        console.log('测试', jsonData)
      }).catch(err => {
        console.log(err.toString())
      })
    },
    handleDate (value, dateString) {
      this.queryParam.spo_time = value.valueOf()
    },
    handleDateList (value, key, column) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.spo_id)[0]
      if (target) {
        target[column] = value
        this.dataSource = newData
      }
    },
    handleChange (value, key, column) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.spo_id)[0]
      if (target) {
        target[column] = value
        this.dataSource = newData
      }
    },
    handleEdit (key) {
      const newData = [...this.dataSource] // 浅复制
      const target = newData.filter(item => key === item.spo_id)[0]
      // const target = this.dataSource.filter(item => key === item.spo_id)[0]
      if (target) {
        target.editable = true
        this.dataSource = newData // 发现数据地址有改变，重新渲染
      }
    },
    handleSave (key) { // 每次修改完成都会更新cacheData
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.spo_id)[0]
      const jsonData = {
        spo_id: key,
        spo_name: target.spo_name,
        spo_time: target.spo_time,
        spo_location: target.spo_location
      }
      console.log('jsonData', jsonData)
      changeSportmeetInfo(jsonData, this).then(res => {
        delete target.editable
        this.dataSource = newData
        this.cacheData = newData.map(item => ({ ...item })) // 深复制备份，取消时用
      })
    },
    handleCancel (key) { // 将cacheData中的数据替换DataSource中的数据
      const newData = [...this.dataSource]
      // console.log(newData)
      const target = newData.filter(item => key === item.spo_id)[0]
      // console.log(this.cacheData)
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.spo_id)[0])
        delete target.editable
        this.dataSource = newData
      }
    }
  },
  mounted () {
    this.getSpoList()
  }

}
</script>
<style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
  .btn{
    margin: 0px 5px 3px 5px;
    color: gray;
  }
  .btn:hover,.btn:visited{
    background-color:aquamarine;
    border: 1px solid aquamarine;
  }

  .btn:focus{
    background-color:#ccc;
    border: 1px solid #ccc;
  }

  #end{
    background-color:#ccc;
    border: 1px solid #ccc;
  }

</style>
