import './public-path';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import routes, { addRoutes } from './router';
import store from './store';

import loading from './components/loading';
import directive from './directive';
import './utils/monitor';

let router = null;
let instance = null;
let history = null;


function render (props = {}) {
  const { container, routerBase } = props;
  history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? routerBase : '/');
  router = createRouter({
    history,
    routes,
  });

  addRoutes(router, store.state.authCodes)//动态路由添加 (模拟测试，实际放到登录页)

  instance = createApp(App);
  instance.use(router);
  instance.use(store);
  instance.use(loading)
  instance.mount(container ? container.querySelector('#app') : '#app');
  directive(instance, router, store)
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap () {
  console.log('%c ', 'color: green;', 'vue3.0 app bootstraped');
}

function storeTest (props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true,
    );
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name,
      },
    });
}

export async function mount (props) {
  storeTest(props);
  render(props);
  instance.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange;
  instance.config.globalProperties.$setGlobalState = props.setGlobalState;
}

export async function unmount () {
  instance.unmount();
  instance._container.innerHTML = '';// 子项目内存泄露问题
  instance = null;
  router = null;
  history.destroy();
}