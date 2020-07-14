<template>
  <div class="question-list">
    <header id="mainNav" class="navbar">
      <div class="navbar-inner">
        <div class="container-fluid">
          <a class="brand" href="javascript:void(0)" @click="goHomePage">
            <img src="../assets/img/logo.png" alt="Wemero Help" width="201" height="75" />
          </a>

          <button
            type="button"
            class="btn btn-navbar"
            data-toggle="collapse"
            data-target=".nav-collapse"
          >
            <span class="sr-only">Toggle Navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <div class="nav-collapse collapse"></div>
        </div>
      </div>
    </header>
    <section id="contentArea" class="container-fluid">
      <div class="row-fluid">
        <section id="main-content" class="span9">
          <div class="contentWrapper">
            <hgroup
              id="categoryHead"
              v-if="questionInfo && questionInfo.list && questionInfo.list[0]"
            >
              <h1>{{ questionInfo.list[0].manual_cat_name }}</h1>
            </hgroup>
            <ul class="articleList" v-if="isInit && questionInfo">
              <li @click="goToDetail(item)" v-for="(item,index) in questionInfo.list" :key="index">
                <a href="javascript:void(0)">
                  <i class="icon-article-doc"></i>
                  <span>{{item.manual_title}}</span>
                </a>
              </li>
            </ul>
            <div id="noResults" v-if="isInit && !questionInfo">No results found</div>
          </div>
        </section>
        <aside id="sidebar" class="span3">
          <div id="searchBar" class="sm">
            <el-autocomplete
              class="inline-input"
              v-model="searchInfo.value"
              :fetch-suggestions="querySearch"
              placeholder="Search"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </div>

          <h3>Categories</h3>
          <ul class="nav nav-list" v-if="catList">
            <li
              @click="goToList(item)"
              v-for="(item,index) in catList"
              :key="index"
              :class="{active:item.manual_cat_id == $route.params.classifyID}"
            >
              <a href="javascript:void(0)">
                {{item.manual_cat_name}}
                <i class="icon-arrow"></i>
              </a>
            </li>
          </ul>
        </aside>
      </div>
      <footer class="center">
        <p>
          &copy;
          <a href="#">Wemero Inc</a>
          2020.
        </p>
      </footer>
    </section>
  </div>
</template>

<script>
import httpService from "../api/httpService";
export default {
  name: "QuestionList",
  data() {
    return {
      searchInfo: {
        value: ""
      },
      catList: null,
      questionInfo: null,
      languageName: "en",
      languageOptions: [
        {
          value: "en",
          label: "English"
        },
        {
          value: "ru",
          label: "Pусский"
        },
        {
          value: "ja",
          label: "日本語"
        },
        {
          value: "zh",
          label: "中文(简体)"
        },
        {
          value: "hk",
          label: "香港-中文"
        },
        {
          value: "tw",
          label: "台湾-中文"
        }
      ]
    };
  },
  methods: {
    goHomePage() {
      this.$router.push({
        name: "Home",
        params: {
          catId: this.$route.params.catId
        }
      });
    },
    querySearch(queryString, cb) {
      let that = this;
      let queryInfo = {
        catId: this.$route.params.catId,
        q: queryString,
        pageSiz: -1
      };
      httpService.getQuestionList(queryInfo, function(response) {
        if (response.success) {
          let resultList = response.data.list;
          resultList.forEach(item => {
            item.value = item.manual_title;
          });
          cb(resultList);
        }
      });
    },
    handleSelect(questinoItem) {
      this.$router.push({
        name: "QuestionDetail",
        params: {
          catId: this.$route.params.catId,
          classifyID: questinoItem.manual_cat_id,
          id: questinoItem.manual_id,
          slug: questinoItem.manual_slug
        }
      });
    },
    goToList: function(catItem) {
      if (catItem.manual_cat_id == this.$route.params.classifyID) {
      } else {
        this.$router.push({
          name: "QuestionList",
          params: {
            catId: this.$route.params.catId,
            classifyID: catItem.manual_cat_id,
            slug: catItem.manual_cat_slug
          }
        });
        this.questionList();
      }
    },
    goToDetail: function(item) {
      this.$router.push({
        name: "QuestionDetail",
        params: {
          catId: this.$route.params.catId,
          classifyID: this.$route.params.classifyID,
          id: item.manual_id,
          slug: item.manual_slug
        }
      });
    },
    questionList() {
      let that = this;
      let routerParams = this.$route.params;
      let queryInfo = {
        catId: routerParams.catId,
        classifyID: routerParams.classifyID
      };
      httpService.getQuestionList(queryInfo, function(response) {
        that.isInit = true;
        if (response && response.success) {
          that.questionInfo = response.data;
        } else {
          that.$message({ message: response.msg, type: "warning" });
        }
      });
    },
    setLanguageStorage(lang) {
      if (lang) {
        window.localStorage.setItem("wemeroUserLang", "en");
      }
    },
    changeLanguage(lang) {
      if (lang) {
        let languageName = window.localStorage.getItem("wemeroUserLang");
        if (lang !== languageName) {
          window.localStorage.setItem("wemeroUserLang", lang);
          window.location.reload();
        }
      }
    }
  },
  computed: {},
  created: function() {
    let that = this;
    let languageName = window.localStorage.getItem("wemeroUserLang");
    if (languageName) {
      this.languageName = languageName;
    } else {
      this.languageName = "en";
      this.setLanguageStorage(this.languageName);
    }
    let routerParams = this.$route.params;
    let queryInfo = {
      catId: routerParams.catId,
      classifyID: routerParams.classifyID
    };
    httpService.getManualList(queryInfo, function(response) {
      if (response && response.success) {
        that.catList = response.data;
      } else {
        that.$message({ message: response.msg, type: "warning" });
      }
    });
    this.questionList();
  },
  mounted: function() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.language-box {
  float: right;
  padding-top: 12px;
  /deep/ .el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    margin-bottom: 0px;
  }
}
#searchBar {
  .el-autocomplete {
    width: 100%;
  }
  /deep/ .el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    margin-bottom: 0px;
    color: #161b1e;
    font-size: 14px;
  }
}
#noResults {
  padding: 200px 0 100px;
  text-align: center;
  font-size: 28px;
  line-height: 38px;
  color: #333;
}
</style>
