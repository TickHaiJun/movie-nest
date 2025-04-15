# Movie Backend API 文档

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