// Vue框架
import Vue from 'vue';

// 入口模版
import App from './App';

// 关闭生成模式日志提示
Vue.config.productionTip = false;

// 挂载Vue
new Vue(Object.assign(App, { mpType: 'app' })).$mount();
