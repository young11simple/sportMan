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
            <a-form-item label="轮数">
              <a-select @select="selectGameRound">
                <a-select-option v-for="i in maxRound" :value="i" :key="i">第{{i}}轮</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="组别">
              <a-select @select="selectGameGroup">
                <a-select-option v-for="i in maxGroup" :value="i" :key="i">第{{i}}组</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="48" v-if="showDownload === true">
          <a-col :md="8" :sm="24" style="float: right">
            <a-button type="primary" icon="plus" @click="e => exportExcel()" style="float: right">导出报名表</a-button>
          </a-col>
        </a-row>
      </a-form>
      <a-table
        :columns="columns"
        :dataSource="dataSource"
        bordered
        :pagination="{pagination: false}"
        rowKey="ath_id"
      >
        <template v-for="col in ['track_no', 'cla_name', 'athleteInfo']" :slot="col" slot-scope="text, record, index">
          <div :key="col">
            <template>{{ text }}</template>
          </div>
        </template>
      </a-table>
    </div>
  </a-card>
</template>
<script>
import Vue from 'vue'
import ACol from 'ant-design-vue/es/grid/Col'
import { getItemList, getSpoList, getGameRound, getGameGroup, getOrderData, getGroupGrade } from '@api/search'
import { axios } from '@/utils/request'

const columns = [{
  title: '赛道',
  dataIndex: 'track_no',
  width: '20%',
  scopedSlots: { customRender: 'track_no' },
}, {
  title: '班级',
  dataIndex: 'cla_name',
  width: '25%',
  scopedSlots: { customRender: 'cla_name' },
}, {
  title: '姓名',
  dataIndex: 'athleteInfo',
  width: '20%',
  scopedSlots: { customRender: 'athleteInfo' },
}]

export default {
  components: {
    ACol
  },
  data () {
    return {
      queryItem_id: '',
      querySpo_id: '',
      queryItem_kind: '',
      queryGameRound: '',
      queryGameGroup: '',
      itemDataSource: [],
      sportmeetDataSource: [],
      dataSource: [],
      grade_unit: 0,
      maxRound: 0,
      maxGroup: 0,
      showDownload: false,
      columns
    }
  },
  mounted () {
    this.getSpoList()
  },
  methods: {
    getItemList () {
      const jsonData = {
        item_kind: this.queryItem_kind
      }
      console.log('jsonData', jsonData)
      getItemList(jsonData, this).then(res => {
        this.itemDataSource = res && res.result.dataSource
        console.log('itemDataSource', this.itemDataSource)
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
    getOrderData () {
      const jsonData = {
        item_id: this.queryItem_id,
        spo_id: this.querySpo_id,
        game_round: this.queryGameRound,
        group_no: 0
      }
      console.log('jsonData', jsonData)
      getOrderData(jsonData, this).then(res => {
        this.dataSource = res && res.result.dataSource
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
    getGameGroup () {
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
        // this.grade_unit = res && res.result.grade_unit
        // this.gradeDecode()
        // this.cacheData = this.dataSource.map(item => ({ ...item })) // 深克隆
      }).catch(err => {
        console.log(err.toString())
      })
    },
    exportExcel () {
      const jsonData = {
        spo_id: this.querySpo_id
      }
      console.log('jsonData', jsonData)
      axios({
        url: '/api/sl/game/exportSportMeetAthleteExcel.do',
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
      link.setAttribute('download', '秩序册.xls')
      document.body.appendChild(link)
      link.click()
    },
    selectItemId (value) {
      this.queryItem_id = value
      console.log(this.itemDataSource)
      const that = this
      this.itemDataSource.map(function (object) {
        if (object.item_id === that.queryItem_id) {
          that.queryIsteam = object.isteam
        }
      })
      console.log('queryIsteam', this.queryIsteam)
      this.getGameRound()
    },
    // selectGameRound (value) {
    //   this.queryGameRound = value
    //   // this.getOrderData()
    // },
    selectGameRound (value) {
      this.queryGameRound = value
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
      this.getGroupGrade()
    }
  },
  watch: {
    querySpo_id: function () {
      console.log('选择新的运动会')
      this.showDownload = true
    },
    queryItem_kind: function () {
      this.getItemList()
    },
    // queryGameGroup: function () {
    //   // 监听到组别变化，请求表格数据，接着渲染
    //   this.getOrderData()
    // }
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
