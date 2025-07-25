# 👕 ReWear – Community Clothing Exchange

A web-based platform to **exchange unused clothes** via direct swaps or a **point-based system** — promoting sustainable fashion and reducing textile waste.

---

## 🚀 Overview

ReWear is a community-powered clothing exchange platform built for **ODDO Hackathon** by Team `Code-Query-Commit`.  
It enables users to list, browse, and exchange wearable garments with others — either via **direct swapping** or using a **points-based redemption system**.

By encouraging conscious consumption and reuse, ReWear aims to contribute to **sustainable fashion** and reduce the environmental footprint of fast fashion.

---

## 👥 Team: Code-Query-Commit

- Priyank Moradiya – [priyankmoradia34@gmail.com](mailto:priyankmoradia34@gmail.com)  
- Utsav Bhalani – [utsavbhalani07@gmail.com](mailto:utsavbhalani07@gmail.com)  
- Yash Gorasiya – [ysgorasiya510@gmail.com](mailto:ysgorasiya510@gmail.com)  
- Priyanshi Patel – [priyanshiben35@gmail.com](mailto:priyanshiben35@gmail.com)  

---

## 🛠 Tech Stack

| Frontend  | Backend | Database | Cloud / Auth |
|-----------|---------|----------|---------------|
| React     | Node.js | MongoDB  | Cloudinary    |
| TypeScript| Express | Mongoose | Google OAuth  |
| HTML/CSS  | JWT     |          | Multer, CORS  |

---

## 🌟 Key Features

### ✅ User Authentication
- Email/Password Sign-Up and Login
- Google OAuth for Quick Access
- JWT-based Session Management

### 🏠 Landing Page
- Introduction to ReWear’s mission
- CTAs: “Start Swapping”, “Browse Items”, “List an Item”
- Featured Items Carousel

### 👤 User Dashboard
- Profile Information and Points Balance
- Uploaded Items Overview
- View Ongoing and Completed Swaps

### 📦 Item Detail Page
- Image Gallery and Full Description
- Uploader Contact Info
- “Swap Request” or “Redeem via Points”
- Availability Indicator

### ➕ Add New Item
- Upload Multiple Images (via Multer + Cloudinary)
- Provide: Title, Description, Category, Size, Type, Condition, Tags
- Submit for Listing

### 🛡 Admin Role
- Moderate Listings (Approve/Reject)
- Remove Spam or Inappropriate Items
- Lightweight Admin Panel for Oversight

---

## 📁 Project Structure (Simplified)

```bash
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   └── public/
├── server/                 # Node.js + Express Backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── ...
├── uploads/                # Image Upload Temp Folder
├── .env                    # Environment Variables
├── README.md               # You're Here!
