# HMS

A simple hospital management system with a React frontend and Express/MongoDB backend.

## Prerequisites

- Node.js 18+ and npm
- MongoDB locally installed and running, or MongoDB Atlas access

## Backend Setup

1. Open a terminal and go to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Create `backend/.env` if you want to override defaults:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/pj
   JWT_SECRET=supersecretkey
   FRONTEND_URL=http://localhost:5173
   DEFAULT_ADMIN_EMAIL=admin@gmail.com
   DEFAULT_ADMIN_PASSWORD=123456
   DEFAULT_ADMIN_NAME=Admin
   ```
4. Start the backend locally:
   ```bash
   npm run dev
   ```

The backend now falls back to `mongodb://127.0.0.1:27017/pj` if `MONGO_URI` is not provided.

## Frontend Setup

1. Open a terminal and go to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Create `frontend/.env` to override the API URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend locally:
   ```bash
   npm run dev
   ```

## Default login

Use the default admin credentials if the database does not already contain an admin:

- Email: `admin@gmail.com`
- Password: `123456`

## Notes

- `backend/.env.example` and `frontend/.env.example` are provided as a reference.
- For deployment, set `MONGO_URI`, `JWT_SECRET`, and `VITE_API_URL` in your host environment.
