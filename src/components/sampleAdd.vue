<template>
  <div>
    <el-card shadow="always" class="UploadCard" style="margin-top:-7px">
      <div class="UploadTitle">新增样本序列</div>
      <el-divider ></el-divider>
      <el-form :inline="true" ref="uploadList" :model="uploadList" style="margin-top:-15px">
        <el-form-item label="基因编号" style="width: 44%">
          <el-input v-model="uploadList.sampleNumber"></el-input>
        </el-form-item>

        <el-form-item label="采样地点" style="width: 45%">
          <el-input v-model="uploadList.sampleLocations"></el-input>
        </el-form-item>

        <el-form-item label="基因类型" style="width: 46%">
          <el-input v-model="uploadList.sampleGenetic"></el-input>
        </el-form-item>
        <el-form-item style="width: 45%"></el-form-item>

        <el-form-item label="所属蜘蛛种类" style="width: 40%">
          <el-select placeholder="蜘蛛种类" v-model="uploadList.spiderId">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
            <!-- <el-option label="大疣蛛幼体" value="dayouzhuyouti"></el-option> -->
          </el-select>
        </el-form-item>

        <el-form-item label="采样时间" style="width: 46%">
          <el-date-picker
            v-model="uploadList.sampleTime"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd hh:mm:ss"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="样本序列">
          <el-input
            type="textarea"
            style="width: 700px"
            v-model="uploadList.sampleList"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="样本介绍" style="margin-top:-7px">
          <el-input
            type="textarea"
            style="width: 700px"
            v-model="uploadList.sampleInstruct"
          >
          </el-input>
        </el-form-item>
        <el-form-item style="display: block">
          <el-button type="primary" round @click="submitForm()" size="small" 
            >立即上传</el-button
          >
          <!-- <el-button @click="drawer = true" size="small" >打开那个抽屉</el-button> -->
        </el-form-item>
      </el-form>
      <!-- 
  下面的是批量上传的部分
 -->
      <div class="UploadTitle" style="margin-top:-50px">批量上传样本序列</div>
      <el-divider></el-divider>
      <div style="margin-top:-10px">
        <el-button @click="downloadExcel">下载模板</el-button>
        <span style="margin-right: 300px">*请点击下载附件表并填写</span>

        <!-- <el-button type="primary" round>上传文件</el-button
        ><span>*上传模板格式Excel文件</span> -->

        <el-upload
          class="uploadExcel"
          ref="upload"
          action="api/tb-sample/adds"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          :before-upload="beforeExcelUpload"
          :on-success="handleSuccess"
          :headers="headers"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
          <div slot="tip" class="el-upload__tip" style="margin-left: 600px">
            一次只能上传一个表格，且为xlsx/xls文件
          </div>
        </el-upload>

        <a
          ref="downloadExcel"
          style="display: none"
          href="/static/download/model .xlsx"
          download="model.xlsx"
          >下载模板</a
        >
      </div>
      <div></div>
    </el-card>

    <!-- 
  下边那个抽屉的用户信息弹窗 
  direction="ltr"是抽屉左置
-->
    <el-drawer
      :before-close="handleClose"
      :visible.sync="drawer"
      :with-header="true"
      direction="btt"
      size="92%"
    >
      <!-- 用户信息抽屉组件 -->
      <DrawerBack :backList="backList"></DrawerBack>
    </el-drawer>
  </div>
</template>

<script>
import api from "../api/api";
import DrawerBack from "./DrawerBack";
import { baseUrl } from "../config/env";

