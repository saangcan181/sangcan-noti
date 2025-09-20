# SangCan Notification Monorepo

Monorepo với Node.js backend, React frontend và MySQL database cho hệ thống đăng nhập/đăng ký.

## 📁 Cấu trúc Project

```
sangcan-noti/
├── packages/
│   ├── backend/          # Node.js + Express API
│   ├── frontend/         # React + Vite application
│   └── shared/           # Shared types and utilities
├── docker/               # Docker configuration files
├── docker-compose.yml    # MySQL database setup
└── package.json          # Root workspace configuration
```

## 🚀 Tính năng

- ✅ **Backend**: Node.js + Express + TypeScript
  - Authentication với JWT
  - MySQL database integration
  - API validation với express-validator
  - Rate limiting và security headers
  
- ✅ **Frontend**: React + TypeScript + Vite
  - Authentication context
  - Protected routes
  - Login/Register forms
  - Homepage sau khi đăng nhập

- ✅ **Database**: MySQL 8.0
  - User management
  - Docker containerized

## 🛠️ Cài đặt và Chạy

### Yêu cầu hệ thống
- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker và Docker Compose

### 1. Cài đặt dependencies

```bash
# Cài đặt tất cả dependencies cho monorepo
npm install
```

### 2. Khởi động MySQL database

```bash
# Khởi động MySQL container
npm run db:up
```

### 3. Chạy development

```bash
# Chạy cả backend và frontend cùng lúc
npm run dev

# Hoặc chạy riêng lẻ:
npm run dev:backend   # Backend sẽ chạy trên port 5000
npm run dev:frontend  # Frontend sẽ chạy trên port 3000
```

### 4. Truy cập application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: localhost:3306

## 📋 Scripts có sẵn

```bash
# Development
npm run dev              # Chạy cả backend và frontend
npm run dev:backend      # Chỉ chạy backend
npm run dev:frontend     # Chỉ chạy frontend

# Build
npm run build            # Build tất cả packages
npm run build:backend    # Build backend
npm run build:frontend   # Build frontend

# Database
npm run db:up            # Khởi động MySQL
npm run db:down          # Dừng MySQL

# Production
npm start                # Chạy backend trong production mode
```

## 🔐 Authentication Flow

1. **Đăng ký**: Người dùng tạo tài khoản mới với email, tên và mật khẩu
2. **Đăng nhập**: Người dùng đăng nhập bằng email và mật khẩu
3. **JWT Token**: Server trả về JWT token khi đăng nhập thành công
4. **Protected Routes**: Frontend sử dụng token để truy cập các route được bảo vệ
5. **Homepage**: Sau khi đăng nhập thành công, chuyển hướng đến trang chủ

## 🔧 Cấu hình Environment

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=sangcan_noti
JWT_SECRET=your-super-secret-jwt-key
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🔒 Security Features

- Password hashing với bcryptjs
- JWT token authentication
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation và sanitization

## 🧪 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký tài khoản mới
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/profile` - Lấy thông tin user (protected)

### Health Check
- `GET /health` - Kiểm tra trạng thái server

## 📱 Frontend Routes

- `/login` - Trang đăng nhập
- `/register` - Trang đăng ký
- `/` - Homepage (protected route)

## 🔄 Development Workflow

1. Clone repository và cài đặt dependencies
2. Khởi động MySQL database với Docker
3. Chạy development mode
4. Truy cập frontend để test authentication flow

## 📝 Todo / Roadmap

- [ ] Thêm email verification
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Admin panel
- [ ] Real-time notifications
- [ ] Unit tests
- [ ] CI/CD pipeline

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License
