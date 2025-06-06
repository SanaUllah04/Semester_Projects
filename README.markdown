# Frontend User Service

This is the Front-End/User Service for the E-commerce Order Processing System, built with React and Tailwind CSS. It provides a professional UI for user authentication, product browsing, order checkout, shipment tracking, and notifications.

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the root directory with the following:
   ```
   REACT_APP_AUTH_SERVICE_URL=http://auth-service:3001
   REACT_APP_PRODUCT_SERVICE_URL=http://product-service:3002
   REACT_APP_ORDER_SERVICE_URL=http://order-service:3003
   REACT_APP_PAYMENT_SERVICE_URL=http://payment-service:3004
   REACT_APP_SHIPPING_SERVICE_URL=http://shipping-service:3005
   REACT_APP_NOTIFICATION_SERVICE_URL=http://notification-service:3006
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
     docker build -t frontend-user-service .
     ```
   - Run the container:
     ```bash
     docker run --network ecommerce-network --name frontend-user-service -p 3000:3000 frontend-user-service
     ```

## Pages

- **Login**: User authentication.
- **Register**: New user registration.
- **Profile**: Displays user details.
- **Products**: Lists available products.
- **Checkout**: Handles order creation and payment.
- **Track Shipment**: Tracks shipment status.
- **Notifications**: Displays order and shipment updates.

## Dependencies

- React: ^18.2.0
- React Router: ^6.26.2
- Axios: ^1.7.7
- Tailwind CSS: ^3.4.14