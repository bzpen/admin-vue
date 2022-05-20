<template>
  <div>
    <div>
      <!-- <el-button @click="toggleSelection()" style="margin-right: 30px;margin-left:-130px"
      >取消选择</el-button
    >
    <el-button @click="deleteSelect()" type="danger" style="margin-right:50px">批量删除</el-button> -->
      <el-button @click="deleteSelect()"  style="margin-left:-100px;margin-right:100px" type="danger">批量删除</el-button>
      <font>蜘蛛种类</font>
      <el-select
        v-model="page1.search"
        placeholder="请选择"
        style="margin-right: 200px"
        @change="getData1"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
      <el-input
        style="width: 260px;margin-left:100px"
        placeholder="请输入内容"
        v-model="page.search"
      ></el-input>
      <el-button icon="el-icon-search" type="success" plain @click="getData()"
        >查询</el-button
      >
    </div>
    <el-table
      :data="userList"
      style="width: 100%; margin-top: 8px;"
      height="530"
      class="table"
      @selection-change="handleSelectionChange"
    >
      <!-- 多选功能 -->
      <el-table-column type="selection" width="55" fixed="left">
      </el-table-column>
      <el-table-column prop="id" label="序列id" width="150">
        <template slot-scope="scope">
          <p>{{ scope.row.id }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="蜘蛛种类" width="140">
      </el-table-column>
      <el-table-column prop="username" label="上传者" width="120">
      </el-table-column>
      <el-table-column prop="genetic" label="基因类型" width="120">
      </el-table-column>
      <el-table-column prop="time" label="采样时间" width="200">
      </el-table-column>
      <el-table-column prop="locations" label="采样地点" width="220">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="list"
        label="样本序列"
        width="270"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click="single = scope.row;id = scope.row.id;sample(single);"
            type="success"
            plain
            size="mini"
          >
            查看详情
          </el-button>
          <el-button
            @click="
              deleteVisible = true;
              single = scope.row;
              id = scope.row.id;
            "
            type="warning"
            plain
            style="margin: 0px; margin-top: 10px"
            size="mini"
          >
            删除该条
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
      :total="tableData.total"
      class="pagechange"
    >
    </el-pagination>
    <!-- 弹出框 -->
    <el-dialog title="提示" :visible.sync="deleteVisible" width="30%">
      <span>确认要删除该条id:&nbsp;&nbsp;{{ this.id }}&nbsp;&nbsp;吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button
          type="warning"
          @click="
            delete_Sample(single);
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
      options: [],
      page: {
        pageSize: 10,
        pageNum: 1,
        search: "",
      },
      page1: {
        pageSize: 10,
        pageNum: 1,
        search: "",
      },
      singleSample: "",
      userList: [],
      tableData: {},
      deleteVisible: false,
      id: "",
      multiSelect: "",
    };
  },
  methods: {
    //多选选择器的那个方法
    handleSelectionChange(val) {
      // console.log("下面那个是多选的数据");
      //  console.log(val)
      this.multiSelect = val;
    },
    //批量删除
    async deleteSelect() {
      console.log(this.multiSelect);
      const res = await api.sampleListDel(this.multiSelect)
      console.log("hanchu")
      console.log(res)
      this.getData();
    },
    //查看详情的方法
    sample(row) {
      //保存id
      sessionStorage.setItem("id", row.id)
      console.log(sessionStorage.getItem('id'))
      this.$router.push("/Sample");
    },
    async delete_Sample(row) {
      try {
        
        console.log(row.id);
        const res = await api.sampleDel(row.id);
        console.log(res);
        //提示信息
        this.$message({
          type: "success",
          message: res.msg,
        });
        this.getData();
      } catch (err) {
        console.log(err);

        this.$message({
          type: "error",
          message: "服务器异常，请稍后再试！",
        });
      }
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.page.pageSize = size;
      this.getData();
      console.log(this.page.pageSize); //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.page.pageNum = currentPage;
      this.getData();
      console.log(this.page.pageNum); //点击第几页
    },
    //被调用的获取蜘蛛数据方法
    async getData() {
      const res = await api.sampleList(this.page);
      console.log("this.page");
      console.log(this.page);
      console.log(res);
      this.userList = res.data.record;
      this.tableData = res.data;
      console.log(this.tableData);
    },
    async getData1() {
      const res = await api.sampleList(this.page1);
      console.log("this.page");
      console.log(this.page1);
      console.log(res);
      this.userList = res.data.record;
      this.tableData = res.data;
      console.log(this.tableData);
    },
  },
  activated() {
    this.getData();
  },
  //被Main组件调用的方法
  created() {
    const res = api.spiderList();
    console.log(res);
    res.then((data) => {
      this.options = data.data;
      console.log("this.options");
      console.log(this.options);
    });
  },
};
</script>

<style>
</style>