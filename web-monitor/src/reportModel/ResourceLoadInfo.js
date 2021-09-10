// var MonitorBaseInfo = require('./MonitorBaseInfo')
import MonitorBaseInfo from './MonitorBaseInfo';
import * as utils from '../utils'

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

export default ResourceLoadInfo;