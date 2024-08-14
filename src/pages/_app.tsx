import { Layout } from "@/components/Layout";  // 导入自定义布局组件
import "@/styles/globals.css";  // 导入全局样式
import "antd/dist/reset.css";  // 导入 Ant Design 的重置样式
import type { AppProps } from "next/app";  // 导入 Next.js 中 AppProps 类型定义
import { useRouter } from "next/router";  // 导入 Next.js 的路由钩子，用于访问路由信息
import { useEffect, useState } from "react";  // 导入 React 的 hooks，用于管理组件状态和副作用

export default function App({ Component, pageProps }: AppProps) {  
  const router = useRouter();  // 获取路由对象，提供路由信息和导航功能
  const [loading, setLoading] = useState(true);  // 定义加载状态的状态变量，初始值为 true 表示加载中

  // 判断当前路由是否是登录或注册页面
  const isAuthPage = router.pathname === '/login' || router.pathname === '/register';

  useEffect(() => {
    // 定义一个异步函数，用于在应用加载时检查路由并执行可能的重定向
    async function checkAuth() {
      if (router.pathname === '/') {  // 如果当前路径是根路径（/）
        await router.push('/login');  // 重定向到登录页面
      }
      setLoading(false);  // 跳转完成后，设置加载状态为 false，允许页面正常渲染
    }

    checkAuth();  // 在组件挂载时调用函数以执行重定向逻辑
  }, [router.pathname]);  // 依赖项为路由路径，当路径发生变化时，副作用重新执行

  // 如果当前处于加载状态，渲染 null（即不渲染任何内容）
  if (loading) {
    return null; 
  }

  // 如果是认证页面（登录或注册页面），直接渲染对应的组件
  return isAuthPage ? (
    <Component {...pageProps} />
  ) : (
    // 如果不是认证页面，则使用 Layout 包裹组件，以提供全局布局
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
