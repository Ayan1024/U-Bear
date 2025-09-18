# U-Bear Backend API Documentation

This document provides a concise overview of the U-Bear backend API, including user and captain-specific endpoints.

---

## 👨‍💻 User Endpoints

### User Registration
- **POST** `/users/register`
- **Request Body:** `fullname`, `email`, `password`
- **Success:** `201 Created` with `token` and `user` data
- **Error:** `400 Bad Request`

### User Login
- **POST** `/users/login`
- **Request Body:** `email`, `password`
- **Success:** `200 OK` with `token` and `user` data
- **Error:** `401 Unauthorized`

### Get User Profile
- **GET** `/users/profile`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Success:** `200 OK` with `user` profile data
- **Error:** `401 Unauthorized`

### User Logout
- **GET** `/users/logout`
- **Success:** `200 OK` with a "Logout successful" message
- **Error:** `400 Bad Request`

---

## 🚗 Captain Endpoints

### Captain Registration
- **POST** `/captains/register`
- **Request Body:** `fullname`, `email`, `password`, `vehicle` details
- **Success:** `201 Created` with `token` and `captain` data
- **Error:** `400 Bad Request`

### Captain Login
- **POST** `/captains/login`
- **Request Body:** `email`, `password`
- **Success:** `200 OK` with `token` and `captain` data
- **Error:** `401 Unauthorized`

### Get Captain Profile
- **GET** `/captains/profile`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Success:** `200 OK` with `captain` profile data
- **Error:** `401 Unauthorized`

### Captain Logout
- **GET** `/captains/logout`
- **Success:** `200 OK` with a "Logout successful" message
- **Error:** `400 Bad Request`

---

## 📝 General Notes

* All API responses are in **JSON** format.
* The `/profile` and `/logout` endpoints for both users and captains require **authentication** using a JWT token in the `Authorization` header.
* **JWT token validity:** 7 days for users, 24 hours for captains.
* Logging out blacklists the token for 7 days for both users and captains.