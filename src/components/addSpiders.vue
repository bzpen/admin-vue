<template>
  <div>
    <h1>新增蜘蛛种类</h1>
    
      <el-form
        style="width: 90%"
        label-width="120px"
        :model="addSpidersForm"
        ref="addSpidersForm"
      >
        <el-form-item label="蜘蛛种类" prop="name"
          ><el-input
            v-model="addSpidersForm.name"
            placeholder="输入蜘蛛种类"
            type="text"
          ></el-input
        ></el-form-item>
        <el-form-item label="蜘蛛详情" prop="remark"
          ><el-input
            v-model="addSpidersForm.remark"
            placeholder="输入蜘蛛详情"
            type="text"
          ></el-input
        ></el-form-item>
        <el-form-item label="蜘蛛图片" style="margin-top: 10px; " >
          <!-- <el-input v-model="imageUrl" v-if="false"></el-input>
          <el-upload
            class="avatar-uploader"
            ref="upload"
            :show-file-list="false"
            action="http://47.115.230.231:8083/spider/insert"
            :before-upload="beforeUpload"
            :on-change="handleChange"
            :auto-upload="false"
            :data="addSpidersForm"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->

          <el-upload
            ref="upload"
            action="api/tb-spider/image"
            list-type="picture-card"
            :before-upload="beforeUpload"
            :on-preview="handlePictureCardPreview"
            :auto-upload="false"
            :on-remove="handleRemove"
            :data="file"
            :on-change="handleChange"
            :on-success="handleAvatarSuccess"
            :headers="headers"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item  label="">
          <el-button type="primary" @click="submitForm('addSpidersForm')"
            >立即上传</el-button
          >
          <el-button @click="resetForm('addSpidersForm')">重置</el-button>
        </el-form-item>
      </el-form>
   
  </div>
</template>

<script>
import api from "../api/api";
import {insert} from "../api/getData"
export default {
  data() {
    return {
      addSpidersForm: {
        name: "",
        remark: "",
        // token:""
      },
      file:{
        file_path:""
      },
      files: "",
      imageUrl: "",
      //
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      fileList: [],
      //token值
      
    };
  },
  methods: {
    // submitForm(formName) {
    //   let vm = this;
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       vm.$refs.upload.submit();
    //     } else {
    //       return false;
    //     }
    //   });
    // },
    submitForm(formName){
      let vm = this;
      this.$refs[formName].validate(async (valid) =>{
        if (valid) {
          const res = await api.spiderAdd(this.addSpidersForm)
          console.log("res.data.spiderPhoto")
          console.log(res)
          console.log(res.data.photoPath)
          vm.file.file_path = res.data.photoPath
          console.log("vm.$refs.upload")
          console.log(vm.$refs.upload)
          vm.$refs.upload.submit();
        }else{
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.imageUrl = "";
    },

    handleChange(file, fileList) {
      this.files = fileList;
      console.log(this.files);
      this.imageUrl = URL.createObjectURL(file.raw);
    },

    beforeUpload(file) {
      return true;
    },
    handleAvatarSuccess(res, file) {
      console.log("返回值")
      // console.log(this.addSpidersForm.token);
      
      console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    
    
  },
  computed: {
    headers() {
      return {
        token: sessionStorage.getItem("token"),
      };
    },
  },
  mounted() {
    // this.addSpidersForm.token = sessionStorage.getItem('token')
  },
};
</script>

<style>
</style>