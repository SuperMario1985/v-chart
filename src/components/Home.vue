<template>
  <div class="home">
    <div class="header-page">雨水回用处理间</div>
    <div class="main-box">
      <div class="time-page">{{nowTime}}</div>
      <div class="weather-page">
        <div class="weather-info-left">
          <!-- <img :src="'/static/images/weather'+randomArr[0]+'.png'" alt /> -->
          <img
            v-if="nowWeatherInfo"
            :src="'./static/images/128/' +nowWeatherInfo.icon + '.png'"
            alt
          />
          <div class="p1">
            <h5>今日天气</h5>
            <p v-if="nowWeatherInfo">
              {{nowWeatherInfo.temp}}
              <span>℃</span>
            </p>
          </div>
          <div class="p2">
            <h5>北京 昌平</h5>
            <h6 v-if="nowWeatherInfo">{{nowWeatherInfo.text}}</h6>
            <p
              v-if="threeDaysWeatherInfo"
            >{{threeDaysWeatherInfo[0].tempMin}}~{{threeDaysWeatherInfo[0].tempMax}}℃</p>
          </div>
          <div class="right-line"></div>
        </div>
        <div class="weather-info-right">
          <h6>
            <i></i>小时预报
          </h6>
          <ul class="weather-list" v-if="fultherWeatherInfo">
            <li v-for="(item,$index) in fultherWeatherInfo.slice(0,5)" :key="$index">
              <span>{{item.fxTime.slice(11,16)}}</span>
              <img :src="'./static/images/128/' +item.icon + '.png'" alt />
              <strong>{{item.temp}}℃</strong>
            </li>
          </ul>
        </div>
      </div>
      <div class="feature-page">
        <div class="video-box" v-if="loginInfo.status === 1">
          <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
            @play="onPlay($event)"
            @pause="onPause($event)"
            @ended="onEended($event)"
            v-show="bannerStatus===2"
          ></video-player>
          <el-carousel
            height="666px"
            :interval="8000"
            indicator-position="outside"
            arrow="never"
            trigger="click"
            @change="handleBannerChange"
            v-if="bannerStatus===1"
          >
            <el-carousel-item>
              <img src="../assets/images/banner/1.png" alt />
            </el-carousel-item>
            <el-carousel-item>
              <img src="../assets/images/banner/2.png" alt />
            </el-carousel-item>
            <el-carousel-item>
              <img src="../assets/images/banner/3.png" alt />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="login" v-if="loginInfo.status === 2">
          <div class="top">
            <div class="log-box" @click="login">
              <div class="img-box">
                <img src="../assets/images/display/login01.png" alt />
              </div>
              <a href="javascript:void(0)">业主登录</a>
              <div class="right-border"></div>
              <div class="left-border"></div>
            </div>
            <div class="log-box" @click="login">
              <div class="img-box">
                <img src="../assets/images/display/login02.png" alt />
              </div>
              <a href="javascript:void(0)">游客登录</a>
              <div class="right-border"></div>
              <div class="left-border"></div>
            </div>
          </div>
          <div class="bottom">
            <div class="log-box" @click="login">
              <img src="../assets/images/display/login02.png" alt />
              <a href="javascript:void(0)">管理员登录</a>
              <div class="right-border"></div>
              <div class="left-border"></div>
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
                <div class="active-box-left" @click="loginInfo.runningStatus=2;addTimeoutTken()">
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
                <div class="active-box-right" @click="loginInfo.runningStatus=3;addTimeoutTken()">
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
              <div class="stop-box" @click="loginInfo.runningStatus=1;addTimeoutTken()"></div>
            </div>
            <div class="right">
              <h5>照明、太阳能</h5>
              <div class="solar-energy">
                <i></i>
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
              <div class="device-status">
                <i></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-page">
        <ul v-if="newsList">
          <li>
            <i></i>
            <span>
              <marquee behavior="scroll" direction="left">{{newsList.news1}}</marquee>
            </span>
          </li>
          <li>
            <i></i>
            <span>
              <marquee behavior="scroll" direction>{{newsList.news2}}</marquee>
            </span>
          </li>
          <li>
            <i></i>
            <span>
              <marquee behavior direction>{{newsList.news3}}</marquee>
            </span>
          </li>
        </ul>
        <img v-if="loginInfo.status !==1" src="../assets/images/display/erweima.png" alt />
        <img
          class="icon-enter"
          v-if="loginInfo.status ===1"
          src="../assets/images/display/icon-inter.png"
          alt
          @click="goLoginPage"
        />
      </div>
    </div>
    <div
      v-if="loginInfo.status===2"
      class="login-out"
      @click="loginInfo.status=1;clearTimeoutToken()"
    >返回</div>
    <div
      v-if="loginInfo.status===3"
      class="login-out"
      @click="loginInfo.status=2;addTimeoutTken()"
    >退出</div>
    <div class="charge-box">
      <span>85%</span>
      <i></i>
    </div>
  </div>
</template>

