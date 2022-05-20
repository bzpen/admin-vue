<template>
  <div>
    <el-card style="width: 60%; margin: auto">
      <div style="text-align: right"><a href="#/SpidersForm">返回</a></div>

      <el-descriptions>
        <el-descriptions-item label="蜘蛛名称"
          >{{ this.data.spider.name }}
        </el-descriptions-item>

        <el-descriptions-item label="蜘蛛id">{{
          this.data.spider.id
        }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{
          this.data.spider.remark
        }}</el-descriptions-item>
      </el-descriptions>
      
      <div class="demo-image__lazy">
        <scroll-container>
          <el-image v-for="url in urls" :key="url" :src="'api'+url" lazy></el-image>
        </scroll-container>
        
      </div>
      
    </el-card>
  </div>
</template>

<script>
import api from "../api/api";
export default {
  data() {
    return {
      urls:[],
      id: "",
      data: "",
    };
  },
  methods: {
    getData() {
      const res = api.spiderGet(this.id);
      res.then((data) => {
        this.data = data.data;
        this.urls = data.data.img_path
        console.log(this.data);
      });
      // this.data = res
      // console.log(this.data)
    },
  },
  activated() {
    this.id = this.$store.getters.getData;
    // console.log(this.id)
    this.getData();
  },
};
</script>

<style scoped>
.demo-image__lazy{
  overflow: scroll ;
  height: 70vh;
  overflow-x: hidden;
}
</style>