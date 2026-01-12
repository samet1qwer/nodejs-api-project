# ShopApp Backend API

This project was developed as part of a **Node.js Backend Development** course completed on Udemy. The main goal of the project is to reinforce the concepts learned during the training by building a modern, real-world backend application and implementing a fully functional RESTful API.

Throughout the training process, core backend topics such as API architecture, middleware structure, error handling, authentication, logging, and configuration management were covered in a practical manner. This project represents the applied and consolidated version of those concepts.

---

## 🚀 Project Features

* RESTful API architecture
* JWT-based authentication
* Centralized global error handling
* Advanced logging with Winston (File + MongoDB)
* Environment-based configuration management
* Modular and maintainable project structure

---

## 🛠️ Technologies Used

* **Node.js** – JavaScript runtime environment
* **Express.js** – Backend framework
* **MongoDB** – NoSQL database
* **Mongoose** – MongoDB ODM
* **JWT (jsonwebtoken)** – Authentication and authorization
* **Winston** – Logging system
* **winston-mongodb** – MongoDB transport for logs
* **node-config** – Environment-based configuration management
* **dotenv** – Environment variable management
* **express-async-errors** – Async error handling
* **Nodemon** – Automatic server restart during development

---

## 📂 Project Structure

```
shopapp/
│
├── config/
│   ├── default.json
│   ├── custom-environment-variables.json
│
├── middleware/
│   ├── auth.js
│   ├── error.js
│   ├── logger.js
│
├── routes/
│   └── ...
│
├── .env
├── app.js
├── package.json
└── README.md
```

---

## 🔐 Authentication

Authentication is handled using **JSON Web Tokens (JWT)**. Protected routes are secured via custom middleware that verifies the token and ensures authorized access in a centralized manner.

---

## 🧾 Logging

Application errors and important events are logged using **Winston**.

* Error logs are written to log files
* All logs are also stored in MongoDB

This setup provides effective error tracking and system monitoring.

---

## ⚙️ Installation

```bash
npm install
npm run dev
```

Create a `.env` file and define the following environment variables:

```env
MONGODB_URI=mongodb://localhost:27017/shopapp
JWT_SECRET=secret
PORT=3000
```

---

## 🎯 Purpose

The purpose of this project is to improve my backend development skills, apply real-world Node.js concepts, and add a solid backend project to my personal portfolio.

---

## 📌 Note

Although this project was developed within the scope of a training program, it follows a modern and scalable backend architecture that can be adapted to real-world applications.

---


