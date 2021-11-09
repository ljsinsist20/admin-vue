<template>
<div class="app-container">

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="辅导员姓名">
        <el-input v-model="searchObj.name" placeholder="辅导员姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="resetData()">清除</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" border style="width: 100%" stripe>
      <el-table-column prop="" label="#" width="50">
        <template slot-scope="scope">
          {{ (pageNum - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="辅导员姓名">
      </el-table-column>
       <el-table-column prop="sex" label="性别">
         <template slot-scope="scope">
           <el-tag v-if="scope.row.sex === 0">男</el-tag>
           <el-tag v-if="scope.row.sex === 1" type="warning">女</el-tag>
         </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号">
      </el-table-column>
    </el-table>
    
    <div class="block">
      <el-pagination  @size-change="changePageSize" 
                      @current-change="changeCurrentPage" 
                      :current-page="pageNum" 
                      :page-sizes="[5, 10, 20, 30]" 
                      :page-size="pageSize" 
                      layout="total, sizes, prev, pager, next, jumper" 
                      :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import teacherAPI from "@/api/core/teacher.js"
export default {
  data() {
    return {
      list: null,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      searchObj: {}
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      teacherAPI.list(this.pageNum, this.pageSize, this.searchObj).then((response) => 
      {this.list = response.data.pageInfo.list, this.total = response.data.pageInfo.total})
    },

    changeCurrentPage(pageNum) {
      this.pageNum = pageNum
      this.fetchData()
    },

    changePageSize(pageSize) {
      this.pageSize = pageSize
      this.fetchData()
    },

    resetData(){
      this.searchObj = {}
      this.fetchData()
    }
  }
}
</script>

<style>

</style>