<script>
import httpService from "../api/httpService";
export default {
  name: "Home",
  data() {
    return {
      // 轮播图的状态1：图片播放；2：视频播放
      bannerStatus: 1,
      loginInfo: {
        // 1:屏保；2：登录页；3：已经登录
        status: 1,
        // 1:停止；2：手动；3：自动
        runningStatus: 2,
      },
      chartData: {
        columns: ["city", "percent"],
        rows: [
          {
            city: "累计净水量",
            percent: 0.6,
          },
        ],
      },
      chartSettings: {
        seriesMap: {
          累计净水量: {
            color: ["#74FC9E"],
            period: "1500",
            radius: "100%",
            itemStyle: {
              opacity: 1,
            },
            emphasis: {
              itemStyle: {
                opacity: 0.8,
              },
            },
            backgroundStyle: {
              color: "#072862",
            },
            label: {
              formatter(options) {
                const { seriesName, value } = options;
                return `${seriesName}\n1256.3m³`;
              },
              fontSize: 15,
              color: "green",
              insideColor: "#041C6B",
              position: ["50%", "60%"],
            },
            outline: {
              show: false,
              borderDistance: 0,
              itemStyle: {
                color: "#7BFF49",
                borderColor: "#7BFF49",
                borderWidth: 3,
                shadowBlur: 0,
              },
            },
          },
        },
      },
      nowTime: "",
      nowWeatherInfo: null,
      fultherWeatherInfo: null,
      threeDaysWeatherInfo: null,
      randomArr: [
        Math.ceil(Math.random() * 8),
        Math.ceil(Math.random() * 8),
        Math.ceil(Math.random() * 8),
        Math.ceil(Math.random() * 8),
        Math.ceil(Math.random() * 8),
        Math.ceil(Math.random() * 8),
      ],
      randomArr2: [
        Math.ceil(Math.random() * 10 + 20),
        Math.ceil(Math.random() * 10 + 20),
        Math.ceil(Math.random() * 10 + 20),
        Math.ceil(Math.random() * 10 + 20),
        Math.ceil(Math.random() * 10 + 20),
        Math.ceil(Math.random() * 10 + 20),
      ],
      // 播放器参数
      playerOptions: {
        height: 1000,
        responsive: true,
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, // 如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:11", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: "./static/video/2019.12.25 泰宁中文修改版.mp4", //url地址
          },
        ],
        poster: "", // 你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: false, // 全屏按钮
        },
      },
      // 回到屏保的timeoutToken
      timeoutToken: null,
      newsList:null
    };
  },
  methods: {
    // 获取当天天气
    getNowweather() {
      let that = this;
      httpService.nowWeather(function (response) {
        if (response && response.success) {
          that.nowWeatherInfo = response.data;
        }
      });
    },
    // 获取未来12小时天气
    getFultherWeather() {
      let that = this;
      httpService.fultherWeather(function (response) {
        if (response && response.success) {
          that.fultherWeatherInfo = response.data;
        }
      });
    },
    // 获取未来三天的天气
    getThreeDaysWeather() {
      let that = this;
      httpService.threeDaysWeather(function (response) {
        if (response && response.success) {
          that.threeDaysWeatherInfo = response.data;
        }
      });
    },
    handleBannerChange(key1, key2) {
      console.log(key1, key2);
      if (key1 === 0) {
        this.bannerStatus = 2;
        this.$refs.videoPlayer.player.play();
        // this.player.muted(false);
      }
    },
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
      this.addTimeoutTken();
    },
    login() {
      this.loginInfo.status = 3;
      this.addTimeoutTken();
    },
    goScreen() {
      this.bannerStatus = 1;
      this.loginInfo.status = 1;
      this.clearTimeoutToken();
    },
    goHomePage() {
      this.loginInfo.status = 3;
      this.addTimeoutTken();
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
      var day = new Date(timeStamp).getDay();
      var weeks = new Array(
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      );
      var week = weeks[day];
      this.nowTime =
        year +
        "年" +
        month +
        "月" +
        date +
        "日," +
        " " +
        week +
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
    },
    onPlay(event) {
      this.$refs.videoPlayer.player.play();
    },
    onPause(event) {
      console.log(event);
    },
    onEended(event) {
      this.bannerStatus = 1;
    },
    // 每一小时，更新一次天气
    updateWeather() {
      setTimeout(() => {
        console.log("整分更新天气");
        this.getNowweather();
        this.getFultherWeather();
        this.updateWeather();
      }, 3600000);
    },
    // 清除锁屏定时器
    clearTimeoutToken() {
      window.clearTimeout(this.timeoutToken);
      console.log("清除定时器");
      this.timeoutToken = null;
    },
    addTimeoutTken() {
      if (this.timeoutToken) {
        console.log("清除之前的定时器");
        window.clearTimeout(this.timeoutToken);
      }
      this.timeoutToken = setTimeout(() => {
        console.log("回到屏保");
        this.loginInfo.status = 1;
      }, 180000);
      console.log("开启新的定时器");
    },
  },
  computed: {
    getNum() {
      return Math.ceil(Math.random() * 8);
    },
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
  created: function () {
    let that = this;
    httpService.getNews(function (response) {
      if (response && response.success) {
        that.newsList = response.data;
      }
    });
    this.nowTimes();
    this.getNowweather();
    this.getFultherWeather();
    this.getThreeDaysWeather();
    let myDate = new Date();
    let myDateS = myDate.getSeconds() * 1000;
    let myDateMs = 1000 - myDate.getMilliseconds();
    // 3600000
    setTimeout(() => {
      // 整小时第一次更新天气
      console.log("整分第一次更新天气");
      this.updateWeather();
    }, 3600000 - myDateS - myDateMs);
  },
  mounted: function () {
    let that = this;
    // 屏蔽右键
    document.oncontextmenu = () => false;
  },
  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./Home.scss";
</style>
