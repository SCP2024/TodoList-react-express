# TodoList

# 简介

TodoList 包含了较为完整的前端代码和后端代码。目前完成的技术栈是前端有 react，后端有 express+mongodb。

目前这个仓库是前端部分，基于 **Next，React** 技术栈实现的。

如果你想浏览完整的后端项目，可以访问 [后端 express](https://github.com/SCP2024/TodoList-react-express/tree/express)

### 规划

TodoList 系统前端实现了 **react** 版本，后端实现了 **express** 和 **mongodb** 版本。

目前实现了简易的**TodoList**以及基于**token**的登陆验证功能。设想中实现用户区分管理员和普通用户两种身份的功能，目前尚未实现，未来可能添加。

### 搭配后端启动

请访问 [[后端 express](https://github.com/SCP2024/TodoList-react-express/tree/express)]。它是对应的服务端代码，基于 **express、mongoodb** 技术栈实现的。关于后端项目如何启动，详情查看服务端的仓库介绍。

# 启动



1. 下载代码，终端进入该项目目录下

2. 下载依赖包，执行

   ```
   npm install
   ```

3. 若期望连接 nodejs 的本地服务，打开根目录下的 next.config.js 文件，确认以下代码不在注释中

   ```
   destination: `http://localhost:3005/api/:path*`,
   ```

4. 运行项目

   ```
   npm run dev
   ```

5. 访问 localhost:3000/login

6. 页面成功显示，则表示启动成功
