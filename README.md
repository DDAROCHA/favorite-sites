# Favorite Sites

> A full-stack demo application to manage and showcase curated websites with images.

This project is a dynamic web application that allows users to create, store, and display a list of favorite websites, including visual snapshots.

It combines a modern frontend experience with a backend API, database persistence, and cloud-based image handling.

---

## 🚀 Overview

Favorite Sites is more than a simple bookmark manager — it is a **full-stack demo system** that demonstrates how to:

- Fetch and render dynamic content from an API
- Handle user-generated data
- Upload and manage images in the cloud
- Synchronize frontend state with backend updates
- Deliver a smooth and interactive UX

---

## ✨ Features

- 📌 Add new sites with title, description, and link
- 🖼️ Attach images via:
  - Direct URL
  - Local file upload (auto-uploaded to Cloudinary)
- ⚡ Dynamic list rendering from backend API
- 🔄 Real-time UI updates after data submission
- 🎬 Smooth animations with Framer Motion
- 📱 Responsive and clean UI

---

## 🧠 Architecture

### Frontend

- React
- Framer Motion (animations)
- Lucide React (icons)
- CSS styling

### Backend

- Node.js
- Express
- REST API (CRUD operations)

### Database

- PostgreSQL (Neon Serverless)

### Media Handling

- Cloudinary (image upload and hosting)

---

## 🔗 API Integration

The frontend communicates with a deployed backend:

- `GET /api/projects` → Fetch all sites
- `POST /api/projects` → Create a new site
- `POST /api/upload-image` → Upload image to Cloudinary

## ⚙️ Key Technical Highlights

- Asynchronous data fetching with useEffect
- Optimistic UI refresh after creating new entries
- Conditional image handling (URL vs file upload)
- Form validation and error handling
- File upload pipeline:
  1- Upload to backend
  2- Backend sends to Cloudinary
  3- Returns public URL
  4- Stored in database

## 📸 Preview

🌍 Live Demo
👉 https://your-deploy-url.com

## ⚙️ Getting Started

Clone the repository:
git clone https://github.com/DDAROCHA/favorite-sites.gitcd favorite-sites
Install dependencies:
npm install
Run the app:
npm run dev

## 🧩 Future Improvements

- Authentication & user accounts
- Multi-user support
- Tagging and categorization
- Search & filtering
- Drag & drop ordering
- AI-based recommendations (auto-tagging / classification)

## 📫 Contact

LinkedIn: https://linkedin.com/in/your-profile
Portfolio: https://your-portfolio.com

## ⭐ Final Note

This project focuses on real-world full-stack patterns, including:

API-driven UI
Cloud media handling
State synchronization
Clean UX interactions

## Built as a practical demonstration of modern full-stack development.
