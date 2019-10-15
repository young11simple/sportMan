<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="运动会名称">
              <a-select v-model="queryCol_id">
                <a-select-option
                  v-for="object in colDataSource"
                  :value="object.col_id"
                  :key="object.col_id">
                  {{ object.col_name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
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
              <a-select @select="seleceItemId">
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
            <a-form-item label="轮数">
              <a-select @select="selectGameRound">
                <a-select-option v-for="i in maxRound" :value="i" :key="i">第{{ i }}轮</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-table
        :columns="columns"
        :dataSource="dataSource"
        bordered
        :pagination="{pagination: false}"
        rowKey="rank"
      >
        <template v-for="col in ['rank', 'cla_name', 'ath_name', 'grade']" :slot="col" slot-scope="text, record, index">
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
            <!--<div v-else-if="col === 'grade' && grade_unit === 2">-->
            <!--{{ dataSource[index].grade3 }} 个/分钟-->
            <!--</div>-->
            <template v-else>{{ text }}</template>
          </div>
        </template>
      </a-table>
    </div>
  </a-card>
</template>
<script>
import Vue from 'vue'
import { getItemList, getSpoList, getMatchRank, getGameRound, getGroupGrade, getColList } from '@api/search'
import ACol from 'ant-design-vue/es/grid/Col'
const columns = [{
  title: '名次',
  dataIndex: 'rank',
  width: '20%',
  scopedSlots: { customRender: 'rank' }
}, {
  title: '班级和姓名',
  dataIndex: 'athleteInfo',
  width: '25%',
  scopedSlots: { customRender: 'cla_name' }
}, {
  title: '成绩（不输入默认为0）',
  dataIndex: 'grade',
  width: '30%',
  scopedSlots: { customRender: 'grade' }
}, {
  title: '得分',
  dataIndex: 'score',
  width: '25%',
  scopedSlots: { customRender: 'score' }
}]

export default {
  components: {
    ACol
  },
  data () {
    return {
      queryItem_id: '',
      querySpo_id: '',
      queryCol_id: '',
      queryItem_kind: '',
      queryGameRound: '',
      itemDataSource: [],
      sportmeetDataSource: [],
      colDataSource: [],
      dataSource: [],
      grade_unit: 0,
      maxRound: 0,
      data: {},
      // myData: data,
      columns
    }
  },
  mounted () {
    // this.getData()
    this.getColList()
    // this.getItemList()
  },
  methods: {
    getItemList () {
      const jsonData = {
        item_kind: this.queryItem_kind
      }
      console.log('jsonData', jsonData)
      getItemList(jsonData, this).then(res => {
        this.itemDataSource = res && res.result.dataSource
      }).catch(err => {
        console.log(err.toString())
      })
    },
    getColList () {
      const jsonData = {
      }
      getColList(jsonData, this).then(res => {
        this.colDataSource = res && res.result.dataSource
      }).catch(err => {
        console.log(err.toString())
      })
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
    getSpoList () {
      const jsonData = {
        col_id: this.queryCol_id
      }
      console.log('jsonData', jsonData)
      getSpoList(jsonData, this).then(res => {
        this.sportmeetDataSource = res && res.result.dataSource
      }).catch(err => {
        console.log(err.toString())
      })
    },
    getGameRound () {
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
    // getGroupGrade () {
    //   const jsonData = {
    //     item_id: this.queryItem_id,
    //     spo_id: this.querySpo_id,
    //     game_round: this.queryGameRound,
    //     group_no: this.queryGameGroup
    //   }
    //   console.log('jsonData', jsonData)
    //   getGroupGrade(jsonData, this).then(res => {
    //     this.data = res && res.result
    //     this.dataSource = res && res.result.dataSource
    //     // this.grade_unit = res && res.result.grade_unit
    //     this.gradeDecode()
    //     this.cacheData = this.dataSource.map(item => ({ ...item })) // 深克隆
    //   }).catch(err => {
    //     console.log(err.toString())
    //   })
    // },
    getMatchRank () {
      const jsonData = {
        item_id: this.queryItem_id,
        spo_id: this.querySpo_id,
        game_round: this.queryGameRound
      }
      console.log('jsonData', jsonData)
      getMatchRank(jsonData, this).then(res => {
        this.dataSource = res && res.result.dataSource
        this.gradeDecode()
      }).catch(err => {
        console.log(err.toString())
      })
    },
    clearCache () {
      this.dataSource = []
    },
    seleceItemId (value) {
      this.queryItem_id = value
      this.clearCache()
      this.maxRound = 0
      this.maxGroup = 0
      const that = this
      this.itemDataSource.map(function (item) {
        if (item.item_id === that.queryItem_id) {
          that.grade_unit = item.grade_unit
          console.log(that.grade_unit)
        }
      })
      this.getGameRound()
    },
    selectGameRound (value) {
      this.queryGameRound = value
      this.getMatchRank()
    }
  },
  watch: {
    queryCol_id: function () {
      this.getSpoList()
    },
    querySpo_id: function () {
      this.clearCache()
      this.maxRound = 0
      this.maxGroup = 0
      this.getItemList()
    },
    queryItem_kind: function () {
      this.clearCache()
      this.maxRound = 0
      this.maxGroup = 0
      this.getItemList()
    }
  }
}
</script>
<style lang="less">
  .header {
    text-align: center;
  }
  .title {
    height: 44px;
    line-height: 44px;
    font-size: 33px;
    color: rgba(0, 0, 0, .85);
    font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: 600;
    position: relative;
    top: 2px;
  }
  .desc {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    margin-top: 12px;
    margin-bottom: 12px;
  }
  th.column-money,
  td.column-money {
    text-align: right !important;
  }
</style>
