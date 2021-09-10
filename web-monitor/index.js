import JavaScriptErrorInfo from './src/reportModel/JavaScriptErrorInfo';
import ResourceLoadInfo from './src/reportModel/ResourceLoadInfo';
import CustomerPV from './src/reportModel/CustomerPV';
import LoadPageInfo from './src/reportModel/LoadPageInfo';
import BehaviorInfo from './src/reportModel/BehaviorInfo';
import HttpLogInfo from './src/reportModel/HttpLogInfo';
import { RESOURCE_LOAD, CUSTOMER_PV, LOAD_PAGE, ELE_BEHAVIOR, JS_ERROR, HTTP_LOG, HTTP_UPLOAD_LOG_API, SCREEN_SHOT, CUSTOMIZE_BEHAVIOR, HTTP_UPLOAD_LOG_INFO, WEB_LOCATION, } from './src/config';
import * as utils from './src/utils'

export default {
    recordResourceError: function () {
        // 当浏览器不支持window.performance.getEntries的时候，用下边这种方式
        window.addEventListener('error', function (e) {
            if (e.message && e.message === 'ResizeObserver loop limit exceeded') return;
            let typeName = e.target.localName;
            let sourceUrl = '';
            if (typeName === 'link') {
                sourceUrl = e.target.href;
            } else {
                sourceUrl = e.target.src;
            }
            let resourceLoadInfo = new ResourceLoadInfo(RESOURCE_LOAD, sourceUrl, typeName, '0');
            resourceLoadInfo.handleLogInfo(RESOURCE_LOAD, resourceLoadInfo);
            let logInfo = localStorage['RESOURCE_LOAD']
            logInfo.length > 0 && this.report(JSON.parse(logInfo), 'RESOURCE_LOAD');
        }.bind(this), true);
    },
    /**
    * 用户访问记录监控
    */
    recordPV: function () {
        utils.setPageKey();
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
        utils.addLoadEvent(function () {
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
            })
            let linkArray = entries.filter(function (entry) {
                return entry.initiatorType === 'link';
            })

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
        let logInfo = localStorage['JS_ERROR']
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
            if (errorMsg === 'ResizeObserver loop limit exceeded') return;
            this.jsMonitorStarted = true;
            let errorStack = errorObj ? errorObj.stack : null;
            this.siftAndMakeUpMessage("on_error", errorMsg, url, lineNumber, columnNumber, errorStack);
        }.bind(this)
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
            timeRecordArray.push(tempObj)
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
        var _self = this;
        // utils.ajax('POST', HTTP_UPLOAD_LOG_API + '/log/collect/uploadErrorLog', {
        utils.ajax('POST', _self.getReportHost() + '/log/collect/uploadErrorLog', {
            'appname': _self.getReportAppName() || 'xddpc',
            'client_type': _self.getReportClientType() || 'pc',
            'content_format': 'json',
        }, [{
            "context": JSON.stringify(info),
            "detail": info.detail,
            "errorType": strType === 'RESOURCE_LOAD' ? "network_exception" : 'syntax_error',
            "name": strType === 'RESOURCE_LOAD' ? "资源出错" : 'JS出错',
            "params": "",
            "status": "",
            "timestamp": utils.parseTime((new Date()).getTime()),
            "userId": "11111111"
        }], function () {
            localStorage[strType] = '';
        }, function () {

        });
    },
    setReportHost (host) {
        this.reportHost = host;
    },
    getReportHost () {
        return this.reportHost;
    },
    setReportAppName (appName) {
        this.reportAppName = appName;
    },
    getReportAppName () {
        return this.reportAppName;
    },
    setReportClientType (clientType) {
        this.reportClientType = clientType;
    },
    getReportClientType () {
        return this.reportClientType;
    },
    reportHost: '',
    reportAppName: '',
    reportClientType: '',
    /**
     * 初始化
     */
    init: function ({ host = 'https://logCollect-api.cs.kemai.com.cn', appAame = 'xddpc', clientType = 'pc' }) {
        this.setReportHost(host)
        this.setReportAppName(appAame)
        this.setReportClientType(clientType)
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

}