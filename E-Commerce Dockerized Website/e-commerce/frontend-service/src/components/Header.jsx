import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ token, handleLogout }) => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Everything In One Place</Link>
        <div className="space-x-4">
          <Link to="/products" className="hover:underline">Products</Link>
          {token ? (
            <>
              <Link to="/profile" className="hover:underline">Profile</Link>
              <Link to="/checkout" className="hover:underline">Checkout</Link>
              <Link to="/track-shipment" className="hover:underline">Track Shipment</Link>
              <Link to="/notifications" className="hover:underline">Notifications</Link>
              <Link to="/update-shipment" className="hover:underline">Update Shipment</Link>
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;