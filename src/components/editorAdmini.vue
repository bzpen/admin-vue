<template>
  <div>
    <div>
      
      <font style="margin-left:0px">用户等级 </font>
      <el-select
        v-model="page1.search"
        placeholder="请选择"
        
        @change="getList1"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.name"
          
        >
        </el-option>
      </el-select>
      <el-input style="width: 260px;margin-left:200px" placeholder="请输入内容" v-model="page.search"></el-input>
      <el-button icon="el-icon-search" type="success" plain @click="getList()">查询</el-button>

    </div>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      height="535"
      style="width: 80%"
      
    >
      
      <el-table-column prop="id" label="用户编号" width="250">
        <template slot-scope="scope">
          <p>{{ scope.row.id }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户账号" width="250">
      </el-table-column>
      <el-table-column prop="email" label="用户邮箱" width="250">
      </el-table-column>
      <el-table-column prop="registTime" label="注册时间" width="250">
      </el-table-column>
      <el-table-column prop="upLoginTime" label="上次登录时间" width="250">
      </el-table-column>
      <el-table-column prop="name" label="用户等级" width="250">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="90">
        <template slot-scope="scope">
          <!-- 查看当前行的样本详情 -->
          <el-button
            @click="
              upVisible = true;
              single = scope.row;
            "
            type="success"
            plain
            size="mini"
          >
            升级
          </el-button>
          <el-button
            @click="
              downVisible = true;
              single = scope.row;
            "
            type="warning"
            plain
            style="margin: 0px; margin-top: 10px"
            size="mini"
          >
            降级
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="page.currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="page.pagesize"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageData.total"
      class="pagechange"
    >
    </el-pagination>
    <el-dialog title="提示" :visible.sync="upVisible" width="30%">
      <span>确认要升级吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="upVisible = false">取 消</el-button>
        <el-button
          type="warning"
          @click="
            up_User(single);
            upVisible = false;
          "
          >确 认</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="downVisible" width="30%">
      <span>确认要降级吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="downVisible = false">取 消</el-button>
        <el-button
          type="warning"
          @click="
            down_User(single);
            downVisible = false;
          "
          >确 认</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "../api/api";
import { getUsers, up_User, down_User } from "../api/getData";
export default {
  data() {
    return {
      tableData: [],
      upVisible: false,
      downVisible: false,
      single: "",
      page:{
        pageSize: 10,
        pageNum: 1,
        search:"",
      },
      page1:{
        pageSize: 10,
        pageNum: 1,
        search:"",
      },
      pageData:{}
    };
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.page.pageSize = size;
      this.getList();
      console.log(this.page.pageSize); //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {

      this.page.pageNum = currentPage;
      this.getList();
      console.log(this.page.pageNum); //点击第几页
    },
    //用户升级的那个方法
    async up_User(row) {
      try {
        // const res = await up_User({
        //   userId: row.userId,
        // });
        const res = await api.roleUp(row.id);
        
        //提示信息
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: res.msg,
          });
        } else {
          this.$message({
            type: "error",
            message: res.msg,
          });
        }

        //重新加载表格
        // const form = getUsers();
        // form.then((data) => {
        //   console.log(data);
        //   this.tableData = data.users;
        // });
        this.getList();
      } catch (err) {
        console.log(err);

        this.$message({
          type: "error",
          message: "服务器异常，请稍后再试！",
        });
      }
    },
    //用户降级的那个方法
    async down_User(row) {
      try {
        const res = await api.roleDown(row.id);
        console.log(res);
        //提示信息
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: res.msg,
          });
        } else {
          this.$message({
            type: "error",
            message: res.msg,
          });
        }
        //重新加载表格
        this.getList();
      } catch (err) {
        console.log(err);

        this.$message({
          type: "error",
          message: "服务器异常，请稍后再试！",
        });
      }
    },
    //获取用户列表
    async getList(){
      const res = await api.userList(this.page)
      console.log("获取用户列表")
      console.log(res)
      this.tableData = res.data.record;
      this.pageData=res.data;
    },
    async getList1(){
      const res = await api.userList(this.page1)
      console.log("getList1")
      console.log(res)
      this.tableData = res.data.record;
      this.pageData=res.data;
    },
    async roleGet(){
      const res = await api.roleGet()
      console.log("用户权限获取")
      console.log(res)
      this.options = res.data
    }
  },
  created() {
    //获取用户权限列表的方法
    this.roleGet();
  },
  //每次点击都执行的钩子
  activated() {
    //加载用户列表的方法
    this.page.pageSize = 10;
    this.page.pageNum = 1;
    this.page.search = "";
    this.getList();
  },

};
</script>

<style>
</style>