# Auth Service

This is the Auth Service for the E-commerce Order Processing System, built with Node.js, Express, and MongoDB. It handles user registration, login, and profile retrieval, providing JWT-based authentication.

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the root directory with the following:
   ```
   PORT=3001
   MONGO_URI=mongodb://mongo:27017/auth-service
   JWT_SECRET=your_jwt_secret_key
   ```

3. **Run Locally**:
   ```bash
   npm start
   ```

4. **Docker Setup**:
   - Create a Docker network:
     ```bash
     docker network create ecommerce-network
     ```
   - Build the Docker image:
     ```bash
     docker build -t auth-service .
     ```
   - Run MongoDB container:
     ```bash
     docker run -d --network ecommerce-network --name mongo -p 27017:27017 mongo:latest
     ```
   - Run the Auth Service container:
     ```bash
     docker run --network ecommerce-network --name auth-service -p 3001:3001 auth-service
     ```

## Endpoints

- **POST /api/auth/register**: Register a new user.
  - Body: `{ "name": "string", "email": "string", "password": "string" }`
  - Response: `{ "token": "jwt_token" }`
- **POST /api/auth/login**: Authenticate a user.
  - Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "token": "jwt_token" }`
- **GET /api/auth/profile**: Retrieve user profile (requires JWT).
  - Headers: `Authorization: Bearer <jwt_token>`
  - Response: `{ "user": { "name": "string", "email": "string", "createdAt": "date" } }`

## Dependencies

- Express: ^4.21.0
- Mongoose: ^8.7.0
- Bcryptjs: ^2.4.3
- Jsonwebtoken: ^9.0.2
- Cors: ^2.8.5