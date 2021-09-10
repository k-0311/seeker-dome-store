(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.KMmonitor = factory());
}(this, function () { 'use strict';

    const WEB_MONITOR_ID = 'km_webmonitor';

    // 判断是http或是https的项目
    const WEB_HTTP_TYPE = window.location.href.indexOf('https') === -1 ? 'http://' : 'https://';

    // 获取当前页面的URL
    const WEB_LOCATION = window.location.href;

    // 本地IP，用于区分本地开发环境
    const WEB_LOCAL_IP = 'localhost';

    // 监控平台地址
    const WEB_MONITOR_IP = '';

    // 上传数据的uri, 区分了本地和生产环境
    const HTTP_UPLOAD_URI = WEB_LOCATION.indexOf(WEB_LOCAL_IP) === -1 ? WEB_HTTP_TYPE + WEB_MONITOR_IP : WEB_HTTP_TYPE + WEB_LOCAL_IP + ':8010';

    // 用户访问日志类型
    const CUSTOMER_PV = 'CUSTOMER_PV';

    // 用户加载页面信息类型
    const LOAD_PAGE = 'LOAD_PAGE';

    // 接口日志类型
    const HTTP_LOG = 'HTTP_LOG';

    // js报错日志类型
    const JS_ERROR = 'JS_ERROR';

    // 截屏类型
    const SCREEN_SHOT = 'SCREEN_SHOT';

    // 用户的行为类型
    const ELE_BEHAVIOR = 'ELE_BEHAVIOR';

    // 静态资源类型
    const RESOURCE_LOAD = 'RESOURCE_LOAD';

    // 用户自定义行为类型
    const CUSTOMIZE_BEHAVIOR = 'CUSTOMIZE_BEHAVIOR';

    // 浏览器信息
    const BROWSER_INFO = window.navigator.userAgent;

    const USER_INFO = localStorage.kmUserInfo ? JSON.parse(localStorage.kmUserInfo) : {};
    // const config = {

    //     // 上传数据的uri, 区分了本地和生产环境
    //     HTTP_UPLOAD_URI: this.WEB_LOCATION.indexOf(this.WEB_LOCAL_IP) === -1 ? this.WEB_HTTP_TYPE + this.WEB_MONITOR_IP : this.WEB_HTTP_TYPE + this.WEB_LOCAL_IP + ':8010',
    //     // 上传数据的接口API
    //     HTTP_UPLOAD_LOG_API: '',
    //     // 上传数据时忽略的uri，需要过滤掉监控平台上传接口
    //     WEB_MONITOR_IGNORE_URL: this.HTTP_UPLOAD_URI + '',
    //     // 上传数据的接口
    //     HTTP_UPLOAD_LOG_INFO: this.HTTP_UPLOAD_URI,
    //     // 获取当前项目的参数信息接口
    //     HTTP_PROJECT_INFO: this.HTTP_UPLOAD_URI + '',
    //     // 上传埋点数据接口
    //     HTTP_UPLOAD_RECORD_DATA: this.HTTP_UPLOAD_URI + '',
    //     // 用户访问日志类型
    //     CUSTOMER_PV: 'CUSTOMER_PV',
    //     // 用户加载页面信息类型
    //     LOAD_PAGE: 'LOAD_PAGE',
    //     // 接口日志类型
    //     HTTP_LOG: 'HTTP_LOG',
    //     // 接口错误日志类型
    //     HTTP_ERROR: 'HTTP_ERROR',
    //     // js报错日志类型
    //     JS_ERROR: 'JS_ERROR',
    //     // 截屏类型
    //     SCREEN_SHOT: 'SCREEN_SHOT',
    //     // 用户的行为类型
    //     ELE_BEHAVIOR: 'ELE_BEHAVIOR',
    //     // 静态资源类型
    //     RESOURCE_LOAD: 'RESOURCE_LOAD',
    //     // 用户自定义行为类型
    //     CUSTOMIZE_BEHAVIOR: 'CUSTOMIZE_BEHAVIOR',
    //     // 浏览器信息
    //     BROWSER_INFO: window.navigator.userAgent,
    //     // 监控代码空造函数
    //     WebMonitor: {},
    //     // 获取用户自定义信息
    //     USER_INFO: localStorage.kmUserInfo ? JSON.parse(localStorage.kmUserInfo) : {}

    // };
    // // 常量
    // module.exports = config;

    /**
     * 监控代码需要的工具类
     */
    var html2canvas = require('html2canvas');
    /**
     * 获取页面的唯一标识
     */
    function getPageKey () {
        var pageKey = this.getUuid();
        if (!localStorage.monitorPageKey) localStorage.monitorPageKey = pageKey;
        return localStorage.monitorPageKey;
    }
    /**
     * 设置页面的唯一标识
     */
    function setPageKey () {
        localStorage.monitorPageKey = this.getUuid();
    }
    /**
     * 重写页面的load事件
     * @param {*} func 
     */
    function addLoadEvent (func) {
        var oldOnload = window.onload;
        if (typeof window.onload != 'function') {
            window.onload = func;
        } else {
            window.onload = function () {
                oldOnload();
                func();
            };
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
    function ajax (method, url, header, param, successCallback, failCallback) {
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

    function b64EncodeUnicode (str) {
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
    function parseTime (time, cFormat) {
        if (arguments.length === 0) {
            return null
        }
        const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
        let date;
        // console.log(typeof time === 'object')
        if (('' + time).length === 10) time = parseInt(time) * 1000;
        date = new Date(time);
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
        };
        const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
            let value = formatObj[key];
            // Note: getDay() returns 0 on Sunday
            // eslint-disable-next-line
            if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
            if (result.length > 0 && value < 10) {
                value = '0' + value;
            }
            return value || 0
        });
        return timeStr
    }

    /**
     * 日志基类，用于其他日志的继承
     */
    class MonitorBaseInfo {
        handleLogInfo (type, logInfo) {
            // var tempString = localStorage[type] ? localStorage[type] : '';
            switch (type) {
                case ELE_BEHAVIOR:
                    localStorage[ELE_BEHAVIOR] = JSON.stringify(logInfo);
                    break;
                case JS_ERROR:
                    localStorage[JS_ERROR] = JSON.stringify(logInfo);
                    break;
                case HTTP_LOG:
                    localStorage[HTTP_LOG] = JSON.stringify(logInfo);
                    break;
                case SCREEN_SHOT:
                    localStorage[SCREEN_SHOT] = JSON.stringify(logInfo);
                    break;
                case CUSTOMER_PV:
                    localStorage[CUSTOMER_PV] = JSON.stringify(logInfo);
                    break;
                case LOAD_PAGE:
                    localStorage[LOAD_PAGE] = JSON.stringify(logInfo);
                    break;
                case RESOURCE_LOAD:
                    localStorage[RESOURCE_LOAD] = JSON.stringify(logInfo);
                    break;
                case CUSTOMIZE_BEHAVIOR:
                    localStorage[CUSTOMIZE_BEHAVIOR] = JSON.stringify(logInfo);
                    break;
                default: break;
            }
        }

        setCommonProperty () {
            this.happenTime = new Date().getTime();   // 日志发生时间
            this.WebMonitorId = WEB_MONITOR_ID;   // 用于区分应用的唯一标识（一个项目对应一个）
            this.simpleUrl = window.location.href.split('?')[0].replace('#', '');   // 页面的url
            // this.completeUrl = utils.b64EncodeUnicode(encodeURIComponent(window.location.href));  // 页面的完整url
            // this.customeKey = utils.getCustomerKey();// 用于区分用户，所对应唯一的标识，清理本地数据后失效，
            // 用户自定义信息，由开发者主动传，使于对线上问题进行准确定位
            // var kmUserInfo = localStorage.kmUserInfo ? JSON.parse(localStorage.kmUserInfo) : '';
            // this.userId = utils.b64EncodeUnicode(kmUserInfo.userId || '');
            // this.firstUserParam = utils.b64EncodeUnicode(kmUserInfo.firstUserParam || '');
            // this.secondUserParam = utils.b64EncodeUnicode(kmUserInfo.secondUserParam || '')
        }
    }

    // var MonitorBaseInfo = require('./MonitorBaseInfo')
    var detector = require('detector');

    class JavaScriptErrorInfo extends MonitorBaseInfo {
        constructor(uploadType, infoType, errorMsg, errorStack) {
            super();
            super.setCommonProperty();
            this.uploadType = uploadType;
            this.infoType = infoType;
            this.pageKey = getPageKey();  //用于区分页面，所对应唯一的标识，每个新页面对应一个值
            this.deviceName = detector.device.name;
            this.os = detector.os.name + ' ' + detector.os.version;
            this.browserName = detector.browser.name;
            this.browserVersion = detector.browser.version;
            this.monitorIp = "";  // 用户的IP地址
            this.country = "china";  // 用户所在国家
            this.province = "";  // 用户所在省份
            this.city = "";  // 用户所在城市
            // this.errorMessage = utils.b64EncodeUnicode(errorMsg)
            this.detail = errorMsg;
            // this.errorStack = utils.b64EncodeUnicode(errorStack)
        }
    }

    // var MonitorBaseInfo = require('./MonitorBaseInfo')

    /**
     * 页面静态资源加载错误统计，继承于日志基类MonitorBaseInfo
     */
    class ResourceLoadInfo extends MonitorBaseInfo {
        constructor(uploadType, url, elementType, status) {
            super();
            super.setCommonProperty();
            this.uploadType = uploadType;
            this.elementType = elementType;
            // this.sourceUrl = utils.b64EncodeUnicode(encodeURIComponent(url));
            this.detail = url;
            this.status = status;
        }
    }

    // var MonitorBaseInfo = require('./MonitorBaseInfo')
    var detector$1 = require('detector');

    class CustomerPV extends MonitorBaseInfo {
        constructor(uploadType, loadType, loadTime) {
            super();
            super.setCommonProperty();
            this.uploadType = uploadType;
            this.pageKey = getPageKey();  //用于区分页面，所对应唯一的标识，每个新页面对应一个值
            this.deviceName = detector$1.device.name;
            this.os = detector$1.os.name + ' ' + detector$1.os.version;
            this.browserName = detector$1.browser.name;
            this.browserVersion = detector$1.browser.version;
            // TODO 位置信息, 待处理
            this.monitorIp = "";  // 用户的IP地址
            this.country = "china";  // 用户所在国家
            this.province = "";  // 用户所在省份
            this.city = "";  // 用户所在城市
            this.loadType = loadType;  // 用以区分首次加载
            this.loadTime = loadTime; // 加载时间
        }
    }

    // var MonitorBaseInfo = require('./MonitorBaseInfo')
    class LoadPageInfo extends MonitorBaseInfo {
        constructor(uploadType, loadType, loadPage, domReady, redirect, lookupDomain, ttfb, request, loadEvent, appcache, unloadEvent, connect) {
            super();
            super.setCommonProperty.apply(this);
            this.uploadType = uploadType;
            this.loadType = loadType;
            this.loadPage = loadPage;
            this.domReady = domReady;
            this.redirect = redirect;
            this.lookupDomain = lookupDomain;
            this.ttfb = ttfb;
            this.request = request;
            this.loadEvent = loadEvent;
            this.appcache = appcache;
            this.unloadEvent = unloadEvent;
            this.connect = connect;
        }
    }

    // var MonitorBaseInfo = require('./MonitorBaseInfo')

    // 用户行为日志，继承于日志基类MonitorBaseInfo
    class BehaviorInfo extends MonitorBaseInfo {
        constructor(uploadType, behaviorType, className, placeholder, inputValue, tagName, innerText) {
            super();
            super.setCommonProperty();
            this.uploadType = uploadType;
            this.behaviorType = behaviorType;
            this.className = b64EncodeUnicode(className);
            this.placeholder = b64EncodeUnicode(placeholder);
            this.inputValue = b64EncodeUnicode(inputValue);
            this.tagName = tagName;
            this.innerText = b64EncodeUnicode(encodeURIComponent(innerText));
        }
    }

    // var MonitorBaseInfo = require('./MonitorBaseInfo')

    class HttpLogInfo extends MonitorBaseInfo {
        constructor(uploadType, url, status, statusText, statusResult, currentTime, loadTime) {
            super();
            super.setCommonProperty();
            this.uploadType = uploadType;
            this.httpUrl = b64EncodeUnicode(encodeURIComponent(url)); //请求地址
            this.status = status;   // 接口状态
            this.statusText = statusText;   // 状态描述
            this.statusResult = statusResult;   // 区分发起和返回状态
            this.happenTime = currentTime;  // 客户端发送时间
            this.loadTime = loadTime;   // 接口请求耗时
        }
    }

    // 上报的域名
    let reportHost = '';

    var index = {
        recordResourceError: function () {
            // 当浏览器不支持window.performance.getEntries的时候，用下边这种方式
            window.addEventListener('error', function (e) {
                let typeName = e.target.localName;
                let sourceUrl = '';
                if (typeName === 'link') {
                    sourceUrl = e.target.href;
                } else {
                    sourceUrl = e.target.src;
                }
                let resourceLoadInfo = new ResourceLoadInfo(RESOURCE_LOAD, sourceUrl, typeName, '0');
                resourceLoadInfo.handleLogInfo(RESOURCE_LOAD, resourceLoadInfo);
                let logInfo = localStorage['RESOURCE_LOAD'];
                logInfo.length > 0 && this.report(JSON.parse(logInfo), 'RESOURCE_LOAD');
            }.bind(this), true);
        },
        /**
        * 用户访问记录监控
        */
        recordPV: function () {
            setPageKey();
            let loadType = 'load';
            if (this.resourcesObj) {
                if (this.resourcesObj[0] && this.resourcesObj[0].type === 'navigate') {
                    loadType = 'load';
                } else {
                    loadType = 'reload';
                }
            }
            let customePv = new CustomerPV(CUSTOMER_PV, loadType, 0);
            customePv.handleLogInfo(CUSTOMER_PV, customePv);
        },

        /**
         * 用户加载页面信息监控
         */
        recordLoadPage: function () {
            addLoadEvent(function () {
                setTimeout(function () {
                    if (this.resourcesObj) {
                        let loadType = 'load';
                        if (this.resourcesObj[0] && this.resourcesObj[0].type === 'navigate') {
                            loadType = 'load';
                        } else {
                            loadType = 'reload';
                        }

                        let t = this.timingObj;
                        let loadPageInfo = new LoadPageInfo(LOAD_PAGE);
                        // 页面加载类型，区分第一次load还是reload
                        loadPageInfo.loadType = loadType;

                        // 页面加载完成的时间
                        // 代表了用户等待页面可用的时间
                        loadPageInfo.loadPage = t.loadEventEnd - t.navigationStart;

                        // 解析DOM树结构的时间
                        // 反省下你的DOM树是不是太多了
                        loadPageInfo.domReady = t.domComplete - t.responseEnd;

                        // 重定向的时间
                        // 拒绝重定向！
                        loadPageInfo.redirect = t.redirectEnd - t.redirectStart;

                        // DNS查询时间
                        // DNS预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
                        // 可使用 HTML5 Prefetch预查询DNS
                        loadPageInfo.lookupDomain = t.domainLookupEnd - t.domainLookupStart;

                        /**
                         * 读取页面第一个字节的时间
                         * 这可以理解为用户拿到你的资源占用时间，加民地机房了么，加CDN处理了么？加CPU运算速度了么？
                         * TTFB即 Time To First Byte的意思
                         */
                        loadPageInfo.ttfb = t.responseStart - t.navigationStart;

                        /**
                         * 内容加载完成的时间
                         * 页面内容经过gzip压缩了么，静态资源css/js等压缩了么？
                         */
                        loadPageInfo.request = t.responseEnd - t.requestStart;

                        // 执行onload回调函数的时间
                        // 是否太多不必要的操作都放到onload回调函数里执行了，考虑过延迟加载、按需加载的策略么？
                        loadPageInfo.loadEvent = t.loadEventEnd - t.loadEventStart;

                        // DNS缓存时间
                        loadPageInfo.appcache = t.domainLookupStart - t.fetchStart;

                        // 卸载页面的时间
                        loadPageInfo.unloadEvent = t.unloadEventEnd - t.unloadEventStart;

                        // TCP建立连接完成握手的时间
                        loadPageInfo.connect = t.connectEnd - t.connectStart;
                        loadPageInfo.handleLogInfo(LOAD_PAGE, loadPageInfo);
                    }
                    this.performanceGetEntries();
                }.bind(this), 1000);
            }.bind(this));
        },

        /**
         * 利用window.performance.getEntries来对比静态资源是否加载成功
         */
        performanceGetEntries: function () {
            if (window.performance && typeof window.performance.getEntries === 'function') {
                let entries = window.performance.getEntries();
                let scriptArray = entries.filter(function (entry) {
                    return entry.initiatorType === 'script';
                });
                let linkArray = entries.filter(function (entry) {
                    return entry.initiatorType === 'link';
                });

                // 获取页面上似有的script标签，并筛选出没有成功加载的静态资源
                let scripts = [];
                let scriptObject = document.getElementsByName('script');
                for (let i = 0; i < scriptObject.length; i++) {
                    if (scriptObject[i].src) {
                        scripts.push(scriptObject[i].src);
                    }
                }
                let errorScripts = scripts.filter(function (script) {
                    let flag = true;
                    for (let i = 0; i < scriptArray.length; i++) {
                        if (scriptArray[i].name === script) {
                            flag = false;
                            break;
                        }
                    }
                    return flag;
                });

                // 获取所有的link标签
                let links = [];
                let linkObjects = document.getElementsByTagName('link');
                for (let i = 0; i < linkObjects.length; i++) {
                    if (linkObjects[i].href) {
                        links.push(linkObjects[i].href);
                    }
                }
                let errorLinks = links.filter(function (link) {
                    let flag = true;
                    for (let i = 0; i < linkArray.length; i++) {
                        if (linkArray[i].name === link) {
                            flag = false;
                            break;
                        }
                    }
                    return flag;
                });
                for (let m = 0; m < errorScripts.length; m++) {
                    let resourceLoadInfo = new ResourceLoadInfo(RESOURCE_LOAD, errorScripts[m], 'script', '0');
                    resourceLoadInfo.handleLogInfo(RESOURCE_LOAD, resourceLoadInfo);
                }
                for (let m = 0; m < errorLinks.length; m++) {
                    let resourceLoadInfo = new ResourceLoadInfo(RESOURCE_LOAD, errorLinks[m], 'link', '0');
                    resourceLoadInfo.handleLogInfo(RESOURCE_LOAD, resourceLoadInfo);
                }
            }
        },

        /**
         * 用户行为记录监控
         */
        recordBehavior: function (project) {
            // 行为记录开关
            if (project && project.record && project.record == 1) {
                // 记录行为前，检查一下url记录是否变化
                this.checkUrlChange();
                // 记录用户点击元素的行为数据
                document.onclick = function (e) {
                    let className = '';
                    let placeholder = '';
                    let inputValue = '';
                    let tagName = e.target.tagName;
                    let innerText = '';
                    if (e.target.tagName != 'svg' && e.target.tagName != 'use') {
                        className = e.target.className;
                        placeholder = e.target.placeholder || '';
                        inputValue = e.target.value || '';
                        innerText = e.target.innerText ? e.target.innerText.replace(/\s*/g, '') : '';
                        // 如果点击的内容过长，就截取上传
                        if (innerText.length > 200) innerText = innerText.substring(0, 100) + '... ...' + innerText.substring(innerText.length - 99, innerText = innerText.replace(/\s/g, ''));
                    }
                    let behaviorInfo = new BehaviorInfo(ELE_BEHAVIOR, 'click', className, placeholder, inputValue, tagName, innerText);
                    behaviorInfo.handleLogInfo(ELE_BEHAVIOR, behaviorInfo);
                };
            }
        },
        siftAndMakeUpMessage: function (infoType, origin_errorMsg, origin_url, origin_lineNumber, origin_columnNumber, origin_errorObj) {
            // 记录js错误前，检查一下url记录是否变化
            this.checkUrlChange();
            let errorMsg = origin_errorMsg ? origin_errorMsg : '';
            let errorObj = origin_errorObj ? origin_errorObj : '';
            let errorType = '';
            if (errorType) {
                if (typeof errorObj === 'string') {
                    errorType = errorObj.split(':')[0].replace('"', '');
                } else {
                    let errorStackStr = JSON.stringify(errorObj);
                    errorType = errorStackStr.split(':')[0].replace('"', '');
                }
            }
            let javaScriptErrorInfo = new JavaScriptErrorInfo(JS_ERROR, infoType, errorType + ':' + errorMsg, errorObj);
            javaScriptErrorInfo.handleLogInfo(JS_ERROR, javaScriptErrorInfo);
            let logInfo = localStorage['JS_ERROR'];
            logInfo.length > 0 && this.report(JSON.parse(logInfo), 'JS_ERROR');
        },
        /**
         * 用户访问记录监控
         */
        checkUrlChange: function () {
            // 如果是单页面应用，只更改url
            let webLocation = window.location.href.split('?')[0].replace('#', '');
            // 如果url变化了，就把更新的url记录为defaultLocation，重新设置pageKey
            if (this.defaultLocation != webLocation) {
                this.recordPV();
                this.defaultLocation = webLocation;
            }
        },
        /**
         * 页面JS错误监控
         */
        recordJavaScriptError: function () {
            // 重写console.error, 可以捕获更全面的报错信息
            let oldError = console.error;
            console.error = function (tempErrorMsg) {
                let errorMsg = (arguments[0] && arguments[0].message) || tempErrorMsg;
                let lineNumber = 0;
                let columnNumber = 0;
                let errorObj = arguments[0] && arguments[0].stack;
                if (!errorObj) {
                    this.siftAndMakeUpMessage('console_error', errorMsg, WEB_LOCATION, lineNumber, columnNumber, 'CustomizeError' + errorMsg);
                } else {
                    this.siftAndMakeUpMessage('console_error', errorMsg, WEB_LOCATION, lineNumber, columnNumber, errorObj);
                }
                return oldError.apply(console, arguments);
            }.bind(this);

            window.onerror = function (errorMsg, url, lineNumber, columnNumber, errorObj) {
                this.jsMonitorStarted = true;
                let errorStack = errorObj ? errorObj.stack : null;
                this.siftAndMakeUpMessage("on_error", errorMsg, url, lineNumber, columnNumber, errorStack);
            }.bind(this);
            window.onunhandledrejection = function (e) {
                let errorMsg = '';
                let errorStack = '';
                if (typeof e.reason === 'object') {
                    errorMsg = e.reason.message;
                    errorStack = e.reason.stack;
                } else {
                    errorMsg = e.reason;
                    errorStack = '';
                }
                this.siftAndMakeUpMessage("on_error", errorMsg, WEB_LOCATION, 0, 0, "UncaughtInPromiseError: " + errorStack);
            }.bind(this);
        },
        // 监听ajax的状态
        ajaxEventTrigger: function (event) {
            let ajaxEvent = new CustomEvent(event, {
                detail: this
            });
            window.dispatchEvent(ajaxEvent);
        },
        newXHR: function () {
            let oldXHR = window.XMLHttpRequest;
            let realXHR = new oldXHR();
            let that = this;
            realXHR.addEventListener('abort', function () {
                that.ajaxEventTrigger.call(this, 'ajaxAbort');
            }, false);
            realXHR.addEventListener('error', function () {
                that.ajaxEventTrigger.call(this, 'ajaxError');
            }, false);
            realXHR.addEventListener('load', function () {
                that.ajaxEventTrigger.call(this, 'ajaxLoad');
            }, false);
            realXHR.addEventListener('loadstart', function () {
                that.ajaxEventTrigger.call(this, 'ajaxLoadStart');
            }, false);
            realXHR.addEventListener('progress', function () {
                that.ajaxEventTrigger.call(this, 'ajaxProgress');
            }, false);
            realXHR.addEventListener('timeout', function () {
                that.ajaxEventTrigger.call(this, 'ajaxTimeout');
            }, false);
            realXHR.addEventListener('loadend', function () {
                that.ajaxEventTrigger.call(this, 'ajaxLoadEnd');
            }, false);
            realXHR.addEventListener('readystatechange', function () {
                that.ajaxEventTrigger.call(this, 'ajaxReadyStateChange');
            }, false);
            return realXHR;
        },
        /**
         * 页面接口请求监控
         */
        recordHttpLog: function () {
            let timeRecordArray = [];
            window.XMLHttpRequest = this.newXHR;
            window.addEventListener('ajaxLoadStart', function (e) {
                let tempObj = {
                    timeStamp: new Date().getTime(),
                    event: e
                };
                timeRecordArray.push(tempObj);
            });
            window.addEventListener('ajaxLoadEnd', function () {
                for (let i = 0; i < timeRecordArray.length; i++) {
                    if (timeRecordArray[i].event.detail.status > 0) {
                        let currentTime = new Date().getTime();
                        let url = timeRecordArray[i].event.detail.responseURL;
                        let status = timeRecordArray[i].event.detail.statusText;
                        let loadTime = currentTime - timeRecordArray[i].timeStamp;
                        // if (!url || (url && url.indexOf(HTTP_UPLOAD_LOG_API) != -1)) return;
                        if (!url || (url && url.indexOf(reportHost) != -1)) return;
                        let httpLogInfoStart = new HttpLogInfo(HTTP_LOG, url, status, statusText, '发起请求', timeRecordArray[i].timeStamp, 0);
                        httpLogInfoStart.handleLogInfo(HTTP_LOG, httpLogInfoStart);
                        let httpLogInfoEnd = new HttpLogInfo(HTTP_LOG, url, status, statusText, '请求返回', currentTime, loadTime);
                        httpLogInfoEnd.handleLogInfo(HTTP_LOG, httpLogInfoEnd);
                        // 当前请求成功后就在数组中移除掉
                        timeRecordArray.splice(i, 1);
                    }
                }
            });
        },
        /**
         * 上报函数
         * @param {*} info 上报信息
         * @param {*} strType 上报类型
         */
        report: function (info, strType) {
            // utils.ajax('POST', HTTP_UPLOAD_LOG_API + '/log/collect/uploadErrorLog', {
            ajax('POST', reportHost + '/log/collect/uploadErrorLog', {
                'appname': 'xddpc',
                'client_type': 'pc',
                'content_format': 'json',
            }, [{
                "context": JSON.stringify(info),
                "detail": info.detail,
                "errorType": strType === 'RESOURCE_LOAD' ? "network_exception" : 'syntax_error',
                "name": strType === 'RESOURCE_LOAD' ? "资源出错" : 'JS出错',
                "params": "",
                "status": "",
                "timestamp": parseTime((new Date()).getTime()),
                "userId": "11111111"
            }], function () {
                localStorage[strType] = '';
            }, function () {

            });
        },
        /**
         * 初始化
         */
        init: function (host) {
            reportHost = host || 'https://logCollect-api.cs.kemai.com.cn';
            if (!localStorage) {
                window.localStorage = new Object();
            }
            localStorage.kmUserInfo = '';

            // (function () {
            //     if (typeof window.CustomEvent === 'function') return false;

            //     function CustomEvent (event, params) {
            //         params = params || {};
            //         let evt = document.createEvent('CustomEvent');
            //         evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            //         return evt;
            //     }
            //     CustomEvent.prototype = window.event.prototype;
            //     window.CustomEvent = CustomEvent;
            // })();

            this.fetchHttpUrl = null;
            // 自动上传日志记录的定时器
            this.webMonitorUploadTimer = null;
            // 暂存本地用于保存日志信息的数据
            this.uploadMessageArray = null;
            // onerror 错误监控启动状态
            this.jsMonitorStarted = false;
            // 上传日志的开关，如果为false，则不再上传
            this.uploadRemoteServer = true;
            // 保存图片对应的描述，同一个描述只保存一次
            this.screenShotDescriptions = [];
            // 屏幕截图字符串
            this.tempScreenShot = '';
            // 获取当前url
            this.defaultLocation = window.location.href.split('?')[0].replace('#', '');
            // 页面加载对象属性
            this.timingObj = performance && performance.timing;
            // 获取页面加载的具体属性
            this.resourcesObj = (function () {
                if (performance && typeof performance.getEntries === 'function') {
                    return performance.getEntries();
                }
                return null;
            })();

            try {
                this.recordResourceError();
                // this.recordPV();
                // this.recordLoadPage();
                // this.recordBehavior({ record: 1 });
                this.recordJavaScriptError();
                // this.recordHttpLog();

                // let timeount = 0;
                // let typeList = [ELE_BEHAVIOR, JS_ERROR, HTTP_LOG, SCREEN_SHOT, CUSTOMER_PV, LOAD_PAGE, RESOURCE_LOAD, CUSTOMIZE_BEHAVIOR];
                // setInterval(() => {
                // this.checkUrlChange();
                // 进行一次上传
                // if (timeount >= 30) {
                // 如果是本地的localhost，就忽略，不进行上传
                // let logInfo = '';
                // for (let i = 0; i < typeList.length; i++) {
                //     logInfo += (localStorage[typeList[i]] || '');
                // }
                // logInfo.length > 0 && utils.ajax('POST', '/log/collect/uploadErrorLog', {
                //     'appname': 'xddpc',
                //     'client_type': 'pc',
                //     'content_format': 'json',
                // }, [{
                //     "context": '',
                //     "detail": logInfo,
                //     "errorType": "network_exception",
                //     "name": "资源出错",
                //     "params": "aaa",
                //     "status": "aaa",
                //     "timestamp": utils.parseTime((new Date()).getTime()),
                //     "userId": "aaa"
                // }], function () {
                //     for (let i = 0; i < typeList.length; i++) {
                //         localStorage[typeList[i]] = '';
                //     }
                // }, function () {

                // });
                //         timeount = 0;
                //     }
                //     timeount++;
                // }, 200);
            } catch (e) {
                console.error('监控代码异常，捕获', e);
            }
        }

    };

    return index;

}));
