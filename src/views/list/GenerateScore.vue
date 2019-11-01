<!--管理员管理记录列表-->
<template>
  <a-card :bordered="false">
    <a-col>
      <h3>{{ spo_name+' / '+itemInfo+' / '+'第'+queryGameRound+'轮' }}</h3>
    </a-col>
    <a-col>
      <a-button @click="goback">
        返回上一页
      </a-button>
      <a-button style="margin-left: 15px;" type="primary" @click="getData">
        刷新
      </a-button>
    </a-col>
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange, selectedRows: selectedRows}"
      bordered
      :pagination="{pageSize:25}"
      rowKey="game_id"
    >
      <template v-for="col in ['item_id', 'itemInfo', 'athInfo', 'grade', 'score']" :slot="col" slot-scope="text, record">
        <div :key="col">
          <div v-if="col === 'grade' && grade_unit === 0">
            {{ record.grade1 }} 分
            {{ record.grade2 }} 秒
            {{ record.grade3 }} 毫秒
          </div>
          <div v-else-if="col === 'grade' && grade_unit === 1">
            {{ record.grade2 }} 米
            {{ record.grade3 }} 毫米
          </div>
          <div v-else-if="col === 'grade' && grade_unit === 2">
            {{ record.grade3 }} 个/分钟
          </div>
          <div v-else-if="col === 'score'">
            <!--<a-col :md="24" :sm="24">-->
            <a-input-number
              :min="0"
              :value="record.score"
              @change="value => handleChange(value, record.game_id, col)"
            />
            <!--</a-col>-->
          </div>
          <template v-else>{{ text }}</template>
        </div>
      </template>
    </a-table>
    <a-button type="primary" icon="plus" @click="summitScore" style="float: right">更新积分</a-button>
    <a-modal
      title="Basic Modal"
      v-model="modalVisible"
      @ok="handleOk"
    >
      <a-table
        :columns="columns"
        :dataSource="selectedRows"
        bordered
        :pagination="{pagination: false}"
        rowKey="game_id"
      >
        <template v-for="col in ['item_id', 'itemInfo', 'athInfo', 'grade', 'score']" :slot="col" slot-scope="text, record, index">
          <div :key="col">
            <div v-if="col === 'grade' && grade_unit === 0">
              {{ selectedRows[index].grade1 }} 分
              {{ selectedRows[index].grade2 }} 秒
              {{ selectedRows[index].grade3 }} 毫秒
            </div>
            <div v-else-if="col === 'grade' && grade_unit === 1">
              {{ selectedRows[index].grade2 }} 米
              {{ selectedRows[index].grade3 }} 毫米
            </div>
            <div v-else-if="col === 'grade' && grade_unit === 2">
              {{ selectedRows[index].grade3 }} 个/分钟
            </div>
            <template v-else>{{ text }}</template>
          </div>
        </template>
      </a-table>
    </a-modal>
  </a-card>
</template>

<script>
import ACol from 'ant-design-vue/es/grid/Col'
import { getPreMatchScore } from '@api/search'
import { confirmScore } from '@api/change'

const columns = [{
  title: '排名',
  dataIndex: 'rank',
  width: '20%',
  scopedSlots: { customRender: 'rank' }
}, {
  title: '姓名',
  dataIndex: 'athleteInfo',
  width: '20%',
  scopedSlots: { customRender: 'athleteInfo' }
}, {
  title: '成绩（不输入默认为0）',
  dataIndex: 'grade',
  width: '25%',
  scopedSlots: { customRender: 'grade' }
}, {
  title: '成绩（不输入默认为0）',
  dataIndex: 'score',
  width: '15%',
  scopedSlots: { customRender: 'score' }
}]

