import axios from "axios";
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
export default {
    login
}