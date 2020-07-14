<template>
  <div class="home">
    <div class="header-page">雨水回用处理间</div>
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
              <img src="../assets/images/display/weather01.png" alt />
              <strong>22℃</strong>
            </li>
            <li>
              <span>09:00</span>
              <img src="../assets/images/display/weather02.png" alt />
              <strong>22℃</strong>
            </li>
            <li>
              <span>10:00</span>
              <img src="../assets/images/display/weather03.png" alt />
              <strong>22℃</strong>
            </li>
            <li>
              <span>11:00</span>
              <img src="../assets/images/display/weather04.png" alt />
              <strong>22℃</strong>
            </li>
            <li>
              <span>12:00</span>
              <img src="../assets/images/display/weather05.png" alt />
              <strong>22℃</strong>
            </li>
            <li>
              <span>13:00</span>
              <img src="../assets/images/display/weather06.png" alt />
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
              <div class="liquid-fill">
                <ve-liquidfill
                  width="100%"
                  height="100%"
                  radius="100%"
                  :data="chartData"
                  :settings="chartSettings"
                ></ve-liquidfill>
              </div>
              <div class="active-box">
                <div class="active-box-left" @click="loginInfo.runningStatus=2">
                  <p>
                    <img
                      v-if="loginInfo.runningStatus!==2"
                      src="../assets/images/display/icon-man.png"
                      alt
                    />
                    <img
                      v-if="loginInfo.runningStatus===2"
                      src="../assets/images/display/icon-man-active.png"
                      alt
                    />
                  </p>
                  <p>
                    <span v-if="loginInfo.runningStatus!==2">手动运行</span>
                    <span v-if="loginInfo.runningStatus===2" class="active">手动运行</span>
                  </p>
                </div>
                <div class="active-box-right" @click="loginInfo.runningStatus=3">
                  <p>
                    <img
                      v-if="loginInfo.runningStatus!==3"
                      src="../assets/images/display/icon-auto.png"
                      alt
                    />
                    <img
                      v-if="loginInfo.runningStatus===3"
                      src="../assets/images/display/icon-auto-active.png"
                      alt
                    />
                  </p>
                  <p>
                    <span v-if="loginInfo.runningStatus!==3">自动运行</span>
                    <span v-if="loginInfo.runningStatus===3" class="active">自动运行</span>
                  </p>
                </div>
              </div>
              <div class="stop-box" @click="loginInfo.runningStatus=1"></div>
            </div>
            <div class="right">
              <h5>照明、太阳能</h5>
              <div class="solar-energy">
                <!-- <div class="img-box">
                  <img src="../assets/images/display/sun.png" alt="">
                  <div class="number-item">

                  </div>
                  <h5></h5>
                  <div></div>
                </div>-->
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="left">
              <h5>水质检测</h5>
              <div class="check">
                <!-- <div class="check-box">
                  <div class="check-left">
                    <div class="circle-progress">
                      <div class="circle-bg"></div>
                      <div class="wrapper wrapper-right">
                        <div class="circle-progress-bar circle-right"></div>
                      </div>
                      <div class="wrapper wrapper-left">
                        <div class="circle-progress-bar circle-left"></div>
                      </div>
                    </div>
                  </div>
                  <div class="check-right">
                    <div class="circle-progress">
                      <div class="circle-bg"></div>
                      <div class="wrapper wrapper-right">
                        <div class="circle-progress-bar circle-right2"></div>
                      </div>
                      <div class="wrapper wrapper-left">
                        <div class="circle-progress-bar circle-left2"></div>
                      </div>
                    </div>
                  </div>
                </div>-->
              </div>
            </div>
            <div class="right">
              <h5>设备状态</h5>
              <div class="device-status"></div>
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
        <img v-if="loginInfo.status !==1" src="../assets/images/display/erweima.png" alt />
        <img v-if="loginInfo.status ===1" src="../assets/images/display/icon-inter.jpg" alt @click="goLoginPage" />
      </div>
    </div>
    <div v-if="loginInfo.status===2" class="login-out" @click="loginInfo.status=1">返回</div>
    <div v-if="loginInfo.status===3" class="login-out" @click="loginInfo.status=2">退出</div>
    <div class="charge-box"><span>85%</span><i></i></div>
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
        status: 1,
        // 1:停止；2：手动；3：自动
        runningStatus: 2
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
            color: ["#74FC9E"],
            period: "1500",
            radius: "100%",
            itemStyle: {
              opacity: 1
            },
            emphasis: {
              itemStyle: {
                opacity: 0.8
              }
            },
            backgroundStyle: {
              color: "#072862"
            },
            label: {
              formatter(options) {
                const { seriesName, value } = options;
                return `${seriesName}\n${value * 100000}ml`;
              },
              fontSize: 15,
              color: "green",
              insideColor: "#041C6B",
              position: ["50%", "60%"]
            },
            outline: {
              show: false,
              borderDistance: 0,
              itemStyle: {
                color: "#7BFF49",
                borderColor: "#7BFF49",
                borderWidth: 3,
                shadowBlur: 0
              }
            }
          }
        }
      } // 登录
    };
  },
  methods: {
    gradientToColor(color) {},
    setCircle1(percent) {
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
    setCircle2(percent) {
      var deg = percent * 360;
      var reDeg = 0;
      if (deg >= 180) {
        reDeg = deg - 315;
        document.querySelectorAll(".circle-right")[1].style.transform =
          "rotate(45deg)";
        document.querySelectorAll(".circle-left")[1].style.transform =
          "rotate(" + reDeg + "deg)";
      } else {
        reDeg = deg - 135;
        document.querySelectorAll(".circle-right")[1].style.transform =
          "rotate(" + reDeg + "deg)";
        document.querySelectorAll(".circle-left")[1].style.transform =
          "rotate(-135deg)";
      }
    },
    goLoginPage() {
      this.loginInfo.status = 2;
    },
    login() {
      this.loginInfo.status = 3;
    },
    goScreen() {
      this.loginInfo.status = 1;
    },
    goHomePage() {
      this.loginInfo.status = 3;
    },
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? "0" + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      this.nowTime =
        year +
        "年" +
        month +
        "月" +
        date +
        "日" +
        " " +
        hh +
        ":" +
        mm +
        ":" +
        ss;
    },
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
      this.clear();
    },
    clear() {
      clearInterval(this.nowTimes);
      this.nowTimes = null;
    }
  },
  computed: {},
  created: function() {},
  mounted: function() {
    let that = this;
    // this.setCircle1(0.33);
    // this.setCircle2(0.63);
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
