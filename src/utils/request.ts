import { message as AntdMessage } from "antd"; // 从 Ant Design 导入消息组件
import axios, { AxiosInstance, AxiosRequestConfig } from "axios"; // 导入 axios 及相关类型
import Router from "next/router"; // 导入 Next.js 的路由对象

// 定义扩展 AxiosInstance 的接口，包含常见 HTTP 方法的类型定义
interface AxiosInstanceType extends AxiosInstance {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
}

// 创建 Axios 实例的工厂函数
export const CreateAxiosInstance = (
  config?: AxiosRequestConfig // 可选的 Axios 配置
): AxiosInstanceType => {
  // 创建 Axios 实例
  const instance = axios.create({
    timeout: 5000, // 请求超时时间为 5000 毫秒
    ...config, // 合并传入的配置
  });

  // 请求拦截器
  instance.interceptors.request.use(
    function (config) {
      // 在请求发出之前，附加认证令牌到请求头
      const userStorage = localStorage.getItem("user"); // 从 localStorage 获取用户信息
      const token = userStorage ? JSON.parse(userStorage).token : ""; // 解析并提取 token
      config.headers["Authorization"] = `Bearer ` + token; // 设置 Authorization 头部
      return config; // 返回配置对象
    },
    function (error) {
      return Promise.reject(error); // 请求错误时返回 Promise.reject
    }
  );

  // 响应拦截器
  instance.interceptors.response.use(
    function (response) {
      // 响应成功的处理逻辑
      const { status, data, message } = response as any; // 提取响应状态、数据和消息
      if (status === 200) {
        // 状态码为 200 表示请求成功
        return data; // 返回数据
      } else if (status === 401) {
        // 状态码为 401 表示未授权或未登录
        Router.push("/login"); // 重定向到登录页面
        return Promise.reject("Unauthorized"); // 返回拒绝的 Promise
      } else {
        // 其他错误状态
        AntdMessage.error(message || "服务端异常"); // 显示错误消息
        return Promise.reject("Server error"); // 返回拒绝的 Promise
      }
    },
    function (error) {
      // 响应错误的处理逻辑
      if (error.response && error.response.status === 401) {
        // 响应状态码为 401 时，重定向到登录页面
        Router.push("/login");
      }
      // 显示错误消息
      AntdMessage.error(error?.response?.data?.message || "服务端异常");
      return Promise.reject(error); // 返回拒绝的 Promise
    }
  );

  return instance; // 返回配置好的 Axios 实例
};

export default CreateAxiosInstance({}); // 导出创建的 Axios 实例
