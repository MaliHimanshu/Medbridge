# 🏥 MedBridge – Expiring Medicine Redistribution Network

MedBridge is a full-stack web application that helps reduce medicine wastage by connecting medicine donors with NGOs and recipients. The platform allows donors to donate unused medicines before they expire while NGOs can request and manage donations efficiently.

---

# 📌 Project Overview

Every year, a large quantity of medicines is wasted because they expire before use. At the same time, many people cannot afford essential medicines.

MedBridge solves this problem by creating a secure medicine redistribution platform where:

- Donors can donate medicines.
- NGOs can request medicines.
- Admins monitor the entire system.
- Medicines nearing expiry can be identified.
- Low stock medicines are tracked.

---

# 🚀 Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Role-Based Authorization
- Secure Password Hashing

### User Roles

- Admin
- Donor
- NGO
- Recipient

---

## Medicine Management

- Add Medicine
- Update Medicine
- Delete Medicine
- View Medicines
- Search Medicines
- Filter Medicines
- Pagination
- Low Stock Detection

---

## Donation Module

- Create Donation Request
- View Donations
- NGO Received Donations
- Accept Donation
- Reject Donation
- Complete Donation

---

## Dashboard

- Total Users
- Total Medicines
- Total Donations
- Pending Donations
- Accepted Donations
- Low Stock Statistics

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js

## Database

- PostgreSQL

## ORM

- Prisma ORM

## Authentication

- JWT
- bcrypt

## Validation

- Zod

---

# 📁 Project Structure

```
MedBridge
│
├── backend
│   ├── prisma
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── routes
│   │   ├── services
│   │   ├── validators
│   │   └── utils
│   │
│   └── server.js
│
├── frontend
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/MaliHimanshu/MedBridge.git
```

Move into project

```bash
cd MedBridge
```

---

## Backend Setup

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create environment file

```
.env
```

Example

```env
DATABASE_URL=your_postgresql_database_url

JWT_SECRET=your_secret_key

JWT_EXPIRES=7d

PORT=5000
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Migrations

```bash
npx prisma migrate dev
```

Start Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run Frontend

```bash
npm run dev
```

---

# 📡 API Endpoints

## Authentication

```
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
GET /api/auth/logout
```

---

## Medicines

```
POST   /api/medicine/add
GET    /api/medicine/my
GET    /api/medicine/all
GET    /api/medicine/search
GET    /api/medicine/low-stock
PUT    /api/medicine/update/:id
DELETE /api/medicine/delete/:id
```

---

## Donations

```
POST   /api/donation/create
GET    /api/donation/my
GET    /api/donation/received
PUT    /api/donation/status/:id
DELETE /api/donation/delete/:id
```

---

## Dashboard

```
GET /api/dashboard/stats
```

---

# 🔒 Security

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Authorization
- Request Validation using Zod

---

# 🚀 Future Enhancements

- Email Notifications
- QR Code Generation
- Cloudinary Image Upload
- AI Medicine Recommendation
- Expired Medicine Detection
- Reports & Analytics
- Admin Dashboard
- Inventory Alerts
- Medicine Request Module
- Real-Time Notifications

---

# 👨‍💻 Developer

**Himanshu Mali**

GitHub

https://github.com/MaliHimanshu

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.

---

# 📄 License

This project is developed for educational and academic purposes.