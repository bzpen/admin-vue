<template>
  <div>
    <div class="drawerSearch">
          <el-button @click="deleteSelect()" type="danger" style="margin-left:-270px">批量删除</el-button>
        <el-input
          placeholder="请输入内容"
          style="width: 200px;margin-left:600px"
          v-model="page.search"
          
        ></el-input>
        <el-button type="success" @click="getList()" plain>搜索</el-button>
        <!-- <el-button @click="toggleSelection()" style="margin-left:400px" >取消选择</el-button> -->

      </div>

    <!-- 表格 -->
    <el-table
      ref="tableData"
      :data="tableData"
      height="498"
      style="width: 77%;margin-top:20px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" fixed="left"> </el-table-column>
      <el-table-column prop="id" label="管理员编号" width="150">
        <template slot-scope="scope">
          <p>{{ scope.row.id }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="管理员姓名" width="150">
      </el-table-column>
      <el-table-column prop="username" label="管理员账号" width="150">
      </el-table-column>
      <el-table-column prop="roidName" label="管理员等级" width="150">
      </el-table-column>
      <el-table-column prop="registTime" label="注册时间" width="150">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <!-- 查看当前行的样本详情 -->
          <el-button
            @click="
              deleteVisible = true;
              single = scope.row;
              adminname = scope.row.name;
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
      <span
        >确认要删除管理员:&nbsp;&nbsp;{{ this.adminname }}&nbsp;&nbsp;吗</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button
          type="warning"
          @click="
            delete_Admin(single);
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
      adminname: "",
      multiSelect: "",
      page:{
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
    async delete_Admin(row) {
      try {
        // const res = await delete_Admin({
        //   admin_id: row.admin_id,
        // });
        // console.log(res);
        // //提示信息
        // this.$message({
        //   type: "success",
        //   message: res.msg,
        // });
        // //重新加载表格
        // const form = getAdmins();
        // form.then((data) => {
        //   console.log(data);
        //   this.tableData = data.admins;
        // });
        console.log(row.id)
        const res = await api.adminDel(row.id)
        console.log(res);
        //提示信息
        this.$message({
          type: "success",
          message: res.msg,
        });
        this.getList();
      } catch (err) {
        console.log(err);

        this.$message({
          type: "error",
          message: "服务器异常，请稍后再试！",
        });
      }
    },
    //多选选择器的那个方法
    handleSelectionChange(val) {
      // console.log("下面那个是多选的数据");
      //  console.log(val)
      this.multiSelect = val;
    },
    //批量删除
    async deleteSelect() {
      console.log(this.multiSelect);
      const res = await api.listDel(this.multiSelect)
      console.log(res)
      this.getList();
    },
    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.tableData.toggleRowSelection(row);
          });
        } else {
          this.$refs.tableData.clearSelection();
        }
      },
      //加载表格
    async getList(){
      const res = await api.adminList(this.page)
      console.log("获取管理员列表")
      console.log(res)
      this.tableData = res.data.record;
      this.pageData=res.data;
    },
      
  },
  //钩子函数
  activated() {
    // const res = getAdmins();
    // res.then((data) => {
    //   console.log(data);
    //   this.tableData = data.admins;
    // });
    this.getList();
  },
};
</script>

<style>
</style>