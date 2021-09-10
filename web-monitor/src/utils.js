/**
 * 监控代码需要的工具类
 */
// var html2canvas = require('html2canvas')
export function getUuid () {
    var timeStamp = new Date().getTime()
    return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16) + "-" + timeStamp;
    });
}
/**
 * 获取用户的唯一标识
 */
export function getCustomerKey () {
    var pageKey = getUuid();
    if (!localStorage.monitorPageKey) localStorage.monitorPageKey = pageKey;
    return localStorage.monitorPageKey
}
/**
 * 获取页面的唯一标识
 */
export function getPageKey () {
    var pageKey = getUuid();
    if (!localStorage.monitorPageKey) localStorage.monitorPageKey = pageKey;
    return localStorage.monitorPageKey;
}
/**
 * 设置页面的唯一标识
 */
export function setPageKey () {
    localStorage.monitorPageKey = getUuid();
}
/**
 * 重写页面的load事件
 * @param {*} func 
 */
export function addLoadEvent (func) {
    var oldOnload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldOnload();
            func();
        }
    }
}
/**
 * 封装ajax请求
 * @param {*} method 请求类型（大写） get/post
 * @param {*} url  请求URL
 * @param {*} param    请求参数
 * @param {*} successCallback 成功回调方法
 * @param {*} failCallback 失败回调方法
 */
export function ajax (method, url, header, param, successCallback, failCallback) {
    var xmlHttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xmlHttp.open(method, url, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    // xmlHttp.withCredentials = true;
    for (var key in header) {
        xmlHttp.setRequestHeader(key, header[key]);
    }
    xmlHttp.setRequestHeader('X-Custom-Header', 'value');
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var res = JSON.parse(xmlHttp.responseText);
            typeof successCallback == 'function' && successCallback(res);
        } else {
            typeof failCallback == 'function' && failCallback();
        }
    };
    xmlHttp.send(JSON.stringify(param));
}
export function objectToUrlParams (obj) {
    return Object.keys(obj).map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    }).join('&')
}
/**
 * js处理截图
 * @param {*} cntElem 
 * @param {*} description 
 */
// export function screenShot (cntElem, description, SCREEN_SHOT) {
//     var shareContent = cntElem; // 需要截图的包裹的DOM对象
//     var width = shareContent.offsetWidth;   // 获取dom宽度
//     var height = shareContent.offsetHeight; // 获取dom高度
//     var canvas = document.createElement('canvas');  // 创建一个canvas节点
//     var scale = 0.3;  // 定义任意放大倍数
//     canvas.style.display = "none";
//     canvas.width = width * scale;  // 定义canvas宽度*绽放
//     canvas.height = height * scale;  // 定义canvas高度*绽放
//     var opts = {
//         scale: scale,  //添加的scale参数
//         canvas: canvas, // 自定义canvas
//         logging: false, // 日志开关，便于查看html2canvas的内部执行流程
//         width: width, // dom 原始宽度
//         height: height,
//         useCORS: true    //  开启跨域配置
//     };
//     html2canvas(cntElem, opts).then(function (canvas) {
//         var dataURL = canvas.toDataURL('image/webp');
//         var tempCompress = dataURL.replace('data:image/webp;base64,', '');
//         var compressedDataURL = this.b64EncodeUnicode(tempCompress);
//         var screenShotInfo = new ScreenShotInfo(SCREEN_SHOT, description, compressedDataURL);
//         ScreenShotInfo.handleLogInfo(SCREEN_SHOT, screenShotInfo);
//     })
// }

export function loadJs (url, callback) {
    var script = document.createElement('script');
    script.async = 1;
    script.src = url;
    script.onload = callback;
    var dom = document.getElementsByTagName('script')[0];
    dom.parentElement.insertBefore(script, dom);
    return dom;
}

export function b64EncodeUnicode (str) {
    try {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
            return String.fromCharCode('0x' + p1)
        }))
    } catch (e) {
        return str;
    }
}
/**
 * 时间转换
 * @param {*} time 时间戳
 * @param {*} cFormat 
 */
export function parseTime (time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    // console.log(typeof time === 'object')
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
    // if (typeof time === 'object') {
    //     date = time
    // } else {
    //     if (('' + time).length === 10) time = parseInt(time) * 1000
    //     date = new Date(time)
    // }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        // eslint-disable-next-line
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return timeStr
}