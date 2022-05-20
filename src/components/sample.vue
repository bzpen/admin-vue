<template>
  <div>
    <el-card style="width: 80%; margin: auto">
        <div style="text-align:right"><a href='#/SampleList' >返回</a></div>
        
      <el-descriptions>
        <el-descriptions-item label="上传者"
          >{{ singleSample["username"] }}
        </el-descriptions-item>

        <el-descriptions-item label="序列id">{{
          singleSample["id"]
        }}</el-descriptions-item>
      </el-descriptions>
      <el-form :model="singleSample" :inline="true">
        <el-form-item
          label="蜘蛛名称"
          style="width: 45%; text-align: -moz-left"
        >
          <el-input :disabled="readonly" v-model="singleSample.name" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item
          label="基因类型"
          style="width: 45%; text-align: -moz-left"
        >
          <el-input :disabled="readonly" v-model="singleSample.genetic" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item
          label="基因编号"
          style="width: 45%; text-align: -moz-left"
        >
          <el-input :disabled="readonly" v-model="singleSample.number" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item
          label="采样时间"
          style="width: 45%; text-align: -moz-left"
        >
          <el-date-picker
          :disabled="readonly"
            v-model="singleSample.time"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd hh:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="采样地点"
          style="width: 92%; text-align: -moz-left"
        >
          <el-input :disabled="readonly" v-model="singleSample.locations" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item
          label="坐标经度"
          style="width: 45%; text-align: -moz-left"
        >
          <el-input :disabled="readonly" v-model="singleSample.jdu" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item
          label="坐标纬度"
          style="width: 45%; text-align: -moz-left"
        >
          <el-input :disabled="readonly" v-model="singleSample.wdu" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item
          label="样本序列"
          style="width: 92%; text-align: -moz-left"
        >
        
            <el-input
            :disabled="readonly"
            v-model="singleSample.list"
            style="width: 500px"
            type="textarea"
          ></el-input>
        
          
        </el-form-item>
        <el-form-item
          label="样本备注"
          style="width: 92%; text-align: -moz-left"
        >
          <el-input
          :disabled="readonly"
            v-model="singleSample.remark"
            style="width: 500px"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="read()">切换编辑状态</el-button>
      <el-button @click="submit()" type="success" :disabled="button">更新数据</el-button>
    </el-card>
  </div>
</template>

<script>
import api from "../api/api";
export default {
  data() {
    return {
      id: "",
      singleSample: "",
      readonly:true,
      button:true,
    };
  },
  methods: {
    async getData() {
      const res = api.sampleGet(this.id);
    //   console.log(res);
      res.then((data) => {
          console.log(data.data)
          this.singleSample = data.data
      });
    },
    read(){
        this.readonly = this.readonly==false?true:false;
        this.button = this.button==true?false:true;
        console.log(this.readonly)
    },
    async submit(){
        console.log("submit")
        const res = await api.sampleUpdate(this.singleSample)
        console.log(res)
        if(res.code == 500){
            this.$message({
            message: res.msg,
            type: "error",
          });
        }else{
           this.$message({
            message: res.msg,
            type: "success",
          }); 
        }
    }
  },
  created() {
    //   console.log(sessionStorage.getItem('id'))
    this.id = sessionStorage.getItem("id");
    this.getData();
  },
};
</script>

<style scoped>

</style>