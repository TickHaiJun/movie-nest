# 🎬 Movie & Event Management System

[![NestJS](https://img.shields.io/badge/NestJS-v10.0.0-red.svg?style=flat-square&logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.0.0-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v18.0.0-green.svg?style=flat-square&logo=node.js)](https://nodejs.org/)

[![Sequelize](https://img.shields.io/badge/Sequelize-v6.0.0-blue.svg?style=flat-square&logo=sequelize)](https://sequelize.org/)
[![JWT](https://img.shields.io/badge/JWT-Auth-yellow.svg?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)
[![Swagger](https://img.shields.io/badge/Swagger-API%20Docs-green.svg?style=flat-square&logo=swagger)](https://swagger.io/)

## 📋 项目简介

一个基于 NestJS 的电影和活动管理系统，提供完整的后端 API 支持。系统支持电影、戏剧、音乐会等多种活动的管理，包含用户认证、活动搜索、爬虫等功能。

## 完善的接口文档 + 参数校验 + 数据库表
![localhost_3000_api](https://github.com/user-attachments/assets/95f810ef-f2ce-43f1-967f-b3234223b6e0)



![image](https://github.com/user-attachments/assets/4da15327-f857-480b-9537-880f3d986458)


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

## 欢迎联系我
![image](https://github.com/user-attachments/assets/caf8ae0d-7f4f-47d1-aad9-2833cb2f0bc4)



<img src="https://github.com/user-attachments/assets/4af0d159-cb10-40b3-a904-cc60da54f3ad" width="200" > 
