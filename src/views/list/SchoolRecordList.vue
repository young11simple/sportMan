<!--管理员管理记录列表-->
<template>
  <a-card :bordered="false">
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
    </a-table>
  </a-card>
</template>

<script>
import { getRecordList } from '@api/search'

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
      queryParam: {},
      dataSource: [],
      cacheData: [],
      data: {},
      gradeUnit: 0,
      columns
    }
  },
  filters: {

  },
  created () {

  },
  methods: {
    getRecordList () {
      const jsonData = {
        col_id: 0
      }
      console.log('jsonData', jsonData)
      getRecordList(jsonData, this).then(res => {
        this.dataSource = res && res.result.dataSource
        console.log(res.result.dataSource)
        this.cacheData = this.dataSource.map(item => ({ ...item })) // 深克隆
        this.gradeDecode()
      }).catch(err => {
        console.log(err.toString())
      })
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
      // console.log(this.dataSource)
    }
  },
  mounted () {
    this.getRecordList()
  }
}
</script>
<style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
