# 🎓 EduPortal

> India's most complete college discovery platform — search 10,000+ AICTE-approved institutions across 28 states by name, state, or district.

![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen?style=flat-square&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql)
![JWT](https://img.shields.io/badge/Auth-JWT-yellow?style=flat-square&logo=jsonwebtokens)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 📌 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Roadmap](#roadmap)
- [Contributors](#contributors)

---

## About

EduPortal is a full-stack web application that helps students discover colleges across India. Users can search colleges by name using a live debounced search bar, or filter by state and district. Each college card shows institution type, university affiliation, AICTE ID, address, and more.

---

## Features

- 🔍 **Live keyword search** — debounced search by college name, results update as you type
- 🗺️ **State & District filter** — cascading dropdowns to narrow down by location
- 📄 **College detail modal** — full profile with AICTE ID, affiliation, address, institution type
- 🔐 **JWT Authentication** — register, login, role-based access (USER / ADMIN)
- 📱 **Responsive UI** — works on mobile, tablet, and desktop
- 🌙 **Dark / Light mode** — theme toggle persisted in localStorage
- 🏠 **Landing page** — marketing page with stats, features, and CTA
- 🛡️ **Duplicate email check** — 409 Conflict returned and shown inline on register

---

## Tech Stack

### Backend
| Technology     | Purpose                        |
|----------------|-------------------------------|
| Java 17        | Core language                  |
| Spring Boot 3  | REST API framework             |
| Spring Security| JWT-based authentication       |
| Spring Data JPA| ORM / database access          |
| Hibernate      | JPA implementation             |
| PostgreSQL     | Primary database               |
| HikariCP       | Connection pooling             |
| Maven          | Build tool                     |

### Frontend
| Technology       | Purpose                        |
|------------------|-------------------------------|
| React 18         | UI framework                   |
| React Router v6  | Client-side routing            |
| Axios            | HTTP client                    |
| React Hook Form  | Form state & validation        |
| Framer Motion    | Animations & transitions       |
| Lucide React     | Icon library                   |

---

## Project Structure

```
EduPortal/
├── Spring Backend/
│   └── src/main/java/com/Eduportalapp/
│       ├── controller/
│       │   ├── InstituteController.java
│       │   ├── AuthController.java
│       │   └── StateDistrictController.java
│       ├── service/
│       │   ├── InstituteService.java
│       │   └── UserService.java
│       ├── repository/
│       │   ├── InstituteRepo.java
│       │   └── UserRepo.java
│       ├── dto/
│       │   └── InstituteCardDTO.java
│       ├── model/
│       │   ├── Institute.java
│       │   ├── State.java
│       │   ├── District.java
│       │   └── User.java
│       └── config/
│           └── SecurityConfig.java
│
└── ReactFrontend/
    └── src/
        ├── pages/
        │   ├── Landing/
        │   ├── Home/
        │   ├── Login/
        │   ├── Register/
        │   └── OTPVerification/
        ├── components/
        │   ├── Navbar/
        │   ├── Footer/
        │   └── CollegeDetailModal/
        └── API/
            ├── collegeApi.js
            └── authApi.js
```

---

## Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- PostgreSQL 14+
- Maven 3.8+

### 1. Clone the repository

```bash
git clone https://github.com/RiteshRC96/EduPortal.git
cd EduPortal
```

### 2. Backend setup

```bash
cd "Spring Backend"
```

Create the database:
```sql
CREATE DATABASE eduportal;
```

Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/eduportal
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update

spring.datasource.hikari.max-lifetime=600000
spring.datasource.hikari.keepalive-time=300000
spring.datasource.hikari.connection-timeout=30000

jwt.secret=your_jwt_secret_key
```

Run the backend:
```bash
mvn spring-boot:run
```

Backend starts at `http://localhost:8080`

### 3. Frontend setup

```bash
cd ReactFrontend
npm install
npm run dev
```

Frontend starts at `http://localhost:5173`

---

## API Endpoints

### Auth
| Method | Endpoint              | Description          | Auth |
|--------|-----------------------|----------------------|------|
| POST   | `/api/auth/register`  | Register new user    | ❌   |
| POST   | `/api/auth/login`     | Login, returns JWT   | ❌   |

### Colleges
| Method | Endpoint                              | Description                        | Auth |
|--------|---------------------------------------|------------------------------------|------|
| GET    | `/api/colleges`                       | Paginated list (state/district filter) | ❌ |
| GET    | `/api/colleges/{id}`                  | College detail by ID               | ❌   |
| GET    | `/api/colleges/keyword/{keyword}`     | Search colleges by name            | ❌   |

### States & Districts
| Method | Endpoint                              | Description                   | Auth |
|--------|---------------------------------------|-------------------------------|------|
| GET    | `/api/states`                         | All states                    | ❌   |
| GET    | `/api/districts/state/{stateId}`      | Districts by state            | ❌   |

---

## Environment Variables

### Backend — `application.properties`
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/eduportal
spring.datasource.username=
spring.datasource.password=
jwt.secret=
jwt.expiration=86400000
```

### Frontend — `.env`
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## Roadmap

- [ ] Email OTP verification on register
- [ ] Forgot password / reset flow
- [ ] Protected routes on frontend
- [ ] Pagination for keyword search results
- [ ] College favourites / wishlist
- [ ] College detail page (dedicated URL `/colleges/:id`)
- [ ] Admin dashboard — add/edit/delete colleges
- [ ] Deploy — backend on Railway, frontend on Vercel

---

## Contributors

| Name           | GitHub                                           | Role              |
|----------------|--------------------------------------------------|-------------------|
| Shekhar Patil  | [@shekharpatil2025](https://github.com/shekharpatil2025) | Full Stack Dev |
| Ritesh         | [@RiteshRC96](https://github.com/RiteshRC96)     | Full Stack Dev    |

---

> ⭐ If you find this project helpful, give it a star on GitHub!
