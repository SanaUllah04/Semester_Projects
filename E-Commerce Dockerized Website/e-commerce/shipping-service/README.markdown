# Shipping Service

This is the Shipping Service for the E-commerce Order Processing System, built with Node.js, Express, and MongoDB. It manages order shipment and tracking, verifying orders with the Order Service and storing shipment details.

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the root directory with the following:
   ```
   PORT=3005
   MONGO_URI=mongodb://mongo:27017/shipping-service
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
     docker build -t shipping-service .
     ```
   - Run MongoDB container:
     ```bash
     docker run -d --network ecommerce-network --name mongo -p 27017:27017 mongo:latest
     ```
   - Run the Shipping Service container:
     ```bash
     docker run --network ecommerce-network --name shipping-service -p 3005:3005 shipping-service
     ```

## Endpoints

- **GET /api/shipments/:orderId**: Track shipment details for an order (requires JWT).
  - Headers: `Authorization: Bearer <jwt_token>`
  - Response: `{ "shipment": { "orderId": "string", "status": "string", "estimatedDelivery": "date" } }`
- **PATCH /api/shipments/:orderId**: Update shipment status (for internal use).
  - Headers: `Authorization: Bearer <jwt_token>`
  - Body: `{ "status": "string" }`
  - Response: `{ "shipment": { "orderId": "string", "status": "string", "estimatedDelivery": "date" } }`

## Dependencies

- Express: ^4.21.0
- Mongoose: ^8.7.0
- Axios: ^1.7.7
- Jsonwebtoken: ^9.0.2
- Cors: ^2.8.5