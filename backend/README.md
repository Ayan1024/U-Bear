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


## Captain Endpoints

### 1. Register Captain

**POST** `/captains/register`

Registers a new captain.

#### Request Body
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Success Response
- **Status:** 201 Created
```json
{
  "token": "<JWT_TOKEN>",
  "captain": {
    "_id": "...",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane@example.com",
    "socketId": null,
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "ltd": null,
      "lng": null
    }
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

### 2. Login Captain

**POST** `/captains/login`

Authenticates a captain and returns a JWT token (also sets a cookie).

#### Request Body
```json
{
  "email": "jane@example.com",
  "password": "yourpassword"
}
```

#### Success Response
- **Status:** 200 OK
```json
{
  "token": "<JWT_TOKEN>",
  "captain": {
    "_id": "...",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane@example.com",
    "socketId": null,
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "ltd": null,
      "lng": null
    }
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

### 3. Get Captain Profile

**GET** `/captains/profile`

Returns the authenticated captain's profile. Requires authentication.

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
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane@example.com",
  "socketId": null,
  "status": "inactive",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  },
  "location": {
    "ltd": null,
    "lng": null
  }
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

### 4. Logout Captain

**GET** `/captains/logout`

Logs out the captain by blacklisting the token and clearing the cookie. Requires authentication.

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

## Notes (Captain)
- All endpoints return JSON responses.
- Authentication is required for `/profile` and `/logout` endpoints.
- JWT tokens are valid for 24 hours for captains.
- Logout blacklists the token for 7 days.

Ayan1024
