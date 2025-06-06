# Product Service

This is the Product Service for the E-commerce Order Processing System, built with Node.js, Express, and MongoDB. It handles product listings and inventory, providing a REST API for retrieving product details.

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the root directory with the following:
   ```
   PORT=3002
   MONGO_URI=mongodb://mongo:27017/product-service
   ```

3. **Seed Dummy Products**:
   ```bash
   npm run seed
   ```

4. **Run Locally**:
   ```bash
   npm start
   ```

5. **Docker Setup**:
   - Create a Docker network:
     ```bash
     docker network create ecommerce-network
     ```
   - Build the Docker image:
     ```bash
     docker build -t product-service .
     ```
   - Run MongoDB container:
     ```bash
     docker run -d --network ecommerce-network --name mongo -p 27017:27017 mongo:latest
     ```
   - Run the Product Service container:
     ```bash
     docker run --network ecommerce-network --name product-service -p 3002:3002 product-service
     ```

## Endpoints

- **GET /api/products**: Retrieve all products.
  - Response: `{ "products": [{ "id": "string", "name": "string", "price": number, "description": "string", "stock": number, "createdAt": "date" }, ...] }`

## Dummy Products

The `seedProducts.js` script populates the database with the following products:
- Laptop: $999.99, 50 in stock
- Smartphone: $699.99, 100 in stock
- Headphones: $149.99, 75 in stock
- Smartwatch: $249.99, 60 in stock
- Tablet: $499.99, 40 in stock

## Dependencies

- Express: ^4.21.0
- Mongoose: ^8.7.0
- Cors: ^2.8.5