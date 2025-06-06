import React, { useState, useEffect } from 'react';
import { getProducts } from '../utils/api';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '{}'));
  const [error, setError] = useState('');

  // Base URL for the frontend service (adjust for production)
  const FRONTEND_BASE_URL = process.env.REACT_APP_FRONTEND_BASE_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();

    // Sync cart with localStorage on change
    const handleStorageChange = () => {
      setCart(JSON.parse(localStorage.getItem('cart') || '{}'));
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup event listener
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addToCart = (productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      newCart[productId] = (newCart[productId] || 0) + 1;
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId]; // Remove the item completely if quantity is 1
      }
      return newCart;
    });
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Description Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Everything In One Place
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover a wide range of products from electronics to accessories. Shop with ease and
          enjoy a seamless experience with fast shipping and secure payments.
        </p>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const quantityInCart = cart[product._id] || 0;
          return (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              {/* Product Image */}
              <img
                src={`${FRONTEND_BASE_URL}${product.imageUrl}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {/* Product Details */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <p className="text-lg font-bold text-gray-900 mb-4">${product.price.toFixed(2)}</p>
                <div className="flex items-center space-x-2">
                  {quantityInCart > 0 ? (
                    <>
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                      >
                        -
                      </button>
                      <span className="text-gray-800 font-semibold">{quantityInCart}</span>
                      <button
                        onClick={() => addToCart(product._id)}
                        className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-200"
                      >
                        +
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => addToCart(product._id)}
                      className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductPage;