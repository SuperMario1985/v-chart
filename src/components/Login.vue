<template>
  <div class="login">
    <el-dialog
      width="400px"
      :visible="dialogLoginVisible"
      :before-close="handleClose"
      :append-to-body="true"
      class="dialog logining"
    >
      <div class="dialog-content login-box" v-if="dialogLoginVisible">
        <h4>SIGN IN</h4>
        <p>
          <el-input
            v-model="loginInfo.email"
            @keyup.enter.native="loginIn"
            placeholder="Account Name"
            v-focus
          ></el-input>
        </p>
        <p>
          <el-input
            v-model="loginInfo.password"
            placeholder="Password"
            show-password
            @keyup.enter.native="loginIn"
          ></el-input>
        </p>
        <p>
          <!-- <el-button @click="dialogSignVisible = true">REGISTER</el-button> -->
          <el-button type="primary" @click="loginIn">SIGN IN</el-button>
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      dialogLoginVisible: true,
      // 登录信息
      loginInfo: {
        email: "16812345678@163.com",
        password: "qwer1234",
        isKeepLogged: true
      },
      // 登录
      loginIn() {
        let that = this;
        httpService.login(this.loginInfo, function(response) {
          // if (response.success && response.isLogin) {
          //   let loginInfo = {
          //     init: true,
          //     login: true,
          //     isNeedLogin: false
          //   };
          //   that.dialogLoginVisible = false;
          // } else {
          //   that.$message({
          //     type: "warning",
          //     message: response.msg
          //   });
          // }
        });
      }
    };
  },
  methods: {
    // 关闭弹窗
    handleClose(done) {
      this.dialogLoginVisible = false;
    }
  }
  // ,
  // computed: {},
  // created: {},
  // mounted: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  
}
</style>
