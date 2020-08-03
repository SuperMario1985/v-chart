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
        <ul>
          <li>
            <i></i>
            <span>
              <marquee behavior="scroll" direction="left">
                中共中央政治局常务委员会召开会议 研究部署防汛救灾工作 中共中央总书记习近平主持会议 中共中央政治局常务委员会7月17日召开会议，研究部署防汛救灾工作。中共中央总书记习近平主持会议并发表重要讲话。
                习近平指出，6月份以来，在党中央坚强领导下，各级党委和政府紧急行动、强化措施，国家防总、各有关部门和单位履职尽责、密切协作，人民解放军和武警部队关键时刻发挥突击队作用，广大干部群众团结奋战，防洪救灾体系发挥重要作用，防汛救灾工作有序有力推进，取得了积极成效。
                习近平强调，防汛救灾关系人民生命财产安全，关系粮食安全、经济安全、社会安全、国家安全。今年是决胜全面建成小康社会、决战脱贫攻坚之年，也是“十三五”规划收官之年，做好防汛救灾工作十分重要。各有关地区、部门和单位要始终把保障人民生命财产安全放在第一位，采取更加有力措施，切实做好防汛救灾各项工作。
                习近平指出，当前，全国防汛进入“七下八上”阶段，长江流域中上游地区降雨仍然偏多，黄河中上游、海河、松花江、淮河流域可能发生较重汛情，必须统筹抓好南北方江河安全度汛，加强组织领导和责任落实，坚持预防预备和应急处突相结合，加强统筹协调，强化协同配合，抓实抓细防汛救灾各项措施。各有关地区都要做好预案准备、队伍准备、物资准备、蓄滞洪区运用准备，宁可备而不用，不可用时无备。
                会议强调，党中央高度重视今年的防汛救灾工作，5月19日，习近平总书记在主持中央政治局常委会会议研究有关工作时，要求有关方面高度重视今年汛期长江中下游汛情，压实防汛工作责任，克服疫情影响，抢抓水利工程修复，加强物资储备，组织开展抢险培训和演习，全力保障人民生命财产安全。习近平总书记还多次作出重要指示批示，要求各地区和有关部门坚持人民至上、生命至上，统筹做好疫情防控和防汛救灾工作；要求各级党委和政府压实责任，勇于担当，采取更加有力有效的措施，全力抢险救援，尽最大努力保障人民生命财产安全。
                会议指出，各级党委和政府要全面落实防汛救灾主体责任，加强领导，守土尽责，切实把保障人民生命财产安全放到第一位。要发挥防灾减灾救灾体制改革优势，各有关方面要加强统筹协调，发挥各自专业优势，形成省市间、部门间、军地间、上下游、左右岸通力协作的防汛救灾格局。要把责任落到防汛救灾全过程、各层级，到岗到人，落实汛期工程巡查防守责任制。各级领导干部要深入一线、靠前指挥、现场督查，在防汛救灾第一线体现责任担当，组织广大干部群众众志成城、顽强奋斗。
                会议强调，要精准预警严密防范，及时准确对雨情、水情等气象数据进行滚动预报，加强对次生灾害预报，特别要提高局部强降雨、台风、山洪、泥石流等预测预报水平，预警信息发布要到村到户到人。要强化重要堤防、重要设施防护，科学调度水利工程，加强巡堤查险，发现险情及时抢护，确保重要基础设施安全。要全力抢险救援救灾，对各类抢险救援力量，要统一调度、提前预置、快速出动、高效救援，努力将各类损失降到最低。要统筹做好疫情防控和抢险救灾工作，严格落实各项防控措施，避免疫情出现反弹。
                会议指出，要精心谋划灾后恢复重建，及时下拨救灾资金，调运救灾物资，尽快恢复灾区生产生活秩序，及时抢修水电、交通、通信等基础设施，组织带领受灾群众恢复生产、重建家园。要支持受灾的各类生产企业复工复产，统筹灾后恢复重建和脱贫攻坚工作，对贫困地区和受灾困难群众给予支持，防止因灾致贫返贫。
                会议强调，要全面提高灾害防御能力，坚持以防为主、防抗救相结合，把重大工程建设、重要基础设施补短板、城市内涝治理、加强防灾备灾体系和能力建设等纳入“十四五”规划中统筹考虑。
                会议指出，各级党委和政府要担负起促一方发展、保一方平安的政治责任，基层党组织和广大党员、干部要充分发挥战斗堡垒作用和先锋模范作用，主动担当、敢打头阵，紧紧依靠人民群众，把党的政治优势、组织优势、密切联系群众优势转化为防汛救灾的强大政治优势，让党旗在防汛救灾第一线高高飘扬。
                会议还研究了其他事项。
              </marquee>
            </span>
          </li>
          <li>
            <i></i>
            <span>
              <marquee behavior="scroll" direction>
                局领导检查局属单位闸站所垃圾分类工作 本站讯 7月13日至17日，局生活垃圾分类推进工作指挥部成员分4组利用5天时间，对局属单位39个闸站所垃圾分类工作进行全方位检查。市水务局二级巡视员苌永欣带队检查了密云水库管理处、京密引水管理处、潮白河管理处、十三陵水库管理处所属的20个闸站所的垃圾分类工作，后勤服务中心相关人员参加检查。
                苌永欣一行全面了解了闸站所垃圾分类工作落实情况，重点检查了闸站所的公共、办公、食堂区域的垃圾分类投放情况，仔细查看了桶站周边卫生、设备设施配置、垃圾分类工作台账，并对检查中存在的问题提出具体整改要求。
                苌永欣强调，局属单位要继续加强对所属闸站所垃圾分类工作的管理力度，全面抓好日常管理、疫情防控、垃圾分类等各项工作。一要加大工作力度，坚持问题导向，分析存在问题，总结工作成效，加强垃圾分类工作与疫情防控工作的有机结合；二要积极探索，开拓创新，对照标准规范完善细节，提高精细化管理水平；三要强化党建引领，充分发挥基层党组织的作用，持之以恒地深入宣传教育，营造良好的宣传氛围，提高职工垃圾分类意识。
              </marquee>
            </span>
          </li>
          <li>
            <i></i>
            <span>
              <marquee behavior direction>北京泰宁科创雨水利用技术股份有限公司，北京市昌平区科技园区双营西路90号，4006-501-510</marquee>
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
                return `${seriesName}\n1256.3m³`;
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
        Math.ceil(Math.random() * 8)
      ],
      randomArr2: [
        Math.ceil(Math.random() * 10 + 20),
        Math.ceil(Math.random() * 10 + 20),
        Math.ceil(Math.random() * 10 + 20),
        Math.ceil(Math.random() * 10 + 20),
        Math.ceil(Math.random() * 10 + 20),
        Math.ceil(Math.random() * 10 + 20)
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
            src: "./static/video/2019.12.25 泰宁中文修改版.mp4" //url地址
          }
        ],
        poster: "", // 你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: false // 全屏按钮
        }
      },
      // 回到屏保的timeoutToken
      timeoutToken: null
    };
  },
  methods: {
    // 获取当天天气
    getNowweather() {
      let that = this;
      httpService.nowWeather(function(response) {
        if (response && response.success) {
          that.nowWeatherInfo = response.data;
        }
      });
    },
    // 获取未来12小时天气
    getFultherWeather() {
      let that = this;
      httpService.fultherWeather(function(response) {
        if (response && response.success) {
          that.fultherWeatherInfo = response.data;
        }
      });
    },
    // 获取未来三天的天气
    getThreeDaysWeather() {
      let that = this;
      httpService.threeDaysWeather(function(response) {
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
    }
  },
  computed: {
    getNum() {
      return Math.ceil(Math.random() * 8);
    },
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  created: function() {
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
  mounted: function() {
    let that = this;
    // 屏蔽右键
    document.oncontextmenu = () => false;
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./Home.scss";
</style>
