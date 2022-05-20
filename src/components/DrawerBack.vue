<template>
  <div>
    <div>
      <h2 style="display:inline; margin-left: 440px">上传失败数据</h2>
    <el-button @click="exportExcel()" style=" margin-left: 480px" type="success">导出Excel</el-button>
    </div>
    
    <!-- 把:data调回实际使用的数据是backList -->
    <el-table :data="backList" class="table" style="width: 80%; margin-top: 0px" height="500">
      <el-table-column fixed label="样本编号" width="150" prop="number">
        
      </el-table-column>
      <el-table-column label="蜘蛛名称" width="140" prop="name">
        
      </el-table-column>
      <el-table-column label="上传者" width="120" prop="username">
        
      </el-table-column>
      <el-table-column label="基因类型" width="120" prop="genetic">
        
      </el-table-column>
      <el-table-column label="采样时间" width="200" prop="time">
        
      </el-table-column>
      <el-table-column label="采样地点" width="220" prop="locations">
        
      </el-table-column>
      <el-table-column
      prop="errMessage"
        :show-overflow-tooltip="true"
        label="失败原因"
        width="270"
      >
        
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "../api/api";
export default {
  props: ["backList"],
  data() {
    return {
      // backList:[],

    };
  },
  methods:{
    exportExcel(){
      console.log(JSON.stringify(this.backList))
      const res = api.exportExcel(this.backList)
      res.then(data => {
        // if (typeof window.chrome !== 'undefined'){
          //返回的数据流中的data里就是文件
          const blob = new Blob([data.data],{ type: 'application/vnd.ms-excel;charset=utf-8' })
          const urls = window.URL.createObjectURL(blob)
          const a = document.createElement('a') // 生成虚拟a标签
          a.href = urls
          a.download = 'model' + '.xlsx'
          a.click()
          document.body.removeChild(a) // 下载完成移除元素
          window.URL.revokeObjectURL(urls) // 释放掉blob对象
        // }
      }
      )
      console.log(res)

      
    }
  },
  mounted(){
    console.log(this.backList)
  }

};
</script>

<style scoped>
.table {
  margin: auto;
}
</style>