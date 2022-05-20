<template>
  <div>
      <div>
      <!-- <font style="margin-left: -200px">用户等级 </font>
      <el-select
        v-model="value"
        placeholder="请选择"
        style="margin-right: 200px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select> -->
      <!-- <el-input style="width: 260px;margin-left:200px" placeholder="请输入内容" ></el-input>
      <el-button icon="el-icon-search" type="success" plain>查询</el-button> -->
      <!-- <el-button icon="el-icon-circle-plus-outline" type="success" plain @click="dialogFormVisible = true">更新一条spider数据</el-button> -->
    </div>
      <!-- 表格 -->
    <el-table
      ref="tableData"
      :data="tableData"
      height="580"
      style="width: 64%"
      
    >
      
      <el-table-column prop="id" label="蜘蛛编号" width="150">
        <template slot-scope="scope">
          <p>{{ scope.row.id }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="蜘蛛名称" width="200">
      </el-table-column>
      <el-table-column prop="sample" label="序列数量" width="150">
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="200">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="90">
        <template slot-scope="scope">
          <!-- 查看当前行的样本详情 -->
          <el-button
            @click="
            id = scope.row.id
              deleteVisible = true;
              single = scope.row;
              spiderName = scope.row.name;
            "
            type="danger"
            plain
            size="mini"
          >
            删除
          </el-button>
          <el-button
            @click="
              id = scope.row.id
              single = scope.row;
              spiderName = scope.row.name;
              details()
            "
            type="success"
            plain
            size="mini"
            style="margin: 0px; margin-top: 10px"
          >
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 
      删除的那个弹框 
    -->
    <el-dialog title="提示" :visible.sync="deleteVisible" width="30%">
      <span
        >确认要删除蜘蛛种类:&nbsp;&nbsp;{{ this.spiderName }}&nbsp;&nbsp;吗</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button
          type="warning"
          @click="
            deletespider();
            deleteVisible = false;
          "
          >确 认</el-button
        >
      </span>
    </el-dialog>
    <!-- 
      插入的那个弹框 
    -->
    <el-dialog title="插入新数据" :visible.sync="dialogFormVisible">
      <!-- 弹出框里的那个表单 -->
  
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import api from "../api/api";
import { getAll } from "../api/getData";
import { deletespider } from "../api/getData";

export default {
data(){
    return{
      id:"",
        deleteVisible : false,
        tableData: [],
        spiderName:"",
        single:"",
        dialogFormVisible:false,
    }
},
methods:{
  async details(){
     const res = await api.spiderGet(this.id)
    console.log(res)
    if(res.data == null){
      this.$message({
            message: "该蜘蛛没有图片",
            type: "error",
          });
    }else{
      this.$store.commit('setData',this.id)
    
    // sessionStorage.setItem('id', res.data.spider.id)
   // sessionStorage.setItem('remark', res.data.spider.remark)
    // sessionStorage.setItem('img_path', res.data.img_path)
    this.$router.push("/Photo");
    }
    
  },
async deletespider() {
      try {
        const res = await api.spiderDel(this.id);
        console.log(res);
        //提示信息
        // console.log(row.spiderId)
        // this.$message({
        //   type: "success",
        //   message: res.msg,
        // });
        //重新加载表格
         this.getData();
        // // const form = getAll();
        // form.then((data) => {
        //   console.log(data);
        //   this.tableData = data.data;
        // });
      } catch (err) {
        console.log(err);

        this.$message({
          type: "error",
          message: "服务器异常，请稍后再试！",
        });
      }
    },
    //获取数据那个方法
    async getData(){
      const res = await api.spiderList()
      console.log(res)
      this.tableData = res.data;
    }
},
//钩子函数
  created() {
    // const res = getAll();
    // console.log("res")
    // console.log(res)
    // res.then((data) => {
    //   console.log(data);
    //   console.log(data.data);
    //    this.tableData = data.data;
    //    console.log("this.tableData");
    //    console.log(this.tableData);
    // });
  },
  activated(){
    this.getData();
  }
}
</script>

<style>

</style>