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
        </a-row>
      </a-form>
      <a-table
        :columns="columns"
        :dataSource="dataSource"
        bordered
        :pagination="pagination"
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
import AInputSearch from 'ant-design-vue/es/input/Search'
import { axios } from '@/utils/request'

const columns = [{
  title: '小组',
  dataIndex: 'group'
  // scopedSlots: { customRender: 'name' },
}, {
  title: '赛道',
  dataIndex: 'track'
}, {
  title: '班级',
  dataIndex: 'cla_name'
}, {
  title: '姓名',
  dataIndex: 'ath_name'
}, {
  title: '成绩',
  dataIndex: 'score'
}]

export default {
  components: { AInputSearch },
  data () {
    return {
      pagination: {
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        showQuickJumper: true
      },
      spo_name: '运动会名称',
      col_name: '学院名',
      mat_name: '具体项目名',
      data: {},
      count: 3,
      title: '标题',
      columns
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`)
      // this.getData()
      // this.data = {}
    },
    getData () {
      axios({
        url: '/list/orderlist',
        method: 'GET'
      }).then(res => {
        this.data = res && res.result
      }).catch((err) => {
        console.log(err)
        console.log(this.data)
      })
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
