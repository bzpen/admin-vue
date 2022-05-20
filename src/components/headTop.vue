<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item >蜘蛛网后台管理系统</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="warning" style="margin-right:10px" @click="dialogVisible = true" icon="el-icon-switch-button">注销</el-button>
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
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  created() {},

  methods: {
    cancellation() {
      //删除token
      sessionStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="less">
@import "../style/mixin";
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avator {
  .wh(36px, 36px);
  border-radius: 50%;
  margin-right: 37px;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
