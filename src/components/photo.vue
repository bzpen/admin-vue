<template>
  <div>
      <el-card style="width: 60%; margin: auto">
    <h1>详情编辑</h1>
<div style="text-align: right"><a href="#/SpidersForm" @click="fff()">返回</a></div>
    <table class="exhibit_table">
      <tr>
        <th>图片</th>
        <th style="width: 200px">图片名</th>
        <th style="width: 200px">操作</th>
      </tr>
      <tr v-for="(item, index) in img_path" :key="index">
        <td>
          <div class="demo-image__preview">
            <el-image
              style="width: 80px; height: 80px"
              :src="item"
              :preview-src-list="urlList[index]"
            >
            </el-image>
          </div>
        </td>
        <td>
            {{item.split('/')[3]+'/' + item.split('/')[4]}}
        </td>
        <td>
            <template>
              <el-button
                type="danger"
                @click="deda(item)"
                plain
              >
                删除
              </el-button>
            </template>
        </td>
      </tr>
    </table>

    <!-- <div class="demo-image__preview">
      <el-image
        style="width: 80px; height: 80px"
        :src="img_path[0]"
        :preview-src-list="img_path"
      >
      </el-image>
    </div> -->
    <!-- <el-table-column prop="id" label="图片名" width="500">
        <template slot-scope="scope">
          <p>{{ scope.row.id }}</p>
        </template>
      </el-table-column> -->
    <!-- 
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
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
      </el-table-column> -->
      </el-card>
  </div>
</template>

<script>
import api from "../api/api";
export default {
  data() {
    return {
      data: [],
      img_path: "",
      font:"",
      urlList:[

      ]
    };
  },
  methods: {
    //多选选择器的那个方法
    handleSelectionChange(val) {
      // console.log("下面那个是多选的数据");
      //  console.log(val)
      this.multiSelect = val;
    },
    getData() {
      const res = api.spiderGet(this.id);
      res.then((data) => {
        this.data.push(data.data.spider);
        this.img_path = data.data.img_path;
        
        for(var i=0;i<this.img_path.length;i++){
            this.img_path[i] = "api" + this.img_path[i]
            var url=[]
            url.push(this.img_path[i])
            this.urlList.push(url)

            // console.log(this.urlList)
        }


        // console.log(this.data);
        // console.log(this.img_path);
      });
      // this.data = res
      // console.log(this.data)
    },
    deda(item){
        // this.font = item.split('/')[3]+'/' + item.split('/')[4]
        // console.log(item.split('/')[3]+'/' + item.split('/')[4])
        const res = api.delImage({
          filePath:item.split('/')[3]+'/' + item.split('/')[4]
        })
        console.log(res)
        this.getData()
    },
    fff(){
        console.log("ffff")
        var url=[]
        this.urlList = url
    }
  },
  activated() {
    this.id = this.$store.getters.getData;
    // console.log(this.id)
    this.getData();
  },
};
</script>

<style scoped>

</style>