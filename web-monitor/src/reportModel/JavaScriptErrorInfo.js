// var MonitorBaseInfo = require('./MonitorBaseInfo')
import MonitorBaseInfo from './MonitorBaseInfo';
import * as utils from '../utils'
var detector = require('detector')

class JavaScriptErrorInfo extends MonitorBaseInfo {
    constructor(uploadType, infoType, errorMsg, errorStack) {
        super();
        super.setCommonProperty();
        this.uploadType = uploadType;
        this.infoType = infoType;
        this.pageKey = utils.getPageKey();  //用于区分页面，所对应唯一的标识，每个新页面对应一个值
        this.deviceName = detector.device.name;
        this.os = detector.os.name + ' ' + detector.os.version;
        this.browserName = detector.browser.name;
        this.browserVersion = detector.browser.version;
        this.monitorIp = "";  // 用户的IP地址
        this.country = "china";  // 用户所在国家
        this.province = "";  // 用户所在省份
        this.city = "";  // 用户所在城市
        // this.errorMessage = utils.b64EncodeUnicode(errorMsg)
        this.detail = errorMsg
        // this.errorStack = utils.b64EncodeUnicode(errorStack)
    }
}

export default JavaScriptErrorInfo;