export default {
  components: {
    DrawerBack,
  },
  data() {
    return {
      backList: [],
      drawer: false,
      url: baseUrl + "/file/uploadExcel",
      fileList: [],
      options: [],
      uploadList: {
        spiderId: "",
        sampleTime: "",
        sampleList: "",
        sampleNumber: "",
        sampleGenetic: "",
        sampleLocations: "",
        userName: "",
        sampleInstruct: "",
      },
    };
  },
  methods: {
    //上传成功返回的值，这个是上传那个组件里的方法
    handleSuccess(res) {
      console.log("文件上传");
      console.log(res);
      if (res.code == 200) {
        if (res.data == null) {
          this.$message({
            type: "success",
            message: "上传成功!",
          });
        } else {
          this.$message({
            type: "success",
            message: "上传成功，部分数据上传失败",
          });
          this.backList = res.data;
          console.log(this.backList);
          this.drawer = true;
        }
      } else {
        this.$message({
          type: "error",
          message: "上传失败!",
        });
      }
      // this.backList = res.data;
      // console.log(this.backList)
      // drawer = true
      // console.log(res.state);
      // if (res.state == "false") {
      //   console.log("这里这个");
      // this.$message({
      //   type: "error",
      //   message: "上传失败!",
      // });
      // } else if (res.state == "true") {
      //   if (res.samples != null && res.samples != []) {
      //     this.backList = res.samples;

      //     this.$message({
      //       type: "success",
      //       message: "上传成功~部分数据有问题",
      //     });
      //     this.drawer = true;
      //     // console.log(this.backList)
      //   } else {
      //     this.$message({
      //       type: "success",
      //       message: "全部上传成功了~",
      //     });
      //   }
      // }

      // console.log(this.imageUrl);
    },
    //上传前的格式检查
    beforeExcelUpload(file, fileList) {
      console.log(file);
      let name = file.name;
      if (!/\.(xlsx|xls|XLSX|XLS)$/.test(file.name)) {
        this.$message({
          type: "error",
          message: "上传文件只能为excel文件，且为xlsx,xls格式",
        });
        this.filelist = [];
        this.file = "";
        return false;
      }
      // else {
      // this.$message({
      //   type: "success",
      //   message: "正在上传~",
      // });
      // }
      this.file = file.raw;
      this.filename = file.name;
    },

    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    downloadExcel() {
      this.$refs.downloadExcel.click();
    },

    /**
     * 上传
     */
    async submitForm() {
      try {
        const res = await api.sampleCheckList({
          list: this.uploadList.sampleList,
        });

        if (res.code == 200) {
          this.$message({
            type: "error",
            message: "蜘蛛序列已重复",
          });
        } else {
          const res = await api.sampleCheckNumber({
            number: this.uploadList.sampleGenetic,
          });

          if (res.code == 200) {
            this.$message({
              type: "error",
              message: "序列编号已重复",
            });
          } else {
            const res = await api.sampleAdd({
              genetic: this.uploadList.sampleGenetic,
              list: this.uploadList.sampleList,
              locations: this.uploadList.sampleLocations,
              number: this.uploadList.sampleNumber,
              remark: this.uploadList.sampleInstruct,
              spider: this.uploadList.spiderId,
              time: this.uploadList.sampleTime,
            });
            console.log(res);
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
          }
        }
      } catch (err) {
        console.log(err);
      }
      // try {
      //   this.uploadList.userName = this.$store.getters.getUserList.userName;
      //   const res = await insertSample(this.uploadList);
      //   console.log("下面这个是")
      //   console.log(res);
      //   if(res.state == "false"){
      //     this.$message({
      //     type: "error",
      //     message: res.msg,
      //   });
      //   }
      //   else if(res.state == "true"){
      //     this.$message({
      //     type: "success",
      //     message: "上传成功了~",
      //   });
      //   }
      // } catch (err) {
      //   console.log(err);
      // }
    },
    //抽屉里的一个方法
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  computed: {
    headers() {
      return {
        token: sessionStorage.getItem("token"),
      };
    },
  },

  //被Main组件调用的方法
  created() {
    const res = api.spiderList();
    console.log(res);
    res.then((data) => {
      this.options = data.data;
      console.log("this.options");
      console.log(this.options);

      // console.log(this.tableData)
    });
    // this.$nextTick(function () {
    //   this.$on("getSpiders", function () {
    //     const res = getSpiders();

    //     res.then((data) => {
    //       this.options = data.spider;
    //       console.log(this.options);

    //       // console.log(this.tableData)
    //     });
    //     res.catch((err) => {
    //       console.log(err);
    //     });
    //   });
    // });
  },
};
</script>

<style scoped>
.UploadTitle {
  text-align: left;
  font-size: 20px;
}
.UploadCard {
    height: 86vh;
  margin: auto;
  width: 80%;
}
.uploadExcel {
  display: inline;
}
</style>