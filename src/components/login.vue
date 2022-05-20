<template>
  <div
    @mousemove="mousemove"
    ref="jjjj"
    style="height:100%;width:100%"
    
    class="content_body"
  >
    <div class="container">
      <img src="../assets/images/logo.png" :height="89" />
      <div class="login">
        <div class="adBox">
          <div
            class="ad"
            :style="{ left: divLeft + 'px', top: divTop + 'px' }"
          ></div>
        </div>
        <div class="form">
          <div class="title">
            <div class="tabs">账号登录</div>
          </div>
          <!-- <div class="content">


            <div class="formRow">
              <input type="text" class="text user" placeholder="请输入用户名" />
            </div>

            <div class="formRow">
              <input
                type="password"
                class="text pwd"
                placeholder="请输入密码"
              />
            </div>

            <div class="formRow">
              <div class="tip" style="margin-left:180px">
                <span class="ico" @mouseenter="enter" @mouseleave="leave"
                  >?</span
                ><span class="text">温馨提示</span>
              </div>

            </div>
            <div class="formRow">
              <el-button style="width:100%" type="primary" size="big">登录</el-button>
            </div>

          </div> -->
          <el-form
            style="margin-top: 40px"
            :rules="loginRules"
            :model="LoginAdminiForm"
            status-icon
          >
            <label
              style="
                display: block;
                width: 80%;
                margin: 25px auto 0;
                text-align: center;
              "
            >
              <el-form-item prop="adminiName">
                <el-input
                  placeholder="输入账号"
                  type="text"
                  v-model="LoginAdminiForm.adminiName"
                >
                </el-input>
              </el-form-item>
            </label>

            <label
              style="
                display: block;
                width: 80%;
                margin: 25px auto 0;
                text-align: center;
              "
            >
              <el-form-item style="margin-top: 33px" prop="adminiPass">
                <el-input
                  type="password"
                  placeholder="输入密码"
                  show-password
                  v-model="LoginAdminiForm.adminiPass"
                >
                </el-input>
              </el-form-item>
            </label>

            <!-- 温馨提示的那行 -->
            <div class="tip" style="margin-left: 150px">
              <span class="ico" @mouseenter="enter" @mouseleave="leave">?</span
              ><span class="text">温馨提示</span>
            </div>
            <el-button
              style="width: 80%; margin-top: 40px"
              type="primary"
              size="big"
              @click="loginAdmini()"
              >登录</el-button
            >
          </el-form>
        </div>
        <!-- 温馨提示显示的那个照片 -->
        <div class="info" :style="{ display: show }"></div>
      </div>
    </div>
  </div>
</template>

<script src="./js/jquery.min.js"></script>
<script >
import api from "../api/api";
import { login } from "../api/getData";
export default {
  name: "login",
  data() {
    //验证规则
    var validateNumber = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginRules: {
        adminiName: [{ validator: validateNumber, trigger: "blur" }],
        adminiPass: [{ validator: validatePass, trigger: "blur" }],
      },
      //账号密码要提交的那个表单
      LoginAdminiForm: {
        adminiName: "",
        adminiPass: "",
      },

      //组件移动坐标
      divLeft: 30,
      divTop: 30,
      //鼠标坐标
      x: 0,
      y: 0,
      //控制提示框弹出
      show: "none",
    };
    
  },
  methods: {
    enter: function () {
      this.show = "block";
    },
    leave: function () {
      this.show = "none";
    },

    // 当鼠标移动时触发
    mousemove(e) {
      //   console.log("坐标");
      //   console.log(this.W);
      //   console.log(this.H);
      this.x = e.x;
      this.y = e.y;
      this.divLeft = (this.x * 60) / this.W;
      this.divTop = (this.y * 60) / this.H;
      // console.log(this.x)
      // console.log(this.y)
      // console.log(this.divLeft)
      // console.log(this.divTop)
    },
    /**
     * 直接跳转到主页里
     */
    dd() {
      this.$router.push("/main");
    },
    //管理员登录
    async loginAdmini() {
      try {
        // const res = await login({
        //   admin_number: this.LoginAdminiForm.adminiName,
        //   admin_pass: this.LoginAdminiForm.adminiPass,
        // });
        const res = await api.adminLogin({
          username: this.LoginAdminiForm.adminiName,
          password: this.LoginAdminiForm.adminiPass,
        })
        console.log(res);
        if(res.code == 200){
          /*
           *调用全局存储token
           */
          console.log("尝试存储token");
          // this.$store.commit("setToken", res.token);
          sessionStorage.setItem('token', res.data.token),
          console.log(sessionStorage.getItem('token'))
          // this.$message({
          //   message: res.msg,
          //   type: "success",
          // });
          this.$router.push("/main");
        }else{
          this.$message({
            message: res.msg,
            type: "error",
          });
        }

        // if (res.state == "true") {
          // /*
          //  *调用全局存储token
          //  */
        //   console.log("尝试存储token");
        //   this.$store.commit("setToken", res.token);
        //   // console.log("下面那个是一个vuex的getters的方法");
        //   // console.log(this.$store.getters.getToken);
          // this.$message({
          //   message: res.msg,
          //   type: "success",
          // });
        //   this.$router.push("/main");
        // }
        // // 把返回的信息加到massage里
        // else {
        //   this.$message({
        //     type: "error",
        //     message: res.msg,
        //   });
        // }
      } catch (err) {
        // console.log(err);

        this.$message({
          type: "error",
          message: "服务器异常，请稍后再试！",
        });
      }
    },
  },
  mounted() {
    let h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight; //浏览器高度
    let w =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth; //浏览器宽度
    this.W = w;
    this.H = h;
  },
};
</script>


