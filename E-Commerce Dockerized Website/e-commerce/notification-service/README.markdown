# Notification Service

This is the Notification Service for the E-commerce Order Processing System, built with Node.js, Express, and MongoDB. It manages user notifications for order confirmations and shipping updates, retrieving notifications for the Front-End/User Service.

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the root directory with the following:
   ```
   PORT=3006
   MONGO_URI=mongodb://mongo:27017/notification-service
   JWT_SECRET=your_jwt_secret_key
   ORDER_SERVICE_URL=http://order-service:3003
   SHIPPING_SERVICE_URL=http://shipping-service:3005
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
     docker build -t notification-service .
     ```
   - Run MongoDB container:
     ```bash
     docker run -d --network ecommerce-network --name mongo -p 27017:27017 mongo:latest
     ```
   - Run the Notification Service container:
     ```bash
     docker run --network ecommerce-network --name notification-service -p 3006:3006 notification-service
     ```

## Endpoints

- **GET /api/notifications**: Retrieve notifications for the authenticated user (requires JWT).
  - Headers: `Authorization: Bearer <jwt_token>`
  - Response: `{ "notifications": [{ "id": "string", "orderId": "string", "message": "string", "timestamp": "date" }, ...] }`
- **POST /api/notifications**: Create a notification (for internal use by other services).
  - Headers: `Authorization: Bearer <jwt_token>`
  - Body: `{ "orderId": "string", "message": "string" }`
  - Response: `{ "notification": { "id": "string", "orderId": "string", "message": "string", "timestamp": "date" } }`

## Dependencies

- Express: ^4.21.0
- Mongoose: ^8.7.0
- Axios: ^1.7.7
- Jsonwebtoken: ^9.0.2
- Cors: ^2.8.5