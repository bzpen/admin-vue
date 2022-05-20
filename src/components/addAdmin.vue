<template>
  <div>
    <h1>添加管理员</h1>
    <div>
      <el-card
        shadow="always"
        style="width: 50%; margin: auto; padding-top: 20px"
      >
        <el-form
          :model="addAdminForm"
          :rules="addAdminRules"
          style="width: 90%"
          label-width="120px"
          ref="addAdminForm"
        >
          <el-form-item prop="admin_name" label="姓名">
            <el-input
              v-model="addAdminForm.admin_name"
              placeholder="输入姓名"
              type="text"
            ></el-input>
          </el-form-item>
          <el-form-item prop="admin_number" label="账号">
            <el-input
              v-model="addAdminForm.admin_number"
              placeholder="输入账号"
              type="text"
            ></el-input>
          </el-form-item>
          <el-form-item prop="admin_pass" label="设置密码">
            <el-input
              v-model="addAdminForm.admin_pass"
              placeholder="输入密码"
              show-password
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="admin_pass_again" label="再次输入密码">
            <el-input
              v-model="addAdminForm.admin_pass_again"
              placeholder="再次输入密码"
              show-password
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">立即创建</el-button>
            <el-button @click="resetForm('addAdminForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import api from "../api/api";
import { addAdmin } from "../api/getData";
export default {
  data() {
    //密码校验
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不可为空"));
      } else {
        if (value !== "") {
          let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
          if (!reg.test(value)) {
            callback(
              new Error("密码须包含数字、字母两种元素，且密码位数为6-16位")
            );
          }
        }
        callback();
      }
    };
    //账号校验
    var validateNumber = (rule, value, callback) => {
      if (!value) {
        callback(new Error("账号不可为空"));
      } else {
        if (value !== "") {
          let reg = /^[a-zA-Z0-9_-]{4,16}$/;
          if (!reg.test(value)) {
            callback(
              new Error("账号正则，4到16位（字母，数字，下划线，减号）")
            );
          }
        }
        callback();
      }
    };
    //姓名校验
    var validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("姓名不可为空"));
      } else {
        // if (value !== "") {
        //   let reg = /^[a-zA-Z0-9_-]{4,16}$/;
        //   if (!reg.test(value)) {
        //     callback(
        //       new Error("用户名正则，4到16位（字母，数字，下划线，减号）")
        //     );
        //   }
        // }
        callback();
      }
    };

    //再次密码校验
    var validateAgainPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("再次密码不可为空"));
      } else {
        if (
          this.addAdminForm.admin_pass != this.addAdminForm.admin_pass_again
        ) {
          callback(new Error("两次输入密码不一致"));
        }
        callback();
      }
    };
    return {
      //账号密码要提交的那个表单
      addAdminForm: {
        admin_name: "",
        admin_number: "",
        admin_pass: "",
        admin_pass_again: "",
      },
      addAdminRules: {
        admin_name: [{ validator: validateName, trigger: "" }],
        admin_number: [
          { validator: validateNumber, trigger: ["blur", "change"] },
        ],
        admin_pass: [{ validator: validatePass, trigger: "blur" }],
        admin_pass_again: [{ validator: validateAgainPass, trigger: "blur" }],
      },
    };
  },
  methods: {
    //重置表单那个方法   注意上面那个el-form要绑一个ref,form的每个item加prop属性，否则无法清空,elementUI官方文档中也有说明;
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //提交表单
    async submitForm() {
      // try {
      //   const res = await addAdmin({
      // admin_name: this.addAdminForm.admin_name,
      // admin_number: this.addAdminForm.admin_number,
      // admin_pass: this.addAdminForm.admin_pass,
      //   });
      //   console.log(res);
      // } catch (err) {
      //   console.log(err);

      //   this.$message({
      //     type: "error",
      //     message: "服务器异常，请稍后再试！",
      //   });
      // }
      try {
        const res = await api.addAdmin({
          name: this.addAdminForm.admin_name,
          username: this.addAdminForm.admin_number,
          password: this.addAdminForm.admin_pass,
        });
        this.$message({
          type: "success",
          message: res.msg,
        });
        console.log(res);
        this.$router.push("/AdminForm");
      } catch (err) {
        console.log(err);
        this.$message({
          type: "error",
          message: "服务器异常，请稍后再试！",
        });
      }
    },
  },
};
</script>

<style>
</style>