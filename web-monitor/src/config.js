export const WEB_MONITOR_ID = 'km_webmonitor';

// 判断是http或是https的项目
export const WEB_HTTP_TYPE = window.location.href.indexOf('https') === -1 ? 'http://' : 'https://';

// 获取当前页面的URL
export const WEB_LOCATION = window.location.href;

// 本地IP，用于区分本地开发环境
export const WEB_LOCAL_IP = 'localhost';

// 监控平台地址
export const WEB_MONITOR_IP = '';

// 上传数据的uri, 区分了本地和生产环境
export const HTTP_UPLOAD_URI = WEB_LOCATION.indexOf(WEB_LOCAL_IP) === -1 ? WEB_HTTP_TYPE + WEB_MONITOR_IP : WEB_HTTP_TYPE + WEB_LOCAL_IP + ':8010';

// 上传数据的接口API
export const HTTP_UPLOAD_LOG_API = 'http://logCollect.platform.kemai.com.cn';
// export const HTTP_UPLOAD_LOG_API = 'http://192.168.239.104:9988';

// 上传数据时忽略的uri，需要过滤掉监控平台上传接口
export const WEB_MONITOR_IGNORE_URL = HTTP_UPLOAD_URI + '';

// 上传数据的接口
export const HTTP_UPLOAD_LOG_INFO = HTTP_UPLOAD_URI;

// 上传埋点数据接口
export const HTTP_PROJECT_INFO = HTTP_UPLOAD_URI + '';

// 用户访问日志类型
export const CUSTOMER_PV = 'CUSTOMER_PV';

// 用户加载页面信息类型
export const LOAD_PAGE = 'LOAD_PAGE';

// 接口日志类型
export const HTTP_LOG = 'HTTP_LOG';

// 接口错误日志类型
export const HTTP_ERROR = 'HTTP_ERROR';

// js报错日志类型
export const JS_ERROR = 'JS_ERROR';

// 截屏类型
export const SCREEN_SHOT = 'SCREEN_SHOT';

// 用户的行为类型
export const ELE_BEHAVIOR = 'ELE_BEHAVIOR';

// 静态资源类型
export const RESOURCE_LOAD = 'RESOURCE_LOAD';

// 用户自定义行为类型
export const CUSTOMIZE_BEHAVIOR = 'CUSTOMIZE_BEHAVIOR';

// 浏览器信息
export const BROWSER_INFO = window.navigator.userAgent;

// 监控代码空造函数
export const WebMonitor = {};

export const USER_INFO = localStorage.kmUserInfo ? JSON.parse(localStorage.kmUserInfo) : {};
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