# 商品视频分销平台

一个基于 Vue+Vite 开发的商品视频分销平台，响应式网站，vue-element-admin风格。连接商家与达人，实现商品视频内容的分发与变现。

## 项目简介

该平台允许商家上传商品和视频，达人可以下载并分享到 TikTok 进行分销获得佣金。

### 主要功能

1. **用户角色**
   - 支持注册、登录功能。注册时需要选择角色。
   - 新建mock数据，输入邮箱号123@qq.com，密码123456时，可以登录为达人角色。输入邮箱号456@qq.com，密码123456时，可以登录为商家角色。
   - 商家：发布商品和视频内容
   - 达人：下载视频并分享到 TikTok
   - 管理员：管理用户、商品、视频、订单等

2. **商家功能**
   - 发布商品（名称、主图、售价、链接）
   - 上传商品视频
   - 设置佣金比例
   - 提供授权协议
   - 查看订单管理
   - 查看达人分销数据

3. **达人功能**
   - TikTok 账号绑定
   - 浏览商品视频
   - 下载或一键分享视频
   - 查看订单记录和佣金

## 技术栈

- Vue 3
- TypeScript
- Vite
- Element Plus
- Vue Router
- Pinia
- Axios

## 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # 公共组件
├── layouts/         # 布局组件
│   ├── MainLayout.vue     # 主布局
│   └── DashboardLayout.vue# 后台布局
├── router/          # 路由配置
├── stores/          # Pinia 状态管理
│   ├── app.ts      # 应用状态
│   ├── auth.ts     # 认证状态
│   └── product.ts  # 商品状态
├── styles/          # 全局样式
├── views/           # 页面组件
│   ├── auth/       # 认证相关页面
│   ├── merchant/   # 商家后台页面
│   └── influencer/ # 达人后台页面
└── main.ts         # 应用入口
```

## 主要路由

- `/` - 首页
- `/login` - 登录页
- `/register` - 注册页
- `/merchant/`
  - `products` - 商品管理
  - `orders` - 订单管理
- `/influencer/`
  - `videos` - 视频浏览
  - `orders` - 订单记录
  - `tiktok` - TikTok绑定

## 开发说明

### 环境要求

- Node.js 16+
- npm 7+

### 安装依赖

```bash
npm install
```

### 开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 测试账号

- 邮箱：123@qq.com
- 密码：123456
- 角色：达人

## 项目特点

1. **响应式设计**
   - 适配多种设备屏幕
   - 流畅的用户体验

2. **模块化架构**
   - 清晰的代码组织
   - 可复用的组件设计

3. **安全性**
   - 用户认证
   - 角色权限控制

4. **可扩展性**
   - 支持更多平台集成
   - 灵活的业务逻辑扩展

## 开发规范

1. **代码风格**
   - 使用 TypeScript
   - 遵循 Vue 3 组合式 API
   - ESLint + Prettier 规范

2. **组件开发**
   - 单一职责原则
   - Props 类型声明
   - 事件命名规范

3. **状态管理**
   - Pinia 模块化
   - 合理的状态分割

4. **样式规范**
   - SCSS 预处理器
   - BEM 命名规范
   - 主题变量统一管理

## License

[MIT](LICENSE)