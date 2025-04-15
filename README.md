# 🎬 Movie & Event Management System

[![NestJS](https://img.shields.io/badge/NestJS-v10.0.0-red.svg?style=flat-square&logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.0.0-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v18.0.0-green.svg?style=flat-square&logo=node.js)](https://nodejs.org/)

[![Sequelize](https://img.shields.io/badge/Sequelize-v6.0.0-blue.svg?style=flat-square&logo=sequelize)](https://sequelize.org/)
[![JWT](https://img.shields.io/badge/JWT-Auth-yellow.svg?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)
[![Swagger](https://img.shields.io/badge/Swagger-API%20Docs-green.svg?style=flat-square&logo=swagger)](https://swagger.io/)

## 📋 项目简介

一个基于 NestJS 的电影和活动管理系统，提供完整的后端 API 支持。系统支持电影、戏剧、音乐会等多种活动的管理，包含用户认证、活动搜索、爬虫等功能。

## 🚀 技术栈

- **后端框架**: NestJS
- **编程语言**: TypeScript
- **数据库**: MySQL
- **ORM**: Sequelize
- **认证**: JWT
- **API 文档**: Swagger
- **爬虫**: Puppeteer

## 🛠 功能特性

- 用户认证与授权
- 活动管理（创建、更新、删除）
- 活动搜索（支持模糊查询和分页）
- 自动爬取活动数据
- RESTful API
- Swagger 文档支持

## 📦 项目结构

```
src/
├── auth/                # 认证模块
├── events/             # 活动模块
│   ├── dto/           # 数据传输对象
│   ├── entities/      # 数据库实体
│   └── services/      # 业务逻辑
├── users/              # 用户模块
└── main.ts            # 应用入口
```

## 🔐 认证系统

系统使用 JWT 进行身份验证，主要功能包括：

- 用户注册
- 用户登录
- JWT Token 生成与验证
- 角色基础权限控制

## 📊 数据库设计

### 用户表 (users)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 活动表 (events)
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  time TIMESTAMP NOT NULL,
  location VARCHAR(255) NOT NULL,
  background_image VARCHAR(255),
  price DECIMAL(10,2) NOT NULL,
  type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📡 API 接口

### 认证接口

- `POST /auth/register` - 用户注册
- `POST /auth/login` - 用户登录

### 活动接口

- `GET /events` - 获取所有活动
- `GET /events/search` - 搜索活动
  - 参数：
    - `title` (可选): 活动标题（模糊搜索）
    - `type` (可选): 活动类型（DRAMA/MOVIE/CONCERT/all）
    - `page` (可选): 页码，默认 1
    - `pageSize` (可选): 每页数量，默认 10
- `GET /events/:id` - 获取指定活动
- `POST /events` - 创建活动（需要认证）
- `PATCH /events/:id` - 更新活动（需要认证）
- `DELETE /events/:id` - 删除活动（需要认证）
- `GET /events/crawl` - 触发爬虫任务

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- PostgreSQL >= 14.0.0
- npm >= 8.0.0

### 安装

```bash
# 克隆项目
git clone [repository-url]

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env

# 修改 .env 文件中的配置
```

### 运行

```bash
# 开发模式
npm run start:dev

# 生产模式
npm run build
npm run start:prod
```

## 📚 API 文档

启动项目后，访问 `http://localhost:3000/api` 查看 Swagger API 文档。

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 开源协议

本项目采用 MIT 协议 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [NestJS](https://nestjs.com/)
- [Sequelize](https://sequelize.org/)
- [TypeScript](https://www.typescriptlang.org/)

## 基础信息
- 基础URL: `http://localhost:3000`
- 所有需要认证的接口都需要在请求头中携带 `Authorization: Bearer {token}`
- 所有响应数据格式统一为：
```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

## 认证模块 (Auth)

### 登录
- **URL**: `/auth/login`
- **Method**: `POST`
- **描述**: 用户登录接口
- **请求参数**:
```json
{
  "username": "string", // 用户名
  "password": "string"  // 密码
}
```
- **响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "access_token": "string" // JWT token
  }
}
```

## 用户模块 (Users)

### 注册用户
- **URL**: `/users`
- **Method**: `POST`
- **描述**: 创建新用户
- **请求参数**:
```json
{
  "username": "string",  // 用户名
  "password": "string",  // 密码
  "email": "string",     // 邮箱
  "nickname": "string"   // 昵称
}
```

### 获取所有用户
- **URL**: `/users`
- **Method**: `GET`
- **描述**: 获取所有用户列表
- **需要认证**: 是
- **请求参数**: 无

### 获取指定用户
- **URL**: `/users/:id`
- **Method**: `GET`
- **描述**: 获取指定ID的用户信息
- **需要认证**: 是
- **路径参数**: 
  - `id`: 用户ID

### 更新用户信息
- **URL**: `/users/:id`
- **Method**: `PATCH`
- **描述**: 更新指定用户信息
- **需要认证**: 是
- **路径参数**: 
  - `id`: 用户ID
- **请求参数**:
```json
{
  "email": "string",     // 可选，邮箱
  "nickname": "string",  // 可选，昵称
  "password": "string"   // 可选，密码
}
```

### 删除用户
- **URL**: `/users/:id`
- **Method**: `DELETE`
- **描述**: 删除指定用户
- **需要认证**: 是
- **路径参数**: 
  - `id`: 用户ID

## 活动模块 (Events)

### 创建活动
- **URL**: `/events`
- **Method**: `POST`
- **描述**: 创建新活动
- **需要认证**: 是
- **请求参数**:
```json
{
  "title": "string",           // 标题
  "time": "string",           // 时间，ISO格式
  "location": "string",       // 地点
  "backgroundImage": "string", // 可选，背景图片URL
  "price": "number",          // 价格
  "type": "string"           // 活动类型：DRAMA/MOVIE/CONCERT
}
```

### 获取所有活动
- **URL**: `/events`
- **Method**: `GET`
- **描述**: 获取所有活动列表
- **请求参数**: 无

### 获取指定活动
- **URL**: `/events/:id`
- **Method**: `GET`
- **描述**: 获取指定ID的活动信息
- **路径参数**: 
  - `id`: 活动ID

### 更新活动信息
- **URL**: `/events/:id`
- **Method**: `PATCH`
- **描述**: 更新指定活动信息
- **需要认证**: 是
- **路径参数**: 
  - `id`: 活动ID
- **请求参数**: 同创建活动，所有字段都是可选的

### 删除活动
- **URL**: `/events/:id`
- **Method**: `DELETE`
- **描述**: 删除指定活动
- **需要认证**: 是
- **路径参数**: 
  - `id`: 活动ID

## 订单模块 (Orders)

### 创建订单
- **URL**: `/orders`
- **Method**: `POST`
- **描述**: 创建新订单
- **需要认证**: 是
- **请求参数**:
```json
{
  "eventId": "string",        // 活动ID
  "paymentMethod": "string"   // 支付方式：WECHAT/ALIPAY/CREDIT_CARD
}
```

### 获取用户订单列表
- **URL**: `/orders`
- **Method**: `GET`
- **描述**: 获取当前用户的所有订单
- **需要认证**: 是

### 获取指定订单
- **URL**: `/orders/:id`
- **Method**: `GET`
- **描述**: 获取指定ID的订单信息
- **需要认证**: 是
- **路径参数**: 
  - `id`: 订单ID

### 更新订单状态
- **URL**: `/orders/:id`
- **Method**: `PATCH`
- **描述**: 更新指定订单状态
- **需要认证**: 是
- **路径参数**: 
  - `id`: 订单ID
- **请求参数**:
```json
{
  "status": "string"  // 订单状态：PENDING/PAID/CANCELLED/COMPLETED
}
```

### 删除订单
- **URL**: `/orders/:id`
- **Method**: `DELETE`
- **描述**: 删除指定订单
- **需要认证**: 是
- **路径参数**: 
  - `id`: 订单ID

## 状态码说明

- 200: 请求成功
- 201: 创建成功
- 400: 请求参数错误
- 401: 未认证或认证失败
- 403: 权限不足
- 404: 资源不存在
- 500: 服务器内部错误

## 注意事项

1. 所有需要认证的接口都需要在请求头中携带 token：
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

2. 日期时间格式使用 ISO 8601 标准：
```
YYYY-MM-DDTHH:mm:ss.sssZ
```

3. 所有ID字段都使用UUID格式 