import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items when the component mounts
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/Admin/getcart');
      if (response.data.Status === 'Success') {
        setCartItems(response.data.Result);
      } else {
        console.error('Failed to fetch cart items');
      }
    } catch (error) {
      console.error('An error occurred while fetching cart items', error);
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Book ID</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.ID}>
                <td><strong>{item.Title}</strong></td>
                <td>{item.BookID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
