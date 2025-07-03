# Beta Communes – MERN Full Stack Project

**Beta Communes (bc-eduma)** is an online learning platform built with the MERN stack. It includes:
- Admin panel to manage courses and past papers
- E-commerce features, allowing students to add courses to their cart

---

## 🔧 Prerequisites

Before cloning the project, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

---

# 🛠 Technologies Used
**Frontend:**
- **React.js** (with Hooks)
- **Axios** (API integration)
- **Redux** (state management)
- **Bootstrap** (UI Components)
- **HTML5/CSS3** (Responsive Design)
- **TankStack Query** - (may be we used!)

**Backend:**
- **Node.js**
- **Express.js**
- **MongoDB** (Database)
- **Mongoose** (ODM)
- **CORS** (Cross-Origin Resource Sharing)
- **bcryptjs** (hashing passwords and sensitive data securely)
- **jsonwebtoken** (secure user authentication)
- **multer** (multipart/form-data data handling)
- **cloudinary** (cloude file storage)
- **sharp** (Image processing library for resizing and optimizing images)
- **cookie-parser**
- **express-rate-limit** 
- **express-validator** (form validation)
- **helmet** (for secure header to prevent attacks)
- **zod** (schema base validations)

## 🚀 How to Clone and Run This Project

### 1. Fork & Clone

First, fork this repository into your GitHub account.

Then, clone it using the command below (replace `your_fork_url` with your forked repo URL):

```bash
git clone your_fork_url
```

## 2. Set Up Frontend
Navigate into the frontend directory and install dependencies:

```  
cd frontend
npm install
npm run dev
```
This will start the React frontend.

## 3. Set Up Backend (Optional / For Contributors)
To run the backend server:

```
cd backend
npm install
npm run dev
```
This will start the Express.js backend API.

## 🤝 Contributing
Feel free to open issues or submit pull requests if you’d like to contribute!

# 📂 Folder Structure
```
main-project/
│
├── backend/     # Node.js + Express APIs
├── frontend/    # React application
├── .gitignore
└── README.md
```

# 📂 Detailed Folder Structure

## Frontend
```
frontend/
│
├── public/     # images/files etc.
├── src/ 
├──── assets
├──── components
├──── helpers
├──── hooks
├──── pages
├──── redux
├──── app.css
├──── app.jsx
├──── main.jsx
├───── eslint.config.js
├── package.json
└── README.md
```


# 🔧 Environment Configuration

## Frontend `.env`
Create a `.env` file in the `frontend` directory with:

```env
API_BASE_URL=http://localhost:3000/
```
## Backend `.env`
Create a `.env` file in the `backend` directory with:
```
PORT=3000
FRONTEND_URL=https://localhost:5173
MONGO_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```




# 👥 Team Beta Communes

## 🧑‍💻 Core Team Members

| Role                     | Name        | Expertise                  | Contact                   |
|--------------------------|-------------|----------------------------|---------------------------|
| Senior Software Engineer | Asad Ali    | Team Lead, Full-Stack      | [team@betacommunes.com](team@betacommunes.com)  |
| Frontend Developer       | Wasiq       | React, Redux               | [team@betacommunes.com](team@betacommunes.com) |
| Full Stack Developer     | Nouman Ali  | MERN, Next.js              | [team@betacommunes.com](team@betacommunes.com)|

## 📬 Contact Us

- 🌐 **Website**: [betacommunes.com](https://www.betacommunes.com)
- 📧 **General Inquiries**: contact@betacommunes.com
- 💬 **Community Chat**: [ ]()
- 🔗 **GitHub Org**: [Beta-Communes](https://github.com/betacommunes)


