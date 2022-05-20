<style>
input[type="file"] {
  display: none;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<template>
  <div class="upload-image">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
      <el-form-item label="活动名称" prop="spiderName">
        <el-input v-model="ruleForm.spiderName" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="活动详情" prop="spiderDetails">
        <el-input
          v-model="ruleForm.spiderDetails"
          style="width: 300px"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传图片" ref="uploadElement" prop="imageUrl">
        <el-input v-model="imageUrl" v-if="false"></el-input>
        <el-upload
          class="avatar-uploader"
          ref="upload"
          :show-file-list="false"
          action="http://47.115.230.231:8083/spider/insert"
          :before-upload="beforeUpload"
          :on-change="handleChange"
          :auto-upload="false"
          :data="ruleForm"
           :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { insert } from "../api/getData";
export default {
  data() {
    return {
      ruleForm: {
        spiderName: "",
        spiderDetails: "",
        files: "",
      },
      imageUrl: "",
    };
  },
  methods: {
    submitForm(formName) {
      let vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          vm.$refs.upload.submit();
        } else {
          return false;
        }
      });
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

    //提交表单
    async submitOK() {
      try {
        let formData = new FormData();
        formData.append("spiderName", this.ruleForm.spiderName);
        formData.append("spiderDetails", this.ruleForm.spiderDetails);
        formData.append( "files",this.$refs.upload.file)
        // formData.append("files", this.ruleForm.files);

        console.log("12312");
        for (var value of formData.values()) {
          console.log(value);
        }
        console.log("hhhh");
        const res = await insert(formData);
        console.log(res);
      } catch (err) {
        console.log(err);

        this.$message({
          type: "error",
          message: "服务器异常，请稍后再试！",
        });
      }
    },
    shangchuan(){
        this.$refs.upload.submit();
    },
     handleAvatarSuccess(res, file) {
         console.log(res)
        this.imageUrl = URL.createObjectURL(file.raw);
      },
  },
};
</script>