<!--管理员管理记录列表-->
<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="类型">
              <a-select v-model="queryItem_kind">
                <!-- <a-select-option value="径赛" :key="0" @click="test(0)">径赛</a-select-option>
                <a-select-option value="田赛" :key="1" @click="test(1)">田赛</a-select-option>
                <a-select-option value="其它" :key="2" @click="test(2)">其它</a-select-option> -->
                <a-select-option value="2" :key="2">径赛</a-select-option>
                <a-select-option value="1" :key="1">田赛</a-select-option>
                <a-select-option value="3" :key="3">其它</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="项目名称">
              <a-select v-model="queryItem_id">
                <a-select-option
                  v-for="object in itemDataSource"
                  :value="object.item_id"
                  :key="object.item_id">{{ object.itemInfo }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="班级">
              <a-input v-model="queryRec_class" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="姓名">
              <a-input v-model="queryRec_person" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="比赛时间">
              <a-date-picker
                @change="handleDate"
                style="width: 100%"
                placeholder="请输入更新日期">
              </a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="成绩">
              <div class="nowrap" v-if="queryGrade_unit === 0">
                <a-col :md="8" :sm="24" class="show">
                  <a-input-number
                    :min="0"
                    :max="59"
                    v-model="grade1"
                    style="width: 80%"
                  />分
                </a-col>
                <a-col :md="8" :sm="24" class="show">
                  <a-input-number
                    :min="0"
                    :max="59"
                    v-model="grade2"
                    style="width: 80%"
                  />秒
                </a-col>
                <a-col :md="8" :sm="24" class="show">
                  <a-input-number
                    :min="0"
                    :max="59"
                    v-model="grade3"
                    style="width: 70%"
                  />毫秒
                </a-col>
              </div>
              <div v-else-if="queryGrade_unit === 1">
                <a-col :md="8" :sm="24">
                  <a-input-number
                    :min="0"
                    v-model="grade2"
                    style="width: 80%"
                  />秒
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-input-number
                    :min="0"
                    :max="99"
                    v-model="grade3"
                    style="width: 70%"
                  />毫秒
                </a-col>
              </div>
              <div v-else-if="queryGrade_unit === 2">
                <a-col :md="16" :sm="24">
                  <a-input-number
                    :min="0"
                    v-model="grade3"
                    style="width: 50%"
                  />个/分钟
                </a-col>
              </div>
              <!--<a-input v-model="queryParam.grade" placeholder=""/>-->
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :md="8" :sm="24" ></a-col>
          <a-col :md="8" :sm="24" ></a-col>
          <a-col :md="8" :sm="24" >
            <a-button type="primary" icon="plus" @click="handleCreate" style="float: right">创建记录</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <br>
    <!--<div></div>-->
    <a-table :columns="columns" :dataSource="dataSource" rowKey="rec_id" bordered :pagination="pagination">
      <template v-for="col in ['itemInfo', 'rec_class', 'rec_person', 'rec_spo_time', 'rec_grade', 'operation']" :slot="col" slot-scope="text, record">
        <div :key="col">
          <div v-if="col === 'rec_grade' && record.grade_unit === 0">
            {{ record.grade1 }} 分
            {{ record.grade2 }} 秒
            {{ record.grade3 }} 毫秒
          </div>
          <div v-else-if="col === 'rec_grade' && record.grade_unit === 1">
            {{ record.grade2 }} 米
            {{ record.grade3 }} 毫米
          </div>
          <div v-else-if="col === 'rec_grade' && record.grade_unit === 2">
            {{ record.grade3 }} 个/分钟
          </div>
          <div v-else-if="col === 'rec_spo_time'">
            {{ text | toDateString }}
          </div>
          <template v-else>{{ text }}</template>
          <!--<template>{{ text }}</template>-->
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span>
            <a-popconfirm title="确定删除吗？" @confirm="() => handleDelete(record.rec_id)">
              <a>删除</a>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { getRecordList, getItemList } from '@api/search'
import { createRecord, deleteRecord } from '@api/change'
import Vue from 'vue'
const columns = [{
  title: '项目名称',
  dataIndex: 'itemInfo',
  width: '20%',
  scopedSlots: { customRender: 'itemInfo' }
}, {
  title: '班级',
  dataIndex: 'rec_class',
  width: '20%',
  scopedSlots: { customRender: 'rec_class' }
}, {
  title: '姓名',
  dataIndex: 'rec_person',
  width: '15%',
  scopedSlots: { customRender: 'rec_person' }
}, {
  title: '时间',
  dataIndex: 'rec_spo_time',
  width: '15%',
  scopedSlots: { customRender: 'rec_spo_time' }
}, {
  title: '成绩（根据单位适应）',
  dataIndex: 'rec_grade',
  width: '20%',
  scopedSlots: { customRender: 'rec_grade' }
}, {
  title: '操作',
  width: '20%',
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
        defaultPageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        showQuickJumper: true
      },
      queryItem_kind: '',
      queryItem_id: '',
      queryRec_class: '',
      queryRec_person: '',
      dataSource: [],
      cacheData: [],
      data: {},
      grade_unit: 0,
      columns,
      itemDataSource: [],
      // classDataSource: [],
      queryGrade_unit: 0,
      grade1: '',
      grade2: '',
      grade3: '',
      grade: 0
    }
  },
  filters: {

  },
  created () {

  },
  methods: {
    getRecordList () {
      const jsonData = {
        col_id: Vue.ls.get('COL_ID')
      }
      console.log('记录所需信息：', jsonData)
      getRecordList(jsonData, this).then(res => {
        this.dataSource = res && res.result.dataSource
        console.log('获得记录信息：', this.dataSource)
        this.cacheData = this.dataSource.map(item => ({ ...item })) // 深克隆
        this.gradeDecode()
      }).catch(err => {
        console.log(err.toString())
      })
    },
    getItemList () {
      const jsonData = {
        item_kind: this.queryItem_kind
      }
      console.log('获取项目列表所需信息', jsonData)
      getItemList(jsonData, this).then(res => {
        this.itemDataSource = res && res.result.dataSource
        console.log('获取项目列表', this.itemDataSource)
      }).catch(err => {
        console.log(err.toString())
      })
    },
    handleDate (value, dateString) {
      this.rec_spo_time = value.valueOf()
    },
    handleDelete (key) {
      // console.log('cilck delete')
      const jsonData = {
        rec_id: key
      }
      console.log('jsonData', jsonData)
      deleteRecord(jsonData, this).then(res => {
        const newData = [...this.dataSource]
        this.dataSource = newData.filter(item => item.rec_id !== key)
      }).catch(err => {
        console.log(err.toString())
      })
    },
    handleSave (key) { // 每次修改完成都会更新cacheData
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.key)[0]
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
      const target = newData.filter(item => key === item.key)[0]
      // console.log(this.cacheData)
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        delete target.editable
        this.dataSource = newData
      }
    },
    // test: function (key) {
    //   this.queryGrade_unit = key
    //   console.log(key)
    // },
    handleCreate () {
      if (this.queryItem_kind === undefined || this.queryRec_class === undefined ||
      this.queryItem_id === undefined || this.queryRec_person === undefined ||
      this.rec_spo_time === undefined || this.rec_spo_time === '' ||
      this.queryItem_kind === '' || this.queryRec_class === '' ||
      this.queryItem_id === '' || this.queryRec_person === '') {
        this.$message.error('请填写完整信息')
      } else {
        this.gradeEncodeOne()
        const jsonData = {
          col_id: Vue.ls.get('COL_ID'),
          item_id: this.queryItem_id,
          rec_person: this.queryRec_person,
          rec_class: this.queryRec_class,
          rec_grade: this.grade,
          rec_spo_time: this.rec_spo_time
        }
        console.log('创建记录信息：', jsonData)
        createRecord(jsonData, this).then(res => {
          console.log('记录创建成功')
          this.getRecordList()
          this.clearInfo()
          // TODO：创建成功后删除本地缓存
          // let newObject = []
          // newObject = jsonData // 深克隆
          // console.log('创建记录', newObject)
          // // 获取数据，唯一的key
          // newObject.rec_id = res.result.rec_id
          // console.log(newObject)
          // this.dataSource.unshift(newObject)
          // const newObject2 = JSON.parse(JSON.stringify(newObject))
          // this.cacheData.unshift(newObject2)
        }).catch(err => {
          console.log(err.toString())
        })
      }
    },
    clearInfo () {
      this.queryItem_kind = undefined
      this.queryRec_class = undefined
      this.queryItem_id = undefined
      this.queryRec_person = undefined
      this.rec_spo_time = undefined
      this.grade1 = undefined
      this.grade2 = undefined
      this.grade3 = undefined
    },
    gradeDecode () {
      for (let i = 0; i < this.dataSource.length; i++) {
        let jEnd = 1
        switch (this.dataSource[i]['grade_unit']) {
          case 0:
            jEnd = 1
            break
          case 1:
            jEnd = 2
            break
          case 2:
            jEnd = 3
            break
        }
        let temp = parseInt(this.dataSource[i]['rec_grade'])
        for (let j = 3; j >= jEnd; j--) {
          if (j === jEnd) {
            this.dataSource[i]['grade' + j.toString()] = parseInt(temp)
          } else {
            this.dataSource[i]['grade' + j.toString()] = parseInt(temp % 100)
          }
          temp /= 100
        }
      }
      console.log(this.dataSource)
    },
    gradeEncodeOne () {
      let total = 0
      if (this.grade1 === undefined || isNaN(this.grade1)) {
        this.grade3 = 0
      }
      total = total * 100 + this.grade1
      if (this.grade2 === undefined || isNaN(this.grade2)) {
        this.grade2 = 0
      }
      total = total * 100 + this.grade2
      if (this.grade3 === undefined || isNaN(this.grade3)) {
        this.grade3 = 0
      }
      total = total * 100 + this.grade3
      this.grade = total
    }
  },
  mounted () {
    this.getRecordList()
  },
  watch: {
    queryItem_kind: function () {
      this.getItemList()
    },
    queryItem_id: function () {
      const that = this
      this.itemDataSource.map(function (object) {
        if (object.item_id === that.queryItem_id) {
          that.queryGrade_unit = object.grade_unit
          console.log(that.queryGrade_unit)
        }
      })
    }
  }
}
</script>
<style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
