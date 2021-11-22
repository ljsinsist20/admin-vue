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
      <el-form-item>
        <el-button type="success" icon="el-icon-search" @click="addBefore(true)">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-search" @click="down()">数据导出</el-button>
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

      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="open(scope.row.id)">
            删除
          </el-button>
          <el-button type="primary" size="mini" @click="show(scope.row.id, scope.$index)">
            更新
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination @size-change="changePageSize" @current-change="changeCurrentPage" :current-page="pageNum" :page-sizes="[5, 10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%">
      <!-- 内容的主体区域 -->
      <!-- :rules="addFormRules" -->
      <el-form ref="addFormRef" :model="addForm" label-width="70px">
        <el-form-item label="学生姓名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="addForm.sex" value-key="id">
            <el-option v-for="item in sexArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>

        <el-form-item label="宿舍" prop="dormName">
          <el-select v-model="addForm.did" value-key="id">
            <el-option v-for="item in dormNameArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="班级" prop="class">
          <el-select v-model="addForm.cid" value-key="id">
            <el-option v-for="item in classNameArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="更新用户" :visible.sync="updateVisible" width="50%">
      <!-- 内容的主体区域 -->
      <!-- :rules="addFormRules" -->
      <el-form ref="updateFormRef" :model="updateForm" label-width="70px">
        <el-form-item label="学生姓名" prop="name">
          <el-input v-model="updateForm.name"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-select v-model="updateForm.sex" value-key="id">
            <el-option v-for="item in sexArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input v-model="updateForm.phone"></el-input>
        </el-form-item>

        <el-form-item label="宿舍" prop="dormName">
          <el-select v-model="updateForm.did" value-key="id">
            <el-option v-for="item in dormNameArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="班级" prop="class">
          <el-select v-model="updateForm.cid" value-key="id">
            <el-option v-for="item in classNameArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="update()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import studentsAPI from '@/api/core/student.js'
import dormAPI from '@/api/core/dorm.js'
import classAPI from '@/api/core/class.js'

export default {
  data() {
    return {
      list: null,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      searchObj: {},
      dialogVisible: false,
      updateVisible: false,
      addForm: {},
      updateForm: {},
      sexArr: [
        { id: 0, name: '男' },
        { id: 1, name: '女' }
      ],
      dormNameArr: [],
      classNameArr: [],
      id: null
      // BASE_API: process.env.VUE_APP_BASE_API
    }
  },

  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      studentsAPI.list(this.pageNum, this.pageSize, this.searchObj).then(response => {
        ;(this.list = response.data.pageInfo.list), (this.total = response.data.pageInfo.total)
      })
    },

    open(id) {
      this.$confirm('此操作将永久删除该学生记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteById(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    deleteById(id) {
      studentsAPI
        .deleteById(id)
        .then(response => {
          this.$message.success(response.message), this.fetchData()
        })
        .catch(error => {
          this.$message.error(error.message)
        })
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
    },

    //新增前的准备工作
    addBefore(flag) {
      if (flag) {
        this.dialogVisible = true
      } else {
        this.updateVisible = true
      }
      // 查询宿舍列表
      dormAPI.queryDorm().then(response => {
        this.dormNameArr = response.data.dormNameArr
      })
      // 查询班级列表
      classAPI.queryClass().then(response => {
        this.classNameArr = response.data.classNameArr
      })
    },
    //新增学生信息
    add() {
      if (this.addForm.name == null || this.addForm.name == '') {
        return this.$message.error('请输入学生姓名')
      }
      if (this.addForm.sex == null) {
        return this.$message.error('请选择性别')
      }
      if (this.addForm.phone == null || this.addForm.phone == '') {
        return this.$message.error('请输入手机号')
      }
      if (this.addForm.did == null) {
        return this.$message.error('请选择宿舍')
      }
      if (this.addForm.cid == null) {
        return this.$message.error('请选择班级')
      }
      studentsAPI
        .add(this.addForm)
        .then(response => {
          this.$message.success(response.message), this.fetchData()
          this.dialogVisible = false
          this.addForm = {}
        })
        .catch(error => {
          this.$message.error(error.message)
        })
    },

    show(id, hid) {
      //因考虑不周全，故采取如下方法
      this.updateForm = JSON.parse(JSON.stringify(this.list[hid]))
      this.id = id
      this.addBefore(false)
    },

    update() {
      if (this.updateForm.name == null || this.updateForm.name == '') {
        return this.$message.error('请输入学生姓名')
      }
      if (this.updateForm.sex == null) {
        return this.$message.error('请选择性别')
      }
      if (this.updateForm.phone == null || this.updateForm.phone == '') {
        return this.$message.error('请输入手机号')
      }
      if (this.updateForm.did == null) {
        return this.$message.error('请选择宿舍')
      }
      if (this.updateForm.cid == null) {
        return this.$message.error('请选择班级')
      }
      studentsAPI.update(this.id, this.updateForm).then(response => {
        this.$message.success(response.message)
        this.updateVisible = false
        this.fetchData()
      })
    },

    down() {
      studentsAPI.down(this.pageNum, this.pageSize, this.searchObj).then(res => {
        let blob = new Blob([res], { type: 'application/xlsx' })
        let url = window.URL.createObjectURL(blob)
        const link = document.createElement('a') //创建a标签
        link.href = url
        link.download = '学生信息.xlsx' //重命名文件
        link.click()
        URL.revokeObjectURL(url)
      })
    }
  }
}
</script>

<style>
</style>