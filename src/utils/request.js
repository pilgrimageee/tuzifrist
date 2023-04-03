// 引入请求vuex路由
import axios from "axios";
import store from "@/store";
import router from "@/router";

// 导出基准地址 , 因为有些地方不是通过axios发起请求也要用地址
export const baseURL = "http://pcapi-xiaotuxian-front-devtest.itheima.net/";

// 创建一个axios实例
const instance = axios.create({
  // axios的一些配置 , basrURL , timeout
  baseURL,
  // 5秒钟
  timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 拦截的逻辑 进行请求配置的修改 如果本地有token就在头部携带
    // 获取vuex中user用户信息对象 要使用user信息对象中的token //vuex的持久化插件
    const profile = store.state.user.profile;
    // 判断用户信息对象中的token
    if (profile.token) {
      config.headers.Authorization = `Breaer ${profile.token}`;
    }
    return config;
  },
  (error) => {
    // 返回错误
    return Promise.reject(error);
  }
);
// 响应拦截器
instance.interceptors.response.use(
  // 发起请求接口返回数据时去掉一层date  剥离无效数据
  (res) => res.data,
  (error) => {
    // 当请求报错时进入这个函数 , 401状态码时
    if (error.response && error.response.status === 401) {
      // 1. 清空用户无效信息(,{传一个空对象}) 2. 跳转到登录页 3. 跳转需要传参(当前路由地址)到登录页
      store.commit("user/setUser", {});
      // 组件中$route.path获取不带参数 $route.fullPath获取完整路径
      // js模块中router.currentRoute.value.fullPath是当前路径地址 vue3中router.currentRoute是ref响应式数据加value
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath);
      // encodeURIComponent()转为uri编码带%的 , 传参防止解析地址出问题

      // redirectUrl跳转传的参数 要回跳的地址 = fullPath当前地址
      router.push("/login?redirectUrl=" + fullPath);
    }

    return Promise.reject(error);
  }
);

// 导出发请求的 请求工具函数
export default (url, method, submitDate) => {
  return instance({
    url,
    method,
    // []设置一个动态的key , 可以写js表达式 , js表达式的执行结果当作key toLowerCase()转换为小写
    // ['params']:submitData ===== params:submitData 这样理解
    [method.toLowerCase() === "get" ? "params" : "data"]: submitDate,
  });
};
