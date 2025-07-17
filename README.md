
# 🔐 Secure Authentication API with JWT, Role-Based Access & Refresh Token Blacklisting

This is a secure authentication API built with **Node.js**, **Express**, and **MongoDB**. It uses **JWT** for access and refresh tokens, supports **HTTP-only cookie storage**, **refresh token blacklisting**, get new access tokens using "refresh", and allows **admins to promote users to admin** allows admins to go to specific route using their access token,**Rate limiting** .

---

## 🚀 Features

- Register/login with hashed passwords and choose the role whether admin or user and by default it is user
- JWT Access Token for protected routes
- HTTP-only **Refresh Token** stored in cookies and user can get it
- **Blacklist** refresh tokens on logout
- **Role-based access control** only admins can get access to admin route using the access_token as they can promote users to admins
- Protected `/profile` route using the tokens
- **Rate limiting** the max number of logins or registerations is 100 per 15 minutes
- **CORS** enabled for cross-origin support

---

## 📦 Technologies Used

- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- dotenv
- cookie-parser
- bcrypt
- cors

---

## ⚙️ Setup

1. Clone the repo:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/Authentication
ACCESS_TOKEN_SECRET=yourAccessTokenSecret
REFRESH_TOKEN_SECRET=yourRefreshTokenSecret
```

4. Run the server:

```bash
npm run dev
```

---

## 🔐 Authentication Flow

### 1. Register (`POST /api/auth/register`)

#### 🛡️ Admin-only access  
You must be **logged in as an admin** to register a new user.

**Request body (JSON):**

```json
{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123",
  "role":"admin"
}
```

Returns registered successfully if valid input.

---

### 2. Login (`POST /api/auth/login`)

**Request body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

- Returns:
  - `accessToken`: for protected routes (sent in Authorization header)
  - `refreshToken`: stored in HTTP-only cookie
  - `user id`: user_id

---

### 3. Refresh Token (`POST /api/auth/refresh`)

- Uses `refreshToken` stored in **cookies**
- Returns a **new accessToken**

---

### 4. Logout (`POST /api/auth/logout`)

- Invalidates the current refresh token by adding it to a blacklist
- Clears the refresh token cookie

---

### 5. Get Profile (`GET /api/auth/profile`)

- Requires `Authorization: Bearer <accessToken>` header
- Returns user profile (excluding password)

---
### 5. Get Admin (`GET /api/auth/admin`)
- Only **admin users** can access this route.
- Requires `Authorization: Bearer <accessToken>` header
- returns welcome to the admin or unauthorized

---

### 6. Promote User to Admin (`PATCH /api/auth/make-admin/id`)

- Only **admin users** can access this route.

#### 🔐 Requires:
- `Authorization: Bearer <admin access token>`

#### Example: Promote user with ID `64dfc223d9a7d2a3c1234567` to admin

```http
PATCH http://localhost:8000/api/auth/make-admin/68796047fda9116cf8b
```

Returns:
```json
{ "message": "User promoted to admin" }
```

---

## 📬 Testing with Postman

### Login & Get Access Token

1. Login and copy the `accessToken` from the response.
2. Automatically, a `refreshToken` is saved in cookies.
3. For protected routes:
   - Add this header:  
     `Authorization: Bearer <accessToken>`

### Refresh Token

Use `POST /api/auth/refresh`. The server will use the `refreshToken` stored in the cookie.

### Logout

Call `POST /api/auth/logout`. It will blacklist the `refreshToken` and clear it from cookies.

---

## 🌐 CORS

- CORS is enabled using the `cors` package.


---

## 🔒 Security Notes

- Passwords are hashed with bcrypt
- Refresh tokens are stored securely in cookies
- Refresh tokens are **blacklisted on logout**
- Only admins can:
  - Promote other users to admin
- Admin routes are protected by JWT and role-check middleware

---

## to connect to mongodb 
- write in the terminal mongod and then mongosh



## 👤 Author

Developed by [Mai Mahmoud]
