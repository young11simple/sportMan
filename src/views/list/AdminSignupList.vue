<!--管理员管理报名列表-->
<template>
  <a-card :bordered="false">

    <div class="page-menu-search">
      <a-input-search
        v-model="querySearch"
        @search="onSearch"
        style="width: 80%; max-width: 522px;"
        placeholder="请输入..."
        size="large"
        enterButton="Search">
      </a-input-search>
    </div>
    <div class="page-menu-search" style="width: 100%; border-top:2px solid  #F0F2F5; "></div>

    <a-table :columns="columns" :dataSource="dataSource" bordered :pagination="pagination">
      <template v-for="col in ['ath_number', 'ath_name', 'item_name']" :slot="col" slot-scope="text, record">
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => handleSave(record.key)">保存</a>
            <a-popconfirm title="确定取消吗？" @confirm="() => handleCancel(record.key)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => handleEdit(record.key)">编辑</a>
            <a-popconfirm title="确定删除吗？" @confirm="() => handleDelete(record.key)">
              <a>删除</a>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { searchInfoServlet } from '@api/search'
import Vue from 'vue'

const columns = [{
  title: '运动会',
  dataIndex: 'spo_name',
  width: '15%',
  scopedSlots: { customRender: 'spo_name' }
}, {
  title: '参加项目',
  dataIndex: 'item_name',
  width: '15%',
  scopedSlots: { customRender: 'item_name' }
}, {
  title: '运动员姓名',
  dataIndex: 'ath_name',
  width: '15%',
  scopedSlots: { customRender: 'ath_name' }
}, {
  title: '班级',
  dataIndex: 'cla_name',
  width: '15%',
  scopedSlots: { customRender: 'cla_name' }
}, {
  title: '组别',
  dataIndex: 'group_no',
  width: '12%',
  scopedSlots: { customRender: 'group_no' }
}, {
  title: '赛道',
  dataIndex: 'track_no',
  width: '13%',
  scopedSlots: { customRender: 'track_no' }
}, {
  title: '操作',
  width: '15%',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]

export default {
  // name: 'TableList',
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
      querySpo_id: '',
      querySearch: '',
      dataSource: [],
      cacheData: [],
      columns
    }
  },
  filters: {

  },
  created () {

  },
  methods: {
    onSearch () {
      if (this.querySearch === undefined || this.querySearch === '') {
        this.$message.error('请输入要搜索的信息')
      } else {
        console.log('查询内容', this.querySearch)
        // TODO:调用接口获取数据
        const jsonData = {
          col_id: Vue.ls.get('COL_ID'),
          searchString: this.querySearch
        }
        searchInfoServlet(jsonData, this).then(res => {
          this.dataSource = res && res.result.dataSource
          this.querySearch = undefined
          this.dataSource = this.dataSource.map(function (item, index) {
            item.key = index
            return item
          })
        }).catch(err => {
          console.log(err.toString())
        })
      }
    },
    handleChange (value, key, column) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.dataSource = newData
        console.log(target[column], value)
      }
    },
    handleEdit (key) {
      const newData = [...this.dataSource] // 浅复制
      const target = newData.filter(item => key === item.key)[0]
      // const target = this.dataSource.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.dataSource = newData // 发现数据地址有改变，重新渲染
      }
      console.log(this.dataSource)
    },
    handleDelete (key) {
      console.log('cilck delete')
      const newData = [...this.dataSource]
      this.dataSource = newData.filter(item => item.key !== key)
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
    }
    // TODO:考虑直接砍掉函数，或许传递正确的参数
    // getSignupList () {
    //   const jsonData = {
    //     col_id: Vue.ls.get('COL_ID')spo_id cla_id
    //   }
    //   console.log('获取报名信息所需的信息：', jsonData)
    //   getGameAthleteList(jsonData, this).then(res => {
    //     this.dataSource = res && res.result.dataSource
    //     this.dataSource = this.dataSource.map(function (item, index) {
    //       item.key = index
    //       return item
    //     })
    //     this.cacheData = this.dataSource.map(item => ({ ...item })) // 深克隆
    //   }).catch(err => {
    //     console.log(err.toString())
    //   })
    // }
  },
  mounted () {
  },
  watch: {
  }
}
</script>
<style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
  .page-menu-search {
    text-align: center;
    margin-bottom: 20px;
  }
</style>
