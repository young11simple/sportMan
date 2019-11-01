<!--管理员管理记录列表-->
<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="运动会名称">
              <a-select v-model="querySpo_id">
                <a-select-option
                  v-for="object in sportmeetDataSource"
                  :value="object.spo_id"
                  :key="object.spo_id">
                  {{ object.spo_name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="项目类型">
              <a-select v-model="queryItem_kind">
                <a-select-option value="2" :key="2">径赛</a-select-option>
                <a-select-option value="1" :key="1">田赛</a-select-option>
                <a-select-option value="3" :key="3">其它</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="项目名称">
              <a-select @select="selectItemId">
                <a-select-option
                  v-for="object in itemDataSource"
                  :value="object.item_id"
                  :key="object.item_id">
                  {{ object.itemInfo }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="比赛轮数">
              <a-select @select="selectGameRound">
                <a-select-option v-for="i in maxRound" :value="i" :key="i">第{{ i }}轮</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="比赛组别">
              <a-select @select="selectGameGroup">
                <a-select-option v-for="i in maxGroup" :value="i" :key="i">第{{ i }}组</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-button type="primary" icon="check-circle" @click="putGroupGrade" style="float: right">提交成绩</a-button>
          </a-col>
          <a-col>
            <div v-if="queryGameGroup === maxGroup">
              <div v-if="is_finish">
                <a-button @click="putFinish">
                  重新开放本轮比赛
                </a-button>
                <a-button
                  @click="createNextRound">
                  创建下一轮
                </a-button>
                <a-button
                  @click="updateMatchScore">
                  更新积分榜
                </a-button>
              </div>
              <a-button v-else @click="putFinish">
                结束本轮比赛
              </a-button>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <br>
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :pagination="pagination"
      bordered
      rowKey="game_id"
    >
      <template v-for="col in ['track_no', 'cla_name', 'athInfo', 'grade']" :slot="col" slot-scope="text, record">
        <div :key="col">
          <div v-if="col === 'grade' && grade_unit === 0">
            <a-col :md="6" :sm="24">
              <a-input-number
                :min="0"
                :max="59"
                :value="record.grade1"
                @change="value => handleChange(value, record.game_id, 'grade1')"
                style="width: 60%"
              />分
            </a-col>
            <a-col :md="6" :sm="24">
              <a-input-number
                :min="0"
                :max="59"
                :value="record.grade2"
                @change="value => handleChange(value, record.game_id, 'grade2')"
                style="width: 60%"
              />秒
            </a-col>
            <a-col :md="6" :sm="24">
              <a-input-number
                :min="0"
                :max="59"
                :value="record.grade3"
                @change="value => handleChange(value, record.game_id, 'grade3')"
                style="width: 60%"
              />毫秒
            </a-col>
          </div>
          <div v-else-if="col === 'grade' && grade_unit === 1">
            <a-col :md="7" :sm="24">
              <a-input-number
                :min="0"
                :value="record.grade2"
                @change="value => handleChange(value, record.game_id, 'grade2')"
                style="width: 60%"
              />米
            </a-col>
            <a-col :md="7" :sm="24">
              <a-input-number
                :min="0"
                :max="99"
                :value="record.grade3"
                @change="value => handleChange(value, record.game_id, 'grade3')"
                style="width: 60%"
              />毫米
            </a-col>
          </div>
          <div v-else-if="col === 'grade' && grade_unit === 2">
            <a-col :md="9" :sm="24">
              <a-input-number
                :min="0"
                :value="record.grade3"
                @change="value => handleChange(value, record.game_id, 'grade3')"
                style="width: 60%"
              />个/分钟
            </a-col>
          </div>
          <template v-else>{{ text }}</template>
        </div>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import ACol from 'ant-design-vue/es/grid/Col'
import { getItemList, getSpoList, getGameRound, getGameGroup, getGroupGrade, getFinish } from '@api/search'
import { putGroupGrade, putFinish } from '@api/change'
import Vue from 'vue'
const columns = [{
  title: '赛道',
  dataIndex: 'track_no',
  width: '20%',
  scopedSlots: { customRender: 'track_no' }
}, {
  title: '班级',
  dataIndex: 'cla_name',
  width: '25%',
  scopedSlots: { customRender: 'cla_name' }
}, {
  title: '姓名',
  dataIndex: 'athleteInfo',
  width: '20%',
  scopedSlots: { customRender: 'athleteInfo' }
}, {
  title: '成绩（不输入默认为0）',
  dataIndex: 'grade',
  width: '35%',
  scopedSlots: { customRender: 'grade' }
}]

const itemName = ['男子100米', '男子200米', '男子400米']
const className = ['范经理', '葛根粉', '武则天']
export default {
  // name: 'TableList',
  components: {
    ACol
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
      querySpo_id: '',
      queryItem_kind: '',
      queryGameRound: '',
      queryGameGroup: '',
      queryItem_id: '',
      queryAth_name: '',
      queryIsteam: 0,
      dataSource: [],
      cacheData: [],
      data: {},
      itemDataSource: {},
      sportmeetDataSource: {},
      columns,
      itemName,
      className,
      grade_unit: 0,
      is_finish: false,
      maxRound: 0,
      maxGroup: 0
    }
  },
  filters: {

  },
  created () {

  },
  methods: {
    getGroupGrade () {
      const jsonData = {
        item_id: this.queryItem_id,
        spo_id: this.querySpo_id,
        game_round: this.queryGameRound,
        group_no: this.queryGameGroup
      }
      console.log('jsonData', jsonData)
      getGroupGrade(jsonData, this).then(res => {
        this.data = res && res.result
        this.dataSource = res && res.result.dataSource
        console.log('获取组别比赛信息', this.dataSource)
        // this.grade_unit = res && res.result.grade_unit
        this.gradeDecode()
        this.cacheData = this.dataSource.map(item => ({ ...item })) // 深克隆
      }).catch(err => {
        console.log(err.toString())
      })
    },
    getItemList () {
      const jsonData = {
        item_kind: this.queryItem_kind
      }
      console.log('jsonData', jsonData)
      getItemList(jsonData, this).then(res => {
        this.itemDataSource = res && res.result.dataSource
        // this.itemDataSource
      }).catch(err => {
        console.log(err.toString())
      })
    },
    getSpoList () {
      const jsonData = {
        col_id: Vue.ls.get('COL_ID')
      }
      console.log('jsonData', jsonData)
      getSpoList(jsonData, this).then(res => {
        this.sportmeetDataSource = res && res.result.dataSource
      }).catch(err => {
        console.log(err.toString())
      })
    },
    putGroupGrade () {
      this.gradeEncode()
      const gradeInfo = this.dataSource.map(function (item) {
        return {
          game_id: item.game_id,
          grade: item.grade
        }
      })
      const jsonData = {
        item_id: this.queryItem_id,
        gradeInfo: gradeInfo
      }
      console.log('jsonData', jsonData)
      putGroupGrade(jsonData, this).then(res => {
        console.log('提交成功')
        // this.dataSource = res.result.dataSource
      }).catch(err => {
        console.log(err.toString())
      })
    },
    putFinish () {
      const jsonData = {
        item_id: this.queryItem_id,
        spo_id: this.querySpo_id,
        game_round: this.queryGameRound
      }
      console.log('jsonData', jsonData)
      putFinish(jsonData, this).then(res => {
        this.is_finish = !this.is_finish
      }).catch(err => {
        console.log(err.toString())
      })
    },
    handleChange (value, key, column) {
      console.log(value, key, column)
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.game_id)[0]
      if (target) {
        target[column] = value
        this.dataSource = newData
        // console.log(target[column], value)
      }
      // console.log(this.dataSource)
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
    createNextRound () {
      const query = {
        'spo_id': this.querySpo_id,
        'item_id': this.queryItem_id,
        'game_round': this.queryGameRound,
        'game_group': this.queryGameGroup,
        'isteam': this.queryIsteam,
        'grade_unit': this.grade_unit
      }
      console.log('query', query)
      this.$router.push({
        path: '/admin/nextround',
        query: query
      })
    },
    updateMatchScore () {
      const query = {
        'spo_id': this.querySpo_id,
        'item_id': this.queryItem_id,
        'game_round': this.queryGameRound,
        'game_group': this.queryGameGroup,
        'isteam': this.queryIsteam,
        'grade_unit': this.grade_unit
      }
      console.log('query', query)
      this.$router.push({
        path: '/admin/generatescore',
        query: query
      })
    },
    clearCache () {
      this.dataSource = []
    },
    selectItemId (value) {
      this.queryItem_id = value
      this.clearCache()
      this.maxRound = 0
      this.maxGroup = 0
      console.log(this.itemDataSource)
      const that = this
      this.itemDataSource.map(function (object) {
        if (object.item_id === that.queryItem_id) {
          that.queryIsteam = object.isteam
          that.grade_unit = object.grade_unit
        }
      })
      console.log('queryIsteam', this.queryIsteam)
      const jsonData = {
        item_id: this.queryItem_id,
        spo_id: this.querySpo_id
      }
      console.log('jsonData', jsonData)
      getGameRound(jsonData, this).then(res => {
        this.maxRound = res && res.result.game_round
      }).catch(err => {
        console.log(err.toString())
      })
    },
    getFinish () {
      const jsonData = {
        item_id: this.queryItem_id,
        spo_id: this.querySpo_id,
        game_round: this.queryGameRound
      }
      console.log('jsonData', jsonData)
      getFinish(jsonData, this).then(res => {
        this.is_finish = res.result
      }).catch(err => {
        console.log(err.toString())
      })
    },
    selectGameRound (value) {
      this.queryGameRound = value
      this.clearCache()
      // 监听到轮数变化，请求最大组别，接着渲染
      const jsonData = {
        item_id: this.queryItem_id,
        spo_id: this.querySpo_id,
        game_round: this.queryGameRound
      }
      console.log('jsonData', jsonData)
      getGameGroup(jsonData, this).then(res => {
        this.maxGroup = res && res.result
      }).catch(err => {
        console.log(err.toString())
      })
    },
    selectGameGroup (value) {
      this.queryGameGroup = value
      this.clearCache()
      // 监听到组别变化，请求表格数据，接着渲染
      this.getGroupGrade()
      if (this.queryGameGroup === this.maxGroup) {
        this.getFinish()
      }
    }
  },
  mounted () {
    this.getSpoList()
  },
  watch: {
    querySpo_id: function () {
      this.clearCache()
      this.maxRound = 0
      this.maxGroup = 0
      console.log('选择新的运动会')
    },
    queryItem_kind: function () {
      this.getItemList()
    },
    queryItem_id: function () {
      this.is_finish = false
    }
    // queryGameRound: function () {
    //   this.clearCache()
    //   // 监听到轮数变化，请求最大组别，接着渲染
    //   const jsonData = {
    //     item_id: this.queryItem_id,
    //     spo_id: this.querySpo_id,
    //     game_round: this.queryGameRound
    //   }
    //   console.log('jsonData', jsonData)
    //   getGameGroup(jsonData, this).then(res => {
    //     this.maxGroup = res && res.result.group_no
    //   }).catch(err => {
    //     console.log(err.toString())
    //   })
    // },
    // queryGameGroup: function () {
    //   this.clearCache()
    //   // 监听到组别变化，请求表格数据，接着渲染
    //   this.getGroupGrade()
    // }
  }
}
</script>
<style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
