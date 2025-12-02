# Frontend -- React + Vite + TailwindCSS

This is the frontend for the task management dashboard. It includes
authentication, protected routes, responsive UI, and full CRUD
integration with the backend.

## 🚀 Tech Stack

- React (Vite)
- TailwindCSS
- React Router v6
- Axios
- Context API (global auth state)

## 📁 Structure

frontend/ ├── api/ (axios instance) ├── context/ (AuthContext) ├──
pages/ (Login, Signup, Dashboard) ├── App.jsx (routes) ├── main.jsx └──
.env

## 🔐 Features

- Login/Signup with JWT\
- Protected routes\
- Dashboard with full CRUD\
- Search & filter support\
- Responsive Tailwind UI\
- Token stored + auto-attached via Axios

## ⚙️ Setup

1.  Install:

    ```bash
    npm install
    ```

2.  Create `.env`:

        VITE_API_BASE=http://localhost:5000/api

3.  Run:

    ```bash
    npm run dev
    ```

## 📱 UI Features

- Fully responsive (mobile → desktop)
- Clean layout with Tailwind
- Modern cards & forms
- Smooth user experience

## 📈 Notes

Frontend is designed with clean structure, reusable logic, and
production-ready API integration practices.
