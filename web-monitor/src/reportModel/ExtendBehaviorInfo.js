// var MonitorBaseInfo = require('./MonitorBaseInfo')
import MonitorBaseInfo from './MonitorBaseInfo'

/**
 * 上传拓展日志信息的入口
 */
class ExtendBehaviorInfo extends MonitorBaseInfo {
    constructor(userId, behaviorType, behaviorResult, uploadType, description) {
        super();
        this.userId = userId;
        this.behaviorType = behaviorType;
        this.behaviorResult = behaviorResult;
        this.uploadType = uploadType;
        this.description = description;
        this.happenTime = new Date().getTime();
    }
}

module.exports = ExtendBehaviorInfo