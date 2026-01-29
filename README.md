🏠 Home Services Platform (MERN Stack)

A full-stack MERN web application that allows users to book home services such as cleaning, cooking, electrician work, and more. The platform supports secure authentication, role-based authorization, and service management with a responsive UI.

🔗 Live Demo (Frontend): https://satyam2237003.netlify.app/

⚠️ Backend is deployed on Render — it may take a few seconds to start on first request.

🚀 Features

✅ User Registration & Login (Authentication)

✅ Secure Authorization (Protected Routes)

✅ Multiple Home Services Listing

✅ Service Booking Flow

✅ Role-based Access (User/Admin ready structure)

✅ REST API based backend

✅ MongoDB database integration

✅ Responsive UI

✅ Deployed frontend & backend

✅ Environment-based configuration

✅ Async backend service handling

🧱 Tech Stack
Frontend

React.js

Axios

React Router

CSS / Bootstrap (if used — adjust if needed)

Netlify (Deployment)

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

bcrypt password hashing

Render (Deployment)

📂 Project Structure
project-root
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── config/
│
└── README.md

🔐 Authentication & Authorization

JWT-based authentication

Passwords stored using hashing

Protected API routes using middleware

Token verification on secured endpoints

Role-ready authorization structure for future expansion

🌐 API Highlights

Auth APIs

POST /api/auth/register
POST /api/auth/login


Services APIs

GET    /api/services
POST   /api/services
PUT    /api/services/:id
DELETE /api/services/:id


Booking APIs (if included)

POST /api/bookings
GET  /api/bookings/user


(Adjust to match your actual routes if names differ.)

⚙️ Environment Variables

Create a .env file inside backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000

🛠️ Installation & Setup
Clone the repository
git clone <your-repo-url>
cd <project-folder>

Backend Setup
cd backend
npm install
npm run dev

Frontend Setup
cd frontend
npm install
npm start

🚀 Deployment
Layer	Platform
Frontend	Netlify
Backend	Render
Database	MongoDB Atlas

Note: Render free tier may cause cold starts — backend may take ~30–60 seconds to respond initially.

📌 Future Improvements

⭐ Service provider dashboard

⭐ Online payment integration

⭐ Real-time booking status

⭐ Reviews & ratings

⭐ Admin panel

⭐ Email/SMS notifications

⭐ Service availability scheduling

🧪 Testing Ideas

API endpoint testing with Postman

Auth flow testing

Token expiration testing

Booking workflow validation

Role-based access test cases

👨‍💻 Author

Satyam Kumar
MERN Stack Developer
Backend-focused with authentication & service architecture experience
