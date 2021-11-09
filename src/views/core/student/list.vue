<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="学生姓名">
        <el-input v-model="searchObj.name" placeholder="学生姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="searchObj.sex" placeholder="性别">
          <el-option label="男生" value="0"></el-option>
          <el-option label="女生" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="宿舍">
        <el-input v-model="searchObj.dormName" placeholder="宿舍"></el-input>
      </el-form-item>
            <el-form-item label="班级">
        <el-input v-model="searchObj.className" placeholder="班级"></el-input>
      </el-form-item>
            <el-form-item label="系">
        <el-input v-model="searchObj.departmentName" placeholder="系"></el-input>
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
      <el-table-column prop="name" label="学生姓名">
      </el-table-column>
       <el-table-column prop="sex" label="性别">
         <template slot-scope="scope">
           <el-tag v-if="scope.row.sex === 0">男</el-tag>
           <el-tag v-if="scope.row.sex === 1" type="warning">女</el-tag>
         </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号">
      </el-table-column>
      <el-table-column prop="teacherName" label="辅导员">
      </el-table-column>
      <el-table-column prop="dormName" label="宿舍">
      </el-table-column>
      <el-table-column prop="className" label="班级">
      </el-table-column>
      <el-table-column prop="departmentName" label="系">
      </el-table-column>
      <!-- <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary" size="mini" @click="lock(scope.row.id, 0)">
            锁定
          </el-button>
          <el-button v-else type="danger" size="mini" @click="lock(scope.row.id, 1)">
            解锁
          </el-button>
          <el-button type="primary" size="mini" @click="showLoginRecord(scope.row.id)">
            登录日志
          </el-button>
        </template>
      </el-table-column>  -->
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
import studentsAPI from "@/api/core/student.js"
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
      studentsAPI.list(this.pageNum, this.pageSize, this.searchObj) .then((response) =>   
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

    resetData() {
      this.searchObj = {}
      this.fetchData()
    }
  }
}
</script>

<style>

</style>