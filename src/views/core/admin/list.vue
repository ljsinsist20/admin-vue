<template>
  <div class="app-container">

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="success" icon="el-icon-search" @click="addBefore()">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" border style="width: 100%" stripe>
      <el-table-column prop="" label="#" width="50">
        <template slot-scope="scope">
          {{ (pageNum - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="管理员姓名">
      </el-table-column>
      <el-table-column prop="role" label="权限">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.role === 'administrator'" type="warning">超级管理员</el-tag>
          <el-tag v-if="scope.row.role === 'common'">普通用户</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="state" label="用户状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state === 0" type="warning">正常</el-tag>
          <el-tag v-if="scope.row.state === 1" type="danger">锁定</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="open(scope.row.id, scope.row.role)">
            删除
          </el-button>
          <el-tag v-if="scope.row.state === 1" type="danger">
            <el-button type="warning" size="mini" @click="updateState(scope.row.id, scope.row.userName)">
              解锁
            </el-button>
          </el-tag>
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
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.passWord"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="sex">
          <el-select v-model="addForm.role" value-key="id">
            <el-option v-for="item in roleArr" :key="item.id" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import adminAPI from '@/api/core/admin.js'
export default {
  data() {
    return {
      list: null,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      addForm: {},
      dialogVisible: false,
      roleArr: [
        { id: 0, name: '超级管理员', value: 'administrator' },
        { id: 1, name: '普通用户', value: 'common' }
      ]
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      adminAPI.list(this.pageNum, this.pageSize).then(response => {
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
    },

    addBefore() {
      this.addForm = {}
      this.dialogVisible = true
    },

    add() {
      if (this.addForm.userName == null) {
        return this.$message.error('请输入用户名')
      }
      if (this.addForm.passWord == null) {
        return this.$message.error('请输入用户密码')
      }
      if (this.addForm.passWord.length < 6) {
        return this.$message.error('密码长度不能小于6位')
      }
      if (this.addForm.role == null) {
        return this.$message.error('请选择用户权限')
      }

      adminAPI.add(this.addForm).then(response => {
        this.$message.success(response.message)
        this.dialogVisible = false
        this.fetchData()
      })
    },

    open(id, role) {
      this.$confirm('此操作将永久删除该用户记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteById(id, role)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    deleteById(id, role) {
      adminAPI.deleteById(id, role).then(response => {
        this.$message.success(response.message)
        this.fetchData()
      })
    },

    updateState(id, userName) {
      adminAPI.updateState(id, userName).then(response => {
        this.$message.success(response.message)
        this.fetchData()
      })
    }
  }
}
</script>

<style>
</style>