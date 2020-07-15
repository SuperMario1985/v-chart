import axios from "axios";
let host = 'http://39.105.94.5:8092';
let httpServe = axios.create();
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
    test3
}