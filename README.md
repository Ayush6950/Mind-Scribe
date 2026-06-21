# 🧠 MindScribe — AI-Powered Notes Generator

<div align="center">

![MindScribe Banner](https://img.shields.io/badge/MindScribe-AI%20Notes%20Generator-black?style=for-the-badge&logo=openai&logoColor=white)

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](./LICENSE)

**Generate exam-focused notes, project documentation, flow diagrams and revision-ready content using AI — faster, cleaner and smarter.**

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 📚 **Exam Notes** | Generate concise, exam-focused notes with AI tailored to your level |
| 🚀 **Project Notes** | Create structured documentation for your projects |
| 🧠 **Diagrams** | Turn complex concepts into clear visual diagrams |
| 📄 **PDF Export** | Export your notes instantly as clean, downloadable PDFs |
| ⭐ **Priority View** | Smart sidebar that ranks subtopics by exam importance |
| 📊 **Charts & Analytics** | Visual insight charts powered by Recharts |
| 🔐 **Authentication** | Secure login via Firebase + JWT-based sessions |
| 💳 **Credits System** | Token-based generation system (10 credits per note) |
| 🗂️ **Notes History** | Browse and revisit all previously generated notes |

---

## 🛠️ Tech Stack

### Frontend
- **React 19** — UI framework
- **Vite 8** — Lightning-fast build tool
- **Tailwind CSS 4** — Utility-first styling
- **Redux Toolkit** — State management
- **React Router v7** — Client-side routing
- **Framer Motion (motion)** — Smooth animations
- **Recharts** — Data visualization
- **Lucide React & React Icons** — Icon sets
- **Firebase** — Authentication (Google OAuth etc.)
- **Axios** — HTTP client

### Backend
- **Node.js + Express 5** — REST API server
- **MongoDB + Mongoose** — Database & ODM
- **JWT (jsonwebtoken)** — Secure session tokens
- **Cookie Parser** — Cookie-based auth
- **Puppeteer** — PDF generation via headless browser
- **Google Gemini AI** — Core AI notes generation engine
- **dotenv** — Environment configuration

---

## 📁 Project Structure

```
MindScribe/
├── client/
│   └── Frontend/
│       ├── components/         # Reusable UI components
│       │   ├── navbar.jsx
│       │   ├── SideBar.jsx     # Priority-based quick exam view
│       │   ├── FinalResult.jsx # AI notes display
│       │   ├── RechartSetUp.jsx# Chart visualizations
│       │   └── Footer.jsx
│       ├── src/
│       │   ├── pages/
│       │   │   ├── Home.jsx    # Landing page
│       │   │   ├── Auth.jsx    # Login / Register
│       │   │   ├── Notes.jsx   # Note generation page
│       │   │   ├── History.jsx # Past notes
│       │   │   └── Pricing.jsx # Pricing page
│       │   └── main.jsx        # App entry point
│       ├── redux/
│       │   └── store.js        # Redux store configuration
│       ├── index.html
│       └── vite.config.js
│
└── server/
    ├── controllers/
    │   ├── auth.controllers.js     # Login / Register logic
    │   ├── generate.controllers.js # AI note generation
    │   └── user.controllers.js     # User profile management
    ├── models/
    │   ├── User.js                 # User schema (credits, notes refs)
    │   └── notesModel.js           # Notes schema (topic, level, content)
    ├── routes/
    │   ├── auth.routes.js
    │   ├── user.routes.js
    │   └── genrate.routes.js
    ├── services/
    │   └── gemini.service.js       # Google Gemini API integration
    ├── middleware/                 # Auth middleware (JWT verification)
    ├── utils/
    │   ├── database.js             # MongoDB connection
    │   └── promptBuilder.js        # AI prompt engineering
    └── index.js                    # Server entry point
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- Google Gemini API Key → [Get one here](https://ai.google.dev/)
- Firebase project (for authentication)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Ayush6950/Mind-Scribe.git
cd Mind-Scribe
```

---

### 2️⃣ Setup the Server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```

Start the development server:

```bash
npm run dev
```

The server runs on **http://localhost:5000**

---

### 3️⃣ Setup the Frontend

```bash
cd client/Frontend
npm install
```

Create a `.env` file in `client/Frontend/`:

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

Start the development client:

```bash
npm run dev
```

The frontend runs on **http://localhost:5173**

---

## 🔌 API Reference

### Auth Routes — `/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT cookie |
| `POST` | `/api/auth/logout` | Clear session cookie |

### User Routes — `/api/user`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/user/profile` | Get current user profile & credits |

### Notes Routes — `/api/notes`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/notes/generate` | Generate AI notes (costs 10 credits) |
| `GET` | `/api/notes/history` | Fetch user's notes history |

---

## ⚙️ Note Generation Options

When generating notes via `/api/notes/generate`, the following options are available:

```json
{
  "topic": "Photosynthesis",
  "level": "Beginner | Intermediate | Advanced",
  "exam": "CBSE | JEE | General | ...",
  "revisionMode": true,
  "includeDiagram": true,
  "includeCharts": false
}
```

> **Credits:** Each note generation costs **10 credits**. Users with fewer than 10 credits cannot generate new notes.

---

## 🧩 How It Works

```
User Input (Topic + Settings)
        ↓
Prompt Builder (promptBuilder.js)
        ↓
Google Gemini AI (gemini-3.5-flash)
        ↓
Structured JSON Response
        ↓
Saved to MongoDB → Returned to Frontend
        ↓
Displayed with Priority Sidebar + Charts
```

---

## 📦 Environment Variables Summary

| Variable | Location | Description |
|---|---|---|
| `PORT` | server `.env` | Server port (default: 5000) |
| `MONGO_URI` | server `.env` | MongoDB connection string |
| `JWT_SECRET` | server `.env` | Secret key for JWT signing |
| `GEMINI_API_KEY` | server `.env` | Google Gemini API key |
| `VITE_API_URL` | client `.env` | Backend API base URL |
| `VITE_FIREBASE_*` | client `.env` | Firebase config variables |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License** — see the [LICENSE](./LICENSE) file for details.

---

## 👤 Author

**Ayush Malviya**  
GitHub: [@Ayush6950](https://github.com/Ayush6950)

---

<div align="center">

Made with ❤️ and AI by Ayush Malviya

⭐ Star this repo if you found it helpful!

</div>
