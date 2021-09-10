// var MonitorBaseInfo = require('./MonitorBaseInfo')
import MonitorBaseInfo from './MonitorBaseInfo'
import * as utils from '../utils'
var detector = require('detector')

class CustomerPV extends MonitorBaseInfo {
    constructor(uploadType, loadType, loadTime) {
        super();
        super.setCommonProperty();
        this.uploadType = uploadType;
        this.pageKey = utils.getPageKey();  //用于区分页面，所对应唯一的标识，每个新页面对应一个值
        this.deviceName = detector.device.name;
        this.os = detector.os.name + ' ' + detector.os.version;
        this.browserName = detector.browser.name;
        this.browserVersion = detector.browser.version;
        // TODO 位置信息, 待处理
        this.monitorIp = "";  // 用户的IP地址
        this.country = "china";  // 用户所在国家
        this.province = "";  // 用户所在省份
        this.city = "";  // 用户所在城市
        this.loadType = loadType;  // 用以区分首次加载
        this.loadTime = loadTime; // 加载时间
    }
}

export default CustomerPV;