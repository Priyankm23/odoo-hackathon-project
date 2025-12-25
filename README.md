<div align="center">

# 👕 ReWear – Community Clothing Exchange

### *Swap. Share. Sustain. Fashion for a Better Tomorrow* 🌱

[![Made with React](https://img.shields.io/badge/React-18.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**A sustainable fashion platform enabling users to exchange unused clothing through direct swaps or a points-based system — reducing textile waste and promoting circular fashion.**

[Features](#-key-features) • [Quick Start](#-quick-start) • [Docker Setup](#-docker-deployment) • [API Documentation](#-api-endpoints) • [Contributing](#-contributing)

---

</div>

## 🚀 Overview

**ReWear** is a community-powered clothing exchange platform built for the **ODDO Hackathon** by Team **Code-Query-Commit**. Our mission is to combat fast fashion's environmental impact by creating a circular economy for clothing.

### 🌍 Why ReWear?

- **2.5M kg CO₂** potentially saved through reuse
- **10,000+** sustainable fashion enthusiasts
- **Zero waste** clothing exchange system
- **Community-driven** sustainable marketplace

Users can list pre-loved garments, browse community offerings, and exchange items either through:
- 🔄 **Direct Swaps** — Match with other users for item exchanges
- ⭐ **Points System** — Earn points from swaps, redeem for items you love

---

## 👥 Team: Code-Query-Commit

<table>
  <tr>
    <td align="center">
      <strong>Priyank Moradiya</strong><br>
      <a href="mailto:priyankmoradia34@gmail.com">📧 Email</a>
    </td>
    <td align="center">
      <strong>Utsav Bhalani</strong><br>
      <a href="mailto:utsavbhalani07@gmail.com">📧 Email</a>
    </td>
    <td align="center">
      <strong>Yajush Gorasiya</strong><br>
      <a href="mailto:ysgorasiya510@gmail.com">📧 Email</a>
    </td>
    <td align="center">
      <strong>Priyanshi</strong><br>
      <a href="mailto:priyanshiben35@gmail.com">📧 Email</a>
    </td>
  </tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)

### Infrastructure & Tools
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-Proxy-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

</div>

---

## 🌟 Key Features

### 🔐 User Authentication & Authorization
- ✅ **Email/Password** registration and secure login
- ✅ **Google OAuth 2.0** for quick access
- ✅ **JWT-based** session management with httpOnly cookies
- ✅ **Role-based access** control (User/Admin)

### 🏠 Modern Landing Page
- ✅ Animated hero section with live background effects
- ✅ Three-step process showcase
- ✅ Featured items carousel
- ✅ Impact statistics and sustainability metrics
- ✅ Fully responsive design

### 👤 User Dashboard
- ✅ **Profile Overview** with points balance
- ✅ **My Items** management with status tracking
- ✅ **Swap Activity** monitoring (sent/received requests)
- ✅ **Redemption History** with point tracking
- ✅ Real-time status updates

### 📦 Item Management
- ✅ **Browse Items** with advanced filtering (category, size, condition)
- ✅ **Item Details** page with image gallery
- ✅ **Multi-image upload** via Cloudinary
- ✅ **Rich metadata** (title, description, category, size, condition, tags)
- ✅ **Status tracking** (available, swapped, redeemed)

### 🔄 Swap System
- ✅ **Direct swap requests** between users
- ✅ **Points-based redemption** system
- ✅ **Accept/Reject** swap requests
- ✅ **Automatic point calculation** on successful swaps
- ✅ **Swap history** and tracking

### 🛡️ Admin Panel
- ✅ **Item moderation** (approve/reject submissions)
- ✅ **User management** and activity monitoring
- ✅ **Platform statistics** dashboard
- ✅ **Content moderation** tools
- ✅ **Admin logs** for audit trail

---

## ⚡ Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (Local or Atlas) - [Download](https://www.mongodb.com/)
- **Docker & Docker Compose** (for containerized deployment) - [Download](https://www.docker.com/)

### 🔧 Environment Configuration

#### Backend Environment Variables

Create a `.env` file in the `hackathon-backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/rewear
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/rewear

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email Service (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Upstash Redis (Optional - for rate limiting)
UPSTASH_REDIS_URL=your-upstash-redis-url
UPSTASH_REDIS_TOKEN=your-upstash-token

# CORS Origins
CORS_ORIGIN=http://localhost:3000

# Admin Credentials
ADMIN_EMAIL=admin@rewear.com
ADMIN_PASSWORD=admin123
```

#### Frontend Environment Variables

Create a `.env` file in the `hackathon-frontend` directory:

```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=ReWear
```

---

## 🐳 Docker Deployment

### Why Docker?

Docker provides a consistent, isolated environment for running the application, making deployment and development easier across different systems.

### Docker Architecture

```
┌─────────────────────────────────────────────┐
│           Docker Compose                    │
│                                             │
│  ┌──────────────┐      ┌──────────────┐   │
│  │   Frontend   │      │   Backend    │   │
│  │   (Nginx)    │─────▶│  (Node.js)   │   │
│  │   Port: 80   │      │  Port: 5000  │   │
│  └──────────────┘      └──────────────┘   │
│         │                      │            │
│         └──────────┬───────────┘            │
│                    ▼                        │
│              app-network                    │
└─────────────────────────────────────────────┘
```

### 🚀 One-Command Deployment

```bash
# Clone the repository
git clone <repository-url>
cd odoo-project

# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### 📦 Docker Services

#### Frontend Service
- **Image**: Node 18 Alpine + Nginx Alpine
- **Port**: `3000:80`
- **Features**:
  - Multi-stage build (build + serve)
  - Optimized production build
  - Nginx reverse proxy
  - Static file serving

#### Backend Service
- **Image**: Node 18 Alpine
- **Port**: `5000:5000`
- **Features**:
  - RESTful API server
  - MongoDB connection
  - JWT authentication
  - File upload handling

### 🔨 Docker Commands Cheat Sheet

```bash
# Build images without cache
docker-compose build --no-cache

# Start services in detached mode
docker-compose up -d

# View running containers
docker-compose ps

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Restart a service
docker-compose restart backend

# Stop and remove containers, networks
docker-compose down

# Stop and remove containers, networks, and volumes
docker-compose down -v

# Execute command in running container
docker-compose exec backend sh
docker-compose exec frontend sh

# Scale a service (if needed)
docker-compose up -d --scale backend=3
```

### 🏗️ Docker Configuration Details

#### docker-compose.yml Explained

```yaml
version: '3.8'

services:
  # Backend Service
  backend:
    build:
      context: ./hackathon-backend    # Build context
      dockerfile: Dockerfile           # Dockerfile location
    container_name: hackathon-backend
    ports:
      - "5000:5000"                    # Host:Container port mapping
    env_file:
      - ./hackathon-backend/.env       # Load environment variables
    networks:
      - app-network                    # Connect to app network
    restart: unless-stopped            # Auto-restart policy

  # Frontend Service
  frontend:
    build:
      context: ./hackathon-frontend
      dockerfile: Dockerfile
    container_name: hackathon-frontend
    ports:
      - "3000:80"                      # Nginx serves on port 80
    depends_on:
      - backend                        # Wait for backend to start
    networks:
      - app-network
    restart: unless-stopped

networks:
  app-network:
    driver: bridge                     # Bridge network for inter-container communication
```

### 🔍 Nginx Configuration

The frontend uses Nginx to serve the React build. Configuration in [nginx.conf](hackathon-frontend/nginx.conf):

```nginx
server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # React Router support - redirect all requests to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 💻 Local Development Setup

### Without Docker

#### Backend Setup

```bash
# Navigate to backend directory
cd hackathon-backend

# Install dependencies
npm install

# Create .env file (see Environment Configuration above)
cp .env.example .env

# Start development server
npm start
# or with nodemon for auto-restart
npm run dev

# Backend will run on http://localhost:5000
```

#### Frontend Setup

```bash
# Navigate to frontend directory
cd hackathon-frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev

# Frontend will run on http://localhost:5173 (Vite default)
```

### Development URLs

- **Frontend**: http://localhost:5173 (Vite dev server)
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api-docs (if Swagger is configured)

---

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register new user | ❌ |
| POST | `/api/v1/auth/login` | Login user | ❌ |
| POST | `/api/v1/auth/logout` | Logout user | ✅ |
| GET | `/api/v1/auth/me` | Get current user | ✅ |

### Item Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/items` | Get all items | ❌ |
| GET | `/api/v1/items/:id` | Get item by ID | ❌ |
| POST | `/api/v1/items` | Create new item | ✅ |
| PUT | `/api/v1/items/:id` | Update item | ✅ (Owner) |
| DELETE | `/api/v1/items/:id` | Delete item | ✅ (Owner/Admin) |
| GET | `/api/v1/items/user/my-items` | Get user's items | ✅ |

### Swap Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/swaps` | Create swap request | ✅ |
| GET | `/api/v1/swaps/user/my-swaps` | Get user's swaps | ✅ |
| PATCH | `/api/v1/swaps/:id/status` | Update swap status | ✅ |
| DELETE | `/api/v1/swaps/:id` | Cancel swap request | ✅ |

### Redemption Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/redeem` | Redeem item with points | ✅ |
| GET | `/api/v1/redeem/user/my-redeems` | Get redemption history | ✅ |

### Dashboard Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/dashboard/stats` | Get user statistics | ✅ |

### Admin Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/admin/dashboard` | Get admin statistics | ✅ (Admin) |
| GET | `/api/v1/admin/items/pending` | Get pending items | ✅ (Admin) |
| PATCH | `/api/v1/admin/items/:id/approve` | Approve item | ✅ (Admin) |
| DELETE | `/api/v1/admin/items/:id` | Delete item | ✅ (Admin) |

---

## 🧪 Testing

```bash
# Run backend tests
cd hackathon-backend
npm test

# Run frontend tests
cd hackathon-frontend
npm test

# Run with coverage
npm test -- --coverage
```

---

## 🚀 Production Deployment

### Using Docker in Production

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Start production services
docker-compose -f docker-compose.prod.yml up -d

# View production logs
docker-compose -f docker-compose.prod.yml logs -f
```

### Deployment Checklist

- [ ] Set `NODE_ENV=production` in backend .env
- [ ] Update MongoDB URI to production database
- [ ] Configure production CORS origins
- [ ] Set secure JWT secret (minimum 32 characters)
- [ ] Configure Cloudinary for production
- [ ] Set up SSL/TLS certificates
- [ ] Configure domain names in Nginx
- [ ] Enable security headers
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy

---

## 🔒 Security Best Practices

- ✅ **JWT tokens** stored in httpOnly cookies
- ✅ **CORS** configured for specific origins
- ✅ **Password hashing** using bcrypt
- ✅ **Input validation** on all endpoints
- ✅ **Rate limiting** on authentication routes
- ✅ **File upload restrictions** (size, type)
- ✅ **SQL injection** prevention via Mongoose
- ✅ **XSS protection** via React's default escaping

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Coding Standards

- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please create an issue on GitHub:

- [Report a Bug](https://github.com/your-repo/issues/new?labels=bug)
- [Request a Feature](https://github.com/your-repo/issues/new?labels=enhancement)

---

## 📧 Contact & Support

For questions or support, reach out to the team:

- **Email**: priyankmoradia34@gmail.com
- **GitHub Issues**: [Project Issues](https://github.com/your-repo/issues)

---

## 🙏 Acknowledgments

- ODDO Hackathon organizers for the opportunity
- MongoDB Atlas for database hosting
- Cloudinary for image management
- All contributors and testers

---

<div align="center">

### ⭐ If you find this project useful, please consider giving it a star!

**Made with 💚 by Team Code-Query-Commit**

*Swap. Share. Sustain. Fashion for a Better Tomorrow.* 🌱

</div>
