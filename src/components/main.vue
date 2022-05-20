<template>
  <div style="height: 100%">
    <el-container style="width: 100%; min-height: 100%">
      <el-aside width="15%">
      
      <!-- 
            侧边栏
         -->
      <el-scrollbar style="height: 100vh;" wrap-style="overflow-x:hidden;">
        <el-menu
        router
        style="min-height: 100vh"
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="DataManage" >
          <i class="el-icon-menu"></i>
          <span slot="title">数据管理</span>
        </el-menu-item>

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group title="前台用户管理">
            <el-menu-item
              index="EditorUser"
              
              >用户编辑</el-menu-item
            >
            <el-menu-item
              index="EditorAdmini"
              
              >用户权限</el-menu-item
            >
            <!-- <el-menu-item index="1-5" v-on:click="clickChange('6')"
              @click="getUsers3()"
                >用户降级</el-menu-item
              > -->
          </el-menu-item-group>
          <el-menu-item-group title="后台用户管理">
            <el-menu-item
              index="AdminForm"
              
              >管理员列表</el-menu-item
            >
            <el-menu-item index="AddAdmin" 
              >添加管理员</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>种类管理</span>
          </template>
          <el-menu-item-group title="种类管理">
            <el-menu-item
              index="AddSpiders"
              
              >新增蜘蛛种类</el-menu-item
            >
            
          </el-menu-item-group>
          <el-menu-item-group title="数据删改">
            <el-menu-item
              index="SpidersForm"
              >蜘蛛种类删改</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>


        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>序列管理</span>
          </template>
          <el-menu-item-group title="蜘蛛序列">
            <el-menu-item
              index="SampleList"
              
              >蜘蛛序列表</el-menu-item
            >
            
          </el-menu-item-group>
          <el-menu-item-group title="新增序列">
            <el-menu-item
              index="SampleAdd"
              >新增序列</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>

        
      </el-menu>
        </el-scrollbar> 
        
      
      
    </el-aside>
    <el-row style="height: 100%;width:85%">
      <el-container style="width: 100%; min-height: 100%">
        <el-header style="padding: 0px; width: 100%">
          <HeadTop></HeadTop>
        </el-header>
        <el-main>
          <keep-alive>
          <router-view></router-view>
        </keep-alive>
        </el-main>
       
      </el-container>
    </el-row>
    </el-container>
    

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确认要注销吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="warning" @click="cancellation()">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//上面那个标题栏组件
import HeadTop from "./headTop.vue";

export default {
  components: {
    
    HeadTop,
  },
  name: "main",
  data() {
    return {
      // 用来选择显示哪个子组件的值
      isActive: "1",
      
      activeIndex2: "1",
      dialogVisible: false,
    };
  },
  methods: {
    //把上面导入的值赋值给isActive
    clickChange: function (i) {
      this.isActive = i;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    cancellation() {
      //删除token
      sessionStorage.removeItem("token");
      this.$router.push("/");
    },
    //调用adminForm组件里的方法，该方法是请求后台数据
    getAdmins() {
      this.$refs.adminform.$emit("getAdmins");
    },
    //调用editorUser组件里的方法，该方法是请求后台数据
    getUsers() {
      // console.log("下面那个是一个vuex的getters的方法");
      console.log(this.$store.getters.getToken);
      this.$refs.editoruser.$emit("getUsers");
    },
    //调用editorAdmini组件里的方法，该方法是请求后台数据
    getUsers2() {
      this.$refs.editoradmini.$emit("getUsers");
      // console.log("get");
    },
    //调用editorDown组件里的方法，该方法是请求后台数据
    // getUsers3() {
    //   this.$refs.editordown.$emit("getUsers");
    //   // console.log("get");
    // },
  },
  //钩子函数
  mounted() {
    
  },
};
</script>

<style scoped>

</style>