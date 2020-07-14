import axios from "axios";
let language = window.localStorage.getItem("wemeroUserLang", "en");
let httpServe = axios.create({
    headers: { 'api-lang': language }
})
// 缓存分类
let manualListCache = null;
// 监听setItemEvent事件
window.addEventListener("setItemEvent", function (event) {
    if (event.key === 'wemeroUserLang') {
        language = event.newValue;
        httpServe = axios.create({
            headers: { 'api-lang': language },
        })
    }
    // else if (event.key === 'wemeroLoginToken') {
    //     wemeroLoginToken = event.newValue;
    // }

});
let host = 'http://39.105.94.5:8092';
function login(loginInfo, successFun, errorFun) {
    let resultInfo = {
        success: false,
        data: null,
        msg: ''
    }
    httpServe({
        method: "post",
        url: host + "/api/v1/capi/storeDetail",
        data: loginInfo
    }).then(function (response) {
        if (response.status === 200 &&
            response.data &&
            response.data.code === 10000) {
            resultInfo.success = true;
            resultInfo.data = response.data.data;
            resultInfo.msg = response.data.msg;
        } else {
            resultInfo.msg = response.data.msg;
        }
        if (successFun) {
            successFun(resultInfo);
        }
    });
}
// 获取用户手册首页分类数据
function getManualList(manualInfo, successFun, errorFun) {
    let resultInfo = {
        success: false,
        data: null,
        msg: ''
    }
    if (manualListCache) {
        resultInfo.success = true;
        resultInfo.data = manualListCache;
        resultInfo.msg = 'success';
        if (successFun) {
            successFun(resultInfo);
        }
    } else {
        httpServe({
            method: "get",
            url: host + "/api/manual/count",
            headers: {
                "api-catId": manualInfo.catId
            }
        }).then(function (response) {
            if (response.status === 200 &&
                response.data &&
                response.data.code === 10000) {
                resultInfo.success = true;
                resultInfo.data = response.data.data;
                resultInfo.msg = response.data.msg;
                // 缓存列表
                manualListCache = response.data.data
            } else {
                resultInfo.msg = response.data.msg;
            }
            if (successFun) {
                successFun(resultInfo);
            }
        });
    }

}
// 获取问题列表
function getQuestionList(manualInfo, successFun, errorFun) {
    let resultInfo = {
        success: false,
        data: null,
        msg: ''
    }
    httpServe({
        method: "get",
        url: host + "/api/manual/list",
        headers: {
            "api-catId": manualInfo.catId
        },
        params: {
            manual_cat_id: manualInfo.classifyID,
            q: manualInfo.q,
            page_siz: manualInfo.pageSiz
        }
    }).then(function (response) {
        if (response.status === 200 &&
            response.data &&
            response.data.code === 10000) {
            resultInfo.success = true;
            resultInfo.data = response.data.data;
            resultInfo.msg = response.data.msg;
        } else {
            resultInfo.msg = response.data.msg;
        }
        if (successFun) {
            successFun(resultInfo);
        }
    });
}
// 获取问题详情
function getQuestionDetail(manualInfo, successFun, errorFun) {
    let resultInfo = {
        success: false,
        data: null,
        msg: ''
    }
    httpServe({
        method: "get",
        url: host + "/api/manual/show/" + manualInfo.id,
        headers: {
            "api-catId": manualInfo.catId
        }
    }).then(function (response) {
        if (response.status === 200 &&
            response.data &&
            response.data.code === 10000) {
            resultInfo.success = true;
            resultInfo.data = response.data.data;
            resultInfo.msg = response.data.msg;
        } else {
            resultInfo.msg = response.data.msg;
        }
        if (successFun) {
            successFun(resultInfo);
        }
    });
}
// 点赞
function manualLike(manualInfo, successFun) {
    let resultInfo = {
        success: false,
        data: null,
        msg: ''
    }
    httpServe({
        method: "post",
        url: host + "/api/manual/like/" + manualInfo.id,
        headers: {
            "api-catId": manualInfo.catId
        }
    }).then(function (response) {
        if (response.status === 200 &&
            response.data &&
            response.data.code === 10000) {
            resultInfo.success = true;
            resultInfo.data = response.data.data;
            resultInfo.msg = response.data.msg;
        } else {
            resultInfo.msg = response.data.msg;
        }
        if (successFun) {
            successFun(resultInfo);
        }
    });
}
// 吐槽
function manualDislike(manualInfo, successFun) {
    let resultInfo = {
        success: false,
        data: null,
        msg: ''
    }
    httpServe({
        method: "post",
        url: host + "/api/manual/dislike/" + manualInfo.id,
        headers: {
            "api-catId": manualInfo.catId
        }
    }).then(function (response) {
        if (response.status === 200 &&
            response.data &&
            response.data.code === 10000) {
            resultInfo.success = true;
            resultInfo.data = response.data.data;
            resultInfo.msg = response.data.msg;
        } else {
            resultInfo.msg = response.data.msg;
        }
        if (successFun) {
            successFun(resultInfo);
        }
    });
}
export default {
    getManualList,
    getQuestionList,
    getQuestionDetail,
    manualLike,
    manualDislike
}