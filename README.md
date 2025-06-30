# 📝 ic-notebook

A full-featured modern note-taking web application built using the **MERN stack** (MongoDB, Express, React, Node.js).  
Features include voice input, tagging, dark/light mode, pagination, authentication with JWT, and more.

---

## 🚀 Features

- 🔐 JWT Authentication (Register & Login)
- 📝 Create, Update, Delete Notes
- 📌 Pin Important Notes
- 🔍 Search Notes by Title
- 🎙️ Voice Input using Web Speech API
- 💡 Dark / Light Mode Toggle
- 📑 Pagination Support
- 🧾 Tags Support
- 🎨 Fully Responsive UI with modern styling

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- Axios
- Web Speech API
- Modern CSS (Animations, Responsive)

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for auth
- bcrypt.js for password hashing
- dotenv + cors

---

## 🔧 Project Setup

### 📦 Backend Setup

```bash
cd backend
npm install
# Create a `.env` file with:
# MONGO_URI=<your-mongodb-uri>
# JWT_SECRET=<your-secret>

🌐 Frontend Setup
cd Frontend/vite-project
npm install
npm run dev
node server.js
