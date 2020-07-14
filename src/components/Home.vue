<template>
  <div class="home">
    <!-- <div class="circle-progress">
      <div class="circle-bg"></div>
      <div class="wrapper right">
        <div class="circle-progress-bar circle-right"></div>
      </div>
      <div class="wrapper left">
        <div class="circle-progress-bar circle-left"></div>
      </div>
    </div>
    <div class="liquid-fill">
      <ve-liquidfill
        width="100%"
        height="100%"
        radius="100%"
        :data="chartData"
        :settings="chartSettings"
        background-color="#000"
      ></ve-liquidfill>
    </div>-->
    <div class="header-page">雨水处理间</div>
    <div class="main-box">
      <div class="time-page">2020年7月1日，星期一 上午08:00:01</div>
      <div class="weather-page">
        <div class="weather-info-left">
          <img src="../assets/images/display/weather-cloudy.png" alt />
          <div class="p1">
            <h5>今日天气</h5>
            <p>
              21
              <span>℃</span>
            </p>
          </div>
          <div class="p2">
            <h6>多云转小雨</h6>
            <p>18-22℃</p>
          </div>
          <div class="right-line"></div>
        </div>
        <div class="weather-info-right">
          <h6>
            <i></i>小时预报
          </h6>
          <ul class="weather-list">
            <li>
              <span>08:00</span>
              <img src="../assets/images/display/weather-cloudy.png" alt />
              <strong>22℃</strong>
            </li>
            <li>
              <span>08:00</span>
              <img src="../assets/images/display/weather-cloudy.png" alt />
              <strong>22℃</strong>
            </li>
            <li>
              <span>08:00</span>
              <img src="../assets/images/display/weather-cloudy.png" alt />
              <strong>22℃</strong>
            </li>
            <li>
              <span>08:00</span>
              <img src="../assets/images/display/weather-cloudy.png" alt />
              <strong>22℃</strong>
            </li>
            <li>
              <span>08:00</span>
              <img src="../assets/images/display/weather-cloudy.png" alt />
              <strong>22℃</strong>
            </li>
            <li>
              <span>08:00</span>
              <img src="../assets/images/display/weather-cloudy.png" alt />
              <strong>22℃</strong>
            </li>
          </ul>
        </div>
      </div>
      <div class="feature-page">
        <div class="video-box" v-if="loginInfo.status === 1">
          <img src="../assets/images/display/video.png" alt />
        </div>
        <div class="login" v-if="loginInfo.status === 2">
          <div class="top">
            <div class="log-box" @click="login">
              <div class="img-box">
                <img src="../assets/images/display/login01.png" alt />
              </div>
              <a href="javascript:void(0)">业主登录</a>
            </div>
            <div class="log-box" @click="login">
              <div class="img-box">
                <img src="../assets/images/display/login02.png" alt />
              </div>
              <a href="javascript:void(0)">游客登录</a>
            </div>
          </div>
          <div class="bottom">
            <div class="log-box" @click="login">
              <img src="../assets/images/display/login02.png" alt />
              <a href="javascript:void(0)">管理员登录</a>
            </div>
          </div>
        </div>
        <div class="rain" v-if="loginInfo.status === 3">
          <div class="top">
            <div class="left">
              <h5>净水功能</h5>
            </div>
            <div class="right">
              <h5>照明、太阳能</h5>
            </div>
          </div>
          <div class="bottom">
            <div class="left">
              <h5>水质检测</h5>
            </div>
            <div class="right">
              <h5>设备状态</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-page">
        <ul>
          <li>
            <i></i>
            <span>北京市能源有限公司 | 13000001111</span>
          </li>
          <li>
            <i></i>
            <span>北京市能源可再生环保有限公司 | 13000001111</span>
          </li>
          <li>
            <i></i>
            <span>北京市互联网科技有限公司 | 13000001111</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="nav-box" v-if="loginInfo.status===2">
      <span>返回</span>
      <span>主页</span>
    </div>
    <div class="go-login" @click="goLoginPage" v-if="loginInfo.status===1">
      <span>登</span>
      <span>录</span>
    </div>
  </div>
</template>

<script>
import httpService from "../api/httpService";
export default {
  name: "Home",
  data() {
    return {
      loginInfo: {
        // 1:屏保；2：登录页；3：已经登录
        status: 1
      },
      chartData: {
        columns: ["city", "percent"],
        rows: [
          {
            city: "累计净水量",
            percent: 0.6
          }
        ]
      },
      chartSettings: {
        seriesMap: {
          累计净水量: {
            color: ["red"],
            radius: "100%",
            itemStyle: {
              opacity: 0.2
            },
            emphasis: {
              itemStyle: {
                opacity: 0.8
              }
            },
            backgroundStyle: {
              color: "yellow"
            },
            label: {
              formatter(options) {
                const { seriesName, value } = options;
                return `${seriesName}\n${value * 100000}ml`;
              },
              fontSize: 12,
              color: "green",
              insideColor: "red",
              position: ["50%", "60%"]
            },
            outline: {
              show: false
            }
          }
        }
      } // 登录
    };
  },
  methods: {
    gradientToColor(color) {},
    setCircle(percent) {
      var deg = percent * 360;
      var reDeg = 0;
      if (deg >= 180) {
        reDeg = deg - 315;
        document.querySelectorAll(".circle-right")[0].style.transform =
          "rotate(45deg)";
        document.querySelectorAll(".circle-left")[0].style.transform =
          "rotate(" + reDeg + "deg)";
      } else {
        reDeg = deg - 135;
        document.querySelectorAll(".circle-right")[0].style.transform =
          "rotate(" + reDeg + "deg)";
        document.querySelectorAll(".circle-left")[0].style.transform =
          "rotate(-135deg)";
      }
    },
    goLoginPage() {
      this.loginInfo.status = 2;
    },
    login() {
      this.loginInfo.status = 3;
    }
  },
  computed: {},
  created: function() {},
  mounted: function() {
    let that = this;
    // this.setCircle(0.75);
    // setTimeout(() => {
    //   that.chartData.rows[0].percent = 0.8;
    // }, 5000);
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./Home.scss";
</style>
