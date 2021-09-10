import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue
import 'echarts'
Vue.component('v-chart', ECharts)

import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

import './monitor';
import '@/assets/variable.scss';

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
