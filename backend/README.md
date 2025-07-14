





# 👤 User Authentication API Documentation

## 🔐 Authentication Endpoints

| No. | Title                | Method | Base URL               | Route                          | Protected By        | Description                          |
|-----|----------------------|--------|------------------------|--------------------------------|---------------------|--------------------------------------|
| 1   | User Registration    | POST   | http://localhost:3000  | /api/user/signup               | Public              | Register new user with OTP verification |
| 2   | Verify OTP           | POST   | http://localhost:3000  | /api/user/verify-otp           | Public              | Verify user email with OTP           |
| 3   | User Login           | POST   | http://localhost:3000  | /api/user/login                | Public              | Authenticate user and get JWT token   |
| 4   | User Logout          | GET    | http://localhost:3000  | /api/user/logout               | isLogedIn           | Clear authentication cookie          |
| 5   | Get User Profile     | GET    | http://localhost:3000  | /api/user/me                   | isLogedIn           | Get authenticated user's profile data |

## 📦 Response Examples

### 💻 Signup Successful Response  
```json
{
  "success": true,
  "message": "Account created. Please verify your email via OTP.",
  "user": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "isVerified": false
  }
}
```
### 💻 Login Successful Response
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "isVerified": true
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
### User Profile
```json
{
  "success": true,
  "user": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "isVerified": true,
    "createdAt": "2023-12-15T10:30:00.000Z",
    "updatedAt": "2023-12-15T10:30:00.000Z"
  },
  "orders": []
}
```


# 📝 Blog API Documentation

## 📚 Blog Endpoints

| No. | Title                | Method | Base URL               | Route                          | Protected By        | Description                          |
|-----|----------------------|--------|-------------------------|---------------------------------|---------------------|--------------------------------------|
| 1   | Get Blogs (Paginated)| GET    | http://localhost:3000   | /api/blogs?page=1&limit=10      | Public              | Returns paginated list of blogs      |
| 2   | Get Single Blog      | GET    | http://localhost:3000   | /api/blog/:id                   | Public              | Fetch a single blog by its ID        |
| 3   | Create Blog          | POST   | http://localhost:3000   | /api/blog/create                | isLogedIn, isAdmin  | Create new blog with image upload    |
| 4   | Delete Blog          | DELETE | http://localhost:3000   | /api/blogs/:id                  | isLogedIn, isAdmin  | Delete a blog by its ID              |
| 5   | Update Blog (TODO)   | PUT    | http://localhost:3000   | /api/blogs/:id                  | isLogedIn, isAdmin  | (To be added) Update existing blog   |


# 📚 1. Get Blogs Pagination API

**Endpoint:** `/api/blogs?page=2&limit=10`
This API fetches blogs with pagination.

## 📌 How Pagination Works
- `page` query param:
  - Optional for page 1: `/api/blogs`
  - Required for other pages like page 2, 3, 5 and beyond:
  - `/api/blogs?page=2` **In response you get blogs from 11 to 20**
  - `/api/blogs?page=3` **In response you get blogs from 21 to 30**
  - etc.
- `limit` query param:
  - is totally Optional.
  - Defaults to `10` if not provided.

## 🛣️ Example Routes

- Page 1 (default):  
  `/api/blogs`
  ##### or
  `/api/blogs?page=1` 
  #### or
  `/api/blogs?page=1&limit=10`

- Page 2:  
  `/api/blogs?page=2`  
  `/api/blogs?page=2&limit=10`

- Page 3:  
  `/api/blogs?page=3`  
  `/api/blogs?page=3&limit=10`

**...and so on.**
### ⚠️ **Note:** 
  Currently I do not cache this data with techonogy like **redis** but at frontend it better to cache api call with tool like **tanstack query** for better ux.
## 📥 Success Response
```json
{
  "success": true,
  "message": "Blogs fetched successfully",
  "totalRecords": 52,
  "totalPages": 6,
  "currentPage": 2,
  "limit": 10,
  "blogs": [ ... ]
}
```

# 3. 🖋 Create Blog

## 📥 Success Response Example
```json
{
  "success": true,
  "message": "🎉 Blog created successfully!",
  "blog": {
    "_id": "66abc123def456...",
    "title": "Best Blog Title Ever",
    "category": "lifestyle",
    "images": [
      "https://res.cloudinary.com/your-cloud/image/upload/..."
    ],
    "body": "This is full blog body.",
    "tags": ["blog", "react"],
    "date": 1720000000000,
    "__v": 0
  }
}
```
## ❌ Error Example (Missing image)
```json
{
  "success": false,
  "message": "❌ At least one image is required."
}
```

## ❌ Mutiples Erros like
```json
{
  "success":false,
  "errArray":["Blog title must not be empty.","Blog title must have at least 25 characters.","Blog body is required."],
  "message":"🙏 Kindly fulfill all requirements."}
```







```
backend/
│
├── controllers/
│   ├── blog.controller.js
│   ├── course.controller.js 🕑
│   └── user.controller.js 🕑
│    
│
├── middlewares/
│   ├── express-validator.js
│   ├── isAdmin.js  🕑
│   ├── isLogedIn.js
│   ├── multer.js
│   └── rate-limiting.js
│
├── models/
│   ├── blog.js
│   ├── order.js
│   ├── pastPaper.js
│   ├── user.js
│   └── [other models]
│ 
├── queueAndWorker/
│   ├── email.queue.js
│   └── email.worker.js
│
├── routes/
│   └── blog.js
│
├── utils/
│   ├── cloudinary.js
│   └── connectDB.js 
│
├── .env
├── app.js
├── docker-compose.yml
├── Dockerfile
├── package-lock.json
├── package.json
└── README.md


```


# 🚀 Docker Setup for Backend + Redis

This project uses **Docker Compose** to run the Node.js backend and Redis queue server together.

---

## 🐳 Start Services

Run the following command to start the backend and Redis:

```bash
docker-compose up -d
```
If you've made changes to the Dockerfile or dependencies, use:
```
docker-compose up -d --build
```
# 📦 Services
- backend: Node.js server (MERN API)
- redis: Redis server (used by BullMQ for background job queues)
- command to open redis cli: docker exec -it backend-redis-1 redis-cli
- then entry ping you get pong in response means your redis works correctly.

## 🪵 Monitor Logs
To follow real-time logs of the backend:
```
docker-compose logs -f backend
```
To check Redis logs:
```
docker-compose logs -f redis
```

## 🧹 Stop All Services
To stop all running containers:
```
docker-compose down
```
This will stop and remove the containers.


# rough work
## ? Bull Board > npm install @bull-board/express
Use Bull Board for Monitoring 

```yaml
services:
  redis:
    image: redis:7.2
    container_name: redis-server
    ports:
      - "6379:6379"
    restart: unless-stopped

  backend:
    build:
      context: .
    container_name: backend-server
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    working_dir: /app
    command: npm run dev
    depends_on:
      - redis
```
### Setup (add in app.js):
```code 
import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter.js';
import { emailQueue } from './queues/emailQueue.js';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullMQAdapter(emailQueue)],
  serverAdapter,
});
app.use('/admin/queues', serverAdapter.getRouter());
```
Now visit: http://localhost:3000/admin/queues to see your job dashboard!

