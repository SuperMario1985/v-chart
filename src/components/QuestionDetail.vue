<template>
  <div class="question-detail">
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
          <!--/.nav-collapse -->
        </div>
        <!--/container-->
      </div>
      <!--/navbar-inner-->
    </header>

    <section id="contentArea" class="container-fluid">
      <div class="row-fluid">
        <section id="main-content" class="span9">
          <div class="contentWrapper" v-if="isInit && questionDetail">
            <article id="fullArticle">
              <h1 class="title">{{questionDetail.manual_title}}</h1>
              <div v-html="questionDetail.manual_info"></div>
            </article>
            <div class="articleRatings" data-article-url="#">
              <span class="articleRatings-question">Did this answer your question?</span>
              <span class="articleRatings-feedback">
                <span class="articleRatings-feedback-tick">
                  <svg
                    height="20"
                    viewBox="0 0 20 20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m8 14a.997.997 0 0 1 -.707-.293l-2-2a.999.999 0 1 1 1.414-1.414l1.293 1.293 4.293-4.293a.999.999 0 1 1 1.414 1.414l-5 5a.997.997 0 0 1 -.707.293"
                      fill="#2CC683"
                      fill-rule="evenodd"
                    />
                  </svg>
                </span>
                <span class="articleRatings-feedback-message">Thanks for the feedback</span>
              </span>
              <span class="articleRatings-failure">
                There was a problem submitting your feedback. Please try again
                later.
              </span>
              <div class="articleRatings-actions">
                <button
                  class="rateAction rateAction--positive"
                  data-rating="positive"
                  @click="handleUsefulClick"
                >
                  <span class="sr-only">Yes</span>
                  <span class="rating-face">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                      <path
                        fill-rule="evenodd"
                        d="M5.538 14.026A19.392 19.392 0 0 1 12 12.923c2.26 0 4.432.388 6.462 1.103-1.087 2.61-3.571 4.436-6.462 4.436-2.891 0-5.375-1.825-6.462-4.436zm1.847-3.872a1.846 1.846 0 1 1 0-3.692 1.846 1.846 0 0 1 0 3.692zm9.23 0a1.846 1.846 0 1 1 0-3.692 1.846 1.846 0 0 1 0 3.692z"
                      />
                    </svg>
                  </span>
                </button>
                <button
                  class="rateAction rateAction--negative"
                  data-rating="negative"
                  @click="handleUselessClick"
                >
                  <span class="sr-only">No</span>
                  <span class="rating-face">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                      <path
                        fill-rule="evenodd"
                        d="M7.385 13.846a1.846 1.846 0 1 1 0-3.692 1.846 1.846 0 0 1 0 3.692zm9.23 0a1.846 1.846 0 1 1 0-3.692 1.846 1.846 0 0 1 0 3.692zm-.967 4.95a.992.992 0 0 1-.615-.212c-1.701-1.349-4.364-1.349-6.065 0a.998.998 0 0 1-1.36-.123.895.895 0 0 1 .127-1.3A6.897 6.897 0 0 1 12 15.692c1.555 0 3.069.521 4.266 1.467.41.326.467.909.127 1.3a.982.982 0 0 1-.745.335z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <section class="articleFoot">
              <i class="icon-contact"></i>
              <p class="help">
                Still need help?
                <a
                  id="sbContact"
                  href="javascript:void(0)"
                  data-toggle="modal"
                  class="contactUs"
                >Contact Us</a>
                <a id="sbContactMobile" href="javascript:void(0)" class="contactUs">Contact Us</a>
              </p>

              <time class="lu" datetime="2019-11-20">Last updated on {{questionDetail.created_at}}</time>
            </section>
          </div>
          <div id="noResults" v-if="isInit && !questionDetail">
            <default-page></default-page>
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

    <section id="contactModal" class="modal hide" tabindex="-1">
      <h2>Contact Us</h2>
      <a href="#" id="closeBtn" data-dismiss="modal">
        <i class="icon-close"></i>
      </a>
      <div class="modal-body">
        <form
          data-parsley-validate
          novalidate
          method="post"
          action="/contact"
          enctype="multipart/form-data"
          class="form-horizontal contact"
        >
          <div class="control-group">
            <label for="md-name" class="control-label">Name</label>
            <div class="controls">
              <input type="text" name="name" id="md-name" placeholder="(optional)" />
            </div>
            <!--/controls-->
          </div>
          <!--/control-group-->
          <div class="control-group">
            <label for="md-email" class="control-label">Email</label>
            <div class="controls">
              <input
                type="email"
                name="email"
                id="md-email"
                data-parsley-required="true"
                data-parsley-type="email"
                data-parsley-notblank="true"
                data-parsley-trigger="change"
                data-parsley-required-message="Email is required"
              />
              <input type="text" name="phone" id="phone" value />
            </div>
            <!--/controls-->
          </div>
          <!--/control-group-->
          <div class="control-group">
            <label for="md-subject" class="control-label">Subject</label>
            <div class="controls">
              <input
                type="text"
                name="subject"
                id="md-subject"
                data-parsley-required="true"
                data-parsley-notblank="true"
                data-parsley-required-message="Subject is required"
              />
            </div>
            <!--/controls-->
          </div>
          <!--/control-group-->
          <div class="control-group">
            <label for="md-message" class="control-label">Message</label>
            <div class="controls">
              <textarea
                name="message"
                id="md-message"
                data-parsley-required="true"
                data-parsley-notblank="true"
                data-parsley-required-message="Message is required"
              ></textarea>
            </div>
            <!--/controls-->
          </div>
          <!-- /control-group -->
          <div class="control-group">
            <label for="file-upload" class="control-label">Upload file</label>
            <div class="controls">
              <input id="file-upload" type="file" name="upload" data-parsley-max-file-size="10" />
            </div>
          </div>
          <!--/control-group-->
          <div class="form-actions">
            <input type="submit" class="btn" value="Send" />
          </div>
          <!--/form-actions-->
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import httpService from "../api/httpService";
import DefaultPage from "@/components/DefaultPage";
export default {
  name: "QuestionDetail",
  data() {
    return {
      searchInfo: {
        value: ""
      },
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
      ],
      catList: null,
      questionDetail: null,
      isInit: false
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
      let that = this;
      if (questinoItem.manual_id == this.$route.params.id) {
      } else {
        this.$router.push({
          name: "QuestionDetail",
          params: {
            catId: this.$route.params.catId,
            classifyID: questinoItem.manual_cat_id,
            id: questinoItem.manual_id,
            slug: questinoItem.manual_slug
          }
        });
        let routerParams = this.$route.params;
        let queryInfo = {
          catId: routerParams.catId,
          classifyID: routerParams.classifyID,
          id: routerParams.id
        };
        httpService.getQuestionDetail(queryInfo, function(response) {
          if (response && response.success) {
            that.questionDetail = response.data;
          } else {
            that.$message({ message: response.msg, type: "warning" });
          }
        });
      }
    },
    goToList: function(catItem) {
      this.$router.push({
        name: "QuestionList",
        params: {
          catId: this.$route.params.catId,
          classifyID: catItem.manual_cat_id,
          slug: catItem.manual_cat_slug
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
    },
    handleUsefulClick() {
      let that = this;
      let queryInfo = {
        catId: this.$route.params.catId,
        id: this.$route.params.id
      };
      httpService.manualLike(queryInfo, function(response) {
        if (response && response.success) {
          that.$message({ message: response.msg, type: "info" });
        } else {
          that.$message({ message: response.msg, type: "warning" });
        }
      });
    },
    handleUselessClick() {
      let that = this;
      let queryInfo = {
        catId: this.$route.params.catId,
        id: this.$route.params.id
      };
      httpService.manualDislike(queryInfo, function(response) {
        if (response && response.success) {
          that.$message({ message: response.msg, type: "info" });
        } else {
          that.$message({ message: response.msg, type: "warning" });
        }
      });
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
      classifyID: routerParams.classifyID,
      id: routerParams.id
    };
    httpService.getManualList(queryInfo, function(response) {
      if (response && response.success) {
        that.catList = response.data;
      } else {
        that.$message({ message: response.msg, type: "warning" });
      }
    });
    httpService.getQuestionDetail(queryInfo, function(response) {
      that.isInit = true;
      if (response && response.success) {
        that.questionDetail = response.data;
      } else {
        that.$message({ message: response.msg, type: "warning" });
      }
    });
  },
  mounted: function() {},
  components: {
    DefaultPage
  }
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
.noResults {
}
</style>
