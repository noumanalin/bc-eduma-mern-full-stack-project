





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

# 🎓 Course Management API Documentation

## 🚀 Base URL
```
http://localhost:3000/api/course
```
---

## 🔐 Admin Endpoints

| No. | Title           | Method | Route             | Protected By       | Description                             |
|-----|------------------|--------|-------------------|--------------------|-----------------------------------------|
| 1   | Create Course  ✔  | POST   | /create           | isLogedin, isAdmin | Create a new course (All fields required) |
| 2   | Update Course    | PUT    | /update/:id       | isLogedin, isAdmin | Update an existing course               |
| 3   | Delete Course    | DELETE | /delete/:id       | isLogedin, isAdmin | Delete a course                         |
| 4   | Dashboard Stats ✔    | GET    | /stats            | isLogedin, isAdmin | Get total courses, enrollments, revenue |
| 5   | Test Admin   ✔    | GET    | /test/admin       | isLogedin, isAdmin | Test admin status                       |

---

## 🎓 Student/User Endpoints

| No. | Title         | Method | Route           | Protected By | Description                  |
|-----|---------------|--------|-----------------|--------------|------------------------------|
| 6   | Enroll Course ✔ | POST   | /enroll/:id     | isLogedin    | Enroll in a course with course id |

---

## 🌍 Public Endpoints

| No. | Title           | Method | Route            | Protected By | Description                 |
|-----|------------------|--------|------------------|--------------|-----------------------------|
| 7   | Get All Courses ✔ | GET    | /getAll          | Public       | Fetch all available courses |
| 8   | Get Single Course ✔| GET    | /getSingle/:id   | Public       | Fetch one course by ID      |

---

# Details Documentation Section of Course Management API  
## 1. 📌 Create Course — Required Fields

> All fields below **must** be included in the request.

| Field         | Type     | Required | Description                       |
|---------------|----------|----------|-----------------------------------|
| `title`       | String   | ✅       | Course title                      |
| `description` | String   | ✅       | Detailed description              |
| `price`       | Number   | ✅       | Course price                      |
| `isFree`      | Boolean  | ✅       | Whether course is free or not     |
| `content`     | String   | ✅       | Course content (HTML/Markdown)    |
| `totalLessons`| Number   | ✅       | Number of lessons                 |
| `duration`    | String   | ✅       | Course duration (e.g. "3h 30m")   |
| `language`    | String   | ✅       | Course language                   |
| `level`       | String   | ✅       | Beginner / Intermediate / Expert |
| `category`    | String   | ✅       | Category like "Programming"       |
| `tags`        | Array    | ✅       | Tags like ["React", "Web Dev"]    |
| `certificate` | Boolean  | ✅       | Whether certificate is included   |
| `published`   | Boolean  | ✅       | Should course be visible or not   |
| `image`       | File     | ✅       | Thumbnail image (via `multipart/form-data`) |

---

## 📤 Create Course — API Request (Form Data)

**URL**: `POST /api/course/create`

**Protected By**: `isLogedin`, `isAdmin`

**Content-Type**: `multipart/form-data`

### ✅ Example Form Data (Postman)

| Key           | Value                                 | Type     |
|---------------|----------------------------------------|----------|
| title         | "Learn React.js"                      | Text     |
| description   | "Complete beginner to advanced course" | Text     |
| price         | 29.99                                  | Text     |
| isFree        | false                                  | Text     |
| content       | "React course syllabus here..."        | Text     |
| totalLessons  | 12                                     | Text     |
| duration      | "5h 30m"                               | Text     |
| language      | "English"                              | Text     |
| level         | "Beginner"                             | Text     |
| category      | "Web Development"                      | Text     |
| tags          | ["React", "JavaScript"]                | Text     |
| certificate   | true                                   | Text     |
| published     | true                                   | Text     |
| image         | (upload thumbnail file)                | File     |

---

## 📦 Successful Create Response

```json
{
  "success": true,
  "message": "Course created successfully",
  "course": {
    "_id": "123abc456def",
    "title": "Learn React.js",
    "description": "Complete beginner to advanced course",
    "price": 29.99,
    "isFree": false,
    "thumbnail": "https://res.cloudinary.com/.../image.png",
    ...
  }
}
```

## 2. ✏️ **Update Course** success response

## 3. 🗑️ **Delete Course** success response

## 4. 📊 **Dashboard Stats** success response
```json
{
  "success":true,
  "stats":{"totalCourses":2,"totalEnrollments":1,"totalRevenue":0}
}
```

## 5. 🛡️ **Test Admin** success response
🔒 This is only a protected test route.



## 6. 🎓 **Enroll Course**
```json
{"success":true,"message":"Enrolled successfully in course","course":{"rating":{"average":0,"count":0},"_id":"6876872a17af751a21597fd4","title":"Learn React.js","description":"Complete beginner to advanced course","thumbnail":"https://res.cloudinary.com/dnq3g9as7/image/upload/v1752598314/courses/hjbodrjwelijrltuaw7t.jpg","price":29.99,"isFree":false,"content":"React course syllabus here...","totalLessons":12,"duration":"5h 30m","language":"English","level":"beginner","category":"Web Development","tags":["[\"React\", \"JavaScript\"] "],"certificate":true,"enrolledUsers":["687681adf3ad2cd44cf8ecd1"],"numberOfStudents":1,"createdBy":"687681adf3ad2cd44cf8ecd1","published":true,"createdAt":"2025-07-15T16:51:54.543Z","updatedAt":"2025-07-15T17:10:26.087Z","__v":1}}
```

## 7. 📚 **Get All Courses Response** success response
Returns a list of all available courses.
```json
{
  "success":true,
  "total":1,
  "courses":[]
}
```
## 8. 📖 **Get Single Course** with id response
```json
{
    "success": true,
    "course": {
        "rating": {
            "average": 0,
            "count": 0
        },
        "_id": "6876872a17af751a21597fd4",
        "title": "Learn React.js",
        "description": "Complete beginner to advanced course",
        "thumbnail": "https://res.cloudinary.com/dnq3g9as7/image/upload/v1752598314/courses/hjbodrjwelijrltuaw7t.jpg",
        "price": 29.99,
        "isFree": false,
        "content": "React course syllabus here...",
        "totalLessons": 12,
        "duration": "5h 30m",
        "language": "English",
        "level": "beginner",
        "category": "Web Development",
        "tags": [
            "[\"React\", \"JavaScript\"] "
        ],
        "certificate": true,
        "enrolledUsers": [],
        "numberOfStudents": 0,
        "createdBy": {
            "_id": "687681adf3ad2cd44cf8ecd1",
            "name": "Ali Admin",
            "email": "noumanalivu@gmail.com",
            "role": "admin"
        },
        "published": true,
        "createdAt": "2025-07-15T16:51:54.543Z",
        "updatedAt": "2025-07-15T16:51:54.543Z",
        "__v": 0
    }
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

