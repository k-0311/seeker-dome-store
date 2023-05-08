import axios from 'axios';
function createAxiosInstance () {
  const instance = axios.create({
    headers: {
      'content-type': 'application/json;charset=UTF-8'
    },
    timeout: 20000
  })

  // 添加拦截器
  instance.interceptors.request.use(
    config => {
      // 处理请求拦截器
      return config;
    },
    error => {
      // 处理请求错误
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    response => {
      // 处理响应拦截器
      return response;
    },
    error => {
      // 处理响应错误
      return Promise.reject(error);
    }
  );

  return instance;
}

const IoC = {
  instances: {},
  interceptors: {
    request: [],
    response: []
  },
  registerInstance (name, instance) {
    this.instances[name] = instance;
  },
  getInstance (name) {
    return this.instances[name];
  },
  registerInterceptor (type, interceptor) {
    this.interceptors[type].push(interceptor);
  },
  getInterceptors (type) {
    return this.interceptors[type];
  }
};

class AxiosProvider {
  constructor(name) {
    this.name = name;
  }

  provide () {
    const instance = createAxiosInstance();
    const requestInterceptors = IoC.getInterceptors('request');
    const responseInterceptors = IoC.getInterceptors('response');

    requestInterceptors.forEach(interceptor => {
      instance.interceptors.request.use(interceptor);
    });

    responseInterceptors.forEach(interceptor => {
      instance.interceptors.response.use(interceptor);
    });

    IoC.registerInstance(this.name, instance);

    return instance;
  }
}

// 注册拦截器
IoC.registerInterceptor('request', config => {
  // 处理请求拦截器
  return config;
});

IoC.registerInterceptor('response', response => {
  // 处理响应拦截器
  return response;
});

// 提供axios实例
const axiosProvider = new AxiosProvider('default');
const axiosInstance = axiosProvider.provide();


export default axiosInstance
