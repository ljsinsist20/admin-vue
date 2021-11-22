<template>
  <div class="app-container">

    <!-- <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="success" icon="el-icon-search" @click="addBefore()">新增</el-button>
      </el-form-item>
    </el-form> -->

    <el-table :data="list" border style="width: 100%" stripe>
      <el-table-column prop="" label="#" width="50">
        <template slot-scope="scope">
          {{ (pageNum - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="modul" label="模块">
      </el-table-column>
      <el-table-column prop="type" label="操作">
      </el-table-column>
      <el-table-column prop="desc" label="操作人">
      </el-table-column>
      <el-table-column prop="createTime" label="时间">
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination @size-change="changePageSize" @current-change="changeCurrentPage" :current-page="pageNum" :page-sizes="[5, 10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>


<script>
import logAPI from '@/api/core/log.js'
export default {
  data() {
    return {
      list: null,
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      logAPI.list(this.pageNum, this.pageSize).then(response => {
        ;(this.list = response.data.pageInfo.list), (this.total = response.data.pageInfo.total)
      })
    },

    changeCurrentPage(pageNum) {
      this.pageNum = pageNum
      this.fetchData()
    },

    changePageSize(pageSize) {
      this.pageSize = pageSize
      this.fetchData()
    }
  }
}
</script>

<style>
</style>