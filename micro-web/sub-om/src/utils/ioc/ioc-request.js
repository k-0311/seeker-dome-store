import axios from 'axios';
// 请求方法的定义
class AxiosRequest {
  constructor(method, url, params, headers) {
    this.url = url;
    this.method = method;
    this.params = params || {};
    this.headers = headers || {};
  }
}

// 请求参数的拦截器
class AxiosRequestInterceptor {
  constructor(callback) {
    this.callback = callback;
  }

  onRequest (request) {
    if (this.callback) {
      return this.callback(request);
    }
    return request;
  }
}

// 响应结果的拦截器
class AxiosResponseInterceptor {
  constructor(callback) {
    this.callback = callback;
  }

  onResponse (response) {
    if (this.callback) {
      return this.callback(response);
    }
    return response;
  }
}
// Axios 的实现类
class Axios {
  constructor() {
    this.interceptors = {
      request: new AxiosRequestInterceptor(),
      response: new AxiosResponseInterceptor(),
    };
  }
  // 注册请求参数拦截器
  useRequestInterceptor (callback) {
    this.interceptors.request = new AxiosRequestInterceptor(callback);
  }
  // 注册响应结果拦截器
  useResponseInterceptor (callback) {
    this.interceptors.response = new AxiosResponseInterceptor(callback);
  }
  // 发送请求
  async send (request) {
    request = this.interceptors.request.onRequest(request);
    const response = await axios({
      method: request.method,
      url: request.url,
      params: request.params,
      headers: request.headers,
    });
    return this.interceptors.response.onResponse(response);
  }
  // GET 请求方法
  async get (url, params, headers) {
    const request = new AxiosRequest("GET", url, params, headers);
    return this.send(request);
  }
  // POST 请求方法
  async post (url, params, headers) {
    const request = new AxiosRequest("POST", url, params, headers);
    return this.send(request);
  }
}

// IOC 容器
class IOCContainer {
  constructor() {
    this.dependencies = {};
  }

  // 注册依赖
  register (name, dependencies, implementation) {
    this.dependencies[name] = {
      dependencies: dependencies,
      implementation: implementation,
    };
  }

  // 获取实例
  get (name) {
    const dependency = this.dependencies[name];
    const dependencies = dependency.dependencies.map((dependency) =>
      this.get(dependency)
    );
    return dependency.implementation(...dependencies);
  }
}

// 使用 IOC 容器创建 Axios 实例
const iocContainer = new IOCContainer();
iocContainer.register("axios", [], () => new Axios());



// 获取 Axios 实例
const request = iocContainer.get("axios");

request.useRequestInterceptor(request => {
  // 在请求发送前对请求参数进行修改
  return request;
});

request.useResponseInterceptor(response => {
  // 在响应结果返回前对响应结果进行修改
  return response;
});

