# U-Bear Backend API Documentation

This document describes the available user-related API routes for the backend service.

---

## Endpoints

### 1. Register User

**POST** `/users/register`

Registers a new user.

#### Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "yourpassword"
}
```

#### Success Response

- **Status:** 201 Created

```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "...",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null
  }
}
```

#### Error Response

- **Status:** 400 Bad Request

```json
{
  "errors": [
    { "msg": "First name must be at least 3 characters long", ... }
  ]
}
```

---

### 2. Login User

**POST** `/users/login`

Authenticates a user and returns a JWT token (also sets a cookie).

#### Request Body

```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

#### Success Response

- **Status:** 200 OK

```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "...",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null
  }
}
```

#### Error Response

- **Status:** 401 Unauthorized

```json
{
  "message": "Invalid email or password"
}
```

---

### 3. Get User Profile

**GET** `/users/profile`

Returns the authenticated user's profile. Requires authentication.

#### Headers

```
Authorization: Bearer <JWT_TOKEN>
```

#### Success Response

- **Status:** 200 OK

```json
{
  "_id": "...",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "socketId": null
}
```

#### Error Response

- **Status:** 401 Unauthorized

```json
{
  "message": "Not authorized, token failed"
}
```

---

### 4. Logout User

**GET** `/users/logout`

Logs out the user by blacklisting the token and clearing the cookie.

#### Success Response

- **Status:** 200 OK

```json
{
  "message": "Logout successful"
}
```

#### Error Response

- **Status:** 400 Bad Request

```json
{
  "message": "No token provided"
}
```

---

## Notes

- All endpoints return JSON responses.
- Authentication is required for `/profile` and `/logout` endpoints.
- JWT tokens are valid for 7 days.
- Logout blacklists the token for 7 days.

---

## Author

Ayan1024