<style lang="less" scoped>
html,
body {
  height: 100%;
  overflow: hidden;
}

.container {
  width: 90%;
  height: auto;
  max-width: 1200px;
  margin: 0 auto;
}

.login {
  position: relative;
}

.adBox {
  width: 560px;
  height: 560px;
  margin-top: 60px;
  float: left;
  position: relative;
}

.ad {
  width: 500px;
  height: 500px;
  background: url("../assets/images/ad.png") top center no-repeat;
  position: absolute;
  left: 30px;
  top: 30px;
}

.form {
  width: 310px;
  height: 380px;
  border-radius: 5px;
  background: rgba(25, 25, 25, 0.7);
  margin-top: 130px;
  padding: 20px;
  float: right;
}

.tabs {
  width: 100%;
  float: left;
  text-align: center;
  font-size: 16px;
  color: #fff;
  line-height: 50px;
  border-bottom: 1px solid #fff;
}

.title:after {
  content: "";
  display: block;
  clear: both;
}

.active {
  color: #02e6e9;
}

.content {
  padding: 20px 0;
}

.codeText {
  color: #fff;
  font-size: 12px;
  text-align: center;
}

.hide {
  display: none;
}

.formRow {
  width: 100%;
  margin: 25px 0;
}

.formRow input.text {
  width: 80%;
  padding: 0 5% 0 15%;
  height: 50px;
  border: 0;
  border-radius: 5px;
  font-size: 18px;
}

.formRow input.user {
  background: #ffffff url(../assets/images/user.png) left center no-repeat;
}

.formRow input.pwd {
  background: #ffffff url(../assets/images/pwd.png) left center no-repeat;
}

.formRow:after {
  content: "";
  display: block;
  clear: both;
}

.tip {
  float: left;
  width: 50%;
}

.tip .ico {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #f3b903;
  color: #fff;
  text-align: center;
  line-height: 20px;
  display: inline-block;
  cursor: pointer;
}

.tip .text {
  margin-left: 10px;
  color: #ffffff;
}

.remember {
  width: 100px;
  float: right;
  color: #ffffff;
}

.info {
  position: absolute;
  top: 130px;
  left: 10px;
  width: 835px;
  height: 420px;
  background: url(../assets/images/notice.png) no-repeat;
  z-index: 99;
  display: none;
}

@media (max-width: 991px) {
  .adBox {
    display: none;
  }
  .form {
    width: 90%;
    margin: 100px auto;
    float: none;
  }
}

@media (max-height: 768px) {
  logo {
    margin-top: 20px;
  }
  .adBox {
    margin-top: 20px;
  }
  .form {
    margin-top: 80px;
  }
  .info {
    top: 80px;
  }
  .container {
    transform: scale(0.9);
  }
  .content_body {
    margin: 0;
    background: url("../assets/images/bg2.jpg") top center no-repeat;
    background-size: cover;
  }
}
</style>