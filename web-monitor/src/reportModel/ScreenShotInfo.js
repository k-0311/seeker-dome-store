// var MonitorBaseInfo = require('./MonitorBaseInfo')
import MonitorBaseInfo from './MonitorBaseInfo'
import * as utils from '../utils'

// JS错误截图，继承于日志基类MonitorBaseInfo
class HttpLogInfo extends MonitorBaseInfo {
    constructor(uploadType, des, screenInfo, imgType) {
        super();
        super.setCommonProperty();
        this.uploadType = uploadType;
        this.description = utils.b64EncodeUnicode(des);
        this.screenInfo = screenInfo;
        this.imgType = imgType || 'jpeg';
    }
}

export default HttpLogInfo