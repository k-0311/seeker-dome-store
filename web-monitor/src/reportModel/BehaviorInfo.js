// var MonitorBaseInfo = require('./MonitorBaseInfo')
import MonitorBaseInfo from './MonitorBaseInfo';
// var utils = require('../utils')
import * as utils from '../utils'

// 用户行为日志，继承于日志基类MonitorBaseInfo
class BehaviorInfo extends MonitorBaseInfo {
    constructor(uploadType, behaviorType, className, placeholder, inputValue, tagName, innerText) {
        super();
        super.setCommonProperty();
        this.uploadType = uploadType;
        this.behaviorType = behaviorType;
        this.className = utils.b64EncodeUnicode(className);
        this.placeholder = utils.b64EncodeUnicode(placeholder);
        this.inputValue = utils.b64EncodeUnicode(inputValue);
        this.tagName = tagName;
        this.innerText = utils.b64EncodeUnicode(encodeURIComponent(innerText));
    }
}

export default BehaviorInfo;