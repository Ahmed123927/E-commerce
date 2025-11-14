# Full-Stack E-Commerce Platform (React + Vite + Spring Boot)

## 📌 Overview

This is a full-stack e-commerce web application built using **React (Vite)** for the frontend and **Spring Boot** for the backend. The platform supports product browsing, user authentication, cart management, order processing, and admin product management.

---

## 🎯 Key Features

### 🔹 Frontend (React + Vite)

* Modern UI built with React & Vite for ultra-fast performance.
* Responsive components using CSS/Bootstrap/Tailwind.
* Product listing & product details page.
* Shopping cart (Add / Remove / Update quantity).
* User authentication (Login / Register) via API.
* Protected routes for logged-in users.

### 🔹 Backend (Spring Boot)

* RESTful API built using Spring Boot 3.
* JWT authentication for secure user login.
* CRUD operations for product management.
* Order creation & tracking.
* Cart and order persistence.
* PostgreSQL database integration using Spring Data JPA.

### 🔹 Admin Features

* Add new products.
* Edit product details.
* Delete products.
* View all orders.

---

## 🛠️ Tech Stack

### **Frontend**

* React 18
* Vite
* Axios
* React Router
* TailwindCSS / Bootstrap

### **Backend**

* Java 17
* Spring Boot 3 (Web, Data JPA, Security)
* JWT Authentication
* PostgreSQL
* Lombok
* ModelMapper

---


## ⚙️ How It Works

### 1️⃣ Frontend

* React fetches data from the backend using Axios.
* Token is stored in localStorage after login.
* Protected routes check for JWT token.

### 2️⃣ Backend

* All APIs under `/api/**`.
* Authentication using JWT.
* Authorization: standard users vs admin.
* Products, orders, and cart stored in PostgreSQL.

---

## 📡 API Endpoints (Backend)

### 🔹 Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### 🔹 Products

```
GET    /api/products
GET    /api/products/{id}
POST   /api/products (Admin)
PUT    /api/products/{id} (Admin)
DELETE /api/products/{id} (Admin)
```

### 🔹 Cart

```
POST /api/cart/add
GET  /api/cart/user/{userId}
DELETE /api/cart/remove/{productId}
```

### 🔹 Orders

```
POST /api/orders/create
GET  /api/orders/user/{userId}
GET  /api/orders (Admin)
```

---

## 🧰 Configuration (backend)

```
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/ecommerce
    username: postgres
    password: yourpassword
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
jwt:
  secret: YOUR_SECRET_KEY
```

---

## 🧪 Running the Project

### Frontend

```
cd frontend
npm install
npm run dev
```

### Backend

```
mvn spring-boot:run
```

---

## 🧩 Future Enhancements

* Stripe payment integration
* Product reviews & ratings
* User wishlists
* Admin dashboard (React)
* Inventory management
* Email notifications

---

## 👨‍💻 Author

**Ahmed Hussein** – Java Backend Developer
