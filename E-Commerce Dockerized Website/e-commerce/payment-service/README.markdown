# Payment Service

This is the Payment Service for the E-commerce Order Processing System, built with Node.js, Express, and MongoDB. It handles payment processing for orders, verifying orders with the Order Service and storing payment details.

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the root directory with the following:
   ```
   PORT=3004
   MONGO_URI=mongodb://mongo:27017/payment-service
   JWT_SECRET=your_jwt_secret_key
   ORDER_SERVICE_URL=http://order-service:3003
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
     docker build -t payment-service .
     ```
   - Run MongoDB container:
     ```bash
     docker run -d --network ecommerce-network --name mongo -p 27017:27017 mongo:latest
     ```
   - Run the Payment Service container:
     ```bash
     docker run --network ecommerce-network --name payment-service -p 3004:3004 payment-service
     ```

## Endpoints

- **POST /api/payments**: Process a payment for an order (requires JWT).
  - Headers: `Authorization: Bearer <jwt_token>`
  - Body: `{ "orderId": "string", "paymentMethod": "string" }`
  - Response: `{ "success": boolean, "paymentId": "string" }`

## Dependencies

- Express: ^4.21.0
- Mongoose: ^8.7.0
- Axios: ^1.7.7
- Jsonwebtoken: ^9.0.2
- Cors: ^2.8.5