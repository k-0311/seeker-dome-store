// var MonitorBaseInfo = require('./MonitorBaseInfo')
import MonitorBaseInfo from './MonitorBaseInfo'
import * as utils from '../utils'

class HttpLogInfo extends MonitorBaseInfo {
    constructor(uploadType, url, status, statusText, statusResult, currentTime, loadTime) {
        super();
        super.setCommonProperty();
        this.uploadType = uploadType;
        this.httpUrl = utils.b64EncodeUnicode(encodeURIComponent(url)); //请求地址
        this.status = status;   // 接口状态
        this.statusText = statusText;   // 状态描述
        this.statusResult = statusResult;   // 区分发起和返回状态
        this.happenTime = currentTime;  // 客户端发送时间
        this.loadTime = loadTime;   // 接口请求耗时
    }
}

export default HttpLogInfo