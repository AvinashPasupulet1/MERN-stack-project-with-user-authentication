mern-assignment/
│
├── client/        # React frontend (Vite/React)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── server/        # Node.js/Express backend
│   ├── src/
│   ├── package.json
│   └── .env.example   # not real secrets, just placeholders
│
├── .gitignore
├── README.md

MERN Stack Login

A full-stack MERN application with authentication, protected routes, and agent management.

🚀 Features

JWT authentication (Login/Logout)

Protected Dashboard

Add & Manage Agents

Responsive React frontend

MongoDB Atlas integration

Ready for deployment (Vercel + Render)

⚙️ Setup
Clone & Install
git clone https://github.com/<your-username>/MERN-Stack-login.git
cd MERN-Stack-login

Backend (/server)
cd server
npm install


Create .env:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret


Run:

npm start

Frontend (/client)
cd ../client
npm install


Create .env:

REACT_APP_API_URL=http://localhost:5000


Run:

npm start

🌍 Deployment

Backend: Render
 → root /server → set env vars

Frontend: Vercel
 → root /client → set REACT_APP_API_URL to backend URL

🛠 Tech Stack

React • Node.js • Express.js • MongoDB Atlas • JWT • Vercel • Render

👤 Author

Avinash Pasupuleti
📧 pasupuletiavinash23@gmail.com