export default {
  // name: 'TableList',
  components: {
    ACol
  },
  data () {
    // this.cacheData = this.dataSource.map(item => ({ ...item }))
    return {
      token: '',
      queryParam: {},
      dataSource: [],
      cacheData: [],
      grade_unit: 0,
      querySpo_id: '',
      queryGameRound: '',
      queryGameGroup: '',
      queryItem_id: '',
      queryAth_name: '',
      queryIsteam: 0,
      maxRound: 0,
      maxGroup: 0,
      // data: {},
      selectedRowKeys: [],
      selectedRows: [],
      columns,
      spo_name: '',
      itemInfo: '',
      // itemName,
      // className,
      modalVisible: false
      // itemDataSource: [],
      // sportmeetDataSource: [],
    }
  },
  filters: {

  },
  created () {

  },
  methods: {
    getData () {
      if (this.$route.query.spo_id !== null && this.$route.query.item_id !== null &&
        this.$route.query.game_round !== null && this.$route.query.game_group !== null &&
        this.$route.query.game_group !== null) {
        this.querySpo_id = Number(this.$route.query.spo_id)
        this.queryItem_id = Number(this.$route.query.item_id)
        this.queryGameRound = Number(this.$route.query.game_round)
        // this.queryGameGroup = this.$route.query.game_group
        this.queryIsteam = Number(this.$route.query.isteam)
        this.grade_unit = Number(this.$route.query.grade_unit)
        console.log(this.$route.query)
        this.getPreMatchScore()
      }
    },
    getPreMatchScore () {
      console.log('getPreMatchScore')
      const jsonData = {
        item_id: this.queryItem_id,
        spo_id: this.querySpo_id
      }
      console.log('jsonData', jsonData)
      getPreMatchScore(jsonData, this).then(res => {
        this.dataSource = res && res.result.dataSource
        this.gradeDecode()
        this.cacheData = this.dataSource.map(item => ({ ...item })) // 深克隆
        this.spo_name = res.result.spo_name
        this.itemInfo = res.result.itemInfo
      }).catch(err => {
        console.log(err.toString())
      })
    },
    handleChange (value, key, column) {
      console.log(value, key, column)
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.game_id)[0]
      if (target) {
        console.log(column)
        target[column] = value
        this.dataSource = newData
        // console.log(target[column], value)
      }
      console.log(this.dataSource)
    },
    gradeDecode () {
      let jEnd = 1
      switch (this.grade_unit) {
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
      for (let i = 0; i < this.dataSource.length; i++) {
        let temp = parseInt(this.dataSource[i]['grade'])
        for (let j = 3; j >= jEnd; j--) {
          if (j === jEnd) {
            this.dataSource[i]['grade' + j.toString()] = parseInt(temp)
          } else {
            this.dataSource[i]['grade' + j.toString()] = parseInt(temp % 100)
          }
          temp /= 100
        }
      }
    },
    gradeEncode () {
      for (let i = 0; i < this.dataSource.length; i++) {
        let temp = 0
        for (let j = 1; j <= 3; j++) {
          // 若字符串为空或者null
          let gradeTemp = this.dataSource[i]['grade' + j.toString()]
          if (gradeTemp === undefined || isNaN(gradeTemp)) {
            gradeTemp = 0
          }
          temp = temp * 100 + gradeTemp
        }
        this.dataSource[i]['grade'] = temp
      }
    },
    summitScore () {
      // 先验证是否有选中key
      if (this.selectedRows.length === 0) {
        this.$message.error('请先选择决赛名单！')
        return
      }
      if (this.selectedRows.length < 8) {
        this.$message.warn('您选择的人数少于8')
      }
      // 可以考虑在selectedRows中做解码，或许不需要做解码，只需要传名单？
      // TODO: 不需要encode，只需要传原值
      // this.gradeEncode()
      this.showModal()
    },
    onSelectChange (selectedRowKeys, selectedRow) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      console.log('selectedRow changed: ', selectedRow)
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRow
    },
    showModal () {
      this.modalVisible = true
    },
    confirmScore () {
      const scoreInfo = this.selectedRows.map(function (item) {
        return {
          game_id: item.game_id,
          score: item.score
        }
      })
      const jsonData = {
        item_id: this.queryItem_id,
        spo_id: this.querySpo_id,
        scoreInfo: scoreInfo
      }
      console.log(jsonData)
      confirmScore(jsonData, this).then(res => {
        console.log('提交成功')
      }).catch(err => {
        console.log(err.toString())
      })
    },
    handleOk (e) {
      console.log(e)
      this.modalVisible = false
      this.confirmScore()
    },
    goback () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.getData()
  }
  // watch: {
  //   '$route': function () {
  //
  //   }
  // }
}
</script>
<style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
