import axios from "axios";
let host = 'http://39.105.94.5:8092';
let httpServe = axios.create();
function nowWeather(returnFun) {
    let resultInfo = {
        success: false,
        data: null,
        msg: ''
    }
    httpServe({
        method: "get",
        url: "https://devapi.heweather.net/v7/weather/now?location=101010100&key=506c8ed1fba74434b70d2f45d7476470"
    }).then(function (response) {
        resultInfo.success = true
        if (response && response.status === 200) {
            resultInfo.data = response.data.now;
        } else {
            resultInfo.data = {
                text: "多云",
                temp: "25"
            }
        }
        if (returnFun) {
            returnFun(resultInfo);
        }
    });
}
function fultherWeather(returnFun) {
    let resultInfo = {
        success: false,
        data: null,
        msg: ''
    }
    httpServe({
        method: "get",
        url: "https://devapi.heweather.net/v7/weather/24h?location=101010100&key=506c8ed1fba74434b70d2f45d7476470"
    }).then(function (response) {
        resultInfo.success = true
        if (response && response.status === 200) {
            resultInfo.data = response.data.hourly;
        }
        if (returnFun) {
            returnFun(resultInfo);
        }
    });
}
function threeDaysWeather(returnFun) {
    let resultInfo = {
        success: false,
        data: null,
        msg: ''
    }
    httpServe({
        method: "get",
        url: "https://devapi.heweather.net/v7/weather/3d?location=101010100&key=506c8ed1fba74434b70d2f45d7476470"
    }).then(function (response) {
        resultInfo.success = true
        if (response && response.status === 200) {
            resultInfo.data = response.data.daily;
        }
        if (returnFun) {
            returnFun(resultInfo);
        }
    });
}

function test1() {
    let resultInfo = {
        success: false,
        data: null,
        msg: ''
    }
    httpServe({
        method: "get",
        url: "/dataProcess/GetRealTimeData"
    }).then(function (response) {
        let msg = JSON.stringify(msg);
        alert(msg);
    });
}
function test2() {
    let resultInfo = {
        success: false,
        data: null,
        msg: ''
    }
    httpServe({
        method: "get",
        url: "/dataProcess/WriteData?tag=M0.0&value=1"
    }).then(function (response) {
        let msg = JSON.stringify(msg);
        alert(msg);
    });
}
function test3() {
    let resultInfo = {
        success: false,
        data: null,
        msg: ''
    }
    httpServe({
        method: "get",
        url: "/dataProcess/GetHistoryData?startDate=2020-07-14&endDate=2020-07-15&interval=2"
    }).then(function (response) {
        let msg = JSON.stringify(msg);
        alert(msg);
    });
}
export default {
    test1,
    test2,
    test3,
    nowWeather,
    fultherWeather,
    threeDaysWeather
}