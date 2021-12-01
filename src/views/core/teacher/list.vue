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
      <el-form-item>
        <el-button type="success" icon="el-icon-search" @click="addBefore()">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-search" @click="down()">数据导出</el-button>
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
        <el-form-item label="辅导员姓名" prop="name">
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
        <el-form-item label="辅导员姓名" prop="name">
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
import teacherAPI from '@/api/core/teacher.js'
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
      ]
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      teacherAPI.list(this.pageNum, this.pageSize, this.searchObj).then(response => {
        ;(this.list = response.data.pageInfo.list), (this.total = response.data.pageInfo.total)
      })
    },

    open(id) {
      this.$confirm('此操作将永久删除该老师记录, 是否继续?', '提示', {
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
      teacherAPI.deleteById(id).then(response => {
        this.$message.success(response.message)
        this.fetchData()
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

    addBefore() {
      this.dialogVisible = true
      this.addForm = {}
    },
    add() {
      if (this.addForm.name == null || this.addForm.name == '') {
        return this.$message.error('请输入辅导员姓名')
      }
      if (this.addForm.sex == null) {
        return this.$message.error('请选择辅导员性别')
      }
      if (this.addForm.phone == null || this.addForm.phone == '') {
        return this.$message.error('请输入辅导员手机号')
      }
      teacherAPI.add(this.addForm).then(response => {
        this.$message.success(response.message)
        this.dialogVisible = false
        this.fetchData()
      })
    },

    show(id, hid) {
      this.updateVisible = true
      this.updateForm = JSON.parse(JSON.stringify(this.list[hid]))
      this.id = id
    },

    update() {
      if (this.updateForm.name == null || this.updateForm.name == '') {
        return this.$message.error('请输入辅导员姓名')
      }
      if (this.updateForm.sex == null) {
        return this.$message.error('请选择辅导员性别')
      }
      if (this.updateForm.phone == null || this.updateForm.phone == '') {
        return this.$message.error('请输入辅导员手机号')
      }
      teacherAPI.update(this.id, this.updateForm).then(response => {
        this.$message.success(response.message)
        this.updateVisible = false
        this.fetchData()
      })
    },

    down() {
      teacherAPI.down(this.pageNum, this.pageSize, this.searchObj).then(res => {
        let blob = new Blob([res], { type: 'application/xlsx' })
        let url = window.URL.createObjectURL(blob)
        const link = document.createElement('a') //创建a标签
        link.href = url
        link.download = '辅导员信息.xlsx' //重命名文件
        link.click()
        URL.revokeObjectURL(url)
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
        teacherAPI
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