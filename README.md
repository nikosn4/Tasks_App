# Task Manager App 

A  full-stack Task Manager with:
- **Backend:** Node.js + Express + MongoDB (Mongoose) + JWT Auth
- **Frontend:** React (Vite)

- [Watch the demo video](task_app_rec.mp4)
- if it doesnt run here, you can find it in the main repository


Users can register/login and manage their own tasks (create, list, toggle complete, delete).

## Project Structure

tasks_app/
backend/ Express API + MongoDB + JWT auth

frontend/
vite-project/React (Vite) client


## Prerequisites

- **Node.js** (recommended: LTS)
- **npm**
- A **MongoDB** database (MongoDB Atlas or local MongoDB)

---

## 1) Clone the repo (backend set up)
2) at bash: 
    cd backend (your path)
    npm install
3) at the .env.example rename it .env and put your keys and mongodb url and user and password credentials
   practicaly edit: MONGO_URI=your_mongodb_connection_string
                    JWT_SECRET=your_random_secret_string
4) run the backend: node server.js
   (should run on port 3001)

## Frontend set up
open a second terminal dont close the first one because it needs to be running the rear and front end 
, run: 
cd frontend/vite-project  (your path)
npm install
npm run dev
(should be running at port: 5173)





