<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="学院名称">
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
        </a-row>
        <a-row>
        </a-row>
      </a-form>
      <a-table
        :columns="columns"
        :dataSource="dataSource"
        :pagination={pageSize:20}
        rowKey="classInfo"
        bordered>
        <template v-for="col in ['rank', 'classInfo', 'cla_score']" :slot="col" slot-scope="text, record, index">
          <div :key="col">
            <template>{{text}}</template>
          </div>
        </template>
      </a-table>
    </div>
  </a-card>
  <!--</div>-->
</template>
<script>
  import { getClassScoreRank, getSpoList,getColList } from '@api/search'
  import { generateClassScore } from '@api/change'
  import Vue from 'vue'
  import ACol from 'ant-design-vue/es/grid/Col'
  import ARow from 'ant-design-vue/es/grid/Row'
  const columns = [{
    title: '名次',
    dataIndex: 'rank',
    scopedSlots: { customRender: 'rank' },
  }, {
    title: '班级',
    dataIndex: 'classInfo',
    scopedSlots: { customRender: 'classInfo' },
  }, {
    title: '总分',
    dataIndex: 'cla_score',
    scopedSlots: { customRender: 'cla_score' },
  }]

  export default {
    components: { ARow, ACol },
    data () {
      return {
        dataSource: [],
        querySpo_id: '',
        queryCol_id: '',
        itemDataSource: [],
        sportmeetDataSource: [],
        colDataSource: [],
        columns
      }
    },
    mounted () {
      // this.getItem()
      // this.getData()
      this.getColList()
    },
    methods: {
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
      getColList() {
        const jsonData = {

        }
        getColList(jsonData, this).then(res => {
          this.colDataSource = res && res.result.dataSource
        }).catch(err => {
          console.log(err.toString())
        })
      },
      getClassScoreRank () {
        const jsonData = {
          spo_id: this.querySpo_id
        }
        console.log('jsonData', jsonData)
        getClassScoreRank(jsonData, this).then(res => {
          this.dataSource = res && res.result.dataSource
        }).catch(err => {
          console.log(err.toString())
        })
      },
      generateClassScore () {
        const jsonData = {
          spo_id: this.querySpo_id
        }
        console.log('jsonData', jsonData)
        generateClassScore(jsonData, this).then(res => {
          this.getClassScoreRank()
        }).catch(err => {
          console.log(err.toString())
        })
      }
    },
    watch: {
      queryCol_id: function () {
        this.getSpoList()
      },
      querySpo_id: function () {
        this.getClassScoreRank()
        // this.getData()
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
