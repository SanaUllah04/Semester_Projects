# Order Service

This is the Order Service for the E-commerce Order Processing System, built with Node.js, Express, and MongoDB. It manages order creation, checks product availability via the Product Service, and triggers payment processing via the Payment Service.

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the root directory with the following:
   ```
   PORT=3003
   MONGO_URI=mongodb://mongo:27017/order-service
   JWT_SECRET=your_jwt_secret_key
   PRODUCT_SERVICE_URL=http://product-service:3002
   PAYMENT_SERVICE_URL=http://payment-service:3004
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
     docker build -t order-service .
     ```
   - Run MongoDB container:
     ```bash
     docker run -d --network ecommerce-network --name mongo -p 27017:27017 mongo:latest
     ```
   - Run the Order Service container:
     ```bash
     docker run --network ecommerce-network --name order-service -p 3003:3003 order-service
     ```

## Endpoints

- **POST /api/orders**: Create a new order (requires JWT).
  - Headers: `Authorization: Bearer <jwt_token>`
  - Body: `{ "productId": "string", "quantity": number }`
  - Response: `{ "orderId": "string" }`

## Dependencies

- Express: ^4.21.0
- Mongoose: ^8.7.0
- Axios: ^1.7.7
- Jsonwebtoken: ^9.0.2
- Cors: ^2.8.5