/**
 * 日志基类，用于其他日志的继承
 */
// const config = require('../config');
import { ELE_BEHAVIOR, JS_ERROR, HTTP_LOG, SCREEN_SHOT, CUSTOMER_PV, LOAD_PAGE, RESOURCE_LOAD, CUSTOMIZE_BEHAVIOR, WEB_MONITOR_ID } from '../config'
import * as utils from '../utils'
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

export default MonitorBaseInfo;