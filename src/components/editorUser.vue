<template>
  <div>
    <div>
      <!-- <el-button @click="toggleSelection()" style="margin-right: 30px;margin-left:-130px"
      >取消选择</el-button
    > -->
    <el-button @click="deleteSelect()" type="danger" style="margin-right:50px;margin-left:-220px">批量删除</el-button>
      <font style="margin-left:150px">用户等级 </font>
      <el-select
        v-model="page1.search"
        placeholder="请选择"
        style="margin-right: 200px"
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
      <el-input style="width: 260px;margin-left:-150px" placeholder="请输入内容" v-model="page.search"></el-input>
      <el-button icon="el-icon-search" type="success" plain @click="getList()">查询</el-button>
    </div>
    

    <!-- 表格 -->
    <el-table
      ref="tableData"
      :data="tableData"
      height="500"
      style="width: 80%; margin-bottom: 15px; margin-top: 15px"
      @selection-change="handleSelectionChange"
      :default-sort="{ prop: 'id', order: 'descending' }"
    >
      <!-- 多选功能 -->
      <el-table-column type="selection" width="55" fixed="left">
      </el-table-column>
      <el-table-column prop="id" label="用户编号" width="250" sortable>
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
              deleteVisible = true;
              single = scope.row;
              username = scope.row.username;
            "
            type="danger"
            plain
          >
            删除
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

    <el-dialog title="提示" :visible.sync="deleteVisible" width="30%">
      <span>确认要删除账号:&nbsp;&nbsp;{{ this.username }}&nbsp;&nbsp;吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button
          type="warning"
          @click="
            deleteUser(single);
            deleteVisible = false;
          "
          >确 认</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "../api/api";

export default {
  data() {
    return {
      tableData: [],
      deleteVisible: false,
      single: "",
      username: "",
      multiSelect: "",
      options: [],
      roleId:"",
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
    //删除单个用户方法
    async deleteUser(row) {
      try {

        const res = await api.userDel(row.id)
        console.log("删除单条")
        console.log(res)
        // //提示信息
        // this.$message({
        //   type: "success",
        //   message: res.msg,
        // });
        //重新加载表格
        this.getList();
      } catch (err) {
        this.$message({
          type: "error",
          message: "服务器异常，请稍后再试！",
        });
      }
    },
    // 多选选择器的那个方法
    handleSelectionChange(val) {
      // console.log(val)
      this.multiSelect = val;
    },
    // deleteSelect() {
    //   console.log("下面那个是多选的数据");
    //   console.log(this.multiSelect);
    //   // var my_array = new Array();
    //   // var i = 0
    //   // for (i = 0;i < 10; i++) {
    //   //   my_array[i] = this.multiSelect[i].userId;
    //   // }
    //   // console.log(my_array);
    // },
    //批量删除
    async deleteSelect() {
      console.log(this.multiSelect);
      const res = await api.userListDel(this.multiSelect)
      console.log(res)
      this.getList();
    },
    ////取消多选
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach((row) => {
    //       this.$refs.tableData.toggleRowSelection(row);
    //     });
    //   } else {
    //     this.$refs.tableData.clearSelection();
    //   }
    // },
     //加载表格
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
  //只执行一次的钩子函数
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