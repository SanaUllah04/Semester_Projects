import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import TrackShipmentPage from './pages/TrackShipmentPage';
import NotificationPage from './pages/NotificationPage';
import UpdateShipmentPage from './pages/UpdateShipmentPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div>
        <Header token={token} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<LoginPage setToken={setToken} />} />
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="/register" element={<RegisterPage setToken={setToken} />} />
          <Route path="/profile" element={<ProfilePage token={token} />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage token={token} />} />
          <Route path="/track-shipment" element={<TrackShipmentPage token={token} />} />
          <Route path="/track-shipment/:orderId" element={<TrackShipmentPage token={token} />} />
          <Route path="/notifications" element={<NotificationPage token={token} />} />
          <Route path="/update-shipment" element={<UpdateShipmentPage token={token} />} />
          <Route path="/update-shipment/:orderId" element={<UpdateShipmentPage token={token} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;