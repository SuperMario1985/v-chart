<template>
  <div class="demo">
    <h5>测试接口</h5>
    <div class="test-box">
      <el-button type="primary" @click="test1">取实时数据</el-button>
      <el-button type="primary" @click="test2">M0.0写入1</el-button>
      <el-button type="primary" @click="test3">取历史数据</el-button>
    </div>
  </div>
</template>

<script>
import httpService from "../api/httpService";
export default {
  name: "Demo",
  data() {
    return {};
  },
  methods: {
    test1() {
      httpService.test1();
    },
    test2() {
      httpService.test2();
    },
    test3() {
      httpService.test3();
    },
  },
  computed: {},
  created: function() {},
  mounted: function() {
    let that = this;
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.demo {
  h5 {
    text-align: center;
    padding-top: 20px;
  }
  .test-box {
    padding-top: 50px;
    text-align: center;
  }
}
</style>
