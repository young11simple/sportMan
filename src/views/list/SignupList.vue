<!--体委报名列表-->
<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="运动会名称">
              <a-select v-model="querySpo_id" @change="handleSelect">
                <a-select-option
                  v-for="object in sportmeetDataSource"
                  :value="object.spo_id"
                  :key="object.spo_name">
                  {{ object.spo_name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="项目类型">
              <a-select v-model="queryItem_kind" @change="handleSelect">
                <a-select-option value="2" :key="2">径赛</a-select-option>
                <a-select-option value="1" :key="1">田赛</a-select-option>
                <a-select-option value="3" :key="3">其它</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="项目名称">
              <!--a-select v-model="queryItem_id" @select="selectItemId"-->
              <a-select v-model="queryItem_id" @change="handleSelect">
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
            <a-form-item label="运动员姓名" v-show="isTeamFunc()">
              <a-select v-model="queryAth_id[0]" @change="handleSelect">
                <a-select-option
                  v-for="object in athleteDataSource"
                  :value="object.ath_id"
                  :key="object.ath_id">
                  {{ object.ath_name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="运动员姓名" v-show="!isTeamFunc()" v-for="(n, i) in 4" :key="i">
              <a-select v-model="queryAth_id[i]" @change="handleSelect">
                <a-select-option
                  v-for="object in athleteDataSource"
                  :value="object.ath_id"
                  :key="object.ath_id">
                  {{ object.ath_name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" style="float: right">
            <a-button type="primary" icon="plus" @click="createGameAthlete" style="float: right">参加项目</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <br>
    <!--<div></div>-->
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :pagination="pagination"
      rowKey=""
      bordered>
      <template v-for="col in ['spo_name','itemInfo', 'athleteInfo','operation']" :slot="col" >

      </template>
      <template slot="operation" slot-scope="record">
        <div class="editable-row-operations">
          <a-popconfirm title="确定删除吗？" @confirm="() => deleteGameAthlete(record)">
            <a>删除</a>
          </a-popconfirm>
        </div>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { getAthleteList, getGameAthleteList, getSpoList, getItemList } from '@api/search'
import { createGameAthlete, deleteGameAthlete } from '@api/change'
import Vue from 'vue'
const columns = [{
  title: '参加项目',
  dataIndex: 'itemInfo',
  width: '25%',
  scopedSlots: { customRender: 'itemInfo' }
}, {
  title: '运动员姓名',
  dataIndex: 'athleteInfo',
  width: '25%',
  scopedSlots: { customRender: 'athleteInfo' }
}, {
  title: '操作',
  width: '25%',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]

export default {
  name: 'SignupList',
  components: {

  },
  data () {
    return {
      pagination: {
        defaultPageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        showQuickJumper: true
      },
      queryParams: {},
      querySpo_id: '',
      queryAth_id: [],
      qAth_id: '',
      queryItem_id: '',
      dataSource: [],
      cacheData: [],
      queryItem_kind: '',
      data: {},
      columns,
      itemName: [],
      itemDataSource: {},
      athleteDataSource: {},
      sportmeetDataSource: [],
      isteam: 0
      // flag: false
    }
  },
  filters: {

  },
  created () {

  },
  methods: {
    isTeamFunc: function () {
      if (this.isteam === 0) {
        return true
      } else {
        return false
      }
    },
    getGameAthleteList: function () {
      const jsonData = {
        spo_id: this.querySpo_id,
        cla_id: Vue.ls.get('CLA_ID')
      }
      console.log('获取报名运动员列表信息：', jsonData)
      getGameAthleteList(jsonData, this).then(res => {
        this.dataSource = res && res.result.dataSource
        this.dataSource = this.dataSource.map(function (item, index) {
          item.key = index
          return item
        })
        this.cacheData = this.dataSource.map(item => ({ ...item })) // 深克隆
        console.log('报名信息', this.dataSource)
      }).catch(err => {
        console.log(err.toString())
      })
    },
    createGameAthlete () {
      if (this.querySpo_id === undefined ||
      this.queryItem_kind === undefined ||
      this.queryItem_id === undefined ||
      this.queryAth_id[0] === undefined ||
      this.querySpo_id === null ||
      this.queryItem_kind === null ||
      this.queryItem_id === null ||
      this.queryAth_id[0] === null) {
        this.$message.error('请填写完整信息')
      } else {
        if (this.isteam) {
          const mapObj = new Map()
          for (let i = 0; i < this.queryAth_id.length; i++) {
            mapObj.set(this.queryAth_id[i], true)
            console.log('运动员信息：', this.queryAth_id[i])
          }
          if (mapObj.size !== 4) {
            this.$message.error('请选择不重复的4名同学')
            return
          }
        }
        const jsonData = {
          spo_id: this.querySpo_id,
          cla_id: Vue.ls.get('CLA_ID'),
          item_id: this.queryItem_id,
          ath_ids: this.queryAth_id
        }
        console.log('报名信息', jsonData)
        createGameAthlete(jsonData, this).then(res => {
          this.getGameAthleteList()
        // TODO：可以使用另一种更新方式
        // const newObject = {}
        // // newObject.signup_id = res.result.signup_id
        // // newObject.itemInfo = this.itemDataSource['item_id:' + this.queryItem_id].itemInfo
        // // newObject.ath_name = this.athleteDataSource[this.queryAth_id[0]].ath_name
        // // newObject.spo_name = this.sportmeetDataSource[this.querySpo_id].spo_name
        // this.dataSource.unshift(newObject)
        // this.cacheData.unshift(newObject)
        // console.log('创建成功', newObject)
        }).catch(err => {
          console.log(err.toString())
        })
      }
    },
    deleteGameAthlete (item) {
      const jsonData = {
        spo_id: this.querySpo_id,
        item_id: item.item_id,
        ath_id: item.ath_id
      }
      // 把record整个信息传过来
      // const jsonData = JSON.parse(JSON.stringify(item))
      console.log('删除信息：', jsonData)
      deleteGameAthlete(jsonData, this).then(res => {
        // TODO：使用本地缓存过滤
        // console.log('cilck delete', key)
        // const newData = [...this.dataSource]
        // this.dataSource = newData.filter(item => item.signup_id !== key)
        this.getGameAthleteList()
      }).catch(err => {
        console.log(err.toString())
      })
    },
    handleSelect (value) {
      console.log(`selected ${value}`)
    },
    // handleSelectSpo_id (value, key) {
    //   // this.queryParams.spo_name = key
    //   console.log(`selected ${value}`)
    //   console.log('key', key)
    // },
    handleChange (value, key, column) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.dataSource = newData
        console.log(target[column], value)
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
    getAthleteList () {
      const jsonData = {
        cla_id: Vue.ls.get('CLA_ID')
      }
      console.log('jsonData', jsonData)
      getAthleteList(jsonData, this).then(res => {
        this.athleteDataSource = res && res.result.dataSource
      }).catch(err => {
        console.log(err.toString())
      })
    },
    getSpoList () {
      const jsonData = {
        col_id: Vue.ls.get('COL_ID')
      }
      getSpoList(jsonData, this).then(res => {
        // TODO:筛选isopen为true的运动会
        var temp = res && res.result.dataSource
        this.sportmeetDataSource = temp.filter(item => item.isopen === true)
        console.log('开放报名的运动会列表', this.sportmeetDataSource)
      }).catch(err => {
        console.log(err.toString())
      })
    }
  },
  mounted () {
    this.getSpoList()
    this.getAthleteList()
  },
  watch: {
    querySpo_id: function () {
      this.getGameAthleteList()
      console.log('选择新的运动会')
    },
    queryItem_kind: function () {
      this.getItemList()
    },
    queryItem_id: function () {
      this.queryAth_id = [] // 要先清空，否则可能多传
      let i = 0
      for (i = 0; i < this.itemDataSource.length; i++) {
        if (this.itemDataSource[i].item_id === this.queryItem_id) {
          break
        }
      }
      console.log(this.itemDataSource[i])
      this.isteam = this.itemDataSource[i].isteam
    }
  }
}
</script>
<style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
