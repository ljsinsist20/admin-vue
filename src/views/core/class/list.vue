<template>
  <div class="app-container">

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="班级名称">
        <el-input v-model="searchObj.name" placeholder="班级名称"></el-input>
      </el-form-item>
      <el-form-item label="辅导员姓名">
        <el-input v-model="searchObj.teacherName" placeholder="辅导员姓名"></el-input>
      </el-form-item>
      <el-form-item label="系名称">
        <el-input v-model="searchObj.departmentName" placeholder="系名称"></el-input>
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
        <input ref="file" type="file" accept=".xlsx,.xls" style="display: none;" @change="uploadFile">
        <el-button type="primary" icon="el-icon-download" @click="clickFile">导入数据</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" border style="width: 100%" stripe>
      <el-table-column prop="" label="#" width="50">
        <template slot-scope="scope">
          {{ (pageNum - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="班级名称">
      </el-table-column>
      <el-table-column prop="departmentName" label="系名称">
      </el-table-column>
      <el-table-column prop="teacherName" label="辅导员姓名">
      </el-table-column>
      <el-table-column prop="studentNum" label="班级人数">
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
      <el-form ref="addFormRef" :model="addForm" label-width="90px">
        <el-form-item label="班级名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="系" prop="departmentName">
          <el-select v-model="addForm.deid" value-key="id">
            <el-option v-for="item in departmentNameArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="辅导员姓名" prop="teacherName">
          <el-select v-model="addForm.tid" value-key="id">
            <el-option v-for="item in teacherNameArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
      <el-form ref="updateFormRef" :model="updateForm" label-width="90px">
        <el-form-item label="班级名称" prop="name">
          <el-input v-model="updateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="系" prop="departmentName">
          <el-select v-model="updateForm.deid" value-key="id">
            <el-option v-for="item in departmentNameArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="辅导员姓名" prop="teacherName">
          <el-select v-model="updateForm.tid" value-key="id">
            <el-option v-for="item in teacherNameArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
import classAPI from '@/api/core/class.js'
import teacherAPI from '@/api/core/teacher.js'
import departmentAPI from '@/api/core/department.js'

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
      teacherNameArr: [],
      departmentNameArr: [],
      id: null
    }
  },
  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      classAPI.list(this.pageNum, this.pageSize, this.searchObj).then(response => {
        this.list = response.data.pageInfo.list
        this.total = response.data.pageInfo.total
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

    open(id) {
      this.$confirm('此操作将永久删除该班级记录, 是否继续?', '提示', {
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
      classAPI.deleteById(id).then(response => {
        this.$message.success(response.message)
        this.fetchData()
      })
    },

    addBefore(flag) {
      if (flag) {
        this.dialogVisible = true
      } else {
        this.updateVisible = true
      }

      teacherAPI.queryTeacher().then(response => {
        this.teacherNameArr = response.data.teacherNameArr
      })
      departmentAPI.queryDepartment().then(response => {
        this.departmentNameArr = response.data.departmentNameArr
      })
    },

    add() {
      if (this.addForm.name == null || this.addForm.name == '') {
        return this.$message.error('请输入班级姓名')
      }
      if (this.addForm.tid == null) {
        return this.$message.error('请选择辅导员')
      }
      if (this.addForm.deid == null) {
        return this.$message.error('请选择系')
      }
      classAPI
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
      this.updateForm = JSON.parse(JSON.stringify(this.list[hid]))
      this.id = id
      this.addBefore(false)
    },

    update() {
      if (this.updateForm.name == null || this.updateForm.name == '') {
        return this.$message.error('请输入班级姓名')
      }
      if (this.updateForm.tid == null) {
        return this.$message.error('请选择辅导员')
      }
      if (this.updateForm.deid == null) {
        return this.$message.error('请选择系')
      }
      classAPI.update(this.id, this.updateForm).then(response => {
        this.$message.success(response.message)
        this.updateVisible = false
        this.fetchData()
      })
    },

    clickFile() {
      this.$refs.file.dispatchEvent(new MouseEvent('click'))
    },
    // 导入数据
    uploadFile() {
      const file = this.$refs.file.files
      var extName = file[0].name.substring(file[0].name.lastIndexOf('.')).toLowerCase()
      // var username = this.$store.getters.name
      if (extName === '.xlsx' || extName === '.xls') {
        var formData = new FormData()
        formData.append('file', file[0])
        // formData.append('username', username)
        classAPI
          .addExcel(formData)
          .then(response => {
              if(response.code === -213) {
              this.$message.error(response.message)
            }else{
              this.$message.success(response.message)
              this.fetchData()
            }
          })
          // .catch(err => {
          //   this.$message.error('数据导入失败!ERR:' + err)
          // })
      } else {
        this.$message.error('数据导入失败，请选择正确的xlsx模板文件')
      }
    }
  }
}
</script>

<style>
</style>